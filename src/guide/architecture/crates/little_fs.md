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
- Backend callbacks bridging LittleFS C APIs to Xila device operations.
- File and directory wrappers aligned with `file_system` crate contracts.

## Dependencies

- [📁 File system](./file_system.md)
- [🏁 Task](../modules/task.md)
- [👥 Users](../modules/users.md)
- [🕓 Time](../modules/time.md)
- [🔃 Synchronization](./synchronization.md)

## Initialization patterns

Common setup patterns include:

- `FileSystem::new_format(...)`: create and format a fresh backend.
- `FileSystem::get_or_format(...)`: mount if present, otherwise format first.

These patterns are used by host/testing initialization flows before mounting through VFS.

## Architecture

The crate wraps `littlefs2-sys` and organizes the backend into:

1. configuration/callback glue,
2. file and directory operation wrappers,
3. flag and attribute translation utilities.

## Known limitations

- Behavior and performance depend on underlying storage device quality and configuration.
- Feature support follows LittleFS capabilities and exposed wrapper coverage.

## References

- <HostReference crate="little_fs" />
- <CodeReference path="modules/little_fs" />

## See also

- [🗃️ Virtual file system](../modules/virtual_file_system.md)
