---
layout: doc
docType: reference
description: Supported guest graphics calls, checked Xila helpers, status codes, resource limits, and LVGL compatibility requirements.
---

# Graphics bindings

The `wasm` package's optional `graphics` feature provides the supported `xila_graphics_call` interface. Core uses LVGL 9.6. Sources: <CodeReference path="executables/wasm/README.md" /> and <CodeReference path="executables/wasm/src/host/graphics" />.

## Supported calls

| Family          | Supported operations                                                        |
| --------------- | --------------------------------------------------------------------------- |
| Windows         | Creation, icon, event retrieval, pointer-aware event retrieval              |
| Objects         | Creation/deletion, flex flow/grow, width/height, flags, padding             |
| Labels          | Creation and text                                                           |
| Button matrices | Creation, map, selected button                                              |
| Text areas      | Checked text copy                                                           |
| Keyboards       | Checked keyboard attachment                                                 |
| Indexed canvas  | Host-owned indexed image creation and pixel/palette upload                  |
| Geometry        | Percentage conversion                                                       |

Calculator exercises the basic widget subset. Pixel Painter additionally exercises pointer events, text input, keyboard attachment, and the indexed-canvas helpers. Weather still needs APIs beyond the currently supported subset.

Calls requiring arbitrary native structure layouts, guest callbacks, retained guest pointers, unsupported fonts/images/charts, or other unsupported LVGL APIs return an unsupported status. Guest memory is never interpreted as a typed host reference.

## Xila-specific checked helpers

New Xila helpers use append-only call identifiers starting at `0xf000`, separate from the generated LVGL-derived catalog.

- `indexed_canvas_create` allocates a host-owned indexed image.
- `indexed_canvas_set_pixels` validates and copies palette indexes and RGB888 palette entries from guest memory. No guest pointer is retained after the call.
- `window_pop_pointer_event` returns event-time pointer coordinates relative to the target content area together with that area's width and height. For events without pointer data, x/y are `i32::MIN` and width/height are zero.
- The original `window_pop_event` contract remains unchanged.
- Checked adapters also cover textarea text copying, keyboard attachment, object padding, and flag removal.

## Resource limits

| Resource                     | Limit/behavior                                                                                             |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Issued object handles        | 256 per execution, including deleted handles; handles are not reused during execution.                     |
| Indexed-canvas pixels        | 65,536 host-owned pixels per VM across indexed canvases.                                                   |
| Button-map entries           | 64 including the sentinel.                                                                                 |
| NUL-terminated string        | 1024 bytes.                                                                                                |
| Retained map strings         | 8192 bytes per widget, including the native sentinel.                                                      |
| Map termination              | Null and empty-string guest sentinels become LVGL's empty-string terminator; row separators are preserved. |

Indexed-canvas buffers remain owned by the host while their native object exists and are reclaimed after deletion or at VM teardown. Pixel Painter's 160×100 canvas consumes 16,000 indexed pixels plus its palette on the host, in addition to guest-side drawing/undo/file buffers and LVGL allocations.

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

Guest and host bindings must use the same LVGL revision and configuration. Generated LVGL call IDs do not establish a stable cross-version graphics ABI. Event transport preserves numeric codes, including window-close requests, rather than treating unknown values as valid Rust enum variants.

Guest-only applications disable `wasm`'s default features and select `guest,graphics,memory_32`. `default_guest` additionally enables C wrappers and emits `xila_graphics.h` in the build output; generation does not rewrite guest source files.

## Related documentation

- [Graphics binding ownership](/explanation/architecture/modules/bindings).
- [Pixel Painter](/explanation/architecture/executables/pixel_painter).
- [Build a guest application](/how-to/build-guest).
- [WASM runtime](./wasm-runtime).
