<h1 align="center">Xila - Website</h1>

Welcome to the repository for the [Xila Website](https://www.xila.dev)!

This project contains all the sources and documentation for the Xila operating system, including guides, architecture references, and developer resources.

## Features

- Built with [VitePress](https://vitepress.dev/) for fast, modern documentation
- Reader-focused documentation organized with [Diátaxis](https://diataxis.fr/)
- Local authoring templates informed by [The Good Docs Project](https://github.com/thegooddocsproject/templates)
- Integrated with [Mermaid](https://mermaid-js.github.io/) for diagrams
- Full-text search powered by [Pagefind](https://pagefind.app/)
- Prettier formatting for consistent style

## Project Structure

```
src/
  docs/            # Documentation entry point
  tutorials/       # Guided learning experiences
  how-to/          # Task-focused procedures
  reference/       # Commands, capabilities, limits, and generated API viewers
  explanation/     # Concepts, architecture, component map, and design choices
  about/           # Project information
  public/          # Static assets (images, robots.txt, etc.)
docs/templates/    # Authoring templates, excluded from the published site
.vitepress/        # Site configuration, navigation, and reference components
scripts/           # Documentation validation
AGENTS.md          # Documentation conventions and maintenance instructions
```

## Getting Started

1. **Install dependencies:**

   ```sh
   npm ci
   ```

2. **Start local development server:**

   ```sh
   npm run docs:dev
   ```

3. **Build the static site:**

   ```sh
   npm run docs:build
   ```

4. **Preview the built site:**
   ```sh
   npm run docs:preview
   ```

## Available Commands

| Command         | Description                                         |
| --------------- | --------------------------------------------------- |
| `docs:dev`      | Start VitePress in development mode                 |
| `docs:build`    | Build the static site with VitePress                |
| `docs:preview`  | Preview the built site locally                      |
| `format:fix`    | Format all files using Prettier                     |
| `format:check`  | Check formatting with Prettier                      |
| `docs:validate` | Check documentation links and anchors after a build |
| `check`         | Check formatting, build, and validate documentation |

Run any command with:

```sh
npm run <command>
```

## Contributing

Read [AGENTS.md](AGENTS.md) for documentation conventions and [docs/templates/README.md](docs/templates/README.md) to choose a writing template. The [documentation contribution guide](src/how-to/write-documentation.md) covers the workflow for this repository; [Core contributions](src/how-to/contribute-core.md) have their own tooling and checks.

Keep each substantive page focused on one reader need. Split mixed onboarding pages into guided tutorials, independent task guides, exact reference, and conceptual explanation, then connect them with links. Use `.vitepress/navigation.ts` and the landing pages to make content discoverable. The site is pre-production: moved pages use their new URLs directly, without redirects.

## License

This project is under the [GNU General Public License v2.0](LICENSE).
