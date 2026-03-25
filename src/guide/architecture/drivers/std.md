---
layout: doc
---

# 🧰 Std driver crate

The `drivers_std` crate implements host-side drivers relying on the Rust standard library.

It provides commonly used services for host execution, including logging, memory backends, time devices, executable loading helpers, and a TUN/TAP-based network interface implementation.

## Dependencies

- [🧠 Memory](../modules/memory.md)
- [🕓 Time](../modules/time.md)
- [🌐 Network](../modules/network.md)
- [🏁 Task](../modules/task.md)
- [👥 Users](../modules/users.md)
- [🗃️ Virtual file system](../modules/virtual_file_system.md)

## References

- <CodeReference path="drivers/std" />

## See also

- [🪛 Drivers](../drivers.md)
- [🖥️ Native driver crate](./native.md)
