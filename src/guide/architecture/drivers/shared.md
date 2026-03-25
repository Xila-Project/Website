---
layout: doc
---

# 🔗 Shared driver crate

The `drivers_shared` crate provides reusable device implementations that are used across multiple platforms.

Today this includes utility devices such as random and hashing devices that can be mounted into the virtual file system and reused by modules like authentication.

## Dependencies

- [📁 File system](../crates/file_system.md)
- [📝 Log](../modules/log.md)
- [📦 Shared](../crates/shared.md)
- [🔌 Device](../crates/device.md)

## References

- <CodeReference path="drivers/shared" />

## See also

- [🪛 Drivers](../drivers.md)
- [🔒 Authentication](../crates/authentication.md)
