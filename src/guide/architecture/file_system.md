---
layout: doc
---

# 🗃️ File system

Xila provides a file system API that allows to manage files and directories on the storage device.
In a similar way to Linux, Xila uses a virtual file system that abstracts every peripheral/device as a file.

## File systems

Each file system is mounted in the virtual file system and can be accessed through the virtual file system API. A file system can be implemented though the `File_system::File_system_trait` trait.

## File types

Xila supports the following file types:

- **File**: A file is a sequence of bytes that can be read and written.
- **Directory**: A directory is a file that contains a list of files and directories.
- **Device**: A device is a file that represents a peripheral or a device.
- **Pipe**: A pipe is a file that allows inter-process communication.

## Identifiers

When opening a file, a `Unique_file_identifier_type` is returned. This identifier is made of a `File_system_identifier_type` and a `File_identifier_type`. The `File_system_identifier_type` is used to identify the file system that the file belongs to, while the `File_identifier_type` is used to identify the file within the file system.
