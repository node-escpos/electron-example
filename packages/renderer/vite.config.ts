/* eslint-env node */
import { join } from "node:path";

import react from "@vitejs/plugin-react";
import { renderer } from "unplugin-auto-expose";
import type { UserConfig } from "vite";

import { chrome } from "../../.electron-vendors.cache.json";
import { injectAppVersion } from "../../version/inject-app-version-plugin.mjs";

const PACKAGE_ROOT = __dirname;
const PROJECT_ROOT = join(PACKAGE_ROOT, "../..");

const config: UserConfig = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: PROJECT_ROOT,
  resolve: {
    alias: {
      "/@/": `${join(PACKAGE_ROOT, "src")}/`,
    },
  },
  base: "",
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: "dist",
    assetsDir: ".",
    rollupOptions: {
      input: join(PACKAGE_ROOT, "index.html"),
    },
    emptyOutDir: true,
    reportCompressedSize: false,
  },
  test: {
    environment: "happy-dom",
  },
  plugins: [
    react(),
    renderer.vite({
      preloadEntry: join(PACKAGE_ROOT, "../preload/src/index.ts"),
    }),
    injectAppVersion(PROJECT_ROOT),
  ],
};

export default config;
