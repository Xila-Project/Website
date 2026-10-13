---
layout: doc
docType: explanation
description: Understand Xila's build-time locale selection and external embedded-i18n integration.
---

# 🌐 Internationalization

Xila uses the external `embedded-i18n` dependency for build-time localization. Core re-exports it as `xila::internationalization`; the former `modules/internationalization` crate is no longer in the workspace.

## Build-time language selection

Core's `.cargo/config.toml` selects locale and fallback using `EMBEDDED_I18N_LOCALE` and `EMBEDDED_I18N_FALLBACK`. The current configuration chooses English for both. Executables use `embedded_i18n::translate!` for ordinary and C-string literals and keep translations in their `locales/` directories.

The selected translations are embedded in the build. This avoids carrying a dynamic catalog lookup in each runtime call; language choice belongs to the build configuration rather than a live session-language service.

## Graphics assets and translation tooling

The font generator uses the selected locale and fallback's character ranges from `embedded-i18n` to generate the required glyphs. Locale choice therefore also affects generated graphics assets and their size.

Tolgee extraction and synchronization are configured in `tolgee.config.ts` and `tolgee.extractor.mjs`. The [development command reference](/reference/development-commands#core-tasks) lists the translation tasks; their implementation remains in Core's Makefile.

## Related documentation

- <HostReference crate="embedded_i18n" />
- <CodeReference path="src/lib.rs" /> and <CodeReference path=".cargo/config.toml" />.
- <CodeReference path="modules/graphics/fonts_generator/src/main.rs" />.
- <CodeReference path="tolgee.config.ts" /> and <CodeReference path="tolgee.extractor.mjs" />.
- [Graphics](/explanation/architecture/modules/graphics).
