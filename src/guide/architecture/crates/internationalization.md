---
layout: doc
---

# 🌐 Internationalization

The `internationalization` crate provides locale selection helpers and the `translate!` compile-time translation macro pipeline.

## Role

- Exposes runtime-facing locale constants/helpers (`get_locale`, `get_fallback_locale`).
- Re-exports procedural macro implementation (`internationalization_macros::translate`).
- Provides language character range/time-format helpers used by UI-related modules.

## Boundaries

- In scope: compile-time string resolution and locale metadata helpers.
- Out of scope: dynamic runtime translation catalogs or runtime locale switching state machine.

## Internal structure

- `modules/internationalization/src/lib.rs`: locale/fallback helpers and macro re-export.
- `modules/internationalization/src/range.rs`: locale character-range metadata.
- `modules/internationalization/macros/src/lib.rs`: proc-macro translation loader/cacher.

## Build-time behavior

- At compile/macro expansion time, `translate!` reads `locales/<locale>.json` and fallback locale JSON relative to `CARGO_MANIFEST_DIR`.
- Localization maps are loaded and cached by the proc-macro implementation during expansion.

## Runtime interaction

- At runtime, translated strings are already embedded as literals.
- Consumers can query selected locale/fallback via env-backed helpers.

## Dependency model

- Crate dependencies: `internationalization_macros`, [📦 Shared](./shared.md).
- Workspace/tooling dependency: Tolgee workflow is configured in <CodeReference path="Core/tolgee.config.ts" />.

## Failure semantics

- Missing translation key causes proc-macro panic during build (`Translation for '...' not found ...`).
- Invalid locale JSON produces parse/read diagnostics during macro expansion.

## Extension points

- Add new locales by adding `locales/<tag>.json` per crate.
- Extend metadata helpers (range/time) without changing `translate!` call sites.

## Contract vs implementation

- **Contract**: `translate!("key")` and `translate!(c"key")` return localized compile-time literals with fallback behavior.
- **Current implementation**: JSON maps are loaded once into static `Lazy<HashMap<...>>`, locale selection from `INTERNATIONALIZATION_LOCALE` and `INTERNATIONALIZATION_FALLBACK` env vars.

## Limitations and trade-offs

- Build-time embedding keeps runtime lean but prevents live language switching.
- Missing keys fail builds early, improving correctness at the cost of stricter localization discipline.

## References

- <HostReference crate="internationalization" />
- <CodeReference path="Core/modules/internationalization" />
- <CodeReference path="Core/tolgee.config.ts" />
