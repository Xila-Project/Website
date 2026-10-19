---
layout: doc
docType: explanation
description: Shared launch and shortcut metadata for Xila applications.
---

# Application metadata

The `application_metadata` library centralizes native and guest application names, seed-install markers and shortcut JSON construction. Host examples, installers and filesystem image generation can share these definitions without duplicating their application inventory.

It is a reusable data/formatting library with no independent runtime manager. See <CodeReference path="libraries/application_metadata/src/lib.rs" /> and <HostReference crate="application_metadata" />.
