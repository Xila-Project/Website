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

## Dependencies

This crate is intentionally dependency-light and uses standard environment variables provided by Cargo.

## References

- <CodeReference path="modules/target" />

## See also

- [🏃 Executables](./executables.md)
- [🪛 Drivers](../drivers.md)
