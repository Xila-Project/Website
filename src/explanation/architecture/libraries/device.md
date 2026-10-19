---
layout: doc
docType: explanation
description: "The device crate defines typed control-command and backend-independent inference contracts."
---

# Device

The `device` crate defines reusable device contracts. Alongside control commands for character devices, it now has a backend-independent, synchronous **neural-network inference interface**.

## Role

- Provides shared command identifiers/payload types that callers and drivers both understand.
- Defines model sources (serialized buffers, typed AOT models, external locations), tensor types/quantization, backend capabilities, and borrowed input/output data.
- Keeps command ABI definitions centralized instead of duplicating command numbers in each consumer.

## Boundaries

- In scope: command typing, payload enums, `define_command!` declarations and a synchronous inference contract with explicit model/context lifetimes and caller-provided workspace.
- Out of scope: any actual device behavior, state, or runtime mounting logic.

## Internal structure

- `lib.rs`: exports command families.
- `hash.rs`: hash-specific types and commands.
  - `HashAlgorithm` enum.
  - `RESET` and `SET_ALGORITHM` command definitions.
- `neural_network.rs`: tensor metadata, quantization, model source types, memory requirements, capabilities and the inference lifecycle.

## Runtime interaction

- Callers issue `File::control(...)` on mounted device nodes (for example `/devices/hasher`).
- Drivers decode the same command identifiers to execute implementation-specific behavior.

## Dependency model

- Depends on [File system](/explanation/architecture/libraries/file_system) for `ControlCommand` abstractions and macro support.
- Consumed by higher-level crates such as [Authentication](/explanation/architecture/libraries/authentication) and driver implementations.

## Failure semantics

- This crate does not execute I/O; operational failures occur in driver or VFS layers.
- Type/identifier mismatches are surfaced when commands are cast/handled at runtime boundaries.

## Extension points

- Add new command families as separate modules (mirroring `hash.rs`).
- Preserve existing command IDs to keep backward-compatible control ABI.

## Contract vs implementation

- **Contract**: stable typed command IDs + payload schemas.
- **Current implementation**: hash-device command definitions and a generic, synchronous inference interface with a mock-backed lifecycle test. A concrete inference backend, device discovery, asynchronous execution and accelerator support are **not yet supplied** by this merged contract. The separate TFLite Micro implementation remains a PR under review.

## Limitations and trade-offs

- Narrow scope means low coupling, but functionality depends on external driver support.
- Command evolution requires ABI discipline once IDs are consumed by executables/modules.

## References

- <HostReference crate="device" />
- <CodeReference path="modules/device" />
- [Drivers](/explanation/architecture/drivers)
- <CodeReference path="modules/device/src/neural_network.rs" />
