import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { App } from "vue";

function registerComponents(app: App<any>) {
  // Auto-register all components in the components directory
  const components = import.meta.glob("./components/**/*.vue", {
    eager: true,
  });

  for (const path in components) {
    const component = components[path] as any;
    const componentName = path
      .split("/")
      .pop()
      ?.replace(/\.\w+$/, ""); // Remove file extension

    if (componentName) {
      app.component(componentName, component.default);
    }
  }
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    registerComponents(app);
  },
} satisfies Theme;
