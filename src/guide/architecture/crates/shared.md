---
layout: doc
---

# 📦 Shared

The `shared` crate is the low-level cross-cutting utility layer used by modules, drivers, and executables.

## Role

- Centralizes reusable primitives that do not belong to one domain subsystem.
- Reduces duplication of utility code and shared type definitions across the workspace.

## Boundaries

- In scope: generic helpers and value types (`flags`, `size`, `time`, HTTP/unit/UTF-8/slice helpers, layout-based any wrappers).
- Out of scope: module orchestration, stateful managers, backend-specific logic.

## Internal structure

- Utility modules include `any`, `bijective_map`, `flags`, `http`, `size`, `slice`, `task`, `time`, `unit`, `utf8`.
- `error.rs` provides shared error representation utilities.

## Runtime interaction

- Typically used as pure library calls/value containers.
- Frequently appears at crate boundaries where generic data conversion is needed (for example control payload casting and UTF-8 chunk iteration).

## Dependency model

- Dependency-light by design (`num`, workspace `log`).
- Sits near the bottom of the dependency graph and is imported by many crates.

## Failure semantics

- Errors are mostly local utility conversion/validation errors (for example slice/layout checks).
- Crates consuming shared utilities usually remap these errors into their own domains.

## Extension points

- Add new generic helpers when used by multiple subsystems.
- Keep module additions cohesion-focused to avoid this crate becoming a catch-all for domain logic.

## Contract vs implementation

- **Contract**: stable, dependency-light utility API surface safe for broad workspace reuse.
- **Current implementation**: collection of no-std-friendly helper modules with selective logging integration.

## Limitations and trade-offs

- Broad reuse increases API stability pressure.
- Keeping scope strictly "shared only" avoids coupling but may require small wrappers in consumer crates.

## References

- <HostReference crate="shared" />
- <CodeReference path="modules/shared" />
- [🔃 Synchronization](./synchronization.md)
