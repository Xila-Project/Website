---
layout: doc
docType: explanation
description: Understand how Xila's WebAssembly Text Editor edits large UTF-8 files with bounded memory.
---

# Text Editor (executable)

Text Editor is a bundled `wasm32-wasip1` application. It creates and edits UTF-8 files through the Xila VFS without retaining the whole document in guest memory.

## Editing model

The application displays one **4 KiB, UTF-8-safe page** at a time. Enter an absolute file path, choose **New** or **Open**, then navigate using **Previous** and **Next**. **Save** writes the edited document to the selected path.

Instead of reading the whole file into RAM, the editor works on a temporary on-disk copy and uses fixed-size I/O buffers. A file can be larger than a page without requiring memory proportional to its size.

## Storage and failure boundaries

- The parent directory must be writable, with approximately enough free space to hold a second copy of the file.
- Invalid UTF-8 and NUL bytes are rejected; this is a text editor, not a binary editor.
- Saving streams the working copy to the target file.
- A failed save retains the temporary working copy so the user can retry.
- Normal closure cleans up the temporary copy through WASI file unlink support.

The editor is included in the prebuilt guest bundle for **new** native and browser disk images. Existing persistent disks do not automatically receive new guest binaries.

## References

- <CodeReference path="executables/text_editor/README.md" />
- <CodeReference path="executables/text_editor" />
- [WASM runtime](/reference/wasm-runtime)
- [Browser storage](/explanation/browser-storage)
