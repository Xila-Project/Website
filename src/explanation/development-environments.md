---
layout: doc
docType: explanation
description: Understand Xila's pinned development tools, distinct WASM targets, and validation boundaries.
---

# Development environments and targets

Xila's development environment brings a Rust workspace, native libraries, generated graphics assets, and several execution targets together. Keeping those boundaries explicit makes build failures and validation results easier to interpret.

## A shared local and CI environment

Devbox is Core's standard environment on x86_64 Linux. Local development and CI use the same tool/version sources, so a contributor's build tools match the workflow's intended setup.

Devbox supplies native dependencies and a shell without requiring a container's GUI/device forwarding. A lighter tool-version manager would leave native dependencies to the operating system; direct Nix configuration would add another configuration surface to maintain. The native shell still depends on the host's display and GPU setup.

Pins are distributed across `.devbox-version` (Devbox CLI), `devbox.json`/`devbox.lock` (native tools), `development/toolchains.env` (Rust toolchains), and `package-lock.json` (npm dependencies). Related updates need coordinated validation. These pins do not freeze untracked Cargo lockfiles or moving Git dependencies.

## Three different execution contexts

| Context      | What executes                                                 | Relevant target                                     |
| ------------ | ------------------------------------------------------------- | --------------------------------------------------- |
| Native host  | Xila linked with native drivers in a desktop process          | Current host checks use `x86_64-unknown-linux-gnu`. |
| WASI guest   | An application interpreted inside Xila's Wasmi runtime        | Application builds use `wasm32-wasip1`.             |
| Browser host | Xila itself running in the browser, also hosting Wasmi guests | Example builds use `wasm32-unknown-unknown`.        |

The `wasm` package's `host` feature describes Xila hosting a guest; it also applies to browser-hosted Xila. It does not mean every host-runtime build targets a desktop operating system.

Guest-library checks use `wasm32-unknown-unknown` with defaults disabled and `default_guest` enabled. They complement actual WASI application builds; they do not replace them. The browser example workflow uses the pinned nightly, while Core's browser README also records a manually verified stable path.

## What validation establishes

Compilation checks establish that selected code/feature combinations build. A native UI smoke test exercises rendering, input, and closing in a real graphical session. Browser runtime/storage tests exercise browser APIs and guest behavior. Translation tests and Miri examine portable memory/borrowing boundaries.

Each has limits. None establishes that an ESP32, nRF, STM32, or other board works correctly, or that firmware meets RAM/flash constraints. Hardware behavior needs its target toolchain and device validation.

Native Windows, macOS, ARM Linux, and NixOS are unvalidated by the current Linux/Wayland workflow. Windows uses WSL2/WSLg with a GUI check. ESP-IDF and flashing/serial permissions are separate from Devbox's host/WASM setup.

## Related documentation

- [Set up a development environment](/how-to/setup-development).
- [Validate a Core change](/how-to/validate-core).
- [Development command reference](/reference/development-commands).
- <CodeReference path="devbox.json" /> and <CodeReference path=".github/workflows/check.yml" />.
