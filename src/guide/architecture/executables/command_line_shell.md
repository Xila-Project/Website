---
layout: doc
---

# ⌨️ Command line shell (executable)

The command-line shell executable provides text command dispatch for both interactive terminal sessions and one-shot command invocation.

## Role

- Parses user input into built-in command handlers or executable launch requests.
- Maintains shell process state (`current_directory`, `user`, `host`, running flag).

## Startup and lifecycle

1. Initializes `Shell` state with current task and root directory.
2. Resolves `User` from task env; if absent, runs interactive authentication flow.
3. Loads `Paths` and `Host` environment variables.
4. Runs interactive loop (prompt + read + parse) when no args; otherwise executes one command from args.

## Runtime integration points

- `task` module for environment variable reads/writes (`User`, `Paths`, `Current_directory`, `Host`).
- `authentication` crate for login fallback flow.
- `virtual_file_system` for path resolution and command file discovery.
- `xila::executable::execute` for non-built-in command execution.

## Data and control flow / VFS touchpoints

- Built-in command path: command token -> command module handler -> direct side effects.
- External executable path:
  1. resolve command name using configured `Paths` directories,
  2. set `Current_directory` env,
  3. call `execute(...)`,
  4. join spawned task.
- VFS touchpoints include directory traversal during command resolution and file operations in command modules.

## Concurrency and event-loop model

- Primary model is single interactive loop over standard input.
- External commands run as separate executable tasks and are synchronously joined by shell.

## Failure semantics

- Command-level errors are written to `standard_error` and loop continues.
- Argument option misuse maps through `getargs` to typed shell errors.
- Missing environment variables (`Paths`, `Host`) are fatal for startup path.

## Contract vs implementation

- **Contract**: text shell that supports built-ins and executable dispatch from search paths.
- **Current implementation**: explicit match-based built-in table (`exit`, `cd`, `ls`, `mkdir`, `dns_resolve`, `ping`, `ip`, etc.) with fallback resolver-based execution.

## Operational limitations

- Tokenization currently relies on simple space splitting in interactive path (no full quoting/escaping grammar).
- Prompt/loop behavior is line-oriented and depends on standard input device semantics.

## References

- <CodeReference path="executables/shell/command_line" />
- [Terminal](./terminal.md)
