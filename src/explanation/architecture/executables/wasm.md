---
layout: doc
docType: explanation
description: "The WASM executable loads guest programs from Xila's VFS and runs them using Wasmi 2 with cooperative, resumable execution."
---

# WASM (executable)

The WASM executable loads guest programs from Xila's VFS and runs them using Wasmi 2. Both the native and browser examples mount it at `/binaries/wasm`.

## Role and feature selection

The package serves two sides of the boundary: a host interpreter integrated with Xila's executable services, and helpers compiled into guest applications. The host role also applies when Xila runs in a browser. Optional graphics connects the interpreter to the context's graphics capability.

The [runtime reference](/reference/wasm-runtime#cargo-features) defines the exact Cargo feature sets and defaults.

## Launching a guest

The launcher reads a guest from the VFS and invokes either its normal entrypoint or its installer. Both use typed, no-argument exports. Path handling belongs to the caller and the VFS; the loader does not implement the old `Current_directory` resolution step.

Follow [Run a guest](/how-to/run-guest) for the procedure and [command syntax](/reference/wasm-runtime#command-syntax) for its options and required exports.

## Startup and lifecycle

1. Parse the guest path, `--install`, `--stack-size`, and `--instruction-limit`.
2. Read bytes through the context-provided VFS and current task identifier.
3. Create a fresh Wasmi engine, module, linker, and store; there is no globally cached runtime.
4. Eagerly translate module functions before execution so fuel exhaustion cannot suspend lazy callee translation.
5. Bind standard streams, task environment, and the root directory preopen to the per-execution WASI context.
6. Register WASI and optional graphics imports, instantiate, and call the selected entrypoint resumably.
7. Yield on fuel exhaustion or supported suspension calls; report exit/trap errors and release VM-owned graphics objects.

## Runtime integration points

- `ExecutableTrait`, `ExecutableContext`, and `Standard::context` for launch capabilities.
- VFS `get_statistics` and `File::read_from_path` for module loading.
- Wasmi `Engine`, `Module`, `Linker`, and `Store<GlobalStore>` for guest execution.
- Local WASI descriptor tables for stdio and paths; guest imports do not use the removed `abi_context` crate.
- Optional checked graphics adapters, including Xila-specific pointer/canvas helpers, use explicit per-VM graphics state rather than guest pointers to host objects.

## Failure semantics and limits

- Argument, file-kind, compilation, instantiation, missing-export, and execution failures are reported on stderr and return a nonzero executable result.
- WASI `proc_exit(0)` succeeds; nonzero exit codes become runtime errors.
- Wasmi 2 meters input Wasm operators. Fuel is replenished after cooperative yielding, so its quantum controls scheduling rather than a total instruction budget and is not a stable wall-time slice.
- WASI coverage is partial; `poll_oneoff` supports clocks, not file-descriptor readiness. Start-section suspension is unsupported.
- Graphical guests need bindings compatible with the host's LVGL revision/configuration and supported call subset.

The browser example embeds Calculator, Clock, and Pixel Painter at build time, installs their shortcuts at startup, and persists the selected VFS disk in OPFS. See [Browser tutorial](/tutorials/browser) for the build flow and [Browser storage](/explanation/browser-storage) for multi-disk persistence.

Exact option defaults and constraints live in the [runtime reference](/reference/wasm-runtime#execution-limits).

## References

- <CodeReference path="executables/wasm" />
- [Graphics bindings](/reference/graphics-bindings)
- [Virtual machine](/explanation/architecture/executables/virtual_machine)
- [Bindings](/explanation/architecture/executables/bindings)
- [Executable runtime crate](/explanation/architecture/libraries/executable)
