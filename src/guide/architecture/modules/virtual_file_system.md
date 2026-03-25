---
layout: doc
---

# 🗃️ Virtual file system

Xila provides a file system API that allows to manage files, directories, and devices in a unified way, following the Unix philosophy "everything is a file".

The Virtual File System (VFS) is a central service that routes path-based operations to mounted file systems and devices while enforcing ownership and permission policies.

## Features

The virtual file system module offers the following features:

- **Unified API**: Manage files, directories, and devices through a consistent interface.
- **Multiple file types**: Support for regular files, directories, block devices, character devices, and pipes.
- **Extensible design**: Ability to mount multiple file systems with custom implementations.
- **Unix-like semantics**: Familiar file operations and permissions model.
- **Thread-safe operations**: Concurrent access to the file system with proper synchronization.
- **Blocking/non-blocking behavior**: Supports both polling and blocking operation helpers depending on file flags.

## Dependencies

The virtual file system module depends on the following modules:

- [Time](./time.md): Used for file timestamps.
- [Users](./users.md): Used for file ownership and permissions.
- [Task](./task.md): Used to get the current task context for file operations.

It also relies on the following crates:

- [alloc](https://doc.rust-lang.org/alloc/): Used for dynamic memory allocation.

## Current implementation notes

- The default hierarchy is created via `create_default_hierarchy`.
- Standard mount points include `/binaries`, `/configuration`, `/data`, `/devices`, `/logs`, `/system`, `/temporary`, and `/devices/network`.
- Device cleanup helpers are provided to reset mounted character/block devices during setup.

## Architecture

The virtual file system acts as an abstraction layer between applications and concrete file system implementations, allowing multiple file systems to be mounted at different paths.

### File types

Xila supports the following file types:

- **File**: A file is a sequence of bytes that can be read and written in an underlying file system.
- **Directory**: A directory is a file that contains a list of files and directories inside it in an underlying file system.
- **Block device**: A block device is a file that allows reading and writing of data in blocks in an underlying file system.
- **Character device**: A character device is a file that allows reading and writing of data one character at a time in an underlying file system.
- **Pipe**: A pipe is a file that allows inter-process communication.

### File system implementation

Xila virtual file system is designed to be extensible and mount multiple file systems.
A file system can be implemented through the <HostReference crate="file_system" kind="trait" symbol="FileSystemOperations" />.

Currently, Xila provides the following file systems:

- [`Little FS`](../crates/little_fs.md): A lightweight file system designed for embedded systems.

Once a file system is implemented, it can be mounted to a specific path.

Device endpoints are also mounted into the same namespace, enabling modules to expose services through file-like APIs.

### Operation flow

Here is the working principle of the virtual file system:

```mermaid
sequenceDiagram
  participant App as Executable/Module
    participant VFS as Virtual File System
  participant Node as Resolved node (FS or device)
  participant FS as Mounted file system backend
  participant Dev as Mounted device endpoint

  App->>VFS: open/read/write/control(path, flags)
  VFS->>VFS: resolve path + permissions + task context
  VFS->>Node: dispatch operation
  alt Node is file-system item
    Node->>FS: backend operation
    FS-->>Node: data/status
  else Node is mounted device
    Node->>Dev: device operation
    Dev-->>Node: data/status
  end
  Node-->>VFS: data/status
    VFS-->>App: Return file handle/data
```

### File system structure

- `/`: Root directory
  - `/binaries`: Executable files
  - `/configuration`: Configuration files (user space)
    - `/shared`: Shared configuration files (e.g. )
  - `/data`: Application data files (user space)
    - `/shared`: Shared data files (e.g. logs)
  - `/devices`: Mounted devices
  - `/logs`: System and application logs
  - `/system`: System files (kernel space)
    - `/groups`: Group definitions
    - `/users`: User definitions
  - `/temporary`: Temporary files (cleared on reboot)

## Known limitations

The virtual file system module has the following known limitations:

- **Limited file system support**: Currently only Little FS is implemented.
- **No symbolic links**: Symbolic links are not yet supported.
- **No file locking**: File locking mechanisms are not implemented.
- **No symbolic link resolution layer**: Path aliasing remains explicit through mounts.

## Future improvements

Planned future improvements for the virtual file system module include:

- **Additional file systems**: Support for FAT32, ext4, and other common file systems.
- **Symbolic links**: Add support for soft and hard links.
- **File locking**: Implement advisory and mandatory file locking.
- **Extended attributes**: Support for extended file attributes and metadata.
- **File watching**: Notification system for file system changes.

## References

- <HostReference crate="virtual_file_system" />

## See also

- [Little FS official documentation](https://github.com/littlefs-project/littlefs)
- [POSIX file system standards](https://pubs.opengroup.org/onlinepubs/9699919799/)
- [Network module](./network.md)
