---
layout: doc
---

# 🔃 Synchronization

The Synchronization crate provides synchronization primitives and utilities to ensure thread-safe operations within the Xila operating system. It offers mechanisms for managing concurrent access to shared resources, preventing race conditions, and coordinating tasks.

## Features

The Synchronization crate offers the following features:

- **Mutexes**: Mutual exclusion locks to protect shared data.
- **Read-Write locks**: Locks that allow multiple readers or a single writer.
- **Once initialization primitives**: Used by singleton module patterns.
- **Reference-counted shared ownership**: `Arc` support for cross-task sharing.
- **Signal/channel primitives**: Event-driven synchronization for async workflows.

## Dependencies

- Built on top of `embassy-sync`.

## Architecture

This crate mostly re-exports and wraps synchronization primitives for consistent usage across Xila crates, keeping synchronization semantics unified between modules and targets.

## Known limitations

- Behavior depends on underlying executor/runtime assumptions (cooperative async model).
- Blocking semantics should be used carefully in performance-sensitive paths.

## References

- <HostReference crate="synchronization" />
- <CodeReference path="modules/synchronization" />

## See also

- [🏁 Task](../modules/task.md)
- [🧠 Memory](../modules/memory.md)
