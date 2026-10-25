---
layout: doc
docType: tutorial
description: Prepare a WASI seed image and run Calculator inside browser-hosted Xila.
---

# Run Calculator in the browser

Build Xila's bundled WASI applications and browser-hosted runtime, then use Calculator to evaluate `1 + 2 = 3`.

## Before you begin

Follow [development setup](/how-to/setup-development) on supported Linux. Use a browser offering OPFS, `FileSystemFileHandle.createWritable` and Web Locks over localhost or HTTPS. If another Xila tab uses the **same** origin-private disk, close that tab before opening it again.

## 1. Prepare the guest image

In a **host terminal** from Core's root:

```sh
git clone https://github.com/xila-project/core.git
cd core
mise trust
mise bootstrap packages apply --manager apt
mise run deps:npm
mise run image:wasm
```

`image:wasm` compiles Calculator, Clock, Pixel Painter, Text Editor, Synth and Weather for `wasm32-wasip1` and writes `target/seed/wasm/seed.img`. These guest binaries are **not** the Xila browser host (`wasm32-unknown-unknown`). Keep the host, guest binaries, fonts and seed image built for the same compile-time locale.

## 2. Build and serve browser-hosted Xila

From Core's root, use the pinned CI task to build the browser demonstration:

```sh
MISE_ENV=ci mise run pages:demo
python3 -m http.server 8080 --directory examples/wasm/dist
```

Open `http://localhost:8080` in the browser. The Pages task selects the required nightly Rust target and Trunk. The browser's Help panel lets you choose, create and switch origin-private disks. Use the freshly seeded installation to follow this tutorial.

## 3. Run Calculator

On a new disk, log in as **administrator** with an empty password. Select **Calculator** in the app drawer and press **1**, **+**, **2**, **=**. Its display should show **3**. Close the Calculator window; the desktop should remain usable.

Clock, Pixel Painter, Text Editor, Synth and Weather are also bundled, though device/network and audio capabilities depend on the browser. Existing persistent disks are **not** automatically upgraded when a new seed is published.

## Check your result

A working Calculator verifies more than compiling: it exercises Wasmi guest execution, LVGL event handling and window cleanup. Refresh the tab after a completed disk save to verify persistence if your change affects storage. Abrupt closure can lose changes that have not been committed to OPFS.

Stop the local HTTP server with `Ctrl+C`. See [Browser storage](/explanation/browser-storage) before intentionally deleting an existing disk.

## Continue learning

- [Build a guest](/how-to/build-guest).
- [Run a guest from Xila's terminal](/how-to/run-guest).
- [WASM runtime](/reference/wasm-runtime).
