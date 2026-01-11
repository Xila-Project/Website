# Get started using Xila on native

Here you will find how to get started with Xila hardware and software.

## ✅ Requirements

- [Rust](https://www.rust-lang.org/tools/install)

## 📖 Steps

1. **Clone recursively** the [Xila](https://github.com/Xila-Project/Core) repository on GitHub.

```bash
git clone https://github.com/Xila-Project/Core --recurse-submodule
```

2. **Change** directory to the cloned folder :

```bash
cd Core
```

3. **Source** the `Export.sh` script in the cloned folder :

```bash
source Export.sh
```

4. **Run** Xila :

```bash
xila run <target>
```

5. (Optional) If you want to build software for Xila, you can also install WASM32 / WASI target for your favorite langage.
   - For Rust :

   ```bash
   rustup target add wasm32-wasip1
   ```

   - For C check [wasi-sdk](https://github.com/WebAssembly/wasi-sdk)
   - For Go check [TinyGo](https://tinygo.org/docs/guides/webassembly/wasi/)
