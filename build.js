#!/usr/bin/env node
import { build } from "esbuild";
import fs from "fs";
import path from "path";
import ora from "ora";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function buildAll() {
  // Shared base configuration for both builds.
  const baseConfig = {
    entryPoints: ["src/index.js"],
    bundle: true,
    minify: true,
  };

  const spinner = ora();

  try {
    // Build the ESM bundle.
    spinner.start("Building ESM bundle...");
    await build({
      ...baseConfig,
      outfile: "dist/nanotoast.esm.js",
      format: "esm",
    });
    // Artificial delay so the spinner is visible
    await delay(500);
    spinner.succeed("ESM bundle built successfully.");

    // Build the IIFE/UMD bundle.
    spinner.start("Building IIFE/UMD bundle...");
    await build({
      ...baseConfig,
      outfile: "dist/nanotoast.js",
      format: "iife",
      globalName: "NanoToast",
      footer: {
        js: `
          (function() {
            var realExport = NanoToast.default;
            if (realExport) {
              // Copy all own property names from NanoToast onto the function
              Object.getOwnPropertyNames(NanoToast).forEach(function(key) {
                if (key !== "default") {
                  realExport[key] = NanoToast[key];
                }
              });
              NanoToast = realExport;
            }
          })();
        `,
      },
    });
    await delay(500);
    spinner.succeed("IIFE/UMD bundle built successfully.");

    // Cleanup: Remove the duplicate CSS file from the ESM build.
    spinner.start("Cleaning up duplicate CSS file...");
    await delay(500);
    const cssPath = path.join(process.cwd(), "dist", "nanotoast.esm.css");
    if (fs.existsSync(cssPath)) {
      fs.unlinkSync(cssPath);
      spinner.succeed("Removed duplicate CSS file: nanotoast.esm.css");
    } else {
      spinner.info("No duplicate CSS file found.");
    }

    spinner.succeed("Build process complete!");
  } catch (error) {
    spinner.fail("Build failed.");
    console.error(error);
    process.exit(1);
  }
}

buildAll();
