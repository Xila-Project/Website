---
layout: doc
---

# 🧱 Core driver crate

The `drivers_core` crate contains dependency-light driver building blocks that can be reused across all targets.

It currently provides foundational devices such as the null device implementation used by higher-level systems.

## Dependencies

- [📁 File system](../crates/file_system.md): For common device-facing file system traits.

## References

- <CodeReference path="drivers/core" />

## See also

- [🪛 Drivers](../drivers.md)
- [🔌 Device](../crates/device.md)
