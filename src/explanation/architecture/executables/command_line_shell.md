---
layout: doc
docType: explanation
description: "The command-line shell provides bounded parsing, streaming command composition, built-ins, and native or WebAssembly executable dispatch."
---

# Command line shell (executable)

The command-line shell provides a small, bounded shell language for interactive terminal sessions and explicit `shell -c` command source. It dispatches built-ins or native/WebAssembly executables through Xila's task and virtual filesystem APIs without depending on a hosted POSIX shell.

## Role

- Lexes and parses quoting, environment expansion, pipelines, conditionals, redirections, sequential lists, and background execution.
- Dispatches built-in commands or resolves executable names through the task's `Paths` search locations.
- Maintains foreground shell state such as the current directory and environment.
- Runs pipeline stages and background lists in child tasks with inherited environments and isolated shell state.

## Startup and lifecycle

1. Initializes `Shell` state with the current task and root directory.
2. Resolves `User` from the task environment; if absent, runs the interactive authentication flow.
3. Loads `Paths` and `Host` environment variables.
4. Runs the interactive line loop when no arguments are supplied.
5. Executes already-separated arguments literally, or parses shell source only when invoked with `-c`.
6. Reaps completed background tasks as new jobs start and waits for outstanding jobs when the shell exits.

## Parsing and execution model

The lexer borrows slices from one bounded source line. The parser validates a token vector rather than allocating a syntax tree. Expansion happens when each command is prepared for execution.

`|` binds more tightly than `&&` and `||`; the conditional operators have equal precedence and evaluate left to right. `;` separates sequential lists, while `&` launches the preceding conditional list in the background. Input, output, append, and standard-error redirections are applied to one command from left to right.

Pipelines run stages concurrently through bounded asynchronous pipes, so command output is streamed rather than collected in full. A pipeline returns the last stage's status after all stages finish. Foreground built-ins can mutate the parent shell's directory and environment; pipeline/background built-ins cannot.

## Runtime integration points

- `task` for child tasks, environments, scheduling, and inherited execution context.
- `authentication` for the login fallback flow.
- `virtual_file_system` for command discovery, redirections, file utilities, and current-directory resolution.
- `xila::executable::execute` for non-built-in command execution.
- `file_system::Pipe`-style bounded streams for pipeline backpressure.

## Failure and status semantics

- Built-in failures return status 1 unless a command defines another status.
- Unknown commands return 127.
- Malformed source passed to `shell -c` returns 2.
- External executable statuses are preserved within 0–255.
- `$?` expands to the previous foreground status; successfully starting a background list sets it to zero.
- Command errors are written to standard error without terminating the interactive shell unless the shell itself exits.

## Bounded resources

Shell-owned syntax and streaming resources have explicit limits: a 4096-byte source line, 256 tokens, 32 commands, 8 pipeline stages, 8192 bytes of expanded arguments/redirection paths per command, 512 buffered bytes per pipe, and 8 active background lists. These limits do not include memory allocated by launched programs, runtimes, or task infrastructure.

## Contract vs implementation

- **Contract**: a bounded command shell with built-ins, executable discovery, composition, streaming pipes, redirection, quoting, and environment expansion.
- **Current implementation**: intentionally not a complete POSIX shell. It does not provide script files, multiline grammar, command substitution, globbing, subshells, descriptor duplication such as `2>&1`, here-documents, or shell assignment syntax.
- Built-ins are registered in one discoverable table used by both dispatch and `help`; recent utilities include `grep`, `realpath`, `touch`, `sleep`, `chmod`, `tree`, `mv`, and `cp` alongside the existing filesystem/network commands.

`cp SOURCE DESTINATION` copies a regular file through the VFS using a fixed 512-byte buffer. It creates or truncates the target (or appends the source filename when the target is a directory); it does not recursively copy directories.

For exact syntax, statuses, limits, and built-in discovery, see the [shell reference](/reference/shell).

## User-facing command invocation

The shell treats each mode differently. With no arguments it reads an interactive prompt and parses input lines. With `-c` it treats exactly the following argument as a **shell source string**. Otherwise it receives already separated arguments and executes them **literally**, without reparsing metacharacters as shell syntax.

```text
command_line_shell -c "echo hello | grep hello"
command_line_shell echo "hello world"
```

The first form parses a pipeline; the second supplies literal argument words. The `-c` mode requires exactly two arguments (the flag and the command source). Invalid UTF-8 input and oversized interactive lines return status 2.

## Implementation boundaries

- `tokenizer.rs` implements borrowed tokens and differentiates single quotes, double quotes, escapes, variable expansion and comments.
- `parser.rs` validates all tokens before execution, with **4096 input bytes**, **256 tokens**, **32 commands** and **8 pipeline stages** as limits.
- `execution.rs` handles conditions, streams, redirection and background tasks. Its **8192-byte** per-command expansion/output buffer bound and **512-byte** pipes provide backpressure.
- `resolver.rs` scans configured `Paths` directories in order; the **first matching filename** wins. It is not equivalent to a host OS PATH lookup.
- `commands/` contains the built-in dispatch table, including filesystem/network commands. Parent-shell state changes apply only to foreground built-ins; a pipeline or background command runs in its own child Shell.

For example, a background command gets duplicated output/error streams but its stdin is redirected to `/devices/null`; the parent prompt can continue without blocking on that job. Background handles are reaped and the shell joins remaining jobs before exiting.

## Status and failure details

`$?` reflects the previous foreground status. Shell parsing failures return status 2, unknown commands 127, and most built-in errors 1. In a pipeline, the last stage's status wins after joining all stages; there is **no pipefail mode**. The shell does not offer globbing, command substitution, POSIX here-documents, shell-variable assignment statements or file-backed scripts.

### Source and API references

- <CodeReference path="executables/shell/command_line/src/lib.rs" /> — entrypoint and invocation modes.
- <CodeReference path="executables/shell/command_line/src/tokenizer.rs" /> — tokenization and quoting.
- <CodeReference path="executables/shell/command_line/src/parser.rs" /> — syntax validation and limits.
- <CodeReference path="executables/shell/command_line/src/execution.rs" /> — composition and child tasks.
- <CodeReference path="executables/shell/command_line/src/resolver.rs" /> — path lookup and precedence.
- [Executable library](/explanation/architecture/libraries/executable) — native launch contract.

## References

- <CodeReference path="executables/shell/command_line" />
- [Shell reference](/reference/shell)
- [Terminal](/explanation/architecture/executables/terminal)
