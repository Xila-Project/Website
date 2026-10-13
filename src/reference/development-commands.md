---
layout: doc
docType: reference
description: Cargo-make tasks, validation targets, toolchain version sources, and website development commands.
---

# Development commands

Core's task definitions are in <CodeReference path="Makefile.toml" />. Run `cargo make <task>` from Core's root inside its configured development shell. The Makefile initializes font generation before its tasks.

## Core tasks

| Task                                       | Behavior                                                                                                              |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `install-tools`                            | Runs `npm install` for tooling. Standard Devbox setup uses `npm ci`.                                                  |
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

Cargo-make uses `XILA_RUST_TOOLCHAIN`, defaulting to stable outside Devbox. The Devbox/CI browser workflow uses `XILA_NIGHTLY_TOOLCHAIN`.

## Version sources and Devbox scripts

| Source                        | Defines                                            |
| ----------------------------- | -------------------------------------------------- |
| `.devbox-version`             | Devbox CLI version                                 |
| `devbox.json` / `devbox.lock` | Native tool selection and pins                     |
| `development/toolchains.env`  | `XILA_RUST_TOOLCHAIN` and `XILA_NIGHTLY_TOOLCHAIN` |
| `package-lock.json`           | npm dependency resolution                          |

| Devbox command     | Behavior                                                                              |
| ------------------ | ------------------------------------------------------------------------------------- |
| `devbox run setup` | Installs Rust toolchains/components/targets and runs `npm ci`; requires x86_64 Linux. |
| `devbox run check` | Runs `cargo make check`.                                                              |
| `devbox run gui`   | Runs `cargo make run -p native_example`.                                              |

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
