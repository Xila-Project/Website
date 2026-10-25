---
layout: doc
docType: reference
description: Current mise tasks, target selection, toolchain sources, and website development commands.
---

# Development commands

Run Core tasks from the **Core repository root** using [mise](https://mise.jdx.dev/). Cargo Make and `Makefile.toml` were removed in Core #509; do not use `cargo make` or the former `xila-dev` build container. `mise.toml` defines shared tasks, `mise.development.toml` adds local tools and developer commands, and `mise.ci.toml` defines CI-only tasks.

## First-time local setup (Debian/Ubuntu)

```sh
mise trust
mise install --include-task-tools # optional: preinstall all task tools
mise bootstrap packages apply --manager apt
mise run deps:npm
mise run check:all
```

The default `development` environment is selected by `.miserc.toml`. Tasks install their declared tools when needed rather than activating a global toolchain; `mise tasks` shows the available commands. Native packages are bootstrapped separately. For CI commands use `MISE_ENV=ci` (or `mise -E ci run …`). Run ad-hoc Cargo builds through `mise run build:cargo -- ...` and binaries through `mise run run:cargo -- ...` to use the configured Rust integration/mbx.

## Common Core tasks

- `check:host` / `check:guest` / `check:all`: compile the Linux host and/or `wasm32-unknown-unknown` guest library.
- `clippy:host` / `clippy:guest` / `clippy:all`: lint the selected targets, denying warnings.
- `docs:host` / `docs:guest` / `docs:all`: build target-specific Rustdoc.
- `test:workspace`: run `cargo test --workspace`.
- `test:fonts`: validate font caching, compile-time selection, archive linking and recovery.
- `build:applications`: build the six bundled `wasm32-wasip1` WASI applications with the `release-wasm` profile.
- `image:native` / `image:wasm`: build bundled applications and prepare their matching LittleFS seed images.
- `build:profiling`: compile the profiling native example.
- `format:rust`, `format:toml`, `format:json`, `format:all`: developer formatting tasks; format commands do not bootstrap native packages.
- `dev:before-commit`: development checks across formatting, host/guest compilation, documentation and Clippy.
- `localization:lint`: check semantic translation keys and catalog consistency.
- `localization:check`: strictly check host and WASI application localization.
- `translate:compare` / `translate:pull` / `translate:push`: Tolgee commands. `translate:sync` removes unused remote keys: inspect and approve changes before using it.
- `coverage:host`: native host coverage.

Exact task definitions: <CodeReference path="mise.toml" />, <CodeReference path="mise.development.toml" />, <CodeReference path="mise.ci.toml" />.

## Targets, tools and CI

The current host check uses `x86_64-unknown-linux-gnu` with `graphics,abi_definitions,graphics_rendering_xrgb8888`. The guest-library check uses `wasm32-unknown-unknown` with the `wasm` package's `default_guest` feature and disabled defaults. Bundled guest applications instead build for `wasm32-wasip1`. The browser example itself targets `wasm32-unknown-unknown` and is built by Trunk.

Version pins are centralized in the `[vars]` table of `mise.toml` (Rust stable 1.99.0, Node 24.22.0, and target-specific tooling as of Core #510). CI profiles provision task-scoped tools and selected Linux packages; local tasks use the developer profile.

Core #510 separated the primary checks into <CodeReference path=".github/workflows/ci.yml" />, extended validation into <CodeReference path=".github/workflows/extended.yml" />, browser documentation/Pages into <CodeReference path=".github/workflows/pages.yml" />, and OCI runtime into <CodeReference path=".github/workflows/runtime.yml" />. The old `check.yml` and `deploy.yml` paths no longer exist.

## Website commands

Run these from the **website repository root**, not Core:

- `npm ci`: install website dependencies.
- `npm run docs:dev` / `npm run docs:build` / `npm run docs:preview`: develop, build, preview.
- `npm run docs:validate`: check internal links, references and navigation after building.
- `npm run format:fix` / `npm run format:check`: format/check with Prettier.
- `npm run check`: website tests, formatting, VitePress build and documentation validation.

## Related documentation

- [Set up development](/how-to/setup-development).
- [Validate a Core change](/how-to/validate-core).
- [Native tutorial](/tutorials/native) and [browser tutorial](/tutorials/browser).
