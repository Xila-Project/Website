---
layout: doc
docType: explanation
description: Find a Xila module, crate, driver, or executable and its related guides, explanation, and reference.
---

# Component map

Find a component by its place in the system. Architecture pages explain its role and relationships; follow their API/source links for precise interfaces.

| Area        | Architecture map                                                                                          | Relevant tasks and reference                                                                                      |
| ----------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Modules     | [Task, users, time, memory, log, VFS, network, graphics, and interop](/explanation/architecture/modules/) | [Integrate a host runtime](/how-to/integrate-host); [host API](/reference/host)                                   |
| Crates      | [Shared contracts and runtime helpers](/explanation/architecture/crates/)                                 | [Contribute a Core change](/how-to/contribute-core); [host API](/reference/host)                                  |
| Drivers     | [Core, native, std, shared, Espressif, and WASM](/explanation/architecture/drivers/)                      | [Set up development](/how-to/setup-development); [browser storage](/explanation/browser-storage)                  |
| Executables | [Shells, terminal, file manager, settings, Calculator, and WASM](/explanation/architecture/executables/)  | [Build a guest](/how-to/build-guest); [run a guest](/how-to/run-guest); [WASM reference](/reference/wasm-runtime) |

## Common cross-component journeys

- **Guest execution:** [Wasmi model](/explanation/architecture/modules/virtual_machine) → [graphics ownership](/explanation/architecture/modules/bindings) → [runtime](/reference/wasm-runtime) and [graphics limits](/reference/graphics-bindings).
- **Host assembly:** [Architecture](/explanation/architecture/) → [integration procedure](/how-to/integrate-host) → [executable context](/explanation/architecture/crates/executables).
- **Browser persistence:** [Storage model](/explanation/browser-storage) → [WASM driver](/explanation/architecture/drivers/wasm) → [validation](/how-to/validate-core#browser-behavior) or [reset](/how-to/reset-browser-storage).

For learning paths and task-first navigation, return to [Documentation](/docs/).
