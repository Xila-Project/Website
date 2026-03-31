---
layout: doc
---

# 🤝 Contribute

Use this guide to set up a practical contributor workflow and validate both native and wasm paths early.

## Tooling

### Required

- `gcc-multilib`: Required for cross-compilation.
- [`cargo-make`](https://github.com/sagiegurari/cargo-make): Used to build the project with `cargo`.
- `nodejs`: Needed to generate fonts for LVGL ([lv_font_conv](https://github.com/lvgl/lv_font_conv)).
- `wasm32-wasip1` Rust target: Required to compile Xila virtual machine executables.
- `wasm32-unknown-unknown` Rust target: Required for full contributor validation tasks (`check-guest`, `doc-guest`, `clippy-guest`, `before-commit`).

### Optional (only if your task needs it)

- (Optional) `nightly` Rust toolchain: Needed to compile the `wasm_example`.
- (Optional) [`trunk`](https://trunkrs.dev/): Used to build the `wasm_example`.
- (Optional) Rust [xtensa-esp32\*-espidf](https://docs.esp-rs.org/book/installation/riscv-and-xtensa.html) toolchain: For compiling for ESP32 / ESP32-S series.
- (Optional) Rust [riscv\*-esp-espidf](https://docs.esp-rs.org/book/installation/riscv.html): For compiling for ESP32-H / ESP32-C series.

## First successful runs (native + wasm)

From a clean checkout:

```bash
git clone https://github.com/Xila-Project/Core.git
cd Core
```

If needed:

```bash
cargo install cargo-make
rustup target add wasm32-wasip1
```

Native run:

```bash
cargo make run -p native_example
```

WASM build signal:

```bash
cargo build -p calculator --target wasm32-wasip1
```

Expected success signals:

- Native example starts without immediate panic.
- WASM build completes and writes a `.wasm` artifact.

## Practical cargo-make workflow

Run these from `Core` root:

1. Format while iterating: `cargo make format`
2. Fast checks: `cargo make check`
3. Lint before review: `cargo make clippy`
4. Pre-commit gate: `cargo make before-commit`

When working on docs/examples, also run only what your change touches to keep feedback fast.

## Contribution checklist

- Reproduce the issue or define the expected behavior clearly.
- Make the smallest change that solves the problem.
- Run `cargo make format`, `cargo make check`, and `cargo make clippy`.
- Run both native and wasm validation for cross-target changes.
- Update docs/examples when behavior or APIs change.

## Command reference

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

- Note on targets: `wasm32-wasip1` is the runtime target used for wasm executables, while some workspace checks/examples still use `wasm32-unknown-unknown` for web-facing paths.
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

## Troubleshooting

- `cargo make` not found: run `cargo install cargo-make` and open a new shell.
- WASM target missing: run `rustup target add wasm32-wasip1`.
- Font generation errors: verify `nodejs` is installed, then rerun `cargo make generate-fonts`.
- Web example fails to serve: install optional `trunk` and required wasm web target/toolchain.

## Next steps

- Pick user-facing onboarding paths in [Use on Host](./use_host.md) and [Use on WASM](./use_wasm.md).
- Use [Modules architecture map](../architecture/modules/index.md) and [Executables architecture map](../architecture/executables/index.md) to choose where your change should live.
- Review executable behavior pages: [WASM](../architecture/executables/wasm.md), [Command line shell](../architecture/executables/command_line_shell.md), and [Graphical shell](../architecture/executables/graphical_shell.md).
