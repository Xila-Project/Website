---
layout: doc
docType: explanation
description: Find the Xila component that owns a concept and understand how modules, crates, drivers, and executables relate.
---

# Component map

Xila's repository contains modules, crates, drivers, and executables because those pieces answer different architectural questions. Use this page to find the layer that owns the concept you are trying to understand.

If the categories are new to you, read the [architecture overview](/explanation/architecture/) first. The categories below describe a component's primary role; they are not hard isolation boundaries.

## Runtime services: modules

Start with [Modules](/explanation/architecture/modules/) when your question is about behavior that exists while Xila is running: task identity, users, time, files and devices, networking, graphics, or the guest/host execution boundary.

A module usually owns runtime state or coordinates other capabilities. For example, the VFS owns the path namespace and policy layer, while the network module owns interface stacks and socket services.

## Shared contracts and helpers: crates

Start with [Crates](/explanation/architecture/crates/) when your question is about the types and contracts that let other parts of Xila agree on behavior.

The `file_system` crate, for example, defines file and device operation contracts; the VFS consumes those contracts, and concrete storage/device implementations satisfy them. Other crates provide authentication, synchronization, executable runtime support, target information, and reusable helpers.

## Target adaptation: drivers

Start with [Drivers](/explanation/architecture/drivers/) when your question is _how does this Xila abstraction reach the target platform?_

Drivers are where portable services meet a concrete environment such as Espressif hardware, a native host, `std`, or the browser/WASM host. They translate platform mechanisms into the contracts Core expects.

## Programs: executables

Start with [Executables](/explanation/architecture/executables/) when your question is about a program that runs on top of the assembled runtime.

This includes host-side executables such as shells and runtime components as well as bundled WebAssembly applications such as Calculator, Clock, and Pixel Painter.

## Follow a relationship across components

Some concepts only make sense when you follow them through several layers.

### A file request

An executable asks the [Virtual file system](/explanation/architecture/modules/virtual_file_system) to resolve a path. The VFS applies namespace and access policy, then delegates storage operations through contracts from the [file-system crate](/explanation/architecture/crates/file_system) to a mounted backend such as [LittleFS](/explanation/architecture/crates/little_fs) or to a device endpoint.

### A WebAssembly guest call

A guest executes through the [virtual machine model](/explanation/architecture/modules/virtual_machine). Host bindings translate guest-visible calls and memory through the [bindings boundary](/explanation/architecture/modules/bindings), then reach the same Xila services used by native executables. This keeps guest execution isolated from the concrete host implementation without inventing a second set of system semantics.

### A browser disk

The [browser storage model](/explanation/browser-storage) explains the persistent disk as a relationship between an in-memory image and OPFS. The [WASM driver](/explanation/architecture/drivers/wasm) provides the browser-facing adaptation while the file-system/VFS layers above it continue to reason about normal Xila storage contracts.

## When you need a different kind of documentation

Once you have found the component, use its page to understand the design and follow its inline Rustdoc/source links for implementation detail. If your next question is _how do I perform a task?_, switch to the [how-to guides](/how-to/). If it is _what is the exact API, command, limit, or behavior?_, use [Reference](/reference/).
