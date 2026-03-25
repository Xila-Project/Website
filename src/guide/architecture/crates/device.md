---
layout: doc
---

# 🔌 Device

The `device` crate provides typed device command definitions and primitives shared by drivers and modules.

It builds on file system control-command abstractions so device capabilities can be exposed through stable, typed interfaces.

## Features

- Typed device command definitions using `define_command!`.
- Shared enums/types for hardware-accelerated operations.
- Compatibility with character/block device endpoints mounted in VFS.

## API snapshot

- `HashAlgorithm`: Enumerates supported hash algorithms (MD5, SHA family variants).
- `RESET` and `SET_ALGORITHM`: Typed control commands for hash-capable devices.

## Dependencies

The device crate depends on the following crates:

- [File system](../crates/file_system.md): For file system primitives used by the VFS module.

## Architecture

This crate intentionally keeps a small surface and delegates execution to concrete driver implementations:

1. the crate defines command identifiers and payload types,
2. drivers implement command handling,
3. callers invoke commands through VFS file/device control paths.

## Known limitations

- Scope is intentionally narrow; it defines primitives and command contracts rather than full device driver implementations.

## Future improvements

- Extend typed command families beyond hashing-related operations as more reusable device interfaces are stabilized.

## References

- <HostReference crate="device" />

## See also

- [File system](../crates/file_system.md)
- [Drivers](../drivers.md)
