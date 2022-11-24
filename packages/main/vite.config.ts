import { join } from "node:path";

import type { UserConfig } from "vite";

import { node } from "../../.electron-vendors.cache.json";
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
  build: {
    ssr: true,
    sourcemap: "inline",
    target: `node${node}`,
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
  plugins: [injectAppVersion(PROJECT_ROOT)],
};

export default config;
