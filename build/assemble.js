#!/usr/bin/env node
'use strict';

// Build script for the Amoeba plugin. `npm run build` runs this to produce
// the single main.js Obsidian actually loads, from two pieces:
//
//   1. compromise, bundled by esbuild (see vendor-entry.js) into one
//      self-contained function with no npm dependency left at runtime.
//   2. src/main.js — copied through completely untouched, byte for byte.
//
// src/main.js deliberately never goes through esbuild itself: esbuild's
// bundler strips ordinary comments as part of its parse/print pipeline (it
// only ever preserves specially-marked "legal"/license comments, by
// design — this isn't a flag we forgot to pass). This codebase's comments
// are load-bearing documentation, not incidental — see the GPL header and
// essentially every function in src/main.js — so losing them on every
// build isn't an acceptable tradeoff just to get compromise inlined.
//
// The two pieces are stitched together with a small `require` shim, so
// src/main.js's own plain `require('compromise')` line resolves to the
// vendored bundle without src/main.js needing to know it's being vendored
// at all, while `require('obsidian')` still passes straight through to
// Obsidian's real module loader.
//
// Re-run this (`npm run build`) after every edit to src/main.js, or use
// `npm run dev` to do that automatically on save.

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const root = path.join(__dirname, '..');

const vendorResult = esbuild.buildSync({
  entryPoints: [path.join(__dirname, 'vendor-entry.js')],
  bundle: true,
  platform: 'browser',
  format: 'cjs',
  write: false,
});
const vendorCode = vendorResult.outputFiles[0].text;

// compromise's MIT license requires its copyright/permission notice to
// accompany any copy of the software — and the vendored code above IS a
// full copy of it, compiled into the one file (main.js) that actually
// ships in a GitHub release. Neither node_modules/ (gitignored — see
// .gitignore) nor a README credit alone satisfies that for someone who
// only has the release assets, so the real LICENSE text is read fresh
// from the installed package and embedded as a comment here, rather than
// hardcoded — that way it can't silently drift from whatever compromise
// version package.json actually pins. Missing the file entirely fails the
// build loudly instead of silently shipping without attribution.
const compromiseLicensePath = path.join(root, 'node_modules', 'compromise', 'LICENSE');
if (!fs.existsSync(compromiseLicensePath)) {
  throw new Error(
    `Expected compromise's license at ${compromiseLicensePath} — run npm install, or if compromise moved/renamed its license file, update this path.`
  );
}
const compromiseLicenseComment = fs
  .readFileSync(compromiseLicensePath, 'utf8')
  .trim()
  .split('\n')
  .map((line) => (line ? `// ${line}` : '//'))
  .join('\n');

const ourSource = fs.readFileSync(path.join(root, 'src', 'main.js'), 'utf8');

const banner =
  '// GENERATED FILE — do not edit directly.\n' +
  '// Produced by `npm run build` (see build/assemble.js) from src/main.js —\n' +
  '// edit that file instead, then rebuild.\n\n';

// Indented purely so the vendored code visually reads as nested inside the
// wrapper below when skimming the file — esbuild's own output is left
// otherwise untouched.
const indentedVendorCode = vendorCode
  .split('\n')
  .map((line) => (line ? '  ' + line : line))
  .join('\n');

// __nodeRequire__ has to be captured *before* anything below could shadow
// the name `require` — a `function require(name) {...}` declared later in
// this same scope would otherwise get hoisted above this line, so
// `__nodeRequire__` would end up capturing itself instead of the module's
// real one, and every fallback call would recurse forever. Naming our own
// version something else entirely (__patchedRequire__, not `require`)
// sidesteps the whole hoisting trap rather than relying on ordering.
const shimHeader =
  '// ---- Vendored dependency: compromise (MIT licensed) --------------------\n' +
  '// Bundled from node_modules/compromise by esbuild — see build/assemble.js.\n' +
  '// Regenerate with `npm run build` rather than editing this block by hand.\n' +
  '//\n' +
  '// compromise\'s own license, reproduced here per its MIT terms:\n' +
  '//\n' +
  compromiseLicenseComment +
  '\n' +
  'const __nodeRequire__ = require;\n' +
  'const __vendoredModules__ = {};\n' +
  '(function () {\n' +
  '  const module = { exports: {} };\n' +
  '  const exports = module.exports;\n' +
  indentedVendorCode +
  '\n' +
  "  __vendoredModules__['compromise'] = module.exports;\n" +
  '})();\n' +
  'function __patchedRequire__(name) {\n' +
  '  return Object.prototype.hasOwnProperty.call(__vendoredModules__, name)\n' +
  '    ? __vendoredModules__[name]\n' +
  '    : __nodeRequire__(name);\n' +
  '}\n' +
  '// ---- End vendored dependency --------------------------------------------\n\n' +
  // src/main.js is wrapped in its own function so `require` inside it binds
  // to a plain parameter (__patchedRequire__ passed in below) rather than
  // a re-declaration in shared scope — parameters don't have the hoisting
  // trap const/let/function declarations do, so this is deliberate, not
  // an arbitrary style choice.
  '(function (require) {\n';

const shimFooter = '\n})(__patchedRequire__);\n';

const finalCode = banner + shimHeader + ourSource + shimFooter;
fs.writeFileSync(path.join(root, 'main.js'), finalCode);
console.log(`Built main.js (${finalCode.length} bytes) from src/main.js.`);
