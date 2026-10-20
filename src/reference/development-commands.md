---
layout: doc
docType: reference
description: Cargo-make tasks, validation targets, toolchain version sources, and website development commands.
---

# Development commands

Core's task definitions are in <CodeReference path="Makefile.toml" />. Run `cargo make <task>` from Core's root inside the `xila-dev` development container shell. The Makefile initializes font generation before its tasks.

## Core tasks

| Task                                       | Behavior                                                                                                              |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `install-tools`                            | Runs `npm install` for tooling. The recommended checkout setup uses `npm ci`.                                         |
| `generate-fonts`                           | Generates LVGL fonts through `fonts_generator`.                                                                       |
| `format-rust`                              | Runs `cargo fmt --all`; accepts forwarded arguments.                                                                  |
| `format-toml`                              | Runs Taplo formatting; accepts forwarded arguments.                                                                   |
| `format-json`                              | Writes JSON formatting with Prettier.                                                                                 |
| `format`                                   | Runs Rust, TOML, and JSON formatters.                                                                                 |
| `translate-compare`                        | Compares local translations with Tolgee.                                                                              |
| `translate-sync`                           | Syncs translations and removes unused keys.                                                                           |
| `translate-pull`                           | Pulls translations from Tolgee.                                                                                       |
| `translate-push`                           | Pushes local translations to Tolgee.                                                                                  |
| `check-host`, `doc-host`, `clippy-host`    | Host compilation, documentation, or Clippy checks with the features below. Clippy denies warnings.                    |
| `check-guest`, `doc-guest`, `clippy-guest` | Guest-library compilation, documentation, or Clippy checks with the features below. Clippy denies warnings.           |
| `check`, `doc`, `clippy`                   | Runs both the corresponding host and guest tasks.                                                                     |
| `lint`                                     | Runs Clippy with all targets/features and denies warnings. Check feature compatibility before selecting all features. |
| `test`                                     | Runs `cargo test --workspace`.                                                                                        |
| `run`, `build`                             | Cargo run/build wrappers accepting forwarded arguments.                                                               |
| `coverage`                                 | Runs workspace coverage with cargo-llvm-cov and forwarded arguments.                                                  |
| `before-commit`                            | Runs `format`, `check`, `doc`, and `clippy`.                                                                          |

## Task targets and features

| Task family             | Target                     | Package/features                                                   |
| ----------------------- | -------------------------- | ------------------------------------------------------------------ |
| Host                    | `x86_64-unknown-linux-gnu` | `graphics,abi_definitions,graphics_rendering_xrgb8888`             |
| Guest library           | `wasm32-unknown-unknown`   | Package `wasm`, defaults disabled, `default_guest` enabled         |
| Application guest build | `wasm32-wasip1`            | Application package, such as `calculator`                          |
| Browser example build   | `wasm32-unknown-unknown`   | `wasm_example` through Trunk; Calculator release artifact required |

Cargo-make uses `XILA_RUST_TOOLCHAIN`, defaulting to stable if unset. The development image and CI provide pinned stable and nightly toolchains.

## Toolchain versions and development wrapper

The [development-environment repository](https://github.com/xila-project/development-environment) owns the pinned build image and its `scripts/xila-dev` wrapper. Core's `development/toolchains.env` records the Rust versions expected by its workflows, while `package-lock.json` pins its npm dependencies.

From the **host** in Core's root, with the development-environment repository checked out beside it:

```sh
../development-environment/scripts/xila-dev pull
../development-environment/scripts/xila-dev shell
../development-environment/scripts/xila-dev check
../development-environment/scripts/xila-dev --gui shell
```

`pull` downloads the image, `shell` opens the pinned toolchain (run `npm ci` there), `check` runs `cargo make check` in a new container, and `--gui shell` forwards the host display. The global `--gui` option must precede the subcommand.

The wrapper sets `CARGO_TARGET_DIR` to `.dev-environment/target`. Some native image-building recipes assume relative `target/` paths; follow the [native tutorial](/tutorials/native) for the necessary override.

## Website commands

These npm commands run from the **website repository root**, not Core:

| Command                 | Behavior                                                                    |
| ----------------------- | --------------------------------------------------------------------------- |
| `npm ci`                | Installs the lockfile-resolved website dependencies.                        |
| `npm run docs:dev`      | Starts VitePress development mode.                                          |
| `npm run docs:build`    | Builds the static site, sitemap, and Pagefind index.                        |
| `npm run docs:preview`  | Serves the production build for inspection.                                 |
| `npm run docs:validate` | Checks source links, generated-page anchors, and navigation after a build.  |
| `npm run format:fix`    | Formats repository files with Prettier.                                     |
| `npm run format:check`  | Checks Prettier formatting.                                                 |
| `npm run check`         | Checks formatting, builds documentation, and validates documentation links. |

## Related documentation

- [Set up a development environment](/how-to/setup-development).
- [Validate a Core change](/how-to/validate-core).
- [Write or update documentation](/how-to/write-documentation).
