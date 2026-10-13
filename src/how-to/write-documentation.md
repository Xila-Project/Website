---
layout: doc
docType: how-to
description: Choose a documentation type, write a focused Xila page, and validate its links and build.
---

# Write or update documentation

Add a page or revise an existing one so readers can learn, complete a task, look up a fact, or understand a design.

## Before you begin

Work in the `website` repository with its Node.js/npm environment. Read [AGENTS.md](https://github.com/xila-project/website/blob/main/AGENTS.md) and check relevant Core source at a known revision for technical claims.

## Choose the page's purpose

| Reader's need                                    | Type        | Directory          |
| ------------------------------------------------ | ----------- | ------------------ |
| Learn through a guided example                   | Tutorial    | `src/tutorials/`   |
| Complete an independent task                     | How-to      | `src/how-to/`      |
| Look up exact options, defaults, errors, or APIs | Reference   | `src/reference/`   |
| Understand a concept, relationship, or trade-off | Explanation | `src/explanation/` |

The structure follows [Diátaxis](https://diataxis.fr/). Local writing templates are informed by [The Good Docs Project](https://github.com/thegooddocsproject/templates).

## Write the page

1. Copy the appropriate file from [docs/templates](https://github.com/xila-project/website/tree/main/docs/templates) into the selected source directory.
2. Replace the title, description, and all writing prompts. Keep the correct `docType` value and remove unused sections.
3. State who the page helps and what they will achieve. Put environment/artifact prerequisites before procedural steps.
4. Specify each command's directory and whether it runs in the host shell, Devbox shell, browser console, or Xila terminal.
5. Add observable results to tutorials and completion checks to task guides. Keep exact lookup tables in reference pages and design reasoning in explanations.
6. Link to related page types instead of duplicating their procedures or reference tables.

Keep the published content in English and preserve technical identifiers exactly. Do not claim commands, hardware support, or runtime behavior were verified unless they actually were.

## Connect the page

Update its section landing page and `.vitepress/navigation.ts`. Link to it from relevant existing pages and the [component map](/explanation/architecture/components) when appropriate.

When moving a page, update incoming links and anchors. The site is pre-production; the current workflow moves pages directly without legacy redirects.

For API/source links, use the existing `HostReference`, `GuestReference`, and `CodeReference` components after checking their crate or path. Keep templates outside `src/` so writing prompts never appear in the public site or search.

## Validate the change

From the website repository root:

```bash
npm ci
npm run format:fix
npm run check
```

`check` verifies formatting, builds the site and search index, and validates documentation links and anchors. Review `format:fix`'s diff; for a focused change, run Prettier on only the changed files instead.

Preview the production build with `npm run docs:preview`, check the navigation and reader journey, then run `git diff --check`.

## Verify completion

The page should be discoverable from its section, satisfy one primary reader need, and have no unresolved writing prompts or broken internal links. Review the diff for technical facts lost during splitting, and state which checks actually ran.
