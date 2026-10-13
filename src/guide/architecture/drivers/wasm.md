---
layout: doc
---

# 🌍 WASM driver crate

The `drivers_wasm` crate provides drivers for WebAssembly targets (`wasm32`).

It offers browser/web runtime integrations such as memory/logging adapters, async execution support, and devices including time, drive, and HTTP client access.

## Persistent drive

The browser example uses `devices::DriveDevice` to open the origin-private file `xila_drive.img` using OPFS and hold a lifetime Web Lock. This main-thread driver keeps a bounded memory cache (16 MiB in the browser example) and commits snapshots asynchronously through `sync().await`. Synchronous block writes/flushes update the cache; they do not establish OPFS durability.

Only dirty disks are saved. Saves are serialized and atomic, with at most one additional disk-sized snapshot rather than a growing queue. Failures leave unsaved changes available for retry; the caller must handle errors. OPFS quota/eviction and abrupt tab termination can still lose data.

The browser example saves at startup, every second when dirty, and on normal shutdown. It validates existing MBR/LittleFS data and stops on mount errors instead of reformatting a saved image. See [Use on WASM](../../get_started/use_wasm.md#persistent-browser-storage) for persistence, login, and reset behavior.

## Browser capabilities

OPFS, `FileSystemFileHandle.createWritable`, and Web Locks require an appropriate browser and localhost/HTTPS. Only one Xila tab can hold the disk lock. The HTTP device uses Fetch and follows browser restrictions such as CORS; it does not expose raw sockets or provide the Xila network manager.

## Dependencies

- [🧠 Memory](../modules/memory.md)
- [🖼️ Graphics](../modules/graphics.md)
- [🏁 Task](../modules/task.md)
- [📝 Log](../modules/log.md)
- [📦 Shared](../crates/shared.md)

## References

- <CodeReference path="drivers/wasm" />

## See also

- [🪛 Drivers](../drivers.md)
- [🧱 Core driver crate](./core.md)
