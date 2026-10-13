---
layout: doc
docType: explanation
description: "This section maps the native executable crates that run on top of the [Executable runtime crate](/explanation/architecture/crates/executables)."
---

# Executables

This section maps the native executable crates that run on top of the [Executable runtime crate](/explanation/architecture/crates/executables).

## Architecture map

### Runtime and dispatch executables

- [WASM](/explanation/architecture/executables/wasm): host-side WASM loader/runtime bridge and guest-side API facade.
- [Command line shell](/explanation/architecture/executables/command_line_shell): command parser/executor that dispatches built-ins and mounted binaries.
- [Terminal](/explanation/architecture/executables/terminal): graphical terminal device surface that launches command-line shell.

### Session and UI shell executables

- [Graphical shell](/explanation/architecture/executables/graphical_shell): login and desktop session shell.
- [Settings](/explanation/architecture/executables/settings): tab-based configuration UI (general/password/network/about).
- [File manager](/explanation/architecture/executables/file_manager): VFS-backed graphical file browser.
- [Calculator](/explanation/architecture/executables/calculator): WASM-oriented scientific calculator UI and expression engine.

## Shared executable model

- Most executable crates implement `ExecutableTrait` and are mounted as `/binaries/*` character devices.
- Launch is performed through `executable::execute(context, ...)`, which handles permission checks and task spawn using explicit managers. Mounted wrappers and `Standard` carry the same `ExecutableContext`.
- Several UI executables install launcher shortcuts under `/configuration/shared/shortcuts/*.json`.

## Contract vs implementation

- **Contract**: this map describes executable-level responsibilities and integration points on top of the executable runtime contract.
- **Current implementation**: entries and relationships reflect the currently mounted/implemented executable crates in Core.

## See also

- [Executable runtime crate](/explanation/architecture/crates/executables)
- [Crates architecture map](/explanation/architecture/crates/)
