---
layout: doc
---

# 🕓 Time

The Time module provides the global runtime time source for Xila services.

## Role in system

- Supplies current time to modules that stamp metadata (for example VFS attributes).
- Supplies uptime-like elapsed time since manager initialization.
- Acts as the canonical time source adapter for platform drivers.

## Responsibilities and boundaries

**In scope**

- One-time manager initialization with a direct character device source.
- `get_current_time()` and `get_current_time_since_startup()` query APIs.
- Conversion between device byte payload and `core::time::Duration`.

**Out of scope**

- Time synchronization protocols.
- Timezone/calendar policy.
- Multi-source clock arbitration.

## Internal architecture

- Singleton manager in `OnceLock`.
- `Manager` stores:
  - `device: &'static dyn DirectCharacterDevice`,
  - `start_time: Duration` captured at initialization.
- Current-time reads deserialize `Duration` directly from device bytes.

**Contract vs implementation**

- **Contract**: callers get `Duration` values and error on device/read failures.
- **Implementation**: exact wire representation assumes device emits in-memory `Duration` layout expected by this build.

```mermaid
graph TD
    Clients@{ shape: processes, label: "Other modules / executables" }
    Init[time::initialize(driver)]
    Manager[Time Manager singleton]
    Driver[DirectCharacterDevice time source]

    Clients -->|time::get_instance()| Manager
    Init --> Manager
    Manager -->|read Duration bytes| Driver
    Manager -->|compute uptime from start_time| Manager
```

## Lifecycle and execution model

1. Platform provides time device implementation.
2. `time::initialize(driver)` captures startup timestamp.
3. Runtime callers use singleton for current time or elapsed since startup.

## Data/control flow

- Read path: module caller -> time manager -> direct character device read -> `Duration`.
- Uptime path: current read - cached startup time.

## Concurrency and synchronization model

- Manager state is immutable after initialization (device handle + start time).
- Read calls are lock-free in manager layer and depend on driver thread-safety guarantees.

## Dependency model

- Upstream dependency: platform `DirectCharacterDevice` implementation.
- Downstream consumers: VFS, graphics tick callback, network time conversion.

## Failure semantics and recovery behavior

- Initialization fails if initial time read fails.
- Runtime queries propagate device read failures as `time::Error`.
- No internal retry/backoff policy; callers decide recovery strategy.

## Extension points

- Replace time source driver per target.
- Add higher-level synchronization layers above this module.
- Extend manager with optional monotonic/wall-clock source separation.

## Known limitations and trade-offs

- Read-only API surface (no set-time operation in current module).
- Accuracy/monotonic behavior depends entirely on device implementation.
- Wire contract currently assumes compatible `Duration` representation at device boundary.

## References / See also

- <HostReference crate="time" />
- [Drivers](../drivers.md)
- [Synchronization](../crates/synchronization.md)
