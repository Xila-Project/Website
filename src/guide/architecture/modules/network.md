---
layout: doc
---

# 🌐 Network

The Network module provides Xila's asynchronous networking stack and interface orchestration.

It is built on top of `smoltcp`, wraps each network interface inside a managed stack, and exposes interface control through virtual file system character devices.

## Features

- Interface lifecycle management (mount/start/stop).
- Per-interface control commands for state, hardware address, MTU, addresses, routes, DNS, and DHCP.
- Socket factories for DNS, TCP, UDP, and ICMP.
- Internal runner task per interface to poll the stack.
- Optional explicit interface selection when creating sockets.

## Dependencies

- [📁 File system](../crates/file_system.md)
- [🔃 Synchronization](../crates/synchronization.md)
- [🕓 Time](./time.md)
- [🏁 Task](./task.md)
- [👥 Users](./users.md)
- [🗃️ Virtual file system](./virtual_file_system.md)
- [📦 Shared](../crates/shared.md)

It also relies on platform drivers for concrete network devices (for example TUN/TAP on host or web transport adapters for WASM targets).

## Architecture

Each mounted interface is represented by a stack entry containing:

- A `smoltcp` interface and socket set.
- A controller device for platform-specific operations.
- A wake signal used by the async runner loop.

The interface is mounted under `/devices/network/<name>` and configured through `control` commands.

```mermaid
graph TD
	Apps@{ shape: processes, label: "Executables / modules" }
	VFS[Virtual file system]
	Net[Network module]
	Dev[/devices/network/<name>/]
	Runner[Interface runner task]
	Stack[smoltcp interface + sockets]
	Driver[Platform network driver]

	Apps -->|Open + control| Dev
	Dev -->|Forward control commands| Net
	Net -->|Configure| Stack
	Runner -->|Poll| Stack
	Stack -->|TX/RX| Driver
	VFS --> Dev
```

## Known limitations

- Interface polling is cooperative and depends on task scheduling quality.
- Current interface control is command-oriented (`control`), which is powerful but can be less discoverable than typed high-level APIs.
- Behavior and capabilities can vary by target depending on the underlying driver backend.

## References

- <HostReference crate="network" />
- <CodeReference path="modules/network" />

## See also

- [🧰 Std driver crate](../drivers/std.md)
- [🌍 WASM driver crate](../drivers/wasm.md)
