import { defineConfig, DefaultTheme } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";
import { pagefindPlugin } from "vitepress-plugin-pagefind";

const referenceSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: "🌟 Reference",
    items: [
      { text: "Host", link: "/host-reference" },
      { text: "WASM", link: "/wasm-reference" },
    ],
  },
];

const guideSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: "🚀 Get started",
    link: "/guide/get_started/",
    collapsed: false,
    items: [
      { text: "Use (host)", link: "/guide/get_started/use_host" },
      { text: "Use (WASM)", link: "/guide/get_started/use_wasm" },
      { text: "Contribute", link: "/guide/get_started/contribute" },
    ],
  },
  {
    text: "📐 Architecture",
    link: "/guide/architecture/",
    collapsed: false,
    items: [
      {
        text: "Modules",
        link: "/guide/architecture/modules/",
        collapsed: true,
        items: [
          { text: "ABI", link: "/guide/architecture/modules/abi" },
          { text: "Bindings", link: "/guide/architecture/modules/bindings" },
          { text: "Graphics", link: "/guide/architecture/modules/graphics" },
          { text: "Network", link: "/guide/architecture/modules/network" },
          { text: "Task", link: "/guide/architecture/modules/task" },
          { text: "Time", link: "/guide/architecture/modules/time" },
          { text: "Users", link: "/guide/architecture/modules/users" },
          {
            text: "Virtual File System",
            link: "/guide/architecture/modules/virtual_file_system",
          },
          {
            text: "Virtual Machine",
            link: "/guide/architecture/modules/virtual_machine",
          },
        ],
      },
      {
        text: "Crates",
        link: "/guide/architecture/crates/",
        collapsed: true,
        items: [
          {
            text: "Authentication",
            link: "/guide/architecture/crates/authentication",
          },
          { text: "Bootsplash", link: "/guide/architecture/crates/bootsplash" },
          { text: "Device", link: "/guide/architecture/crates/device" },
          {
            text: "Executables",
            link: "/guide/architecture/crates/executables",
          },
          {
            text: "File System",
            link: "/guide/architecture/crates/file_system",
          },
          {
            text: "Internationalization",
            link: "/guide/architecture/crates/internationalization",
          },
          { text: "Testing", link: "/guide/architecture/crates/testing" },
        ],
      },
      { text: "Drivers", link: "/guide/architecture/drivers" },
      {
        text: "Executables",
        link: "/guide/architecture/executables/",
        collapsed: true,
        items: [
          {
            text: "Calculator",
            link: "/guide/architecture/executables/calculator",
          },
          {
            text: "Command Line Shell",
            link: "/guide/architecture/executables/command_line_shell",
          },
          {
            text: "File Manager",
            link: "/guide/architecture/executables/file_manager",
          },
          {
            text: "Graphical Shell",
            link: "/guide/architecture/executables/graphical_shell",
          },
          {
            text: "Settings",
            link: "/guide/architecture/executables/settings",
          },
          {
            text: "Terminal",
            link: "/guide/architecture/executables/terminal",
          },
          { text: "WASM", link: "/guide/architecture/executables/wasm" },
        ],
      },
    ],
  },
  {
    text: "📖 About",
    link: "/guide/about/",
  },
];

// https://vitepress.dev/reference/site-config
const configuration = defineConfig({
  title: "Xila",
  description: "An open-source operating system for embedded world",
  srcDir: "./src",
  sitemap: {
    hostname: "https://www.xila.dev",
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
    nav: [
      { text: "Guide", link: "/guide/" },
      {
        text: "Reference",
        link: "/reference/",
        // either match /reference or /host-reference or /wasm-reference
        activeMatch: "^/(reference/|host-reference|wasm-reference)$",
      },
      {
        text: "Demonstration",
        link: "https://documentation.xila.dev/demonstrations/wasm/en/",
      },
    ],
    sidebar: {
      "/reference": referenceSidebar,
      "/guide": guideSidebar,
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/Xila-Project" },
      { icon: "matrix", link: "https://matrix.to/#/#xila:anneraud.fr" },
    ],
    search: {
      provider: "local",
    },
    footer: {
      message: `<a href='https://alix.anneraud.fr'>Alix ANNERAUD</a> - <a href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html">Under GPLv2 License</a> - ${new Date().getFullYear()} - Built with <a href="https://vitepress.dev/" target="_blank">VitePress</a>`,
    },
    editLink: {
      pattern: "https://github.com/Xila-Project/Website/edit/main/src/:path",
    },
  },
});

export default withMermaid(configuration);
