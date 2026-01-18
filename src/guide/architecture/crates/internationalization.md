---
layout: doc
---

# 🌐 Internationalization

Xila's Internationalization (i18n) module enables support for multiple languages and locales at build time, ensuring a minimal runtime footprint. This module allows developers to create applications that are easily translatable into various languages, making them accessible to a global audience.

## Key Features

- **Support for Multiple Languages**: Seamlessly integrate multiple languages into your application.
- **No Runtime Overhead**: All translations are processed at build time, ensuring optimal runtime performance.
- **Simple Integration**: Utilize standard gettext `.po` files alongside procedural macros for straightforward translation integration.
- **Locale Management**: Effortlessly manage and switch between locales by modifying environment variables.
- **Character Range Support**: Define the character range required for each language, enabling proper text input and font embedding for specific languages in the [Graphics Module](../modules/graphics.md).

## Dependencies

The Internationalization module has no external dependencies, apart from standard procedural macro libraries such as `syn` and `quote`.

## Architecture Overview

The Internationalization module operates as follows:

1. **Translation Files**: Developers create translation files in the gettext `.pot`/`.po` format for each supported language.
2. **Build-Time Processing**: During the build process, the <HostReference crate="internationalization" kind="macro" symbol="translate" /> procedural macro parses and loads the appropriate translation files based on the specified locale. Translated strings are then embedded directly into the code before compilation.
   - The locale is defined using the `INTERNATIONALIZATION_LOCALE` and `INTERNATIONALIZATION_FALLBACK_LOCALE` environment variables.
   - If a translation is missing for a specific string in the selected locale, the macro falls back to the fallback locale (default: `en`).
   - To avoid multiple reload of the same translation files, the macro caches loaded translations during the build process by using a static hash map (but this cache is sometimes reset multiple times during a single build due to how procedural macros are invoked).
3. **Character Range Provision**: The module provides the character range required for each language to enable proper text input fields. This feature is particularly useful for embedding the necessary characters into fonts to support specific languages in the [Graphics Module](../modules/graphics.md).

## Known Limitations

- **Static Translations**: Translations are currently handled at build time, which means dynamic language switching at runtime is not supported.
- **No Pluralization Support**: The module does not yet support pluralization rules for different languages.

## Future Enhancements

- **Dynamic Language Switching**: Add support for loading multiple languages at runtime and switching between them as needed. This feature would be optional, allowing developers to choose between the current build-time approach or a runtime solution (with a trade-off of increased binary size and slight runtime overhead).
- **Pluralization Support**: Introduce support for pluralization rules to accommodate the grammatical structures of various languages.

## References

- <HostReference crate="internationalization" />

## Related Modules

- [Graphics Module](../modules/graphics.md)
