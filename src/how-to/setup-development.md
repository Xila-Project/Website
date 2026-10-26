---
layout: doc
docType: how-to
description: Set up Core development locally with the pinned mise tasks and tools.
---

# Set up a development environment

Core uses **mise** for local development and GitHub Actions (Core #509–#510). The earlier Cargo Make / `xila-dev` development-container workflow is obsolete. The `xila-runtime` OCI image is a separate product for running the headless operating system, not building Core.

## Prerequisites

Use Debian/Ubuntu Linux on x86_64 for the documented native build path, with Git, network access, and [mise](https://mise.jdx.dev/getting-started.html) installed. Native GUI testing additionally needs a functioning Wayland display and GPU drivers. WSL2/WSLg requires a separate GUI smoke test; native Windows, macOS, ARM Linux and NixOS have not been validated here.

## Set up Core

In a **host terminal**, clone and enter Core:

```sh
git clone https://github.com/xila-project/core.git
cd core
mise trust
mise install --include-task-tools # optional upfront tool installation
mise bootstrap packages apply --manager apt
mise run deps:npm
mise run check:all
```

The `mise bootstrap` command may request sudo for native Debian/Ubuntu packages. `mise run` resolves pinned, task-scoped tool versions on demand; the optional `mise install` command fetches them ahead of time. No build container is required.

`.miserc.toml` selects `mise.development.toml` by default. Shared tasks live in `mise.toml`, with version pins in its `[vars]` table. Use `mise tasks` to see available commands. CI uses `mise.ci.toml` and `MISE_ENV=ci` rather than reusing a development image.

## Build or run

From the same Core root, choose a task:

```sh
mise run image:native
mise run run:cargo -- -p xila-native-example --bin native_example -- --gui --no-network --seed-image target/seed/native/seed.img
```

`image:native` builds matching guest applications and a 16 MiB seed image. A fresh native disk uses that seed; an existing installation is not overwritten. For a display-free test, use the native example's `--display-driver headless` and the Debug client described in the [native tutorial](/tutorials/native).

For browser-hosted Xila, use `mise run image:wasm` to prepare the reference image, then follow the [browser tutorial](/tutorials/browser). For independent Cargo operations, `mise run build:cargo -- ...` and `mise run run:cargo -- ...` use the configured build integration.

## Embedded targets

Native/guest checks do not establish firmware correctness. Install board-specific compilers, flashing tools, and serial permissions separately, following the esp-rs [Xtensa](https://docs.esp-rs.org/book/installation/riscv-and-xtensa.html) or [RISC-V](https://docs.esp-rs.org/book/installation/riscv.html) guides.

## Related documentation

- [Development environments and targets](/explanation/development-environments).
- [Development commands](/reference/development-commands).
- [Run Xila natively](/tutorials/native).
