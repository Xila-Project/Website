---
layout: doc
docType: explanation
description: "This section maps Xila's host executables and bundled WASM guest applications on top of the executable runtime."
---

# Executables

This section maps executable crates that run through the [Executable runtime crate](/explanation/architecture/libraries/executable), including native host components and bundled WASM guest applications.

## Architecture map

### Runtime and dispatch executables

- [Bindings](/explanation/architecture/executables/bindings): guest/host graphics memory and handle translation within the executable runtime.

- [WASM](/explanation/architecture/executables/wasm): Wasmi interpreter, WASI execution, cooperative scheduling, guest loading and guest-side API facade.
- [Command line shell](/explanation/architecture/executables/command_line_shell): bounded parser/executor with composition, built-ins, and mounted-binary dispatch.
- [Terminal](/explanation/architecture/executables/terminal): graphical terminal device surface that launches the command-line shell.
- [Debug](/explanation/architecture/executables/debug): live task/memory diagnostics, screenshots and synthetic UI input through a mounted debug transport.

### Session and UI shell executables

- [Graphical shell](/explanation/architecture/executables/graphical_shell): login and desktop session shell.
- [Settings](/explanation/architecture/executables/settings): tab-based configuration UI (general/appearance/password/network/about).
- [File manager](/explanation/architecture/executables/file_manager): VFS-backed graphical file browser.

### Bundled WASM applications

- [Calculator](/explanation/architecture/executables/calculator): scientific calculator UI and expression engine.
- [Clock](/explanation/architecture/executables/clock): UTC clock, one saved alarm, stopwatch, and countdown timer.
- [Pixel Painter](/explanation/architecture/executables/pixel_painter): bounded indexed-canvas drawing application with VFS save/open support.
- [Text Editor](/explanation/architecture/executables/text_editor): page-based UTF-8 editing with a temporary working copy and bounded memory.
- [Synth](/explanation/architecture/executables/synth): eight-voice WASM instrument using the audio playback device.
- [Weather](/explanation/architecture/executables/weather): network-dependent Open-Meteo demonstration guest.

New native and browser seed images bundle Calculator, Clock, Pixel Painter, Synth, Weather, and Text Editor through `/binaries/wasm` where the matching image build includes them. Existing persistent disks keep their previous binaries; a newer seed does not automatically upgrade an installed filesystem. Other guest applications can use the same runtime without being part of the default bundle.

## Choosing a runtime model

The executable directory contains **several kinds of programs**. The distinction matters for deployment and ownership:

- **Native mounted programs** (`command_line_shell`, `graphical_shell`, `terminal`, `settings`, `file_manager`, `debug`, `wasm`) expose an `ExecutableTrait` entrypoint through `/binaries/*`. The launcher owns task startup and the `Standard` streams, and each program receives an explicit `ExecutableContext`.
- **WASM guests** (`calculator`, `clock`, `pixel_painter`, `synth`, `text_editor`, `weather`) are installed as files under `/binaries` and executed **through** the Wasmi program. Most optionally expose `__install` for shortcut registration.
- **Graphics bindings** are the generated and validated boundary between guest linear memory and host LVGL; they are part of the Wasmi integration rather than a separately launched application.

For source links, the Core tree preserves `executables/` after the [#457 migration](https://github.com/xila-project/core/pull/457). The executable runtime *contract* itself is a separate reusable library under `libraries/executable/`.

## Integration and failure checklist

Before integrating an executable, verify its startup mode (native mount or guest binary), required capabilities (VFS, graphics, network, audio), ownership of opened files/windows/tasks, exit status and cleanup behavior. Documentation distinguishes recoverable errors from panics, frame-buffer limits from guest allocations, and persistent data from in-memory session state.

The Debug executable does not implement network authentication; access to its `/devices/debug/transport` endpoint must be restricted by the hosting environment. WASM guests are isolated by Wasmi's import/linear-memory contracts, but still receive the rights of the VFS descriptors and imports granted at launch.

## Shared executable model

- Host executable crates generally implement `ExecutableTrait` and are mounted as `/binaries/*` character devices.
- Launch is performed through `executable::execute(context, ...)`, which handles permission checks and task spawn using explicit managers. Mounted wrappers and `Standard` carry the same `ExecutableContext`.
- WASM applications expose an optional `__install` entry point; the runtime's `--install` mode uses it to create launcher/configuration integration before normal `_start` execution.
- Several UI executables install launcher shortcuts under `/configuration/shared/shortcuts/*.json`.

## Contract vs implementation

- **Contract**: this map describes executable-level responsibilities and integration points on top of the executable runtime contract.
- **Current implementation**: entries and relationships reflect the currently mounted/implemented executables and the browser/native demonstration bundle in Core.

## API documentation

The <HostReference crate="executable">host executable contract</HostReference> defines launch and context APIs. The <HostReference crate="wasm">host WASM runtime</HostReference> and <GuestReference crate="wasm">guest WASM APIs</GuestReference> document the two sides of guest execution.

## See also

- [Executable runtime crate](/explanation/architecture/libraries/executable)
- [WASM runtime reference](/reference/wasm-runtime)
- [Headless container runtime](/reference/container-runtime)
- [Libraries architecture map](/explanation/architecture/libraries/)
