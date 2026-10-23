---
layout: doc
docType: explanation
description: Understand Xila's build-time locale selection and external embedded-i18n integration.
---

# Internationalization

Xila uses the external `embedded-i18n` dependency for build-time localization. Core re-exports it as `xila::internationalization`; there is no separate `internationalization` crate under the new `libraries/` tree.

## Build-time language selection

Core's `.cargo/config.toml` selects locale and fallback using `EMBEDDED_I18N_LOCALE` and `EMBEDDED_I18N_FALLBACK`. English is the fallback. Executables use `embedded_i18n::translate!` for ordinary and C-string literals and keep translations in their `locales/` directories.

Core now includes catalogs for **English (`en`), French (`fr`), Spanish (`es`), German (`de`), Brazilian Portuguese (`pt-BR`), Italian (`it`) and Polish (`pl`)**. New languages are built as separate, locale-matched host/guest/seed-image artifacts, rather than exposing a runtime language selector. Terminology, LVGL layouts, and native-speaker reviews remain particularly important for the newer languages. Simplified Chinese is still in progress, not a shipped locale.

The selected translations are embedded in the build. This avoids carrying a dynamic catalog lookup in each runtime call; language choice belongs to the build configuration rather than a live session-language service. Quantity-dependent text uses CLDR plural variants where needed (for example, stopwatch laps, DNS record counts and ping byte counts); Polish requires `one`, `few`, `many` and `other`.

## Graphics assets and translation tooling

The Graphics crate's `build.rs` uses the selected locale and fallback's character ranges from `embedded-i18n` to generate the required glyphs and compile a separate `font_assets` static archive in Cargo `OUT_DIR`. The former standalone `fonts_generator` executable is no longer part of the build. Locale choice therefore also affects generated graphics assets and their size.

Tolgee extraction and synchronization are configured in `tolgee.config.ts` and `tolgee.extractor.mjs`. Use [Core's localization guide](https://github.com/Xila-Project/Core/blob/main/docs/localization.md) for exact locale build steps, matching seeded applications and language-specific validation. The [development command reference](/reference/development-commands#core-tasks) lists the translation tasks; their implementation remains in Core's Makefile.

## Compile-time integration contract

Xila does not currently maintain a separate `internationalization` crate in `libraries/`. Instead, its entrypoint re-exports the external `embedded-i18n` crate and the project provides locale catalogs and build tooling. This page describes that **cross-cutting build integration**, not a runtime manager.

Use the build-time locale and fallback consistently across host binaries, WebAssembly guests, generated fonts and reference seed images. Locale strings are compiled into the binaries, so changing the preferred language **requires rebuilding compatible artifacts**; there is no persistent per-user runtime language selector.

`embedded_i18n::track_locales!()` declares the translation integration for crates with catalogs, while `translate!` selects the appropriate compiled key. Pluralized strings need the CLDR categories supported by each locale: missing `few` or `many` variants are especially noticeable in Polish.

## End-to-end update workflow

1. Add or edit a string in the executable/library source using the existing localization macros.
2. Add translations under that crate's `locales/<locale>.json`, preserving the intended namespace and plural categories.
3. Run the Core translation extractor/validation configured by `tolgee.config.ts` and `tolgee.extractor.mjs`; review diffs rather than deleting apparently unused keys during a namespace migration.
4. Build **host, guests and seeded disk content for the same locale**. Cargo regenerates and compiles the locale-dependent graphics font archive as needed; install the Core workspace's Node dependencies with `npm ci` before building graphics.
5. Check text truncation, symbol availability and UI layout in Graphics.

The Graphics font inputs live in `subsystems/graphics/fonts/` and generation is handled by `subsystems/graphics/build.rs`, rather than by a separate executable. These build artifacts are not a runtime localization subsystem.

## Limitations and references

English fallback prevents missing-key failures but does not guarantee appropriate terminology or glyph coverage. Language completeness needs review on the actual display and guest programs.

- <CodeReference path="src/lib.rs" /> — public re-export.
- <CodeReference path=".cargo/config.toml" /> — locale defaults.
- <CodeReference path="subsystems/graphics/build.rs" /> — glyph generation.
- <CodeReference path="docs/localization.md" /> — build and translation instructions.
- [Graphics](/explanation/architecture/subsystems/graphics) — runtime text rendering.

## Related documentation

- <HostReference crate="embedded_i18n" />
- <CodeReference path="src/lib.rs" /> and <CodeReference path=".cargo/config.toml" />.
- <CodeReference path="subsystems/graphics/build.rs" />.
- <CodeReference path="tolgee.config.ts" /> and <CodeReference path="tolgee.extractor.mjs" />.
- [Graphics](/explanation/architecture/subsystems/graphics).
