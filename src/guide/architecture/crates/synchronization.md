---
layout: doc
---

# 🔃 Synchronization

The Synchronization crate provides synchronization primitives and utilities to ensure thread-safe operations within the Xila operating system. It offers mechanisms for managing concurrent access to shared resources, preventing race conditions, and coordinating tasks.

## Features

The Synchronization crate offers the following features:

- **Mutexes**: Mutual exclusion locks to protect shared data.
- **Read-Write locks**: Locks that allow multiple readers or a single writer.

## Dependencies

- Built on top of `embassy-sync`.

## References

- <HostReference crate="synchronization" />
- <CodeReference path="modules/synchronization" />

## See also

- [🏁 Task](../modules/task.md)
- [🧠 Memory](../modules/memory.md)
