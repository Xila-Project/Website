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

In practice, the crate groups low-level reusable building blocks such as:

- generic data wrappers and conversion helpers,
- flags/utilities used by multiple subsystem APIs,
- shared error/value representations,
- common protocol/value helpers (for example HTTP/time/units).

## Architecture

`shared` acts as a foundational utility layer and should stay dependency-light so it can be imported by modules, drivers, and executables without creating heavy dependency chains.

## Dependencies

- Logging integration via the `log` workspace dependency.

## References

- <HostReference crate="shared" />
- <CodeReference path="modules/shared" />

## See also

- [🔃 Synchronization](./synchronization.md)
