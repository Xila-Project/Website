---
layout: doc
docType: how-to
description: Build a WASI guest artifact and select the correct Xila guest graphics dependency.
---

# Build a guest application

Compile an application for Xila's WASI runtime. The application target is `wasm32-wasip1`; `wasm32-unknown-unknown` is used for the browser example and guest-library checks.

## Before you begin

Use a configured [development environment](./setup-development) with the WASI target installed. In a manual Rust setup, run `rustup target add wasm32-wasip1` for the toolchain you use. Graphical bindings also require the native binding-generation tools.

## Build an existing application

From Core's root, using [mise-managed tools](./setup-development):

```bash
cargo build -p xila-calculator --target wasm32-wasip1 --release
```

Use the package name of your application for other workspace guests. With Cargo's default target directory, the artifact is `target/wasm32-wasip1/release/calculator.wasm`. The `mise run image:wasm` task builds the bundled applications and seed image together for the [browser tutorial](/tutorials/browser).

## Add graphics bindings

For a separate Rust application workspace, select the `xila-wasm` Cargo package and disable the default host interpreter:

```toml
[dependencies]
wasm = { git = "https://github.com/Xila-Project/Core.git", default-features = false, features = ["guest", "graphics", "memory_32"] }
```

Use `default_guest` instead if you need the C wrappers and generated `xila_graphics.h` header. Match guest and host LVGL revisions/configuration and use the supported [graphics bindings](/reference/graphics-bindings). Standard WASI guests can use the implemented WASI imports without Xila graphics wrappers.

Core's `xila` package has no `wasm` feature. Command guests require `_start: () -> ()`; optional installers require `__install: () -> ()`.

## Verify completion

The build should exit successfully and produce `$CARGO_TARGET_DIR/wasm32-wasip1/release/calculator.wasm` when `CARGO_TARGET_DIR` is set (or `target/wasm32-wasip1/release/calculator.wasm` with Cargo's default). Compilation does not verify runtime compatibility: [run the guest](./run-guest) in Xila to check its actual behavior.

Before serving the browser example after a guest changes, regenerate its seed image with `mise run image:wasm`. Existing browser disks are not upgraded from a newer seed.

## Package the artifact for development

After building the guest, the separate [native package builder](/how-to/package-application) can generate an experimental `.xpk` TAR archive and manifest from the resulting `.wasm`. This is **not** an on-device package installation mechanism or a signed trusted application release. See [Package management architecture](/explanation/package-management).

## Related documentation

- [Run Calculator in the browser](/tutorials/browser).
- [WASM runtime reference](/reference/wasm-runtime).
- <CodeReference path="executables/calculator/Cargo.toml" /> for the workspace guest's configuration.
