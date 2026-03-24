import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://travis-brown.vercel.app",
  build: {
    inlineStylesheets: "auto",
  },
  adapter: vercel(),
});
