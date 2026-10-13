---
layout: doc
---

# 🤝 Contribute

Use the same pinned environment as CI, validate the paths your change affects, and keep embedded resource constraints in view.

## Tooling

### Standard environment

**Devbox on x86_64 Linux** is the standard local and CI setup. Install [Devbox](https://www.jetify.com/docs/devbox/installing_devbox/) at the version in Core's `.devbox-version`, then:

```bash
git clone https://github.com/Xila-Project/Core.git
cd Core
devbox shell
devbox run setup
devbox run check
```

Setup installs the pinned stable/nightly toolchains, Rust components, both WASM targets, and npm dependencies. Devbox supplies Node.js, cargo-make, Trunk, Clang/multilib, libclang, Mold, CMake/Ninja, pkg-config, Wayland/graphics libraries, Taplo, and coverage tooling. Initial setup requires internet access.

Version sources are `.devbox-version`, `devbox.json`/`devbox.lock`, `development/toolchains.env`, and `package-lock.json`. Update related pins together and repeat checks and GUI tests. Pins do not freeze untracked Cargo lockfiles or moving Git dependencies. Exit with `exit`; `.dev-environment/` and `.devbox/` contain removable local caches.

Manual workflows still work with the tools from `devbox.json` installed separately and `npm ci`. Cargo-make defaults to stable outside Devbox.

### Platform-specific setup

- Native GUI: use a Wayland desktop and `devbox run gui`, without `--pure`. Keep GPU drivers and display/session variables. Windows requires x86_64 WSL2/WSLg and a GUI smoke test.
- Native Windows, macOS, ARM Linux, and NixOS are unvalidated by the current Linux/Wayland host checks.
- ESP-IDF/flashing/serial permissions require separate setup after leaving Devbox. Follow the esp-rs [Xtensa](https://docs.esp-rs.org/book/installation/riscv-and-xtensa.html) or [RISC-V](https://docs.esp-rs.org/book/installation/riscv.html) guides.

## First successful runs (native + wasm)

Inside the shell, from Core's root:

```bash
devbox run gui
cargo build -p calculator --target wasm32-wasip1 --release
cargo make generate-fonts
(cd examples/wasm && RUSTUP_TOOLCHAIN="$XILA_NIGHTLY_TOOLCHAIN" trunk serve)
```

Check native rendering/input/window closing, the guest artifact, and the browser example. Calculator's release artifact must exist before the browser build embeds it. See [Use on WASM](./use_wasm.md) for login, launch, and OPFS persistence behavior.

## Practical validation workflow

1. Format while iterating: `cargo make format`.
2. Check affected targets: `cargo make check-host` and/or `cargo make check-guest`.
3. Lint affected targets: `cargo make clippy-host` and/or `cargo make clippy-guest`.
4. Use `cargo make before-commit` for the combined format/check/doc/Clippy gate.

CI selects formatting, host/guest checks, coverage, Miri, and WASM example builds based on affected paths. Its workflow is the source of truth for target-specific validation; a skipped job does not prove a target passed.

### Read-only formatting checks

```bash
cargo make format-rust -- --check
cargo make format-toml --check
npm exec prettier -- --check "**/*.json"
```

### Focused WASM runtime tests

```bash
cargo test -p graphics_bindgen --target x86_64-unknown-linux-gnu
cargo test -p wasm --features graphics --target x86_64-unknown-linux-gnu
cargo test -p wasm --no-default-features --features host,graphics,memory_64 --target x86_64-unknown-linux-gnu
```

The wasm32 Calculator acceptance test is not run under `memory_64`. Portable translation coverage and Miri commands are in <CodeReference path="executables/wasm/tests/translation/README.md" />. Add `llvm-tools-preview` to the pinned stable toolchain for coverage and `miri` to the pinned nightly for Miri.

Browser storage tests require `wasm-bindgen-cli` matching the resolved dependency and a Chrome/Chromium WebDriver matching the browser:

```bash
CARGO_TARGET_WASM32_UNKNOWN_UNKNOWN_RUNNER=wasm-bindgen-test-runner \
CHROMEDRIVER=/path/to/chromedriver \
cargo test -p drivers_wasm --target wasm32-unknown-unknown --test opfs
```

See <CodeReference path="examples/wasm/README.md" /> for browser-binary configuration. These tests exercise real OPFS save/reopen behavior; host tests do not establish it.

## Implementation checklist

- Reproduce the issue or define expected behavior.
- Put changes in the owning crate; preserve `no_std`, optional features, `default-features = false`, and target-specific dependency boundaries.
- Account for RAM, flash, stack, peak allocation, and buffer lifetimes. Prefer bounded or caller-provided storage.
- Pass manager references and contexts explicitly; follow the native/browser examples.
- Change generators rather than generated sources; keep generated assets and build output out of commits unless required.
- Update documentation/examples when behavior or APIs change.
- Report the checks actually run. Host/WASM compilation, native tests, and Miri do not prove ESP32/nRF/STM32 hardware correctness.

## Command reference

All `cargo make` commands run from Core's root. The Makefile initializes font generation before its tasks.

| Task                                                                      | Purpose                                                                                |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `install-tools`                                                           | Legacy npm tooling installation (`npm install`); standard setup uses `npm ci`.         |
| `generate-fonts`                                                          | Generate LVGL fonts via `fonts_generator`.                                             |
| `format-rust`, `format-toml`, `format-json`, `format`                     | Format Rust/TOML/JSON or all three.                                                    |
| `translate-compare`, `translate-sync`, `translate-pull`, `translate-push` | Tolgee translation workflows; sync removes unused keys.                                |
| `check-host`, `doc-host`, `clippy-host`                                   | Linux `x86_64-unknown-linux-gnu` validation with host graphics/ABI/rendering features. |
| `check-guest`, `doc-guest`, `clippy-guest`                                | Package `wasm`, `wasm32-unknown-unknown`, defaults disabled, `default_guest` enabled.  |
| `check`, `doc`, `clippy`                                                  | Both host and guest tasks.                                                             |
| `lint`                                                                    | Clippy with all targets/features; check feature compatibility before using it.         |
| `test`                                                                    | Workspace tests.                                                                       |
| `run`, `build`                                                            | Cargo wrappers accepting forwarded arguments.                                          |
| `coverage`                                                                | Workspace coverage via cargo-llvm-cov.                                                 |
| `before-commit`                                                           | Format, check, doc, and Clippy.                                                        |

`wasm32-wasip1` builds actual guest applications; `wasm32-unknown-unknown` is used by guest-library checks and the browser example.

## Documentation-only changes

For this website repository, use its npm workflow:

```bash
npm ci
npm run format:check
npm run docs:build
```

## Next steps

- [Use on Host](./use_host.md) and [Use on WASM](./use_wasm.md).
- [Architecture](../architecture/index.md) for dependency passing.
- <CodeReference path="AGENTS.md" /> for Core's development/validation guidelines.
