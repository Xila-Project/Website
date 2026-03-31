---
layout: doc
---

# ⚙️ Settings (executable)

The settings executable is a tab-based graphical configuration application.

## Role

- Hosts configurable system UI tabs (general/password/network/about).
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
- VFS for shortcut write and network-device opening.

## Data and control flow / VFS touchpoints

- VFS write touchpoint: settings shortcut JSON file.
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
- **Current implementation**: four fixed tabs with explicit password and network integration logic plus static shortcut JSON registration.

## Operational limitations

- Tab set is compile-time fixed.
- Event polling interval is fixed and can impact perceived UI responsiveness.

## References

- <CodeReference path="executables/settings" />
- [🌐 Internationalization](../crates/internationalization.md)
