---
layout: doc
docType: explanation
description: Reusable no_std SHA-256 and strict Ed25519 verification primitives, limits, ownership and security boundaries.
---

# Verification

The `verification` library adds reusable, allocation-free `no_std` cryptographic primitives (Core #518). It is **not** a package manager, signature-policy engine, trust store, file-format parser, or a runtime enforcement mechanism. The experimental firmware update simulator (Core #532) now reuses these primitives, but there is still no production package-manager or hardware boot verification integration.

## API and feature selection

The default `sha256` Cargo feature provides two streaming interfaces:

- `Sha256Verifier` computes a complete SHA-256 digest incrementally.
- `ContentVerifier::new(expected_length, expected_digest)` checks the exact logical length and the complete 32-byte expected digest of a streamed payload.

`update` takes caller-provided byte slices; the library does not allocate a full-file buffer. Stream length and update failures permanently poison the verifier, even when a caller ignores an error. Finalizing before the declared length is consumed fails. The logical SHA-256 input length is bounded to `2^61 - 1` bytes.

The optional `ed25519` feature exposes validated `PublicKey` instances, accepting 32-byte public keys and 64-byte signatures. Verification uses Dalek's **strict Ed25519** check on the exact supplied message bytes, rejecting invalid and weak key encodings. This is not Ed25519ph, a signing API, or a way to authenticate keys found inside untrusted packages. A zero-feature build exports only typed errors/results.

```rust
use verification::ContentVerifier;

// Authenticate the expected length/digest independently before accepting content.
let mut verifier = ContentVerifier::new(expected_len, expected_sha256)?;
for chunk in chunks {
    verifier.update(chunk)?;
}
verifier.verify()?;
```

The values `expected_len`, `expected_sha256` and `chunks` are inputs supplied by the caller; this illustrates the interface, not a working package installation.

## Integration and trust boundaries

SHA-256 detects differences relative to a **trusted** expected digest; by itself it does not provide authenticity. Ed25519 verification establishes the signature over supplied bytes only when the public key is already trusted. Package identity, version, rollback defense, target/ABI compatibility and permission grants must be defined by a separately authenticated manifest and policy.

Core tracks those follow-up responsibilities in #402 (canonical manifest and signed bytes), #491 (trusted staging/activation) and #495 (loader enforcement/TOCTOU). **None is delivered by this library.** The existing VFS hash device is unchanged and still uses an allocating, dynamically dispatched context; direct `verification` calls deliberately avoid that context.

## Current native firmware prototype

The [Firmware update](/explanation/architecture/libraries/firmware_update) reference now uses this crate for streaming SHA-256 and strict Ed25519 verification of synthetic native NOR images. This does not turn the library into a trust manager: the simulator owns its separate manifest, test key assumptions, verified staging proofs and recovery decisions, while real hardware must integrate with its own bootloader and provisioned trust.

## Memory evidence and validation

On native x86_64, live state has been measured at 120 bytes for the incremental SHA-256 verifier, 160 bytes for a content verifier and 192 bytes for a validated public key. Focused tests report no heap allocations in the verification paths, but these sizes exclude caller buffers, peak stack and dependencies.

Cortex-M4, browser WASM and native **no-allocator link probes** passed, and four feature combinations were tested. These were compile/link checks, **not actual MCU or browser execution**. No safe MCU task-stack, total-RAM budget, flash estimate or on-device latency has been established.

Focused validation from Core's root:

```sh
bash libraries/verification/check.sh
bash tools/verification_probe/check.sh thumbv7em-none-eabi
COMPACT_SHA2=1 bash tools/verification_probe/check.sh thumbv7em-none-eabi
```

CI runs these through `mise -E ci run ci:verification`. Keep package verification integration and hardware safety gates separate from this primitive library.

## Sources and related documentation

- <HostReference crate="verification" /> — Rust API documentation.
- <CodeReference path="libraries/verification/src/lib.rs" /> — exports and feature boundaries.
- <CodeReference path="libraries/verification/src/hash.rs" /> — streaming hashing and exact-length content checks.
- <CodeReference path="libraries/verification/src/signature.rs" /> — strict Ed25519 verification.
- <CodeReference path="libraries/verification/README.md" /> — tests, measurements and integration caveats.
- <CodeReference path="tools/verification_probe/README.md" /> — no-allocator final-link probes.
- [File-system contract](/explanation/architecture/libraries/file_system) — separate storage capabilities.
