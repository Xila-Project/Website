import { defineConfig, DefaultTheme } from "vitepress";

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
      { text: "Drivers", link: "/guide/architecture/drivers" },
      { text: "Graphics", link: "/guide/architecture/graphics" },
      { text: "File system", link: "/guide/architecture/file_system" },
      { text: "Task", link: "/guide/architecture/task" },
    ],
  },
  {
    text: "📖 About",
    link: "/guide/about/",
  },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Xila",
  description: "An open-source operating system for embedded world",
  srcDir: "./src",
  sitemap: {
    hostname: "https://xila.dev",
  },
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
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide" },
      { text: "Reference", link: "/reference" },
      {
        text: "Demonstration",
        link: "https://documentation.xila.dev/demonstrations/wasm/en/",
      },
    ],
    sidebar: {
      "/reference": referenceSidebar,
      "/guide": guideSidebar,
    },
    socialLinks: [{ icon: "github", link: "https://github.com/Xila-Project" }],
    search: {
      provider: "local",
    },
    footer: {
      message: `<a href='https://alix.anneraud.fr'>Alix ANNERAUD</a> - <a href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html">Under GPLv2 License</a> - ${new Date().getFullYear()} - Built with <a href="https://vitepress.dev/" target="_blank">VitePress</a>`,
    },
  },
});
