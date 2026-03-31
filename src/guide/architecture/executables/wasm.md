---
layout: doc
---

# 🌍 WASM (executable)

The WASM executable bridges mounted Xila executables with WAMR-based module execution.

## Role

- Host side (`feature = "host"`): validates WASM file path, loads bytes, builds runtime, executes `_start` or `__install`.
- Guest side (`feature = "guest"`): exposes guest-facing helper APIs (including optional graphics bindings).

## Startup and lifecycle

1. `WasmExecutable::main` parses arguments (`path`, `--install`, `--stack-size`).
2. Resolves absolute/relative path using `Current_directory` environment variable.
3. Reads module bytes through VFS and chooses function (`_start`/`__install`).
4. Gets/initializes static runtime (`OnceLock<Runtime>`).
5. Executes module either inline or via spawned task (when custom thread executor is configured).

## Runtime integration points

- `xila::executable::ExecutableTrait` for mount-and-launch contract.
- `virtual_file_system` for wasm bytecode retrieval.
- `task` for optional detached execution path.
- `abi_context` file registration for stdio transfer into runtime.
- `wamr-rust-sdk` for runtime/module/instance/function invocation.

## Data and control flow / VFS touchpoints

- Input: `path` argument + optional install flag.
- VFS touchpoint: `get_statistics` + `File::read_from_path`.
- Control flow: argument parse -> module load -> runtime execute -> optional task join.
- Standard streams are split and passed to runtime as ABI context file identifiers.

## Concurrency and event-loop model

- No GUI event loop in host executable path.
- Execution can run in current task or spawned task (`SpawnerIdentifier`) depending on configured executor.
- Runtime instance state is cached globally via `OnceLock`.

## Failure semantics

- Path/arguments validation errors are typed (`InvalidPath`, `InvalidOption`, missing arguments).
- Runtime failures are mapped from `wamr_rust_sdk::RuntimeError` into crate error variants (`Compilation`, `InstantiationFailure`, `Execution`, ...).
- Errors are written to duplicated stderr stream before returning non-zero code.

## Contract vs implementation

- **Contract**: executable accepts wasm path + options and runs specified entrypoint through executable runtime contract.
- **Current implementation**: WAMR backend with static runtime registration, optional graphics host bindings, and ABI-context stdio mapping.

## Operational limitations

- Requires mounted file path to point to regular file; non-file nodes are rejected.
- Runtime capabilities depend on enabled feature set (`host`, `guest`, `graphics`, `c_bindings`).
- Stack size defaults to 4096 unless overridden.

## References

- <CodeReference path="executables/wasm" />
- [🏁 Executable runtime crate](../crates/executables.md)
