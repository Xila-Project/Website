---
layout: doc
---

# Command line shell (executable)

The command line shell is the interactive text shell used by terminal-oriented workflows.

## Features

- Interactive and non-interactive execution modes.
- Built-in command set: navigation, file operations, environment variables, network utilities, and process execution.
- Integration with authentication and task environment variables.
- Resolution of executable paths from the `Paths` environment variable.

## Dependencies

- [🗃️ Virtual file system](../modules/virtual_file_system.md)
- [🏁 Task](../modules/task.md)
- [🔒 Authentication](../crates/authentication.md)

## References

- <CodeReference path="executables/shell/command_line" />

## See also

- [Terminal](./terminal.md)
