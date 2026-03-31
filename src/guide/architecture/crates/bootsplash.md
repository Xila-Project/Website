---
layout: doc
---

# ✨ Bootsplash

The `bootsplash` crate provides a focused startup animation layer around the graphics manager and LVGL objects.

## Role

- Owns creation and teardown of the boot logo animation sequence.
- Encapsulates the startup-only animation policy so initialization code does not manipulate LVGL animation internals directly.

## Boundaries

- In scope: logo object setup, animation callback wiring, animation lifetime management.
- Out of scope: window/session management, general UI composition, or reusable animation framework APIs.

## Internal structure

- `lib.rs`: `Bootsplash` state (`lv_anim_t` + `Logo`) and lifecycle methods.
- `error.rs`: crate-local error type mapped from graphics failures.
- One `unsafe extern "C"` callback (`load_animation_callback`) updates part opacity across logo children.

## Runtime interaction

1. `Bootsplash::new` acquires `graphics::Manager` lock.
2. It uses current screen geometry to compute `Logo::get_factor(...)` and instantiate logo.
3. It initializes `lv_anim_t` (`duration`, reverse timing, repeat count) and registers callback.
4. `Bootsplash::stop` deletes the animation via `lv_anim_delete` under manager lock.

## Dependency model

- Internal runtime dependency: [🖼️ Graphics](../modules/graphics.md) only.
- Uses LVGL symbols re-exported through graphics (`lv_anim_*`, `lv_obj_*`).

## Failure semantics

- Setup failures propagate as crate `Error` during `new`.
- `stop` can fail through graphics lock/manager-level error propagation.

## Extension points

- Animation timing/profile can be changed centrally in `Bootsplash::new`.
- Alternate startup visuals can reuse the same lifecycle contract (`new`/`stop`) while changing object composition.

## Contract vs implementation

- **Contract**: construct bootsplash with `Bootsplash::new(...)`, stop it with `Bootsplash::stop(...)`.
- **Current implementation**: LVGL opacity animation over 4 logo parts using theme primary color and ease-in-out path.

## Limitations and trade-offs

- Uses `std::os::raw::c_void` and LVGL callback ABI, so the implementation is intentionally low-level.
- Animation is tightly tied to current logo part layout and not exposed as a generic animation graph.

## References

- <CodeReference path="modules/bootsplash" />
- [🖼️ Graphics](../modules/graphics.md)
