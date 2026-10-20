---
layout: doc
docType: explanation
description: "The target crate provides typed build-target introspection from Cargo-provided environment variables."
---

# Target

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

## Public API and environment boundary

`Target::get_current()` constructs a value with four typed dimensions: `Architecture`, `OperatingSystem`, `Family` and `Vendor`. `Target` exposes `get_architecture()`, `get_operating_system()` and `get_family()`; the individual enums expose `get()` and `get_raw()`. The vendor field is stored on `Target` but currently has no corresponding public `Target::get_vendor()` accessor.

```rust
// Intended for Cargo-driven build tooling with CARGO_CFG_TARGET_* set.
let target = target::Target::get_current();
let arch = target.get_architecture();
let os = target.get_operating_system();
```

The implementation uses `std::env::var("CARGO_CFG_TARGET_ARCH")` and the matching OS/family/vendor variables at **function call time**, not `cfg!` or `option_env!`. These are supplied to build scripts by Cargo; they are not guaranteed to be present when executing an ordinary target binary. Calling `get_current` at runtime without those variables currently panics.

## Supported variants and parsing behavior

- `Architecture`: `X86`, `X86_64`, `Arm`, `Aarch64`, `Xtensa`, `RiscV`, `WASM32`, `WASM64`.
- `OperatingSystem`: `Windows`, `Linux`, `MacOS`, `EspIdf`, `WASI`.
- `Family`: `Unix`, `Windows`, `Wasm`.
- `Vendor`: `Espressif` or `Unknown` for other strings.

Unknown architecture, OS or family values panic in their `From<String>` implementations. This is intentionally strict but means the helper must be updated when supporting new target triples. Vendor parsing is more tolerant; it should not be used to assert precise chip identity.

The crate depends on `std` and **is not a portable `no_std` runtime hardware detector**. Device discovery and feature negotiation belong to driver/platform integration.

### Source and API references

- <CodeReference path="libraries/target/src/lib.rs" /> — aggregate target.
- <CodeReference path="libraries/target/src/architecture.rs" /> — architecture mapping.
- <CodeReference path="libraries/target/src/operating_system.rs" /> — OS mapping.
- <HostReference crate="target" kind="struct" symbol="Target" /> — typed build metadata.

## References

- <HostReference crate="target" /> — generated Rust API documentation.

- <CodeReference path="libraries/target" />
- [Executable crate](/explanation/architecture/libraries/executable)
