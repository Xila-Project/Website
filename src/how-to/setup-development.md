---
layout: doc
docType: how-to
description: Install Core's pinned Devbox toolchains and dependencies on x86_64 Linux.
---

# Set up a development environment

Prepare Core's pinned tools for development and the same host/guest checks used by CI.

## Before you begin

Use x86_64 Linux, Git, and internet access. Install [Devbox](https://www.jetify.com/docs/devbox/installing_devbox/) at the version recorded in Core's `.devbox-version`. A native GUI additionally needs a Wayland desktop with working GPU drivers; Windows uses x86_64 WSL2/WSLg and needs a GUI check.

## Set up the checkout

In a host terminal:

```bash
git clone https://github.com/Xila-Project/Core.git
cd Core
devbox shell
devbox run setup
```

Setup installs the pinned stable/nightly Rust toolchains, Rust components, both WASM targets, and npm dependencies. Devbox installs Nix if required and supplies the native tools listed in <CodeReference path="devbox.json" />.

Keep native display/session variables by entering without `--pure`. Leave the shell with `exit` when done. `.dev-environment/` and `.devbox/` hold removable local caches.

## Verify completion

Inside the Devbox shell, from Core's root:

```bash
devbox run check
```

Both the Linux host and guest-library checks should complete successfully. To verify GUI operation, run `devbox run gui` from the Wayland session and check rendering, input, and window closing. The native example's tuntap interface also requires host device access.

## Manual setup

Install the tools listed in `devbox.json` separately: Rust/rustup, cargo-make, Node.js, Trunk, Clang/libclang, multilib support, Mold, pkg-config, CMake/Ninja, Wayland/graphics libraries, Taplo, and coverage tooling as needed. Install the toolchain components/targets used by your tasks, then run `npm ci` from Core's root.

Cargo-make defaults to stable outside Devbox. For the pinned workflow, use the values in `development/toolchains.env`; its nightly is used by the browser example workflow.

## Embedded target setup

Leave Devbox before configuring ESP-IDF tools. Follow the esp-rs [Xtensa](https://docs.esp-rs.org/book/installation/riscv-and-xtensa.html) or [RISC-V](https://docs.esp-rs.org/book/installation/riscv.html) guide for the target. Flashing and serial permissions require separate setup.

## Troubleshooting

| Symptom                        | Action                                                                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| Missing tools or targets       | Run `devbox run setup` and resolve its reported error. For manual builds, install the target for the toolchain actually in use. |
| Font generation fails          | Confirm Node.js/npm dependencies are available, then run `cargo make generate-fonts` inside the shell.                          |
| Native window cannot open      | Check Wayland, inherited display/session variables, and GPU drivers.                                                            |
| Native network interface fails | Check tuntap device access and the configuration in <CodeReference path="drivers/std/src/tuntap/mod.rs" />.                     |

## Related documentation

- [Development environments and targets](/explanation/development-environments) for toolchain ownership and platform validation limits.
- [Development command reference](/reference/development-commands).
- [Run Xila natively](/tutorials/native) for a first guided run.
