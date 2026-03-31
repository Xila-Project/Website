---
layout: doc
---

# 📂 File manager (executable)

The file manager executable provides a graphical VFS browser with directory navigation controls.

## Role

- Presents VFS directory contents in a graphical list view.
- Handles path navigation (home/up/go/refresh) and directory item traversal.
- Registers launcher shortcut metadata for shell discovery.

## Startup and lifecycle

1. Installation path writes `/configuration/shared/shortcuts/file_manager.json`.
2. Runtime path creates window, toolbar, path text area, and file list widgets.
3. Loads current directory entries, sorts directories-first, and renders list buttons.
4. Processes click/close events in loop until window close.

## Runtime integration points

- Graphics/LVGL for window/list/event handling.
- `virtual_file_system::Directory` for directory iteration.
- Task manager for current task identifier during VFS operations.

## Data and control flow / VFS touchpoints

- Core VFS touchpoint: `Directory::open(..., current_path)` + iterative `read()`.
- Navigation updates `current_path`, then refreshes UI from VFS.
- File entries are transformed into in-memory `FileItem` records before rendering.

## Concurrency and event-loop model

- Single event-processing loop with periodic sleep (`50 ms`) in top-level executable.
- Event handlers run async and mutate local state; no multi-task background workers are created.

## Failure semantics

- UI object creation failures return typed `Error` and abort startup.
- VFS open/read failures propagate through executable error mapping.
- Invalid path text input logs error and retains current path.

## Contract vs implementation

- **Contract**: graphical executable that reflects directory state and reacts to navigation events.
- **Current implementation**: LVGL list-based browser with direct directory-only navigation and no file-open dispatch path.

## Operational limitations

- Operations are currently browse-oriented; edit/copy/move/delete workflows are not implemented in top-level flow.
- Path input accepts raw text and relies on `PathOwned` validation.

## References

- <CodeReference path="executables/file_manager" />
- [🗃️ Virtual file system](../modules/virtual_file_system.md)
