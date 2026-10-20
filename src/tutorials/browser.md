---
layout: doc
docType: tutorial
description: Build Xila's bundled WASI applications, run Xila in a browser, and evaluate an expression through Calculator.
---

# Run Calculator in the browser

This tutorial introduces browser-hosted Xila through Calculator. You will build the WASI applications required by the browser demonstration, start the `wasm32-unknown-unknown` Xila host, and use Calculator to compute `1 + 2 = 3`.

## Before you begin

- Use the x86_64 Linux [development environment](/how-to/setup-development). Its build image provides Trunk and the pinned Rust toolchains.
- Use a browser supporting OPFS, `FileSystemFileHandle.createWritable`, and Web Locks on localhost or HTTPS.
- Close another Xila tab only when it is using the same browser disk you intend to open. Different tabs may use different images.
- Keep guest artifacts in Core's default `target` directory; the browser build embeds them from there.

## 1. Prepare Core

In a host terminal:

```bash
git clone https://github.com/xila-project/development-environment.git
git clone https://github.com/xila-project/core.git
cd core
../development-environment/scripts/xila-dev pull
../development-environment/scripts/xila-dev shell
npm ci
```

Keep the development container shell open in Core's root. If the image and npm dependencies are already installed, enter the same container shell and continue.

## 2. Build the bundled WASI applications

The browser host embeds Calculator, Clock, and Pixel Painter, so build all three before Trunk compiles the host:

```bash
cargo build -p calculator -p clock -p pixel_painter --target wasm32-wasip1 --release
```

After the build succeeds, these files should exist:

```text
target/wasm32-wasip1/release/calculator.wasm
target/wasm32-wasip1/release/clock.wasm
target/wasm32-wasip1/release/pixel_painter.wasm
```

These are guest programs interpreted by Xila's Wasmi runtime; they are distinct from the browser-hosted Xila binary.

## 3. Start browser-hosted Xila

Still in Core's root:

```bash
cargo make generate-fonts
(cd examples/wasm && RUSTUP_TOOLCHAIN="$XILA_NIGHTLY_TOOLCHAIN" trunk serve)
```

Open the local URL printed by Trunk. Keep the server running while you use the example. The **Xila Help** panel lists the current origin's saved disks and lets you create or select another image before using the desktop.

When boot succeeds, the Xila login screen should appear.

## 4. Open Calculator

On a fresh disk, log in as **administrator** with an empty password. If the selected image already contains Xila data, use that disk's saved credentials.

Open the application drawer with the Xila button in the dock and select **Calculator**. Its window should appear. Startup placed the bundled guest in the VFS and installed its shortcut. Clock and Pixel Painter are installed the same way and should also appear on a fresh disk.

## 5. Evaluate an expression

Click **1**, **+**, **2**, and **=**. The result should be **3**. Close Calculator's window; it should disappear while the Xila desktop remains usable.

## Check your result

You have built `wasm32-wasip1` applications and run one through browser-hosted Xila. The expression result and window closing demonstrate guest execution, graphics events, and normal VM cleanup rather than only a successful compilation.

Stop Trunk with `Ctrl+C` in its terminal when finished. The selected browser disk persists across reloads, but abrupt tab closure can lose changes since the last completed save. The Help panel can create, switch, and remove disk images; see [Browser storage](/explanation/browser-storage) before relying on persistence.

## Continue learning

- [Build a guest application](/how-to/build-guest) for the independent build workflow.
- [Run a guest from Xila's terminal](/how-to/run-guest).
- [WASM runtime reference](/reference/wasm-runtime) for features and current capabilities.
- [Manage browser disks](/how-to/reset-browser-storage) to create, switch, or deliberately remove images.
- [Pixel Painter architecture](/explanation/architecture/executables/pixel_painter) for an application using the indexed-canvas ABI.
