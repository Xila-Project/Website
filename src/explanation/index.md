---
layout: doc
description: Understand Xila's architecture, execution model, development targets, and storage choices.
---

# Explanation

Explore the relationships and design choices behind Xila's services and runtime.

- [Architecture overview](./architecture/) explains how Core, drivers, and applications are assembled.
- [Development environments and targets](./development-environments) explains toolchain ownership and what each validation target establishes.
- [Browser storage](./browser-storage) explains OPFS, the memory cache, autosave, and durability trade-offs.
- [Wasmi execution model](./architecture/modules/virtual_machine) explains guest execution and cooperative scheduling.
- [Graphics bindings](./architecture/modules/bindings) explains memory, object handles, and ownership at the guest/host boundary.

Use the [component map](/components/) for a specific module, crate, driver, or executable. For actions and exact interfaces, use [how-to guides](/how-to/) and [reference](/reference/).
