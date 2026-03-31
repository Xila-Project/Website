---
layout: doc
---

# 📁 Little FS

The `little_fs` crate is the concrete LittleFS backend that implements Xila's file-system contracts.

## Role

- Implements `file_system::FileSystemOperations` and related traits on top of `littlefs2-sys`.
- Provides mount/format bootstrap paths used before VFS initialization.

## Boundaries

- In scope: backend adaptation, attribute translation, file/directory context operations.
- Out of scope: global mount namespace and path policy (owned by VFS).

## Internal structure

- `file_system.rs`: `FileSystem` type, mount/format lifecycle, trait implementations.
- `callbacks.rs` + `configuration.rs`: glue from `DirectBlockDevice` to LittleFS C callbacks/config.
- `file.rs` / `directory.rs`: context-specific file and directory operations.
- `attributes.rs` / `flags.rs`: mapping between Xila and LittleFS representations.
- `error.rs`: LittleFS result-to-`file_system::Error` conversion.

## Runtime interaction

1. Backend is created via `FileSystem::new(...)`, `new_format(...)`, or `get_or_format(...)`.
2. It mounts using `littlefs::lfs_mount` and seeds root internal attributes if missing.
3. VFS calls trait methods; crate routes calls through a mounted mutex wrapper.
4. On drop, it unmounts and releases leaked configuration context.

## Dependency model

- Core dependencies: [File system](./file_system.md), [Task](../modules/task.md), [Users](../modules/users.md), [Time](../modules/time.md), [Synchronization](./synchronization.md), `littlefs2-sys`.

## Failure semantics

- Mount/format/operation failures are translated to `file_system::Error`.
- `get_or_format` retries by formatting when initial mount fails.
- Context type mismatch in operation dispatch returns `InvalidParameter`.

## Extension points

- Additional mount policies can wrap existing constructors.
- New attribute/flag translations can be added without changing trait-level contracts.

## Contract vs implementation

- **Contract**: fully conforms to `file_system` trait interfaces expected by VFS.
- **Current implementation**: based on LittleFS C runtime (`lfs_*`) with `MutexMountWrapper<CriticalSectionRawMutex, lfs_t>`.

## Limitations and trade-offs

- Behavior inherits LittleFS semantics and target storage constraints.
- Relies on callback/config correctness; misconfigured block geometry can fail at runtime.

## References

- <HostReference crate="little_fs" />
- <CodeReference path="modules/little_fs" />
- [🗃️ Virtual file system](../modules/virtual_file_system.md)
