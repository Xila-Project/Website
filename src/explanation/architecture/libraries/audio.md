---
layout: doc
docType: explanation
description: The bounded PCM audio protocol, buffer and mixer library in Xila Core.
---

# Audio

The `audio` crate defines PCM character-device commands, bounded playback buffers and a fixed-capacity mixer. Callers own the storage and lifecycle: this is a reusable library rather than a separately installed process-wide audio manager.

`AudioSystem` can be pinned, given statically allocated storage and mounted through an `AudioStreamDevice` at `/devices/audio/playback`. A platform adapter owns the actual hardware/host output stream.

The library's buffers, volume controls and mixer operate with fixed capacities; stream/output handles and callbacks are managed by the caller. See <CodeReference path="libraries/audio/README.md" /> and <HostReference crate="audio" /> for formats, limits and ownership requirements.

