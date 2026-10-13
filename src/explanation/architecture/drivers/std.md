---
layout: doc
docType: explanation
description: "The drivers_std crate implements host-side drivers relying on the Rust standard library."
---

# 🧰 Std driver crate

The `drivers_std` crate implements host-side drivers relying on the Rust standard library.

It provides commonly used services for host execution, including logging, memory backends, time devices, executable loading helpers, and a TUN/TAP-based network interface implementation.

## Dependencies

- [🧠 Memory](/explanation/architecture/modules/memory)
- [🕓 Time](/explanation/architecture/modules/time)
- [🌐 Network](/explanation/architecture/modules/network)
- [🏁 Task](/explanation/architecture/modules/task)
- [👥 Users](/explanation/architecture/modules/users)
- [🗃️ Virtual file system](/explanation/architecture/modules/virtual_file_system)

## References

- <CodeReference path="drivers/std" />

## See also

- [🪛 Drivers](/explanation/architecture/drivers)
- [🖥️ Native driver crate](/explanation/architecture/drivers/native)
