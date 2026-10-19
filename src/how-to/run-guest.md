---
layout: doc
docType: how-to
description: Launch or install a WASI guest through the mounted Xila WASM executable.
---

# Run a guest from Xila's terminal

Launch a guest already present in Xila's virtual filesystem, or invoke its installer to register application resources.

## Before you begin

- Start an Xila runtime with `/binaries/wasm` mounted, such as the native or browser example.
- Place a compatible guest in the VFS as a regular file. The browser example includes `/binaries/calculator`; it has no general guest upload mechanism.
- Check the guest's required imports against the [runtime](/reference/wasm-runtime) and [graphics](/reference/graphics-bindings) references.

## Launch the application

Open Xila's graphical terminal and enter an absolute VFS path:

```text
/binaries/wasm /binaries/calculator
```

For another guest, replace `/binaries/calculator` with its path in Xila's VFS. This command runs in **Xila's terminal**, not your host shell.

Normal execution calls `_start: () -> ()`. The loader reads the supplied path directly; use an absolute VFS path rather than relying on `Current_directory` resolution inside the WASM loader.

## Run an installer

For a guest providing `__install: () -> ()`:

```text
/binaries/wasm --install /binaries/calculator
```

The browser example runs Calculator's installer during boot, so its application-drawer shortcut is normally already present. A missing or incorrectly typed installer export fails without launching the application's main entrypoint.

## Verify completion

Check the guest's expected output or interface and the terminal for reported errors. For Calculator, evaluate `1 + 2 = 3` and close its window; the desktop should remain usable. For an installer, check the resource it is documented to create, such as Calculator's shortcut.

## Troubleshooting

- Missing file: verify the path is in Xila's VFS, not just on the host computer.
- Entry/import errors: rebuild the guest with the required target and compatible supported imports.
- Unsupported graphics call: check the supported call subset before assuming enabling `graphics` provides the entire LVGL API.

## Related documentation

- [Build a guest application](./build-guest).
- [Wasmi execution model](/explanation/architecture/executables/virtual_machine).
