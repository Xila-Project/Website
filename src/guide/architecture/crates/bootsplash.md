---
layout: doc
---

# ✨ Bootsplash

The `bootsplash` crate provides the startup splash animation shown while the system initializes.

It is built on top of the graphics module and drives a lightweight animated logo sequence.

## Features

- Animated startup logo rendering.
- Integration with the active graphics screen and theme colors.
- Explicit lifecycle with start/stop behavior.

## Initialization flow

1. Acquire the graphics manager lock.
2. Build logo elements on the current screen.
3. Configure LVGL animation callbacks and timing.
4. Start animation loop until explicitly stopped.

## API snapshot

- `Bootsplash::new(graphics_manager)`: Creates and starts the animation.
- `Bootsplash::stop(graphics_manager)`: Stops and cleans animation resources.

## Dependencies

- [🖼️ Graphics](../modules/graphics.md)

## Known limitations

- Behavior is tightly coupled to LVGL animation primitives and current theme integration.
- Intended for startup/splash flows rather than general-purpose animation composition.

## References

- <CodeReference path="modules/bootsplash" />

## See also

- [🖼️ Graphics](../modules/graphics.md)
