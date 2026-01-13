---
layout: doc
---

# 📦 Modules

Each subsystem of Xila is implemented as a module. Modules are designed to be as independent as possible, allowing for easier maintenance and development. Each module is responsible for a specific task, such as managing the filesystem, handling the user interface, or managing tasks.

Usually, a module is defined as a singleton structure (usually a static `OnceLock` with a `Mutex` or `RwLock` inside) that exposes methods to interact with the module. They need to be initialized before use, typically during the system startup.

## List of modules

- [🔗 ABI](./abi.md)
- [🔗 Bindings](./bindings.md)
- [🖼️ Graphics](./graphics.md)
- [📝 Log](./log.md)
- [🧠 Memory](./memory.md)
- [🌐 Network](./network.md)
- [🏁 Task](./task.md)
- [🕓 Time](./time.md)
- [👥 Users](./users.md)
- [🗃️ Virtual file system](./virtual_file_system.md)
- [🖥️ Virtual machine](./virtual_machine.md)
