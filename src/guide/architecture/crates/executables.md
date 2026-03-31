---
layout: doc
---

# 🏃 Executables

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
2. `execute(path, args, standard, spawner)` fetches VFS statistics and checks execute permissions.
3. It opens executable file and requests main function via control command.
4. It spawns a task and calls main with provided `Standard` and argument vector.
5. It returns `task::JoinHandle<isize>` to allow join/wait by caller.

## Dependency model

- Core dependencies: [File System](./file_system.md), [Virtual file system](../modules/virtual_file_system.md), [Task](../modules/task.md), [Users](../modules/users.md), [Shared](./shared.md), [Log](../modules/log.md), [Internationalization](./internationalization.md).

## Failure semantics

- Permission denial is explicit (`Error::PermissionDenied`).
- Missing main entrypoint yields `FailedToGetMainFunction`.
- Task spawn or VFS failures are mapped into crate error variants.
- Executable runtime errors are converted to negative `isize` task return values in spawned task closure.

## Extension points

- New executable crates implement `ExecutableTrait` and mount through `ExecutableWrapper` or `mount_executables!`.
- `building` feature gates additional build-time support without changing runtime core path.

## Contract vs implementation

- **Contract**: executable = mounted character device that answers `GET_MAIN_FUNCTION` and receives `Standard + Vec<String>`.
- **Current implementation**: launcher uses VFS metadata + users/group checks and task spawn under current task context.

## Limitations and trade-offs

- Contract is intentionally narrow (`main` only), simplifying dispatch but leaving richer lifecycle hooks to higher layers.
- `setuid`-style override logic is constrained and permission-checked at launch time.

## References

- <HostReference crate="executable" />
- <CodeReference path="modules/executable" />
- [Executables architecture pages](../executables/index.md)
