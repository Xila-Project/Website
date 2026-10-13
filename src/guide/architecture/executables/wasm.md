---
layout: doc
---

# 🌍 WASM (executable)

The WASM executable loads guest programs from Xila's VFS and runs them using Wasmi. Both the native and browser examples mount it at `/binaries/wasm`.

## Role and feature selection

- `host`: Wasmi runtime and Xila executable integration; also used by the browser-hosted Xila runtime.
- `guest`: guest helper APIs without the interpreter. Disable default features for guest-only consumers.
- `graphics`: optional generated guest wrappers and supported host graphics imports.
- `default_guest`: `guest`, `graphics`, `c_bindings`, and `memory_32`; emits `xila_graphics.h` in the build output.
- `memory_32` / `memory_64`: guest-word translation width. Default runtime features are `host,memory_32`.

## Launching a guest

Run these commands in Xila's terminal, using files already in the VFS:

```text
/binaries/wasm /binaries/calculator
/binaries/wasm --install /binaries/calculator
```

Normal execution requires `_start: () -> ()`. `--install` selects `__install: () -> ()`; missing or incorrectly typed exports fail. The path must identify a regular file. The loader uses the supplied VFS path directly; it does not implement the old `Current_directory` path-resolution step.

## Startup and lifecycle

1. Parse the guest path, `--install`, `--stack-size`, and `--instruction-limit`.
2. Read bytes through the context-provided VFS and current task identifier.
3. Create a fresh engine, module, linker, and store; there is no globally cached runtime.
4. Bind standard streams, task environment, and the root directory preopen to the per-execution WASI context.
5. Register WASI and optional graphics imports, instantiate, and call the selected entrypoint resumably.
6. Yield on fuel exhaustion or supported suspension calls; report exit/trap errors and release VM-owned graphics objects.

## Runtime integration points

- `ExecutableTrait`, `ExecutableContext`, and `Standard::context` for launch capabilities.
- VFS `get_statistics` and `File::read_from_path` for module loading.
- Wasmi `Engine`, `Module`, `Linker`, and `Store<GlobalStore>` for guest execution.
- Local WASI descriptor tables for stdio and paths; guest imports do not use the removed `abi_context` crate.

## Failure semantics and limits

- Argument, file-kind, compilation, instantiation, missing-export, and execution failures are reported on stderr and return a nonzero executable result.
- WASI `proc_exit(0)` succeeds; nonzero exit codes become runtime errors.
- `--instruction-limit` defaults to 100,000 fuel per quantum. Execution remains cooperative; this is not a total instruction cap.
- `--stack-size` defaults to 4096 but is currently unused.
- WASI coverage is partial; `poll_oneoff` supports clocks, not file-descriptor readiness. Start-section suspension is unsupported.
- Graphical guests need bindings compatible with the host's LVGL revision/configuration and supported call subset.

The browser example embeds Calculator at build time, installs its shortcut at startup, and persists its VFS disk in OPFS. See [Use on WASM](../../get_started/use_wasm.md) for building, launching, and storage behavior.

## References

- <CodeReference path="executables/wasm" />
- [Virtual machine](../modules/virtual_machine.md)
- [Bindings](../modules/bindings.md)
- [Executable runtime crate](../crates/executables.md)
