---
layout: doc
docType: how-to
description: Set up Core's pinned Docker or Podman build tools without Devbox.
---

# Set up a development environment

Use the separate [Xila development-environment repository](https://github.com/xila-project/development-environment) for Core's pinned Rust, WASM, Node.js, Cargo tooling, and native dependencies. This **build container** is different from the `xila-runtime` Docker image that executes Xila.

## Before you begin

Install Git and Docker or Podman, with permission to run containers and internet access for the initial pull. Core's native desktop workflow targets x86_64 Linux with Wayland; the wrapper also forwards X11 if Wayland is unavailable.

## Set up the checkout

In a **host terminal**, clone both repositories side by side:

```sh
git clone https://github.com/xila-project/development-environment.git
git clone https://github.com/xila-project/core.git
cd core
../development-environment/scripts/xila-dev pull
../development-environment/scripts/xila-dev shell
```

The wrapper is in `development-environment/scripts/xila-dev`, **not Core**. It mounts Core at `/workspace`, runs as your host UID/GID, and keeps removable Cargo/npm caches under `.dev-environment/`.

In the **container shell**, from Core's root:

```sh
npm ci
cargo make check
```

Exit with `exit`. To run the checks without an interactive shell, use `../development-environment/scripts/xila-dev check` in Core's **host** directory after preparing npm dependencies.

## Run with a display or host device

For native GUI work, start a **new shell from the host**, opting into display forwarding:

```sh
../development-environment/scripts/xila-dev --gui shell
```

The `--gui` flag must precede the subcommand. It forwards the Wayland socket or X11 fallback; no display forwarding occurs by default. See [Run Xila natively](/tutorials/native) for preparing the boot disk and launching Xila.

When hardware access is required, add `--device /dev/...` before `shell`, only for the specific device you need.

## Wrapper commands

These run from the **host Core directory** after cloning development-environment beside it:

```sh
../development-environment/scripts/xila-dev doctor
../development-environment/scripts/xila-dev check
../development-environment/scripts/xila-dev run -- cargo --version
../development-environment/scripts/xila-dev --print --gui shell
```

To use a different checkout, specify `--workspace PATH` before the subcommand. The wrapper supports Docker/Podman selection, local images, reusable caches, and opt-in display/device access. See its [README](https://github.com/xila-project/development-environment#using-scriptsxila-dev).

## Manual setup

Instead of the image, manually install Rust/rustup, `cargo-make`, Node/npm, Trunk, Clang/libclang, CMake/Ninja, pkg-config, and graphics/system dependencies appropriate for your target. Use the environment repository's [packages.txt](https://github.com/xila-project/development-environment/blob/main/packages.txt) and [toolchains.env](https://github.com/xila-project/development-environment/blob/main/toolchains.env) as a reference, then run `npm ci` from Core. Manual configurations are not guaranteed to match CI.

## Embedded target setup

ESP-IDF toolchains, flashing, and serial permissions require separate setup. Follow the esp-rs [Xtensa](https://docs.esp-rs.org/book/installation/riscv-and-xtensa.html) or [RISC-V](https://docs.esp-rs.org/book/installation/riscv.html) guide for the target.

## Related documentation

- [Development environments and targets](/explanation/development-environments).
- [Development command reference](/reference/development-commands).
- [Run Xila natively](/tutorials/native).
