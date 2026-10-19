---
layout: doc
docType: explanation
description: PCM audio formats, device commands, bounded queues, mixing, VFS integration and platform output.
---

# Audio

The `audio` crate supplies reusable PCM playback primitives and a fixed-capacity mixer. It is **not** a process-global audio subsystem: the caller owns the memory, stream handles, output reservations, and platform adapter. The `xila` feature `audio` exposes the API; native host output additionally requires `drivers_native/audio`.

## Data flow and ownership

1. A caller allocates `PlaybackBuffer<N>` for a single playback device, or constructs and pins `AudioSystem<STREAMS, STREAM_BYTES, MIX_FRAMES, OUTPUTS, SINK_BYTES>` for multiple streams.
2. Application writers enqueue interleaved PCM frames. Writes are nonblocking and may accept fewer bytes than requested.
3. A renderer or `mix_next_block()` consumes frames. Paused or empty streams contribute silence.
4. Output consumers owned by a platform adapter pull the mixed PCM. Native output uses `nanoaudio-cpal`; browser output uses Web Audio integration.

`nanoaudio` provides buffering, DSP, conversion, and volume support. The OS audio dependency does not include codecs or resampling. Host backends may adapt the fixed mix format to device capabilities.

## PCM device protocol

Input samples are interleaved little-endian PCM, with **1–8 channels**. The input formats are U8 (silence 128), signed I16, packed I24, signed I32, and F32 (nominal full scale −1 to 1). `Configuration` is an eight-byte `repr(C)` value containing `u32 sample_rate`, `u8 channels`, `u8 format`, and two zero reserved bytes. Xila's format codes are U8=0, I16=1, I24=2, I32=3, F32=4; these are not nanoaudio's enum discriminants.

The device control prefix is `b'A'`:

| Command             | Number | Payload or result             |
| ------------------- | -----: | ----------------------------- |
| `SET_CONFIGURATION` |      1 | `Configuration` → `()`        |
| `GET_CONFIGURATION` |      2 | `()` → `Configuration`        |
| `GET_WRITABLE`      |      3 | `()` → `u32` free bytes       |
| `SET_VOLUME`        |      4 | `u8` percentage, 0–100 → `()` |
| `GET_VOLUME`        |      5 | `()` → `u8` percentage        |
| `START`             |      6 | `()` → `()`                   |
| `STOP`              |      7 | `()` → `()`                   |

Control payloads must have the specified size and alignment; malformed payloads return `InvalidParameter`. Configuration is fixed when storage is split and a backend is opened. Setting the same configuration succeeds, but changing it requires a new stream.

A new stream starts **paused at 100% volume**. `START` enables consumption; `STOP` pauses and preserves queued frames, although an in-progress callback may finish. `write()` only accepts complete frames that fit and returns the accepted byte count (possibly zero). Retry the remainder later rather than busy-spinning. `flush()` is a **nonblocking drain poll**: it reports `RessourceBusy` until the callback consumes queued PCM; it does not guarantee that the host output latency buffer is empty. Capture/read is unsupported.

## Fixed-capacity mixer

`AudioSystem<STREAMS, STREAM_BYTES, MIX_FRAMES, OUTPUTS, SINK_BYTES>` mixes **48 kHz stereo interleaved F32**. The default type is `AudioSystem<4, 2048, 128, 2, 3072>`: four application streams, 128-frame mix blocks, and two output sinks. The system must be pinned before opening output handles or mixing.

```rust
let system = core::pin::pin!(audio::AudioSystem::<4, 2048, 128, 2, 3072>::new()?);
let stream = system.open_stream()?;
let mut output = system.as_ref().open_output()?;
stream.start()?;
system.as_ref().mix_next_block()?;
output.with_consumer(|consumer| { /* platform adapter reads PCM */ });
```

Each stream has its own queue, start/stop state and volume. Mixer gain and master gain use `nanoaudio::Mixer`. When an output sink lacks room for a full block, that sink drops the incoming block and increments `dropped_blocks()`; other sinks continue. Writes, controls and mixing use an atomic try-lock and return `RessourceBusy` under contention; output consumers do not acquire that lock.

The default system contains **14 KiB of PCM queue storage** (8 KiB input and 6 KiB output). Core setup and steady-state operations are allocation-free, but this excludes platform adapter buffers and threads. A consumer transferred with `into_consumer_with_reservation` must be destroyed before its reservation is released; violating that unsafe lifetime contract is not permitted.

## Virtual filesystem integration

`AudioStreamDevice` mounts the local playback service at `/devices/audio/playback`. Each VFS open reserves an independent stream in its context. Writes and generic `b'A'` controls operate on that stream; closing the file releases the slot. Cloning an open context and reading from it are unsupported. Guests use normal file writes and descriptor controls, without audio-specific WASI imports.

## Native playback and tests

The optional `nanoaudio-cpal` driver creates one or two output sinks and a shared mixer scheduler on Linux, macOS, and Windows. Its callback plays silence on underrun. The owning `Runner` reports errors through `check()` and underruns through `underruns()`; dropping it stops the mixer before releasing output reservations.

```sh
cargo test -p audio
cargo run -p drivers_native --features audio --example audio
```

The example emits a short 440 Hz square wave when a host audio device is available. Tests of core buffers and mixing do not prove audible output on a particular device. Web Audio and generic guest descriptor controls are available; ESP32 I2S and system sounds remain follow-up work.

## Source and API references

- <HostReference crate="audio" />
- <CodeReference path="modules/audio/README.md" />
- [Synth application](/explanation/architecture/executables/synth)
- [Virtual filesystem](/explanation/architecture/subsystems/virtual_file_system)
