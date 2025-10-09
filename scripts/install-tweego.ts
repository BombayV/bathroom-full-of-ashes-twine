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
    
    let downloadUrl = TWEEGO_URL; // Default to Linux
    
    if (isMacOS) {
      console.log("🍎 Detected macOS platform");
      downloadUrl = TWEEGO_MACOS_URL;
    } else {
      console.log("🐧 Using Linux binary");
    }
    
    console.log(`📡 Downloading from: ${downloadUrl}`);
    
    // Download and extract in separate steps for better error handling
    await $`curl -L -o ./bin/tweego.tar.gz ${downloadUrl}`;
    console.log("✅ Download completed");
    
    // Extract the tar.gz file
    await $`cd ./bin && tar -xzf tweego.tar.gz`;
    console.log("✅ Extraction completed");
    
    // Find the tweego binary and move it to the right place
    try {
      // Try to find tweego binary in extracted files
      const result = await $`find ./bin -name "tweego" -type f`.text();
      const tweegoPath = result.trim().split('\n')[0];
      
      if (tweegoPath && tweegoPath !== TWEEGO_PATH) {
        await $`mv ${tweegoPath} ${TWEEGO_PATH}`;
        console.log(`✅ Moved tweego from ${tweegoPath} to ${TWEEGO_PATH}`);
      }
    } catch (findError) {
      console.log("⚠️ Could not find tweego binary, trying alternative extraction...");
      // Alternative: extract with strip-components
      await $`cd ./bin && tar -xzf tweego.tar.gz --strip-components=1`;
    }
    
    // Clean up tar file
    await $`rm -f ./bin/tweego.tar.gz`;
    
    // Make executable if file exists
    if (existsSync(TWEEGO_PATH)) {
      await $`chmod +x ${TWEEGO_PATH}`;
      console.log("✅ Made tweego executable");
    } else {
      throw new Error("Tweego binary not found after extraction");
    }
    
    console.log("✅ Tweego installed successfully");
    
    // Test the installation
    await $`${TWEEGO_PATH} --version`;
    console.log("✅ Tweego installation verified");
    
  } catch (error) {
    console.error("❌ Failed to install Tweego:", error);
    
    // Debug: list what's in the bin directory
    try {
      console.log("📁 Contents of ./bin directory:");
      await $`ls -la ./bin/`;
    } catch (lsError) {
      console.log("Could not list bin directory contents");
    }
    
    process.exit(1);
  }
}

await installTweego();