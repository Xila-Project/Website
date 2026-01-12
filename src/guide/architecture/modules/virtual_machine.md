---
layout: doc
---

# 🖥️ Virtual machine

One of the main features of Xila is its ability to run applications on systems that don't have writtable program memory (or at least not easily).
To achieve this, Xila includes a virtual machine (VM) module that can interpret and execute WASM (WebAssembly) bytecode.
The VM module provides a runtime environment for WASM applications, allowing them to run on Xila regardless of the underlying hardware architecture. This makes it possible to develop applications that can run on a wide range of devices, from embedded systems to desktop computers.
