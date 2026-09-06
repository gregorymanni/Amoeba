// Entry point esbuild bundles in isolation to produce a self-contained,
// dependency-free copy of `compromise` — see assemble.js for why this is
// bundled separately from (and never touches) src/main.js itself.
module.exports = require('compromise');
