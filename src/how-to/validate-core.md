---
layout: doc
docType: how-to
description: Select formatting, host/guest, runtime, and browser checks for a Core change.
---

# Validate a Core change

Run the checks that exercise the behavior and targets your change affects. Unless stated otherwise, run commands from Core's root inside its configured development container shell.

## Before you begin

Complete [development setup](./setup-development) and install any extra prerequisites for your selected tests. Cargo-make initializes font generation before its tasks.

## Check formatting

Use read-only checks before review:

```bash
cargo make format-rust -- --check
cargo make format-toml --check
npm exec prettier -- --check "**/*.json"
```

Use `cargo make format` to apply the formatters while editing.

## Check the affected targets

For host-facing changes:

```bash
cargo make check-host
cargo make clippy-host
cargo make doc-host
```

For guest-library changes:

```bash
cargo make check-guest
cargo make clippy-guest
cargo make doc-guest
```

Use `check`, `clippy`, and `doc` for both sets. These tasks check the Linux host and `wasm32-unknown-unknown` guest library; build the actual [WASI guest](./build-guest) separately when it changes.

## Test WASM runtime

For graphics catalog, runtime, and alternate guest-word translation changes:

```bash
cargo test -p graphics_bindgen --target x86_64-unknown-linux-gnu
cargo test -p wasm --features graphics --target x86_64-unknown-linux-gnu
cargo test -p wasm --no-default-features --features host,graphics,memory_64 --target x86_64-unknown-linux-gnu
```

Calculator is a wasm32 guest; its acceptance test is not run in the `memory_64` configuration. Portable translation coverage and Miri commands are documented in <CodeReference path="executables/wasm/tests/translation/README.md" />. Add `llvm-tools-preview` to the pinned stable toolchain for coverage and `miri` to the pinned nightly for Miri.

Use `cargo make test` for workspace tests, and the [command reference](/reference/development-commands) for the combined gates.

## Browser behavior

Build Calculator before building the example:

```bash
cargo build -p calculator --target wasm32-wasip1 --release
cargo make generate-fonts
(cd examples/wasm && RUSTUP_TOOLCHAIN="$XILA_NIGHTLY_TOOLCHAIN" trunk build)
```

Use `trunk serve` instead of `trunk build` and open the served URL to exercise rendering, input, `1 + 2 = 3`, and window closing. For storage changes, check save/reload after a completed save as well; compilation alone does not verify persistence.

### OPFS storage tests

Install `wasm-bindgen-cli` matching the resolved `wasm-bindgen` dependency and a Chrome/Chromium WebDriver matching your browser:

```bash
CARGO_TARGET_WASM32_UNKNOWN_UNKNOWN_RUNNER=wasm-bindgen-test-runner \
CHROMEDRIVER=/path/to/chromedriver \
cargo test -p drivers_wasm --target wasm32-unknown-unknown --test opfs
```

For a non-default browser executable, set `WASM_BINDGEN_TEST_WEBDRIVER_JSON` to a JSON file containing `{"goog:chromeOptions":{"binary":"/path/to/chromium"}}`. These tests use real OPFS files and cover MBR/LittleFS save/reopen behavior.

## Verify completion

Confirm your selected commands completed successfully and record the target, toolchain, and test scope. For native UI changes, also exercise rendering, input, and closing from a Wayland session.

Rust host tests, browser tests, and Miri do not establish embedded hardware correctness or firmware RAM/flash costs. Validate the relevant board/toolchain when the change affects hardware behavior.

## Related documentation

- <CodeReference path=".github/workflows/check.yml" /> for CI's checks and affected-path selection.
- <CodeReference path="examples/wasm/README.md" /> for browser verification details.
- [Development environments and targets](/explanation/development-environments).
