---
layout: doc
---

# 🏃 Executables

The `executables` crate provides a set of utilities to define and launch native executables within the system.

Xila has two types of executables:

- **Native executables**: These are compiled directly for the target architecture, statically linked against Xila's binary.
- **WASM executables**: These are WebAssembly modules that run within a WASM runtime environment, providing portability across different architectures. These are handled by the [WASM](../executables/wasm.md) native executable.

## Features

Key features include:

- **Executable definition**: Easily define native executables and their properties.

## Dependencies

This crate relies on several core modules:

- [Virtual file system](../modules/virtual_file_system.md): Access and manage executable files.
- [Task](../modules/task.md): Create and manage tasks for running executables.
- [Users](../modules/users.md): Handle permissions and ownership.
- [Log](../modules/log.md): Log launch events and errors.
- [Shared](../crates/shared.md): Common utilities and types used across Xila.

## Architecture

To launch a native executable, follow these steps:

1. **Define the Executable**: Implement the executable either as a raw <HostReference crate="file_system" kind="trait" symbol="CharacterDevice" /> or by using the <HostReference crate="executable" kind="trait" symbol="ExecutableTrait" />.
2. **Mount the Executable**: Attach the executable to the [virtual file system](../modules/virtual_file_system.md) as a character device.
3. **Launch the Executable**: Call the <HostReference crate="executable" kind="fn" symbol="execute" /> with the following parameters:
   - Path to the executable in the virtual file system
   - Arguments to pass (as an owned slice of strings)
   - Standard input, output, and error files (opened and wrapped in <HostReference crate="executable" kind="struct" symbol="Standard" />; file duplicates can be used for redirection)
   - (Optional) Executable spawner identifier

The <HostReference crate="executable" kind="fn" symbol="execute" /> performs these steps:

1. Retrieves task metadata (owner, group, etc.).
2. Obtains the executable file's metadata from the [virtual file system](../modules/virtual_file_system.md).
3. Checks permissions for the executable file.
4. Locates the executable entry point (`main` function) using <HostReference crate="executable" kind="struct" symbol="GET_MAIN_FUNCTION" />.
5. Creates a new task to run the executable.
6. Invokes the executable's `main` function with the provided arguments and standard streams in the new task context.
7. Returns a <HostReference crate="task" kind="struct" symbol="JoinHandle" /> for the created task.

## Known limitations

Currently, the `executables` crate doesn't have any known limitations except those inherited from the underlying modules it depends on.

## Future improvements

No specific future improvements are planned for the `executables` crate at this time. However, general enhancements to the underlying modules may indirectly benefit this crate.

## References

- <HostReference crate="executables" />

## See also

- [Virtual file system](../modules/virtual_file_system.md)
- [Task](../modules/task.md)
- [Users](../modules/users.md)
- [Log](../modules/log.md)
