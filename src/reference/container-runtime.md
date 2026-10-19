---
layout: doc
docType: reference
description: Exact command contract and isolation boundaries of Xila's headless WASM container runtime.
---

# Headless container runtime

The `xila-runtime` binary executes a VFS executable without a graphical desktop or interactive shell. It is built into a Linux/amd64 OCI image and can also be run as a native binary.

## Image and executable

The Core workflow builds and tests the image from `Dockerfile.runtime`, then publishes it to `ghcr.io/xila-project/xila-runtime` on successful eligible pushes. The default-branch tag is `latest`; release-tag pushes use matching `v*` tags, and published builds carry a commit-SHA tag.

The image uses UID/GID **10001**, keeps state in `/var/lib/xila`, and ships an immutable reference image at `/usr/share/xila/base.img`. It starts `/usr/bin/xila-runtime` and defaults to a headless, network-disabled command. Its initial platform is **linux/amd64**, not arbitrary embedded hardware.

## Command syntax

```text
xila-runtime run [--disk PATH] [--seed PATH] [--network=none] [--mount host=PATH,xila=PATH,ro|rw[,uid=N,gid=N,file_mode=OCTAL,directory_mode=OCTAL]] [--env KEY=VALUE]... -- <Xila executable> [arguments...]
```

| Option | Meaning |
| --- | --- |
| `--disk PATH` | Mutable LittleFS disk image; defaults to `/var/lib/xila/drive.img` in the container |
| `--seed PATH` | Image used **only to initialize an absent disk**; the container default is `/usr/share/xila/base.img` |
| `--network=none` | The sole accepted network mode; no network stack is exposed |
| `--mount host=...,xila=...,ro\|rw` | Explicit host directory capability with read-only/read-write mode |
| `--env KEY=VALUE` | Pass one explicit guest environment setting (repeatable) |
| `--` | End runtime options and begin an **absolute** Xila VFS executable path and its arguments |
| `--help`, `--version` | Display help or version |

To launch a WASI guest, use `/binaries/wasm` as the executable and a guest path visible inside the Xila VFS. The runner forwards guest arguments and exit statuses.

## Isolation and durability

Host directories are **not** ambiently accessible: they must first be mounted into the container and then explicitly exposed through `--mount` to the Xila VFS. The guest inherits no host environment variables unless they are provided explicitly. Read-only host mounts and path traversal defenses enforce the intended filesystem boundary.

The live LittleFS disk is mutable and persists when `/var/lib/xila` is kept on a writable volume. An existing disk is not overwritten by a newer seed. Shutdown on SIGINT/SIGTERM attempts to unmount/flush before exiting; abrupt termination can still lose recent writes.

This is a headless, synchronous guest execution path. It does not provide GUI, host sockets, hardware acceleration, general container sandbox guarantees beyond Docker's own isolation, or embedded-board support.

## See also

- [Run a WASI guest in a container](/how-to/run-container-guest)
- [WASM runtime](/reference/wasm-runtime)
- <CodeReference path="examples/native/src/bin/xila-runtime.rs" />
- <CodeReference path="Dockerfile.runtime" />
- <CodeReference path=".github/workflows/container.yml" />
