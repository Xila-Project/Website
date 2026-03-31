---
layout: doc
---

# 🌐 Use on WASM

Use this path if you want to build and run Xila guest applications with WebAssembly.

## Requirements

- [Rust/Cargo](https://www.rust-lang.org/tools/install)
- [`cargo-make`](https://github.com/sagiegurari/cargo-make) (recommended for workspace tasks)
- `wasm32-wasip1` Rust target (required)
- `wasm32-unknown-unknown` Rust target (optional, for `wasm_example`)
- `nightly` toolchain (optional, for `wasm_example`)

## WASM target setup

```bash
rustup target add wasm32-wasip1
```

Optional setup for the web example:

```bash
rustup target add wasm32-unknown-unknown
rustup toolchain install nightly
```

Expected success signal:

- `rustup target list --installed` includes `wasm32-wasip1`.

## Quickstart (command-first)

Build a guest executable from Core:

```bash
git clone https://github.com/Xila-Project/Core.git
cd Core
cargo build -p calculator --target wasm32-wasip1
```

Expected success signal:

- Build completes and produces a `.wasm` artifact under `target/wasm32-wasip1/...`.

## App development path

In your own workspace, add Xila with the wasm feature:

```toml
[dependencies]
xila = { git = "https://github.com/Xila-Project/Core.git", features = ["wasm"] }
```

Then build in this order:

1. Start with standard Rust WASM APIs (fs/time/process constraints in mind).
2. Add Xila modules you need (graphics, networking, etc.).
3. Compile early with `--target wasm32-wasip1` to catch target-specific issues.

Expected success signal:

- Your app compiles for `wasm32-wasip1` without missing target or feature errors.

## Troubleshooting

- `target ... not found`: rerun `rustup target add wasm32-wasip1`.
- `can't find crate for std`: ensure you are building with `--target wasm32-wasip1` and target is installed.
- Nightly-only errors for web example: install nightly and retry with the expected toolchain.
- Not sure where guest/runtime boundaries are: review architecture maps before splitting crates.

## Next steps

- For native execution, continue with [Use on Host](./use_host.md).
- For contribution workflows, go to [Contribute](./contribute.md).
- Review [Executables architecture map](../architecture/executables/index.md) and [Crates architecture map](../architecture/crates/index.md).
- Review [WASM executable architecture](../architecture/executables/wasm.md), [Command line shell architecture](../architecture/executables/command_line_shell.md), and [Graphical shell architecture](../architecture/executables/graphical_shell.md).

::: info
For more details, refer to the <CodeReference path="executables/calculator" /> example application.
:::
