---
layout: doc
---

# 🎛️ Peripherals

The `peripherals` crate defines shared data types used to configure and interact with low-level peripherals.

It currently focuses on pin modeling primitives (direction, level, pull mode, and compact data representation) that can be exchanged safely between layers.

## Features

- `Direction`, `Level`, and `Pull` enums for portable pin state modeling.
- `PinData` structure to bundle optional pin attributes in one payload.
- Byte-slice conversion helpers for device-facing buffers.
- Compact C-compatible representation (`repr(C)` / `repr(u8)`), useful for control payloads.

## API snapshot

- `PinData::new(...)` and setter/getter methods.
- `TryFrom<&[u8]>` / `TryFrom<&mut [u8]>` for validated binary view conversion.
- `AsMut<[u8]>` for writing structured pin data into control buffers.

## Dependencies

This crate is intentionally dependency-light.

## Known limitations

- Current scope is focused on pin modeling; broader peripheral abstractions are intentionally out of this crate for now.

## References

- <CodeReference path="modules/peripherals" />

## See also

- [🔌 Device](./device.md)
- [🪛 Drivers](../drivers.md)
