---
layout: doc
docType: tutorial
description: Build and run Xila's native desktop using the containerized development environment.
---

# Run Xila natively

Build Xila from Core, then open its native graphical desktop. The development container supplies **build tools**; it does not replace the Xila runtime. For the headless Xila shell in Docker, see [Run Xila with Docker](/how-to/run-container-guest).

## Before you begin

- Use x86_64 Linux with a Wayland desktop and working GPU/display drivers. The development wrapper has an X11 fallback; WSL2/WSLg needs a separate GUI smoke test.
- Install Git and either Docker or Podman, with permission to start containers.
- Allow internet access for the first image pull and dependency downloads.

Native Windows, macOS, ARM Linux, and NixOS are not validated by the current Linux native workflow. **Devbox is no longer required.**

## 1. Open Core in its development container

In a **host terminal**, clone the two repositories side by side:

```sh
git clone https://github.com/xila-project/development-environment.git
git clone https://github.com/xila-project/core.git
cd core
../development-environment/scripts/xila-dev pull
../development-environment/scripts/xila-dev --gui shell
```

The `xila-dev` wrapper lives in the **development-environment** repository, not Core. The `--gui` flag must appear before `shell`; it forwards the Wayland socket (or X11 fallback) and relevant GPU access. You are now in the build container, with Core mounted at `/workspace`.

## 2. Install dependencies and check the build

From Core's root, **inside that container shell**:

```sh
npm ci
cargo make check
```

The container already has the pinned Rust toolchains, WASM targets, native libraries, and `cargo-make`. The checks cover the host and guest-library configurations, not interactive GUI behavior.

## 3. Build the reference disk

Native Xila boots from a reference disk containing prebuilt WASI applications. Core's `prepare-native-image` task uses fixed `target/` paths, whereas `xila-dev` normally places Cargo outputs in `.dev-environment/target`. Before building the disk, choose the task's expected target directory:

```sh
export CARGO_TARGET_DIR=target
cargo make prepare-native-image
```

This generates `target/seed/native/seed.img` and builds the bundled applications. The new `target/` directory is ignored by Git. This override is currently necessary for the image-preparation task; it may rebuild artifacts that were previously compiled into `.dev-environment/target`.

## 4. Launch Xila's graphical desktop

Still inside the development shell:

```sh
cargo run -p native_example --bin native_example -- --gui --no-network \
  --seed-image target/seed/native/seed.img
```

The `--no-network` option makes the first run independent of host TUN/TAP permissions. A native Xila window should open. On a **fresh** disk, log in as **administrator** with an empty password, then check that windows and pointer input respond.

The live installation defaults to `./drive.img` in Core's working directory. Only an **absent** disk imports the seed. Later runs reuse its existing files and credentials; use `--disk-path PATH` for a separate installation, rather than deleting a disk with data.

## Check your result

The checks should succeed and the desktop should render and respond to input without an immediate panic. Close Xila and inspect the launching terminal for errors.

For a text-only native example, replace `--gui` with `--terminal`. For a display-free graphical debug session, Core also supports `--display-driver headless`; see <CodeReference path="examples/native/README.md" />.

## Continue learning

- [Run Xila with Docker](/how-to/run-container-guest) for its interactive command-line shell and WASI execution without a GUI.
- [Set up a development environment](/how-to/setup-development) for alternative wrapper commands.
- [Run Calculator in the browser](./browser) for browser-hosted Xila.
- [Architecture overview](/explanation/architecture/) for the components used here.
