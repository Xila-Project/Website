---
layout: doc
docType: explanation
description: "Xila's graphics bindings connect guest WebAssembly imports to the context-provided graphics manager."
---

# Bindings

Xila's graphics bindings connect guest WebAssembly imports to the context-provided graphics manager. The shared LVGL catalog is generated in `modules/graphics/bindings_generator`; host dispatch and the Wasmi adapter live in `executables/wasm/src/host/graphics`.

## Architecture and ownership

- `graphics_bindgen` discovers and orders the shared catalog. Unsupported calls keep their IDs, and the supported-call table checks complete C signatures.
- Guest wrappers import `xila_graphics_call`; `default_guest` also emits C wrappers and `xila_graphics.h` in the build output directory. Generation does not rewrite guest source files.
- `dispatch`, `objects`, and `marshal` use explicit graphics state and checked borrowed memory, without Wasmi types or global graphics-manager lookup.
- `graphics/wasmi.rs` handles store/memory access, import registration, and context capability checks.
- VM-local object handles represent host objects. Deletion invalidates handles; issued handles are not reused within an execution. Teardown removes owned windows and children, including after traps.
- Retained button-map strings and pointer tables are copied into VM-owned storage; guest memory growth or mutation cannot invalidate them. Label strings are copied synchronously by LVGL.

```mermaid
sequenceDiagram
    participant Guest as Guest wrappers
    participant Adapter as Wasmi graphics adapter
    participant Dispatch as Checked dispatch and marshalling
    participant Graphics as Context graphics manager / LVGL
    Guest->>Adapter: xila_graphics_call
    Adapter->>Dispatch: Borrow guest memory and graphics state
    Dispatch->>Dispatch: Validate signature, values, memory and handles
    Dispatch->>Graphics: Invoke supported API under manager lock
    Graphics-->>Dispatch: Result
    Dispatch-->>Guest: Numeric status / translated output
```

## Compatibility and supported calls

The catalog requires guest and host bindings built from the same LVGL revision and configuration; call IDs are not a stable cross-version graphics ABI. Core now uses LVGL 9.6, including its updated event codes.

Calculator exercises the supported graphics subset; Weather still requires calls beyond it. The [graphics reference](/reference/graphics-bindings#supported-calls) lists the exact operations and compatibility requirements.

Calls involving arbitrary native structure layouts, guest callbacks, retained guest pointers, fonts/images/charts, or other unsupported LVGL functions return an unsupported status. Guest memory is never interpreted as a typed host reference.

## Bounded state

Object handles and retained map strings have fixed limits so an execution's host-side state remains bounded. Handles are local to the VM and never reused during that execution; this prevents a deleted object's identity from granting access to a later object. The [reference](/reference/graphics-bindings#resource-limits) gives capacities and numeric status codes.

## Extension points and validation

Extend the shared catalog and checked dispatch together, and keep the Wasmi adapter thin. Validate memory and handle behavior before adding a supported call. Native adapter and lifetime tests exercise cleanup; the portable translation tests separately cover guest-memory boundaries and word widths.

## References / See also

- <CodeReference path="modules/graphics/bindings_generator" />
- <CodeReference path="executables/wasm/src/host/graphics" />
- <CodeReference path="executables/wasm/tests/translation/README.md" />
- <HostReference crate="wasm" />
- [Graphics](/explanation/architecture/modules/graphics)
- [Virtual machine](/explanation/architecture/modules/virtual_machine)
- [ABI](/explanation/architecture/modules/abi)
