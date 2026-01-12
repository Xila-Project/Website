---
layout: doc
---

# 🔗 ABI

Even though Xila is written in Rust, it provides a C-compatible Application Binary Interface (ABI) to allow interoperability with C and other programming languages that can interface with C.
This is particularly useful for integrating Xila with existing C libraries or for developing applications in languages that do not have direct support for Rust.

The reasons for providing a C-compatible ABI are:

- **Interoperability**: C is a widely used programming language, and many libraries and applications are written in C. Providing a C-compatible ABI allows Xila to interface with these existing codebases.
- **Stability**: Contrary to Rust, the C ABI is stable and does not change between compiler versions. This ensures that applications built against a specific version of Xila will continue to work with future versions.

ABI subsystem is implemented through 3 crates:

- `abi_declarations`: Declares the functions and methods that are exposed through the ABI. Using [cbindgen](https://github.com/eqrion/cbindgen), it generates the C header file `xila.generated.h`.
- `abi_definitions`: Defines the C-compatible data structures and types used in the ABI.
- `abi_context`: Manages the context and state required for ABI operations. It's used by both `abi_definitions`.

Declaration and definition have to be separated to avoid multiple symbol definitions when linking because Rust doesn't handle `#[no_mangle]` symbols the same way as it doesn't handle normal Rust symbols.

Currently, ABI exposes the following functionalities:

- Task management (proxy [time](./time.md) module): Create, delete, synchronization primitives (semaphores, mutexes, etc.), and scheduling.
- File operations (proxy [virtual file system](./virtual_file_system.md) module): File operations, file system management.
- Memory management (proxy [memory](./memory.md) module): Allocate, deallocate, and manage memory.
- Time management (proxy [time](./time.md) module): Functions for getting and setting time, timers, and delays.
- Some C standard library functions: Basic functions like `memcpy`, `memset`, `strcmp`, etc.

## References

- <HostReference path="abi_context/index.html">abi_context</HostReference>
- <HostReference path="abi_declarations/index.html">abi_declarations</HostReference>
- <HostReference path="abi_definitions/index.html">abi_definitions</HostReference>
