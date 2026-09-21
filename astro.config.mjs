// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap({
          filter: (page) => !page.includes("/admin"),
    changefreq: 'daily',
    priority: 0.7,
    lastmod: new Date(),
  })],
}) 