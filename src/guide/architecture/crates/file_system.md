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
- Partition and MBR utilities for block-device layouts.
- In-memory device helpers useful for tests and bootstrapping.

## Dependencies

- [🏁 Task](../modules/task.md)
- [👥 Users](../modules/users.md)
- [📦 Shared](./shared.md)
- [🔃 Synchronization](./synchronization.md)

## API snapshot

- `FileSystemOperations`: Core trait implemented by concrete file system backends.
- `DirectCharacterDevice` / `DirectBlockDevice`: Context-free device interfaces.
- `MemoryDevice`: In-memory block device used by tests and examples.
- `mbr::Mbr` and partition helpers: Tools to define/read partition maps.
- Fundamental types: `Path`, `Flags`, `Permissions`, `Error`, and timestamp utilities.

## Architecture

The crate is intentionally split between:

1. generic operation traits and types,
2. device abstractions,
3. optional concrete helpers (for example memory-backed devices and MBR tools).

Higher-level services (notably VFS) depend on these abstractions and stay decoupled from specific storage backends.

## Known limitations

- This crate defines abstractions and helpers, not a full mountable namespace manager by itself.
- Semantics such as blocking behavior and path resolution are finalized at VFS/backend integration layers.

## References

- <HostReference crate="file_system" />
- <CodeReference path="modules/file_system" />

## See also

- [🗃️ Virtual file system](../modules/virtual_file_system.md)
- [📁 Little FS](./little_fs.md)
