---
layout: doc
docType: explanation
description: Understand Xila's installed runtime services, their ownership and lifecycle.
---

# Subsystems

A subsystem owns or coordinates a runtime capability installed by a final Xila binary. It manages state/lifecycle or the unavoidable process-global integration of an active runtime service. It is not simply a crate with mutable types.

## Foundation services

- [Task](/explanation/architecture/subsystems/task): task identity and execution registry.
- [Users](/explanation/architecture/subsystems/users): user and group management.
- [Time](/explanation/architecture/subsystems/time): runtime time source and startup clock.
- [Memory](/explanation/architecture/subsystems/memory): installed allocator integration and allocation capabilities.
- [Log](/explanation/architecture/subsystems/log): installed logging service and global logger boundary.

## Coordinating services

- [Virtual file system](/explanation/architecture/subsystems/virtual_file_system): mounted namespace, permissions and dispatch.
- [Network](/explanation/architecture/subsystems/network): interface stacks, runners and socket services.
- [Graphics](/explanation/architecture/subsystems/graphics): LVGL, windows, displays, input and events.

## Boundaries

Subsystems use contracts from [libraries](/explanation/architecture/libraries/) and concrete [drivers](/explanation/architecture/drivers/). The final binary constructs them in a valid dependency order and passes managers to [executables](/explanation/architecture/executables/). The allocator, logger and LVGL remain partially process-global by design.

C ABI contracts are [libraries](/explanation/architecture/libraries/abi). Wasmi and guest bindings belong to the [WASM executable](/explanation/architecture/executables/wasm) rather than representing new independent subsystems.
