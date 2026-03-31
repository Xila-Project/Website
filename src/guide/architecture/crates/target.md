---
layout: doc
---

# 🎯 Target

The `target` crate provides typed build-target introspection from Cargo-provided environment variables.

## Role

- Converts raw target metadata strings into typed enums (`Architecture`, `OperatingSystem`, `Family`, `Vendor`).
- Centralizes target decoding used by build tooling and target-conditional runtime glue.

## Boundaries

- In scope: compile/build target detection.
- Out of scope: runtime hardware probing or dynamic platform discovery.

## Internal structure

- `architecture.rs`, `operating_system.rs`, `family.rs`, `vendor.rs`: per-dimension enum + conversion logic.
- `lib.rs`: `Target` aggregate type and `Target::get_current()`.

## Runtime interaction

- Usually consumed during build scripts or initialization code paths where target-specific decisions are required.
- Reads `CARGO_CFG_TARGET_*` values from process environment.

## Dependency model

- No external crate dependencies.
- Depends only on standard library environment access.

## Failure semantics

- Unknown architecture/os/family values panic in strict `From<String>` mappings.
- Vendor mapping is partially tolerant (`Unknown` fallback for non-espressif vendor strings).

## Extension points

- Add new enum variants as additional Rust targets are supported.
- Relax strict conversions if non-panicking behavior is required by callers.

## Contract vs implementation

- **Contract**: typed target metadata accessors (`Target::get_current`, `Architecture::get`, ...).
- **Current implementation**: direct `std::env::var(...)` reads with mostly strict string-to-enum conversion.

## Limitations and trade-offs

- Strict mappings catch unsupported targets early, but panic rather than returning recoverable errors.
- Designed for compile target identity, not runtime device capability negotiation.

## References

- <CodeReference path="modules/target" />
- [🏁 Executable crate](./executables.md)
