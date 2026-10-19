---
layout: doc
docType: explanation
description: "The peripherals crate provides a no_std embedded-hal GPIO controller contract and a fixed-capacity mock."
---

# Peripherals

The `peripherals` crate defines a backend-independent GPIO controller contract using `embedded-hal` 1.x digital traits.

## GPIO contract

Behind the optional `gpio` feature, `GpioController` exposes per-line capabilities and borrowed input/output handles. `LineId`, `InputConfig`, `OutputConfig`, `Pull`, `DriveMode`, and `PinState` describe requests without coupling consumers to a board implementation.

Input and output lines are reserved while their handles are alive. The controller can reject invalid line IDs, already-reserved lines, or unsupported pull and drive configurations.

## Mock implementation

The optional `mock` feature provides `GpioMock<N>`, a fixed-capacity, heap-free implementation of `embedded-hal::digital` input and output traits. Tests can inject input levels and inspect output states without physical hardware.

The previous `PinData` byte-buffer API was removed. This is a breaking change: consumers should use the typed controller and line handles rather than serializing pin state through `PinData`.

## Scope and limitations

This is the **GPIO contract and mock**, not a complete peripheral stack. Board-specific adapters and other peripheral families remain future work. In particular, the Espressif adapter depends on the target/toolchain setup tracked in Core issue #328.

## References

- <HostReference crate="peripherals" />
- <CodeReference path="modules/peripherals/src/gpio.rs" />
- [Drivers](/explanation/architecture/drivers)
