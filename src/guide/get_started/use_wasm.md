---
layout: doc
---

# 🚀 Get started to use on WASM

This guide explains how to develop applications for Xila using WebAssembly (WASM).

## ✅ Requirements

- [Rust/Cargo](https://www.rust-lang.org/tools/install): Required to build and manage Rust projects.
- `wasm32-wasip1` Rust target: Needed to compile Xila virtual machine executables.
- (Optional) `wasm32-unknown-unknown` Rust target: Used to compile the `wasm_example`.
- (Optional) `nightly` Rust toolchain: Required to compile the `wasm_example`.

## 📖 Steps

1. **Add Xila as a dependency** in your `Cargo.toml` file within a blank Cargo workspace:

```toml
[dependencies]
xila = { git = "https://github.com/Xila-Project/Core.git", features = ["wasm"] }
```

2. **Develop your application**:
   - Use the standard WASM APIs provided by Rust (e.g., file system, time).
   - Leverage Xila's APIs for specific functionalities such as graphics and networking.

::: info
For more details, refer to the [`wasm_test`](https://github.com/Xila-Project/Core/tree/main/modules/bindings/host/tests/wasm_test).
:::
