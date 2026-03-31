---
layout: doc
---

# 🧮 Calculator (executable)

The calculator executable provides a scientific-expression evaluation UI primarily for WASM targets.

## Role

- Owns calculator expression language pipeline (lexer/parser/evaluator) and button-matrix UI bindings.
- Serves as a target-specific application (interactive on wasm32, informational fallback on non-wasm targets).

## Startup and lifecycle

- `wasm32` target: creates interface window and enters event loop (`Interface::run`).
- non-`wasm32` target: prints localized informational message and exits.

## Runtime integration points

- WASM graphics/UI API (`wasm` crate guest graphics functions) for window, labels, button matrix, and events.
- Internationalization for UI labels/messages.
- Internal parser/evaluator modules for expression execution.

## Data and control flow / VFS touchpoints

- Primary flow: button event -> expression text mutation -> parse -> evaluate -> display update.
- Constants/functions are translated to parser-friendly textual forms before evaluation.
- No direct VFS touchpoint in executable runtime path.

## Concurrency and event-loop model

- Single synchronous UI event loop in `Interface::run`.
- No separate worker tasks; computations run inline on event handling.

## Failure semantics

- Expression parse/evaluation failures are rendered as localized `Error: ...` display output.
- UI creation failures abort startup (`Interface::new().unwrap()` in wasm main path).

## Contract vs implementation

- **Contract**: calculator executable computes expressions from UI/user input and renders result text.
- **Current implementation**: wasm-focused LVGL-like button matrix, direct string-based expression assembly, and inline parser/evaluator execution.

## Operational limitations

- Intended runtime is wasm32; native targets only print fallback message.
- Event loop currently runs forever on wasm path and relies on host environment behavior.

## References

- <CodeReference path="executables/calculator" />
- [🌍 WASM](./wasm.md)
