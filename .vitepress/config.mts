import { defineConfig, DefaultTheme } from "vitepress";

const referenceSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: "Reference",
    items: [
      { text: "Host", link: "/host-reference" },
      { text: "WASM", link: "/wasm-reference" },
    ],
  },
];

const guideSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: "Get started",
    link: "/guide/get_started/",
    collapsed: false,
    items: [
      { text: "Native", link: "/guide/get_started/native" },
      { text: "Embedded", link: "/guide/get_started/embedded" },
      { text: "WASM", link: "/guide/get_started/wasm" },
    ],
  },
  {
    text: "Design",
    link: "/guide/design/",
    collapsed: false,
    items: [
      { text: "Modules", link: "/guide/design/" },
      { text: "File system", link: "/guide/design/file_system" },
      { text: "Task", link: "/guide/design/task" },
    ],
  },
  {
    text: "About",
    link: "/about/",
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
        href: "/static/images/logo_dark.svg",
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
      light: "/static/images/logo_light.svg",
      dark: "/static/images/logo_dark.svg",
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
      message:
        "Released under the MIT License - <a href='https://alix.anneraud.fr'>Alix ANNERAUD</a>",
    },
  },
});
