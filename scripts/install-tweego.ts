#!/usr/bin/env bun

import { $ } from "bun";
import { existsSync } from "fs";
import { join } from "path";

const TWEEGO_PATH = "./bin/tweego";
const TWEEGO_URL = "https://github.com/tmedwards/tweego/releases/download/v2.1.1/tweego-2.1.1-linux-x64.tar.gz";
const TWEEGO_MACOS_URL = "https://github.com/tmedwards/tweego/releases/download/v2.1.1/tweego-2.1.1-macos-x64.tar.gz";

async function installTweego() {
  console.log("🔍 Checking for Tweego...");
  
  // Check if tweego is already available in PATH
  try {
    await $`which tweego`;
    console.log("✅ Tweego found in PATH");
    return;
  } catch {
    // Tweego not in PATH, continue with installation
  }

  // Check if we already have tweego in local bin
  if (existsSync(TWEEGO_PATH)) {
    console.log("✅ Tweego already installed locally");
    return;
  }

  console.log("📥 Installing Tweego...");
  
  // Create bin directory
  await $`mkdir -p ./bin`;
  
  try {
    // Detect platform
    const platform = process.platform;
    const isLinux = platform === "linux";
    const isMacOS = platform === "darwin";
    
    if (isLinux) {
      console.log("🐧 Detected Linux platform");
      await $`curl -L ${TWEEGO_URL} | tar -xz -C ./bin --strip-components=1`;
    } else if (isMacOS) {
      console.log("🍎 Detected macOS platform");
      await $`curl -L ${TWEEGO_MACOS_URL} | tar -xz -C ./bin --strip-components=1`;
    } else {
      // Fallback to Linux binary for other platforms (like Cloudflare)
      console.log("☁️ Using Linux binary for deployment");
      await $`curl -L ${TWEEGO_URL} | tar -xz -C ./bin --strip-components=1`;
    }
    
    // Make executable
    await $`chmod +x ${TWEEGO_PATH}`;
    
    console.log("✅ Tweego installed successfully");
  } catch (error) {
    console.error("❌ Failed to install Tweego:", error);
    process.exit(1);
  }
}

await installTweego();