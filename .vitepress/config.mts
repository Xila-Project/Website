import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";
import { pagefindPlugin } from "vitepress-plugin-pagefind";
import fs from "node:fs";
import { nav, sidebar } from "./navigation";

// https://vitepress.dev/reference/site-config
const configuration = defineConfig({
  title: "Xila",
  description: "An open-source operating system for embedded world",
  srcDir: "./src",
  sitemap: {
    hostname: "https://www.xila.dev",
  },
  vue: {
    script: {
      fs: {
        fileExists(file: string) {
          return fs.existsSync(file);
        },
        readFile(file: string) {
          return fs.readFileSync(file, "utf-8");
        },
        realpath(file: string) {
          return fs.realpathSync(file);
        },
      },
    },
  },
  vite: {
    plugins: [pagefindPlugin()],
  },
  lastUpdated: true,
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/images/logo_dark.svg",
        type: "image/svg+xml",
      },
    ],
    [
      "script",
      {
        defer: "",
        src: "https://s.anneraud.fr/script.js",
        "data-website-id": "6fc0fbb0-ef68-4fd0-bf13-6a48ef2b68e6",
      },
    ],
  ],
  themeConfig: {
    logo: {
      light: "/images/logo_light.svg",
      dark: "/images/logo_dark.svg",
    },
    nav,
    sidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/Xila-Project" },
      { icon: "matrix", link: "https://matrix.to/#/#xila:anneraud.fr" },
    ],
    search: {
      provider: "local",
    },
    footer: {
      message: `<a href='https://alix.anneraud.fr'>Alix ANNERAUD</a> - <a href="https://www.apache.org/licenses/LICENSE-2.0">Under Apache 2.0 License</a> - ${new Date().getFullYear()} - Built with <a href="https://vitepress.dev/" target="_blank">VitePress</a>`,
    },
    editLink: {
      pattern: "https://github.com/Xila-Project/Website/edit/main/src/:path",
    },
  },
});

export default withMermaid(configuration);
