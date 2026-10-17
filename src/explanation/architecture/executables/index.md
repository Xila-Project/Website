---
layout: doc
docType: explanation
description: "This section maps Xila's host executables and bundled WASM guest applications on top of the executable runtime."
---

# Executables

This section maps executable crates that run through the [Executable runtime crate](/explanation/architecture/crates/executables), including native host components and bundled WASM guest applications.

## Architecture map

### Runtime and dispatch executables

- [WASM](/explanation/architecture/executables/wasm): host-side WASM loader/runtime bridge and guest-side API facade.
- [Command line shell](/explanation/architecture/executables/command_line_shell): bounded parser/executor with composition, built-ins, and mounted-binary dispatch.
- [Terminal](/explanation/architecture/executables/terminal): graphical terminal device surface that launches the command-line shell.

### Session and UI shell executables

- [Graphical shell](/explanation/architecture/executables/graphical_shell): login and desktop session shell.
- [Settings](/explanation/architecture/executables/settings): tab-based configuration UI (general/password/network/about).
- [File manager](/explanation/architecture/executables/file_manager): VFS-backed graphical file browser.

### Bundled WASM applications

- [Calculator](/explanation/architecture/executables/calculator): scientific calculator UI and expression engine.
- [Clock](/explanation/architecture/executables/clock): UTC clock, one saved alarm, stopwatch, and countdown timer.
- [Pixel Painter](/explanation/architecture/executables/pixel_painter): bounded indexed-canvas drawing application with VFS save/open support.

The native and browser demonstrations install Calculator, Clock, and Pixel Painter through `/binaries/wasm`. Other guest applications can use the same runtime without being part of the default demonstration bundle.

## Shared executable model

- Host executable crates generally implement `ExecutableTrait` and are mounted as `/binaries/*` character devices.
- Launch is performed through `executable::execute(context, ...)`, which handles permission checks and task spawn using explicit managers. Mounted wrappers and `Standard` carry the same `ExecutableContext`.
- WASM applications expose an optional `__install` entry point; the runtime's `--install` mode uses it to create launcher/configuration integration before normal `_start` execution.
- Several UI executables install launcher shortcuts under `/configuration/shared/shortcuts/*.json`.

## Contract vs implementation

- **Contract**: this map describes executable-level responsibilities and integration points on top of the executable runtime contract.
- **Current implementation**: entries and relationships reflect the currently mounted/implemented executables and the browser/native demonstration bundle in Core.

## See also

- [Executable runtime crate](/explanation/architecture/crates/executables)
- [WASM runtime reference](/reference/wasm-runtime)
- [Crates architecture map](/explanation/architecture/crates/)
