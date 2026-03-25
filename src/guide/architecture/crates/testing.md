---
layout: doc
---

# 🧪 Testing

The `testing` crate provides test-oriented runtime initialization for Xila components.

It exposes helpers that assemble realistic host environments (task system, users, time, virtual file system, optional graphics, optional networking, and mounted test devices) so integration tests can run with near-production wiring.

## Features

- Initializes core singleton modules in the expected order.
- Creates and mounts a default virtual file system hierarchy.
- Supports graphics-enabled and headless test execution.
- Supports optional network setup for protocol and socket tests.

## Initialization flow

The main helper initializes test runtime in this sequence:

1. logging,
2. task/users/time singletons,
3. optional graphics stack and event-loop tasks,
4. LittleFS root file system + VFS,
5. default hierarchy and core mounted devices,
6. optional network interface setup and base routes/DNS,
7. default standard streams + test user setup.

## Output contract

`testing::initialize(graphics_enabled, network_enabled)` returns an `executable::Standard` structure ready to run executables/tests with configured stdin/stdout/stderr.

## Dependencies

- Core modules: [🏁 Task](../modules/task.md), [👥 Users](../modules/users.md), [🕓 Time](../modules/time.md), [🗃️ Virtual file system](../modules/virtual_file_system.md), [🖼️ Graphics](../modules/graphics.md), [🌐 Network](../modules/network.md), [📝 Log](../modules/log.md)
- Crates: [📁 File system](./file_system.md), [📁 Little FS](./little_fs.md), [🏁 Executable](./executables.md)
- Drivers: [🧱 Core](../drivers/core.md), [🔗 Shared](../drivers/shared.md), [🧰 Std](../drivers/std.md), [🖥️ Native](../drivers/native.md)

## Known limitations

- It targets integration-style setup, not lightweight unit-test-only scaffolding.
- Some behavior depends on host driver/runtime availability (graphics/network enabled paths).

## References

- <CodeReference path="modules/testing" />

## See also

- [🏗️ Architecture](../index.md)
