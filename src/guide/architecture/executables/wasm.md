---
layout: doc
---

# 🌍 WASM (executable)

The WASM executable provides host and guest runtime glue for launching WebAssembly workloads in Xila.

It is split by feature flags to support host-side runtime integration and guest-side helpers.

## Features

- Host integration path (`host` feature).
- Guest integration path (`guest` feature).
- Shared API surface through a single executable crate.

## References

- <CodeReference path="executables/wasm" />

## See also

- [🖥️ Virtual machine](../modules/virtual_machine.md)
- [🔗 Bindings](../modules/bindings.md)
