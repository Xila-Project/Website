---
layout: doc
---

# 🌐 Use on WASM

There are two WASM targets: `wasm32-wasip1` for applications running inside Xila, and `wasm32-unknown-unknown` for Xila's browser example. The browser example hosts guest applications through Wasmi too.

## Requirements

Use the [Devbox setup](./contribute.md#tooling) on x86_64 Linux, or install the corresponding Rust/native tools manually. Setup installs both WASM targets and Trunk. The pinned versions come from Core's `development/toolchains.env`.

```bash
git clone https://github.com/Xila-Project/Core.git
cd Core
devbox shell
devbox run setup
```

For manual guest-only setup, install Rust and `rustup target add wasm32-wasip1`; graphical guest bindings also need the relevant native binding-generation tools.

## Quickstart (command-first)

Build the real Calculator guest:

```bash
cargo build -p calculator --target wasm32-wasip1 --release
```

Expected output: `target/wasm32-wasip1/release/calculator.wasm`. Keep this artifact in the repository's default `target` directory for the browser embedding step.

## App development path

Guest graphics helpers are in the `wasm` package. Core's `xila` package has no `wasm` feature. In a separate workspace, select the package and disable its default host runtime:

```toml
[dependencies]
wasm = { git = "https://github.com/Xila-Project/Core.git", default-features = false, features = ["guest", "graphics", "memory_32"] }
```

Use `default_guest` instead if you also need C wrappers and the generated `xila_graphics.h` header. Standard Rust WASI applications can use the implemented WASI surface without graphics wrappers.

Command guests export `_start: () -> ()`; optional installers export `__install: () -> ()`. Graphics guests must match the host's LVGL revision/configuration and supported [bindings](../architecture/modules/bindings.md). Full WASI/LVGL compatibility is not implemented.

## Run Xila in the browser

Inside the Devbox shell, after building Calculator:

```bash
cargo make generate-fonts
(cd examples/wasm && RUSTUP_TOOLCHAIN="$XILA_NIGHTLY_TOOLCHAIN" trunk serve)
```

Use `trunk build` instead of `trunk serve` for a build check. The pinned nightly is the Devbox/CI workflow; Core also documents a manually verified stable browser build in <CodeReference path="examples/wasm/README.md" />.

Open the served URL using localhost or HTTPS in a browser supporting OPFS, `FileSystemFileHandle.createWritable`, and Web Locks.

On a fresh disk, log in as **administrator** with an empty password; otherwise use saved credentials. Open the application drawer from the dock's Xila button and select **Calculator**. You can also launch it from Xila's terminal:

```text
/binaries/wasm /binaries/calculator
/binaries/wasm --install /binaries/calculator
```

Startup embeds Calculator, copies it to `/binaries/calculator`, and runs its installer to create a shortcut. Rebuild the guest before rebuilding the browser example when Calculator changes. Other guests must already be in the VFS; there is no upload mechanism.

## Persistent browser storage

The browser example stores its 16 MiB MBR/LittleFS disk in OPFS as `xila_drive.img`. Files, configuration, and credentials survive reloads on the same origin. Existing users/groups are restored; the default administrator is created only for a fresh disk. Invalid partition tables or mount failures stop boot without reformatting an existing image.

A lifetime Web Lock permits one Xila tab per disk. Close the first tab before opening another.

The main-thread drive uses a 16 MiB memory cache. It saves an atomic snapshot at boot, every second when dirty, and on normal shutdown. Saving temporarily needs another 16 MiB snapshot plus browser buffering; clean disks are not rewritten and snapshots do not accumulate in an unbounded queue.

Synchronous filesystem flushes update the cache. `DriveDevice::sync().await` waits for an OPFS commit and reports errors; autosave logs failures and retries. Abrupt reloads, tab closure, crashes, or background timer throttling can lose changes since the last successful save. Browser quotas, private browsing, eviction, or clearing site data can remove storage. Disk-size changes do not silently resize existing images.

To reset the demonstration, close its tabs and clear site data in browser settings.

## Runtime and browser limits

- Guests run cooperatively in Wasmi on Xila's browser executor; fuel exhaustion and supported WASI suspension yield to other tasks.
- WASI polling supports clocks, not file-descriptor readiness. WebAssembly start-section suspension is unsupported.
- `--stack-size` is parsed but unused; `--instruction-limit` configures a fuel quantum rather than a total execution cap.
- The browser example has no Xila network manager. Its HTTP device uses Fetch, follows CORS/security restrictions, and does not provide raw sockets.
- Embedded Calculator bytes, the VFS copy, the interpreter, and guest memory all contribute to browser memory usage.

## Validation and next steps

A successful build establishes compilation, not browser behavior. Open the served example and check rendering, input, Calculator's `1 + 2 = 3`, window closing, and file persistence after a completed save/reload.

- [Contribute](./contribute.md) for focused runtime and browser storage tests.
- [Use on Host](./use_host.md) for native runtime setup.
- [WASM executable](../architecture/executables/wasm.md) for launch contracts.
- <CodeReference path="examples/wasm/README.md" /> for browser verification and storage-test prerequisites.
