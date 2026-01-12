---
layout: doc
---

# 🚀 Get started with contributing

This guide will help you get started with contributing to the Xila project by building and running the core examples.

## ✅ Requirements

Ensure the following dependencies are installed to build the core:

- `gcc-multilib`: Required for cross-compilation.
- [`cargo-make`](https://github.com/sagiegurari/cargo-make): Used to build the project with `cargo`.
- `nodejs`: Needed to generate fonts for LVGL ([lv_font_conv](https://github.com/lvgl/lv_font_conv)).
- `wasm32-wasip1` Rust target: Required to compile Xila virtual machine executables.
- (Optional) `wasm32-unknown-unknown` Rust target: Used to compile the `wasm_example`.
- (Optional) `nightly` Rust toolchain: Needed to compile the `wasm_example`.
- (Optional) [`trunk`](https://trunkrs.dev/): Used to build the `wasm_example`.
- (Optional) Rust [xtensa-esp32\*-espidf](https://docs.esp-rs.org/book/installation/riscv-and-xtensa.html) toolchain: For compiling for ESP32 / ESP32-S series.
- (Optional) Rust [riscv\*-esp-espidf](https://docs.esp-rs.org/book/installation/riscv.html): For compiling for ESP32-H / ESP32-C series.

## 📖 Steps

1. **Clone the repository**:

```bash
git clone https://github.com/Xila-Project/Core.git
```

2. **Navigate to the project directory**:

```bash
cd Core
```

3. **Run one of the examples (desktop or web)**:
   - For the native example:

```bash
cargo make run -p native_example
```

- For the WASM example:

```bash
cargo make generate-fonts
cd examples/wasm && trunk serve
```

::: info
For the full list of available commands, refer to the [`Makefile.toml`](https://github.com/Xila-Project/Core/blob/main/Makefile.toml).
:::
