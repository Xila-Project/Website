---
layout: doc
docType: tutorial
description: Build a seeded native Xila installation and open its graphical desktop with mise.
---

# Run Xila natively

Build Xila from Core, prepare a filesystem seed, and open its native desktop on Linux. Core uses **mise** for builds; the older Cargo Make/development-container instructions no longer apply.

## Before you begin

Use x86_64 Debian/Ubuntu Linux with a working Wayland desktop for the graphical test. Install [mise](https://mise.jdx.dev/getting-started.html) and Git. The host toolchain and runtime have not been validated on native Windows, macOS, ARM Linux or NixOS. WSL2/WSLg requires its own GUI smoke test.

## 1. Prepare Core

In a **host terminal**:

```sh
git clone https://github.com/xila-project/core.git
cd core
mise trust
mise bootstrap packages apply --manager apt
mise run deps:npm
mise run check:all
```

The check covers selected Linux host and WASM guest-library builds, not the actual desktop. Mise installs task tools as needed; to preinstall the complete set, run `mise install --include-task-tools`.

## 2. Prepare the native seed

Still at Core's root:

```sh
mise run image:native
```

This builds the bundled `wasm32-wasip1` applications and writes a 16 MiB LittleFS seed to `target/seed/native/seed.img`. Xila imports that seed **only when the live disk is absent**. It does not overwrite an existing installation or upgrade its bundled apps.

## 3. Start the graphical runtime

```sh
mise run run:cargo -- -p xila-native-example --bin native_example -- --gui --no-network --seed-image target/seed/native/seed.img
```

A native Xila window should appear. On a new disk, log in as **administrator** with an empty password. Check that pointer input, the app launcher and window closing work. The default mutable disk is `./drive.img`; use `--disk-path PATH` to create a separate installation without risking saved data.

For text-only operation, replace `--gui` with `--terminal`. For a display-free graphical debug session, pass `--display-driver headless --resolution 800x600` and use the `xila-debug` client from another terminal. See <CodeReference path="examples/native/README.md" /> for the headless workflow and output limits.

## Check your result

The build/check commands and the graphical smoke test should complete without errors. This confirms the tested Linux environment, **not** embedded flash/RAM requirements or microcontroller correctness.

## Continue learning

- [Set up development](/how-to/setup-development).
- [Run Calculator in the browser](./browser).
- [Run the headless OCI runtime](/how-to/run-container-guest).
