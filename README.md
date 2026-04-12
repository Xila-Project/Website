<h1 align="center">Xila - Website</h1>

Welcome to the repository for the [Xila Website](https://www.xila.dev)!

This project contains all the sources and documentation for the Xila operating system, including guides, architecture references, and developer resources.

## 🚀 Features

- Built with [VitePress](https://vitepress.dev/) for fast, modern documentation
- Modular documentation structure (guides, architecture, modules, drivers, etc.)
- Integrated with [Mermaid](https://mermaid-js.github.io/) for diagrams
- Full-text search powered by [Pagefind](https://pagefind.app/)
- Prettier formatting for consistent style

## 📦 Project Structure

```
src/
  guide/           # Main guides and tutorials
  architecture/    # System architecture and modules
  public/          # Static assets (images, robots.txt, etc.)
  reference/       # API and technical references
  ...
```

## 🛠️ Getting Started

1. **Install dependencies:**

   ```sh
   npm install
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

## 📝 Available Commands

| Command        | Description                              |
| -------------- | ---------------------------------------- |
| `docs:dev`     | Start VitePress in development mode      |
| `docs:build`   | Build the static site with VitePress     |
| `docs:preview` | Preview the built site locally           |
| `format:fix`   | Format all files using Prettier          |
| `format:check` | Check formatting with Prettier           |
| `check`        | Run format check and build documentation |

Run any command with:

```sh
npm run <command>
```

## 🤝 Contributing

Contributions are welcome! Please see the guides in `src/guide/get_started/contribute.md` for details on how to get started.

## 📄 License

This project is under the [GNU General Public License v2.0](LICENSE.md).
