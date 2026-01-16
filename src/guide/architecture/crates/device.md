---
layout: doc
---

# 🔌 Device

This crate provide primitives and <HostReference crate="file_system" kind="trait" symbol="ControlCommand" /> implementation for device drivers to interact with devices in a standardized way.

It defines the basic abstractions for character and block devices, defining how they should handle read, write, and control operations.

## Dependencies

The device crate depends on the following crates:

- [File system](../crates/file_system.md): For file system primitives used by the VFS module.

## Known limitations

There are currently no known limitations.

## Future improvements

Just implements all the necessary traits and types for device drivers.

## References

- <HostReference crate="device" />

## See also

- [File system](../crates/file_system.md)
- [Drivers](../drivers.md)
