---
layout: doc
docType: how-to
description: Run an existing WASI module in Xila's headless OCI runtime with explicit read-only host access.
---

# Run a WASI guest in a container

Use the Xila runtime image to execute a compiled `wasm32-wasip1` application with a persistent Xila disk and access only to directories you explicitly mount. This procedure targets **Linux/amd64** with Docker and does not run graphical guests.

## Before you begin

- Install a working Docker Engine and have permission to run containers.
- Have a compatible `app.wasm` WASI guest file available on the host.
- Use an image successfully published from [Core's container workflow](https://github.com/Xila-Project/Core/actions/workflows/container.yml). The `latest` tag follows `main`, so pin a SHA or release tag for reproducibility.

## Prepare the host directories

From a host terminal, in a new working directory:

```sh
mkdir -p xila-state fixtures
cp /path/to/app.wasm fixtures/app.wasm
sudo chown 10001:10001 xila-state
```

The state directory must be writable by container UID 10001. The fixture directory is exposed read-only.

## Run the guest

Still in that directory, run:

```sh
docker run --rm --read-only \
  --tmpfs /tmp:rw,noexec,nosuid,size=16m \
  --mount "type=bind,src=$PWD/xila-state,dst=/var/lib/xila" \
  --mount "type=bind,src=$PWD/fixtures,dst=/mnt/xila/fixtures,readonly" \
  ghcr.io/xila-project/xila-runtime:latest run --network=none \
  --mount host=/mnt/xila/fixtures,xila=/fixtures,ro \
  -- /binaries/wasm /fixtures/app.wasm
```

The first run imports the image's read-only seed into `xila-state/drive.img`. Later runs reuse that disk and its data. The host guest module remains visible to Xila at `/fixtures/app.wasm`.

The container's filesystem mount is not enough on its own: `--mount host=...,xila=...,ro` grants the second, explicit VFS capability. Omit a writable mount unless the guest genuinely needs it.

## Check the result

Check the guest's standard output/error and process exit status. A zero status indicates a successful guest exit; nonzero guest statuses propagate out of the runtime. Confirm that the `xila-state` directory contains the disk image after execution.

The example does not demonstrate network access, a GUI or arbitrary compatibility with third-party WASI modules. For the full command contract and persistence limits, see the [headless runtime reference](/reference/container-runtime).
