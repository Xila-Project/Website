# Documentation repository

This repository publishes the English-language Xila documentation with VitePress. Core's Rust code lives in the separate `xila-project/core` repository. Keep website tooling and Core runtime commands clearly distinguished.

## Information architecture

Use [Diátaxis](https://diataxis.fr/) to classify a page by the reader's need:

| Type        | Reader's need                           | Location           | Content                                                                            |
| ----------- | --------------------------------------- | ------------------ | ---------------------------------------------------------------------------------- |
| Tutorial    | Learn through a guided first experience | `src/tutorials/`   | One reproducible path, prerequisites, actions, observable results, and next steps. |
| How-to      | Complete a specific task                | `src/how-to/`      | Task-focused steps, requirements, verification, and relevant recovery actions.     |
| Reference   | Look up an exact fact                   | `src/reference/`   | Commands, options, defaults, features, errors, constraints, and API links.         |
| Explanation | Understand a concept or design          | `src/explanation/` | Context, relationships, rationale, trade-offs, and boundaries.                     |

`src/docs/` is the documentation entry point. The component map at `src/explanation/architecture/components.md` belongs to Explanation → Architecture and links to related task guides and reference. Keep component discovery within the four documentation types rather than adding a separate top-level category. `src/about/` contains project information.

- Give each substantive page one primary purpose and a `docType` frontmatter value: `tutorial`, `how-to`, `reference`, or `explanation`. Section/index and project-information pages may omit it.
- Split mixed pages when reader needs differ. Link to the related type instead of copying a procedure or maintaining competing tables of defaults.
- Put learning walkthroughs in tutorials, task instructions in how-to guides, exhaustive facts in reference, and design reasoning in explanations.
- Treat an architecture lifecycle diagram as explanation; a command sequence the reader must execute belongs in a tutorial or how-to guide.

## Authoring conventions

Use the locally authored templates in `docs/templates/`, informed by [The Good Docs Project](https://github.com/thegooddocsproject/templates). Read `docs/templates/README.md` when creating a page. Adapt the outline to the reader's task; remove unused sections and all placeholders. Do not publish templates under `src/`.

- Start with the page's goal and intended reader. Use concrete, descriptive titles; use action verbs for task pages.
- State prerequisites before procedures: operating system, target, toolchain, device/browser capabilities, credentials, and existing artifacts when relevant.
- State the working directory and shell context before commands. Distinguish host terminal commands from commands in Xila's terminal.
- Include an observable result for key tutorial steps and a completion check for how-to guides. Do not invent command output or claim a check was run when it was only inferred from source.
- Keep tutorial paths focused. Link to optional workflows instead of inserting branching setup alternatives.
- Document meaningful warnings at the action that needs them, especially operations that erase storage. Avoid speculative warnings.
- Use English consistently with the existing documentation. Preserve code identifiers, path casing, feature names, and error spellings exactly.
- Prefer plain language, active voice, short paragraphs, and consistent terminology. Use tables for lookup/comparison and diagrams when they clarify relationships.
- Choose headings for the subject instead of filling every page with identical boilerplate. Include troubleshooting only when it provides an actionable recovery.
- Add a useful `description` in frontmatter for new substantive pages. Use `layout: doc` unless the page needs a different layout, such as an API iframe.

## Technical accuracy and maintenance

- Verify APIs, feature names, defaults, paths, and build commands against Core's source, manifests, examples, and CI. Existing documentation and adjacent README files are supporting material, not sufficient proof by themselves.
- Inspect Core read-only unless a Core change is part of the user's task. Use a local checkout when available; otherwise read the repository's source at a known revision.
- Keep WASI guest (`wasm32-wasip1`) and browser (`wasm32-unknown-unknown`) targets distinct. Rust host checks, browser behavior, and embedded hardware validation establish different things.
- Explain resource costs and capability limits when they affect readers: RAM/flash/stack, retained buffers, persistence durability, browser restrictions, and supported graphics/WASI subsets.
- Keep generated API documentation on `documentation.xila.dev`; link through `HostReference`, `GuestReference`, or `CodeReference`. Verify referenced crates and source paths exist before adding links.
- When refactoring, preserve technical facts and documented workflows by moving them or linking to their new home. Keep one authoritative page for each reference table.
- Update the appropriate landing page, `.vitepress/navigation.ts`, related links, and homepage links when adding or moving pages.
- The documentation is currently pre-production. Move pages directly and update internal links and navigation; do not add redirects unless the user requests URL compatibility.
- Do not add dependencies for changes that existing VitePress/Vue/Node facilities can support. Keep build assets, caches, scratch files, and generated binaries out of commits.

## Validation and delivery

Install with `npm ci` when dependencies are missing. Use `npm run docs:dev` while editing and `npm run docs:preview` to inspect the production build.

Before completing a documentation change:

1. Format the changed files with Prettier.
2. Run `npm run check` (formatting, production build, and documentation links).
3. Run `git diff --check` and review the diff for lost facts, unresolved placeholders, and accidental changes.
4. Check navigation and any changed user journey. For moved pages, verify incoming links and relevant anchors; for API iframe links, preserve their query parameters.

Run Core/runtime/browser/hardware checks only when appropriate to the change; report precisely what was actually verified and any unavailable prerequisites. Keep commits focused by subject, following the repository's `docs:` convention.
