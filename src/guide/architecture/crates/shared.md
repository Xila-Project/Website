---
layout: doc
---

# 📦 Shared

The `shared` crate contains common utility types and helpers reused across modules, drivers, and executables.

It is the place for lightweight cross-cutting code that should not live in a specific subsystem.

## Features

- Common data structures and utility helpers.
- Small abstractions reused by multiple crates.
- Reduced duplication across Core packages.

## Dependencies

- Logging integration via the `log` workspace dependency.

## References

- <HostReference crate="shared" />
- <CodeReference path="modules/shared" />

## See also

- [🔃 Synchronization](./synchronization.md)
