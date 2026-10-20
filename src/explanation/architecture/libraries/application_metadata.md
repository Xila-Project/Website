---
layout: doc
docType: explanation
description: Shared launch and shortcut metadata for Xila applications.
---

# Application metadata

The `application_metadata` library centralizes native and guest application names, seed-install markers and shortcut JSON construction. Host examples, installers and filesystem image generation can share these definitions without duplicating their application inventory.

It is a reusable data/formatting library with no independent runtime manager.

## Public contract

The library is `no_std` with `alloc`, and exposes two compile-time application inventories:

- `GUESTS`: `calculator`, `clock`, `pixel_painter`, `synth`, `text_editor` and `weather`.
- `NATIVE`: `file_manager`, `terminal` and `settings`, plus `debug` on Unix builds.

These arrays drive shared knowledge about installation and launch; they do **not** discover installed binaries dynamically. A runtime may have fewer or different executables than the inventory, so consumers should still check the VFS.

`shortcut(name: &str) -> Option<String>` emits a JSON string containing a display name, executable command, arguments, terminal flag, short icon text and RGB icon color. Guest shortcuts invoke `/binaries/wasm` with `"/binaries/<guest>"` as an argument; native shortcuts invoke their own `/binaries/<name>` path directly. Unknown names return `None`.

```rust
let guest = application_metadata::shortcut("clock").expect("known app");
assert!(guest.contains("/binaries/wasm"));
assert!(application_metadata::shortcut("unknown").is_none());
```

## Seed image handshake

`PENDING_PATH` is `/system/.seed-pending`, with exact marker bytes `PENDING_CONTENT = b"xila-seed-v1\n"`. The authentication library uses these to **authorize initial account provisioning** only for an explicitly marked reference image. Unmarked existing disks should not automatically reset administrator credentials or recreate accounts.

The shortcut JSON is assembled manually, not via a general JSON serializer; names and icon values are drawn from a fixed internal match table. Adding a new application requires updating both the appropriate inventory and `shortcut`, including its launch mode, label, icon and color. Selected labels are resolved at build time through `embedded-i18n`.

## Ownership, limitations and references

There is no singleton or mutable registry; all returned shortcut strings are owned by the caller. The `#[cfg(unix)]` inventory condition is a **compile-target decision**, not a runtime OS probe.

- <HostReference crate="application_metadata" /> — Rustdoc.
- <CodeReference path="libraries/application_metadata/src/lib.rs" /> — inventories, seed constants and JSON format.
- [Authentication](/explanation/architecture/libraries/authentication) — reads the seed marker.
- [Executable](/explanation/architecture/libraries/executable) — consumes launch paths.

