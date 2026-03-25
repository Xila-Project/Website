---
layout: doc
---

# 📁 File system

The `file_system` crate defines foundational file system primitives and traits used throughout Xila.

It provides path/types abstractions, metadata and permission handling, file and device related interfaces, and the contracts implemented by concrete file systems.

## Features

- Core traits for file system operations and nodes.
- POSIX-like metadata and access flags.
- Character/block device integration points.
- Shared path and identifier types used by higher-level modules.

## Dependencies

- [🏁 Task](../modules/task.md)
- [👥 Users](../modules/users.md)
- [📦 Shared](./shared.md)
- [🔃 Synchronization](./synchronization.md)

## References

- <HostReference crate="file_system" />
- <CodeReference path="modules/file_system" />

## See also

- [🗃️ Virtual file system](../modules/virtual_file_system.md)
- [📁 Little FS](./little_fs.md)
