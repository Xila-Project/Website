---
layout: doc
docType: how-to
description: Deliberately remove a browser example's saved Xila disk and verify a fresh boot.
---

# Reset the browser disk

Remove a saved browser-example disk when you want to restart from the default account and bundled applications.

## Before you begin

::: warning Saved data will be erased
Resetting deletes the browser example's files, configuration, and credentials on that origin. Copy anything you need before proceeding. Clearing all site data can also remove other storage belonging to the same site.
:::

Identify the exact origin hosting the example and close all its Xila tabs. The disk is origin-specific and a running tab holds a Web Lock.

## Remove the saved image

Use your browser's site-data settings to clear storage for that origin. For a disk-only reset, use a separate page on the same origin and enter this in the browser developer console after closing Xila tabs:

```javascript
const root = await navigator.storage.getDirectory();
await root.removeEntry("xila_drive.img");
```

If the file is not found, confirm the origin and whether a disk was created there. Do not edit or delete an image while Xila is running.

## Verify completion

Open the Xila example again. A fresh disk should boot with **administrator** and an empty password, and Calculator should be installed from the bundled guest. Your previous saved files should no longer be present.

An invalid existing image or a mount error does not trigger an automatic reset; normal boot preserves the saved image and stops with an error.

## Related documentation

- [Browser storage](/explanation/browser-storage) for cache, autosave, and durability behavior.
- [Browser capabilities](/reference/wasm-runtime#browser-capabilities).
