---
layout: doc
---

# 🎯 Target

The `target` crate provides compile-target introspection helpers used by Core and executables.

It exposes architecture, operating system, family, and vendor abstractions from Cargo target environment variables, allowing target-dependent behavior to stay centralized and explicit.

## Features

- Architecture detection (`x86_64`, `arm`, `xtensa`, `wasm32`, ...)
- Operating system detection (`linux`, `windows`, `macos`, `espidf`, `wasi`)
- Family and vendor helpers
- Unified `Target` structure for current build target metadata

## API snapshot

- `Target::get_current()`: Builds target metadata from Cargo environment variables.
- `Architecture::get()`, `OperatingSystem::get()`, `Family::get()`, `Vendor::get()`: Per-dimension helpers.
- Conversion from raw Cargo values to typed enums (`From<String>` mappings).

## Dependencies

This crate is intentionally dependency-light and uses standard environment variables provided by Cargo.

It reads:

- `CARGO_CFG_TARGET_ARCH`
- `CARGO_CFG_TARGET_OS`
- `CARGO_CFG_TARGET_FAMILY`
- `CARGO_CFG_TARGET_VENDOR`

## Known limitations

- Unknown/unsupported raw values can cause panics in strict enum conversions.
- This crate represents compile/build target metadata, not runtime hardware detection.

## References

- <CodeReference path="modules/target" />

## See also

- [🏃 Executables](./executables.md)
- [🪛 Drivers](../drivers.md)
