---
layout: doc
---

# 📦 Modules

Each subsystem of Xila is implemented as a module. Modules are designed to be as independent as possible, allowing for easier maintenance and development. Each module is responsible for a specific task, such as managing the filesystem, handling the user interface, or managing tasks.

Usually, a module is defined as a singleton structure (usually a static `OnceLock` with a `Mutex` or `RwLock` inside) that exposes methods to interact with the module. They need to be initialized before use, typically during the system startup.

## List of modules

- [🔗 ABI](./abi.md): C-compatible interface layer used by external runtimes and integrations.
- [🔗 Bindings](./bindings.md): Xila-specific host/guest binding bridge (not limited to POSIX-style ABI calls).
- [🖼️ Graphics](./graphics.md): Display/input and rendering integration.
- [📝 Log](./log.md): Global logging facade and backend dispatch.
- [🧠 Memory](./memory.md): Allocation, capability-aware memory operations, and allocator integration.
- [🌐 Network](./network.md): Async networking stack and interface/socket orchestration.
- [🏁 Task](./task.md): Task lifecycle, scheduling, and execution context management.
- [🕓 Time](./time.md): Time source abstraction and uptime/current-time queries.
- [👥 Users](./users.md): Runtime user/group database and permission identity model.
- [🗃️ Virtual file system](./virtual_file_system.md): Unified file/device namespace and mount system.
- [🖥️ Virtual machine](./virtual_machine.md): WebAssembly runtime integration layer.
