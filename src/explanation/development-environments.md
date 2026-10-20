---
layout: doc
docType: explanation
description: Understand the Xila development container, runtime image, WASM targets, and validation limits.
---

# Development environments and targets

Xila brings together a Rust workspace, native libraries, generated graphics assets, WASI guest applications, and different execution environments. Keeping build tools separate from the actual Xila runtime makes the workflow easier to understand.

## The development image builds Core

Core's standard build environment comes from [xila-project/development-environment](https://github.com/xila-project/development-environment). The published `ghcr.io/xila-project/development-environment:main` image contains pinned Rust stable/nightly toolchains, WASM targets, Clang/libclang, Node/npm, Cargo tools, and native libraries.

Its `scripts/xila-dev` wrapper works with Docker or Podman, mounts Core at `/workspace`, runs with the host UID/GID, and keeps persistent caches under `.dev-environment/`. Display and hardware-device access are explicitly opt-in. This workflow **replaces Devbox**.

The development-environment repository owns the image's version manifest and dependency list. Core also records the Rust versions used by its workflows in `development/toolchains.env` and the npm resolution in `package-lock.json`. Keep build image and CI versions aligned when updating them.

## The runtime image executes Xila

The separate `ghcr.io/xila-project/xila-runtime` image contains the **headless Xila runtime and its filesystem seed**, rather than compilers. Its default mode opens the Xila command-line shell; it can also run a WASI guest with explicit filesystem capabilities. See [Run Xila with Docker](/how-to/run-container-guest).

## Three different execution contexts

| Context      | What executes                                                 | Relevant target                                     |
| ------------ | ------------------------------------------------------------- | --------------------------------------------------- |
| Native host  | Xila linked with native drivers in a Linux process            | Current host checks use `x86_64-unknown-linux-gnu`. |
| WASI guest   | An application interpreted inside Xila's Wasmi runtime        | Application builds use `wasm32-wasip1`.             |
| Browser host | Xila itself running in the browser, also hosting WASI guests  | Example builds use `wasm32-unknown-unknown`.        |

The `wasm` package's `host` feature means it hosts guest programs; it does not imply that every host runtime is a desktop application. Guest-library checks use `wasm32-unknown-unknown` with defaults disabled and `default_guest` enabled; these complement actual `wasm32-wasip1` application builds.

The native graphical desktop can be run **inside the development container** with the wrapper's `--gui` display forwarding, but the `xila-runtime` Docker image remains headless.

## What validation establishes

Compilation checks verify selected targets and feature combinations. Native GUI smoke tests exercise rendering, input, and closing in a real desktop session. Browser tests cover browser APIs, WASI guests, and storage. Translation tests and Miri examine separate portability and memory boundaries.

These checks do not establish correctness or RAM/flash usage on an ESP32, nRF, STM32, or other microcontroller. Hardware must be validated separately.

The current native workflow targets x86_64 Linux with Wayland (the wrapper also has an X11 fallback). Native Windows, macOS, ARM Linux, and NixOS are not validated; WSL2/WSLg needs a separate GUI smoke test. ESP-IDF tools, flashing, and serial permissions are separate from the host/WASM development container.

## Related documentation

- [Set up a development environment](/how-to/setup-development).
- [Run Xila natively](/tutorials/native).
- [Run Xila with Docker](/how-to/run-container-guest).
- [Development command reference](/reference/development-commands).
- <CodeReference path=".github/workflows/check.yml" />.
