---
layout: doc
---

# 🎛️ Peripherals

The `peripherals` crate defines shared data types used to configure and interact with low-level peripherals.

It currently focuses on pin modeling primitives (direction, level, pull mode, and compact data representation) that can be exchanged safely between layers.

## Boundaries

- In scope: pin-level enums and packed payload conversions.
- Out of scope: driver access, pin mux configuration engines, board-specific behavior.

## Internal structure

- `lib.rs`: exports peripheral primitives.
- `pin.rs`: enums, `PinData`, and byte-slice conversion implementations.

## Runtime interaction

- Control paths can serialize/deserialize `PinData` as mutable byte slices.
- Consumers validate incoming byte buffers via `TryFrom<&[u8]>` / `TryFrom<&mut [u8]>` before interpreting as typed data.

## Dependency model

- No external runtime dependencies.
- Consumed by driver layers and any crate requiring shared pin payload contracts.

## Failure semantics

- Conversion methods return `Err(())` on size/alignment mismatch or invalid enum discriminants.
- No I/O side effects are performed by this crate itself.

## Extension points

- Additional peripheral payload types can be added in separate modules while preserving `PinData` layout.
- Existing enums can be extended carefully with ABI/backward-compatibility considerations.

## Contract vs implementation

- **Contract**: `repr(u8)` enums and `repr(C)` `PinData` with conversion helpers.
- **Current implementation**: low-level transmute-based conversions with explicit length/alignment validation.

## Limitations and trade-offs

- Minimal scope keeps coupling low but pushes richer peripheral semantics to drivers/modules.
- Raw layout conversion is efficient but requires strict buffer discipline by callers.

## References

- <CodeReference path="modules/peripherals" />
- [🔌 Device](./device.md)
- [🪛 Drivers](../drivers.md)
