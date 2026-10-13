---
layout: doc
docType: tutorial
description: Set up Core and interact with Xila's native desktop in a Linux Wayland session.
---

# Run Xila natively

This tutorial is for your first native Xila run. You will prepare Core, run its host/guest checks, and open a desktop window that accepts input.

## Before you begin

- Use x86_64 Linux with a Wayland desktop and working host GPU drivers. Windows requires x86_64 WSL2/WSLg and a GUI smoke test.
- Install Git and [Devbox](https://www.jetify.com/docs/devbox/installing_devbox/). Use the Devbox version in Core's `.devbox-version`.
- Keep internet access available for the initial toolchain and dependency setup.
- Ensure the native example can create its tuntap interface; build-tool installation does not grant host device access. See <CodeReference path="drivers/std/src/tuntap/mod.rs" /> for its configuration.

Native Windows, macOS, ARM Linux, and NixOS are unvalidated by the current Linux/Wayland workflow. For setup alternatives or failures, use [Set up a development environment](/how-to/setup-development).

## 1. Open the checkout's development shell

In your host terminal, clone Core and enter its root:

```bash
git clone https://github.com/Xila-Project/Core.git
cd Core
devbox shell
```

You are now in Core's development shell. Keep this terminal open for the remaining commands. Enter without `--pure` so the Wayland display, runtime-directory, and session-bus settings remain available.

## 2. Install the project toolchains

From Core's root, inside the shell:

```bash
devbox run setup
```

Setup installs the pinned Rust toolchains, the required WASM targets, and npm dependencies. When it completes, it returns control to the shell. If it fails, resolve the reported download or setup error before continuing.

## 3. Check the checkout

```bash
devbox run check
```

This runs the Linux host and WASM guest checks. Continue when the command exits successfully; these compilation checks prepare the next step but do not check the GUI.

## 4. Open the native desktop

```bash
devbox run gui
```

A native Xila window should open. On the example's initial administrator login, use **administrator** with an empty password. Move the pointer and interact with the interface to check that rendering and input work.

## Check your result

The walkthrough is complete when the host/guest checks pass and the native window renders and responds to input without an immediate panic. Close the window and check the launching terminal for failures.

The example creates `drive.img` in the working directory. Keep it if you intend to reuse the example's disk; the browser storage procedure applies to a different disk.

## Continue learning

- [Run Calculator in the browser](./browser) to try a guest application.
- [Integrate Xila into a host application](/how-to/integrate-host) to assemble your own runtime.
- [Architecture overview](/explanation/architecture/) to understand the managers and drivers you just ran.
