---
layout: doc
docType: explanation
description: "The drivers_native crate provides desktop-host integrations for native targets (Linux, macOS, Windows)."
---

# Native driver crate

The `drivers_native` crate provides desktop-host integrations for native targets (Linux, macOS, Windows).

It is used for host-side runtime features such as window-backed display/input handling and native integrations used by development and testing flows.

The native example also initializes audio playback through the default host output for [Synth](/explanation/architecture/executables/synth). If audio is unavailable, the OS can still boot and applications can run in silent mode.

For headless workloads, native HostFS supplies explicitly mounted host-directory access to [the container runtime](/reference/container-runtime). Mounts can be read-only or writable, with Linux path-race defenses and no ambient filesystem access.

## Dependencies

- [Graphics](/explanation/architecture/subsystems/graphics)
- [Task](/explanation/architecture/subsystems/task)
- [Log](/explanation/architecture/subsystems/log)
- [Synchronization](/explanation/architecture/libraries/synchronization)
- [Shared](/explanation/architecture/libraries/shared)

## References

- <HostReference crate="drivers_native" /> — generated Rust API documentation.

- <CodeReference path="drivers/native" />

## See also

- [Drivers](/explanation/architecture/drivers)
- [Shared driver crate](/explanation/architecture/drivers/shared)
- [Std driver crate](/explanation/architecture/drivers/std)
