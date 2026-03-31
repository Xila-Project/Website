---
layout: doc
---

# 🧪 Testing

The `testing` crate assembles a host integration runtime so tests can run against near-real Core wiring.

## Role

- Provides one high-level initializer that wires task/users/time, storage, optional graphics, optional networking, and standard streams.
- Reduces per-test boilerplate by mounting known-good baseline devices and hierarchy.

## Boundaries

- In scope: integration-runtime bootstrap for tests.
- Out of scope: unit-test micro scaffolding and production startup orchestration.

## Internal structure

- `lib.rs` exposes `initialize(graphics_enabled, network_enabled) -> executable::Standard`.
- Setup logic is sequential and explicit: logging, managers, VFS root, device mounts, optional subsystems, seed user/account.

## Runtime interaction

1. Initializes core managers (`task`, `users`, `time`, `log`).
2. Optionally starts graphics manager and host window runner tasks.
3. Creates memory-backed LittleFS and initializes VFS + default hierarchy.
4. Mounts standard devices (`/devices/random`, `/devices/hasher`, stdio, time, null).
5. Optionally mounts/configures a tuntap network interface and applies IP/routes/DNS.
6. Seeds administrator group/user and environment variables (`Paths`, `Host`).
7. Returns opened `Standard` streams for test/executable launch.

## Dependency model

- Depends on broad Core surface: file_system, little_fs, authentication, executable, network, graphics, task/users/time/log, plus host drivers.

## Failure semantics

- Initialization is intentionally strict and uses `unwrap`/`expect` in many places to fail fast in test setup.
- Optional branches still fail the initializer if enabled and setup cannot complete.

## Extension points

- Additional device mounts can be added to the bootstrap sequence for new integration domains.
- Feature toggles can extend the initializer signature if more optional subsystems are needed.

## Contract vs implementation

- **Contract**: one async initializer returning ready-to-use `Standard` for executing test binaries/workflows.
- **Current implementation**: host-first initialization with memory-backed LittleFS, optional window/tuntap integration, and seeded administrator account.

## Limitations and trade-offs

- Fast-fail setup simplifies test diagnosis but is less granular than layered setup APIs.
- Integration realism increases coverage while making initialization heavier than unit-test stubs.

## References

- <CodeReference path="modules/testing" />
- [🏁 Executable crate](./executables.md)
- [🏗️ Architecture](../index.md)
