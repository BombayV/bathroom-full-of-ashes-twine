#!/usr/bin/env bun

import { $ } from "bun";
import { watch } from "fs";
import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

const TWEEGO_PATH = "tweego"; // Assumes tweego is in PATH
const SRC_DIR = "./src";
const OUTPUT_DIR = "./dist";
const OUTPUT_FILE = join(OUTPUT_DIR, "index.html");
const CSS_INPUT = "./input.css";
const CSS_OUTPUT = "./dist/output.css";

// Ensure dist directory exists
await $`mkdir -p ${OUTPUT_DIR}`;

const buildTailwind = async () => {
  console.log("🎨 Building Tailwind CSS...");
  try {
    await $`bunx @tailwindcss/cli -i ${CSS_INPUT} -o ${CSS_OUTPUT} --minify`;
    console.log("✅ Tailwind CSS built successfully");
  } catch (error) {
    console.error("❌ Tailwind CSS build failed:", error);
  }
}

const buildTwine = async () => {
  console.log("📝 Building Twine story with Tweego...");
  try {
    await $`${TWEEGO_PATH} -o ${OUTPUT_FILE} ${SRC_DIR}`;
    console.log("✅ Twine story built successfully");
  } catch (error) {
    console.error("❌ Tweego build failed:", error);
    console.error("Make sure tweego is installed and in your PATH");
  }
}

const injectCSS = async () => {
  console.log("💉 Injecting Tailwind CSS into HTML...");
  try {
    // Read the generated CSS
    const css = readFileSync(CSS_OUTPUT, 'utf8');
    
    // Read the HTML file
    let html = readFileSync(OUTPUT_FILE, 'utf8');
    
    // Create the style tag with the CSS
    const styleTag = `<style>${css}</style>`;
    
    // Inject the CSS into the head section
    if (html.includes('</head>')) {
      html = html.replace('</head>', `${styleTag}\n</head>`);
    } else {
      // If no head tag, inject after opening html tag or at the beginning
      if (html.includes('<html>')) {
        html = html.replace('<html>', `<html>\n<head>${styleTag}</head>`);
      } else {
        html = `<head>${styleTag}</head>\n${html}`;
      }
    }
    
    // Write the modified HTML back
    writeFileSync(OUTPUT_FILE, html);
    console.log("✅ CSS injected successfully");
  } catch (error) {
    console.error("❌ CSS injection failed:", error);
  }
}

const build = async () => {
  await buildTailwind();
  await buildTwine();
  await injectCSS();
  console.log(`\n✨ Build complete! Open ${OUTPUT_FILE} in your browser.\n`);
}

// Check if --watch flag is passed
const isWatch = process.argv.includes("--watch") || process.argv.includes("-w");

if (isWatch) {
  console.log("👀 Watching for changes...\n");
  
  // Initial build
  await build();
  
  // Watch for changes
  watch(SRC_DIR, { recursive: true }, async (event, filename) => {
    console.log(`\n📦 Change detected in ${filename}`);
    await build();
  });
  
  watch(CSS_INPUT, async (event, filename) => {
    console.log(`\n📦 CSS change detected`);
    await buildTailwind();
  });
  
  console.log("Press Ctrl+C to stop watching.\n");
} else {
  await build();
  process.exit(0);
}
