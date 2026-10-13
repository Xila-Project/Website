---
layout: doc
docType: reference
description: Supported guest graphics calls, status codes, object limits, and LVGL compatibility requirements.
---

# Graphics bindings

The `wasm` package's optional `graphics` feature provides the supported `xila_graphics_call` interface. Core uses LVGL 9.6. Sources: <CodeReference path="executables/wasm/README.md" /> and <CodeReference path="executables/wasm/src/host/graphics" />.

## Supported calls

| Family          | Supported operations                                   |
| --------------- | ------------------------------------------------------ |
| Windows         | Creation, icon, event retrieval                        |
| Objects         | Creation/deletion, flex flow/grow, width/height, flags |
| Labels          | Creation and text                                      |
| Button matrices | Creation, map, selected button                         |
| Geometry        | Percentage conversion                                  |

Calculator exercises this subset. Weather needs APIs beyond it. Unsupported calls keep their IDs in the generated catalog; the supported-call table checks complete C signatures.

Calls requiring arbitrary native structure layouts, guest callbacks, retained guest pointers, fonts/images/charts, or other unsupported LVGL APIs return an unsupported status. Guest memory is not interpreted as a typed host reference.

## Resource limits

| Resource              | Limit/behavior                                                                                             |
| --------------------- | ---------------------------------------------------------------------------------------------------------- |
| Issued object handles | 256 per execution, including deleted handles; handles are not reused during execution.                     |
| Button-map entries    | 64 including the sentinel.                                                                                 |
| NUL-terminated string | 1024 bytes.                                                                                                |
| Retained map strings  | 8192 bytes per widget, including the native sentinel.                                                      |
| Map termination       | Null and empty-string guest sentinels become LVGL's empty-string terminator; row separators are preserved. |

## Status codes

| Code | Meaning                |
| ---- | ---------------------- |
| 0    | Success                |
| 1    | Invalid count          |
| 2    | Invalid memory         |
| 3    | Unavailable capability |
| 4    | Unsupported call       |
| 5    | Invalid handle         |
| 6    | Resource limit         |
| 7    | Invalid value          |
| 8    | Native failure         |

## Compatibility

Guest and host bindings must use the same LVGL revision and configuration. Generated call IDs do not establish a stable cross-version graphics ABI. Event transport preserves numeric codes, including window-close requests, rather than treating unknown values as valid Rust enum variants.

Guest-only applications disable `wasm`'s default features and select `guest,graphics,memory_32`. `default_guest` additionally enables C wrappers and emits `xila_graphics.h` in the build output; generation does not rewrite guest source files.

## Related documentation

- [Graphics binding ownership](/explanation/architecture/modules/bindings).
- [Build a guest application](/how-to/build-guest).
- [WASM runtime](./wasm-runtime).
