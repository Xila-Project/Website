---
layout: doc
docType: explanation
description: "Clock is a Rust/WASM graphical application providing UTC time, alarms, a stopwatch, and a countdown timer through Xila's guest APIs."
---

# Clock (executable)

Clock is a `wasm32-wasip1` guest application installed through Xila's WASM runtime. It uses the guest graphics bindings, WASI clocks, and VFS-backed settings while keeping timing state bounded.

## Available views

- **Clock** displays the host-provided UTC date/time with a saved 12/24-hour preference.
- **Alarm** stores one UTC alarm with optional weekdays, enable/disable/delete, five-minute snooze, and dismiss.
- **Stopwatch** supports start, pause/resume, reset, and up to 32 cumulative laps.
- **Timer** supports a one-second to 24-hour countdown, pause/resume, restart/cancel, and an in-app completion alert.

The application deliberately presents alarm times as UTC. It does not currently provide timezone/DST data or city clocks.

## Runtime integration

Clock is copied to `/binaries/clock` in the native and browser demonstrations and installed with:

```text
wasm --install /binaries/clock
```

The install export creates `/configuration/shared/shortcuts/clock.json`. The host provisions `/configuration/shared/clock` as writable storage for the application's settings.

Stopwatch, timer, and snooze durations use the WASI monotonic/startup clock. Alarms use wall time. The guest cooperatively sleeps between event checks because the current graphics ABI does not provide a blocking window-event wait.

## Persistence model

Clock alternates two fixed-size settings records at `/configuration/shared/clock/settings.0` and `settings.1`. This lets startup fall back to the previous valid record when the newest record is corrupt or partially written.

The stored state includes clock-format and alarm settings. Timer state, stopwatch state/laps, and snooze are intentionally not restored after process exit or reboot. Current WASI file APIs do not provide rename/sync semantics, so the alternating records improve recoverability but do not guarantee power-loss durability.

## Notification limits

Alerts are visual and remain active while the Clock process runs, even if another Xila window is focused. There is no host background alarm service, system notification, audio alert, RTC wake, or powered-off alarm. Closing Clock stops delivery until the guest is launched again.

## Resource and scheduling behavior

Normal display updates happen once per second; the visible stopwatch refreshes at tenths of a second. Retained laps and event work are bounded. Alarm/timer delivery depends on executor scheduling and is not a real-time guarantee.

## References

- <CodeReference path="executables/clock" />
- [WASM runtime](/reference/wasm-runtime)
- [Graphics bindings](/reference/graphics-bindings)
