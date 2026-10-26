---
layout: doc
docType: explanation
description: Discover Xila's reusable Rust contracts, helpers and implementations.
---

# Libraries

Libraries expose reusable contracts, types, protocols, algorithms, adapters and concrete implementations without owning an independently installed runtime service. They may be internally stateful or use subsystem interfaces; **architectural ownership and lifecycle** determine placement.

## Common foundations

- [Shared](/explanation/architecture/libraries/shared): portable shared types and helpers. <HostReference crate="shared" />.
- [Synchronization](/explanation/architecture/libraries/synchronization): synchronization abstractions. <HostReference crate="synchronization" />.
- [Internationalization](/explanation/architecture/libraries/internationalization): external `embedded-i18n` integration and build-time locales. <HostReference crate="embedded_i18n" />.

## Contracts and implementations

- [File system](/explanation/architecture/libraries/file_system): filesystem, path and device I/O contracts. <HostReference crate="file_system" />.
- [LittleFS](/explanation/architecture/libraries/little_fs): concrete embedded filesystem implementation. <HostReference crate="little_fs" />.
- [HTTP](/explanation/architecture/libraries/http): portable, bounded, `no_std` HTTP/1 parsing and decoding. <HostReference crate="http" />.
- [Device](/explanation/architecture/libraries/device): device-control and backend-independent neural-network inference contracts. <HostReference crate="device" />.
- [Debug protocol](/explanation/architecture/libraries/debug_protocol): headless diagnostics requests, UI input and screenshot frame validation. <HostReference crate="debug_protocol" />.
- [Peripherals](/explanation/architecture/libraries/peripherals): embedded-hal GPIO contract and fixed-capacity mock. <HostReference crate="peripherals" />.
- [Audio](/explanation/architecture/libraries/audio): bounded PCM device contract, buffers and mixer implementation. <HostReference crate="audio" />.
- [Firmware update](/explanation/architecture/libraries/firmware_update): experimental `no_std` firmware transaction backend and native signed NOR simulator. <HostReference crate="firmware_update" />.
- [Verification](/explanation/architecture/libraries/verification): `no_std` SHA-256 streaming hashes and optional strict Ed25519 verification, without package trust policy. <HostReference crate="verification" />.

## Execution and support

- [ABI](/explanation/architecture/libraries/abi): C declarations, exports and interoperability contracts.
- [Executable](/explanation/architecture/libraries/executable): executable protocol, context and launcher helpers. <HostReference crate="executable" />.
- [Application metadata](/explanation/architecture/libraries/application_metadata): shared guest/native application inventory and shortcut metadata. <HostReference crate="application_metadata" />.
- [Authentication](/explanation/architecture/libraries/authentication): reusable credential/verification operations. <HostReference crate="authentication" />.
- [Bootsplash](/explanation/architecture/libraries/bootsplash): startup animation implementation. <HostReference crate="bootsplash" />.
- [Testing](/explanation/architecture/libraries/testing): test assembly helpers.

See [Subsystems](/explanation/architecture/subsystems/) for runtime owners, [Drivers](/explanation/architecture/drivers/) for target implementations and [Executables](/explanation/architecture/executables/) for launched programs and Wasmi integration.

## Library API boundaries

Each page describes **what code may rely on**, **how resources and lifetimes are managed**, and **what remains incomplete**. Distinguish the named Cargo crate from the runtime owner: for example, `audio` manages caller-owned PCM streams while [Graphics](/explanation/architecture/subsystems/graphics) owns the active LVGL runtime.

For code links, the Core repository uses `libraries/<crate>/` after [Core #457](https://github.com/xila-project/core/pull/457). The eight runtime-owned services instead live under `subsystems/`. Internationalization is an **external embedded-i18n integration**, not a separate first-party crate, so use its page for build-time locale workflows.

When extending one of these APIs, check the direct source links in its page and the generated host Rustdoc for exact method names, feature gates, preconditions, error types and ownership constraints.
