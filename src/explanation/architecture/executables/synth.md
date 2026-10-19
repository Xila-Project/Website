---
layout: doc
docType: explanation
description: Understand Xila Synth's bounded WASM audio generation and native/browser playback paths.
---

# Synth (executable)

Synth is an eight-voice instrument implemented as a `wasm32-wasip1` guest. Its waveform generation goes through the Xila audio device and shared mixer, rather than accessing native or browser sound APIs directly.

## Controls and audio path

The graphical keyboard supports octaves **2–6**, sine/square/triangle waveforms and 10% volume steps (70% initially). Note presses and releases control playback; changing octave releases any held notes. The controls are session-local.

The instrument uses bounded PCM blocks, with at most one retained **128-frame block** per turn. Partial writes and output backpressure do not create an unbounded queue. Eight synthesis voices do **not** imply support for eight simultaneous fingers: the current input driver exposes one pointer.

The native example routes audio to the system's default output. In the browser, the page's **Enable audio** control must be activated by a user gesture before playback is available. If Synth is already running, use **Retry audio**.

## Failure boundaries

When an audio backend cannot start or stream writes fail, Synth remains interactive in **silent mode**. Its controls still respond; enabling audio and retrying may restore playback. Closing the window stops the notes and releases the stream.

The native and browser examples include Synth in newly seeded installations. Existing persistent disks are preserved and do not automatically install newer guest applications. Physical WT32-SC01 Plus speaker output remains pending an I2S driver and board validation; a native/browser demo does not establish it.

## References

- <CodeReference path="executables/synth/README.md" />
- <CodeReference path="executables/synth" />
- [Audio library](/explanation/architecture/libraries/audio)
- [WASM executable](/explanation/architecture/executables/wasm)
