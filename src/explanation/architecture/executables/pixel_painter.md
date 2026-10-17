---
layout: doc
docType: explanation
description: "Pixel Painter is a bounded Rust/WASM drawing application exercising Xila's indexed-canvas graphics ABI and WASI file I/O."
---

# Pixel Painter (executable)

Pixel Painter is a `wasm32-wasip1` drawing application bundled in the native and browser demonstrations. It exercises the checked guest graphics ABI, pointer events, on-screen text input, and WASI file I/O.

## Drawing model

The application maintains a 160×100 indexed drawing. The logical image scales to the available canvas with letterboxing so resizing or rotating the display does not change drawing coordinates.

Users can draw with mouse or touch, choose one of eight palette entries, select 1, 3, or 5-pixel square brushes, undo the previous stroke or Clear action, and save/open drawings.

## Runtime integration

Pixel Painter is copied to `/binaries/pixel_painter` and installed through:

```text
wasm --install /binaries/pixel_painter
```

Its default save path is `/configuration/shared/pixel_painter/drawing.xpnt`. Native and browser hosts provision the shared configuration directory for the default administrator. An optional first command-line argument selects another initial absolute path.

The UI uses `indexed_canvas_create` and `indexed_canvas_set_pixels` so the host owns the image backing storage. `window_pop_pointer_event` supplies event-time pointer coordinates relative to the canvas content area. Guest buffers are validated and copied; the host does not retain guest pointers.

## XPNT format

XPNT version 1 is intentionally small and fixed-size:

- 8-byte header: `XPNT`, version 1, width 160, height 100, reserved byte 0.
- 16,000 one-byte palette indexes in row order.

Open rejects incompatible dimensions, invalid palette indexes, truncated files, and trailing data before modifying the current drawing. Reads are bounded to 16,009 bytes.

## Failure and durability behavior

Open and Close require a second attempt before discarding unsaved changes. Failed reads or writes keep the in-memory drawing available and report an error.

Saving writes directly to the selected file. Current WASI filesystem bindings do not provide an atomic rename/sync adapter, so a failed write may leave an incomplete file and a successful write does not guarantee power-loss durability. In the browser demonstration, the virtual disk is subsequently persisted through the OPFS autosave flow.

## Resource bounds

The guest keeps 16 KB of pixels plus a 16 KB undo snapshot and temporarily uses another 16 KB file buffer during save/open. The host owns a separate 16 KB indexed image plus a 1 KB palette. LVGL/widget/rendering allocations are additional.

The graphics runtime caps indexed-canvas storage at 65,536 pixels per VM. Host buffers are reclaimed after native object deletion or VM teardown.

## References

- <CodeReference path="executables/pixel_painter" />
- [Graphics bindings](/reference/graphics-bindings)
- [WASM runtime](/reference/wasm-runtime)
- [Browser storage](/explanation/browser-storage)
