---
layout: doc
---

# 🛠️ Drivers

Core provides a set of abstraction layers that define how the specific platform interfaces with the underlying hardware. This is achieved through drivers.
Drivers are implemented in separate crates, linked to the final binary, and registered with the [virtual file system](./modules/virtual_file_system.md) or other modules (when direct access is required) to be used by the rest of the operating system.

Most drivers categorize into two main types:

- Character devices: for devices accessed as a stream of bytes (e.g., serial ports, keyboards, mice).
- Block devices: for devices that require reading or writing data in fixed-size blocks (e.g., storage devices like SD cards, flash memory).

## Known limitations

Because character and block devices are broad abstractions, implementing specific functionalities for complex hardware can become complicated. For example, the `control` method faces similar challenges to the Linux `ioctl` system call, where type safety and interface clarity can be compromised. This is a design trade-off to maintain a unified interface.

Additionally, abstract driver interfaces may sometimes incur overhead. To mitigate performance issues or avoid excessive memory usage, specific optimizations are employed. For instance, the graphics driver uses the `control` method to manage display updates rather than writing directly to a framebuffer, avoiding costly memory copy operations.

## References

- <HostReference crate="driver" />: Contains the main driver interface declarations.

## See also

- [Architecture overview](../index.md)
