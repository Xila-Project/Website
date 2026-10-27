---
layout: doc
docType: how-to
description: Select mise-based formatting, host/guest, graphics, and browser checks for Core.
---

# Validate a Core change

Run checks that cover the behavior and targets you changed. All commands below start from the **Core repository root** after [development setup](./setup-development).

## Formatting and target checks

```sh
mise run format:rust -- --check
mise run format:toml -- --check
npm exec prettier -- --check "**/*.json"
mise run check:host
mise run check:guest
mise run clippy:all
mise run docs:all
```

`check:all` combines host and guest checks. `test:workspace` runs workspace tests:

```sh
mise run check:all
mise run test:workspace
```

These targets include Linux host and `wasm32-unknown-unknown` guest-library checks. They do not substitute for running `wasm32-wasip1` applications or checking embedded hardware.

## Graphics, fonts and WASM runtime

For graphics/C ABI changes, use the focused host and memory64 Wasmi tests appropriate to the changed subsystem and the tests documented in <CodeReference repo="applications" path="executables/wasm/README.md" />. For font assets, run:

```sh
mise run test:fonts
```

This checks generation, caching, selected-symbol linkage, and recovery from invalid build artifacts. No-allocator or size tests on native targets are not MCU measurements.

## Localization

Translation IDs are stable dotted semantic keys, not English source strings. When altering strings or catalogs, run:

```sh
mise run localization:lint
node --test tolgee.extractor.test.mjs
EMBEDDED_I18N_LOCALE=fr EMBEDDED_I18N_STRICT=1 mise run localization:check
```

Repeat strict checks for affected locales, including `zh-CN` when changing Chinese catalogs or font subsetting. Review the key mapping files in <CodeReference path="tools/localization/mappings" />. A destructive Tolgee synchronization is not part of routine validation.

## Browser behavior

Build matching WASI guests and a browser filesystem image, then build the demonstration:

```sh
mise run image:wasm
MISE_ENV=ci mise run pages:demo
```

Serve `examples/wasm/dist` locally and exercise graphics, input and application close. For storage changes, verify save/reload and existing-disk preservation. Browser OPFS tests require compatible `wasm-bindgen-test-runner` and ChromeDriver, as described in <CodeReference repo="platforms" path="examples/wasm/README.md" />.

## Completion

Record which tools, target architectures and tests actually passed. On hardware-impacting changes, run target firmware checks and inspect flash, peak stack and RAM on the intended board; a green Linux/browser CI does not prove that.

## Related documentation

- [Development commands](/reference/development-commands).
- <CodeReference path=".github/workflows/ci.yml" /> and <CodeReference path=".github/workflows/extended.yml" />.
- [Browser tutorial](/tutorials/browser).
