import {defineConfig} from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  external: ["react", "react-dom"],
  sourcemap: true,
  clean: true,
  loader: {
    ".css": "file"
  },
  outExtension({format}) {
    return {
      js: format === "esm" ? ".mjs" : ".js"
    };
  }
});
