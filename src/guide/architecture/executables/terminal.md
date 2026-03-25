---
layout: doc
---

# 🖥️ Terminal (executable)

The terminal executable provides a graphical terminal surface and launches the command line shell inside it.

## Features

- Creates and mounts `/devices/terminal` as a character device.
- Opens standard input/output/error streams from that mounted terminal device.
- Spawns `/binaries/command_line_shell` and forwards terminal events.

## Dependencies

- [🗃️ Virtual file system](../modules/virtual_file_system.md)
- [🏁 Task](../modules/task.md)
- [📝 Log](../modules/log.md)

## References

- <CodeReference path="executables/terminal" />

## See also

- [Command line shell](./command_line_shell.md)
