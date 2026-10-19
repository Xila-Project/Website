---
layout: doc
docType: explanation
description: "The Settings executable manages system configuration and persistent per-user appearance preferences."
---

# Settings (executable)

The Settings executable is a tab-based graphical configuration application. It now includes **Appearance** alongside General, Password, Network, and About.

## Role

- Hosts configurable system UI tabs (general/appearance/password/network/about).
- Applies a dark/light theme and five primary/secondary color presets to existing windows immediately.
- Provides shortcut registration for desktop discovery.

## Startup and lifecycle

1. Optional installation path (`SettingsExecutable::new`) ensures shortcuts directory and writes `/configuration/shared/shortcuts/settings.json`.
2. Runtime path constructs `Settings` window and tab view.
3. Event loop repeatedly dispatches window events to tab handlers until close.

## Runtime integration points

- Graphics/LVGL for tabbed UI composition.
- Task module for environment and current-task context handling in specific tabs.
- Authentication crate in password tab (`authenticate_user`, `change_user_password`).
- Network module in network tab via interface control commands.
- Graphics theme controls for live palette updates, including calls from within an existing LVGL lock.
- VFS for shortcut write and network-device opening.

## Data and control flow / VFS touchpoints

- VFS write touchpoint: settings shortcut JSON file and per-user appearance record at `/users/<uid>/.appearance`.
- Shells create private `/users/<uid>` home directories (mode `0700`) and set `HOME`. Appearance records are mode `0600`.
- A versioned appearance record is written through a temporary replacement and restored for the user at login; native/browser startup also restore administrator preferences for the login screen.
- Password tab flow: user resolution -> current password validation -> persisted password update through authentication crate.
- Network tab flow: enumerate `/devices/network/*`, open interface file, issue control commands for status/config.

## Concurrency and event-loop model

- Single periodic event loop (`sleep(50 ms)`) at executable level.
- Tab handlers perform async operations when triggered by UI events; no internal worker task fan-out in top-level loop.

## Failure semantics

- UI creation/mounting failures return non-zero executable result.
- Shortcut write failures surface during executable registration path.
- Tab operation failures are handled per-tab (status labels/logging) or propagated as typed settings errors.

## Contract vs implementation

- **Contract**: settings executable opens configuration UI and processes tab interactions until closed.
- **Current implementation**: five fixed tabs including appearance persistence, password/network integration and shortcut registration.

## Operational limitations

- Tab set is compile-time fixed.
- Event polling interval is fixed and can impact perceived UI responsiveness.

## Appearance and per-user homes

The Appearance tab supports light/dark mode and five primary/secondary color presets. The Zinc-based palette updates existing windows immediately, including contrasting text colors.

Each user has a private home directory at `/users/<uid>` (mode `0700`). Appearance preferences are stored in a small versioned record at `/users/<uid>/.appearance` (mode `0600`) and restored on login. The native and browser examples also restore the root user's appearance for the login screen. Changes are saved through a temporary-file replacement strategy; invalid records are rejected.

## References

- <CodeReference path="executables/settings" />
- [Internationalization](/explanation/architecture/libraries/internationalization)
