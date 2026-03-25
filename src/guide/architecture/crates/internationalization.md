---
layout: doc
---

# 🌐 Internationalization

Xila's Internationalization (i18n) module enables support for multiple languages and locales at build time, ensuring a minimal runtime footprint. This module allows developers to create applications that are easily translatable into various languages, making them accessible to a global audience.

## Key Features

- **Support for Multiple Languages**: Seamlessly integrate multiple languages into your application.
- **No Runtime Overhead**: All translations are processed at build time, ensuring optimal runtime performance.
- **JSON locale files**: Translations are stored in `locales/*.json` files across modules and executables.
- **Tolgee integration**: Synchronization is managed with Tolgee (`compare`, `sync`, `pull`, `push`) using the repository configuration.
- **Locale Management**: Effortlessly manage and switch between locales by modifying environment variables.
- **Character Range Support**: Define the character range required for each language, enabling proper text input and font embedding for specific languages in the [Graphics Module](../modules/graphics.md).

## Dependencies

The crate itself stays lightweight; translation extraction/synchronization relies on Tolgee tooling configured in <CodeReference path="tolgee.config.ts" />.

## Architecture Overview

The Internationalization module operates as follows:

1. **Translation Files**: Translations are stored as JSON files in `./**/locales/*.json` (for example `modules/*/locales/en.json`, `executables/*/locales/fr.json`).
2. **Tolgee Configuration**: <CodeReference path="tolgee.config.ts" /> defines a typed `TolgeeConfig` object that controls:
   - source patterns for extraction,
   - dynamic discovery of locale files,
   - push mapping (`path`, `language`, `namespace`),
   - pull destination template (`{namespace}/locales/{languageTag}.json`),
   - data format (`JSON_C`).
3. **Build-Time Processing**: During the build process, the <HostReference crate="internationalization" kind="macro" symbol="translate" /> procedural macro resolves and embeds translated strings directly into compiled code.
   - The locale is defined using the `INTERNATIONALIZATION_LOCALE` and `INTERNATIONALIZATION_FALLBACK_LOCALE` environment variables.
   - If a translation is missing for a specific string in the selected locale, the macro falls back to the fallback locale (default: `en`).
   - To avoid multiple reloads, translations are cached during macro expansion.
4. **Character Range Provision**: The module provides the character range required for each language to enable proper text input fields. This feature is particularly useful for embedding the necessary characters into fonts to support specific languages in the [Graphics Module](../modules/graphics.md).

## Tolgee workflow

From Core, common translation tasks are exposed through `cargo make`:

- `cargo make translate-compare`
- `cargo make translate-sync`
- `cargo make translate-pull`
- `cargo make translate-push`

## Known Limitations

- **Static Translations**: Translations are currently handled at build time, which means dynamic language switching at runtime is not supported.
- **No Pluralization Support**: The module does not yet support pluralization rules for different languages.

## Future Enhancements

- **Dynamic Language Switching**: Add support for loading multiple languages at runtime and switching between them as needed. This feature would be optional, allowing developers to choose between the current build-time approach or a runtime solution (with a trade-off of increased binary size and slight runtime overhead).
- **Pluralization Support**: Introduce support for pluralization rules to accommodate the grammatical structures of various languages.

## References

- <HostReference crate="internationalization" />
- <CodeReference path="tolgee.config.ts" />

## Related Modules

- [Graphics Module](../modules/graphics.md)
