---
layout: doc
---

# 📦 Design

Xila is designed with modularity and portability in mind. It is built to run on a variety of platforms, from embedded systems to desktop computers, and even in web browsers via WebAssembly (WASM).

Each subsystem of Xila is implemented as a module. Modules are designed to be as independent as possible, allowing for easier maintenance and development. Each module is responsible for a specific task, such as managing the filesystem, handling the user interface, or managing tasks.

## List of modules

- [📁 Filesystem](./file_system.md)
- [🏁 Task](./task.md)
