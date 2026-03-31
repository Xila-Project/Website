---
layout: doc
---

# 🖼️ Graphical shell (executable)

The graphical shell executable is the session shell that transitions from login to desktop views.

## Role

- Owns login UI, session activation, and desktop/home shell composition.
- Sets task-level session environment (`User`) after successful login.

## Startup and lifecycle

1. Parses startup args (`--show-keyboard`).
2. Builds `Shell` with `Layout` and `Login` components.
3. Runs loop: layout tick -> login event handling -> post-login desk/home activation.
4. Continues desk event handling until shell loop terminates.

## Runtime integration points

- `ExecutableTrait` for launcher integration.
- `users::get_instance()` to map logged user ID to user name.
- `task::set_environment_variable` to publish session user into task context.
- Graphics manager/LVGL wrappers for UI object/event handling.

## Data and control flow / VFS touchpoints

- Input: CLI flags and UI events.
- Primary control flow is event-driven within one shell loop.
- VFS touchpoints occur indirectly through components such as desktop shortcuts (implemented in submodules), not in top-level loop itself.

## Concurrency and event-loop model

- Single periodic loop with `task::sleep(Duration::from_millis(50))` cadence.
- No internal multi-task fan-out in main loop; concurrency is delegated to underlying graphics/task systems.

## Failure semantics

- Argument parse failures are printed to stderr and return non-zero.
- Environment-variable update failures propagate via `Error::FailedToSetEnvironmentVariable`.
- UI initialization failures (`Layout::new`, `Login::new`, `Desk::new`, `Home::new`) propagate as executable error.

## Contract vs implementation

- **Contract**: graphical shell executable starts a login-driven user session loop.
- **Current implementation**: explicit login-first flow that instantiates desk/home only after authentication and publishes `User` env variable.

## Operational limitations

- Loop cadence is fixed (50 ms sleep), which trades responsiveness for predictable CPU usage.
- Session state is task-environment-based; cross-task session propagation relies on external task model behavior.

## References

- <CodeReference path="executables/shell/graphical" />
- [🏁 Executable runtime crate](../crates/executables.md)
