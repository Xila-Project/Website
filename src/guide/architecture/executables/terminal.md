---
layout: doc
---

# 🖥️ Terminal (executable)

The terminal executable provides a graphical terminal window exposed as a character device and uses it to host the command-line shell.

## Role

- Bridges GUI events and text I/O semantics through a mounted `/devices/terminal` device.
- Launches `/binaries/command_line_shell` with terminal-backed stdin/stdout/stderr.

## Startup and lifecycle

1. Creates `Terminal` UI object (window, label display, text input).
2. Mounts terminal object as `/devices/terminal` character device.
3. Opens `Standard` streams on that path.
4. Executes command-line shell executable.
5. Runs event loop until terminal window close/delete event.

## Runtime integration points

- `virtual_file_system::mount_static` for runtime device registration.
- `xila::executable::execute` to start command-line shell child process.
- `graphics` and LVGL for window/input rendering.
- `shared::utf8_chunks` for buffered output write handling.

## Data and control flow / VFS touchpoints

- Write path: shell output -> `/devices/terminal` -> `DirectBaseOperations::write` -> UI display append.
- Read path: UI enter key -> validated input queue -> `/devices/terminal` read by shell.
- Control flow: parent terminal loop keeps processing events while child shell uses same device streams.

## Concurrency and event-loop model

- Terminal executable runs a periodic loop with `sleep(20 ms)` while polling `handle_events`.
- Device read/write paths use lock-protected terminal inner state (`RwLock<CriticalSectionRawMutex, Inner>`).

## Failure semantics

- Device mount/open/execute failures return executable error and are logged + printed.
- Resource contention on terminal locks maps to `RessourceBusy` / `file_system::Error::RessourceBusy`.

## Contract vs implementation

- **Contract**: terminal executable exposes a character-device-backed text console and runs shell inside it.
- **Current implementation**: LVGL window + textarea, mounted static device node `/devices/terminal`, and shell child execution via executable runtime.

## Operational limitations

- Input is newline-validated; no advanced terminal emulation (PTY, ANSI parser state machine) is implemented here.
- UI/event loop cadence is fixed and may affect responsiveness under heavy output.

## References

- <CodeReference path="executables/terminal" />
- [Command line shell](./command_line_shell.md)
