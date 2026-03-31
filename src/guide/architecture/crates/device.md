---
layout: doc
---

# 🔌 Device

The `device` crate defines typed control-command contracts for device files.

## Role

- Provides shared command identifiers/payload types that callers and drivers both understand.
- Keeps command ABI definitions centralized instead of duplicating command numbers in each consumer.

## Boundaries

- In scope: command typing, payload enums, `define_command!` declarations.
- Out of scope: any actual device behavior, state, or runtime mounting logic.

## Internal structure

- `lib.rs`: exports command families.
- `hash.rs`: hash-specific types and commands.
  - `HashAlgorithm` enum.
  - `RESET` and `SET_ALGORITHM` command definitions.

## Runtime interaction

- Callers issue `File::control(...)` on mounted device nodes (for example `/devices/hasher`).
- Drivers decode the same command identifiers to execute implementation-specific behavior.

## Dependency model

- Depends on [File system](./file_system.md) for `ControlCommand` abstractions and macro support.
- Consumed by higher-level crates such as [Authentication](./authentication.md) and driver implementations.

## Failure semantics

- This crate does not execute I/O; operational failures occur in driver or VFS layers.
- Type/identifier mismatches are surfaced when commands are cast/handled at runtime boundaries.

## Extension points

- Add new command families as separate modules (mirroring `hash.rs`).
- Preserve existing command IDs to keep backward-compatible control ABI.

## Contract vs implementation

- **Contract**: stable typed command IDs + payload schemas.
- **Current implementation**: only hash-device contract family is defined in-tree.

## Limitations and trade-offs

- Narrow scope means low coupling, but functionality depends on external driver support.
- Command evolution requires ABI discipline once IDs are consumed by executables/modules.

## References

- <HostReference crate="device" />
- <CodeReference path="modules/device" />
- [Drivers](../drivers.md)
