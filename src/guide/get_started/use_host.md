---
layout: doc
---

# 🖥️ Use on Host

Run the native example first, then reuse its runtime assembly in your own application.

## Requirements

The standard local and CI environment is **x86_64 Linux with Devbox**. Install [Devbox](https://www.jetify.com/docs/devbox/installing_devbox/) at the version recorded in Core's `.devbox-version`. It supplies the native build tools, Rust manager, cargo-make, Node.js, and Trunk.

A Wayland desktop is required for the native GUI. Windows uses x86_64 WSL2/WSLg and needs a GUI smoke test. Native Windows, macOS, ARM Linux, and NixOS are unvalidated; the current host checks and native event loop depend on Linux/Wayland.

## Quickstart (command-first)

```bash
git clone https://github.com/Xila-Project/Core.git
cd Core
devbox shell
devbox run setup
devbox run check
devbox run gui
```

Setup installs the pinned Rust toolchains and WASM targets and runs `npm ci`. Initial setup needs internet access. Run the GUI from the Wayland session without `--pure` so display, runtime-directory, and session-bus settings are retained. Keep the host GPU drivers.

Expected success: the host/guest checks pass and a native window renders, accepts input, and closes correctly. The native example also creates a tuntap interface; device access and host network configuration are separate from installing build tools.

## Manual setup

Manual workflows remain supported: install the native tools listed in <CodeReference path="devbox.json" />, install Rust and both WASM targets, and run `npm ci`. This includes Clang/libclang, multilib support, Mold, pkg-config, CMake/Ninja, Node.js, and Wayland/graphics libraries. Outside Devbox, cargo-make defaults to the stable Rust toolchain.

```bash
cargo make run -p native_example
```

See [Contribute](./contribute.md) for validation and embedded-target setup.

## Integrator path

Core's `xila` package uses its default service features plus optional graphics/rendering features; it has no `host` feature:

```toml
[dependencies]
xila = { git = "https://github.com/Xila-Project/Core.git", features = ["graphics_rendering_xrgb8888"] }
```

Then follow the complete <CodeReference path="examples/native/src/main.rs" /> assembly:

1. Add the platform driver crates separately, such as `drivers_std` and `drivers_native`; they are not re-exported through `xila::drivers`.
2. Construct task, users, and time managers and keep them alive for their consumers.
3. Initialize graphics with the time manager; initialize VFS with task/users/time managers and the root backend, then mount devices.
4. Initialize optional networking with explicit dependencies.
5. Build an `ExecutableContext`, mount executables with that context, and open `Standard` streams carrying it.
6. Launch via `executable::execute(context, path, args, standard, spawner)`.

The examples use static storage and leaked boxes to provide required `'static` lifetimes. Plan manager ownership and RAM usage for your target. Process-wide allocator, logger, C ABI, and LVGL callback registration still need startup wiring.

## Troubleshooting

- Missing tools or targets: run `devbox run setup` in the checkout.
- Font failures: run `cargo make generate-fonts` inside the shell.
- GUI startup failure: check the Wayland session, inherited display variables, and GPU drivers.
- Network interface failure: check tuntap device access and the native example's host network requirements.
- Target-specific issues: host/WASM checks do not establish embedded hardware correctness.

## Next steps

- [Use on WASM](./use_wasm.md) for guest and browser workflows.
- [Contribute](./contribute.md) for validation tasks.
- [Architecture](../architecture/index.md) for manager/context ownership.
- [WASM executable](../architecture/executables/wasm.md) for guest launch behavior.
