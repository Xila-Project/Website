---
layout: doc
---

# 🤝 Contribute

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

## 🧰 Cargo Make command reference

All commands below are run from the `Core` repository root using `cargo make <task>`.

### Setup and assets

- `install-tools`: Run `npm install` for tooling dependencies.
- `generate-fonts`: Generate LVGL fonts via `fonts_generator`.

### Formatting

- `format-rust`: Format all Rust code (`cargo fmt --all`).
- `format-toml`: Format TOML files with `taplo`.
- `format-json`: Format JSON files with `prettier`.
- `format`: Run all formatting tasks (`format-rust`, `format-toml`, `format-json`).

### Translations

- `translate-compare`: Compare local translations with Tolgee.
- `translate-sync`: Sync translations and remove unused keys.
- `translate-pull`: Pull translations from Tolgee.
- `translate-push`: Push local translations to Tolgee.

### Checks, docs, and linting

- `check-host`: Run `cargo check` for host target (`x86_64-unknown-linux-gnu`) with host graphics features.
- `check-guest`: Run `cargo check` for guest target (`wasm32-unknown-unknown`) on package `wasm` with `default_guest`.
- `check`: Run both host and guest checks.
- `doc-host`: Build host documentation.
- `doc-guest`: Build guest documentation.
- `doc`: Build both host and guest documentation.
- `clippy-host`: Run clippy for host target and deny warnings.
- `clippy-guest`: Run clippy for guest target and deny warnings.
- `clippy`: Run both host and guest clippy checks.
- `lint`: Run clippy for all targets/features and deny warnings.

### Build, run, test, coverage

- `test`: Run workspace tests.
- `run`: Wrapper over `cargo run` (accepts forwarded args).
- `build`: Wrapper over `cargo build` (accepts forwarded args).
- `coverage`: Run coverage with `cargo llvm-cov`.

### Workflow task

- `before-commit`: Run `format`, `check`, `doc`, and `clippy` before committing.

### Examples

- `cargo make format`
- `cargo make check`
- `cargo make run -p native_example`
- `cargo make generate-fonts`
- `cargo make before-commit`
