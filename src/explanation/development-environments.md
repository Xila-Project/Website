---
layout: doc
docType: explanation
description: Understand mise-managed Core development, headless runtime containers, and target-specific validation.
---

# Development environments and targets

Xila combines native Rust crates, bundled WASI applications, generated fonts, and a browser-hosted runtime. The development toolchain and the Xila operating-system runtime are different concerns.

## Local and CI development with mise

Core #509 replaced Cargo Make and the `xila-dev` build container with [mise](https://mise.jdx.dev/). Its `mise.toml` contains reusable build/check/image tasks and pinned tool versions. The default `development` environment (selected through `.miserc.toml`) adds local tools and formatting commands; `mise.ci.toml` declares per-job tools for GitHub Actions. Each task installs its required tools on demand rather than activating a whole environment globally.

On Debian/Ubuntu, native dependencies can be provisioned with `mise bootstrap packages apply --manager apt`. Cargo builds use the configured mbx integration; formatting and documentation tasks avoid unrelated tool installation. See [development setup](/how-to/setup-development).

CI is split into primary checks (`ci.yml`), extended validation (`extended.yml`), Pages/browser builds (`pages.yml`), and the headless OCI image (`runtime.yml`). A workflow succeeding does not prove untested targets or hardware builds are correct.

## The runtime image executes Xila

The separately published `ghcr.io/xila-project/xila-runtime` image carries a non-root, headless Xila binary and a filesystem seed, **not** compilers or the developer toolchain. Its default mode launches Xila's CLI shell; it can also run supported WASI guests with explicit mounted host directories. See [Run Xila with Docker](/how-to/run-container-guest).

## Three execution contexts

- **Native Linux host:** Xila linked with native drivers and the `x86_64-unknown-linux-gnu` host toolchain.
- **WASI guest:** an application compiled for `wasm32-wasip1` and interpreted inside Xila using Wasmi.
- **Browser host:** Xila itself compiled for `wasm32-unknown-unknown`, hosting the separate WASI guests.

The `wasm` crate's `host` feature refers to the interpreter, not necessarily a desktop. `default_guest` builds the guest-library API, not a full application. Native GUI testing requires a working Wayland session; the native headless display driver is also available for Debug-based UI inspection.

## Limits of validation

Compilation, formatting and Clippy check particular toolchains/feature combinations. Browser tests exercise OPFS and UI behavior; independent native tests exercise execution and resource lifetimes. They do **not** prove RAM/flash use or hardware functionality on ESP32, nRF, STM32 or other microcontrollers.

## Related documentation

- [Set up development](/how-to/setup-development).
- [Native tutorial](/tutorials/native).
- [Browser tutorial](/tutorials/browser).
- [Development commands](/reference/development-commands).
- <CodeReference path=".github/workflows/ci.yml" />.
