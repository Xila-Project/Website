---
layout: doc
docType: explanation
description: "The device crate defines typed device-control commands and a backend-independent neural-network inference contract."
---

# Device

The `device` crate contains shared contracts between Xila consumers and device implementations.

## Device-control commands

The `hash` module defines hash-device commands such as `RESET` and `SET_ALGORITHM`. Consumers issue typed commands through mounted VFS device files, while drivers implement their behavior.

## Neural-network inference contract

The `neural_network` module defines a backend-independent, **synchronous** inference interface. It supports model sources supplied as serialized buffers, typed ahead-of-time models, or external locations. The contract describes tensor shapes and element types, per-tensor/per-axis quantization, backend capabilities, and caller-provided aligned workspaces.

Model handles, inference contexts and borrowed tensor views encode important ownership and lifetime relationships. The implementation includes a mock backend exercising model loading, context creation, input binding, computation and output retrieval.

The contract does **not** provide inference kernels, production backends, model discovery or asynchronous inference. Formats such as TFLite and ONNX are represented in the interface but are not proof of a working adapter.

## References

- <HostReference crate="device" />
- <CodeReference path="libraries/device/src/hash.rs" />
- <CodeReference path="libraries/device/src/neural_network.rs" />
- [Drivers](/explanation/architecture/drivers)
