---
layout: doc
docType: explanation
description: Understand Xila's build-time locale selection and external embedded-i18n integration.
---

# Internationalization

Xila uses the external `embedded-i18n` dependency for build-time localization. Core re-exports it as `xila::internationalization`; the former `modules/internationalization` crate is no longer in the workspace.

## Build-time language selection

Core's `.cargo/config.toml` selects locale and fallback using `EMBEDDED_I18N_LOCALE` and `EMBEDDED_I18N_FALLBACK`. English is the fallback. Executables use `embedded_i18n::translate!` for ordinary and C-string literals and keep translations in their `locales/` directories.

Core now includes catalogs for **English (`en`), French (`fr`), Spanish (`es`), German (`de`), Brazilian Portuguese (`pt-BR`), Italian (`it`) and Polish (`pl`)**. New languages are built as separate, locale-matched host/guest/seed-image artifacts, rather than exposing a runtime language selector. Terminology, LVGL layouts, and native-speaker reviews remain particularly important for the newer languages. Simplified Chinese is still in progress, not a shipped locale.

The selected translations are embedded in the build. This avoids carrying a dynamic catalog lookup in each runtime call; language choice belongs to the build configuration rather than a live session-language service. Quantity-dependent text uses CLDR plural variants where needed (for example, stopwatch laps, DNS record counts and ping byte counts); Polish requires `one`, `few`, `many` and `other`.

## Graphics assets and translation tooling

The font generator uses the selected locale and fallback's character ranges from `embedded-i18n` to generate the required glyphs. Locale choice therefore also affects generated graphics assets and their size.

Tolgee extraction and synchronization are configured in `tolgee.config.ts` and `tolgee.extractor.mjs`. Use [Core's localization guide](https://github.com/Xila-Project/Core/blob/main/docs/localization.md) for exact locale build steps, matching seeded applications and language-specific validation. The [development command reference](/reference/development-commands#core-tasks) lists the translation tasks; their implementation remains in Core's Makefile.

## Related documentation

- <HostReference crate="embedded_i18n" />
- <CodeReference path="src/lib.rs" /> and <CodeReference path=".cargo/config.toml" />.
- <CodeReference path="subsystems/graphics/fonts_generator/src/main.rs" />.
- <CodeReference path="tolgee.config.ts" /> and <CodeReference path="tolgee.extractor.mjs" />.
- [Graphics](/explanation/architecture/subsystems/graphics).
