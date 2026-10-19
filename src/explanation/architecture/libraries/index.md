---
layout: doc
docType: explanation
description: "This section is an architecture map of the library crates used by Core modules and executable crates."
---

# Crates

This section is an architecture map of the library crates used by Core modules and executable crates.

Compared with [Modules](/explanation/architecture/modules/), these crates define reusable contracts, data models, and helper layers. Stateful orchestration happens in explicitly owned managers (for example task/users/virtual_file_system), while crates provide the typed interfaces those modules and executables consume.

## Architecture map

### Foundation and cross-cutting

- [Shared](/explanation/architecture/crates/shared): common low-level types (`shared::flags`, units, HTTP/time helpers, UTF-8/slice utilities).
- [Synchronization](/explanation/architecture/crates/synchronization): synchronization facade (`Arc` + `embassy_sync` re-exports).
- [Target](/explanation/architecture/crates/target): build-target introspection from Cargo environment.
- [Internationalization](/explanation/architecture/crates/internationalization): external `embedded-i18n` integration, build-time locales, and font ranges.

### Storage and device contract stack

- [File System](/explanation/architecture/crates/file_system): core path/metadata/device/file-system traits.
- [Little FS](/explanation/architecture/crates/little_fs): concrete `FileSystemOperations` backend on top of `littlefs2-sys`.
- [Device](/explanation/architecture/crates/device): typed control commands for device endpoints (currently hash commands).
- [Peripherals](/explanation/architecture/crates/peripherals): compact shared pin-state payload model.

### Runtime-facing crates

- [Executable](/explanation/architecture/crates/executables): executable contract and launcher path (`GET_MAIN_FUNCTION`, `execute`).
- [Authentication](/explanation/architecture/crates/authentication): persistent users/groups + password verification routines.
- [Bootsplash](/explanation/architecture/crates/bootsplash): startup animation crate integrated with graphics manager/LVGL.
- [Testing](/explanation/architecture/crates/testing): host-oriented integration runtime assembly for tests.

## Reading order (crates-first)

This order stays neutral and follows dependency direction from shared abstractions to runtime usage:

1. [Shared](/explanation/architecture/crates/shared)
2. [Synchronization](/explanation/architecture/crates/synchronization)
3. [Target](/explanation/architecture/crates/target)
4. [Internationalization](/explanation/architecture/crates/internationalization)
5. [File System](/explanation/architecture/crates/file_system)
6. [Little FS](/explanation/architecture/crates/little_fs)
7. [Device](/explanation/architecture/crates/device)
8. [Peripherals](/explanation/architecture/crates/peripherals)
9. [Executable](/explanation/architecture/crates/executables)
10. [Authentication](/explanation/architecture/crates/authentication)
11. [Bootsplash](/explanation/architecture/crates/bootsplash)
12. [Testing](/explanation/architecture/crates/testing)

## Contract vs implementation

- **Contract**: this index documents stable architecture boundaries and navigation order for crate-level contracts.
- **Current implementation**: the mapped crates correspond to the current Core workspace crate layout and dependency direction.
