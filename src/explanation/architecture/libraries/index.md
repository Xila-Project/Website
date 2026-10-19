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
- [Target](/explanation/architecture/libraries/target): target/build configuration utilities. <HostReference crate="target" />.
- [Internationalization](/explanation/architecture/libraries/internationalization): external `embedded-i18n` integration and build-time locales. <HostReference crate="internationalization" />.

## Contracts and implementations

- [File system](/explanation/architecture/libraries/file_system): filesystem, path and device I/O contracts. <HostReference crate="file_system" />.
- [LittleFS](/explanation/architecture/libraries/little_fs): concrete embedded filesystem implementation. <HostReference crate="littlefs" />.
- [Device](/explanation/architecture/libraries/device): device-control definitions. <HostReference crate="device" />.
- [Peripherals](/explanation/architecture/libraries/peripherals): peripheral data models. <HostReference crate="peripherals" />.
- [Audio](/explanation/architecture/libraries/audio): bounded PCM device contract, buffers and mixer implementation. <HostReference crate="audio" />.

## Execution and support

- [ABI](/explanation/architecture/libraries/abi): C declarations, exports and interoperability contracts.
- [Executable](/explanation/architecture/libraries/executable): executable protocol, context and launcher helpers. <HostReference crate="executable" />.
- [Application metadata](/explanation/architecture/libraries/application_metadata): shared guest/native application inventory and shortcut metadata. <HostReference crate="application_metadata" />.
- [Authentication](/explanation/architecture/libraries/authentication): reusable credential/verification operations. <HostReference crate="authentication" />.
- [Bootsplash](/explanation/architecture/libraries/bootsplash): startup animation implementation. <HostReference crate="bootsplash" />.
- [Testing](/explanation/architecture/libraries/testing): test assembly helpers.

See [Subsystems](/explanation/architecture/subsystems/) for runtime owners, [Drivers](/explanation/architecture/drivers/) for target implementations and [Executables](/explanation/architecture/executables/) for launched programs and Wasmi integration.
