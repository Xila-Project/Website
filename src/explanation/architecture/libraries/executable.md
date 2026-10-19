---
layout: doc
docType: explanation
description: "The executable crate defines the native executable contract and the launcher used across Core."
---

# Executables

The `executable` crate defines the native executable contract and the launcher used across Core.

## Role

- Defines `ExecutableTrait` and typed `GET_MAIN_FUNCTION` command contract.
- Provides `execute(...)` orchestration: permission checks, task spawn, and standard stream propagation.

## Boundaries

- In scope: executable ABI contract, launch permission logic, standard stream helper type.
- Out of scope: executable UI/business logic and shell-specific command parsing.

## Internal structure

- `traits.rs`: `ExecutableTrait`, `ExecutableWrapper`, `mount_executables!`, command definition.
- `lib.rs`: launch path (`execute`) + execution permission helpers.
- `standard.rs`: `Standard` abstraction (`open`, `duplicate`, `read_line`, `close`).
- `arguments_parser.rs`: argument helper support for executable crates.
- `error.rs`: launcher-level error type.

## Runtime interaction

1. Executables are mounted as character devices exposing `GET_MAIN_FUNCTION`.
2. `execute(context, path, args, standard, spawner)` uses the context's VFS/users/task managers to fetch statistics and check execute permissions.
3. It opens executable file and requests main function via control command.
4. It spawns a task and calls main with `Standard` carrying the same context and the argument vector.
5. It returns `task::JoinHandle<isize>` to allow join/wait by caller.

## Dependency model

- Core dependencies: [File System](/explanation/architecture/crates/file_system), [Virtual file system](/explanation/architecture/modules/virtual_file_system), [Task](/explanation/architecture/modules/task), [Users](/explanation/architecture/modules/users), [Shared](/explanation/architecture/crates/shared), [Log](/explanation/architecture/modules/log), [Internationalization](/explanation/architecture/crates/internationalization).

## Failure semantics

- Permission denial is explicit (`Error::PermissionDenied`).
- Missing main entrypoint yields `FailedToGetMainFunction`.
- Task spawn or VFS failures are mapped into crate error variants.
- Executable runtime errors are converted to negative `isize` task return values in spawned task closure.

## Extension points

- New executable crates implement `ExecutableTrait` and mount through `ExecutableWrapper` or `mount_executables!`.
- `building` feature gates additional build-time support without changing runtime core path.

## Contract vs implementation

- **Contract**: executable = mounted character device that answers `GET_MAIN_FUNCTION` and receives `Standard + Vec<String>`; `Standard::context` supplies explicit capabilities.
- **Current implementation**: launcher uses VFS metadata + users/group checks and task spawn under current task context.

## Limitations and trade-offs

`ExecutableContext` carries task/users/time managers, VFS, optional networking, and optional graphics when the graphics feature is enabled. `ExecutableWrapper::new(executable, context)` and `mount_executables!(context, virtual_file_system, task, ...)` bind executables to that context. `Standard::open(..., task, virtual_file_system, context)` opens streams with the same capability set. Required references are `'static`; final binaries own their storage/lifetimes.

- Contract is intentionally narrow (`main` only), simplifying dispatch but leaving richer lifecycle hooks to higher layers.
- `setuid`-style override logic is constrained and permission-checked at launch time.

## References

- <HostReference crate="executable" />
- <CodeReference path="modules/executable" />
- [Executables architecture pages](/explanation/architecture/executables/)
