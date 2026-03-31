---
layout: doc
---

# 🔃 Synchronization

The `synchronization` crate standardizes synchronization primitives used across Core.

## Role

- Re-exports `embassy_sync` primitives through one crate-local entry point.
- Provides portable `Arc`/`Weak` support, including a custom fallback for targets without atomic pointer support.

## Boundaries

- In scope: synchronization primitives and ownership wrappers.
- Out of scope: scheduler/executor implementation and task lifecycle policy.

## Internal structure

- `lib.rs`: top-level re-exports.
- `arc/mod.rs`: target-gated arc selection.
  - With `target_has_atomic = "ptr"`: uses `alloc::sync::Arc`/`Weak`.
  - Without pointer atomics: uses `arc/arc_lock.rs` mutex-backed Arc implementation.

## Runtime interaction

- Modules and executables import mutex/rwlock/once/channel primitives from this crate.
- Fallback Arc implementation uses `CriticalSectionRawMutex` + `RefCell` counters for no-atomic targets.

## Dependency model

- Primary dependency: `embassy-sync` (std feature enabled on host targets).
- Broadly consumed by file-system backends, graphics, and other concurrent modules.

## Failure semantics

- Most primitives are infallible at API level; contention manifests as wait/lock behavior.
- Fallback Arc enforces overflow checks on reference counters and may panic on overflow.

## Extension points

- Additional wrappers/adapters can be added to normalize synchronization semantics across targets.
- Arc fallback can evolve independently while preserving exported `Arc`/`Weak` contract.

## Contract vs implementation

- **Contract**: one consistent synchronization import surface across platforms.
- **Current implementation**: direct `embassy_sync` re-export plus conditional Arc fallback implementation.

## Limitations and trade-offs

- Behavior still inherits cooperative runtime assumptions from executor usage patterns.
- Fallback Arc prioritizes portability over lock-free performance.

## References

- <HostReference crate="synchronization" />
- <CodeReference path="modules/synchronization" />
- [🏁 Task](../modules/task.md)
