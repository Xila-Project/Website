---
layout: doc
docType: explanation
description: "This crate implements persistent account/group data handling and password verification flows used by the host runtime."
---

# 🔒 Authentication

This crate implements persistent account/group data handling and password verification flows used by the host runtime.

## Role

- Owns persistence and transformation logic for users/groups (`/system/users`, `/system/groups`).
- Bridges runtime managers (`users`) with persistent storage (`virtual_file_system`) and device-backed entropy/hash operations.

## Boundaries

- In scope: reading/writing JSON user and group records, salted password hashing, authentication checks.
- Out of scope: session/task identity ownership (handled by [Users](/explanation/architecture/modules/users) + [Task](/explanation/architecture/modules/task)).
- In scope: coordinating with `/devices/random` and `/devices/hasher`; out of scope: implementing those devices.

## Internal structure

- `lib.rs`: crate entry points (`load_all_users_and_groups`) and canonical paths.
- `user.rs`: `User` model + account operations (`authenticate_user`, `create_user`, password/name mutation).
- `group.rs`: `Group` model + group creation and file loading helpers.
- `hash.rs`: salt generation and hash-device command sequence.
- `error.rs`: typed error mapping across file-system, users, and task flows.

## Runtime interaction

1. Caller builds `authentication::Context { virtual_file_system, task_manager, users_manager, task }` and passes a reference to authentication functions.
2. File reads/writes occur through `virtual_file_system::File` / `Directory` using the supplied VFS and task.
3. Salt bytes are read from `/devices/random`.
4. Password+salt bytes are written to `/devices/hasher` after `SET_ALGORITHM(HashAlgorithm::Sha512)`.
5. Results are propagated into `context.users_manager` when loading persistent records. Groups are loaded before users; restored primary-group membership is accepted.

For example, startup calls `authentication::load_all_users_and_groups(&context).await`. The browser example does this for an existing OPFS disk and creates the default administrator only for a fresh disk.

## Dependency model

- Internal: [File System](/explanation/architecture/crates/file_system), [Device](/explanation/architecture/crates/device), [Virtual file system](/explanation/architecture/modules/virtual_file_system), [Users](/explanation/architecture/modules/users), [Task](/explanation/architecture/modules/task).
- External: `miniserde` for JSON serialization/deserialization.

## Failure semantics

- Distinguishes open/read/parse/write failures for user/group files.
- Authentication mismatch returns `InvalidPassword` (not file or parse failure).
- During bulk load, malformed entries are skipped while iteration continues.

## Extension points

- Alternate hash strategies can be introduced by extending device commands and `hash.rs` flow.
- File schema can evolve through `User`/`Group` structs while keeping public function contracts stable.

## Contract vs implementation

- **Contract**: async user/group creation, authentication, and persistence APIs returning typed `authentication::Error`.
- **Current implementation**: JSON files under `/system/*`, salt from `/devices/random`, hashing through `/devices/hasher` with SHA-512 selection.

## Limitations and trade-offs

- Hash algorithm selection is currently hardwired to SHA-512 device command path.
- Storage format is file-per-user/group JSON; this is simple and inspectable but not optimized for large account sets.

## References

- <HostReference crate="authentication" />
- <CodeReference path="modules/authentication" />
- [Users Module](/explanation/architecture/modules/users)
