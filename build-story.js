#!/usr/bin/env node
import { copyFileSync, unlinkSync } from 'fs';
import { execSync } from 'child_process';

// Backup the original _init.tw
copyFileSync('src/story/_init.tw', 'src/story/_init.tw.backup');

try {
  // Replace with production version
  copyFileSync('src/story/_init.prod.tw', 'src/story/_init.tw');

  // Build the story with production assets
  execSync('tweego src/story -o dist/index.html', { stdio: 'inherit' });

  console.log('Production build complete!');
} finally {
  // Restore the original
  copyFileSync('src/story/_init.tw.backup', 'src/story/_init.tw');
  unlinkSync('src/story/_init.tw.backup');
}
