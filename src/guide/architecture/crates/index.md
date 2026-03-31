---
layout: doc
---

# 📦 Crates

This section is an architecture map of the library crates used by Core modules and executable crates.

Compared with [Modules](../modules/), these crates define reusable contracts, data models, and helper layers. Stateful orchestration usually happens in module singletons (for example task/users/virtual_file_system), while crates provide the typed interfaces those modules and executables consume.

## Architecture map

### Foundation and cross-cutting

- [📦 Shared](./shared.md): common low-level types (`shared::flags`, units, HTTP/time helpers, UTF-8/slice utilities).
- [🔃 Synchronization](./synchronization.md): synchronization facade (`Arc` + `embassy_sync` re-exports).
- [🎯 Target](./target.md): build-target introspection from Cargo environment.
- [🌐 Internationalization](./internationalization.md): locale lookup + `translate!` macro pipeline.

### Storage and device contract stack

- [📁 File System](./file_system.md): core path/metadata/device/file-system traits.
- [📁 Little FS](./little_fs.md): concrete `FileSystemOperations` backend on top of `littlefs2-sys`.
- [🔌 Device](./device.md): typed control commands for device endpoints (currently hash commands).
- [🎛️ Peripherals](./peripherals.md): compact shared pin-state payload model.

### Runtime-facing crates

- [🏁 Executable](./executables.md): executable contract and launcher path (`GET_MAIN_FUNCTION`, `execute`).
- [🔒 Authentication](./authentication.md): persistent users/groups + password verification routines.
- [✨ Bootsplash](./bootsplash.md): startup animation crate integrated with graphics manager/LVGL.
- [🧪 Testing](./testing.md): host-oriented integration runtime assembly for tests.

## Reading order (crates-first)

This order stays neutral and follows dependency direction from shared abstractions to runtime usage:

1. [📦 Shared](./shared.md)
2. [🔃 Synchronization](./synchronization.md)
3. [🎯 Target](./target.md)
4. [🌐 Internationalization](./internationalization.md)
5. [📁 File System](./file_system.md)
6. [📁 Little FS](./little_fs.md)
7. [🔌 Device](./device.md)
8. [🎛️ Peripherals](./peripherals.md)
9. [🏁 Executable](./executables.md)
10. [🔒 Authentication](./authentication.md)
11. [✨ Bootsplash](./bootsplash.md)
12. [🧪 Testing](./testing.md)

## Contract vs implementation

- **Contract**: this index documents stable architecture boundaries and navigation order for crate-level contracts.
- **Current implementation**: the mapped crates correspond to the current Core workspace crate layout and dependency direction.
