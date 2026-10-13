---
layout: doc
docType: how-to
description: Prepare a focused Core change, validate affected targets, and update its documentation.
---

# Contribute a Core change

Prepare an implementation change with a clear expected behavior, appropriate checks, and matching documentation.

## Before you begin

Set up the [development environment](./setup-development) and read <CodeReference path="AGENTS.md" /> in Core. Identify the owning crate using the [component map](/components/).

## Prepare the change

1. Reproduce the problem or define the behavior you want to implement.
2. Modify the crate that owns that behavior. Preserve its `no_std` support, optional features, `default-features = false`, and target-specific dependency boundaries.
3. Account for RAM, flash, stack, peak allocation, and retained buffer lifetimes. Prefer bounded or caller-provided storage where appropriate.
4. Pass manager references and contexts explicitly, following the native/browser examples.
5. Update generators rather than generated sources. Keep generated assets and build output out of commits unless the change requires them.
6. Update tutorials, task guides, reference facts, or explanations when the behavior they describe changes.

## Validate the change

Follow [Validate a Core change](./validate-core), selecting the targets and tests your changes affect. CI's path selection is a useful guide; a skipped job is not evidence that its target passed.

For the combined format/check/doc/Clippy gate, run from Core's root in its development shell:

```bash
cargo make before-commit
```

## Verify completion

Review the diff for unintended feature/dependency changes, generated artifacts, and stale examples. Report the checks actually run and any target/toolchain limitations alongside the expected behavior.

## Related documentation

- [Development command reference](/reference/development-commands).
- [Development environments and targets](/explanation/development-environments).
- [Write or update documentation](./write-documentation) for this website's workflow.
