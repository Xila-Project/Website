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
- Built-ins are registered in one discoverable table used by both dispatch and `help`; recent utilities include `grep`, `realpath`, `touch`, `sleep`, `chmod`, `tree`, and `mv` alongside the existing filesystem/network commands.

For exact syntax, statuses, limits, and built-in discovery, see the [shell reference](/reference/shell).

## References

- <CodeReference path="executables/shell/command_line" />
- [Shell reference](/reference/shell)
- [Terminal](/explanation/architecture/executables/terminal)
