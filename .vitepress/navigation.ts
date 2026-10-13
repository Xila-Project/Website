import type { DefaultTheme } from "vitepress";

const componentGroups: DefaultTheme.SidebarItem[] = [
  {
    text: "Modules",
    link: "/explanation/architecture/modules/",
    collapsed: true,
    items: [
      ["ABI", "abi"],
      ["Bindings", "bindings"],
      ["Graphics", "graphics"],
      ["Log", "log"],
      ["Memory", "memory"],
      ["Network", "network"],
      ["Task", "task"],
      ["Time", "time"],
      ["Users", "users"],
      ["Virtual file system", "virtual_file_system"],
      ["Virtual machine", "virtual_machine"],
    ].map(([text, path]) => ({
      text,
      link: `/explanation/architecture/modules/${path}`,
    })),
  },
  {
    text: "Crates",
    link: "/explanation/architecture/crates/",
    collapsed: true,
    items: [
      ["Authentication", "authentication"],
      ["Bootsplash", "bootsplash"],
      ["Device", "device"],
      ["Executable", "executables"],
      ["File system", "file_system"],
      ["Internationalization", "internationalization"],
      ["Little FS", "little_fs"],
      ["Peripherals", "peripherals"],
      ["Shared", "shared"],
      ["Synchronization", "synchronization"],
      ["Target", "target"],
      ["Testing", "testing"],
    ].map(([text, path]) => ({
      text,
      link: `/explanation/architecture/crates/${path}`,
    })),
  },
  {
    text: "Drivers",
    link: "/explanation/architecture/drivers/",
    collapsed: true,
    items: [
      ["Core", "core"],
      ["Espressif", "espressif"],
      ["Native", "native"],
      ["Shared", "shared"],
      ["Std", "std"],
      ["WASM", "wasm"],
    ].map(([text, path]) => ({
      text,
      link: `/explanation/architecture/drivers/${path}`,
    })),
  },
  {
    text: "Executables",
    link: "/explanation/architecture/executables/",
    collapsed: true,
    items: [
      ["Calculator", "calculator"],
      ["Command line shell", "command_line_shell"],
      ["File manager", "file_manager"],
      ["Graphical shell", "graphical_shell"],
      ["Settings", "settings"],
      ["Terminal", "terminal"],
      ["WASM", "wasm"],
    ].map(([text, path]) => ({
      text,
      link: `/explanation/architecture/executables/${path}`,
    })),
  },
];

export const nav: DefaultTheme.NavItem[] = [
  { text: "Tutorials", link: "/tutorials/" },
  { text: "How-to", link: "/how-to/" },
  { text: "Reference", link: "/reference/" },
  { text: "Explanation", link: "/explanation/" },
  {
    text: "Demonstration",
    link: "https://documentation.xila.dev/demonstrations/wasm/en/",
  },
];

const documentationSidebar: DefaultTheme.SidebarItem[] = [
  { text: "Documentation", link: "/docs/" },
  {
    text: "Tutorials",
    link: "/tutorials/",
    items: [
      { text: "Run Xila natively", link: "/tutorials/native" },
      { text: "Run Calculator in the browser", link: "/tutorials/browser" },
    ],
  },
  {
    text: "How-to guides",
    link: "/how-to/",
    items: [
      { text: "Set up development", link: "/how-to/setup-development" },
      { text: "Integrate a host application", link: "/how-to/integrate-host" },
      { text: "Build a guest", link: "/how-to/build-guest" },
      { text: "Run a guest", link: "/how-to/run-guest" },
      { text: "Validate Core", link: "/how-to/validate-core" },
      { text: "Contribute to Core", link: "/how-to/contribute-core" },
      { text: "Reset the browser disk", link: "/how-to/reset-browser-storage" },
      { text: "Write documentation", link: "/how-to/write-documentation" },
    ],
  },
  {
    text: "Reference",
    link: "/reference/",
    items: [
      { text: "Host API", link: "/reference/host" },
      { text: "Guest API", link: "/reference/guest" },
      { text: "Development commands", link: "/reference/development-commands" },
      { text: "WASM runtime", link: "/reference/wasm-runtime" },
      { text: "Graphics bindings", link: "/reference/graphics-bindings" },
    ],
  },
  {
    text: "Explanation",
    link: "/explanation/",
    items: [
      {
        text: "Architecture",
        link: "/explanation/architecture/",
        collapsed: true,
        items: [
          {
            text: "Component map",
            link: "/explanation/architecture/components",
          },
          ...componentGroups,
        ],
      },
      {
        text: "Development environments",
        link: "/explanation/development-environments",
      },
      { text: "Browser storage", link: "/explanation/browser-storage" },
    ],
  },
  { text: "About Xila", link: "/about/" },
];

export const sidebar: DefaultTheme.Sidebar = Object.fromEntries(
  [
    "/docs/",
    "/tutorials/",
    "/how-to/",
    "/reference/",
    "/explanation/",
    "/about/",
  ].map((prefix) => [prefix, documentationSidebar]),
);
