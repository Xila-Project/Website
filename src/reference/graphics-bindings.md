---
layout: doc
docType: reference
description: Supported guest graphics calls, checked Xila helpers, status codes, resource limits, and LVGL compatibility requirements.
---

# Graphics bindings

The `wasm` package's optional `graphics` feature provides the supported `xila_graphics_call` interface. Core uses LVGL 9.6. Sources: <CodeReference path="executables/wasm/README.md" /> and <CodeReference path="executables/wasm/src/host/graphics" />.

## Supported calls

| Family          | Supported operations                                            |
| --------------- | --------------------------------------------------------------- |
| Windows         | Creation, icon, event retrieval, pointer-aware event retrieval  |
| Objects         | Creation/deletion, geometry getters/setters, alignment, flex, flags, padding |
| Labels          | Creation and text                                               |
| Button matrices | Creation, map, selected button                                  |
| Text areas      | Checked text copy                                               |
| Keyboards       | Checked keyboard attachment                                     |
| Indexed canvas  | Host-owned indexed image creation and pixel/palette upload      |
| Geometry        | Percentage conversion, position/size, layout updates and checked grid tracks/cells |
| Local styling   | RGB888 background/text/border colors, opacity, radius, border sides, text alignment and size bounds |
| Theme and fonts | Four semantic theme surfaces and six host-owned ROM font roles |

The build-time `GraphicsRegistry` exposes only host-supported Rust/C wrappers and host metadata; unsupported discovered LVGL calls are omitted from guest APIs without changing legacy catalog IDs. It writes `graphics_abi_inventory.json` under Cargo `OUT_DIR` for build-time inspection, not as runtime ABI negotiation. The merged Grid/Flex and local style/font slice supports 59 host-dispatched calls in the current Core revision; it does not imply full coverage of the LVGL widget families.

Calculator exercises the basic widget subset. Pixel Painter additionally exercises pointer events, text input, keyboard attachment, and the indexed-canvas helpers. Weather still needs APIs beyond the currently supported subset.

Calls requiring arbitrary native structure layouts, guest callbacks, retained guest pointers, unrestricted native font/style pointers, images/charts, or other unsupported LVGL APIs are not exposed in the generated guest API. If invoked by numeric ID, unsupported calls return an unsupported status. Guest memory is never interpreted as a typed host reference.

## Xila-specific checked helpers

New Xila helpers use append-only call identifiers starting at `0xf000`, separate from the generated LVGL-derived catalog. The `grid_fr` fractional-track helper uses `0xf006`; semantic local-style and font helpers use `0xf007` through `0xf00e`.

- `indexed_canvas_create` allocates a host-owned indexed image.
- `indexed_canvas_set_pixels` validates and copies palette indexes and RGB888 palette entries from guest memory. No guest pointer is retained after the call.
- `window_pop_pointer_event` returns event-time pointer coordinates relative to the target content area together with that area's width and height. For events without pointer data, x/y are `i32::MIN` and width/height are zero.
- The original `window_pop_event` contract remains unchanged.
- Checked adapters also cover textarea text copying, keyboard attachment, object padding, and flag removal.

## Layout and styling boundaries

Grid descriptor arrays are copied from guest memory, validated for sentinel termination and retained by the host while LVGL uses them. Each axis is limited to **31 tracks**, with **512 retained grid descriptors per VM** in total. Grid cell placement/span and alignment selectors are validated, as are signed geometry arguments on memory32 and memory64 hosts. Style selectors accept only recognized LVGL parts and states. A guest selects theme surfaces and font roles by IDs; it never supplies an LVGL font or style pointer.

## Resource limits

| Resource              | Limit/behavior                                                                                             |
| --------------------- | ---------------------------------------------------------------------------------------------------------- |
| Issued object handles | 256 per execution, including deleted handles; handles are not reused during execution.                     |
| Indexed-canvas pixels | 65,536 host-owned pixels per VM across indexed canvases.                                                   |
| Button-map entries    | 64 including the sentinel.                                                                                 |
| NUL-terminated string | 1024 bytes.                                                                                                |
| Retained map strings  | 8192 bytes per widget, including the native sentinel.                                                      |
| Map termination       | Null and empty-string guest sentinels become LVGL's empty-string terminator; row separators are preserved. |

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

- [Graphics binding ownership](/explanation/architecture/executables/bindings).
- [Pixel Painter](/explanation/architecture/executables/pixel_painter).
- [Build a guest application](/how-to/build-guest).
- [WASM runtime](./wasm-runtime).
