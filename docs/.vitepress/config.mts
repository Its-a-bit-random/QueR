import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "QueR",
  description: "Lightweight batching utility for Roblox-TS",
  base: "/QueR/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/GettingStarted" },
          { text: "Installing", link: "/Installing" },
        ],
      },
      {
        text: "API",
        items: [{ text: "QueR", link: "/api-quer" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/Its-a-bit-random/QueR" },
    ],
  },
});
