---
layout: doc
---

# 🏃 Executables

This section maps the native executable crates that run on top of the [🏁 Executable runtime crate](../crates/executables.md).

## Architecture map

### Runtime and dispatch executables

- [🌍 WASM](./wasm.md): host-side WASM loader/runtime bridge and guest-side API facade.
- [⌨️ Command line shell](./command_line_shell.md): command parser/executor that dispatches built-ins and mounted binaries.
- [🖥️ Terminal](./terminal.md): graphical terminal device surface that launches command-line shell.

### Session and UI shell executables

- [🖼️ Graphical shell](./graphical_shell.md): login and desktop session shell.
- [⚙️ Settings](./settings.md): tab-based configuration UI (general/password/network/about).
- [📂 File manager](./file_manager.md): VFS-backed graphical file browser.
- [🧮 Calculator](./calculator.md): WASM-oriented scientific calculator UI and expression engine.

## Shared executable model

- Most executable crates implement `ExecutableTrait` and are mounted as `/binaries/*` character devices.
- Launch is performed through `executable::execute(...)`, which handles permission checks and task spawn.
- Several UI executables install launcher shortcuts under `/configuration/shared/shortcuts/*.json`.

## Contract vs implementation

- **Contract**: this map describes executable-level responsibilities and integration points on top of the executable runtime contract.
- **Current implementation**: entries and relationships reflect the currently mounted/implemented executable crates in Core.

## See also

- [🏁 Executable runtime crate](../crates/executables.md)
- [📦 Crates architecture map](../crates/index.md)
