---
layout: doc
---

# 🌐 Network

The network module in Xila provides the OS networking stack integration and device orchestration.

It is built around smoltcp and exposes file-oriented network interfaces through the virtual file system, allowing user programs and modules to configure interfaces and exchange data using a unified API surface.

## Features

- Interface registration and mounting.
- IPv4/IPv6 addressing and route configuration.
- DNS resolution support.
- Socket-oriented network operations.
- Async integration with the task and time modules.

## Dependencies

- [📁 File system](../crates/file_system.md)
- [🔃 Synchronization](../crates/synchronization.md)
- [🕓 Time](./time.md)
- [🏁 Task](./task.md)
- [👥 Users](./users.md)
- [🗃️ Virtual file system](./virtual_file_system.md)
- [📦 Shared](../crates/shared.md)

## References

- <HostReference crate="network" />
- <CodeReference path="modules/network" />

## See also

- [🧰 Std driver crate](../drivers/std.md)
- [🌍 WASM driver crate](../drivers/wasm.md)
