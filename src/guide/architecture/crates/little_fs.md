---
layout: doc
---

# 📁 Little FS

The `little_fs` crate integrates the LittleFS storage backend into Xila.

It adapts LittleFS to Xila file system traits and provides formatting/mounting capabilities for flash-friendly and power-loss resilient storage.

## Features

- LittleFS-based file system backend.
- Integration with Xila task, user, and time abstractions.
- Optional standard-library support through features.

## Dependencies

- [📁 File system](./file_system.md)
- [🏁 Task](../modules/task.md)
- [👥 Users](../modules/users.md)
- [🕓 Time](../modules/time.md)
- [🔃 Synchronization](./synchronization.md)

## References

- <HostReference crate="little_fs" />
- <CodeReference path="modules/little_fs" />

## See also

- [🗃️ Virtual file system](../modules/virtual_file_system.md)
