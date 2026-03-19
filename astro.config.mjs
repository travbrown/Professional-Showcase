import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/static";

export default defineConfig({
  site: "https://travisbrown.dev",
  build: {
    inlineStylesheets: "auto",
  },
  output: "static",
  adapter: vercel(),
});
