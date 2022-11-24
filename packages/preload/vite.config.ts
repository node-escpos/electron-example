import { join } from "node:path";

import { preload } from "unplugin-auto-expose";
import type { UserConfig } from "vite";

import { chrome } from "../../.electron-vendors.cache.json";
import { injectAppVersion } from "../../version/inject-app-version-plugin.mjs";

const PACKAGE_ROOT = __dirname;
const PROJECT_ROOT = join(PACKAGE_ROOT, "../..");

const config: UserConfig = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: PROJECT_ROOT,
  build: {
    ssr: true,
    sourcemap: "inline",
    target: `chrome${chrome}`,
    outDir: "dist",
    assetsDir: ".",
    minify: process.env.MODE !== "development",
    lib: {
      entry: "src/index.ts",
      formats: ["cjs"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].cjs",
      },
    },
    emptyOutDir: true,
    reportCompressedSize: false,
  },
  plugins: [preload.vite(), injectAppVersion(PROJECT_ROOT)],
};

export default config;
