---
layout: doc
---

# 🚀 Get Started

Use this page to pick the fastest path to a first successful run.

## Choose your path

- **First-time user (5-10 min):** [🖥️ Use on Host](./use_host.md)
- **Integrator (15-30 min):** [🖥️ Use on Host](./use_host.md#integrator-path)
- **WASM app developer (10-20 min):** [🌐 Use on WASM](./use_wasm.md)
- **Contributor (20-40 min):** [🤝 Contribute](./contribute.md)

Checklist links:

- [Host preflight checklist](./use_host.md#requirements)
- [WASM preflight checklist](./use_wasm.md#requirements)
- [Contributor preflight checklist](./contribute.md#tooling)

## Preflight checklist

Before you start, confirm:

- Devbox is installed at Core's `.devbox-version` on x86_64 Linux, or the manual native/Rust tools are installed.
- Setup has completed: `devbox run setup` installs toolchains, targets, and npm dependencies.
- You chose one target path (host, wasm, or contribution)
- You can run commands from a clean project folder

## Quick start commands

Pick one path and run the matching command sequence:

### Host

```bash
git clone https://github.com/Xila-Project/Core.git
cd Core
devbox shell
devbox run setup
devbox run gui
```

### WASM

```bash
git clone https://github.com/Xila-Project/Core.git
cd Core
devbox shell
devbox run setup
cargo build -p calculator --target wasm32-wasip1 --release
cargo make generate-fonts
(cd examples/wasm && RUSTUP_TOOLCHAIN="$XILA_NIGHTLY_TOOLCHAIN" trunk serve)
```

### Contributor

```bash
git clone https://github.com/Xila-Project/Core.git
cd Core
devbox shell
devbox run setup
cargo make before-commit
```

## Success outcomes

You are "started" when you can do one of these:

- **Host path:** run a host app and see it start without panics
- **Integrator path:** initialize modules, mount runtime services, and launch one executable in your workspace
- **WASM path:** build a `wasm32-wasip1` guest, run Calculator in the browser example, and close its window successfully
- **Contributor path:** run both native and wasm examples locally

## Troubleshooting

- `cargo make: command not found`: install `cargo-make` (`cargo install cargo-make`).
- target missing errors for wasm: run `rustup target add wasm32-wasip1`.
- build failures after dependency updates: run formatting/check tasks from `contribute.md`.

## Architecture maps

Use these while onboarding to understand the system boundaries:

- [Modules architecture map](../architecture/modules/index.md)
- [Crates architecture map](../architecture/crates/index.md)
- [Executables architecture map](../architecture/executables/index.md)

## Next steps

- Continue with [🖥️ Use on Host](./use_host.md) for local runtime setup.
- Continue with [🌐 Use on WASM](./use_wasm.md) for guest app workflow.
- Continue with [🤝 Contribute](./contribute.md) for contributor workflow.
