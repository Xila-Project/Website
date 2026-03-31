---
layout: doc
---

# 🖼️ Graphics

The Graphics module hosts the LVGL runtime integration and exposes window/display/input services to executables.

## Role in system

- Owns LVGL initialization and timer handler loop integration.
- Bridges platform screen/input character devices into LVGL display/input objects.
- Provides window lifecycle APIs and event retrieval for application runtimes.

## Responsibilities and boundaries

**In scope**

- Manager singleton setup and LVGL runtime lifecycle.
- Display/input device registration and runtime polling.
- Window creation, enumeration, focus/maximize operations, and close requests.
- Theme initialization and updates.

**Out of scope**

- Full safe Rust wrapper coverage for all LVGL symbols.
- Application-level UI architecture decisions.

## Internal architecture

- Singleton `Manager` (`OnceLock`) with:
  - `inner: RwLock<Inner>` storing display/input vectors and window parent object,
  - `global_lock: Mutex<()>` used to serialize LVGL-critical sections.
- Initialization sequence calls `lv_init`, sets LVGL tick callback to `time::get_instance()`.
- `Manager::loop` drives `lv_timer_handler()` and periodic display resize checks.
- `Window` wraps `lv_obj_t*`, stores user data queue, and maps LVGL events into Xila event types.

```mermaid
graph TD
    Clients@{ shape: processes, label: "Executables / modules" }
    Init[graphics::initialize(...)]
    Manager[Graphics Manager singleton]
    LoopTask[Graphics loop task]
    LVGL[LVGL runtime]
    ScreenDev[Screen DirectCharacterDevice]
    InputDev[Input DirectCharacterDevice(s)]
    TimeMod[time::get_instance()]

    Clients -->|window/theme/input APIs| Manager
    Init --> Manager
    LoopTask -->|Manager::loop()| LVGL
    Manager -->|display flush| ScreenDev
    Manager -->|input poll| InputDev
    TimeMod -->|tick callback| LVGL
    Manager -->|global lock| LVGL
```

## Lifecycle and execution model

1. Initialize [Time](./time.md) first.
2. Initialize graphics manager with screen/input devices and buffer configuration.
3. Spawn graphics loop task calling `Manager::loop(...)`.
4. Applications create windows and process queued events.
5. Optional runtime updates: add inputs, update theme, close/maximize windows.

## Data/control flow

- Input devices -> LVGL event callbacks -> per-window event queues.
- Manager loop polls LVGL timers and triggers display maintenance.
- Host bindings may call graphics APIs under manager lock (WASM path).

## Concurrency and synchronization model

- LVGL-sensitive operations are protected by manager-level mutex lock.
- Metadata collections use `RwLock` for async read/write access.
- Window/user-data pointers rely on explicit ownership conventions and `from_raw`/`into_raw` usage discipline.

## Dependency model

- Depends on [Time](./time.md) for tick callback.
- Interacts with [Bindings](./bindings.md) and VM runtime in WASM host path.
- Uses platform `DirectCharacterDevice` implementations for concrete display/input IO.

## Failure semantics and recovery behavior

- Initialization failures panic in current manager construction path.
- Runtime operations return typed `graphics::Error` for invalid window identifiers and object failures.
- Event queue and object pointer misuse can surface as runtime failures if ownership rules are violated.

## Extension points

- Add additional input devices at runtime.
- Extend window/theme APIs and higher-level widget wrappers.
- Expand bindings/codegen coverage for broader LVGL surface.

## Known limitations and trade-offs

- Significant portions remain close to LVGL C-style pointer semantics.
- Global lock simplifies safety but can become a bottleneck under heavy UI call contention.
- Current startup path assumes one primary display initialization flow.

## Contract vs implementation

- **Stable module contract:** Graphics provides a global service surface for display/input lifecycle, window management, and event delivery to executables through typed APIs.
- **Current implementation details:** A singleton manager (`OnceLock`) coordinates LVGL state, protects critical sections with a global mutex, and stores runtime collections in `RwLock`-protected metadata.
- **Compatibility note:** Consumers should rely on API behavior and documented error semantics, not on internal lock composition, pointer wrapping strategy, or exact LVGL wiring details.

## References / See also

- <HostReference crate="graphics" />
- [File system](../crates/file_system.md)
