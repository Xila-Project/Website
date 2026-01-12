---
layout: doc
---

# 🧑 Users

The Users module manages user accounts and permissions within the Xila operating system. It provides functionalities for creating, deleting, and managing users.

However (to avoid circular dependencies with virtual file system), the Users module does not handle authentication or user sessions. These functionalities are expected to be implemented at a higher level (see [authentication](../crates/authentication.md) wrapper).
