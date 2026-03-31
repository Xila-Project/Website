---
layout: doc
---

# 🖥️ Use on Host

Use this path if you want to run Xila natively on your machine first, then integrate it into your own workspace.

## Requirements

- [Rust/Cargo](https://www.rust-lang.org/tools/install)
- [`cargo-make`](https://github.com/sagiegurari/cargo-make)
- `gcc-multilib` (for 32-bit builds on 64-bit hosts)
- `nodejs` (font tooling via [lv_font_conv](https://github.com/lvgl/lv_font_conv))

## Quickstart (command-first)

Use this to get a first native run signal quickly.

```bash
git clone https://github.com/Xila-Project/Core.git
cd Core
cargo make run -p native_example
```

Expected success signal:

- A native window or console app starts, and the process runs without immediate panic.

## What this sets up

- A host-targeted Xila runtime path using native drivers and the host feature set.
- A reproducible baseline to verify your machine/toolchain before integrating into your own app.

If `cargo make` is missing:

```bash
cargo install cargo-make
```

## Integrator path

Once the native example works, create your own workspace and add Xila:

```toml
[dependencies]
xila = { git = "https://github.com/Xila-Project/Core.git", features = ["host"] }
```

Then follow this practical sequence:

1. Implement or reuse drivers from `xila::drivers`.
2. Register drivers in the Virtual File System.
3. Initialize only the modules you need (task, graphics, file system, ...).
4. Run your shell/app entrypoint.

Expected success signal:

- Your app links, starts, and reaches your Xila initialization code path.

## Troubleshooting

- `cargo make: command not found`: install with `cargo install cargo-make` and restart the shell.
- 32-bit link/build issues: install `gcc-multilib` and retry.
- Font-related build failures: ensure `nodejs` is available and rerun font generation tasks.
- Unsure where a component belongs: use the architecture maps below before wiring modules.

## Next steps

- Read [Use on WASM](./use_wasm.md) if you also need guest apps.
- Use [Contribute](./contribute.md) for full project workflows and checks.
- Review [Modules architecture map](../architecture/modules/index.md) and [Crates architecture map](../architecture/crates/index.md).
- Review [WASM executable architecture](../architecture/executables/wasm.md), [Command line shell architecture](../architecture/executables/command_line_shell.md), and [Graphical shell architecture](../architecture/executables/graphical_shell.md).

::: info
For more details, refer to the <CodeReference path="examples/native" /> or <CodeReference path="examples/wasm" />.
:::
