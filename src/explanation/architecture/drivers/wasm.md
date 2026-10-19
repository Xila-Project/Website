---
layout: doc
docType: explanation
description: "The drivers_wasm crate provides drivers for WebAssembly targets (wasm32)."
---

# WASM driver crate

The `drivers_wasm` crate provides drivers for WebAssembly targets (`wasm32`).

It offers browser/web runtime integrations such as memory/logging adapters, async execution support, and devices including time, drive, and HTTP client access.

## Persistent drive

The browser example uses `devices::DriveDevice` to open the origin-private file `xila_drive.img` using OPFS and hold a lifetime Web Lock. This main-thread driver keeps a bounded memory cache (16 MiB in the browser example) and commits snapshots asynchronously through `sync().await`. Synchronous block writes/flushes update the cache; they do not establish OPFS durability.

Only dirty disks are saved. Saves are serialized and atomic, with at most one additional disk-sized snapshot rather than a growing queue. Failures leave unsaved changes available for retry; the caller must handle errors. OPFS quota/eviction and abrupt tab termination can still lose data.

The browser example validates existing MBR/LittleFS data and stops on mount errors instead of reformatting a saved image. See [Browser storage](/explanation/browser-storage) for the cache/autosave model and [Reset the browser disk](/how-to/reset-browser-storage) for a deliberate reset.

## Browser capabilities

OPFS, `FileSystemFileHandle.createWritable`, and Web Locks require an appropriate browser and localhost/HTTPS. Only one Xila tab can hold the disk lock. The HTTP device uses Fetch and follows browser restrictions such as CORS; it does not expose raw sockets or provide the Xila network manager.

## Dependencies

- [Memory](/explanation/architecture/subsystems/memory)
- [Graphics](/explanation/architecture/subsystems/graphics)
- [Task](/explanation/architecture/subsystems/task)
- [Log](/explanation/architecture/subsystems/log)
- [Shared](/explanation/architecture/libraries/shared)

## References

- <CodeReference path="drivers/wasm" />

## See also

- [Drivers](/explanation/architecture/drivers)
- [Core driver crate](/explanation/architecture/drivers/core)
