import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// GitHub Pages project sites live under /<repo>/, so deep links need a copy of
// index.html at those paths (and a 404.html that restores the original URL).
const SPA_FALLBACK_ROUTES = ["presentation"];

function copyIndexForSpaRoutes() {
  return {
    name: "copy-index-for-spa-routes",
    closeBundle() {
      const indexFile = resolve("dist/index.html");
      for (const route of SPA_FALLBACK_ROUTES) {
        const directory = resolve("dist", route);
        mkdirSync(directory, { recursive: true });
        copyFileSync(indexFile, resolve(directory, "index.html"));
      }
      copyFileSync(indexFile, resolve("dist/404.html"));
    },
  };
}

export default defineConfig({
  plugins: [react(), svgr(), copyIndexForSpaRoutes()],
  // Project Pages URL: https://sourabhchopade-stack.github.io/change-management-presentation/
  base: "/change-management-presentation/",
});
