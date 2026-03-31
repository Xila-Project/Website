---
layout: doc
---

# 📁 File system

The `file_system` crate is the architectural contract layer for storage nodes, files, directories, and device endpoints.

## Role

- Defines fundamental types (`Path`, flags, permissions, metadata, errors, identifiers).
- Defines operation traits consumed by VFS and implemented by concrete backends/devices.
- Provides reusable helpers for memory devices, partitions, and MBR handling.

## Boundaries

- In scope: trait contracts and shared semantics for file/device operations.
- Out of scope: global namespace mounting/orchestration (handled by [Virtual file system](../modules/virtual_file_system.md)).

## Internal structure

- `fundamentals/`: path, identifiers, permissions, statistics, flags, entry/type primitives.
- `operations/`: core trait families (`FileSystemOperations`, `BaseOperations`, `DirectoryOperations`, ...).
- `devices/`: character/block device abstractions and direct operations.
- `mbr/` and `partition/`: partition table and partition-device helpers.
- `memory_device.rs`: in-memory block device implementation.

## Runtime interaction

- VFS calls file-system and device traits through dynamic dispatch.
- Device nodes expose `control` commands and read/write operations via the same contract surface.
- Backends like [Little FS](./little_fs.md) map these traits to concrete storage engines.

## Dependency model

- Depends on [Task](../modules/task.md), [Users](../modules/users.md), [Shared](./shared.md), [Synchronization](./synchronization.md), and [Internationalization](./internationalization.md).
- Upstream consumers include virtual_file_system, executable, authentication, and drivers.

## Failure semantics

- Uniform `file_system::Error` result model across traits.
- Unsupported operations are explicit (`UnsupportedOperation`), allowing capability probing by callers.
- Backend-specific failures are expected to be translated into this crate's error domain.

## Extension points

- Add new backend crates by implementing the operation traits.
- Extend control-command families while preserving command identifiers for compatibility.
- Add helper devices/partition utilities without changing core trait contracts.

## Contract vs implementation

- **Contract**: typed trait and data-model surface for file and device operations.
- **Current implementation**: includes reusable helpers (`MemoryDevice`, MBR/partition utilities) but delegates namespace-level behavior to VFS.

## Limitations and trade-offs

- Intentionally broad contract surface increases flexibility, but requires careful implementer conformance.
- Policy decisions (mount precedence, path traversal context, async scheduling) live outside this crate.

## References

- <HostReference crate="file_system" />
- <CodeReference path="modules/file_system" />
- [📁 Little FS](./little_fs.md)
