#!/usr/bin/env node
'use strict';

// `npm run dev` — rebuilds main.js from src/main.js automatically on save,
// so Obsidian's "reload app without saving" / a plugin-reload hotkey picks
// up changes without running `npm run build` by hand each time. Just
// re-runs assemble.js (see that file for what an actual build does); this
// only adds the watch loop on top, debounced slightly since editors often
// fire more than one filesystem event per save.

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'src', 'main.js');
const assemblePath = path.join(__dirname, 'assemble.js');

function build() {
  try {
    execFileSync(process.execPath, [assemblePath], { stdio: 'inherit' });
  } catch (e) {
    // assemble.js already printed its own error — keep watching rather
    // than crashing the whole dev loop over one bad save.
  }
}

build();

let pending = null;
fs.watch(srcPath, () => {
  clearTimeout(pending);
  pending = setTimeout(build, 150);
});

console.log(`Watching ${srcPath} for changes... (Ctrl+C to stop)`);
