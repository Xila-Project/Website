---
layout: doc
docType: tutorial
description: Build Calculator, run Xila in a browser, and evaluate an expression through the guest application.
---

# Run Calculator in the browser

This tutorial introduces browser-hosted Xila through Calculator. You will build a WASI application, embed it in the browser example, and use its graphical interface to compute `1 + 2 = 3`.

## Before you begin

- Use the x86_64 Linux [development environment](/how-to/setup-development). Devbox provides Trunk and the pinned Rust toolchains.
- Use a browser supporting OPFS, `FileSystemFileHandle.createWritable`, and Web Locks on localhost or HTTPS.
- Close other Xila tabs on the same origin so this example can open its disk.
- Keep the guest artifact in Core's default `target` directory; the browser build embeds it from that location.

## 1. Prepare Core

In a host terminal:

```bash
git clone https://github.com/Xila-Project/Core.git
cd Core
devbox shell
devbox run setup
```

When setup returns successfully, keep the shell open in Core's root. If you already completed setup in this checkout, enter its Devbox shell and continue.

## 2. Build Calculator

```bash
cargo build -p calculator --target wasm32-wasip1 --release
```

After the build succeeds, `target/wasm32-wasip1/release/calculator.wasm` should exist. This file is the guest program Xila will interpret.

## 3. Start browser-hosted Xila

Still in Core's root:

```bash
cargo make generate-fonts
(cd examples/wasm && RUSTUP_TOOLCHAIN="$XILA_NIGHTLY_TOOLCHAIN" trunk serve)
```

Open the local URL printed by Trunk. Keep the server running while you use the example. When boot succeeds, the Xila login screen should appear.

## 4. Open Calculator

On a fresh disk, log in as **administrator** with an empty password. If this origin already contains a Xila disk, use its saved credentials.

Open the application drawer with the Xila button in the dock and select **Calculator**. Its window should appear. Startup placed the bundled guest in the VFS and created this shortcut.

## 5. Evaluate an expression

Click **1**, **+**, **2**, and **=**. The result should be **3**. Close Calculator's window; it should disappear while the Xila desktop remains usable.

## Check your result

You have built a WASI guest and run it through Xila's graphical runtime in the browser. The expression result and window closing demonstrate more than a successful compilation.

Stop Trunk with `Ctrl+C` in its terminal when finished. The example keeps its origin's disk across reloads; closing a tab can lose changes since the last completed save. See [Browser storage](/explanation/browser-storage) before relying on persistence.

## Continue learning

- [Build a guest application](/how-to/build-guest) for the independent build workflow.
- [Run a guest from Xila's terminal](/how-to/run-guest).
- [WASM runtime reference](/reference/wasm-runtime) for features and current capabilities.
- [Reset the browser disk](/how-to/reset-browser-storage) when you deliberately want a fresh example.
