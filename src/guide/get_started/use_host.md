---
layout: doc
---

# 🚀 Get started to use on host

This guide explains how to deploy Xila on real hardware or your host machine.

## ✅ Requirements

- [Rust/Cargo](https://www.rust-lang.org/tools/install): Required to build and manage Rust projects.
- `gcc-multilib`: Needed to build 32-bit binaries on 64-bit systems.
- `nodejs`: Used to generate fonts for LVGL ([lv_font_conv](https://github.com/lvgl/lv_font_conv)).

## 📖 Steps

1. **Add Xila as a dependency** in your `Cargo.toml` file within a blank Cargo workspace:

```toml
[dependencies]
xila = { git = "https://github.com/Xila-Project/Core.git", features = ["host"] }
```

2. **Set up your project workspace**:
   - Implement or reuse drivers from the `xila::drivers` module and register them in the Virtual File System.
   - Initialize the Xila modules you want to use, such as the Task Manager, Graphics, File System, etc.
   - Configure any required environment variables.
   - Run the graphical shell, command-line shell, or your custom application.

::: info
For more details, refer to the <CodeReference path="examples/native" /> or <CodeReference path="examples/wasm" />.
:::
