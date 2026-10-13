---
layout: doc
docType: explanation
description: "The drivers_shared crate provides reusable device implementations that are used across multiple platforms."
---

# Shared driver crate

The `drivers_shared` crate provides reusable device implementations that are used across multiple platforms.

Today this includes utility devices such as random and hashing devices that can be mounted into the virtual file system and reused by modules like authentication.

## Dependencies

- [File system](/explanation/architecture/crates/file_system)
- [Log](/explanation/architecture/modules/log)
- [Shared](/explanation/architecture/crates/shared)
- [Device](/explanation/architecture/crates/device)

## References

- <CodeReference path="drivers/shared" />

## See also

- [Drivers](/explanation/architecture/drivers)
- [Authentication](/explanation/architecture/crates/authentication)
