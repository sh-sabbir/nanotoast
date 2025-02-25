import { build } from "esbuild";

build({
  entryPoints: ["src/index.js"],
  outfile: "dist/nanotoast.min.js",
  minify: true,
  bundle: true,
  format: "esm",
}).catch(() => process.exit(1));
