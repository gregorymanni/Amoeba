// GENERATED FILE — do not edit directly.
// Produced by `npm run build` (see build/assemble.js) from src/main.js —
// edit that file instead, then rebuild.

// ---- Vendored dependency: compromise (MIT licensed) --------------------
// Bundled from node_modules/compromise by esbuild — see build/assemble.js.
// Regenerate with `npm run build` rather than editing this block by hand.
//
// compromise's own license, reproduced here per its MIT terms:
//
// The MIT License (MIT)
//
// Copyright (c) 2019 Spencer Kelly
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const __nodeRequire__ = require;
const __vendoredModules__ = {};
(function () {
  const module = { exports: {} };
  const exports = module.exports;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/compromise/builds/three/compromise-three.cjs
  var require_compromise_three = __commonJS({
    "node_modules/compromise/builds/three/compromise-three.cjs"(exports2, module2) {
      !function(e, t) {
        "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).nlp = t();
      }(exports2, function() {
        "use strict";
        var e = { methods: { one: {}, two: {}, three: {}, four: {} }, model: { one: {}, two: {}, three: {} }, compute: {}, hooks: [] };
        const t = { compute: function(e2) {
          const { world: t2 } = this, n2 = t2.compute;
          return "string" == typeof e2 && n2.hasOwnProperty(e2) ? n2[e2](this) : ((e3) => "[object Array]" === Object.prototype.toString.call(e3))(e2) ? e2.forEach((r2) => {
            t2.compute.hasOwnProperty(r2) ? n2[r2](this) : console.warn("no compute:", e2);
          }) : "function" == typeof e2 ? e2(this) : console.warn("no compute:", e2), this;
        } };
        var n = { forEach: function(e2) {
          return this.fullPointer.forEach((t2, n2) => {
            const r2 = this.update([t2]);
            e2(r2, n2);
          }), this;
        }, map: function(e2, t2) {
          const n2 = this.fullPointer.map((t3, n3) => {
            const r3 = this.update([t3]), o2 = e2(r3, n3);
            return void 0 === o2 ? this.none() : o2;
          });
          if (0 === n2.length) return t2 || this.update([]);
          if (void 0 !== n2[0]) {
            if ("string" == typeof n2[0]) return n2;
            if ("object" == typeof n2[0] && (null === n2[0] || !n2[0].isView)) return n2;
          }
          let r2 = [];
          return n2.forEach((e3) => {
            r2 = r2.concat(e3.fullPointer);
          }), this.toView(r2);
        }, filter: function(e2) {
          let t2 = this.fullPointer;
          t2 = t2.filter((t3, n2) => {
            const r2 = this.update([t3]);
            return e2(r2, n2);
          });
          return this.update(t2);
        }, find: function(e2) {
          const t2 = this.fullPointer.find((t3, n2) => {
            const r2 = this.update([t3]);
            return e2(r2, n2);
          });
          return this.update([t2]);
        }, some: function(e2) {
          return this.fullPointer.some((t2, n2) => {
            const r2 = this.update([t2]);
            return e2(r2, n2);
          });
        }, random: function(e2 = 1) {
          let t2 = this.fullPointer, n2 = Math.floor(Math.random() * t2.length);
          return n2 + e2 > this.length && (n2 = this.length - e2, n2 = n2 < 0 ? 0 : n2), t2 = t2.slice(n2, n2 + e2), this.update(t2);
        } };
        const r = { termList: function() {
          return this.methods.one.termList(this.docs);
        }, terms: function(e2) {
          const t2 = this.match(".");
          return "number" == typeof e2 ? t2.eq(e2) : t2;
        }, groups: function(e2) {
          if (e2 || 0 === e2) return this.update(this._groups[e2] || []);
          const t2 = {};
          return Object.keys(this._groups).forEach((e3) => {
            t2[e3] = this.update(this._groups[e3]);
          }), t2;
        }, eq: function(e2) {
          let t2 = this.pointer;
          return t2 || (t2 = this.docs.map((e3, t3) => [t3])), t2[e2] ? this.update([t2[e2]]) : this.none();
        }, first: function() {
          return this.eq(0);
        }, last: function() {
          const e2 = this.fullPointer.length - 1;
          return this.eq(e2);
        }, firstTerms: function() {
          return this.match("^.");
        }, lastTerms: function() {
          return this.match(".$");
        }, slice: function(e2, t2) {
          let n2 = this.pointer || this.docs.map((e3, t3) => [t3]);
          return n2 = n2.slice(e2, t2), this.update(n2);
        }, all: function() {
          return this.update().toView();
        }, fullSentences: function() {
          const e2 = this.fullPointer.map((e3) => [e3[0]]);
          return this.update(e2).toView();
        }, none: function() {
          return this.update([]);
        }, isDoc: function(e2) {
          if (!e2 || !e2.isView) return false;
          const t2 = this.fullPointer, n2 = e2.fullPointer;
          return !t2.length !== n2.length && t2.every((e3, t3) => !!n2[t3] && (e3[0] === n2[t3][0] && e3[1] === n2[t3][1] && e3[2] === n2[t3][2]));
        }, wordCount: function() {
          return this.docs.reduce((e2, t2) => (e2 += t2.filter((e3) => "" !== e3.text).length, e2), 0);
        }, isFull: function() {
          const e2 = this.pointer;
          if (!e2) return true;
          if (0 === e2.length || 0 !== e2[0][0]) return false;
          let t2 = 0, n2 = 0;
          return this.document.forEach((e3) => t2 += e3.length), this.docs.forEach((e3) => n2 += e3.length), t2 === n2;
        }, getNth: function(e2) {
          return "number" == typeof e2 ? this.eq(e2) : "string" == typeof e2 ? this.if(e2) : this;
        } };
        r.group = r.groups, r.fullSentence = r.fullSentences, r.sentence = r.fullSentences, r.lastTerm = r.lastTerms, r.firstTerm = r.firstTerms;
        const o = Object.assign({}, r, t, n);
        o.get = o.eq;
        class View {
          constructor(t2, n2, r2 = {}) {
            [["document", t2], ["world", e], ["_groups", r2], ["_cache", null], ["viewType", "View"]].forEach((e2) => {
              Object.defineProperty(this, e2[0], { value: e2[1], writable: true });
            }), this.ptrs = n2;
          }
          get docs() {
            let t2 = this.document;
            return this.ptrs && (t2 = e.methods.one.getDoc(this.ptrs, this.document)), t2;
          }
          get pointer() {
            return this.ptrs;
          }
          get methods() {
            return this.world.methods;
          }
          get model() {
            return this.world.model;
          }
          get hooks() {
            return this.world.hooks;
          }
          get isView() {
            return true;
          }
          get found() {
            return this.docs.length > 0;
          }
          get length() {
            return this.docs.length;
          }
          get fullPointer() {
            const { docs: e2, ptrs: t2, document: n2 } = this, r2 = t2 || e2.map((e3, t3) => [t3]);
            return r2.map((e3) => {
              let [t3, r3, o2, a2, i2] = e3;
              return r3 = r3 || 0, o2 = o2 || (n2[t3] || []).length, n2[t3] && n2[t3][r3] && (a2 = a2 || n2[t3][r3].id, n2[t3][o2 - 1] && (i2 = i2 || n2[t3][o2 - 1].id)), [t3, r3, o2, a2, i2];
            });
          }
          update(e2) {
            const t2 = new View(this.document, e2);
            if (this._cache && e2 && e2.length > 0) {
              const n2 = [];
              e2.forEach((e3, t3) => {
                const [r2, o2, a2] = e3;
                (1 === e3.length || 0 === o2 && this.document[r2].length === a2) && (n2[t3] = this._cache[r2]);
              }), n2.length > 0 && (t2._cache = n2);
            }
            return t2.world = this.world, t2;
          }
          toView(e2) {
            return new View(this.document, e2 || this.pointer);
          }
          fromText(e2) {
            const { methods: t2 } = this, n2 = t2.one.tokenize.fromString(e2, this.world), r2 = new View(n2);
            return r2.world = this.world, r2.compute(["normal", "freeze", "lexicon"]), this.world.compute.preTagger && r2.compute("preTagger"), r2.compute("unfreeze"), r2;
          }
          clone() {
            let e2 = this.document.slice(0);
            e2 = e2.map((e3) => e3.map((e4) => ((e4 = Object.assign({}, e4)).tags = new Set(e4.tags), e4)));
            const t2 = this.update(this.pointer);
            return t2.document = e2, t2._cache = this._cache, t2;
          }
        }
        Object.assign(View.prototype, o);
        const a = function(e2) {
          return e2 && "object" == typeof e2 && !Array.isArray(e2);
        }, i = (e2) => "__proto__" === e2 || "constructor" === e2 || "prototype" === e2;
        function s(e2, t2) {
          if (a(t2)) for (const n2 in t2) i(n2) || (a(t2[n2]) ? (e2[n2] || Object.assign(e2, { [n2]: {} }), s(e2[n2], t2[n2])) : Object.assign(e2, { [n2]: t2[n2] }));
          return e2;
        }
        const l = function(e2, t2, n2, r2) {
          if (o2 = e2, "[object Array]" === Object.prototype.toString.call(o2)) return void e2.forEach((e3) => l(e3, t2, n2, r2));
          var o2;
          const { methods: a2, model: u2, compute: c2, hooks: h2 } = t2;
          e2.methods && function(e3, t3) {
            for (const n3 in t3) i(n3) || (e3[n3] = e3[n3] || {}, Object.assign(e3[n3], t3[n3]));
          }(a2, e2.methods), e2.model && s(u2, e2.model), e2.irregulars && function(e3, t3) {
            const n3 = e3.two.models || {};
            Object.keys(t3).forEach((e4) => {
              t3[e4].pastTense && (n3.toPast && (n3.toPast.ex[e4] = t3[e4].pastTense), n3.fromPast && (n3.fromPast.ex[t3[e4].pastTense] = e4)), t3[e4].presentTense && (n3.toPresent && (n3.toPresent.ex[e4] = t3[e4].presentTense), n3.fromPresent && (n3.fromPresent.ex[t3[e4].presentTense] = e4)), t3[e4].gerund && (n3.toGerund && (n3.toGerund.ex[e4] = t3[e4].gerund), n3.fromGerund && (n3.fromGerund.ex[t3[e4].gerund] = e4)), t3[e4].comparative && (n3.toComparative && (n3.toComparative.ex[e4] = t3[e4].comparative), n3.fromComparative && (n3.fromComparative.ex[t3[e4].comparative] = e4)), t3[e4].superlative && (n3.toSuperlative && (n3.toSuperlative.ex[e4] = t3[e4].superlative), n3.fromSuperlative && (n3.fromSuperlative.ex[t3[e4].superlative] = e4));
            });
          }(u2, e2.irregulars), e2.compute && Object.assign(c2, e2.compute), h2 && (t2.hooks = h2.concat(e2.hooks || [])), e2.api && e2.api(n2), e2.lib && Object.keys(e2.lib).forEach((t3) => r2[t3] = e2.lib[t3]), e2.tags && r2.addTags(e2.tags), e2.words && r2.addWords(e2.words), e2.frozen && r2.addWords(e2.frozen, true), e2.mutate && e2.mutate(t2, r2);
        }, u = function(e2) {
          return "[object Array]" === Object.prototype.toString.call(e2);
        }, c = function(e2, t2, n2) {
          const { methods: r2 } = n2, o2 = new t2([]);
          if (o2.world = n2, "number" == typeof e2 && (e2 = String(e2)), !e2) return o2;
          if ("string" == typeof e2) {
            return new t2(r2.one.tokenize.fromString(e2, n2));
          }
          if (a2 = e2, "[object Object]" === Object.prototype.toString.call(a2) && e2.isView) return new t2(e2.document, e2.ptrs);
          var a2;
          if (u(e2)) {
            if (u(e2[0])) {
              const n4 = e2.map((e3) => e3.map((e4) => ({ text: e4, normal: e4, pre: "", post: " ", tags: /* @__PURE__ */ new Set() })));
              return new t2(n4);
            }
            const n3 = e2.map((e3) => e3.terms.map((e4) => (u(e4.tags) && (e4.tags = new Set(e4.tags)), e4)));
            return new t2(n3);
          }
          return o2;
        }, h = Object.assign({}, e), d = function(e2, t2) {
          t2 && d.addWords(t2);
          const n2 = c(e2, View, h);
          return e2 && n2.compute(h.hooks), n2;
        };
        Object.defineProperty(d, "_world", { value: h, writable: true }), d.tokenize = function(e2, t2) {
          const { compute: n2 } = this._world;
          t2 && d.addWords(t2);
          const r2 = c(e2, View, h);
          return n2.contractions && r2.compute(["alias", "normal", "machine", "contractions"]), r2;
        }, d.plugin = function(e2) {
          return l(e2, this._world, View, this), this;
        }, d.extend = d.plugin, d.world = function() {
          return this._world;
        }, d.model = function() {
          return this._world.model;
        }, d.methods = function() {
          return this._world.methods;
        }, d.hooks = function() {
          return this._world.hooks;
        }, d.verbose = function(e2) {
          const t2 = "undefined" != typeof process && process.env ? process.env : self.env || {};
          return t2.DEBUG_TAGS = "tagger" === e2 || true === e2 || "", t2.DEBUG_MATCH = "match" === e2 || true === e2 || "", t2.DEBUG_CHUNKS = "chunker" === e2 || true === e2 || "", this;
        }, d.version = "14.16.0";
        var m = { one: { cacheDoc: function(e2) {
          const t2 = e2.map((e3) => {
            const t3 = /* @__PURE__ */ new Set();
            return e3.forEach((e4) => {
              "" !== e4.normal && t3.add(e4.normal), e4.switch && t3.add(`%${e4.switch}%`), e4.implicit && t3.add(e4.implicit), e4.machine && t3.add(e4.machine), e4.root && t3.add(e4.root), e4.alias && e4.alias.forEach((e5) => t3.add(e5));
              const n2 = Array.from(e4.tags);
              for (let e5 = 0; e5 < n2.length; e5 += 1) t3.add("#" + n2[e5]);
            }), t3;
          });
          return t2;
        } } };
        const p = { cache: function() {
          return this._cache = this.methods.one.cacheDoc(this.document), this;
        }, uncache: function() {
          return this._cache = null, this;
        } };
        var f = { api: function(e2) {
          Object.assign(e2.prototype, p);
        }, compute: { cache: function(e2) {
          e2._cache = e2.methods.one.cacheDoc(e2.document);
        } }, methods: m };
        const b = (e2) => /^\p{Lu}[\p{Ll}'’]/u.test(e2) || /^\p{Lu}$/u.test(e2), v = (e2, t2, n2) => {
          if (n2.forEach((e3) => e3.dirty = true), e2) {
            const r2 = [t2, 0].concat(n2);
            Array.prototype.splice.apply(e2, r2);
          }
          return e2;
        }, y = function(e2) {
          const t2 = e2[e2.length - 1];
          !t2 || / $/.test(t2.post) || /[-–—]/.test(t2.post) || (t2.post += " ");
        }, w = (e2, t2, n2) => {
          const r2 = /[-.?!,;:)–—'"]/g, o2 = e2[t2 - 1];
          if (!o2) return;
          const a2 = o2.post;
          if (r2.test(a2)) {
            const e3 = a2.match(r2).join(""), t3 = n2[n2.length - 1];
            t3.post = e3 + t3.post, o2.post = o2.post.replace(r2, "");
          }
        }, k = function(e2, t2, n2, r2) {
          const [o2, a2, i2] = t2;
          0 === a2 || i2 === r2[o2].length ? y(n2) : (y(n2), y([e2[t2[1]]])), function(e3, t3, n3) {
            const r3 = e3[t3];
            if (0 !== t3 || !b(r3.text)) return;
            n3[0].text = n3[0].text.replace(/^\p{Ll}/u, (e4) => e4.toUpperCase());
            const o3 = e3[t3];
            o3.tags.has("ProperNoun") || o3.tags.has("Acronym") || b(o3.text) && o3.text.length > 1 && (o3.text = (a3 = o3.text, a3.replace(/^\p{Lu}/u, (e4) => e4.toLowerCase())));
            var a3;
          }(e2, a2, n2), v(e2, a2, n2);
        };
        let P = 0;
        const A = (e2) => (e2 = e2.length < 3 ? "0" + e2 : e2).length < 3 ? "0" + e2 : e2, N = function(e2) {
          let [t2, n2] = e2.index || [0, 0];
          P += 1, P = P > 46655 ? 0 : P, t2 = t2 > 46655 ? 0 : t2, n2 = n2 > 1294 ? 0 : n2;
          let r2 = A(P.toString(36));
          r2 += A(t2.toString(36));
          let o2 = n2.toString(36);
          o2 = o2.length < 2 ? "0" + o2 : o2, r2 += o2;
          return r2 += parseInt(36 * Math.random(), 10).toString(36), e2.normal + "|" + r2.toUpperCase();
        }, C = function(e2) {
          if (e2.has("@hasContraction") && "function" == typeof e2.contractions) {
            e2.grow("@hasContraction").contractions().expand();
          }
        }, j = (e2) => "[object Array]" === Object.prototype.toString.call(e2), x = function(e2, t2, n2) {
          const { document: r2, world: o2 } = t2;
          t2.uncache();
          const a2 = t2.fullPointer, i2 = t2.fullPointer;
          t2.forEach((s3, l2) => {
            const u2 = s3.fullPointer[0], [c2] = u2, h2 = r2[c2];
            let d2 = function(e3, t3) {
              const { methods: n3 } = t3;
              return "string" == typeof e3 ? n3.one.tokenize.fromString(e3, t3)[0] : "object" == typeof e3 && e3.isView ? e3.clone().docs[0] || [] : j(e3) ? j(e3[0]) ? e3[0] : e3 : [];
            }(e2, o2);
            0 !== d2.length && (d2 = function(e3) {
              return e3.map((e4) => (e4.id = N(e4), e4));
            }(d2), n2 ? (C(t2.update([u2]).firstTerm()), k(h2, u2, d2, r2)) : (C(t2.update([u2]).lastTerm()), function(e3, t3, n3, r3) {
              const [o3, , a3] = t3, i3 = (r3[o3] || []).length;
              a3 < i3 ? (w(e3, a3, n3), y(n3)) : i3 === a3 && (y(e3), w(e3, a3, n3), r3[o3 + 1] && (n3[n3.length - 1].post += " ")), v(e3, t3[2], n3), t3[4] = n3[n3.length - 1].id;
            }(h2, u2, d2, r2)), r2[c2] && r2[c2][u2[1]] && (u2[3] = r2[c2][u2[1]].id), i2[l2] = u2, u2[2] += d2.length, a2[l2] = u2);
          });
          const s2 = t2.toView(a2);
          return t2.ptrs = i2, s2.compute(["id", "index", "freeze", "lexicon"]), s2.world.compute.preTagger && s2.compute("preTagger"), s2.compute("unfreeze"), s2;
        }, I = { insertAfter: function(e2) {
          return x(e2, this, false);
        }, insertBefore: function(e2) {
          return x(e2, this, true);
        } };
        I.append = I.insertAfter, I.prepend = I.insertBefore, I.insert = I.insertAfter;
        const T = /\$[0-9a-z]+/g, D = {}, H = (e2) => e2.replace(/^\p{Ll}/u, (e3) => e3.toUpperCase()), E = (e2) => e2.replace(/^\p{Lu}/u, (e3) => e3.toLowerCase());
        D.replaceWith = function(e2, t2 = {}) {
          let n2 = this.fullPointer;
          true === t2 && (t2 = { tags: true, case: true, possessives: true });
          const r2 = this;
          if (this.uncache(), "function" == typeof e2) return function(e3, t3, n3) {
            return e3.forEach((e4) => {
              const r3 = t3(e4);
              e4.replaceWith(r3, n3);
            }), e3;
          }(r2, e2, t2);
          const o2 = r2.docs[0];
          if (!o2) return r2;
          const a2 = t2.possessives && o2[o2.length - 1].tags.has("Possessive"), i2 = t2.case && (s2 = o2[0].text, /^\p{Lu}[\p{Ll}'’]/u.test(s2) || /^\p{Lu}$/u.test(s2));
          var s2;
          e2 = function(e3, t3) {
            if ("string" != typeof e3) return e3;
            const n3 = t3.groups();
            return e3 = e3.replace(T, (e4) => {
              const t4 = e4.replace(/\$/, "");
              return n3.hasOwnProperty(t4) ? n3[t4].text() : e4;
            }), e3;
          }(e2, r2);
          const l2 = this.update(n2);
          n2 = n2.map((e3) => e3.slice(0, 3));
          let u2 = (l2.docs[0] || []).map((e3) => Array.from(e3.tags));
          const c2 = l2.docs[0][0].pre, h2 = l2.docs[0][l2.docs[0].length - 1].post;
          if ("string" == typeof e2 && (e2 = this.fromText(e2).compute("id")), r2.insertAfter(e2), l2.has("@hasContraction") && r2.contractions) {
            r2.grow("@hasContraction+").contractions().expand();
          }
          if (r2.delete(l2), a2) {
            const e3 = r2.docs[0], t3 = e3[e3.length - 1];
            t3.tags.has("Possessive") || (t3.text += "'s", t3.normal += "'s", t3.tags.add("Possessive"));
          }
          if (c2 && r2.docs[0] && (r2.docs[0][0].pre = c2), h2 && r2.docs[0]) {
            const e3 = r2.docs[0][r2.docs[0].length - 1];
            e3.post.trim() || (e3.post = h2);
          }
          const d2 = r2.toView(n2).compute(["index", "freeze", "lexicon"]);
          if (d2.world.compute.preTagger && d2.compute("preTagger"), d2.compute("unfreeze"), t2.tags && (u2 = u2.slice(0, e2.wordCount()), d2.terms().forEach((e3, t3) => {
            e3.tagSafe(u2[t3]);
          })), !d2.docs[0] || !d2.docs[0][0]) return d2;
          if (t2.case) {
            const e3 = i2 ? H : E;
            d2.docs[0][0].text = e3(d2.docs[0][0].text);
          }
          return d2;
        }, D.replace = function(e2, t2, n2) {
          if (e2 && !t2) return this.replaceWith(e2, n2);
          const r2 = this.match(e2);
          return r2.found ? (this.soften(), r2.replaceWith(t2, n2)) : this;
        };
        const G = { remove: function(e2) {
          const { indexN: t2 } = this.methods.one.pointer;
          this.uncache();
          let n2 = this.all(), r2 = this;
          e2 && (n2 = this, r2 = this.match(e2));
          const o2 = !n2.ptrs;
          if (r2.has("@hasContraction") && r2.contractions) {
            r2.grow("@hasContraction").contractions().expand();
          }
          let a2 = n2.fullPointer;
          const i2 = r2.fullPointer.reverse(), s2 = function(e3, t3) {
            t3.forEach((t4) => {
              const [n3, r3, o3] = t4, a3 = o3 - r3;
              e3[n3] && (o3 === e3[n3].length && o3 > 1 && function(e4, t5) {
                const n4 = e4.length - 1, r4 = e4[n4], o4 = e4[n4 - t5];
                o4 && r4 && (o4.post += r4.post, o4.post = o4.post.replace(/ +([.?!,;:])/, "$1"), o4.post = o4.post.replace(/[,;:]+([.?!])/, "$1"));
              }(e3[n3], a3), e3[n3].splice(r3, a3));
            });
            for (let t4 = e3.length - 1; t4 >= 0; t4 -= 1) if (0 === e3[t4].length && (e3.splice(t4, 1), t4 === e3.length && e3[t4 - 1])) {
              const n3 = e3[t4 - 1], r3 = n3[n3.length - 1];
              r3 && (r3.post = r3.post.trimEnd());
            }
            return e3;
          }(this.document, i2);
          if (a2 = function(e3, t3) {
            return e3 = e3.map((e4) => {
              const [n3] = e4;
              return t3[n3] ? (t3[n3].forEach((t4) => {
                const n4 = t4[2] - t4[1];
                e4[1] <= t4[1] && e4[2] >= t4[2] && (e4[2] -= n4);
              }), e4) : e4;
            }), e3.forEach((t4, n3) => {
              if (0 === t4[1] && 0 == t4[2]) for (let t5 = n3 + 1; t5 < e3.length; t5 += 1) e3[t5][0] -= 1, e3[t5][0] < 0 && (e3[t5][0] = 0);
            }), e3 = (e3 = e3.filter((e4) => e4[2] - e4[1] > 0)).map((e4) => (e4[3] = null, e4[4] = null, e4));
          }(a2, t2(i2)), n2.ptrs = a2, n2.document = s2, n2.compute("index"), o2 && (n2.ptrs = void 0), !e2) return this.ptrs = [], n2.none();
          return n2.toView(a2);
        } };
        G.delete = G.remove;
        const O = { pre: function(e2, t2) {
          return void 0 === e2 && this.found ? this.docs[0][0].pre : (this.docs.forEach((n2) => {
            const r2 = n2[0];
            true === t2 ? r2.pre += e2 : r2.pre = e2;
          }), this);
        }, post: function(e2, t2) {
          if (void 0 === e2) {
            const e3 = this.docs[this.docs.length - 1];
            return e3[e3.length - 1].post;
          }
          return this.docs.forEach((n2) => {
            const r2 = n2[n2.length - 1];
            true === t2 ? r2.post += e2 : r2.post = e2;
          }), this;
        }, trim: function() {
          if (!this.found) return this;
          const e2 = this.docs, t2 = e2[0][0];
          t2.pre = t2.pre.trimStart();
          const n2 = e2[e2.length - 1], r2 = n2[n2.length - 1];
          return r2.post = r2.post.trimEnd(), this;
        }, hyphenate: function() {
          return this.docs.forEach((e2) => {
            e2.forEach((t2, n2) => {
              0 !== n2 && (t2.pre = ""), e2[n2 + 1] && (t2.post = "-");
            });
          }), this;
        }, dehyphenate: function() {
          const e2 = /[-–—]/;
          return this.docs.forEach((t2) => {
            t2.forEach((t3) => {
              e2.test(t3.post) && (t3.post = " ");
            });
          }), this;
        }, toQuotations: function(e2, t2) {
          return e2 = e2 || '"', t2 = t2 || '"', this.docs.forEach((n2) => {
            n2[0].pre = e2 + n2[0].pre;
            const r2 = n2[n2.length - 1];
            r2.post = t2 + r2.post;
          }), this;
        }, toParentheses: function(e2, t2) {
          return e2 = e2 || "(", t2 = t2 || ")", this.docs.forEach((n2) => {
            n2[0].pre = e2 + n2[0].pre;
            const r2 = n2[n2.length - 1];
            r2.post = t2 + r2.post;
          }), this;
        } };
        O.deHyphenate = O.dehyphenate, O.toQuotation = O.toQuotations;
        var F = { alpha: (e2, t2) => e2.normal < t2.normal ? -1 : e2.normal > t2.normal ? 1 : 0, length: (e2, t2) => {
          const n2 = e2.normal.trim().length, r2 = t2.normal.trim().length;
          return n2 < r2 ? 1 : n2 > r2 ? -1 : 0;
        }, wordCount: (e2, t2) => e2.words < t2.words ? 1 : e2.words > t2.words ? -1 : 0, sequential: (e2, t2) => e2[0] < t2[0] ? 1 : e2[0] > t2[0] ? -1 : e2[1] > t2[1] ? 1 : -1, byFreq: function(e2) {
          const t2 = {};
          return e2.forEach((e3) => {
            t2[e3.normal] = t2[e3.normal] || 0, t2[e3.normal] += 1;
          }), e2.sort((e3, n2) => {
            const r2 = t2[e3.normal], o2 = t2[n2.normal];
            return r2 < o2 ? 1 : r2 > o2 ? -1 : 0;
          }), e2;
        } };
        const V = /* @__PURE__ */ new Set(["index", "sequence", "seq", "sequential", "chron", "chronological"]), z = /* @__PURE__ */ new Set(["freq", "frequency", "topk", "repeats"]), B = /* @__PURE__ */ new Set(["alpha", "alphabetical"]);
        var S = { unique: function() {
          const e2 = /* @__PURE__ */ new Set(), t2 = this.filter((t3) => {
            const n2 = t3.text("machine");
            return !e2.has(n2) && (e2.add(n2), true);
          });
          return t2;
        }, reverse: function() {
          let e2 = this.pointer || this.docs.map((e3, t2) => [t2]);
          return e2 = [].concat(e2), e2 = e2.reverse(), this._cache && (this._cache = this._cache.reverse()), this.update(e2);
        }, sort: function(e2) {
          const { docs: t2, pointer: n2 } = this;
          if (this.uncache(), "function" == typeof e2) return function(e3, t3) {
            let n3 = e3.fullPointer;
            return n3 = n3.sort((n4, r3) => (n4 = e3.update([n4]), r3 = e3.update([r3]), t3(n4, r3))), e3.ptrs = n3, e3;
          }(this, e2);
          e2 = e2 || "alpha";
          const r2 = n2 || t2.map((e3, t3) => [t3]);
          let o2 = t2.map((e3, t3) => ({ index: t3, words: e3.length, normal: e3.map((e4) => e4.machine || e4.normal || "").join(" "), pointer: r2[t3] }));
          return V.has(e2) && (e2 = "sequential"), B.has(e2) && (e2 = "alpha"), z.has(e2) ? (o2 = F.byFreq(o2), this.update(o2.map((e3) => e3.pointer))) : "function" == typeof F[e2] ? (o2 = o2.sort(F[e2]), this.update(o2.map((e3) => e3.pointer))) : this;
        } };
        const $ = function(e2, t2) {
          if (e2.length > 0) {
            const t3 = e2[e2.length - 1], n2 = t3[t3.length - 1];
            false === / /.test(n2.post) && (n2.post += " ");
          }
          return e2 = e2.concat(t2);
        };
        var M = { concat: function(e2) {
          if ("string" == typeof e2) {
            const t3 = this.fromText(e2);
            if (this.found && this.ptrs) {
              const e3 = this.fullPointer, n2 = e3[e3.length - 1][0];
              this.document.splice(n2, 0, ...t3.document);
            } else this.document = this.document.concat(t3.document);
            return this.all().compute("index");
          }
          if ("object" == typeof e2 && e2.isView) return function(e3, t3) {
            if (e3.document === t3.document) {
              const n2 = e3.fullPointer.concat(t3.fullPointer);
              return e3.toView(n2).compute("index");
            }
            return t3.fullPointer.forEach((t4) => {
              t4[0] += e3.document.length;
            }), e3.document = $(e3.document, t3.docs), e3.all();
          }(this, e2);
          if (t2 = e2, "[object Array]" === Object.prototype.toString.call(t2)) {
            const t3 = $(this.document, e2);
            return this.document = t3, this.all();
          }
          var t2;
          return this;
        } };
        var K = { harden: function() {
          return this.ptrs = this.fullPointer, this;
        }, soften: function() {
          let e2 = this.ptrs;
          return !e2 || e2.length < 1 || (e2 = e2.map((e3) => e3.slice(0, 3)), this.ptrs = e2), this;
        } };
        const L = Object.assign({}, { toLowerCase: function() {
          return this.termList().forEach((e2) => {
            e2.text = e2.text.toLowerCase();
          }), this;
        }, toUpperCase: function() {
          return this.termList().forEach((e2) => {
            e2.text = e2.text.toUpperCase();
          }), this;
        }, toTitleCase: function() {
          return this.termList().forEach((e2) => {
            e2.text = e2.text.replace(/^ *[a-z\u00C0-\u00FF]/, (e3) => e3.toUpperCase());
          }), this;
        }, toCamelCase: function() {
          return this.docs.forEach((e2) => {
            e2.forEach((t2, n2) => {
              0 !== n2 && (t2.text = t2.text.replace(/^ *[a-z\u00C0-\u00FF]/, (e3) => e3.toUpperCase())), n2 !== e2.length - 1 && (t2.post = "");
            });
          }), this;
        } }, I, D, G, O, S, M, K), J = { id: function(e2) {
          const t2 = e2.docs;
          for (let e3 = 0; e3 < t2.length; e3 += 1) for (let n2 = 0; n2 < t2[e3].length; n2 += 1) {
            const r2 = t2[e3][n2];
            r2.id = r2.id || N(r2);
          }
        } };
        var W = { api: function(e2) {
          Object.assign(e2.prototype, L);
        }, compute: J };
        const q = true;
        var U = { one: { contractions: [{ word: "@", out: ["at"] }, { word: "arent", out: ["are", "not"] }, { word: "alot", out: ["a", "lot"] }, { word: "brb", out: ["be", "right", "back"] }, { word: "cannot", out: ["can", "not"] }, { word: "dun", out: ["do", "not"] }, { word: "can't", out: ["can", "not"] }, { word: "shan't", out: ["should", "not"] }, { word: "won't", out: ["will", "not"] }, { word: "that's", out: ["that", "is"] }, { word: "what's", out: ["what", "is"] }, { word: "let's", out: ["let", "us"] }, { word: "dunno", out: ["do", "not", "know"] }, { word: "gonna", out: ["going", "to"] }, { word: "gotta", out: ["have", "got", "to"] }, { word: "gimme", out: ["give", "me"] }, { word: "outta", out: ["out", "of"] }, { word: "tryna", out: ["trying", "to"] }, { word: "gtg", out: ["got", "to", "go"] }, { word: "im", out: ["i", "am"] }, { word: "imma", out: ["I", "will"] }, { word: "imo", out: ["in", "my", "opinion"] }, { word: "irl", out: ["in", "real", "life"] }, { word: "ive", out: ["i", "have"] }, { word: "rn", out: ["right", "now"] }, { word: "tbh", out: ["to", "be", "honest"] }, { word: "wanna", out: ["want", "to"] }, { word: "c'mere", out: ["come", "here"] }, { word: "c'mon", out: ["come", "on"] }, { word: "shoulda", out: ["should", "have"] }, { word: "coulda", out: ["coulda", "have"] }, { word: "woulda", out: ["woulda", "have"] }, { word: "musta", out: ["must", "have"] }, { word: "tis", out: ["it", "is"] }, { word: "twas", out: ["it", "was"] }, { word: "y'know", out: ["you", "know"] }, { word: "ne'er", out: ["never"] }, { word: "o'er", out: ["over"] }, { after: "ll", out: ["will"] }, { after: "ve", out: ["have"] }, { after: "re", out: ["are"] }, { after: "m", out: ["am"] }, { before: "c", out: ["ce"] }, { before: "m", out: ["me"] }, { before: "n", out: ["ne"] }, { before: "qu", out: ["que"] }, { before: "s", out: ["se"] }, { before: "t", out: ["tu"] }, { word: "shouldnt", out: ["should", "not"] }, { word: "couldnt", out: ["could", "not"] }, { word: "wouldnt", out: ["would", "not"] }, { word: "hasnt", out: ["has", "not"] }, { word: "wasnt", out: ["was", "not"] }, { word: "isnt", out: ["is", "not"] }, { word: "cant", out: ["can", "not"] }, { word: "dont", out: ["do", "not"] }, { word: "wont", out: ["will", "not"] }, { word: "howd", out: ["how", "did"] }, { word: "whatd", out: ["what", "did"] }, { word: "whend", out: ["when", "did"] }, { word: "whered", out: ["where", "did"] }], numberSuffixes: { st: q, nd: q, rd: q, th: q, am: q, pm: q, max: q, "\xB0": q, s: q, e: q, er: q, "\xE8re": q, "\xE8me": q } } };
        const R = function(e2, t2, n2) {
          const [r2, o2] = t2;
          n2 && 0 !== n2.length && (n2 = n2.map((e3, t3) => (e3.implicit = e3.text, e3.machine = e3.text, e3.pre = "", e3.post = "", e3.text = "", e3.normal = "", e3.index = [r2, o2 + t3], e3)), n2[0] && (n2[0].pre = e2[r2][o2].pre, n2[n2.length - 1].post = e2[r2][o2].post, n2[0].text = e2[r2][o2].text, n2[0].normal = e2[r2][o2].normal), e2[r2].splice(o2, 1, ...n2));
        }, Q = /'/, _ = /* @__PURE__ */ new Set(["what", "how", "when", "where", "why"]), Z = /* @__PURE__ */ new Set(["be", "go", "start", "think", "need"]), X = /* @__PURE__ */ new Set(["been", "gone"]), Y = /'/, ee = /(e|é|aison|sion|tion)$/, te = /(age|isme|acle|ege|oire)$/;
        var ne = (e2, t2) => ["je", e2[t2].normal.split(Y)[1]], re = (e2, t2) => {
          const n2 = e2[t2].normal.split(Y)[1];
          return n2 && n2.endsWith("e") ? ["la", n2] : ["le", n2];
        }, oe = (e2, t2) => {
          const n2 = e2[t2].normal.split(Y)[1];
          return n2 && ee.test(n2) && !te.test(n2) ? ["du", n2] : n2 && n2.endsWith("s") ? ["des", n2] : ["de", n2];
        };
        const ae = /^([0-9.]{1,4}[a-z]{0,2}) ?[-–—] ?([0-9]{1,4}[a-z]{0,2})$/i, ie = /^([0-9]{1,2}(:[0-9][0-9])?(am|pm)?) ?[-–—] ?([0-9]{1,2}(:[0-9][0-9])?(am|pm)?)$/i, se = /^[0-9]{3}-[0-9]{4}$/, le = function(e2, t2) {
          const n2 = e2[t2];
          let r2 = n2.text.match(ae);
          return null !== r2 ? true === n2.tags.has("PhoneNumber") || se.test(n2.text) ? null : [r2[1], "to", r2[2]] : (r2 = n2.text.match(ie), null !== r2 ? [r2[1], "to", r2[4]] : null);
        }, ue = /^([+-]?[0-9][.,0-9]*)([a-z°²³µ/]+)$/, ce = function(e2, t2, n2) {
          const r2 = n2.model.one.numberSuffixes || {}, o2 = e2[t2].text.match(ue);
          if (null !== o2) {
            const e3 = o2[2].toLowerCase().trim();
            return r2.hasOwnProperty(e3) ? null : [o2[1], e3];
          }
          return null;
        }, he = /'/, de = /^[0-9][^-–—]*[-–—].*?[0-9]/, ge = function(e2, t2, n2, r2) {
          const o2 = t2.update();
          o2.document = [e2];
          let a2 = n2 + r2;
          n2 > 0 && (n2 -= 1), e2[a2] && (a2 += 1), o2.ptrs = [[0, n2, a2]];
        }, me = { t: (e2, t2) => function(e3, t3) {
          return "ain't" === e3[t3].normal || "aint" === e3[t3].normal ? null : [e3[t3].normal.replace(/n't/, ""), "not"];
        }(e2, t2), d: (e2, t2) => function(e3, t3) {
          const n2 = e3[t3].normal.split(Q)[0];
          if (_.has(n2)) return [n2, "did"];
          if (e3[t3 + 1]) {
            if (X.has(e3[t3 + 1].normal)) return [n2, "had"];
            if (Z.has(e3[t3 + 1].normal)) return [n2, "would"];
          }
          return null;
        }(e2, t2) }, pe = { j: (e2, t2) => ne(e2, t2), l: (e2, t2) => re(e2, t2), d: (e2, t2) => oe(e2, t2) }, fe = function(e2, t2, n2, r2) {
          for (let o2 = 0; o2 < e2.length; o2 += 1) {
            const a2 = e2[o2];
            if (a2.word === t2.normal) return a2.out;
            if (null !== r2 && r2 === a2.after) return [n2].concat(a2.out);
            if (null !== n2 && n2 === a2.before && r2 && r2.length > 2) return a2.out.concat(r2);
          }
          return null;
        }, be = function(e2, t2) {
          const n2 = t2.fromText(e2.join(" "));
          return n2.compute(["id", "alias"]), n2.docs[0];
        }, ve = function(e2, t2) {
          for (let n2 = t2 + 1; n2 < 5 && e2[n2]; n2 += 1) if ("been" === e2[n2].normal) return ["there", "has"];
          return ["there", "is"];
        };
        var ye = { contractions: (e2) => {
          const { world: t2, document: n2 } = e2, { model: r2, methods: o2 } = t2, a2 = r2.one.contractions || [];
          n2.forEach((r3, i2) => {
            for (let s2 = r3.length - 1; s2 >= 0; s2 -= 1) {
              let l2 = null, u2 = null;
              if (true === he.test(r3[s2].normal)) {
                const e3 = r3[s2].normal.split(he);
                l2 = e3[0], u2 = e3[1];
              }
              let c2 = fe(a2, r3[s2], l2, u2);
              !c2 && me.hasOwnProperty(u2) && (c2 = me[u2](r3, s2, t2)), !c2 && pe.hasOwnProperty(l2) && (c2 = pe[l2](r3, s2)), "there" === l2 && "s" === u2 && (c2 = ve(r3, s2)), c2 ? (c2 = be(c2, e2), R(n2, [i2, s2], c2), ge(n2[i2], e2, s2, c2.length)) : de.test(r3[s2].normal) ? (c2 = le(r3, s2), c2 && (c2 = be(c2, e2), R(n2, [i2, s2], c2), o2.one.setTag(c2, "NumberRange", t2), c2[2] && c2[2].tags.has("Time") && o2.one.setTag([c2[0]], "Time", t2, null, "time-range"), ge(n2[i2], e2, s2, c2.length))) : (c2 = ce(r3, s2, t2), c2 && (c2 = be(c2, e2), R(n2, [i2, s2], c2), o2.one.setTag([c2[1]], "Unit", t2, null, "contraction-unit")));
            }
          });
        } };
        const we = { model: U, compute: ye, hooks: ["contractions"] }, ke = function(e2) {
          const t2 = e2.world, { model: n2, methods: r2 } = e2.world, o2 = r2.one.setTag, { frozenLex: a2 } = n2.one, i2 = n2.one._multiCache || {};
          e2.docs.forEach((e3) => {
            for (let n3 = 0; n3 < e3.length; n3 += 1) {
              const r3 = e3[n3], s2 = r3.machine || r3.normal;
              if (void 0 !== i2[s2] && e3[n3 + 1]) {
                for (let r4 = n3 + i2[s2] - 1; r4 > n3; r4 -= 1) {
                  const i3 = e3.slice(n3, r4 + 1), s3 = i3.map((e4) => e4.machine || e4.normal).join(" ");
                  true !== a2.hasOwnProperty(s3) || (o2(i3, a2[s3], t2, false, "1-frozen-multi-lexicon"), i3.forEach((e4) => e4.frozen = true));
                }
              }
              void 0 !== a2[s2] && a2.hasOwnProperty(s2) && (o2([r3], a2[s2], t2, false, "1-freeze-lexicon"), r3.frozen = true);
            }
          });
        };
        const Pe = (e2) => "\x1B[34m" + e2 + "\x1B[0m", Ae = (e2) => "\x1B[3m\x1B[2m" + e2 + "\x1B[0m", Ne = function(e2) {
          e2.docs.forEach((e3) => {
            console.log(Pe("\n  \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500")), e3.forEach((e4) => {
              let t2 = `  ${Ae("\u2502")}  `;
              const n2 = e4.implicit || e4.text || "-";
              true === e4.frozen ? t2 += `${Pe(n2)} \u2744\uFE0F` : t2 += Ae(n2), console.log(t2);
            });
          });
        };
        var Ce = { compute: { frozen: ke, freeze: ke, unfreeze: function(e2) {
          return e2.docs.forEach((e3) => {
            e3.forEach((e4) => {
              delete e4.frozen;
            });
          }), e2;
        } }, mutate: (e2) => {
          const t2 = e2.methods.one;
          t2.termMethods.isFrozen = (e3) => true === e3.frozen, t2.debug.freeze = Ne, t2.debug.frozen = Ne;
        }, api: function(e2) {
          e2.prototype.freeze = function() {
            return this.docs.forEach((e3) => {
              e3.forEach((e4) => {
                e4.frozen = true;
              });
            }), this;
          }, e2.prototype.unfreeze = function() {
            this.compute("unfreeze");
          }, e2.prototype.isFrozen = function() {
            return this.match("@isFrozen+");
          };
        }, hooks: ["freeze"] };
        const je = function(e2, t2, n2) {
          const { model: r2, methods: o2 } = n2, a2 = o2.one.setTag, i2 = r2.one._multiCache || {}, { lexicon: s2 } = r2.one || {}, l2 = e2[t2], u2 = l2.machine || l2.normal;
          if (void 0 !== i2[u2] && e2[t2 + 1]) {
            for (let r3 = t2 + i2[u2] - 1; r3 > t2; r3 -= 1) {
              const o3 = e2.slice(t2, r3 + 1);
              if (o3.length <= 1) return false;
              const i3 = o3.map((e3) => e3.machine || e3.normal).join(" ");
              if (true === s2.hasOwnProperty(i3)) {
                const e3 = s2[i3];
                return a2(o3, e3, n2, false, "1-multi-lexicon"), !e3 || 2 !== e3.length || "PhrasalVerb" !== e3[0] && "PhrasalVerb" !== e3[1] || a2([o3[1]], "Particle", n2, false, "1-phrasal-particle"), true;
              }
            }
            return false;
          }
          return null;
        }, xe = /^(under|over|mis|re|un|dis|semi|pre|post)-?/, Ie = /* @__PURE__ */ new Set(["Verb", "Infinitive", "PastTense", "Gerund", "PresentTense", "Adjective", "Participle"]), Te = function(e2, t2, n2) {
          const { model: r2, methods: o2 } = n2, a2 = o2.one.setTag, { lexicon: i2 } = r2.one, s2 = e2[t2], l2 = s2.machine || s2.normal;
          if (void 0 !== i2[l2] && i2.hasOwnProperty(l2)) return a2([s2], i2[l2], n2, false, "1-lexicon"), true;
          if (s2.alias) {
            const e3 = s2.alias.find((e4) => i2.hasOwnProperty(e4));
            if (e3) return a2([s2], i2[e3], n2, false, "1-lexicon-alias"), true;
          }
          if (true === xe.test(l2)) {
            const e3 = l2.replace(xe, "");
            if (i2.hasOwnProperty(e3) && e3.length > 3 && Ie.has(i2[e3])) return a2([s2], i2[e3], n2, false, "1-lexicon-prefix"), true;
          }
          return null;
        };
        var De = { lexicon: function(e2) {
          const t2 = e2.world;
          e2.docs.forEach((e3) => {
            for (let n2 = 0; n2 < e3.length; n2 += 1) if (0 === e3[n2].tags.size) {
              let r2 = null;
              r2 = r2 || je(e3, n2, t2), r2 = r2 || Te(e3, n2, t2);
            }
          });
        } };
        var He = { one: { expandLexicon: function(e2) {
          const t2 = {}, n2 = {};
          return Object.keys(e2).forEach((r2) => {
            const o2 = e2[r2], a2 = (r2 = (r2 = r2.toLowerCase().trim()).replace(/'s\b/, "")).split(/ /);
            a2.length > 1 && (void 0 === n2[a2[0]] || a2.length > n2[a2[0]]) && (n2[a2[0]] = a2.length), t2[r2] = t2[r2] || o2;
          }), delete t2[""], delete t2.null, delete t2[" "], { lex: t2, _multi: n2 };
        } } };
        var Ee = { addWords: function(e2, t2 = false) {
          const n2 = this.world(), { methods: r2, model: o2 } = n2;
          if (!e2) return;
          if (Object.keys(e2).forEach((t3) => {
            "string" == typeof e2[t3] && e2[t3].startsWith("#") && (e2[t3] = e2[t3].replace(/^#/, ""));
          }), true === t2) {
            const { lex: t3, _multi: a3 } = r2.one.expandLexicon(e2, n2);
            return Object.assign(o2.one._multiCache, a3), void Object.assign(o2.one.frozenLex, t3);
          }
          if (r2.two.expandLexicon) {
            const { lex: t3, _multi: a3 } = r2.two.expandLexicon(e2, n2);
            Object.assign(o2.one.lexicon, t3), Object.assign(o2.one._multiCache, a3);
          }
          const { lex: a2, _multi: i2 } = r2.one.expandLexicon(e2, n2);
          Object.assign(o2.one.lexicon, a2), Object.assign(o2.one._multiCache, i2);
        } };
        var Ge = { model: { one: { lexicon: {}, _multiCache: {}, frozenLex: {} } }, methods: He, compute: De, lib: Ee, hooks: ["lexicon"] };
        const Oe = function(e2, t2) {
          const n2 = [{}], r2 = [null], o2 = [0], a2 = [];
          let i2 = 0;
          e2.forEach(function(e3) {
            let o3 = 0;
            const a3 = function(e4, t3) {
              const { methods: n3, model: r3 } = t3, o4 = n3.one.tokenize.splitTerms(e4, r3).map((e5) => n3.one.tokenize.splitWhitespace(e5, r3));
              return o4.map((e5) => e5.text.toLowerCase());
            }(e3, t2);
            for (let e4 = 0; e4 < a3.length; e4++) {
              const t3 = a3[e4];
              n2[o3] && n2[o3].hasOwnProperty(t3) ? o3 = n2[o3][t3] : (i2++, n2[o3][t3] = i2, n2[i2] = {}, o3 = i2, r2[i2] = null);
            }
            r2[o3] = [a3.length];
          });
          for (const e3 in n2[0]) i2 = n2[0][e3], o2[i2] = 0, a2.push(i2);
          for (; a2.length; ) {
            const e3 = a2.shift(), t3 = Object.keys(n2[e3]);
            for (let s2 = 0; s2 < t3.length; s2 += 1) {
              const l2 = t3[s2], u2 = n2[e3][l2];
              for (a2.push(u2), i2 = o2[e3]; i2 > 0 && !n2[i2].hasOwnProperty(l2); ) i2 = o2[i2];
              if (n2.hasOwnProperty(i2)) {
                const e4 = n2[i2][l2];
                o2[u2] = e4, r2[e4] && (r2[u2] = r2[u2] || [], r2[u2] = r2[u2].concat(r2[e4]));
              } else o2[u2] = 0;
            }
          }
          return { goNext: n2, endAs: r2, failTo: o2 };
        }, Fe = function(e2, t2, n2) {
          let r2 = 0;
          const o2 = [];
          for (let a2 = 0; a2 < e2.length; a2++) {
            const i2 = e2[a2][n2.form] || e2[a2].normal;
            for (; r2 > 0 && (void 0 === t2.goNext[r2] || !t2.goNext[r2].hasOwnProperty(i2)); ) r2 = t2.failTo[r2] || 0;
            if (t2.goNext[r2].hasOwnProperty(i2) && (r2 = t2.goNext[r2][i2], t2.endAs[r2])) {
              const n3 = t2.endAs[r2];
              for (let t3 = 0; t3 < n3.length; t3++) {
                const r3 = n3[t3], i3 = e2[a2 - r3 + 1], [s2, l2] = i3.index;
                o2.push([s2, l2, l2 + r3, i3.id]);
              }
            }
          }
          return o2;
        }, Ve = function(e2, t2) {
          for (let n2 = 0; n2 < e2.length; n2 += 1) if (true === t2.has(e2[n2])) return false;
          return true;
        };
        const ze = (e2, t2) => {
          for (let n2 = e2.length - 1; n2 >= 0; n2 -= 1) if (e2[n2] !== t2) return e2 = e2.slice(0, n2 + 1);
          return e2;
        }, Be = { buildTrie: function(e2) {
          return function(e3) {
            return e3.goNext = e3.goNext.map((e4) => {
              if (0 !== Object.keys(e4).length) return e4;
            }), e3.goNext = ze(e3.goNext, void 0), e3.failTo = ze(e3.failTo, 0), e3.endAs = ze(e3.endAs, null), e3;
          }(Oe(e2, this.world()));
        } };
        Be.compile = Be.buildTrie;
        var Se = { api: function(e2) {
          e2.prototype.lookup = function(e3, t2 = {}) {
            if (!e3) return this.none();
            "string" == typeof e3 && (e3 = [e3]);
            var n2;
            let r2 = function(e4, t3, n3) {
              let r3 = [];
              n3.form = n3.form || "normal";
              const o2 = e4.docs;
              if (!t3.goNext || !t3.goNext[0]) return console.error("Compromise invalid lookup trie"), e4.none();
              const a2 = Object.keys(t3.goNext[0]);
              for (let i2 = 0; i2 < o2.length; i2++) {
                if (e4._cache && e4._cache[i2] && true === Ve(a2, e4._cache[i2])) continue;
                const s2 = o2[i2], l2 = Fe(s2, t3, n3);
                l2.length > 0 && (r3 = r3.concat(l2));
              }
              return e4.update(r3);
            }(this, (n2 = e3, "[object Object]" === Object.prototype.toString.call(n2) ? e3 : Oe(e3, this.world)), t2);
            return r2 = r2.settle(), r2;
          };
        }, lib: Be };
        const $e = function(e2, t2) {
          return t2 ? (e2.forEach((e3) => {
            const n2 = e3[0];
            t2[n2] && (e3[0] = t2[n2][0], e3[1] += t2[n2][1], e3[2] += t2[n2][1]);
          }), e2) : e2;
        }, Me = function(e2, t2) {
          let { ptrs: n2 } = e2;
          const { byGroup: r2 } = e2;
          return n2 = $e(n2, t2), Object.keys(r2).forEach((e3) => {
            r2[e3] = $e(r2[e3], t2);
          }), { ptrs: n2, byGroup: r2 };
        }, Ke = function(e2, t2, n2) {
          const r2 = n2.methods.one;
          return "number" == typeof e2 && (e2 = String(e2)), "string" == typeof e2 && (e2 = r2.killUnicode(e2, n2), e2 = r2.parseMatch(e2, t2, n2)), e2;
        }, Le = (e2) => "[object Object]" === Object.prototype.toString.call(e2), Je = (e2) => e2 && Le(e2) && true === e2.isView, We = (e2) => e2 && Le(e2) && true === e2.isNet;
        var qe = { matchOne: function(e2, t2, n2) {
          const r2 = this.methods.one;
          if (Je(e2)) return this.intersection(e2).eq(0);
          if (We(e2)) return this.sweep(e2, { tagger: false, matchOne: true }).view;
          const o2 = { regs: e2 = Ke(e2, n2, this.world), group: t2, justOne: true }, a2 = r2.match(this.docs, o2, this._cache), { ptrs: i2, byGroup: s2 } = Me(a2, this.fullPointer), l2 = this.toView(i2);
          return l2._groups = s2, l2;
        }, match: function(e2, t2, n2) {
          const r2 = this.methods.one;
          if (Je(e2)) return this.intersection(e2);
          if (We(e2)) return this.sweep(e2, { tagger: false }).view.settle();
          const o2 = { regs: e2 = Ke(e2, n2, this.world), group: t2 }, a2 = r2.match(this.docs, o2, this._cache), { ptrs: i2, byGroup: s2 } = Me(a2, this.fullPointer), l2 = this.toView(i2);
          return l2._groups = s2, l2;
        }, has: function(e2, t2, n2) {
          const r2 = this.methods.one;
          if (Je(e2)) {
            return this.intersection(e2).fullPointer.length > 0;
          }
          if (We(e2)) return this.sweep(e2, { tagger: false }).view.found;
          const o2 = { regs: e2 = Ke(e2, n2, this.world), group: t2, justOne: true };
          return r2.match(this.docs, o2, this._cache).ptrs.length > 0;
        }, if: function(e2, t2, n2) {
          const r2 = this.methods.one;
          if (Je(e2)) return this.filter((t3) => t3.intersection(e2).found);
          if (We(e2)) {
            const t3 = this.sweep(e2, { tagger: false }).view.settle();
            return this.if(t3);
          }
          const o2 = { regs: e2 = Ke(e2, n2, this.world), group: t2, justOne: true };
          let a2 = this.fullPointer;
          const i2 = this._cache || [];
          a2 = a2.filter((e3, t3) => {
            const n3 = this.update([e3]);
            return r2.match(n3.docs, o2, i2[t3]).ptrs.length > 0;
          });
          const s2 = this.update(a2);
          return this._cache && (s2._cache = a2.map((e3) => i2[e3[0]])), s2;
        }, ifNo: function(e2, t2, n2) {
          const { methods: r2 } = this, o2 = r2.one;
          if (Je(e2)) return this.filter((t3) => !t3.intersection(e2).found);
          if (We(e2)) {
            const t3 = this.sweep(e2, { tagger: false }).view.settle();
            return this.ifNo(t3);
          }
          e2 = Ke(e2, n2, this.world);
          const a2 = this._cache || [], i2 = this.filter((n3, r3) => {
            const i3 = { regs: e2, group: t2, justOne: true };
            return 0 === o2.match(n3.docs, i3, a2[r3]).ptrs.length;
          });
          return this._cache && (i2._cache = i2.ptrs.map((e3) => a2[e3[0]])), i2;
        } };
        var Ue = { before: function(e2, t2, n2) {
          const { indexN: r2 } = this.methods.one.pointer, o2 = [], a2 = r2(this.fullPointer);
          Object.keys(a2).forEach((e3) => {
            const t3 = a2[e3].sort((e4, t4) => e4[1] > t4[1] ? 1 : -1)[0];
            t3[1] > 0 && o2.push([t3[0], 0, t3[1]]);
          });
          const i2 = this.toView(o2);
          return e2 ? i2.match(e2, t2, n2) : i2;
        }, after: function(e2, t2, n2) {
          const { indexN: r2 } = this.methods.one.pointer, o2 = [], a2 = r2(this.fullPointer), i2 = this.document;
          Object.keys(a2).forEach((e3) => {
            const t3 = a2[e3].sort((e4, t4) => e4[1] > t4[1] ? -1 : 1)[0], [n3, , r3] = t3;
            r3 < i2[n3].length && o2.push([n3, r3, i2[n3].length]);
          });
          const s2 = this.toView(o2);
          return e2 ? s2.match(e2, t2, n2) : s2;
        }, growLeft: function(e2, t2, n2) {
          "string" == typeof e2 && (e2 = this.world.methods.one.parseMatch(e2, n2, this.world)), e2[e2.length - 1].end = true;
          const r2 = this.fullPointer;
          return this.forEach((n3, o2) => {
            const a2 = n3.before(e2, t2);
            if (a2.found) {
              const e3 = a2.terms();
              r2[o2][1] -= e3.length, r2[o2][3] = e3.docs[0][0].id;
            }
          }), this.update(r2);
        }, growRight: function(e2, t2, n2) {
          "string" == typeof e2 && (e2 = this.world.methods.one.parseMatch(e2, n2, this.world)), e2[0].start = true;
          const r2 = this.fullPointer;
          return this.forEach((n3, o2) => {
            const a2 = n3.after(e2, t2);
            if (a2.found) {
              const e3 = a2.terms();
              r2[o2][2] += e3.length, r2[o2][4] = null;
            }
          }), this.update(r2);
        }, grow: function(e2, t2, n2) {
          return this.growRight(e2, t2, n2).growLeft(e2, t2, n2);
        } };
        const Re = function(e2, t2) {
          return [e2[0], e2[1], t2[2]];
        }, Qe = (e2, t2, n2) => {
          return "string" == typeof e2 || (r2 = e2, "[object Array]" === Object.prototype.toString.call(r2)) ? t2.match(e2, n2) : e2 || t2.none();
          var r2;
        }, _e = function(e2, t2) {
          const [n2, r2, o2] = e2;
          return t2.document[n2] && t2.document[n2][r2] && (e2[3] = e2[3] || t2.document[n2][r2].id, t2.document[n2][o2 - 1] && (e2[4] = e2[4] || t2.document[n2][o2 - 1].id)), e2;
        }, Ze = { splitOn: function(e2, t2) {
          const { splitAll: n2 } = this.methods.one.pointer, r2 = Qe(e2, this, t2).fullPointer, o2 = n2(this.fullPointer, r2);
          let a2 = [];
          return o2.forEach((e3) => {
            a2.push(e3.passthrough), a2.push(e3.before), a2.push(e3.match), a2.push(e3.after);
          }), a2 = a2.filter((e3) => e3), a2 = a2.map((e3) => _e(e3, this)), this.update(a2);
        }, splitBefore: function(e2, t2) {
          const { splitAll: n2 } = this.methods.one.pointer, r2 = Qe(e2, this, t2).fullPointer, o2 = n2(this.fullPointer, r2);
          for (let e3 = 0; e3 < o2.length; e3 += 1) !o2[e3].after && o2[e3 + 1] && o2[e3 + 1].before && o2[e3].match && o2[e3].match[0] === o2[e3 + 1].before[0] && (o2[e3].after = o2[e3 + 1].before, delete o2[e3 + 1].before);
          let a2 = [];
          return o2.forEach((e3) => {
            a2.push(e3.passthrough), a2.push(e3.before), e3.match && e3.after ? a2.push(Re(e3.match, e3.after)) : a2.push(e3.match);
          }), a2 = a2.filter((e3) => e3), a2 = a2.map((e3) => _e(e3, this)), this.update(a2);
        }, splitAfter: function(e2, t2) {
          const { splitAll: n2 } = this.methods.one.pointer, r2 = Qe(e2, this, t2).fullPointer, o2 = n2(this.fullPointer, r2);
          let a2 = [];
          return o2.forEach((e3) => {
            a2.push(e3.passthrough), e3.before && e3.match ? a2.push(Re(e3.before, e3.match)) : (a2.push(e3.before), a2.push(e3.match)), a2.push(e3.after);
          }), a2 = a2.filter((e3) => e3), a2 = a2.map((e3) => _e(e3, this)), this.update(a2);
        } };
        Ze.split = Ze.splitAfter;
        const Xe = function(e2, t2) {
          return !(!e2 || !t2) && (e2[0] === t2[0] && e2[2] === t2[1]);
        }, Ye = function(e2, t2, n2) {
          const r2 = e2.world, o2 = r2.methods.one.parseMatch;
          n2 = n2 || "^.";
          const a2 = o2(t2 = t2 || ".$", {}, r2), i2 = o2(n2, {}, r2);
          a2[a2.length - 1].end = true, i2[0].start = true;
          const s2 = e2.fullPointer, l2 = [s2[0]];
          for (let t3 = 1; t3 < s2.length; t3 += 1) {
            const n3 = l2[l2.length - 1], r3 = s2[t3], o3 = e2.update([n3]), u2 = e2.update([r3]);
            Xe(n3, r3) && o3.has(a2) && u2.has(i2) ? l2[l2.length - 1] = [n3[0], n3[1], r3[2], n3[3], r3[4]] : l2.push(r3);
          }
          return e2.update(l2);
        }, et = { joinIf: function(e2, t2) {
          return Ye(this, e2, t2);
        }, join: function() {
          return Ye(this);
        } }, tt = Object.assign({}, qe, Ue, Ze, et);
        tt.lookBehind = tt.before, tt.lookBefore = tt.before, tt.lookAhead = tt.after, tt.lookAfter = tt.after, tt.notIf = tt.ifNo;
        const nt = /(?:^|\s)([![^]*(?:<[^<]*>)?\/.*?[^\\/]\/[?\]+*$~]*)(?:\s|$)/, rt = /([!~[^]*(?:<[^<]*>)?\([^)]+[^\\)]\)[?\]+*$~]*)(?:\s|$)/, ot = / /g, at = (e2) => /^[![^]*(<[^<]*>)?\//.test(e2) && /\/[?\]+*$~]*$/.test(e2), it = function(e2) {
          return e2 = (e2 = e2.map((e3) => e3.trim())).filter((e3) => e3);
        }, st = /\{([0-9]+)?(, *[0-9]*)?\}/, lt = /&&/, ut = new RegExp(/^<\s*(\S+)\s*>/), ct = (e2) => e2.charAt(0).toUpperCase() + e2.substring(1), ht = (e2) => e2.charAt(e2.length - 1), dt = (e2) => e2.charAt(0), gt = (e2) => e2.substring(1), mt = (e2) => e2.substring(0, e2.length - 1), pt = function(e2) {
          return e2 = gt(e2), e2 = mt(e2);
        }, ft = function(e2, t2) {
          const n2 = {};
          for (let r2 = 0; r2 < 2; r2 += 1) {
            if ("$" === ht(e2) && (n2.end = true, e2 = mt(e2)), "^" === dt(e2) && (n2.start = true, e2 = gt(e2)), "?" === ht(e2) && (n2.optional = true, e2 = mt(e2)), ("[" === dt(e2) || "]" === ht(e2)) && (n2.group = null, "[" === dt(e2) && (n2.groupStart = true), "]" === ht(e2) && (n2.groupEnd = true), e2 = (e2 = e2.replace(/^\[/, "")).replace(/\]$/, ""), "<" === dt(e2))) {
              const t3 = ut.exec(e2);
              t3.length >= 2 && (n2.group = t3[1], e2 = e2.replace(t3[0], ""));
            }
            if ("+" === ht(e2) && (n2.greedy = true, e2 = mt(e2)), "*" !== e2 && "*" === ht(e2) && "\\*" !== e2 && (n2.greedy = true, e2 = mt(e2)), "!" === dt(e2) && (n2.negative = true, e2 = gt(e2)), "~" === dt(e2) && "~" === ht(e2) && e2.length > 2 && (e2 = pt(e2), n2.fuzzy = true, n2.min = t2.fuzzy || 0.85, false === /\(/.test(e2))) return n2.word = e2, n2;
            if ("/" === dt(e2) && "/" === ht(e2)) return e2 = pt(e2), t2.caseSensitive && (n2.use = "text"), n2.regex = new RegExp(e2), n2;
            if (true === st.test(e2) && (e2 = e2.replace(st, (e3, t3, r3) => (void 0 === r3 ? (n2.min = Number(t3), n2.max = Number(t3)) : (r3 = r3.replace(/, */, ""), void 0 === t3 ? (n2.min = 0, n2.max = Number(r3)) : (n2.min = Number(t3), n2.max = Number(r3 || 999))), n2.greedy = true, n2.min || (n2.optional = true), ""))), "(" === dt(e2) && ")" === ht(e2)) {
              lt.test(e2) ? (n2.choices = e2.split(lt), n2.operator = "and") : (n2.choices = e2.split("|"), n2.operator = "or"), n2.choices[0] = gt(n2.choices[0]);
              const r3 = n2.choices.length - 1;
              n2.choices[r3] = mt(n2.choices[r3]), n2.choices = n2.choices.map((e3) => e3.trim()), n2.choices = n2.choices.filter((e3) => e3), n2.choices = n2.choices.map((e3) => e3.split(/ /g).map((e4) => ft(e4, t2))), e2 = "";
            }
            if ("{" === dt(e2) && "}" === ht(e2)) {
              if (e2 = pt(e2), n2.root = e2, /\//.test(e2)) {
                const e3 = n2.root.split(/\//);
                n2.root = e3[0], n2.pos = e3[1], "adj" === n2.pos && (n2.pos = "Adjective"), n2.pos = n2.pos.charAt(0).toUpperCase() + n2.pos.substr(1).toLowerCase(), void 0 !== e3[2] && (n2.sense = e3[2]);
              }
              return n2;
            }
            if ("<" === dt(e2) && ">" === ht(e2)) return e2 = pt(e2), n2.chunk = ct(e2), n2.greedy = true, n2;
            if ("%" === dt(e2) && "%" === ht(e2)) return e2 = pt(e2), n2.switch = e2, n2;
          }
          return "#" === dt(e2) ? (n2.tag = gt(e2), n2.tag = ct(n2.tag), n2) : "@" === dt(e2) ? (n2.method = gt(e2), n2) : "." === e2 ? (n2.anything = true, n2) : "*" === e2 ? (n2.anything = true, n2.greedy = true, n2.optional = true, n2) : (e2 && (e2 = (e2 = e2.replace("\\*", "*")).replace("\\.", "."), t2.caseSensitive ? n2.use = "text" : e2 = e2.toLowerCase(), n2.word = e2), n2);
        }, bt = /[a-z0-9][-–—][a-z]/i, vt = function(e2, t2) {
          const { all: n2 } = t2.methods.two.transform.verb || {}, r2 = e2.root;
          return n2 ? n2(r2, t2.model) : [];
        }, yt = function(e2, t2) {
          const { all: n2 } = t2.methods.two.transform.noun || {};
          return n2 ? n2(e2.root, t2.model) : [e2.root];
        }, wt = function(e2, t2) {
          const { all: n2 } = t2.methods.two.transform.adjective || {};
          return n2 ? n2(e2.root, t2.model) : [e2.root];
        }, kt = function(e2) {
          return e2 = function(e3) {
            let t2 = 0, n2 = null;
            for (let r2 = 0; r2 < e3.length; r2++) {
              const o2 = e3[r2];
              true === o2.groupStart && (n2 = o2.group, null === n2 && (n2 = String(t2), t2 += 1)), null !== n2 && (o2.group = n2), true === o2.groupEnd && (n2 = null);
            }
            return e3;
          }(e2), e2 = function(e3) {
            return e3.map((e4) => (e4.fuzzy && e4.choices && e4.choices.forEach((t2) => {
              1 === t2.length && t2[0].word && (t2[0].fuzzy = true, t2[0].min = e4.min);
            }), e4));
          }(e2 = e2.map((e3) => {
            if (void 0 !== e3.choices) {
              if ("or" !== e3.operator) return e3;
              if (true === e3.fuzzy) return e3;
              true === e3.choices.every((e4) => {
                if (1 !== e4.length) return false;
                const t2 = e4[0];
                return true !== t2.fuzzy && !t2.start && !t2.end && void 0 !== t2.word && true !== t2.negative && true !== t2.optional && true !== t2.method;
              }) && (e3.fastOr = /* @__PURE__ */ new Set(), e3.choices.forEach((t2) => {
                e3.fastOr.add(t2[0].word);
              }), delete e3.choices);
            }
            return e3;
          })), e2;
        }, Pt = function(e2, t2) {
          for (const n2 of t2) if (e2.has(n2)) return true;
          return false;
        }, At = function(e2, t2) {
          for (let n2 = 0; n2 < e2.length; n2 += 1) {
            const r2 = e2[n2];
            if (true !== r2.optional && true !== r2.negative && true !== r2.fuzzy) {
              if (void 0 !== r2.word && false === t2.has(r2.word)) return true;
              if (void 0 !== r2.tag && false === t2.has("#" + r2.tag)) return true;
              if (r2.fastOr && false === Pt(r2.fastOr, t2)) return false;
            }
          }
          return false;
        }, Nt = function(e2, t2, n2 = 3) {
          if (e2 === t2) return 1;
          if (e2.length < n2 || t2.length < n2) return 0;
          const r2 = function(e3, t3) {
            const n3 = e3.length, r3 = t3.length;
            if (0 === n3) return r3;
            if (0 === r3) return n3;
            const o3 = (r3 > n3 ? r3 : n3) + 1;
            if (Math.abs(n3 - r3) > (o3 || 100)) return o3 || 100;
            const a2 = [];
            for (let e4 = 0; e4 < o3; e4++) a2[e4] = [e4], a2[e4].length = o3;
            for (let e4 = 0; e4 < o3; e4++) a2[0][e4] = e4;
            let i2, s2, l2, u2, c2, h2;
            for (let o4 = 1; o4 <= n3; ++o4) for (s2 = e3[o4 - 1], i2 = 1; i2 <= r3; ++i2) {
              if (o4 === i2 && a2[o4][i2] > 4) return n3;
              l2 = t3[i2 - 1], u2 = s2 === l2 ? 0 : 1, c2 = a2[o4 - 1][i2] + 1, (h2 = a2[o4][i2 - 1] + 1) < c2 && (c2 = h2), (h2 = a2[o4 - 1][i2 - 1] + u2) < c2 && (c2 = h2);
              const r4 = o4 > 1 && i2 > 1 && s2 === t3[i2 - 2] && e3[o4 - 2] === l2 && (h2 = a2[o4 - 2][i2 - 2] + u2) < c2;
              a2[o4][i2] = r4 ? h2 : c2;
            }
            return a2[n3][r3];
          }(e2, t2), o2 = Math.max(e2.length, t2.length);
          return 1 - (0 === o2 ? 0 : r2 / o2);
        }, Ct = /([\u0022\uFF02\u0027\u201C\u2018\u201F\u201B\u201E\u2E42\u201A\u00AB\u2039\u2035\u2036\u2037\u301D\u0060\u301F])/, jt = /([\u0022\uFF02\u0027\u201D\u2019\u00BB\u203A\u2032\u2033\u2034\u301E\u00B4])/, xt = /^[-–—]$/, It = / [-–—]{1,3} /, Tt = (e2, t2) => -1 !== e2.post.indexOf(t2), Dt = { hasQuote: (e2) => Ct.test(e2.pre) || jt.test(e2.post), hasComma: (e2) => Tt(e2, ","), hasPeriod: (e2) => true === Tt(e2, ".") && false === Tt(e2, "..."), hasExclamation: (e2) => Tt(e2, "!"), hasQuestionMark: (e2) => Tt(e2, "?") || Tt(e2, "\xBF"), hasEllipses: (e2) => Tt(e2, "..") || Tt(e2, "\u2026"), hasSemicolon: (e2) => Tt(e2, ";"), hasColon: (e2) => Tt(e2, ":"), hasSlash: (e2) => /\//.test(e2.text), hasHyphen: (e2) => xt.test(e2.post) || xt.test(e2.pre), hasDash: (e2) => It.test(e2.post) || It.test(e2.pre), hasContraction: (e2) => Boolean(e2.implicit), isAcronym: (e2) => e2.tags.has("Acronym"), isKnown: (e2) => e2.tags.size > 0, isTitleCase: (e2) => /^\p{Lu}[a-z'\u00C0-\u00FF]/u.test(e2.text), isUpperCase: (e2) => /^\p{Lu}+$/u.test(e2.text) };
        Dt.hasQuotation = Dt.hasQuote;
        let Ht = function() {
        };
        Ht = function(e2, t2, n2, r2) {
          const o2 = function(e3, t3, n3, r3) {
            if (true === t3.anything) return true;
            if (true === t3.start && 0 !== n3) return false;
            if (true === t3.end && n3 !== r3 - 1) return false;
            if (void 0 !== t3.id && t3.id === e3.id) return true;
            if (void 0 !== t3.word) {
              if (t3.use) return t3.word === e3[t3.use];
              if (null !== e3.machine && e3.machine === t3.word) return true;
              if (void 0 !== e3.alias && e3.alias.hasOwnProperty(t3.word)) return true;
              if (true === t3.fuzzy) {
                if (t3.word === e3.root) return true;
                if (Nt(t3.word, e3.normal) >= t3.min) return true;
              }
              return !(!e3.alias || !e3.alias.some((e4) => e4 === t3.word)) || t3.word === e3.text || t3.word === e3.normal;
            }
            if (void 0 !== t3.tag) return true === e3.tags.has(t3.tag);
            if (void 0 !== t3.method) return "function" == typeof Dt[t3.method] && true === Dt[t3.method](e3);
            if (void 0 !== t3.pre) return e3.pre && e3.pre.includes(t3.pre);
            if (void 0 !== t3.post) return e3.post && e3.post.includes(t3.post);
            if (void 0 !== t3.regex) {
              let n4 = e3.normal;
              return t3.use && (n4 = e3[t3.use]), t3.regex.test(n4);
            }
            if (void 0 !== t3.chunk) return e3.chunk === t3.chunk;
            if (void 0 !== t3.switch) return e3.switch === t3.switch;
            if (void 0 !== t3.machine) return e3.normal === t3.machine || e3.machine === t3.machine || e3.root === t3.machine;
            if (void 0 !== t3.sense) return e3.sense === t3.sense;
            if (void 0 !== t3.fastOr) {
              if (t3.pos && !e3.tags.has(t3.pos)) return null;
              const n4 = e3.root || e3.implicit || e3.machine || e3.normal;
              return t3.fastOr.has(n4) || t3.fastOr.has(e3.text);
            }
            return void 0 !== t3.choices && ("and" === t3.operator ? t3.choices.every((t4) => Ht(e3, t4, n3, r3)) : t3.choices.some((t4) => Ht(e3, t4, n3, r3)));
          }(e2, t2, n2, r2);
          return true === t2.negative ? !o2 : o2;
        };
        const Et = function(e2, t2) {
          if (true === e2.end && true === e2.greedy && t2.start_i + t2.t < t2.phrase_length - 1) {
            const n2 = Object.assign({}, e2, { end: false });
            if (true === Ht(t2.terms[t2.t], n2, t2.start_i + t2.t, t2.phrase_length)) return true;
          }
          return false;
        }, Gt = function(e2, t2) {
          return e2.groups[e2.inGroup] || (e2.groups[e2.inGroup] = { start: t2, length: 0 }), e2.groups[e2.inGroup];
        }, Ot = function(e2) {
          const { regs: t2 } = e2, n2 = t2[e2.r], r2 = function(e3, t3) {
            let n3 = e3.t;
            if (!t3) return e3.terms.length;
            for (; n3 < e3.terms.length; n3 += 1) if (true === Ht(e3.terms[n3], t3, e3.start_i + n3, e3.phrase_length)) return n3;
            return null;
          }(e2, t2[e2.r + 1]);
          if (null === r2 || 0 === r2) return null;
          if (void 0 !== n2.min && r2 - e2.t < n2.min) return null;
          if (void 0 !== n2.max && r2 - e2.t > n2.max) return e2.t = e2.t + n2.max, true;
          if (true === e2.hasGroup) {
            Gt(e2, e2.t).length = r2 - e2.t;
          }
          return e2.t = r2, true;
        }, Ft = function(e2, t2 = 0) {
          const n2 = e2.regs[e2.r];
          let r2 = false;
          for (let a2 = 0; a2 < n2.choices.length; a2 += 1) {
            const i2 = n2.choices[a2];
            if (o2 = i2, "[object Array]" !== Object.prototype.toString.call(o2)) return false;
            if (r2 = i2.every((n3, r3) => {
              let o3 = 0;
              const a3 = e2.t + r3 + t2 + o3;
              if (void 0 === e2.terms[a3]) return false;
              const i3 = Ht(e2.terms[a3], n3, a3 + e2.start_i, e2.phrase_length);
              if (true === i3 && true === n3.greedy) for (let t3 = 1; t3 < e2.terms.length; t3 += 1) {
                const r4 = e2.terms[a3 + t3];
                if (r4) {
                  if (true !== Ht(r4, n3, e2.start_i + t3, e2.phrase_length)) break;
                  o3 += 1;
                }
              }
              return t2 += o3, i3;
            }), r2) {
              t2 += i2.length;
              break;
            }
          }
          var o2;
          return r2 && true === n2.greedy ? Ft(e2, t2) : t2;
        }, Vt = function(e2) {
          const { regs: t2 } = e2, n2 = t2[e2.r], r2 = Ft(e2);
          if (r2) {
            if (true === n2.negative) return null;
            if (true === e2.hasGroup) {
              Gt(e2, e2.t).length += r2;
            }
            if (true === n2.end) {
              const t3 = e2.phrase_length;
              if (e2.t + e2.start_i + r2 !== t3) return null;
            }
            return e2.t += r2, true;
          }
          return !!n2.optional || null;
        }, zt = function(e2) {
          const { regs: t2 } = e2, n2 = t2[e2.r], r2 = function(e3) {
            let t3 = 0;
            return true === e3.regs[e3.r].choices.every((n3) => {
              const r3 = n3.every((t4, n4) => {
                const r4 = e3.t + n4;
                return void 0 !== e3.terms[r4] && Ht(e3.terms[r4], t4, r4, e3.phrase_length);
              });
              return true === r3 && n3.length > t3 && (t3 = n3.length), r3;
            }) && t3;
          }(e2);
          if (r2) {
            if (true === n2.negative) return null;
            if (true === e2.hasGroup) {
              Gt(e2, e2.t).length += r2;
            }
            if (true === n2.end) {
              const t3 = e2.phrase_length - 1;
              if (e2.t + e2.start_i !== t3) return null;
            }
            return e2.t += r2, true;
          }
          return !!n2.optional || null;
        }, Bt = function(e2) {
          const { regs: t2 } = e2, n2 = t2[e2.r], r2 = Object.assign({}, n2);
          r2.negative = false;
          if (Ht(e2.terms[e2.t], r2, e2.start_i + e2.t, e2.phrase_length)) return false;
          if (n2.optional) {
            const n3 = t2[e2.r + 1];
            if (n3) {
              if (Ht(e2.terms[e2.t], n3, e2.start_i + e2.t, e2.phrase_length)) e2.r += 1;
              else if (n3.optional && t2[e2.r + 2]) {
                Ht(e2.terms[e2.t], t2[e2.r + 2], e2.start_i + e2.t, e2.phrase_length) && (e2.r += 2);
              }
            }
          }
          return n2.greedy ? function(e3, t3, n3) {
            let r3 = 0;
            for (let o2 = e3.t; o2 < e3.terms.length; o2 += 1) {
              let a2 = Ht(e3.terms[o2], t3, e3.start_i + e3.t, e3.phrase_length);
              if (a2) break;
              if (n3 && (a2 = Ht(e3.terms[o2], n3, e3.start_i + e3.t, e3.phrase_length), a2)) break;
              if (r3 += 1, void 0 !== t3.max && r3 === t3.max) break;
            }
            return !(0 === r3 || t3.min && t3.min > r3 || (e3.t += r3, 0));
          }(e2, r2, t2[e2.r + 1]) : (e2.t += 1, true);
        }, St = function(e2) {
          const { regs: t2, phrase_length: n2 } = e2, r2 = t2[e2.r];
          return e2.t = function(e3, t3) {
            const n3 = Object.assign({}, e3.regs[e3.r], { start: false, end: false }), r3 = e3.t;
            for (; e3.t < e3.terms.length; e3.t += 1) {
              if (t3 && Ht(e3.terms[e3.t], t3, e3.start_i + e3.t, e3.phrase_length)) return e3.t;
              const o2 = e3.t - r3 + 1;
              if (void 0 !== n3.max && o2 === n3.max) return e3.t;
              if (false === Ht(e3.terms[e3.t], n3, e3.start_i + e3.t, e3.phrase_length)) return void 0 !== n3.min && o2 < n3.min ? null : e3.t;
            }
            return e3.t;
          }(e2, t2[e2.r + 1]), null === e2.t || r2.min && r2.min > e2.t ? null : true !== r2.end || e2.start_i + e2.t === n2 || null;
        }, $t = function(e2) {
          const { regs: t2 } = e2, n2 = t2[e2.r], r2 = e2.terms[e2.t], o2 = e2.t;
          if (n2.optional && t2[e2.r + 1] && n2.negative) return true;
          if (n2.optional && t2[e2.r + 1] && function(e3) {
            const { regs: t3 } = e3, n3 = t3[e3.r], r3 = e3.terms[e3.t], o3 = Ht(r3, t3[e3.r + 1], e3.start_i + e3.t, e3.phrase_length);
            if (n3.negative || o3) {
              const n4 = e3.terms[e3.t + 1];
              n4 && Ht(n4, t3[e3.r + 1], e3.start_i + e3.t, e3.phrase_length) || (e3.r += 1);
            }
          }(e2), r2.implicit && e2.terms[e2.t + 1] && function(e3) {
            const t3 = e3.terms[e3.t], n3 = e3.regs[e3.r];
            if (t3.implicit && e3.terms[e3.t + 1]) {
              if (!e3.terms[e3.t + 1].implicit) return;
              n3.word === t3.normal && (e3.t += 1), "hasContraction" === n3.method && (e3.t += 1);
            }
          }(e2), e2.t += 1, true === n2.end && e2.t !== e2.terms.length && true !== n2.greedy) return null;
          if (true === n2.greedy) {
            if (!St(e2)) return null;
          }
          return true === e2.hasGroup && function(e3, t3) {
            const n3 = e3.regs[e3.r], r3 = Gt(e3, t3);
            e3.t > 1 && n3.greedy ? r3.length += e3.t - t3 : r3.length++;
          }(e2, o2), true;
        }, Mt = function(e2, t2, n2, r2) {
          if (0 === e2.length || 0 === t2.length) return null;
          const o2 = { t: 0, terms: e2, r: 0, regs: t2, groups: {}, start_i: n2, phrase_length: r2, inGroup: null };
          for (; o2.r < t2.length; o2.r += 1) {
            const e3 = t2[o2.r];
            if (o2.hasGroup = Boolean(e3.group), true === o2.hasGroup ? o2.inGroup = e3.group : o2.inGroup = null, !o2.terms[o2.t]) {
              if (false === t2.slice(o2.r).some((e4) => !e4.optional)) break;
              return null;
            }
            if (true === e3.anything && true === e3.greedy) {
              if (!Ot(o2)) return null;
              continue;
            }
            if (void 0 !== e3.choices && "or" === e3.operator) {
              if (!Vt(o2)) return null;
              continue;
            }
            if (void 0 !== e3.choices && "and" === e3.operator) {
              if (!zt(o2)) return null;
              continue;
            }
            if (true === e3.anything) {
              if (e3.negative && e3.anything) return null;
              if (!$t(o2)) return null;
              continue;
            }
            if (true === Et(e3, o2)) {
              if (!$t(o2)) return null;
              continue;
            }
            if (e3.negative) {
              if (!Bt(o2)) return null;
              continue;
            }
            if (true !== Ht(o2.terms[o2.t], e3, o2.start_i + o2.t, o2.phrase_length)) {
              if (true !== e3.optional) return null;
            } else {
              if (!$t(o2)) return null;
            }
          }
          const a2 = [null, n2, o2.t + n2];
          if (a2[1] === a2[2]) return null;
          const i2 = {};
          return Object.keys(o2.groups).forEach((e3) => {
            const t3 = o2.groups[e3], r3 = n2 + t3.start;
            i2[e3] = [null, r3, r3 + t3.length];
          }), { pointer: a2, groups: i2 };
        }, Kt = function(e2, t2) {
          return e2.pointer[0] = t2, Object.keys(e2.groups).forEach((n2) => {
            e2.groups[n2][0] = t2;
          }), e2;
        }, Lt = function(e2, t2, n2) {
          let r2 = Mt(e2, t2, 0, e2.length);
          return r2 ? (r2 = Kt(r2, n2), r2) : null;
        }, Jt = { one: { termMethods: Dt, parseMatch: function(e2, t2, n2) {
          if (null == e2 || "" === e2) return [];
          t2 = t2 || {}, "number" == typeof e2 && (e2 = String(e2));
          let r2 = function(e3) {
            const t3 = e3.split(nt);
            let n3 = [];
            t3.forEach((e4) => {
              at(e4) ? n3.push(e4) : n3 = n3.concat(e4.split(rt));
            }), n3 = it(n3);
            let r3 = [];
            return n3.forEach((e4) => {
              ((e5) => /^[![^]*(<[^<]*>)?\(/.test(e5) && /\)[?\]+*$~]*$/.test(e5))(e4) || at(e4) ? r3.push(e4) : r3 = r3.concat(e4.split(ot));
            }), r3 = it(r3), r3;
          }(e2);
          return r2 = r2.map((e3) => ft(e3, t2)), r2 = function(e3, t3) {
            const n3 = t3.model.one.prefixes;
            for (let t4 = e3.length - 1; t4 >= 0; t4 -= 1) {
              const r3 = e3[t4];
              if (r3.word && bt.test(r3.word)) {
                let o2 = r3.word.split(/[-–—]/g);
                if (n3.hasOwnProperty(o2[0])) continue;
                o2 = o2.filter((e4) => e4).reverse(), e3.splice(t4, 1), o2.forEach((n4) => {
                  const o3 = Object.assign({}, r3);
                  o3.word = n4, e3.splice(t4, 0, o3);
                });
              }
            }
            return e3;
          }(r2, n2), r2 = function(e3, t3) {
            return e3.map((e4) => {
              if (e4.root) if (t3.methods.two && t3.methods.two.transform) {
                let n3 = [];
                e4.pos ? "Verb" === e4.pos ? n3 = n3.concat(vt(e4, t3)) : "Noun" === e4.pos ? n3 = n3.concat(yt(e4, t3)) : "Adjective" === e4.pos && (n3 = n3.concat(wt(e4, t3))) : (n3 = n3.concat(vt(e4, t3)), n3 = n3.concat(yt(e4, t3)), n3 = n3.concat(wt(e4, t3))), n3 = n3.filter((e5) => e5), n3.length > 0 && (e4.operator = "or", e4.fastOr = new Set(n3));
              } else e4.machine = e4.root, delete e4.id, delete e4.root;
              return e4;
            });
          }(r2, n2), r2 = kt(r2), r2;
        }, match: function(e2, t2, n2) {
          n2 = n2 || [];
          const { regs: r2, group: o2, justOne: a2 } = t2;
          let i2 = [];
          if (!r2 || 0 === r2.length) return { ptrs: [], byGroup: {} };
          const s2 = r2.filter((e3) => true !== e3.optional && true !== e3.negative).length;
          e: for (let t3 = 0; t3 < e2.length; t3 += 1) {
            const o3 = e2[t3];
            if (!n2[t3] || !At(r2, n2[t3])) if (true !== r2[0].start) for (let e3 = 0; e3 < o3.length; e3 += 1) {
              const n3 = o3.slice(e3);
              if (n3.length < s2) break;
              let l2 = Mt(n3, r2, e3, o3.length);
              if (l2) {
                if (l2 = Kt(l2, t3), i2.push(l2), true === a2) break e;
                const n4 = l2.pointer[2];
                Math.abs(n4 - 1) > e3 && (e3 = Math.abs(n4 - 1));
              }
            }
            else {
              const e3 = Lt(o3, r2, t3);
              e3 && i2.push(e3);
            }
          }
          return true === r2[r2.length - 1].end && (i2 = i2.filter((t3) => {
            const n3 = t3.pointer[0];
            return e2[n3].length === t3.pointer[2];
          })), t2.notIf && (i2 = function(e3, t3, n3) {
            return e3 = e3.filter((e4) => {
              const [r3, o3, a3] = e4.pointer, i3 = n3[r3].slice(o3, a3);
              for (let e5 = 0; e5 < i3.length; e5 += 1) {
                const n4 = i3.slice(e5);
                if (null !== Mt(n4, t3, e5, i3.length)) return false;
              }
              return true;
            }), e3;
          }(i2, t2.notIf, e2)), i2 = function(e3, t3) {
            const n3 = [], r3 = {};
            return 0 === e3.length || ("number" == typeof t3 && (t3 = String(t3)), t3 ? e3.forEach((e4) => {
              e4.groups[t3] && n3.push(e4.groups[t3]);
            }) : e3.forEach((e4) => {
              n3.push(e4.pointer), Object.keys(e4.groups).forEach((t4) => {
                r3[t4] = r3[t4] || [], r3[t4].push(e4.groups[t4]);
              });
            })), { ptrs: n3, byGroup: r3 };
          }(i2, o2), i2.ptrs.forEach((t3) => {
            const [n3, r3, o3] = t3;
            t3[3] = e2[n3][r3].id, t3[4] = e2[n3][o3 - 1].id;
          }), i2;
        } } };
        var Wt = { api: function(e2) {
          Object.assign(e2.prototype, tt);
        }, methods: Jt, lib: { parseMatch: function(e2, t2) {
          const n2 = this.world(), r2 = n2.methods.one.killUnicode;
          return r2 && (e2 = r2(e2, n2)), n2.methods.one.parseMatch(e2, t2, n2);
        } } };
        const qt = /^\../, Ut = /^#./, Rt = function(e2, t2) {
          const n2 = {}, r2 = {};
          return Object.keys(t2).forEach((o2) => {
            let a2 = t2[o2];
            const i2 = function(e3) {
              let t3 = "", n3 = "</span>";
              return e3 = e3.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;"), qt.test(e3) ? t3 = `<span class="${e3.replace(/^\./, "")}"` : Ut.test(e3) ? t3 = `<span id="${e3.replace(/^#/, "")}"` : (t3 = `<${e3}`, n3 = `</${e3}>`), t3 += ">", { start: t3, end: n3 };
            }(o2);
            "string" == typeof a2 && (a2 = e2.match(a2)), a2.docs.forEach((e3) => {
              if (e3.every((e4) => e4.implicit)) return;
              const t3 = e3[0].id;
              n2[t3] = n2[t3] || [], n2[t3].push(i2.start);
              const o3 = e3[e3.length - 1].id;
              r2[o3] = r2[o3] || [], r2[o3].push(i2.end);
            });
          }), { starts: n2, ends: r2 };
        };
        var Qt = { html: function(e2) {
          const { starts: t2, ends: n2 } = Rt(this, e2);
          let r2 = "";
          return this.docs.forEach((e3) => {
            for (let o2 = 0; o2 < e3.length; o2 += 1) {
              const a2 = e3[o2];
              t2.hasOwnProperty(a2.id) && (r2 += t2[a2.id].join("")), r2 += a2.pre || "", r2 += a2.text || "", n2.hasOwnProperty(a2.id) && (r2 += n2[a2.id].join("")), r2 += a2.post || "";
            }
          }), r2;
        } };
        const _t = /[,:;)\]*.?~!\u0022\uFF02\u201D\u2019\u00BB\u203A\u2032\u2033\u2034\u301E\u00B4—-]+$/, Zt = /^[(['"*~\uFF02\u201C\u2018\u201F\u201B\u201E\u2E42\u201A\u00AB\u2039\u2035\u2036\u2037\u301D\u0060\u301F]+/, Xt = /[,:;)('"\u201D\]]/, Yt = /^[-–—]$/, en = / /, tn = function(e2, t2, n2 = true) {
          let r2 = "";
          return e2.forEach((e3) => {
            let n3 = e3.pre || "", o2 = e3.post || "";
            "some" === t2.punctuation && (n3 = n3.replace(Zt, ""), Yt.test(o2) && (o2 = " "), o2 = o2.replace(Xt, ""), o2 = o2.replace(/\?!+/, "?"), o2 = o2.replace(/!+/, "!"), o2 = o2.replace(/\?+/, "?"), o2 = o2.replace(/\.{2,}/, ""), e3.tags.has("Abbreviation") && (o2 = o2.replace(/\./, ""))), "some" === t2.whitespace && (n3 = n3.replace(/\s/, ""), o2 = o2.replace(/\s+/, " ")), t2.keepPunct || (n3 = n3.replace(Zt, ""), o2 = "-" === o2 ? " " : o2.replace(_t, ""));
            let a2 = e3[t2.form || "text"] || e3.normal || "";
            "implicit" === t2.form && (a2 = e3.implicit || e3.text), "root" === t2.form && e3.implicit && (a2 = e3.root || e3.implicit || e3.normal), "machine" !== t2.form && "implicit" !== t2.form && "root" !== t2.form || !e3.implicit || o2 && en.test(o2) || (o2 += " "), r2 += n3 + a2 + o2;
          }), false === n2 && (r2 = r2.trim()), true === t2.lowerCase && (r2 = r2.toLowerCase()), r2;
        }, nn = { text: { form: "text" }, normal: { whitespace: "some", punctuation: "some", case: "some", unicode: "some", form: "normal" }, machine: { keepSpace: false, whitespace: "some", punctuation: "some", case: "none", unicode: "some", form: "machine" }, root: { keepSpace: false, whitespace: "some", punctuation: "some", case: "some", unicode: "some", form: "root" }, implicit: { form: "implicit" } };
        nn.clean = nn.normal, nn.reduced = nn.root;
        const rn = [];
        let on = 0;
        for (; on < 64; ) rn[on] = 0 | 4294967296 * Math.sin(++on % Math.PI);
        const an = function(e2) {
          let t2, n2, r2, o2 = decodeURI(encodeURI(e2)) + "\x80", a2 = o2.length;
          const i2 = [t2 = 1732584193, n2 = 4023233417, ~t2, ~n2], s2 = [];
          for (e2 = --a2 / 4 + 2 | 15, s2[--e2] = 8 * a2; ~a2; ) s2[a2 >> 2] |= o2.charCodeAt(a2) << 8 * a2--;
          for (on = o2 = 0; on < e2; on += 16) {
            for (a2 = i2; o2 < 64; a2 = [r2 = a2[3], t2 + ((r2 = a2[0] + [t2 & n2 | ~t2 & r2, r2 & t2 | ~r2 & n2, t2 ^ n2 ^ r2, n2 ^ (t2 | ~r2)][a2 = o2 >> 4] + rn[o2] + ~~s2[on | 15 & [o2, 5 * o2 + 1, 3 * o2 + 5, 7 * o2][a2]]) << (a2 = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * a2 + o2++ % 4]) | r2 >>> -a2), t2, n2]) t2 = 0 | a2[1], n2 = a2[2];
            for (o2 = 4; o2; ) i2[--o2] += a2[o2];
          }
          for (e2 = ""; o2 < 32; ) e2 += (i2[o2 >> 3] >> 4 * (1 ^ o2++) & 15).toString(16);
          return e2;
        }, sn = { text: true, terms: true }, ln = { case: "none", unicode: "some", form: "machine", punctuation: "some" }, un = function(e2, t2) {
          return Object.assign({}, e2, t2);
        }, cn = { text: (e2) => tn(e2, { keepPunct: true }, false), normal: (e2) => tn(e2, un(nn.normal, { keepPunct: true }), false), implicit: (e2) => tn(e2, un(nn.implicit, { keepPunct: true }), false), machine: (e2) => tn(e2, ln, false), root: (e2) => tn(e2, un(ln, { form: "root" }), false), hash: (e2) => an(tn(e2, { keepPunct: true }, false)), offset: (e2) => {
          const t2 = cn.text(e2).length;
          return { index: e2[0].offset.index, start: e2[0].offset.start, length: t2 };
        }, terms: (e2) => e2.map((e3) => {
          const t2 = Object.assign({}, e3);
          return t2.tags = Array.from(e3.tags), t2;
        }), confidence: (e2, t2, n2) => t2.eq(n2).confidence(), syllables: (e2, t2, n2) => t2.eq(n2).syllables(), sentence: (e2, t2, n2) => t2.eq(n2).fullSentence().text(), dirty: (e2) => e2.some((e3) => true === e3.dirty) };
        cn.sentences = cn.sentence, cn.clean = cn.normal, cn.reduced = cn.root;
        const hn = { json: function(e2) {
          const t2 = (n2 = this, "string" == typeof (r2 = (r2 = e2) || {}) && (r2 = {}), (r2 = Object.assign({}, sn, r2)).offset && n2.compute("offset"), n2.docs.map((e3, t3) => {
            const o2 = {};
            return Object.keys(r2).forEach((a2) => {
              r2[a2] && cn[a2] && (o2[a2] = cn[a2](e3, n2, t3));
            }), o2;
          }));
          var n2, r2;
          return "number" == typeof e2 ? t2[e2] : t2;
        } };
        hn.data = hn.json;
        const dn = function(e2) {
          const t2 = e2.pre || "", n2 = e2.post || "";
          return t2 + e2.text + n2;
        }, gn = function(e2, t2) {
          const n2 = function(e3, t3) {
            const n3 = {};
            return Object.keys(t3).forEach((r3) => {
              e3.match(r3).fullPointer.forEach((e4) => {
                n3[e4[3]] = { fn: t3[r3], end: e4[2] };
              });
            }), n3;
          }(e2, t2);
          let r2 = "";
          return e2.docs.forEach((t3, o2) => {
            for (let a2 = 0; a2 < t3.length; a2 += 1) {
              const i2 = t3[a2];
              if (n2.hasOwnProperty(i2.id)) {
                const { fn: s2, end: l2 } = n2[i2.id], u2 = e2.update([[o2, a2, l2]]);
                r2 += t3[a2].pre || "", r2 += s2(u2), a2 = l2 - 1, r2 += t3[a2].post || "";
              } else r2 += dn(i2);
            }
          }), r2;
        }, mn = /* @__PURE__ */ new Set(["Hyphenated", "Prefix", "SlashedTerm"]), pn = function(e2, t2) {
          const n2 = t2[e2];
          if (!n2 || !n2.parents || 0 === n2.parents.length) return e2;
          for (let e3 = 0; e3 < n2.parents.length; e3 += 1) {
            const r2 = n2.parents[e3];
            if (t2[r2] && (!t2[r2].parents || 0 === t2[r2].parents.length)) return r2;
          }
          return n2.parents[n2.parents.length - 1];
        }, fn = function(e2, t2) {
          const n2 = t2.model.one.tagSet, r2 = function(e3) {
            const t3 = {};
            for (const n3 in e3) {
              const r3 = e3[n3];
              r3.alias && (t3[n3] = r3.alias);
            }
            return t3;
          }(n2);
          return e2.docs.map((e3) => {
            const t3 = e3.reduce((e4, t4) => e4 + t4.pre + t4.text + t4.post, "").trim(), o2 = e3.map((e4) => {
              let t4 = function(e5, t5) {
                const n3 = Array.from(e5.tags || []);
                if (0 === n3.length) return "-";
                const r3 = n3.find((e6) => !mn.has(pn(e6, t5))) || n3[0];
                return pn(r3, t5);
              }(e4, n2);
              return r2[t4] || t4;
            }).join(",");
            return `${t3} {${o2}}`;
          }).join("\n");
        }, bn = { debug: function(e2) {
          const t2 = this.methods.one.debug || {};
          return e2 && t2.hasOwnProperty(e2) ? (t2[e2](this), this) : "undefined" != typeof window && window.document ? (t2.clientSide(this), this) : (t2.tags(this), this);
        }, out: function(e2) {
          if (t2 = e2, "[object Object]" === Object.prototype.toString.call(t2)) return gn(this, e2);
          var t2;
          if ("text" === e2) return this.text();
          if ("normal" === e2) return this.text("normal");
          if ("root" === e2) return this.text("root");
          if ("machine" === e2 || "reduced" === e2) return this.text("machine");
          if ("hash" === e2 || "md5" === e2) return an(this.text());
          if ("spec" === e2) return fn(this, this.world);
          if ("json" === e2) return this.json();
          if ("offset" === e2 || "offsets" === e2) return this.compute("offset"), this.json({ offset: true });
          if ("array" === e2) {
            const e3 = this.docs.map((e4) => e4.reduce((e5, t3) => e5 + t3.pre + t3.text + t3.post, "").trim());
            return e3.filter((e4) => e4);
          }
          if ("freq" === e2 || "frequency" === e2 || "topk" === e2) return function(e3) {
            const t3 = {};
            e3.forEach((e4) => {
              t3[e4] = t3[e4] || 0, t3[e4] += 1;
            });
            const n2 = Object.keys(t3).map((e4) => ({ normal: e4, count: t3[e4] }));
            return n2.sort((e4, t4) => e4.count > t4.count ? -1 : 0);
          }(this.json({ normal: true }).map((e3) => e3.normal));
          if ("terms" === e2) {
            let e3 = [];
            return this.docs.forEach((t3) => {
              let n2 = t3.map((e4) => e4.text);
              n2 = n2.filter((e4) => e4), e3 = e3.concat(n2);
            }), e3;
          }
          return "tags" === e2 ? this.docs.map((e3) => e3.reduce((e4, t3) => (e4[t3.implicit || t3.normal] = Array.from(t3.tags), e4), {})) : "debug" === e2 ? this.debug() : this.text();
        }, wrap: function(e2) {
          return gn(this, e2);
        } };
        var vn = { text: function(e2) {
          let t2 = {};
          var n2;
          if (e2 && "string" == typeof e2 && nn.hasOwnProperty(e2) ? t2 = Object.assign({}, nn[e2]) : e2 && (n2 = e2, "[object Object]" === Object.prototype.toString.call(n2)) && (t2 = Object.assign({}, e2)), void 0 !== t2.keepSpace || this.isFull() || (t2.keepSpace = false), void 0 === t2.keepEndPunct && this.pointer) {
            const e3 = this.pointer[0];
            e3 && e3[1] ? t2.keepEndPunct = false : t2.keepEndPunct = true;
          }
          return void 0 === t2.keepPunct && (t2.keepPunct = true), void 0 === t2.keepSpace && (t2.keepSpace = true), function(e3, t3) {
            let n3 = "";
            if (!e3 || !e3[0] || !e3[0][0]) return n3;
            for (let r2 = 0; r2 < e3.length; r2 += 1) n3 += tn(e3[r2], t3, true);
            if (t3.keepSpace || (n3 = n3.trim()), false === t3.keepEndPunct) {
              e3[0][0].tags.has("Emoticon") || (n3 = n3.replace(Zt, ""));
              const t4 = e3[e3.length - 1];
              t4[t4.length - 1].tags.has("Emoticon") || (n3 = n3.replace(_t, "")), n3.endsWith("'") && !n3.endsWith("s'") && (n3 = n3.replace(/'/, ""));
            }
            return true === t3.cleanWhitespace && (n3 = n3.trim()), n3;
          }(this.docs, t2);
        } };
        const yn = Object.assign({}, bn, vn, hn, Qt), wn = "\x1B[0m", kn = { green: (e2) => "\x1B[32m" + e2 + wn, red: (e2) => "\x1B[31m" + e2 + wn, blue: (e2) => "\x1B[34m" + e2 + wn, magenta: (e2) => "\x1B[35m" + e2 + wn, cyan: (e2) => "\x1B[36m" + e2 + wn, yellow: (e2) => "\x1B[33m" + e2 + wn, black: (e2) => "\x1B[30m" + e2 + wn, dim: (e2) => "\x1B[2m" + e2 + wn, i: (e2) => "\x1B[3m" + e2 + wn }, Pn = { tags: function(e2) {
          const { docs: t2, model: n2 } = e2;
          0 === t2.length && console.log(kn.blue("\n     \u2500\u2500\u2500\u2500\u2500\u2500")), t2.forEach((t3) => {
            console.log(kn.blue("\n  \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500")), t3.forEach((t4) => {
              const r2 = [...t4.tags || []];
              let o2 = t4.text || "-";
              t4.sense && (o2 = `{${t4.normal}/${t4.sense}}`), t4.implicit && (o2 = "[" + t4.implicit + "]"), o2 = kn.yellow(o2);
              let a2 = "'" + o2 + "'";
              if (t4.reference) {
                const n3 = e2.update([t4.reference]).text("normal");
                a2 += ` - ${kn.dim(kn.i("[" + n3 + "]"))}`;
              }
              a2 = a2.padEnd(18);
              const i2 = kn.blue("  \u2502 ") + kn.i(a2) + "  - " + function(e3, t5) {
                return t5.one.tagSet && (e3 = e3.map((e4) => {
                  if (!t5.one.tagSet.hasOwnProperty(e4)) return e4;
                  const n3 = t5.one.tagSet[e4].color || "blue";
                  return kn[n3](e4);
                })), e3.join(", ");
              }(r2, n2);
              console.log(i2);
            });
          }), console.log("\n");
        }, clientSide: function(e2) {
          console.log("%c -=-=- ", "background-color:#6699cc;"), e2.forEach((e3) => {
            console.groupCollapsed(e3.text());
            const t2 = e3.docs[0].map((e4) => {
              let t3 = e4.text || "-";
              e4.implicit && (t3 = "[" + e4.implicit + "]");
              return { text: t3, tags: "[" + Array.from(e4.tags).join(", ") + "]" };
            });
            console.table(t2, ["text", "tags"]), console.groupEnd();
          });
        }, chunks: function(e2) {
          const { docs: t2 } = e2;
          console.log(""), t2.forEach((e3) => {
            const t3 = [];
            e3.forEach((e4) => {
              "Noun" === e4.chunk ? t3.push(kn.blue(e4.implicit || e4.normal)) : "Verb" === e4.chunk ? t3.push(kn.green(e4.implicit || e4.normal)) : "Adjective" === e4.chunk ? t3.push(kn.yellow(e4.implicit || e4.normal)) : "Pivot" === e4.chunk ? t3.push(kn.red(e4.implicit || e4.normal)) : t3.push(e4.implicit || e4.normal);
            }), console.log(t3.join(" "), "\n");
          }), console.log("\n");
        }, highlight: function(e2) {
          if (!e2.found) return;
          const t2 = {};
          e2.fullPointer.forEach((e3) => {
            t2[e3[0]] = t2[e3[0]] || [], t2[e3[0]].push(e3);
          }), Object.keys(t2).forEach((n2) => {
            let r2 = e2.update([[Number(n2)]]).text();
            e2.update(t2[n2]).json({ offset: true }).forEach((e3, t3) => {
              r2 = function(e4, t4, n3) {
                const r3 = ((e5, t5, n4) => {
                  const r4 = 9 * n4, o2 = t5.start + r4, a2 = o2 + t5.length;
                  return [e5.substring(0, o2), e5.substring(o2, a2), e5.substring(a2, e5.length)];
                })(e4, t4, n3);
                return `${r3[0]}${kn.blue(r3[1])}${r3[2]}`;
              }(r2, e3.offset, t3);
            }), console.log(r2);
          }), console.log("\n");
        } }, An = /\{(?=[^{]*$)/, Nn = function(e2 = "") {
          let [t2, n2] = e2.split(An);
          if (void 0 === n2) return { text: t2, tags: [] };
          n2 = n2.split(",").map((e3) => e3.trim());
          let r2 = n2[n2.length - 1];
          return n2[n2.length - 1] = r2.replace(/\}$/, ""), n2 = n2.map((e3) => e3.split("|").map((e4) => e4.trim())), n2 = n2.filter((e3) => e3.some((e4) => "" !== e4)), { text: t2, tags: n2 };
        }, Cn = function(e2) {
          return e2.map((e3) => e3.join("|")).join(",");
        };
        var jn = { lib: { fromSpec: function(e2) {
          return this(e2.split("\n").filter((e3) => e3.trim()).map((e3) => Nn(e3).text).join("\n"));
        }, testSpec: function(e2, t2 = true, n2 = false) {
          let r2 = this.world(), o2 = {}, a2 = r2.model.one.tagSet;
          Object.keys(a2).forEach((e3) => {
            a2[e3].alias && (o2[a2[e3].alias] = e3);
          });
          let i2 = e2.split("\n").filter((e3) => e3.trim()).map((e3) => {
            let { text: r3, tags: a3 } = Nn(e3), i3 = this(r3), s2 = function(e4, t3) {
              return e4.map((e5) => (e5 = e5.map((e6) => "#" + (t3[e6] || e6))).length > 1 ? `(${e5.join(" && ")})` : e5[0]).join(" ");
            }(a3, o2), l2 = i3.has(s2);
            if (false !== t2) {
              let e4 = l2 ? "\u2705" : "\u274C";
              console.log(`${e4} ${r3} {${Cn(a3)}}`);
            }
            if (false === l2 && true === n2) throw new Error(`\u274C ${r3} {${Cn(a3)}}`);
            return l2 ? null : r3;
          }).filter(Boolean).join("\n");
          return this(i2);
        } }, api: function(e2) {
          Object.assign(e2.prototype, yn);
        }, methods: { one: { hash: an, debug: Pn } } };
        const xn = function(e2, t2) {
          if (e2[0] !== t2[0]) return false;
          const [, n2, r2] = e2, [, o2, a2] = t2;
          return n2 <= o2 && r2 > o2 || o2 <= n2 && a2 > n2;
        }, In = function(e2) {
          const t2 = {};
          return e2.forEach((e3) => {
            t2[e3[0]] = t2[e3[0]] || [], t2[e3[0]].push(e3);
          }), t2;
        }, Tn = function(e2, t2) {
          const n2 = In(t2), r2 = [];
          return e2.forEach((e3) => {
            const [t3] = e3;
            let o2 = n2[t3] || [];
            if (o2 = o2.filter((t4) => function(e4, t5) {
              return e4[1] <= t5[1] && t5[2] <= e4[2];
            }(e3, t4)), 0 === o2.length) return void r2.push({ passthrough: e3 });
            o2 = o2.sort((e4, t4) => e4[1] - t4[1]);
            let a2 = e3;
            o2.forEach((e4, t4) => {
              const n3 = function(e5, t5) {
                const [n4, r3] = e5, o3 = t5[1], a3 = t5[2], i2 = {};
                if (r3 < o3) {
                  const t6 = o3 < e5[2] ? o3 : e5[2];
                  i2.before = [n4, r3, t6];
                }
                return i2.match = t5, e5[2] > a3 && (i2.after = [n4, a3, e5[2]]), i2;
              }(a2, e4);
              o2[t4 + 1] ? (r2.push({ before: n3.before, match: n3.match }), n3.after && (a2 = n3.after)) : r2.push(n3);
            });
          }), r2;
        };
        var Dn = { one: { termList: function(e2) {
          const t2 = [];
          for (let n2 = 0; n2 < e2.length; n2 += 1) for (let r2 = 0; r2 < e2[n2].length; r2 += 1) t2.push(e2[n2][r2]);
          return t2;
        }, getDoc: function(e2, t2) {
          let n2 = [];
          return e2.forEach((r2, o2) => {
            if (!r2) return;
            let [a2, i2, s2, l2, u2] = r2, c2 = t2[a2] || [];
            if (void 0 === i2 && (i2 = 0), void 0 === s2 && (s2 = c2.length), !l2 || c2[i2] && c2[i2].id === l2) c2 = c2.slice(i2, s2);
            else {
              const n3 = function(e3, t3, n4) {
                for (let r3 = 0; r3 < 20; r3 += 1) {
                  if (t3[n4 - r3]) {
                    const o3 = t3[n4 - r3].findIndex((t4) => t4.id === e3);
                    if (-1 !== o3) return [n4 - r3, o3];
                  }
                  if (t3[n4 + r3]) {
                    const o3 = t3[n4 + r3].findIndex((t4) => t4.id === e3);
                    if (-1 !== o3) return [n4 + r3, o3];
                  }
                }
                return null;
              }(l2, t2, a2);
              if (null !== n3) {
                const r3 = s2 - i2;
                c2 = t2[n3[0]].slice(n3[1], n3[1] + r3);
                const a3 = c2[0] ? c2[0].id : null;
                e2[o2] = [n3[0], n3[1], n3[1] + r3, a3];
              }
            }
            0 !== c2.length && i2 !== s2 && (u2 && c2[c2.length - 1].id !== u2 && (c2 = function(e3, t3) {
              const [n3, r3, , , o3] = e3, a3 = t3[n3], i3 = a3.findIndex((e4) => e4.id === o3);
              return -1 === i3 ? (e3[2] = t3[n3].length, e3[4] = a3.length ? a3[a3.length - 1].id : null) : e3[2] = i3, t3[n3].slice(r3, e3[2] + 1);
            }(r2, t2)), n2.push(c2));
          }), n2 = n2.filter((e3) => e3.length > 0), n2;
        }, pointer: { indexN: In, splitAll: Tn } } };
        const Hn = function(e2, t2) {
          const n2 = e2.concat(t2), r2 = In(n2);
          let o2 = [];
          return n2.forEach((e3) => {
            const [t3] = e3;
            if (1 === r2[t3].length) return void o2.push(e3);
            const n3 = r2[t3].filter((t4) => xn(e3, t4));
            n3.push(e3);
            const a2 = function(e4) {
              let t4 = e4[0][1], n4 = e4[0][2];
              return e4.forEach((e5) => {
                e5[1] < t4 && (t4 = e5[1]), e5[2] > n4 && (n4 = e5[2]);
              }), [e4[0][0], t4, n4];
            }(n3);
            o2.push(a2);
          }), o2 = function(e3) {
            const t3 = {};
            for (let n3 = 0; n3 < e3.length; n3 += 1) t3[e3[n3].join(",")] = e3[n3];
            return Object.values(t3);
          }(o2), o2;
        }, En = function(e2, t2) {
          const n2 = [];
          return Tn(e2, t2).forEach((e3) => {
            e3.passthrough && n2.push(e3.passthrough), e3.before && n2.push(e3.before), e3.after && n2.push(e3.after);
          }), n2;
        }, Gn = (e2, t2) => {
          return "string" == typeof e2 || (n2 = e2, "[object Array]" === Object.prototype.toString.call(n2)) ? t2.match(e2) : e2 || t2.none();
          var n2;
        }, On = function(e2, t2) {
          return e2.map((e3) => {
            const [n2, r2] = e3;
            return t2[n2] && t2[n2][r2] && (e3[3] = t2[n2][r2].id), e3;
          });
        }, Fn = { union: function(e2) {
          e2 = Gn(e2, this);
          let t2 = Hn(this.fullPointer, e2.fullPointer);
          return t2 = On(t2, this.document), this.toView(t2);
        } };
        Fn.and = Fn.union, Fn.intersection = function(e2) {
          e2 = Gn(e2, this);
          let t2 = function(e3, t3) {
            const n2 = In(t3), r2 = [];
            return e3.forEach((e4) => {
              let t4 = n2[e4[0]] || [];
              t4 = t4.filter((t5) => xn(e4, t5)), 0 !== t4.length && t4.forEach((t5) => {
                const n3 = function(e5, t6) {
                  const n4 = e5[1] < t6[1] ? t6[1] : e5[1], r3 = e5[2] > t6[2] ? t6[2] : e5[2];
                  return n4 < r3 ? [e5[0], n4, r3] : null;
                }(e4, t5);
                n3 && r2.push(n3);
              });
            }), r2;
          }(this.fullPointer, e2.fullPointer);
          return t2 = On(t2, this.document), this.toView(t2);
        }, Fn.not = function(e2) {
          e2 = Gn(e2, this);
          let t2 = En(this.fullPointer, e2.fullPointer);
          return t2 = On(t2, this.document), this.toView(t2);
        }, Fn.difference = Fn.not, Fn.complement = function() {
          const e2 = this.all();
          let t2 = En(e2.fullPointer, this.fullPointer);
          return t2 = On(t2, this.document), this.toView(t2);
        }, Fn.settle = function() {
          let e2 = this.fullPointer;
          return e2.forEach((t2) => {
            e2 = Hn(e2, [t2]);
          }), e2 = On(e2, this.document), this.update(e2);
        };
        var Vn = { methods: Dn, api: function(e2) {
          Object.assign(e2.prototype, Fn);
        } };
        const zn = function(e2) {
          return true === e2.optional || true === e2.negative ? null : e2.tag ? "#" + e2.tag : e2.word ? e2.word : e2.switch ? `%${e2.switch}%` : null;
        }, Bn = function(e2, t2) {
          const n2 = t2.methods.one.parseMatch;
          return e2.forEach((e3) => {
            e3.regs = n2(e3.match, {}, t2), "string" == typeof e3.ifNo && (e3.ifNo = [e3.ifNo]), e3.notIf && (e3.notIf = n2(e3.notIf, {}, t2)), e3.needs = function(e4) {
              const t3 = [];
              return e4.forEach((e5) => {
                t3.push(zn(e5)), "and" === e5.operator && e5.choices && e5.choices.forEach((e6) => {
                  e6.forEach((e7) => {
                    t3.push(zn(e7));
                  });
                });
              }), t3.filter((e5) => e5);
            }(e3.regs);
            const { wants: r2, count: o2 } = function(e4) {
              const t3 = [];
              let n3 = 0;
              return e4.forEach((e5) => {
                "or" !== e5.operator || e5.optional || e5.negative || (e5.fastOr && Array.from(e5.fastOr).forEach((e6) => {
                  t3.push(e6);
                }), e5.choices && e5.choices.forEach((e6) => {
                  e6.forEach((e7) => {
                    const n4 = zn(e7);
                    n4 && t3.push(n4);
                  });
                }), n3 += 1);
              }), { wants: t3, count: n3 };
            }(e3.regs);
            e3.wants = r2, e3.minWant = o2, e3.minWords = e3.regs.filter((e4) => !e4.optional).length;
          }), e2;
        };
        var Sn = { buildNet: function(e2, t2) {
          e2 = Bn(e2, t2);
          const n2 = {};
          e2.forEach((e3) => {
            e3.needs.forEach((t3) => {
              n2[t3] = Array.isArray(n2[t3]) ? n2[t3] : [], n2[t3].push(e3);
            }), e3.wants.forEach((t3) => {
              n2[t3] = Array.isArray(n2[t3]) ? n2[t3] : [], n2[t3].push(e3);
            });
          }), Object.keys(n2).forEach((e3) => {
            const t3 = {};
            n2[e3] = n2[e3].filter((e4) => "boolean" != typeof t3[e4.match] && (t3[e4.match] = true, true));
          });
          const r2 = e2.filter((e3) => 0 === e3.needs.length && 0 === e3.wants.length);
          return { hooks: n2, always: r2 };
        }, bulkMatch: function(e2, t2, n2, r2 = {}) {
          const o2 = n2.one.cacheDoc(e2);
          let a2 = function(e3, t3) {
            return e3.map((n3, r3) => {
              let o3 = [];
              Object.keys(t3).forEach((n4) => {
                e3[r3].has(n4) && (o3 = o3.concat(t3[n4]));
              });
              const a3 = {};
              return o3 = o3.filter((e4) => "boolean" != typeof a3[e4.match] && (a3[e4.match] = true, true)), o3;
            });
          }(o2, t2.hooks);
          a2 = function(e3, t3) {
            return e3.map((e4, n3) => {
              const r3 = t3[n3];
              return (e4 = (e4 = e4.filter((e5) => e5.needs.every((e6) => r3.has(e6)))).filter((e5) => void 0 === e5.ifNo || true !== e5.ifNo.some((e6) => r3.has(e6)))).filter((e5) => 0 === e5.wants.length || e5.wants.filter((e6) => r3.has(e6)).length >= e5.minWant);
            });
          }(a2, o2), t2.always.length > 0 && (a2 = a2.map((e3) => e3.concat(t2.always))), a2 = function(e3, t3) {
            return e3.map((e4, n3) => {
              const r3 = t3[n3].length;
              return e4 = e4.filter((e5) => r3 >= e5.minWords), e4;
            });
          }(a2, e2);
          const i2 = function(e3, t3, n3, r3, o3) {
            const a3 = [];
            for (let n4 = 0; n4 < e3.length; n4 += 1) for (let i3 = 0; i3 < e3[n4].length; i3 += 1) {
              const s2 = e3[n4][i3], l2 = r3.one.match([t3[n4]], s2);
              if (l2.ptrs.length > 0 && (l2.ptrs.forEach((e4) => {
                e4[0] = n4;
                const t4 = Object.assign({}, s2, { pointer: e4 });
                void 0 !== s2.unTag && (t4.unTag = s2.unTag), a3.push(t4);
              }), true === o3.matchOne)) return [a3[0]];
            }
            return a3;
          }(a2, e2, 0, n2, r2);
          return i2;
        }, bulkTagger: function(e2, t2, n2) {
          const { model: r2, methods: o2 } = n2, { getDoc: a2, setTag: i2, unTag: s2 } = o2.one, l2 = o2.two.looksPlural;
          if (0 === e2.length) return e2;
          return ("undefined" != typeof process && process.env ? process.env : self.env || {}).DEBUG_TAGS && console.log(`

    \x1B[32m\u2192 ${e2.length} post-tagger:\x1B[0m`), e2.map((e3) => {
            if (!e3.tag && !e3.chunk && !e3.unTag) return;
            const o3 = e3.reason || e3.match, u2 = a2([e3.pointer], t2)[0];
            if (true === e3.safe) {
              if (false === function(e4, t3, n3) {
                const r3 = n3.one.tagSet;
                if (!r3.hasOwnProperty(t3)) return true;
                const o4 = r3[t3].not || [];
                for (let t4 = 0; t4 < e4.length; t4 += 1) {
                  const n4 = e4[t4];
                  for (let e5 = 0; e5 < o4.length; e5 += 1) if (true === n4.tags.has(o4[e5])) return false;
                }
                return true;
              }(u2, e3.tag, r2)) return;
              if ("-" === u2[u2.length - 1].post) return;
            }
            if (void 0 !== e3.tag) {
              if (i2(u2, e3.tag, n2, e3.safe, `[post] '${o3}'`), "Noun" === e3.tag && l2) {
                const t3 = u2[u2.length - 1];
                l2(t3.text) ? i2([t3], "Plural", n2, e3.safe, "quick-plural") : i2([t3], "Singular", n2, e3.safe, "quick-singular");
              }
              true === e3.freeze && u2.forEach((e4) => e4.frozen = true);
            }
            void 0 !== e3.unTag && s2(u2, e3.unTag, n2, e3.safe, o3), e3.chunk && u2.forEach((t3) => t3.chunk = e3.chunk);
          });
        } }, $n = { lib: { buildNet: function(e2) {
          const t2 = this.methods().one.buildNet(e2, this.world());
          return t2.isNet = true, t2;
        } }, api: function(e2) {
          e2.prototype.sweep = function(e3, t2 = {}) {
            const { world: n2, docs: r2 } = this, { methods: o2 } = n2;
            let a2 = o2.one.bulkMatch(r2, e3, this.methods, t2);
            false !== t2.tagger && o2.one.bulkTagger(a2, r2, this.world), a2 = a2.map((e4) => {
              const t3 = e4.pointer, n3 = r2[t3[0]][t3[1]], o3 = t3[2] - t3[1];
              return n3.index && (e4.pointer = [n3.index[0], n3.index[1], t3[1] + o3]), e4;
            });
            const i2 = a2.map((e4) => e4.pointer);
            return a2 = a2.map((e4) => (e4.view = this.update([e4.pointer]), delete e4.regs, delete e4.needs, delete e4.pointer, delete e4._expanded, e4)), { view: this.update(i2), found: a2 };
          };
        }, methods: { one: Sn } };
        const Mn = / /, Kn = function(e2, t2) {
          "Noun" === t2 && (e2.chunk = t2), "Verb" === t2 && (e2.chunk = t2);
        }, Ln = function(e2, t2, n2, r2) {
          if (true === e2.tags.has(t2)) return null;
          if ("." === t2) return null;
          true === e2.frozen && (r2 = true);
          const o2 = n2[t2];
          if (o2) {
            if (o2.not && o2.not.length > 0) for (let t3 = 0; t3 < o2.not.length; t3 += 1) {
              if (true === r2 && e2.tags.has(o2.not[t3])) return null;
              e2.tags.delete(o2.not[t3]);
            }
            if (o2.parents && o2.parents.length > 0) for (let t3 = 0; t3 < o2.parents.length; t3 += 1) e2.tags.add(o2.parents[t3]), Kn(e2, o2.parents[t3]);
          }
          return e2.tags.add(t2), e2.dirty = true, Kn(e2, t2), true;
        }, Jn = function(e2, t2, n2 = {}, r2, o2) {
          const a2 = n2.model.one.tagSet || {};
          if (!t2) return;
          const i2 = "undefined" != typeof process && process.env ? process.env : self.env || {};
          var s2;
          if (i2 && i2.DEBUG_TAGS && ((e3, t3, n3 = "") => {
            const r3 = e3.map((e4) => e4.text || "[" + e4.implicit + "]").join(" ");
            var o3;
            "string" != typeof t3 && t3.length > 2 && (t3 = t3.slice(0, 2).join(", #") + " +"), t3 = "string" != typeof t3 ? t3.join(", #") : t3, console.log(` ${(o3 = r3, "\x1B[33m\x1B[3m" + o3 + "\x1B[0m").padEnd(24)} \x1B[32m\u2192\x1B[0m #${t3.padEnd(22)}  ${((e4) => "\x1B[3m" + e4 + "\x1B[0m")(n3)}`);
          })(e2, t2, o2), true != (s2 = t2, "[object Array]" === Object.prototype.toString.call(s2))) if ("string" == typeof t2) if (t2 = t2.trim(), Mn.test(t2)) !function(e3, t3, n3, r3) {
            const o3 = t3.split(Mn);
            e3.forEach((e4, t4) => {
              let a3 = o3[t4];
              a3 && (a3 = a3.replace(/^#/, ""), Ln(e4, a3, n3, r3));
            });
          }(e2, t2, a2, r2);
          else {
            t2 = t2.replace(/^#/, "");
            for (let n3 = 0; n3 < e2.length; n3 += 1) Ln(e2[n3], t2, a2, r2);
          }
          else console.warn(`compromise: Invalid tag '${t2}'`);
          else t2.forEach((t3) => Jn(e2, t3, n2, r2));
        }, Wn = function(e2) {
          return e2.children = e2.children || [], e2._cache = e2._cache || {}, e2.props = e2.props || {}, e2._cache.parents = e2._cache.parents || [], e2._cache.children = e2._cache.children || [], e2;
        }, qn = /^ *(#|\/\/)/, Un = function(e2) {
          let t2 = e2.trim().split(/->/), n2 = [];
          t2.forEach((e3) => {
            n2 = n2.concat(function(e4) {
              if (!(e4 = e4.trim())) return null;
              if (/^\[/.test(e4) && /\]$/.test(e4)) {
                let t3 = (e4 = (e4 = e4.replace(/^\[/, "")).replace(/\]$/, "")).split(/,/);
                return t3 = t3.map((e5) => e5.trim()).filter((e5) => e5), t3 = t3.map((e5) => Wn({ id: e5 })), t3;
              }
              return [Wn({ id: e4 })];
            }(e3));
          }), n2 = n2.filter((e3) => e3);
          let r2 = n2[0];
          for (let e3 = 1; e3 < n2.length; e3 += 1) r2.children.push(n2[e3]), r2 = n2[e3];
          return n2[0];
        }, Rn = (e2, t2) => {
          let n2 = [], r2 = [e2];
          for (; r2.length > 0; ) {
            let e3 = r2.pop();
            n2.push(e3), e3.children && e3.children.forEach((n3) => {
              t2 && t2(e3, n3), r2.push(n3);
            });
          }
          return n2;
        }, Qn = (e2) => "[object Array]" === Object.prototype.toString.call(e2), _n = (e2) => (e2 = e2 || "").trim(), Zn = function(e2 = []) {
          return "string" == typeof e2 ? function(e3) {
            let t3 = e3.split(/\r?\n/), n2 = [];
            t3.forEach((e4) => {
              if (!e4.trim() || qn.test(e4)) return;
              let t4 = ((e5) => {
                const t5 = /^( {2}|\t)/;
                let n3 = 0;
                for (; t5.test(e5); ) e5 = e5.replace(t5, ""), n3 += 1;
                return n3;
              })(e4);
              n2.push({ indent: t4, node: Un(e4) });
            });
            let r2 = function(e4) {
              let t4 = { children: [] };
              return e4.forEach((n3, r3) => {
                0 === n3.indent ? t4.children = t4.children.concat(n3.node) : e4[r3 - 1] && function(e5, t5) {
                  let n4 = e5[t5].indent;
                  for (; t5 >= 0; t5 -= 1) if (e5[t5].indent < n4) return e5[t5];
                  return e5[0];
                }(e4, r3).node.children.push(n3.node);
              }), t4;
            }(n2);
            return r2 = Wn(r2), r2;
          }(e2) : Qn(e2) ? function(e3) {
            let t3 = {};
            e3.forEach((e4) => {
              t3[e4.id] = e4;
            });
            let n2 = Wn({});
            return e3.forEach((e4) => {
              if ((e4 = Wn(e4)).parent) if (t3.hasOwnProperty(e4.parent)) {
                let n3 = t3[e4.parent];
                delete e4.parent, n3.children.push(e4);
              } else console.warn(`[Grad] - missing node '${e4.parent}'`);
              else n2.children.push(e4);
            }), n2;
          }(e2) : (Rn(t2 = e2).forEach(Wn), t2);
          var t2;
        }, Xn = function(e2, t2) {
          let n2 = "-> ";
          t2 && (n2 = ((e3) => "\x1B[2m" + e3 + "\x1B[0m")("\u2192 "));
          let r2 = "";
          return Rn(e2).forEach((e3, o2) => {
            let a2 = e3.id || "";
            if (t2 && (a2 = ((e4) => "\x1B[31m" + e4 + "\x1B[0m")(a2)), 0 === o2 && !e3.id) return;
            let i2 = e3._cache.parents.length;
            r2 += "    ".repeat(i2) + n2 + a2 + "\n";
          }), r2;
        }, Yn = function(e2) {
          let t2 = Rn(e2);
          t2.forEach((e3) => {
            delete (e3 = Object.assign({}, e3)).children;
          });
          let n2 = t2[0];
          return n2 && !n2.id && 0 === Object.keys(n2.props).length && t2.shift(), t2;
        }, er = { text: Xn, txt: Xn, array: Yn, flat: Yn }, tr = function(e2, t2) {
          return "nested" === t2 || "json" === t2 ? e2 : "debug" === t2 ? (console.log(Xn(e2, true)), null) : er.hasOwnProperty(t2) ? er[t2](e2) : e2;
        }, nr = (e2) => {
          Rn(e2, (e3, t2) => {
            e3.id && (e3._cache.parents = e3._cache.parents || [], t2._cache.parents = e3._cache.parents.concat([e3.id]));
          });
        }, rr = /\//;
        let or = class g {
          constructor(e2 = {}) {
            Object.defineProperty(this, "json", { enumerable: false, value: e2, writable: true });
          }
          get children() {
            return this.json.children;
          }
          get id() {
            return this.json.id;
          }
          get found() {
            return this.json.id || this.json.children.length > 0;
          }
          props(e2 = {}) {
            let t2 = this.json.props || {};
            return "string" == typeof e2 && (t2[e2] = true), this.json.props = Object.assign(t2, e2), this;
          }
          get(e2) {
            if (e2 = _n(e2), !rr.test(e2)) {
              let t3 = this.json.children.find((t4) => t4.id === e2);
              return new g(t3);
            }
            let t2 = ((e3, t3) => {
              let n2 = ((e4) => "string" != typeof e4 ? e4 : (e4 = e4.replace(/^\//, "")).split(/\//))(t3 = t3 || "");
              for (let t4 = 0; t4 < n2.length; t4 += 1) {
                let r2 = e3.children.find((e4) => e4.id === n2[t4]);
                if (!r2) return null;
                e3 = r2;
              }
              return e3;
            })(this.json, e2) || Wn({});
            return new g(t2);
          }
          add(e2, t2 = {}) {
            if (Qn(e2)) return e2.forEach((e3) => this.add(_n(e3), t2)), this;
            e2 = _n(e2);
            let n2 = Wn({ id: e2, props: t2 });
            return this.json.children.push(n2), new g(n2);
          }
          remove(e2) {
            return e2 = _n(e2), this.json.children = this.json.children.filter((t2) => t2.id !== e2), this;
          }
          nodes() {
            return Rn(this.json).map((e2) => (delete (e2 = Object.assign({}, e2)).children, e2));
          }
          cache() {
            return ((e2) => {
              let t2 = Rn(e2, (e3, t3) => {
                e3.id && (e3._cache.parents = e3._cache.parents || [], e3._cache.children = e3._cache.children || [], t3._cache.parents = e3._cache.parents.concat([e3.id]));
              }), n2 = {};
              t2.forEach((e3) => {
                e3.id && (n2[e3.id] = e3);
              }), t2.forEach((e3) => {
                e3._cache.parents.forEach((t3) => {
                  n2.hasOwnProperty(t3) && n2[t3]._cache.children.push(e3.id);
                });
              }), e2._cache.children = Object.keys(n2);
            })(this.json), this;
          }
          list() {
            return Rn(this.json);
          }
          fillDown() {
            var e2;
            return e2 = this.json, Rn(e2, (e3, t2) => {
              t2.props = ((e4, t3) => (Object.keys(t3).forEach((n2) => {
                if (t3[n2] instanceof Set) {
                  let r2 = e4[n2] || /* @__PURE__ */ new Set();
                  e4[n2] = /* @__PURE__ */ new Set([...r2, ...t3[n2]]);
                } else if (((e5) => e5 && "object" == typeof e5 && !Array.isArray(e5))(t3[n2])) {
                  let r2 = e4[n2] || {};
                  e4[n2] = Object.assign({}, t3[n2], r2);
                } else Qn(t3[n2]) ? e4[n2] = t3[n2].concat(e4[n2] || []) : void 0 === e4[n2] && (e4[n2] = t3[n2]);
              }), e4))(t2.props, e3.props);
            }), this;
          }
          depth() {
            nr(this.json);
            let e2 = Rn(this.json), t2 = e2.length > 1 ? 1 : 0;
            return e2.forEach((e3) => {
              if (0 === e3._cache.parents.length) return;
              let n2 = e3._cache.parents.length + 1;
              n2 > t2 && (t2 = n2);
            }), t2;
          }
          out(e2) {
            return nr(this.json), tr(this.json, e2);
          }
          debug() {
            return nr(this.json), tr(this.json, "debug"), this;
          }
        };
        const ar = function(e2) {
          let t2 = Zn(e2);
          return new or(t2);
        };
        ar.prototype.plugin = function(e2) {
          e2(this);
        };
        const ir = { Noun: "blue", Verb: "green", Negative: "green", Date: "red", Value: "red", Adjective: "magenta", Preposition: "cyan", Conjunction: "cyan", Determiner: "cyan", Hyphenated: "cyan", Adverb: "cyan" }, sr = function(e2) {
          if (ir.hasOwnProperty(e2.id)) return ir[e2.id];
          if (ir.hasOwnProperty(e2.is)) return ir[e2.is];
          const t2 = e2._cache.parents.find((e3) => ir[e3]);
          return ir[t2];
        }, lr = function(e2) {
          return e2 ? "string" == typeof e2 ? [e2] : e2 : [];
        }, ur = function(e2, t2) {
          return e2 = function(e3, t3) {
            return Object.keys(e3).forEach((n2) => {
              e3[n2].isA && (e3[n2].is = e3[n2].isA), e3[n2].notA && (e3[n2].not = e3[n2].notA), e3[n2].is && "string" == typeof e3[n2].is && (t3.hasOwnProperty(e3[n2].is) || e3.hasOwnProperty(e3[n2].is) || (e3[e3[n2].is] = {})), e3[n2].not && "string" == typeof e3[n2].not && !e3.hasOwnProperty(e3[n2].not) && (t3.hasOwnProperty(e3[n2].not) || e3.hasOwnProperty(e3[n2].not) || (e3[e3[n2].not] = {}));
            }), e3;
          }(e2, t2), Object.keys(e2).forEach((t3) => {
            e2[t3].children = lr(e2[t3].children), e2[t3].not = lr(e2[t3].not);
          }), Object.keys(e2).forEach((t3) => {
            (e2[t3].not || []).forEach((n2) => {
              e2[n2] && e2[n2].not && e2[n2].not.push(t3);
            });
          }), e2;
        };
        var cr = { one: { setTag: Jn, unTag: function(e2, t2, n2) {
          t2 = t2.trim().replace(/^#/, "");
          for (let r2 = 0; r2 < e2.length; r2 += 1) {
            const o2 = e2[r2];
            if (true === o2.frozen) continue;
            if ("*" === t2) {
              o2.tags.clear();
              continue;
            }
            const a2 = n2[t2];
            if (a2 && a2.children.length > 0) for (let e3 = 0; e3 < a2.children.length; e3 += 1) o2.tags.delete(a2.children[e3]);
            o2.tags.delete(t2);
          }
        }, addTags: function(e2, t2) {
          Object.keys(t2).length > 0 && (e2 = function(e3) {
            return Object.keys(e3).forEach((t3) => {
              e3[t3] = Object.assign({}, e3[t3]), e3[t3].novel = true;
            }), e3;
          }(e2)), e2 = ur(e2, t2);
          const n2 = function(e3) {
            const t3 = Object.keys(e3).map((t4) => {
              const n3 = e3[t4], r3 = { not: new Set(n3.not), also: n3.also, is: n3.is, novel: n3.novel };
              return { id: t4, parent: n3.is, props: r3, children: [], alias: n3.alias };
            });
            return ar(t3).cache().fillDown().out("array");
          }(Object.assign({}, t2, e2)), r2 = function(e3) {
            const t3 = {};
            return e3.forEach((e4) => {
              const { not: n3, also: r3, is: o2, novel: a2 } = e4.props;
              let i2 = e4._cache.parents;
              r3 && (i2 = i2.concat(r3)), t3[e4.id] = { is: o2, not: n3, novel: a2, also: r3, parents: i2, children: e4._cache.children, color: sr(e4), alias: e4.alias };
            }), Object.keys(t3).forEach((e4) => {
              const n3 = new Set(t3[e4].not);
              t3[e4].not.forEach((e5) => {
                t3[e5] && t3[e5].children.forEach((e6) => n3.add(e6));
              }), t3[e4].not = Array.from(n3);
            }), t3;
          }(n2);
          return r2;
        }, canBe: function(e2, t2, n2) {
          if (!n2.hasOwnProperty(t2)) return true;
          const r2 = n2[t2].not || [];
          for (let t3 = 0; t3 < r2.length; t3 += 1) if (e2.tags.has(r2[t3])) return false;
          return true;
        } } };
        const hr = function(e2) {
          return "[object Array]" === Object.prototype.toString.call(e2);
        }, dr = { tag: function(e2, t2 = "", n2) {
          if (!this.found || !e2) return this;
          const r2 = this.termList();
          if (0 === r2.length) return this;
          const { methods: o2, verbose: a2, world: i2 } = this;
          return true === a2 && console.log(" +  ", e2, t2 || ""), hr(e2) ? e2.forEach((e3) => o2.one.setTag(r2, e3, i2, n2, t2)) : o2.one.setTag(r2, e2, i2, n2, t2), this.uncache(), this;
        }, tagSafe: function(e2, t2 = "") {
          return this.tag(e2, t2, true);
        }, unTag: function(e2, t2) {
          if (!this.found || !e2) return this;
          const n2 = this.termList();
          if (0 === n2.length) return this;
          const { methods: r2, verbose: o2, model: a2 } = this;
          true === o2 && console.log(" -  ", e2, t2 || "");
          const i2 = a2.one.tagSet;
          return hr(e2) ? e2.forEach((e3) => r2.one.unTag(n2, e3, i2)) : r2.one.unTag(n2, e2, i2), this.uncache(), this;
        }, canBe: function(e2) {
          e2 = e2.replace(/^#/, "");
          const t2 = this.model.one.tagSet, n2 = this.methods.one.canBe, r2 = [];
          this.document.forEach((o3, a2) => {
            o3.forEach((o4, i2) => {
              n2(o4, e2, t2) || r2.push([a2, i2, i2 + 1]);
            });
          });
          const o2 = this.update(r2);
          return this.difference(o2);
        } };
        var gr = { addTags: function(e2) {
          const { model: t2, methods: n2 } = this.world(), r2 = t2.one.tagSet, o2 = (0, n2.one.addTags)(e2, r2);
          return t2.one.tagSet = o2, this;
        } };
        const mr = /* @__PURE__ */ new Set(["Auxiliary", "Possessive"]);
        var pr = { model: { one: { tagSet: {} } }, compute: { tagRank: function(e2) {
          const { document: t2, world: n2 } = e2, r2 = n2.model.one.tagSet;
          t2.forEach((e3) => {
            e3.forEach((e4) => {
              const t3 = Array.from(e4.tags);
              e4.tagRank = function(e5, t4) {
                return e5 = e5.sort((e6, n3) => {
                  if (mr.has(e6) || !t4.hasOwnProperty(n3)) return 1;
                  if (mr.has(n3) || !t4.hasOwnProperty(e6)) return -1;
                  let r3 = t4[e6].children || [];
                  const o2 = r3.length;
                  return r3 = t4[n3].children || [], o2 - r3.length;
                }), e5;
              }(t3, r2);
            });
          });
        } }, methods: cr, api: function(e2) {
          Object.assign(e2.prototype, dr);
        }, lib: gr };
        const fr = /([.!?\u203D\u2E18\u203C\u2047-\u2049\u3002]+\s)/g, br = /^[.!?\u203D\u2E18\u203C\u2047-\u2049\u3002]+\s$/, vr = /((?:\r?\n|\r)+)/, yr = /[a-z0-9\u00C0-\u00FF\u00a9\u00ae\u2000-\u3300\ud000-\udfff]/i, wr = /\S/, kr = function(e2) {
          return Boolean(e2.match(/\n$/));
        }, Pr = { '"': '"', "\uFF02": "\uFF02", "\u201C": "\u201D", "\u201F": "\u201D", "\u201E": "\u201D", "\u2E42": "\u201D", "\u201A": "\u2019", "\xAB": "\xBB", "\u2039": "\u203A", "\u2035": "\u2032", "\u2036": "\u2033", "\u2037": "\u2034", "\u301D": "\u301E", "\u301F": "\u301E" }, Ar = RegExp("[" + Object.keys(Pr).join("") + "]", "g"), Nr = RegExp("[" + Object.values(Pr).join("") + "]", "g"), Cr = function(e2) {
          if (!e2) return false;
          const t2 = e2.match(Nr);
          return null !== t2 && 1 === t2.length;
        }, jr = /\(/g, xr = /\)/g, Ir = /\S/, Tr = /^\s+/, Dr = function(e2, t2) {
          const n2 = e2.split(/[-–—]/);
          if (n2.length <= 1) return false;
          const { prefixes: r2, suffixes: o2 } = t2.one;
          if (1 === n2[0].length && /[a-z]/i.test(n2[0])) return false;
          if (r2.hasOwnProperty(n2[0])) return false;
          if (n2[1] = n2[1].trim().replace(/[.?!]$/, ""), o2.hasOwnProperty(n2[1])) return false;
          if (true === /^([a-z\u00C0-\u00FF`"'/]+)[-–—]([a-z0-9\u00C0-\u00FF].*)/i.test(e2)) return true;
          return true === /^[('"]?([0-9]{1,4})[-–—]([a-z\u00C0-\u00FF`"'/-]+[)'"]?$)/i.test(e2);
        }, Hr = function(e2) {
          const t2 = [], n2 = e2.split(/[-–—]/);
          let r2 = "-";
          const o2 = e2.match(/[-–—]/);
          o2 && o2[0] && (r2 = o2);
          for (let e3 = 0; e3 < n2.length; e3++) e3 === n2.length - 1 ? t2.push(n2[e3]) : t2.push(n2[e3] + r2);
          return t2;
        }, Er = /\p{L} ?\/ ?\p{L}+$/u, Gr = /\S/, Or = /^[!?.]+$/, Fr = /(\S+)/;
        let Vr = [".", "?", "!", ":", ";", "-", "\u2013", "\u2014", "--", "...", "(", ")", "[", "]", '"', "'", "`", "\xAB", "\xBB", "*", "\u2022"];
        Vr = Vr.reduce((e2, t2) => (e2[t2] = true, e2), {});
        const zr = /\p{Letter}/u, Br = /[\p{Number}\p{Currency_Symbol}]/u, Sr = /^[a-z]\.([a-z]\.)+/i, $r = /[sn]['’]$/, Mr = /^[(+\-]?\d+(th|st|nd|rd)?[)+\-]?$/, Kr = /([A-Z]\.)+[A-Z]?,?$/, Lr = /^[A-Z]\.,?$/, Jr = /[A-Z]{2,}('s|,)?$/, Wr = /([a-z]\.)+[a-z]\.?$/, qr = function(e2) {
          return function(e3) {
            return true === Kr.test(e3) || true === Wr.test(e3) || true === Lr.test(e3) || true === Jr.test(e3);
          }(e2) && (e2 = e2.replace(/\./g, "")), e2;
        }, Ur = function(e2, t2) {
          const n2 = t2.methods.one.killUnicode;
          let r2 = e2.text || "";
          r2 = function(e3) {
            const t3 = e3 = (e3 = (e3 = e3 || "").toLowerCase()).trim();
            return e3 = (e3 = (e3 = e3.replace(/[,;.!?]+$/, "")).replace(/\u2026/g, "...")).replace(/\u2013/g, "-"), false === /^[:;]/.test(e3) && (e3 = (e3 = (e3 = e3.replace(/\.{3,}$/g, "")).replace(/[",.!:;?)]+$/g, "")).replace(/^['"(]+/g, "")), "" === (e3 = (e3 = e3.replace(/[\u200B-\u200D\uFEFF]/g, "")).trim()) && (e3 = t3), e3.replace(/([0-9]),([0-9])/g, "$1$2");
          }(r2), r2 = n2(r2, t2), r2 = qr(r2), e2.normal = r2;
        }, Rr = /[ .][A-Z]\.? *$/i, Qr = /(?:\u2026|\.{2,}) *$/, _r = /\p{L}/u, Zr = /\. *$/, Xr = /^[A-Z]\. $/;
        var Yr = { one: { killUnicode: function(e2, t2) {
          const n2 = t2.model.one.unicode || {}, r2 = (e2 = e2 || "").split("");
          return r2.forEach((e3, t3) => {
            n2[e3] && (r2[t3] = n2[e3]);
          }), r2.join("");
        }, tokenize: { splitSentences: function(e2, t2) {
          if (e2 = e2 || "", !(e2 = String(e2)) || "string" != typeof e2 || false === Ir.test(e2)) return [];
          const n2 = function(e3) {
            const t3 = [], n3 = e3.split(vr);
            for (let e4 = 0; e4 < n3.length; e4++) {
              const r3 = n3[e4].split(fr);
              for (let e5 = 0; e5 < r3.length; e5++) r3[e5 + 1] && true === br.test(r3[e5 + 1]) && (r3[e5] += r3[e5 + 1], r3[e5 + 1] = ""), "" !== r3[e5] && t3.push(r3[e5]);
            }
            return t3;
          }(e2 = e2.replace("\xA0", " "));
          let r2 = function(e3) {
            const t3 = [];
            for (let n3 = 0; n3 < e3.length; n3++) {
              const r3 = e3[n3];
              if (void 0 !== r3 && "" !== r3) {
                if (false === wr.test(r3) || false === yr.test(r3)) {
                  if (t3[t3.length - 1]) {
                    t3[t3.length - 1] += r3;
                    continue;
                  }
                  if (e3[n3 + 1]) {
                    e3[n3 + 1] = r3 + e3[n3 + 1];
                    continue;
                  }
                }
                t3.push(r3);
              }
            }
            return t3;
          }(n2);
          if (r2 = function(e3, t3) {
            const n3 = t3.methods.one.tokenize.isSentence, r3 = t3.model.one.abbreviations || /* @__PURE__ */ new Set(), o2 = [];
            for (let t4 = 0; t4 < e3.length; t4++) {
              const a2 = e3[t4];
              !e3[t4 + 1] || n3(a2, r3) || kr(a2) ? a2 && a2.length > 0 && (o2.push(a2), e3[t4] = "") : e3[t4 + 1] = a2 + (e3[t4 + 1] || "");
            }
            return o2;
          }(r2, t2), r2 = function(e3) {
            const t3 = [];
            for (let n3 = 0; n3 < e3.length; n3 += 1) {
              const r3 = e3[n3].match(Ar);
              if (null !== r3 && 1 === r3.length) {
                if (Cr(e3[n3 + 1]) && e3[n3 + 1].length < 280) {
                  e3[n3] += e3[n3 + 1], t3.push(e3[n3]), e3[n3 + 1] = "", n3 += 1;
                  continue;
                }
                if (Cr(e3[n3 + 2])) {
                  const r4 = e3[n3 + 1] + e3[n3 + 2];
                  if (r4.length < 280) {
                    e3[n3] += r4, t3.push(e3[n3]), e3[n3 + 1] = "", e3[n3 + 2] = "", n3 += 2;
                    continue;
                  }
                }
              }
              t3.push(e3[n3]);
            }
            return t3;
          }(r2), r2 = function(e3) {
            const t3 = [];
            for (let n3 = 0; n3 < e3.length; n3 += 1) {
              const r3 = e3[n3].match(jr);
              null !== r3 && 1 === r3.length && e3[n3 + 1] && e3[n3 + 1].length < 250 && null !== e3[n3 + 1].match(xr) && 1 === r3.length && !jr.test(e3[n3 + 1]) ? (e3[n3] += e3[n3 + 1], t3.push(e3[n3]), e3[n3 + 1] = "", n3 += 1) : t3.push(e3[n3]);
            }
            return t3;
          }(r2), 0 === r2.length) return [e2];
          for (let e3 = 1; e3 < r2.length; e3 += 1) {
            const t3 = r2[e3].match(Tr);
            null !== t3 && (r2[e3 - 1] += t3[0], r2[e3] = r2[e3].replace(Tr, ""));
          }
          return r2;
        }, isSentence: function(e2, t2) {
          if (false === _r.test(e2)) return false;
          if (true === Rr.test(e2)) return false;
          if (3 === e2.length && Xr.test(e2)) return false;
          if (true === Qr.test(e2)) return false;
          const n2 = e2.replace(/[.!?\u203D\u2E18\u203C\u2047-\u2049] *$/, "").split(" "), r2 = n2[n2.length - 1].toLowerCase();
          return true !== t2.hasOwnProperty(r2) || true !== Zr.test(e2);
        }, splitTerms: function(e2, t2) {
          let n2 = [], r2 = [];
          if ("number" == typeof (e2 = e2 || "") && (e2 = String(e2)), function(e3) {
            return "[object Array]" === Object.prototype.toString.call(e3);
          }(e2)) return e2;
          const o2 = e2.split(Fr);
          for (let e3 = 0; e3 < o2.length; e3++) true !== Dr(o2[e3], t2) ? r2.push(o2[e3]) : r2 = r2.concat(Hr(o2[e3]));
          let a2 = "";
          for (let e3 = 0; e3 < r2.length; e3++) {
            const t3 = r2[e3];
            true === Gr.test(t3) && false === Vr.hasOwnProperty(t3) && false === Or.test(t3) ? (n2.length > 0 ? (n2[n2.length - 1] += a2, n2.push(t3)) : n2.push(a2 + t3), a2 = "") : a2 += t3;
          }
          return a2 && (0 === n2.length && (n2[0] = ""), n2[n2.length - 1] += a2), n2 = function(e3) {
            for (let t3 = 1; t3 < e3.length - 1; t3++) Er.test(e3[t3]) && (e3[t3 - 1] += e3[t3] + e3[t3 + 1], e3[t3] = null, e3[t3 + 1] = null);
            return e3;
          }(n2), n2 = function(e3) {
            const t3 = /^[0-9]{1,4}(:[0-9][0-9])?([a-z]{1,2})? ?[-–—] ?$/, n3 = /^[0-9]{1,4}([a-z]{1,2})? ?$/;
            for (let r3 = 0; r3 < e3.length - 1; r3 += 1) e3[r3 + 1] && t3.test(e3[r3]) && n3.test(e3[r3 + 1]) && (e3[r3] = e3[r3] + e3[r3 + 1], e3[r3 + 1] = null);
            return e3;
          }(n2), n2 = n2.filter((e3) => e3), n2;
        }, splitWhitespace: (e2, t2) => {
          const { str: n2, pre: r2, post: o2 } = function(e3, t3) {
            const { prePunctuation: n3, postPunctuation: r3, emoticons: o3 } = t3.one;
            let a2 = e3, i2 = "", s2 = "";
            const l2 = Array.from(e3);
            if (o3.hasOwnProperty(e3.trim())) return { str: e3.trim(), pre: i2, post: " " };
            let u2 = l2.length;
            for (let t4 = 0; t4 < u2; t4 += 1) {
              const t5 = l2[0];
              if (true !== n3[t5]) {
                if (("+" === t5 || "-" === t5 || "(" === t5) && Mr.test(e3.trim())) break;
                if ("'" === t5 && 3 === t5.length && Br.test(l2[1])) break;
                if (zr.test(t5) || Br.test(t5)) break;
                i2 += l2.shift();
              }
            }
            u2 = l2.length;
            for (let t4 = 0; t4 < u2; t4 += 1) {
              const t5 = l2[l2.length - 1];
              if (true !== r3[t5]) {
                if (zr.test(t5) || Br.test(t5)) break;
                if (!("." === t5 && true === Sr.test(a2) || "'" === t5 && true === $r.test(a2))) {
                  if (("+" === t5 || ")" === t5) && Mr.test(e3.trim())) break;
                  s2 = l2.pop() + s2;
                }
              }
            }
            return "" === (e3 = l2.join("")) && (a2 = a2.replace(/ *$/, (e4) => (s2 = e4 || "", "")), e3 = a2, i2 = ""), { str: e3, pre: i2, post: s2 };
          }(e2, t2);
          return { text: n2, pre: r2, post: o2, tags: /* @__PURE__ */ new Set() };
        }, fromString: function(e2, t2) {
          const { methods: n2, model: r2 } = t2, { splitSentences: o2, splitTerms: a2, splitWhitespace: i2 } = n2.one.tokenize;
          return e2 = o2(e2 = e2 || "", t2).map((e3) => {
            let n3 = a2(e3, r2);
            return n3 = n3.map((e4) => i2(e4, r2)), n3.forEach((e4) => {
              Ur(e4, t2);
            }), n3;
          }), e2;
        } } } };
        const eo = {}, to = {};
        [[["approx", "apt", "bc", "cyn", "eg", "esp", "est", "etc", "ex", "exp", "prob", "pron", "gal", "min", "pseud", "fig", "jd", "lat", "lng", "vol", "fm", "def", "misc", "plz", "ea", "ps", "sec", "pt", "pref", "pl", "pp", "qt", "fr", "sq", "nee", "ss", "tel", "temp", "vet", "ver", "fem", "masc", "eng", "adj", "vb", "rb", "inf", "situ", "vivo", "vitro", "wr"]], [["dl", "ml", "gal", "qt", "pt", "tbl", "tsp", "tbsp", "km", "dm", "cm", "mm", "mi", "td", "hr", "hrs", "kg", "hg", "dg", "cg", "mg", "\xB5g", "lb", "oz", "sq ft", "hz", "mps", "mph", "kmph", "kb", "mb", "tb", "lx", "lm", "fl oz", "yb"], "Unit"], [["ad", "al", "arc", "ba", "bl", "ca", "cca", "col", "corp", "ft", "fy", "ie", "lit", "ma", "md", "pd", "tce"], "Noun"], [["adj", "adm", "adv", "asst", "atty", "bldg", "brig", "capt", "cmdr", "comdr", "cpl", "det", "dr", "esq", "gen", "gov", "hon", "jr", "llb", "lt", "maj", "messrs", "mlle", "mme", "mr", "mrs", "ms", "mstr", "phd", "prof", "pvt", "rep", "reps", "res", "rev", "sen", "sens", "sfc", "sgt", "sir", "sr", "supt", "surg"], "Honorific"], [["jan", "feb", "mar", "apr", "jun", "jul", "aug", "sep", "sept", "oct", "nov", "dec"], "Month"], [["dept", "univ", "assn", "bros", "inc", "ltd", "co"], "Organization"], [["rd", "st", "dist", "mt", "ave", "blvd", "cl", "cres", "hwy", "ariz", "cal", "calif", "colo", "conn", "fla", "fl", "ga", "ida", "ia", "kan", "kans", "minn", "neb", "nebr", "okla", "penna", "penn", "pa", "dak", "tenn", "tex", "ut", "vt", "va", "wis", "wisc", "wy", "wyo", "usafa", "alta", "ont", "que", "sask"], "Place"]].forEach((e2) => {
          e2[0].forEach((t2) => {
            eo[t2] = true, to[t2] = "Abbreviation", void 0 !== e2[1] && (to[t2] = [to[t2], e2[1]]);
          });
        });
        var no = ["anti", "bi", "co", "contra", "de", "extra", "infra", "inter", "intra", "macro", "micro", "mis", "mono", "multi", "peri", "pre", "pro", "proto", "pseudo", "re", "sub", "supra", "trans", "tri", "un", "out", "ex"].reduce((e2, t2) => (e2[t2] = true, e2), {});
        const ro = { "!": "\xA1", "?": "\xBF\u0241", '"': '\u201C\u201D"\u275D\u275E', "'": "\u2018\u201B\u275B\u275C\u2019", "-": "\u2014\u2013", a: "\xAA\xC0\xC1\xC2\xC3\xC4\xC5\xE0\xE1\xE2\xE3\xE4\xE5\u0100\u0101\u0102\u0103\u0104\u0105\u01CD\u01CE\u01DE\u01DF\u01E0\u01E1\u01FA\u01FB\u0200\u0201\u0202\u0203\u0226\u0227\u023A\u0386\u0391\u0394\u039B\u03AC\u03B1\u03BB\u0410\u0430\u0466\u0467\u04D0\u04D1\u04D2\u04D3\u019B\xE6", b: "\xDF\xFE\u0180\u0181\u0182\u0183\u0184\u0185\u0243\u0392\u03B2\u03D0\u03E6\u0411\u0412\u042A\u042C\u0432\u044A\u044C\u0462\u0463\u048C\u048D", c: "\xA2\xA9\xC7\xE7\u0106\u0107\u0108\u0109\u010A\u010B\u010C\u010D\u0186\u0187\u0188\u023B\u023C\u037B\u037C\u03F2\u03F9\u03FD\u03FE\u0421\u0441\u0454\u0480\u0481\u04AA\u04AB", d: "\xD0\u010E\u010F\u0110\u0111\u0189\u018A\u0221\u018B\u018C", e: "\xC8\xC9\xCA\xCB\xE8\xE9\xEA\xEB\u0112\u0113\u0114\u0115\u0116\u0117\u0118\u0119\u011A\u011B\u0190\u0204\u0205\u0206\u0207\u0228\u0229\u0246\u0247\u0388\u0395\u039E\u03A3\u03AD\u03B5\u03BE\u03F5\u0400\u0401\u0415\u0435\u0450\u0451\u04BC\u04BD\u04BE\u04BF\u04D6\u04D7\u1EC5", f: "\u0191\u0192\u03DC\u03DD\u04FA\u04FB\u0492\u0493\u017F", g: "\u011C\u011D\u011E\u011F\u0120\u0121\u0122\u0123\u0193\u01E4\u01E5\u01E6\u01E7\u01F4\u01F5", h: "\u0124\u0125\u0126\u0127\u0195\u01F6\u021E\u021F\u0389\u0397\u0402\u040A\u040B\u041D\u043D\u0452\u045B\u04A2\u04A3\u04A4\u04A5\u04BA\u04BB\u04C9\u04CA", I: "\xCC\xCD\xCE\xCF", i: "\xEC\xED\xEE\xEF\u0128\u0129\u012A\u012B\u012C\u012D\u012E\u012F\u0130\u0131\u0196\u0197\u0208\u0209\u020A\u020B\u038A\u0390\u03AA\u03AF\u03B9\u03CA\u0406\u0407\u0456\u0457i\u0307", j: "\u0134\u0135\u01F0\u0237\u0248\u0249\u03F3\u0408\u0458", k: "\u0136\u0137\u0138\u0198\u0199\u01E8\u01E9\u039A\u03BA\u040C\u0416\u041A\u0436\u043A\u045C\u049A\u049B\u049C\u049D\u049E\u049F\u04A0\u04A1", l: "\u0139\u013A\u013B\u013C\u013D\u013E\u013F\u0140\u0141\u0142\u019A\u01AA\u01C0\u01CF\u01D0\u0234\u023D\u0399\u04C0\u04CF", m: "\u039C\u03FA\u03FB\u041C\u043C\u04CD\u04CE", n: "\xD1\xF1\u0143\u0144\u0145\u0146\u0147\u0148\u0149\u014A\u014B\u019D\u019E\u01F8\u01F9\u0220\u0235\u039D\u03A0\u03AE\u03B7\u03DE\u040D\u0418\u0419\u041B\u041F\u0438\u0439\u043B\u043F\u045D\u048A\u048B\u04C5\u04C6\u04E2\u04E3\u04E4\u04E5\u03C0", o: "\xD2\xD3\xD4\xD5\xD6\xD8\xF0\xF2\xF3\xF4\xF5\xF6\xF8\u014C\u014D\u014E\u014F\u0150\u0151\u019F\u01A0\u01A1\u01D1\u01D2\u01EA\u01EB\u01EC\u01ED\u01FE\u01FF\u020C\u020D\u020E\u020F\u022A\u022B\u022C\u022D\u022E\u022F\u0230\u0231\u038C\u0398\u039F\u03B8\u03BF\u03C3\u03CC\u03D5\u03D8\u03D9\u03EC\u03F4\u041E\u0424\u043E\u0472\u0473\u04E6\u04E7\u04E8\u04E9\u04EA\u04EB", p: "\u01A4\u03A1\u03C1\u03F7\u03F8\u03FC\u0420\u0440\u048E\u048F\xDE", q: "\u024A\u024B", r: "\u0154\u0155\u0156\u0157\u0158\u0159\u01A6\u0210\u0211\u0212\u0213\u024C\u024D\u0403\u0413\u042F\u0433\u044F\u0453\u0490\u0491", s: "\u015A\u015B\u015C\u015D\u015E\u015F\u0160\u0161\u01A7\u01A8\u0218\u0219\u023F\u0405\u0455", t: "\u0162\u0163\u0164\u0165\u0166\u0167\u01AB\u01AC\u01AD\u01AE\u021A\u021B\u0236\u023E\u0393\u03A4\u03C4\u03EE\u0422\u0442", u: "\xD9\xDA\xDB\xDC\xF9\xFA\xFB\xFC\u0168\u0169\u016A\u016B\u016C\u016D\u016E\u016F\u0170\u0171\u0172\u0173\u01AF\u01B0\u01B1\u01B2\u01D3\u01D4\u01D5\u01D6\u01D7\u01D8\u01D9\u01DA\u01DB\u01DC\u0214\u0215\u0216\u0217\u0244\u03B0\u03C5\u03CB\u03CD", v: "\u03BD\u0474\u0475\u0476\u0477", w: "\u0174\u0175\u019C\u03C9\u03CE\u03D6\u03E2\u03E3\u0428\u0429\u0448\u0449\u0461\u047F", x: "\xD7\u03A7\u03C7\u03D7\u03F0\u0425\u0445\u04B2\u04B3\u04FC\u04FD\u04FE\u04FF", y: "\xDD\xFD\xFF\u0176\u0177\u0178\u01B3\u01B4\u0232\u0233\u024E\u024F\u038E\u03A5\u03AB\u03B3\u03C8\u03D2\u03D3\u03D4\u040E\u0423\u0443\u0447\u045E\u0470\u0471\u04AE\u04AF\u04B0\u04B1\u04EE\u04EF\u04F0\u04F1\u04F2\u04F3", z: "\u0179\u017A\u017B\u017C\u017D\u017E\u01B5\u01B6\u0224\u0225\u0240\u0396" }, oo = {};
        Object.keys(ro).forEach(function(e2) {
          ro[e2].split("").forEach(function(t2) {
            oo[t2] = e2;
          });
        });
        const ao = /\//, io = /[a-z]\.[a-z]/i, so = /[0-9]/, lo = function(e2, t2) {
          const n2 = e2.normal || e2.text || e2.machine, r2 = t2.model.one.aliases;
          if (r2.hasOwnProperty(n2) && (e2.alias = e2.alias || [], e2.alias.push(r2[n2])), ao.test(n2) && !io.test(n2) && !so.test(n2)) {
            const t3 = n2.split(ao);
            t3.length <= 3 && t3.forEach((t4) => {
              "" !== (t4 = t4.trim()) && (e2.alias = e2.alias || [], e2.alias.push(t4));
            });
          }
          return e2;
        }, uo = /^\p{Letter}+-\p{Letter}+$/u, co = function(e2) {
          let t2 = e2.implicit || e2.normal || e2.text;
          t2 = t2.replace(/['’]s$/, ""), t2 = t2.replace(/s['’]$/, "s"), t2 = t2.replace(/([aeiou][ktrp])in'$/, "$1ing"), uo.test(t2) && (t2 = t2.replace(/-/g, "")), t2 = t2.replace(/^[#@]/, ""), t2 !== e2.normal && (e2.machine = t2);
        }, ho = function(e2, t2) {
          const n2 = e2.docs;
          for (let r2 = 0; r2 < n2.length; r2 += 1) for (let o2 = 0; o2 < n2[r2].length; o2 += 1) t2(n2[r2][o2], e2.world);
        }, go = { alias: (e2) => ho(e2, lo), machine: (e2) => ho(e2, co), normal: (e2) => ho(e2, Ur), freq: function(e2) {
          const t2 = e2.docs, n2 = {};
          for (let e3 = 0; e3 < t2.length; e3 += 1) for (let r2 = 0; r2 < t2[e3].length; r2 += 1) {
            const o2 = t2[e3][r2], a2 = o2.machine || o2.normal;
            n2[a2] = n2[a2] || 0, n2[a2] += 1;
          }
          for (let e3 = 0; e3 < t2.length; e3 += 1) for (let r2 = 0; r2 < t2[e3].length; r2 += 1) {
            const o2 = t2[e3][r2], a2 = o2.machine || o2.normal;
            o2.freq = n2[a2];
          }
        }, offset: function(e2) {
          let t2 = 0, n2 = 0;
          const r2 = e2.document;
          for (let e3 = 0; e3 < r2.length; e3 += 1) for (let o2 = 0; o2 < r2[e3].length; o2 += 1) {
            const a2 = r2[e3][o2];
            a2.offset = { index: n2, start: t2 + a2.pre.length, length: a2.text.length }, t2 += a2.pre.length + a2.text.length + a2.post.length, n2 += 1;
          }
        }, index: function(e2) {
          const t2 = e2.document;
          for (let e3 = 0; e3 < t2.length; e3 += 1) for (let n2 = 0; n2 < t2[e3].length; n2 += 1) t2[e3][n2].index = [e3, n2];
        }, wordCount: function(e2) {
          let t2 = 0;
          const n2 = e2.docs;
          for (let e3 = 0; e3 < n2.length; e3 += 1) for (let r2 = 0; r2 < n2[e3].length; r2 += 1) "" !== n2[e3][r2].normal && (t2 += 1, n2[e3][r2].wordCount = t2);
        } };
        var mo = { compute: go, methods: Yr, model: { one: { aliases: { "&": "and", "@": "at", "%": "percent", plz: "please", bein: "being" }, abbreviations: eo, prefixes: no, suffixes: { like: true, ish: true, less: true, able: true, elect: true, type: true, designate: true }, prePunctuation: { "#": true, "@": true, _: true, "\xB0": true, "\u200B": true, "\u200C": true, "\u200D": true, "\uFEFF": true }, postPunctuation: { "%": true, _: true, "\xB0": true, "\u200B": true, "\u200C": true, "\u200D": true, "\uFEFF": true }, lexicon: to, unicode: oo, emoticons: { "<3": true, "</3": true, "<\\3": true, ":^P": true, ":^p": true, ":^O": true, ":^3": true } } }, hooks: ["alias", "machine", "index", "id"] };
        var po = { typeahead: function(e2) {
          const t2 = e2.model.one.typeahead, n2 = e2.docs;
          if (0 === n2.length || 0 === Object.keys(t2).length) return;
          const r2 = n2[n2.length - 1] || [], o2 = r2[r2.length - 1];
          if (!o2.post && t2.hasOwnProperty(o2.normal)) {
            const n3 = t2[o2.normal];
            o2.implicit = n3, o2.machine = n3, o2.typeahead = true, e2.compute.preTagger && e2.last().unTag("*").compute(["lexicon", "preTagger"]);
          }
        } };
        const fo = function() {
          const e2 = this.docs;
          if (0 === e2.length) return this;
          const t2 = e2[e2.length - 1] || [], n2 = t2[t2.length - 1];
          return true === n2.typeahead && n2.machine && (n2.text = n2.machine, n2.normal = n2.machine), this;
        }, bo = { safe: true, min: 3 };
        var vo = { typeahead: function(e2 = [], t2 = {}) {
          const n2 = this.model();
          var r2;
          t2 = Object.assign({}, bo, t2), r2 = e2, "[object Object]" === Object.prototype.toString.call(r2) && (Object.assign(n2.one.lexicon, e2), e2 = Object.keys(e2));
          const o2 = function(e3, t3, n3) {
            let r3 = {};
            const o3 = [], a2 = n3.prefixes || {};
            return e3.forEach((e4) => {
              let i2 = (e4 = e4.toLowerCase().trim()).length;
              t3.max && i2 > t3.max && (i2 = t3.max);
              for (let s2 = t3.min; s2 < i2; s2 += 1) {
                const i3 = e4.substring(0, s2);
                t3.safe && n3.model.one.lexicon.hasOwnProperty(i3) || (true !== a2.hasOwnProperty(i3) && true !== r3.hasOwnProperty(i3) ? r3[i3] = e4 : o3.push(i3));
              }
            }), r3 = Object.assign({}, a2, r3), o3.forEach((e4) => {
              delete r3[e4];
            }), r3;
          }(e2, t2, this.world());
          return Object.keys(o2).forEach((e3) => {
            n2.one.typeahead.hasOwnProperty(e3) ? delete n2.one.typeahead[e3] : n2.one.typeahead[e3] = o2[e3];
          }), this;
        } };
        var yo = { model: { one: { typeahead: {} } }, api: function(e2) {
          e2.prototype.autoFill = fo;
        }, lib: vo, compute: po, hooks: ["typeahead"] };
        d.extend(W), d.extend(jn), d.extend(Wt), d.extend(Vn), d.extend(pr), d.plugin(we), d.extend(mo), d.extend(Ce), d.plugin(f), d.extend(Se), d.extend(yo), d.extend(Ge), d.extend($n);
        var wo = { addendum: "addenda", corpus: "corpora", criterion: "criteria", curriculum: "curricula", genus: "genera", memorandum: "memoranda", opus: "opera", ovum: "ova", phenomenon: "phenomena", referendum: "referenda", alga: "algae", alumna: "alumnae", antenna: "antennae", formula: "formulae", larva: "larvae", nebula: "nebulae", vertebra: "vertebrae", analysis: "analyses", axis: "axes", diagnosis: "diagnoses", parenthesis: "parentheses", prognosis: "prognoses", synopsis: "synopses", thesis: "theses", neurosis: "neuroses", appendix: "appendices", index: "indices", matrix: "matrices", ox: "oxen", sex: "sexes", alumnus: "alumni", bacillus: "bacilli", cactus: "cacti", fungus: "fungi", hippopotamus: "hippopotami", libretto: "libretti", modulus: "moduli", nucleus: "nuclei", octopus: "octopi", radius: "radii", stimulus: "stimuli", syllabus: "syllabi", cookie: "cookies", calorie: "calories", auntie: "aunties", movie: "movies", pie: "pies", rookie: "rookies", tie: "ties", zombie: "zombies", leaf: "leaves", loaf: "loaves", thief: "thieves", foot: "feet", goose: "geese", tooth: "teeth", beau: "beaux", chateau: "chateaux", tableau: "tableaux", bus: "buses", gas: "gases", circus: "circuses", crisis: "crises", virus: "viruses", database: "databases", excuse: "excuses", abuse: "abuses", avocado: "avocados", barracks: "barracks", child: "children", clothes: "clothes", echo: "echoes", embargo: "embargoes", epoch: "epochs", deer: "deer", halo: "halos", man: "men", woman: "women", mosquito: "mosquitoes", mouse: "mice", person: "people", quiz: "quizzes", rodeo: "rodeos", shoe: "shoes", sombrero: "sombreros", stomach: "stomachs", tornado: "tornados", tuxedo: "tuxedos", volcano: "volcanoes" }, ko = { Comparative: "true\xA6bett1f0;arth0ew0in0;er", Superlative: "true\xA6earlier", PresentTense: "true\xA6bests,sounds", Condition: "true\xA6lest,unless", PastTense: "true\xA6began,came,d4had,kneel3l2m0sa4we1;ea0sg2;nt;eap0i0;ed;id", Participle: "true\xA60:09;a06b01cZdXeat0fSgQhPoJprov0rHs7t6u4w1;ak0ithdra02o2r1;i02uY;k0v0;nd1pr04;ergoJoJ;ak0hHo3;e9h7lain,o6p5t4un3w1;o1um;rn;g,k;ol0reS;iQok0;ught,wn;ak0o1runk;ne,wn;en,wn;ewriNi1uJ;dd0s0;ut3ver1;do4se0t1;ak0h2;do2g1;roG;ne;ast0i7;iv0o1;ne,tt0;all0loBor1;bi3g2s1;ak0e0;iv0o9;dd0;ove,r1;a5eamt,iv0;hos0lu1;ng;e4i3lo2ui1;lt;wn;tt0;at0en,gun;r2w1;ak0ok0;is0;en", Gerund: "true\xA6accord0be0doin,go0result0stain0;ing", Expression: "true\xA6a0Yb0Uc0Sd0Oe0Mfarew0Lg0FhZjeez,lWmVnToOpLsJtIuFvEw7y0;a5e3i1u0;ck,p;k04p0;ee,pee;a0p,s;!h;!a,h,y;a5h2o1t0;af,f;rd up,w;atsoever,e1o0;a,ops;e,w;hoo,t;ery w06oi0L;gh,h0;! 0h,m;huh,oh;here nPsk,ut tut;h0ic;eesh,hh,it,oo;ff,h1l0ow,sst;ease,s,z;ew,ooey;h1i,mg,o0uch,w,y;h,o,ps;! 0h;hTmy go0wT;d,sh;a7evertheless,o0;!pe;eh,mm;ah,eh,m1ol0;!s;ao,fao;aCeBi9o2u0;h,mph,rra0zzC;h,y;l1o0;r6y9;la,y0;! 0;c1moCsmok0;es;ow;!p hip hoor0;ay;ck,e,llo,y;ha1i,lleluj0;ah;!ha;ah,ee4o1r0;eat scott,r;l1od0sh; grief,bye;ly;! whiz;ell;e0h,t cetera,ureka,ww,xcuse me;k,p;'oh,a0rat,uh;m0ng;mit,n0;!it;mon,o0;ngratulations,wabunga;a2oo1r0tw,ye;avo,r;!ya;h,m; 1h0ka,las,men,rgh,ye;!a,em,h,oy;la", Negative: "true\xA6n0;ever,o0;n,t", QuestionWord: "true\xA6how3wh0;at,e1ich,o0y;!m,se;n,re; come,'s", Reflexive: "true\xA6h4it5my5o1the0your2;ir1m1;ne3ur0;sel0;f,ves;er0im0;self", Plural: "true\xA6dick0gre0ones,records;ens", "Unit|Noun": "true\xA6cEfDgChBinchAk9lb,m6newt5oz,p4qt,t1y0;ardEd;able1b0ea1sp;!l,sp;spo1;a,t,x;on9;!b,g,i1l,m,p0;h,s;!les;!b,elvin,g,m;!es;g,z;al,b;eet,oot,t;m,up0;!s", Value: "true\xA6a few", Imperative: "true\xA6bewa0come he0;re", "Plural|Verb": "true\xA6leaves", Demonym: "true\xA60:15;1:12;a0Vb0Oc0Dd0Ce08f07g04h02iYjVkTlPmLnIomHpEqatari,rCs7t5u4v3welAz2;am0Gimbabwe0;enezuel0ietnam0I;gAkrai1;aiwTex0hai,rinida0Ju2;ni0Prkmen;a5cotti4e3ingapoOlovak,oma0Spaniard,udRw2y0W;ede,iss;negal0Cr09;sh;mo0uT;o5us0Jw2;and0;a2eru0Fhilippi0Nortugu07uerto r0S;kist3lesti1na2raguay0;ma1;ani;ami00i2orweP;caragu0geri2;an,en;a3ex0Lo2;ngo0Drocc0;cedo1la2;gasy,y07;a4eb9i2;b2thua1;e0Cy0;o,t01;azakh,eny0o2uwaiI;re0;a2orda1;ma0Ap2;anO;celandic,nd4r2sraeli,ta01vo05;a2iB;ni0qi;i0oneU;aiAin2ondur0unO;di;amEe2hanai0reek,uatemal0;or2rm0;gi0;ilipino,ren8;cuadoVgyp4mira3ngli2sto1thiopi0urope0;shm0;ti;ti0;aPominUut3;a9h6o4roat3ub0ze2;ch;!i0;lom2ngol5;bi0;a6i2;le0n2;ese;lifor1m2na3;bo2eroo1;di0;angladeshi,el6o4r3ul2;gaE;azi9it;li2s1;vi0;aru2gi0;si0;fAl7merBngol0r5si0us2;sie,tr2;a2i0;li0;genti2me1;ne;ba1ge2;ri0;ni0;gh0r2;ic0;an", Organization: "true\xA60:4Q;a3Tb3Bc2Od2He2Df27g1Zh1Ti1Pj1Nk1Ll1Gm12n0Po0Mp0Cqu0Br02sTtHuCv9w3xiaomi,y1;amaha,m1Bou1w1B;gov,tu3C;a4e2iki1orld trade organizati33;leaRped0O;lls fargo,st1;fie2Hinghou2R;l1rner br3U;gree3Jl street journ2Im1E;an halOeriz2Xisa,o1;dafo2Yl1;kswagMvo;b4kip,n2ps,s1;a tod3Aps;es3Mi1;lev3Fted natio3C;er,s; mobi32aco beRd bOe9gi frida3Lh3im horto3Amz,o1witt3D;shi49y1;ota,s r 05;e 1in lizzy;b3carpen3Jdaily ma3Dguess w2holli0s1w2;mashing pumpki35uprem0;ho;ea1lack eyed pe3Xyr0Q;ch bo3Dtl0;l2n3Qs1xas instrumen1U;co,la m1F;efoni0Kus;a8cientology,e5ieme2Ymirnoff,np,o3pice gir6quare0Ata1ubaru;rbuc1to34;ks;ny,undgard1;en;a2x pisto1;ls;g1Wrs;few2Minsbur31lesfor03msu2E;adiohead,b8e4o1yana3C;man empi1Xyal 1;b1dutch she4;ank;a3d 1max,vl20;bu1c2Ahot chili peppe2Ylobst2N;ll;ders dige1Ll madrid;c,s;ant3Aizn2Q;a8bs,e5fiz2Ihilip4i3r1;emier 1udenti1D;leagTo2K;nk floyd,zza hut; morrBs;psi2tro1uge0E;br33chi0Tn33;!co;lant2Un1yp16; 2ason27da2P;ld navy,pec,range juli2xf1;am;us;aAb9e6fl,h5i4o1sa,vid3wa;k2tre dame,vart1;is;ia;ke,ntendo,ss0QvZ;l,s;c,st1Otflix,w1; 1sweek;kids on the block,york0D;a,c;nd22s2t1;ional aca2Po,we0U;a,c02d0S;aDcdonalCe9i6lb,o3tv,y1;spa1;ce;b1Tnsanto,ody blu0t1;ley cr1or0T;ue;c2t1;as,subisO;helin,rosoft;dica2rcedes benz,talli1;ca;id,re;ds;cs milk,tt19z24;a3e1g,ittle caesa1P; ore09novo,x1;is,mark,us; 1bour party;pres0Dz boy;atv,fc,kk,lm,m1od1O;art;iffy lu0Roy divisi0Jpmorgan1sa;! cha09;bm,hop,k3n1tv;g,te1;l,rpol;ea;a5ewlett pack1Vi3o1sbc,yundai;me dep1n1P;ot;tac1zbollah;hi;lliburt08sbro;eneral 6hq,ithub,l5mb,o2reen d0Ou1;cci,ns n ros0;ldman sachs,o1;dye1g0H;ar;axo smith kli04encoW;electr0Nm1;oto0Z;a5bi,c barcelo4da,edex,i2leetwood m03o1rito l0G;rd,xcY;at,fa,nancial1restoZ; tim0;na;cebook,nnie mae;b0Asa,u3xxon1; m1m1;ob0J;!rosceptics;aiml0De5isney,o4u1;nkin donu2po0Zran dur1;an;ts;j,w jon0;a,f lepp12ll,peche mode,r spieg02stiny's chi1;ld;aJbc,hFiDloudflaCnn,o3r1;aigsli5eedence clearwater reviv1ossra09;al;c7inba6l4m1o0Est09;ca2p1;aq;st;dplSg1;ate;se;a c1o chanQ;ola;re;a,sco1tigroup;! systems;ev2i1;ck fil a,na daily;r1y;on;d2pital o1rls jr;ne;bury,ill1;ac;aEbc,eBf9l5mw,ni,o1p,rexiteeU;ei3mbardiIston 1;glo1pizza;be;ng;o2ue c1;roV;ckbuster video,omingda1;le; g1g1;oodriL;cht2e ge0rkshire hathaw1;ay;el;cardi,idu,nana republ3s1xt5y5;f,kin robbi1;ns;ic;bYcTdidSerosmith,iRlKmEnheuser busDol,ppleAr6s4u3v2y1;er;is,on;di,todesk;hland o1sociated E;il;b3g2m1;co;os;ys; compu1be0;te1;rs;ch;c,d,erican3t1;!r1;ak; ex1;pre1;ss; 5catel2ta1;ir;! lu1;ce1;nt;jazeera,qae1;da;g,rbnb;as;/dc,a3er,tivision1;! blizz1;ard;demy of scienc0;es;ba", Possessive: "true\xA6its,my,our0thy;!s", "Noun|Verb": "true\xA60:9W;1:AA;2:96;3:A3;4:9R;5:A2;6:9K;7:8N;8:7L;9:A8;A:93;B:8D;C:8X;a9Ob8Qc7Id6Re6Gf5Sg5Hh55i4Xj4Uk4Rl4Em40n3Vo3Sp2Squ2Rr21s0Jt02u00vVwGyFzD;ip,oD;ne,om;awn,e6Fie68;aOeMhJiHoErD;ap,e9Oink2;nd0rDuC;kDry,sh5Hth;!shop;ck,nDpe,re,sh;!d,g;e86iD;p,sD;k,p0t2;aDed,lco8W;r,th0;it,lk,rEsDt4ve,x;h,te;!ehou1ra9;aGen5FiFoD;iDmAte,w;ce,d;be,ew,sA;cuum,l4B;pDr7;da5gra6Elo6A;aReQhrPiOoMrGuEwiDy5Z;n,st;nDrn;e,n7O;aGeFiEoDu6;t,ub2;bu5ck4Jgg0m,p;at,k,nd;ck,de,in,nsDp,v7J;f0i8R;ll,ne,p,r4Yss,t94uD;ch,r;ck,de,e,le,me,p,re;e5Wow,u6;ar,e,ll,mp0st,xt;g,lDng2rg7Ps5x;k,ly;a0Sc0Ne0Kh0Fi0Dk0Cl0Am08n06o05pXquaBtKuFwD;ea88iD;ng,pe,t4;bGit,m,ppErD;fa3ge,pri1v2U;lDo6S;e6Py;!je8;aMeLiKoHrEuDy2;dy,ff,mb2;a85eEiDo5Pugg2;ke,ng;am,ss,t4;ckEop,p,rD;e,m;ing,pi2;ck,nk,t4;er,m,p;ck,ff,ge,in,ke,lEmp,nd,p2rDte,y;!e,t;k,l;aJeIiHlGoFrDur,y;ay,e56inDu3;g,k2;ns8Bt;a5Qit;ll,n,r87te;ed,ll;m,n,rk;b,uC;aDee1Tow;ke,p;a5Je4FiDo53;le,rk;eep,iDou4;ce,p,t;ateboa7Ii;de,gnDl2Vnk,p,ze;!al;aGeFiEoDuff2;ck,p,re,w;ft,p,v0;d,i3Ylt0;ck,de,pe,re,ve;aEed,nDrv1It;se,t2N;l,r4t;aGhedu2oBrD;aEeDibb2o3Z;en,w;pe,t4;le,n,r2M;cDfegua72il,mp2;k,rifi3;aZeHhy6LiGoEuD;b,in,le,n,s5X;a6ck,ll,oDpe,u5;f,t;de,ng,ot,p,s1W;aTcSdo,el,fQgPje8lOmMnLo17pJque6sFturn,vDwa6V;eDi27;al,r1;er74oFpe8tEuD;lt,me;!a55;l71rt;air,eaDly,o53;l,t;dezvo2Zt;aDedy;ke,rk;ea1i4G;a6Iist0r5N;act6Yer1Vo71uD;nd,se;a38o6F;ch,s6G;c1Dge,iEke,lly,nDp1Wt1W;ge,k,t;n,se;es6Biv0;a04e00hYiXlToNrEsy4uD;mp,n4rcha1sh;aKeIiHoDu4O;be,ceFdu3fi2grDje8mi1p,te6;amDe6W;!me;ed,ss;ce,de,nt;sDy;er6Cs;cti3i1;iHlFoEp,re,sDuCw0;e,i5Yt;l,p;iDl;ce,sh;nt,s5V;aEce,e32uD;g,mp,n7;ce,nDy;!t;ck,le,n17pe,tNvot;a1oD;ne,tograph;ak,eFnErDt;fu55mA;!c32;!l,r;ckJiInHrFsEtDu1y;ch,e9;s,te;k,tD;!y;!ic;nt,r,se;!a7;bje8ff0il,oErDutli3Qver4B;bAd0ie9;ze;a4ReFoDur1;d,tD;e,i3;ed,gle8tD;!work;aMeKiIoEuD;rd0;ck,d3Rld,nEp,uDve;nt,th;it5EkD;ey;lk,n4Brr5CsDx;s,ta2B;asuBn4UrDss;ge,it;il,nFp,rk3WsEtD;ch,t0;h,k,t0;da5n0oeuvB;aLeJiHoEuD;mp,st;aEbby,ck,g,oDve;k,t;d,n;cDe,ft,mAnIst;en1k;aDc0Pe4vK;ch,d,k,p,se;bFcEnd,p,t4uD;gh,n4;e,k;el,o2U;eEiDno4E;ck,d,ll,ss;el,y;aEo1OuD;i3mp;m,zz;mpJnEr46ssD;ue;c1Rdex,fluGha2k,se2HteDvoi3;nt,rD;e6fa3viD;ew;en3;a8le2A;aJeHiGoEuD;g,nt;l3Ano2Dok,pDr1u1;!e;ghli1Fke,nt,re,t;aDd7lp;d,t;ck,mGndFrEsh,tDu9;ch,e;bo3Xm,ne4Eve6;!le;!m0;aMear,ift,lKossJrFuD;arDe4Alp,n;antee,d;aFiEoDumb2;uCwth;ll,nd,p;de,sp;ip;aBoDue;ss,w;g,in,me,ng,s,te,ze;aZeWiRlNoJrFuD;ck,el,nDss,zz;c38d;aEoDy;st,wn;cDgme,me,nchi1;tuB;cFg,il,ld,rD;ce,e29mDwa31;!at;us;aFe0Vip,oDy;at,ck,od,wD;!er;g,ke,me,re,sh,vo1E;eGgFlEnDre,sh,t,x;an3i0Q;e,m,t0;ht,uB;ld;aEeDn3;d,l;r,tuB;ce,il,ll,rm,vo2W;cho,d7ffe8nMsKxFyeD;!baD;ll;cGerci1hFpDtra8;eriDo0W;en3me9;au6ibA;el,han7u1;caDtima5;pe;count0d,vy;a01eSiMoJrEuDye;b,el,mp,pli2X;aGeFiEoD;ne,p;ft,ll,nk,p,ve;am,ss;ft,g,in;cEd7ubt,wnloD;ad;k,u0E;ge6p,sFt4vD;e,iDor3;de;char7gui1h,liEpD;at4lay,u5;ke;al,bKcJfeIlGmaCposAsEtaD;il;e07iD;gn,re;ay,ega5iD;ght;at,ct;li04rea1;a5ut;b,ma7n3rDte;e,t;a0Eent0Dh06irc2l03oKrFuD;be,e,rDt;b,e,l,ve;aGeFoEuDy;sh;p,ss,wd;dAep;ck,ft,sh;at,de,in,lTmMnFordina5py,re,st,uDv0;gh,nDp2rt;s01t;ceHdu8fli8glomeIsFtDveN;a8rD;a6ol;e9tru8;ct;ntDrn;ra5;bHfoGmFpD;leDouCromi1;me9;aCe9it,u5;rt;at,iD;ne;lap1oD;r,ur;aEiDoud,ub;ck,p;im,w;aEeDip;at,ck,er;iGllen7nErD;ge,m,t;ge,nD;el;n,r;er,re;ke,ll,mp,noe,pGrXsFtEuDve;se,ti0I;alog,ch;h,t;!tuB;re;a03eZiXlToPrHuEyD;pa11;bb2ck2dgEff0mp,rDst,zz;den,n;et;anJeHiFoadEuD;i1sh;ca6;be,d7;ge;aDed;ch,k;ch,d;aFg,mb,nEoDrd0tt2x,ycott;k,st,t;d,e;rd,st;aFeCiDoYur;nk,tz;nd;me;as,d,ke,nd,opsy,tD;!ch,e;aFef,lt,nDt;d,efA;it;r,t;ck,il,lan3nIrFsEtt2;le;e,h;!gDk;aDe;in;!d,g,k;bu1c05dZge,iYlVnTppQrLsIttGucEwaD;rd;tiD;on;aDempt;ck;k,sD;i6ocia5;st;chFmD;!oD;ur;!iD;ve;eEroa4;ch;al;chDg0sw0;or;aEt0;er;rm;d,m,r;dreHvD;an3oD;ca5;te;ce;ss;cDe,he,t;eFoD;rd,u9;nt;nt,ss;se", Actor: "true\xA60:7B;1:7G;2:6A;3:7F;4:7O;5:7K;a6Nb62c4Ud4Be41f3Sg3Bh30i2Uj2Qkin2Pl2Km26n1Zo1Sp0Vqu0Tr0JsQtJuHvEw8yo6;gi,ut6;h,ub0;aAe9i8o7r6;estl0it0;m2rk0;fe,nn0t2Bza2H;atherm2ld0;ge earn0it0nder0rri1;eter7i6oyF;ll5Qp,s3Z;an,ina2U;n6s0;c6Uder03;aoisea23e9herapi5iktok0o8r6ut1yco6S;a6endseLo43;d0mp,nscri0Bvel0;ddl0u1G;a0Qchn7en6na4st0;ag0;i3Oo0D;aiXcUeRhPiMki0mu26oJpGquaFtBu7wee6;p0theart;lt2per7r6;f0ge6Iviv1;h6inten0Ist5Ivis1;ero,um2;a8ep7r6;ang0eam0;bro2Nc2Ofa2Nmo2Nsi20;ff0tesm2;tt0;ec7ir2Do6;kesp59u0M;ia5Jt3;l7me6An,rcere6ul;r,ss;di0oi5;n7s6;sy,t0;g0n0;am2ephe1Iow6;girl,m2r2Q;cretInior cit3Fr6;gea4v6;a4it1;hol4Xi7reen6ulpt1;wr2C;e01on;l1nt;aEe9o8u6;l0nn6;er up,ingE;g40le mod3Zof0;a4Zc8fug2Ppo32searQv6;ere4Uolution6;ary;e6luYru22;ptio3T;bbi,dic5Vpp0;arter6e2Z;back;aYeWhSiRlOoKr8sycho7u6;nk,p31;logi5;aGeDiBo6;d9fess1g7ph47s6;pe2Ktitu51;en6ramm0;it1y;igy,uc0;est4Nme mini0Unce6s3E;!ss;a7si6;de4;ch0;ctiti39nk0P;dca0Oet,li6pula50rnst42;c2Itic6;al scie6i2;nti5;a6umb0;nn0y6;er,ma4Lwright;lgrim,one0;a8iloso7otogra7ra6ysi1V;se;ph0;ntom,rmaci5;r6ssi1T;form0s4O;i3El,nel3Yr8st1tr6wn;i6on;arWot;ent4Wi42tn0;ccupa4ffBp8r7ut6;ca5l0B;ac4Iganiz0ig2Fph2;er3t6;i1Jomet6;ri5;ic0spring;aBe9ie4Xo7u6;n,rser3J;b6mad,vi4V;le2Vo4D;i6mesis,phew;ce,ghb1;nny,rr3t1X;aEeDiAo7u6yst1Y;m8si16;der3gul,m7n6th0;arDk;!my;ni7s6;f02s0Jt0;on,st0;chan1Qnt1rcha4;gi9k0n8rtyr,t6y1;e,riar6;ch;ag0iac;ci2stra3I;a7e2Aieutena4o6;rd,s0v0;bor0d7ndlo6ss,urea3Fwy0ym2;rd;!y;!s28;e8o7u6;ggl0;gg0urna2U;st0;c3Hdol,llu3Ummigra4n6; l9c1Qfa4habi42nov3s7ve6;nt1stig3;pe0Nt6;a1Fig3ru0M;aw;airFeBistoAo8u6ygie1K;man6sba2H;!ita8;bo,st6usekN;age,e3P;ri2;ir,r6;m7o6;!ine;it;dress0sty2C;aLeIhostGirl26ladi3oCrand7u6;e5ru;c9daug0Jfa8m7pa6s2Y;!re4;a,o6;th0;hi1B;al7d6lf0;!de3A;ie,k6te26;eep0;!wr6;it0;isha,n6;i6tl04;us;mbl0rden0;aDella,iAo7r6;eela2Nie1P;e,re6ster pare4;be1Hm2r6st0;unn0;an2ZgZlmm17nanci0r6tt0;e6st la2H; marsh2OfigXm2;rm0th0;conoEdDlectriCm8n7x6;amin0cellency,i2A;emy,trepreneur,vironmenta1J;c8p6;er1loye6;e,r;ee;ci2;it1;mi5;aKeBi8ork,ri7u6we02;de,tche2H;ft0v0;ct3eti7plom2Hre6va;ct1;ci2ti2;aDcor3fencCi0InAput9s7tectLvel6;op0;ce1Ge6ign0;rt0;ee,y;iz6;en;em2;c1Ml0;d8nc0redev7ug6;ht0;il;!dy;a06e04fo,hXitizenWlToBr9u6;r3stomer6;! representat6;ive;e3it6;ic;lJmGnAord9rpor1Nu7w6;boy,ork0;n6ri0;ciTte1Q;in3;fidantAgressSs9t6;e0Kr6;ibut1o6;ll0;tab13ul1O;!e;edi2m6pos0rade;a0EeQissi6;on0;leag8on7um6;ni5;el;ue;e6own;an0r6;ic,k;!s;a9e7i6um;ld;erle6f;ad0;ir7nce6plFract0;ll1;m2wI;lebri6o;ty;dBptAr6shi0;e7pe6;nt0;r,t6;ak0;ain;et;aMeLiJlogg0oErBu6;dd0Fild0rgl9siness6;m2p7w6;om2;ers05;ar;i7o6;!k0th0;cklay0de,gadi0;hemi2oge8y6;!frie6;nd;ym2;an;cyc6sR;li5;atbox0ings;by,nk0r6;b0on7te6;nd0;!e07;c04dWge4nQpLrHsFtAu7yatull6;ah;nt7t6;h1oG;!ie;h8t6;e6orney;nda4;ie5le6;te;sis00tron6;aut,om0;chbis8isto7tis6;an,t;crU;hop;ost9p6;ari6rentiS;ti6;on;le;a9cest1im3nou8y6;bo6;dy;nc0;ly5rc6;hi5;mi8v6;entur0is1;er;ni7r6;al;str3;at1;or;counBquaintanArob9t6;ivi5or,re6;ss;st;at;ce;ta4;nt", "Adj|Noun": "true\xA60:16;a1Db17c0Ud0Re0Mf0Dg0Ah08i06ju05l02mWnUoSpNrIsBt7u4v1watershed;a1ision0Z;gabo4nilla,ria1;b0Vnt;ndergr1pstairs;adua14ou1;nd;a3e1oken,ri0;en,r1;min0rori13;boo,n;age,e5ilv0Flack,o3quat,ta2u1well;bordina0Xper5;b0Lndard;ciali0Yl1vereign;e,ve16;cret,n1ri0;ior;a4e2ou1ubbiL;nd,tiY;ar,bBl0Wnt0p1side11;resent0Vublican;ci0Qsh;a4eriodic0last0Zotenti0r1;emi2incip0o1;!fession0;er,um;rall4st,tie0U;ff1pposi0Hv0;ens0Oi0C;agg01ov1uts;el;a5e3iniatJo1;bi01der07r1;al,t0;di1tr0N;an,um;le,riG;attOi2u1;sh;ber0ght,qC;stice,veniT;de0mpressioYn1;cumbe0Edividu0no0Dsta0Eterim;alf,o1umdrum;bby,melF;en2old,ra1;ph0Bve;er0ious;a7e5i4l3u1;git03t1;ure;uid;ne;llow,m1;aFiL;ir,t,vo1;riOuriO;l3p00x1;c1ecutUpeV;ess;d1iK;er;ar2e1;mographUrivO;k,l2;hiGlassSo2rude,unn1;ing;m5n1operK;creCstitueOte2vertab1;le;mpor1nt;ary;ic,m2p1;anion,lex;er2u1;ni8;ci0;al;e5lank,o4r1;i2u1;te;ef;ttom,urgeois;st;cadem9d6l2ntarct9r1;ab,ct8;e3tern1;at1;ive;rt;oles1ult;ce1;nt;ic", "Adj|Past": "true\xA60:4Q;1:4C;2:4H;3:4E;a44b3Tc36d2Je29f20g1Wh1Si1Jj1Gkno1Fl1Am15n12o0Xp0Mqu0Kr08sLtEuAv9w4yellow0;a7ea6o4rinkl0;r4u3Y;n,ri0;k31th3;rp0sh0tZ;ari0e1O;n5p4s0;d1li1Rset;cov3derstood,i4;fi0t0;a8e3Rhr7i6ouTr4urn0wi4C;a4imm0ou2G;ck0in0pp0;ed,r0;eat2Qi37;m0nn0r4;get0ni2T;aOcKeIhGimFm0Hoak0pDt7u4;bsid3Ogge44s4;pe4ta2Y;ct0nd0;a8e7i2Eok0r5u4;ff0mp0nn0;ength2Hip4;ed,p0;am0reotyp0;in0t0;eci4ik0oH;al3Efi0;pRul1;a4ock0ut;d0r0;a4c1Jle2t31;l0s3Ut0;a6or5r4;at4e25;ch0;r0tt3;t4ut0;is2Mur1;aEe5o4;tt0;cAdJf2Bg9je2l8m0Knew0p7qu6s4;eTpe2t4;or0ri2;e3Dir0;e1lac0;at0e2Q;i0Rul1;eiv0o4ycl0;mme2Lrd0v3;in0lli0ti2A;a4ot0;li28;aCer30iBlAo9r5u4;mp0zzl0;e6i2Oo4;ce2Fd4lo1Anou30pos0te2v0;uc0;fe1CocCp0Iss0;i2Kli1L;ann0e2CuS;ck0erc0ss0;ck0i2Hr4st0;allLk0;bse7c6pp13rgan2Dver4;lo4whelm0;ok0;cupi0;rv0;aJe5o4;t0uri1A;ed0gle2;a6e5ix0o4ut0ys1N;di1Nt15u26;as0Clt0;n4rk0;ag0ufact0A;e6i5o4;ad0ck0st,v0;cens0m04st0;ft,v4;el0;tt0wn;a5o15u4;dg0s1B;gg0;llumSmpAn4sol1;br0cre1Ldebt0f8jZspir0t5v4;it0olv0;e4ox0Y;gr1n4re23;d0si15;e2l1o1Wuri1;li0o01r4;ov0;a6e1o4um03;ok0r4;ri0Z;mm3rm0;i6r5u4;a1Bid0;a0Ui0Rown;ft0;aAe9i8l6oc0Ir4;a4i0oz0Y;ctHg19m0;avo0Ju4;st3;ni08tt0x0;ar0;d0il0sc4;in1;dCl1mBn9quipp0s8x4;agger1c6p4te0T;a0Se4os0;ct0rie1D;it0;cap0tabliZ;cha0XgFha1As4;ur0;a0Zbarra0N;i0Buc1;aMeDi5r4;a01i0;gni08miniSre2s4;a9c6grun0Ft4;o4re0Hu17;rt0;iplWou4;nt0r4;ag0;bl0;cBdRf9l8p7ra6t5v4;elop0ot0;ail0ermQ;ng0;re07;ay0ight0;e4in0o0M;rr0;ay0enTor1;m5t0z4;ed,zl0;ag0p4;en0;aPeLhIlHo9r6u4;lt4r0stom03;iv1;a5owd0u4;sh0;ck0mp0;d0loAm7n4ok0v3;centr1f5s4troC;id3olid1;us0;b5pl4;ic1;in0;r0ur0;assi9os0utt3;ar5i4;ll0;g0m0;lebr1n6r4;ti4;fi0;tralJ;g0lcul1;aDewild3iCl9o7r5urn4;ed,t;ok4uis0;en;il0r0t4und;tl0;e5i4;nd0;ss0;as0;ffl0k0laMs0tt3;bPcNdKfIg0lFmaz0nDppBrm0ss9u5wa4;rd0;g5thor4;iz0;me4;nt0;o6u4;m0r0;li0re4;ci1;im1ticip1;at0;a5leg0t3;er0;rm0;fe2;ct0;ju5o7va4;nc0;st0;ce4knowledg0;pt0;and5so4;rb0;on0;ed", Singular: "true\xA60:5I;1:5G;2:4V;3:4R;4:51;5:56;6:5K;7:55;8:5A;a51b4Kc3Md34e2Wf2Ng2Ih27in23j22k21l1Tm1Kn1Go1Ap0Qqu0Pr0EsYtLuHvCw9x r57yo yo;a9ha3Oo3P;f3i4Qt0Fy9;! arou38;arCeAideo ga2Po9;cabu4Il5B;gNr9t;di4Yt1X;iety,ni4O;nAp2Zr9s do43;bani1in0;coordinat3Ader9;estima1to24we41; rex,aKeJhHiFoErBuAv9;! show;m2On2rntLto1D;agedy,ib9o4E;e,u9;n0ta46;ni1p2rq3L;c,er,m9;etF;ing9ree26;!y;am,mp3F;ct2le6x return;aNcMeKhor4QiJkHoGpin off,tDuBy9;ll9ner7st4T;ab2X;b9i1n28per bowl,rro1X;st3Ltot0;atAipe2Go1Lrate7udent9;! lo0I;i39u1;ft ser4Lmeo1I;elet5i9;ll,r3V;b38gn2Tte;ab2Jc9min3B;t,urity gua2N;e6ho2Y;bbatic0la3Jndwi0Qpi5;av5eDhetor2iAo9;de6om,w;tAv9;erb2C;e,u0;bDcBf9publ2r10spi1;er9orm3;e6r0;i9ord label;p2Ht0;a1u46;estion mark,ot2F;aPeMhoLiIlGoErAu9yram1F;ddi3HpErpo1Js3J;eBo9;bl3Zs9;pe3Jta1;dic1Rmi1Fp1Qroga8ss relea1F;p9rt0;py;a9ebisci1;q2Dte;cn2eAg9;!gy;!r;ne call,tocoK;anut,dAr9t0yo1;cen3Jsp3K;al,est0;nop4rAt9;e,hog5;adi11i2V;atme0bj3FcBpia1rde0thers,utspok5ve9wn3;n,r9;ti0Pview;cuAe9;an;pi3;arBitAot9umb3;a2Fhi2R;e,ra1;cot2ra8;aFeCiAo9ur0;nopo4p18rni2Nsq1Rti36uld;c,li11n0As9tt5;chief,si34;dAnu,t9;al,i3;al,ic;gna1mm0nd15rsupi0te9yf4;ri0;aDegCiBu9;ddi1n9;ch;me,p09; Be0M;bor14y9; 9er;up;eyno1itt5;el4ourn0;cBdices,itia8ni25sAtel0Lvert9;eb1J;e28titu1;en8i2T;aIeEighDoAu9;man right,s22;me9rmoFsp1Ftb0K;! r9;un; scho0YriY;a9i1N;d9v5; start,pho9;ne;ndful,sh brown,v5ze;aBelat0Ilaci3r9ul4yp1S;an9enadi3id;a1Cd slam,ny;df4r9;l2ni1I;aGeti1HiFlu1oCrAun9;er0;ee market,i9onti3;ga1;l4ur9;so9;me;ePref4;br2mi4;conoFffi7gg,lecto0Rmbas1EnCpidem2s1Zth2venBxAyel9;id;ampZempl0Nte6;i19t;er7terp9;ri9;se;my;eLiEoBr9ump tru0U;agonf4i9;er,ve thru;cAg7i4or,ssi3wn9;side;to0EumenE;aEgniDnn3sAvide9;nd;conte6incen8p9tri11;osi9;ti0C;ta0H;le0X;athBcAf9ni0terre6;ault 05err0;al,im0;!b9;ed;aWeThMiLlJoDr9;edit caBuc9;ib9;le;rd;efficDke,lCmmuniqLnsApi3rr0t0Xus9yo1;in;erv9uI;ato02;ic,lQ;ie6;er7i9oth;e6n2;ty,vil wM;aDeqCick5ocoBr9;istmas car9ysanthemum;ol;la1;ue;ndeli3racteri9;st2;iAllEr9;e0tifica1;liZ;hi3nFpErCt9ucus;erpi9hedr0;ll9;ar;!bohyd9ri3;ra1;it0;aAe,nib0t9;on;l,ry;aMeLiop2leJoHrDu9;nny,r9tterf4;g9i0;la9;ry;eakAi9;ck;fa9throB;st;dy,ro9wl;ugh;mi9;sh;an,l4;nkiArri3;er;ng;cSdMlInFppeti1rDsBtt2utop9;sy;ic;ce6pe9;ct;r9sen0;ay;ecAoma4tiA;ly;do1;i5l9;er7y;gy;en; hominDjAvan9;tage;ec8;ti9;ve;em;cCeAqui9;tt0;ta1;te;iAru0;al;de6;nt", "Person|Noun": "true\xA6a0Eb07c03dWeUfQgOhLjHkiGlFmCnBolive,p7r4s3trini06v1wa0;ng,rd,tts;an,enus,iol0;a,et;ky,onPumm09;ay,e1o0uby;bin,d,se;ed,x;a2e1o0;l,tt04;aLnJ;dYge,tR;at,orm;a0eloW;t0x,ya;!s;a9eo,iH;ng,tP;a2e1o0;lGy;an,w3;de,smi4y;a0erb,iOolBuntR;ll,z0;el;ail,e0iLuy;ne;a1ern,i0lo;elds,nn;ith,n0;ny;a0dEmir,ula,ve;rl;a4e3i1j,ol0;ly;ck,x0;ie;an,ja;i0wn;sy;am,h0liff,rystal;a0in,ristian;mbers,ri0;ty;a4e3i2o,r0ud;an0ook;dy;ll;nedict,rg;k0nks;er;l0rt;fredo,ma", "Actor|Verb": "true\xA6aCb8c5doctor,engineAfool,g3host,judge,m2nerd,p1recruit,scout,ushAvolunteAwi0;mp,tneA;arent,ilot;an,ime;eek,oof,r0uide;adu8oom;ha1o0;ach,nscript,ok;mpion,uffeur;o2u0;lly,tch0;er;ss;ddi1ffili0rchite1;ate;ct", MaleName: "true\xA60:H6;1:FZ;2:DS;3:GQ;4:CZ;5:FV;6:GM;7:FP;8:GW;9:ET;A:C2;B:GD;aF8bE1cCQdBMeASfA1g8Yh88i7Uj6Sk6Bl5Mm48n3So3Ip33qu31r26s1Et0Ru0Ov0CwTxSyHzC;aCor0;cChC1karia,nAT;!hDkC;!aF6;!ar7CeF5;aJevgenBSoEuC;en,rFVsCu3FvEF;if,uf;nDs6OusC;ouf,s6N;aCg;s,tC;an,h0;hli,nCrosE1ss09;is,nC;!iBU;avi2ho5;aPeNiDoCyaEL;jcieBJlfgang,odrFutR;lFnC;f8TsC;lCt1;ow;bGey,frEhe4QlC;aE5iCy;am,e,s;ed8iC;d,ed;eAur;i,ndeD2rn2sC;!l9t1;lDyC;l1ne;lDtC;!er;aCHy;aKernDAiFladDoC;jteB0lodymyr;!iC;mFQsDB;cFha0ktBZnceDrgCOvC;a0ek;!nC;t,zo;!e4StBV;lCnC7sily;!entC;in9J;ghE2lCm70nax,ri,sm0;riCyss87;ch,k;aWeRhNiLoGrEuDyC;!l2roEDs1;n6r6E;avD0eCist0oy,um0;ntCRvBKy;bFdAWmCny;!asDmCoharu;aFFie,y;!z;iA6y;mCt4;!my,othy;adEeoDia0SomC;!as;!dor91;!de4;dFrC;enBKrC;anBJeCy;ll,nBI;!dy;dgh,ha,iCnn2req,tsu5V;cDAka;aYcotWeThPiMlobod0oKpenc2tEurDvenAEyCzym1;ed,lvest2;aj,e9V;anFeDuC;!aA;fan17phEQvCwaA;e77ie;!islaCl9;v,w;lom1rBuC;leymaDHta;dDgmu9UlCm1yabonga;as,v8B;!dhart8Yn9;aEeClo75;lCrm0;d1t1;h9Jne,qu1Jun,wn,yne;aDbastiEDk2Yl5Mpp,rgCth,ymoCU;e1Dio;m4n;!tC;!ie,y;eDPlFmEnCq67tosCMul;dCj2UtiA5;e01ro;!iATkeB6mC4u5;!ik,vato9K;aZeUheC8iRoGuDyC;an,ou;b99dDf4peAssC;!elEG;ol00y;an,bLc7MdJel,geIh0lHmGnEry,sDyC;!ce;ar7Ocoe,s;!aCnBU;ld,n;an,eo;a7Ef;l7Jr;e3Eg2n9olfo,riC;go;bBNeDH;cCl9;ar87c86h54kCo;!ey,ie,y;cFeA3gDid,ubByCza;an8Ln06;g85iC;naC6s;ep;ch8Kfa5hHin2je8HlGmFndEoHpha5sDul,wi36yC;an,mo8O;h9Im4;alDSol3O;iD0on;f,ph;ul;e9CinC;cy,t1;aOeLhilJiFrCyoG;aDeC;m,st1;ka85v2O;eDoC;tr;r8GtC;er,ro;!ipCl6H;!p6U;dCLrcy,tC;ar,e9JrC;!o7;b9Udra8So9UscAHtri62ulCv8I;!ie,o7;ctav6Ji2lImHndrBRrGsDtCum6wB;is,to;aDc6k6m0vCwaBE;al79;ma;i,vR;ar,er;aDeksandr,ivC;er,i2;f,v;aNeLguyBiFoCu3O;aDel,j4l0ma0rC;beAm0;h,m;cFels,g5i9EkDlC;es,s;!au,h96l78olaC;!i,y;hCkCol76;ol75;al,d,il,ls1vC;ilAF;hom,tC;e,hC;anCy;!a5i5;aYeViLoGuDyC;l4Nr1;hamDr84staC;fa,p6E;ed,mG;di10e,hamEis4JntDritz,sCussa;es,he;e,y;ad,ed,mC;ad,ed;cGgu5hai,kFlEnDtchC;!e8O;a9Pik;house,o7t1;ae73eC3ha8Iolaj;ah,hDkC;!ey,y;aDeC;al,l;el,l;hDlv3rC;le,ri8Ev4T;di,met;ay0c00gn4hWjd,ks2NlTmadZnSrKsXtDuric7VxC;imilBKwe8B;eHhEi69tCus,y69;!eo,hCia7;ew,i67;eDiC;as,eu,s;us,w;j,o;cHiGkFlEqu8Qsha83tCv3;iCy;!m,n;in,on;el,o7us;a6Yo7us;!elCin,o7us;!l8o;frAEi5Zny,u5;achDcoCik;lm;ai,y;amDdi,e5VmC;oud;adCm6W;ou;aulCi9P;ay;aWeOiMloyd,oJuDyC;le,nd1;cFdEiDkCth2uk;a7e;gi,s,z;ov7Cv6Hw6H;!as,iC;a6Een;g0nn52renDuCvA4we7D;!iS;!zo;am,n4oC;n5r;a9Yevi,la5KnHoFst2thaEvC;eCi;nte;bo;nCpo8V;!a82el,id;!nC;aAy;mEnd1rDsz73urenCwr6K;ce,t;ry,s;ar,beAont;aOeIhalHiFla4onr63rDu5SylC;e,s;istCzysztof;i0oph2;er0ngsl9p,rC;ilA9k,ollos;ed,id;en0iGnDrmCv4Z;it;!dDnCt1;e2Ny;ri4Z;r,th;cp2j4mEna8BrDsp6them,uC;ri;im,l;al,il;a03eXiVoFuC;an,lCst3;en,iC;an,en,o,us;aQeOhKkub4AnIrGsDzC;ef;eDhCi9Wue;!ua;!f,ph;dCge;i,on;!aCny;h,s,th6J;anDnC;!ath6Hie,n72;!nC;!es;!l,sCy;ph;o,qu3;an,mC;!i,m6V;d,ffFns,rCs4;a7JemDmai7QoCry;me,ni1H;i9Dy;!e73rC;ey,y;cKdBkImHrEsDvi2yC;dBs1;on,p2;ed,oDrCv67;e6Qod;d,s61;al,es5Wis1;a,e,oCub;b,v;ob,qu13;aTbNchiMgLke53lija,nuKonut,rIsEtCv0;ai,suC;ki;aDha0i8XmaCsac;el,il;ac,iaC;h,s;a,vinCw3;!g;k,nngu6X;nac1Xor;ka;ai,rahC;im;aReLoIuCyd6;beAgGmFsC;eyDsC;a3e3;in,n;ber5W;h,o;m2raDsse3wC;a5Pie;c49t1K;a0Qct3XiGnDrC;beAman08;dr7VrC;iCy2N;!k,q1R;n0Tt3S;bKlJmza,nIo,rEsDyC;a5KdB;an,s0;lEo67r2IuCv9;hi5Hki,tC;a,o;an,ey;k,s;!im;ib;a08e00iUlenToQrMuCyorgy;iHnFsC;!taC;f,vC;!e,o;n6tC;er,h2;do,lC;herDlC;auCerQ;me;aEegCov2;!g,orC;!io,y;dy,h7C;dfr9nza3XrDttfC;ri6C;an,d47;!n;acoGlEno,oCuseppe;rgiCvan6O;!o,s;be6Ies,lC;es;mo;oFrC;aDha4HrCt;it,y;ld,rd8;ffErgC;!e7iCy;!os;!r9;bElBrCv3;eCla1Nr4Hth,y;th;e,rC;e3YielC;!i4;aXeSiQlOorrest,rCyod2E;aHedFiC;edDtC;s,z;ri18;!d42eri11riC;ck,k;nCs2;cEkC;ie,lC;in,yn;esLisC;!co,z3M;etch2oC;ri0yd;d5lConn;ip;deriFliEng,rC;dinaCg4nan0B;nd8;pe,x;co;bCdi,hd;iEriC;ce,zC;io;an,en,o;benez2dZfrYit0lTmMnJo3rFsteb0th0ugenEvCymBzra;an,eCge4D;ns,re3K;!e;gi,iDnCrol,v3w3;est8ie,st;cCk;!h,k;o0DriCzo;co,qC;ue;aHerGiDmC;aGe3A;lCrh0;!iC;a10o,s;s1y;nu5;beAd1iEliDm2t1viCwood;n,s;ot28s;!as,j5Hot,sC;ha;a3en;!dGg6mFoDua2QwC;a2Pin;arC;do;oZuZ;ie;a04eTiOmitrNoFrag0uEwDylC;an,l0;ay3Hig4D;a3Gdl9nc0st3;minFnDri0ugCvydGy2S;!lF;!a36nCov0;e1Eie,y;go,iDykC;as;cCk;!k;i,y;armuFetDll1mitri7neCon,rk;sh;er,m6riC;ch;id;andLepak,j0lbeAmetri4nIon,rGsEvDwCxt2;ay30ey;en,in;hawn,moC;nd;ek,riC;ck;is,nC;is,y;rt;re;an,le,mKnIrEvC;e,iC;!d;en,iEne0PrCyl;eCin,yl;l45n;n,o,us;!iCny;el,lo;iCon;an,en,on;a0Fe0Ch03iar0lRoJrFuDyrC;il,us;rtC;!is;aEistC;iaCob12;no;ig;dy,lInErC;ey,neliCy;s,us;nEor,rDstaC;nt3;ad;or;by,e,in,l3t1;aHeEiCyde;fCnt,ve;fo0Xt1;menDt4;us;s,t;rFuDyC;!t1;dCs;e,io;enC;ce;aHeGrisC;!toC;phCs;!eC;!r;st2t;d,rCs;b5leC;s,y;cDdrCs6;ic;il;lHmFrC;ey,lDroCy;ll;!o7t1;er1iC;lo;!eb,v3;a09eZiVjorn,laUoSrEuCyr1;ddy,rtKst2;er;aKeFiEuDyC;an,ce,on;ce,no;an,ce;nDtC;!t;dDtC;!on;an,on;dFnC;dDisC;lav;en,on;!foOl9y;bby,gd0rCyd;is;i0Lke;bElDshC;al;al,lL;ek;nIrCshoi;at,nEtC;!raC;m,nd;aDhaCie;rd;rd8;!iDjam3nCs1;ie,y;to;kaMlazs,nHrC;n9rDtC;!holomew;eCy;tt;ey;dCeD;ar,iC;le;ar1Nb1Dd16fon15gust3hm12i0Zja0Yl0Bm07nTputsiSrGsaFugustEveDyCziz;a0kh0;ry;o,us;hi;aMchiKiJjun,mHnEon,tCy0;em,hCie,ur8;ur;aDoC;!ld;ud,v;aCin;an,nd8;!el,ki;baCe;ld;ta;aq;aMdHgel8tCw6;hoFoC;iDnC;!i8y;ne;ny;er7rCy;eDzC;ej;!as,i,j,s,w;!s;s,tolC;iCy;!y;ar,iEmaCos;nu5r;el;ne,r,t;aVbSdBeJfHiGl01onFphonsEt1vC;aPin;on;e,o;so,zo;!sR;!onZrC;ed;c,jaHksFssaHxC;!andC;er,rC;e,os,u;andCei;ar,er,r;ndC;ro;en;eDrecC;ht;rt8;dd3in,n,sC;taC;ir;ni;dDm6;ar;an,en;ad,eC;d,t;in;so;aGi,olErDvC;ik;ian8;f8ph;!o;mCn;!a;dGeFraDuC;!bakr,lfazl;hCm;am;!l;allFel,oulaye,ulC;!lDrahm0;an;ah,o;ah;av,on", Uncountable: "true\xA60:2E;1:2L;2:33;a2Ub2Lc29d22e1Rf1Ng1Eh16i11j0Yk0Wl0Rm0Hn0Do0Cp03rZsLt9uran2Jv7w3you gu0E;a5his17i4oo3;d,l;ldlife,ne;rm8t1;apor,ernacul29i3;neg28ol1Otae;eDhBiAo8r4un3yranny;a,gst1B;aff2Oea1Ko4ue nor3;th;o08u3;bleshoot2Ose1Tt;night,othpas1Vwn3;foEsfoE;me off,n;er3und1;e,mod2S;a,nnis;aDcCeBhAi9ki8o7p6t4u3weepstak0;g1Unshi2Hshi;ati08e3;am,el;ace2Keci0;ap,cc1meth2C;n,ttl0;lk;eep,ingl0or1C;lf,na1Gri0;ene1Kisso1C;d0Wfe2l4nd,t3;i0Iurn;m1Ut;abi0e4ic3;e,ke15;c3i01laxa11search;ogni10rea10;a9e8hys7luto,o5re3ut2;amble,mis0s3ten20;en1Zs0L;l3rk;i28l0EyH; 16i28;a24tr0F;nt3ti0M;i0s;bstetri24vercrowd1Qxyg09;a5e4owada3utella;ys;ptu1Ows;il poliZtional securi2;aAe8o5u3;m3s1H;ps;n3o1K;ey,o3;gamy;a3cha0Elancholy,rchandi1Htallurgy;sl0t;chine3g1Aj1Hrs,thema1Q; learn1Cry;aught1e6i5ogi4u3;ck,g12;c,s1M;ce,ghtn18nguis1LteratWv1;ath1isVss;ara0EindergartPn3;icke0Aowled0Y;e3upit1;a3llyfiGwel0G;ns;ce,gnor6mp5n3;forma00ter3;net,sta07;atiSort3rov;an18;a7e6isto09o3ung1;ckey,mework,ne4o3rseradi8spitali2use arrest;ky;s2y;adquarteXre;ir,libut,ppiHs3;hi3te;sh;ene8l6o5r3um,ymnas11;a3eZ;niUss;lf,re;ut3yce0F;en; 3ti0W;edit0Hpo3;ol;aNicFlour,o4urnit3;ure;od,rgive3uri1wl;ness;arCcono0LducaBlectr9n7quip8thi0Pvery6x3;ist4per3;ti0B;en0J;body,o08th07;joy3tertain3;ment;ici2o3;ni0H;tiS;nings,th;emi02i6o4raugh3ynas2;ts;pe,wnstai3;rs;abet0ce,s3;honZrepu3;te;aDelciChAivi07l8o3urrency;al,ld w6mmenta5n3ral,ttIuscoB;fusiHt 3;ed;ry;ar;assi01oth0;es;aos,e3;eMwK;us;d,rO;a8i6lood,owlHread5u3;ntGtt1;er;!th;lliarJs3;on;g3ss;ga3;ge;cKdviJeroGirFmBn6ppeal court,r4spi3thleL;rin;ithmet3sen3;ic;i6y3;o4th3;ing;ne;se;en5n3;es2;ty;ds;craft;bi8d3nau7;yna3;mi6;ce;id,ous3;ti3;cs", Infinitive: "true\xA60:9G;1:9T;2:AD;3:90;4:9Z;5:84;6:AH;7:A9;8:92;9:A0;A:AG;B:AI;C:9V;D:8R;E:8O;F:97;G:6H;H:7D;a94b8Hc7Jd68e4Zf4Mg4Gh4Ai3Qj3Nk3Kl3Bm34nou48o2Vp2Equ2Dr1Es0CtZuTvRwI;aOeNiLors5rI;eJiI;ng,te;ak,st3;d5e8TthI;draw,er;a2d,ep;i2ke,nIrn;d1t;aIie;liADniAry;nJpI;ho8Llift;cov1dJear8Hfound8DlIplug,rav82tie,ve94;eaAo3X;erIo;cut,go,staAFvalA3w2G;aSeQhNoMrIu73;aIe72;ffi3Smp3nsI;aBfo7CpI;i8oD;pp3ugh5;aJiJrIwaD;eat5i2;nk;aImA0;ch,se;ck3ilor,keImp1r8L;! paD;a0Ic0He0Fh0Bi0Al08mugg3n07o05p02qu01tUuLwI;aJeeIim;p,t5;ll7Wy;bNccMffLggeCmmKppJrI;mouFpa6Zvi2;o0re6Y;ari0on;er,i4;e7Numb;li9KmJsiIveD;de,st;er9it;aMe8MiKrI;ang3eIi2;ng27w;fIng;f5le;b,gg1rI;t3ve;a4AiA;a4UeJit,l7DoI;il,of;ak,nd;lIot7Kw;icEve;atGeak,i0O;aIi6;m,y;ft,ng,t;aKi6CoJriIun;nk,v6Q;ot,rt5;ke,rp5tt1;eIll,nd,que8Gv1w;!k,m;aven9ul8W;dd5tis1Iy;a0FeKiJoI;am,t,ut;d,p5;a0Ab08c06d05f01group,hea00iZjoi4lXmWnVpTq3MsOtMup,vI;amp,eJiIo3B;sEve;l,rI;e,t;i8rI;ie2ofE;eLiKpo8PtIurfa4;o24rI;aHiBuctu8;de,gn,st;mb3nt;el,hra0lIreseF;a4e71;d1ew,o07;aHe3Fo2;a7eFiIo6Jy;e2nq41ve;mbur0nf38;r0t;inKleBocus,rJuI;el,rbiA;aBeA;an4e;aBu4;ei2k8Bla43oIyc3;gni39nci3up,v1;oot,uI;ff;ct,d,liIp;se,ze;tt3viA;aAenGit,o7;aWerUinpoiFlumm1LoTrLuI;b47ke,niArIt;poDsuI;aFe;eMoI;cKd,fe4XhibEmo7noJpo0sp1tru6vI;e,i6o5L;un4;la3Nu8;aGclu6dJf1occupy,sup0JvI;a6BeF;etermi4TiB;aGllu7rtr5Ksse4Q;cei2fo4NiAmea7plex,sIva6;eve8iCua6;mp1rItrol,ve;a6It6E;bOccuNmEpMutLverIwe;l07sJtu6Yu0wI;helm;ee,h1F;gr5Cnu2Cpa4;era7i4Ipo0;py,r;ey,seItaH;r2ss;aMe0ViJoIultiply;leCu6Pw;micJnIspla4;ce,g3us;!k;iIke,na9;m,ntaH;aPeLiIo0u3N;ke,ng1quIv5;eIi6S;fy;aKnIss5;d,gI;th5;rn,ve;ng2Gu1N;eep,idnJnI;e4Cow;ap;oHuI;gg3xtaI;po0;gno8mVnIrk;cTdRfQgeChPitia7ju8q1CsNtKun6EvI;a6eIo11;nt,rt,st;erJimi6BoxiPrI;odu4u6;aBn,pr03ru6C;iCpi8tIu8;all,il,ruB;abEibE;eCo3Eu0;iIul9;ca7;i7lu6;b5Xmer0pI;aLer4Uin9ly,oJrI;e3Ais6Bo2;rt,se,veI;riA;le,rt;aLeKiIoiCuD;de,jaInd1;ck;ar,iT;mp1ng,pp5raIve;ng5Mss;ath1et,iMle27oLrI;aJeIow;et;b,pp3ze;!ve5A;gg3ve;aTer45i5RlSorMrJuI;lf4Cndrai0r48;eJiIolic;ght5;e0Qsh5;b3XeLfeEgJsI;a3Dee;eIi2;!t;clo0go,shIwa4Z;ad3F;att1ee,i36;lt1st5;a0OdEl0Mm0FnXquip,rWsVtGvTxI;aRcPeDhOiNpJtIu6;ing0Yol;eKi8lIo0un9;aHoI;it,re;ct,di7l;st,t;a3oDu3B;e30lI;a10u6;lt,mi28;alua7oI;ke,l2;chew,pou0tab19;a0u4U;aYcVdTfSgQhan4joy,lPqOrNsuMtKvI;e0YisI;a9i50;er,i4rI;aHenGuC;e,re;iGol0F;ui8;ar9iC;a9eIra2ulf;nd1;or4;ang1oIu8;r0w;irc3lo0ou0ErJuI;mb1;oaGy4D;b3ct;bKer9pI;hasiIow1;ze;aKody,rI;a4oiI;d1l;lm,rk;ap0eBuI;ci40de;rIt;ma0Rn;a0Re04iKo,rIwind3;aw,ed9oI;wn;agno0e,ff1g,mi2Kne,sLvI;eIul9;rIst;ge,t;aWbVcQlod9mant3pNru3TsMtI;iIoDu37;lJngI;uiA;!l;ol2ua6;eJlIo0ro2;a4ea0;n0r0;a2Xe36lKoIu0S;uIv1;ra9;aIo0;im;a3Kur0;b3rm;af5b01cVduBep5fUliTmQnOpMrLsiCtaGvI;eIol2;lop;ch;a20i2;aDiBloIoD;re,y;oIy;te,un4;eJoI;liA;an;mEv1;a4i0Ao06raud,y;ei2iMla8oKrI;ee,yI;!pt;de,mIup3;missi34po0;de,ma7ph1;aJrief,uI;g,nk;rk;mp5rk5uF;a0Dea0h0Ai09l08oKrIurta1G;a2ea7ipp3uI;mb3;ales4e04habEinci6ll03m00nIrro6;cXdUfQju8no7qu1sLtKvI;eIin4;ne,r9y;aHin2Bribu7;er2iLoli2Epi8tJuI;lt,me;itu7raH;in;d1st;eKiJoIroFu0;rm;de,gu8rm;ss;eJoI;ne;mn,n0;eIlu6ur;al,i2;buCe,men4pI;eIi3ly;l,te;eBi6u6;r4xiC;ean0iT;rcumveFte;eJirp,oI;o0p;riAw;ncIre5t1ulk;el;a02eSi6lQoPrKuI;iXrIy;st,y;aLeaKiJoad5;en;ng;stfeLtX;ke;il,l11mba0WrrMth1;eIow;ed;!coQfrie1LgPhMliLqueaKstJtrIwild1;ay;ow;th;e2tt3;a2eJoI;ld;ad;!in,ui3;me;bysEckfi8ff3tI;he;b15c0Rd0Iff0Ggree,l0Cm09n03ppZrXsQttOuMvJwaE;it;eDoI;id;rt;gIto0X;meF;aIeCraB;ch,in;pi8sJtoI;niA;aKeIi04u8;mb3rt,ss;le;il;re;g0Hi0ou0rI;an9i2;eaKly,oiFrI;ai0o2;nt;r,se;aMi0GnJtI;icipa7;eJoIul;un4y;al;ly0;aJu0;se;lga08ze;iKlI;e9oIu6;t,w;gn;ix,oI;rd;a03jNmiKoJsoI;rb;pt,rn;niIt;st1;er;ouJuC;st;rn;cLhie2knowled9quiItiva7;es4re;ce;ge;eQliOoKrJusI;e,tom;ue;mIst;moJpI;any,liA;da7;ma7;te;pt;andPduBet,i6oKsI;coKol2;ve;liArt,uI;nd;sh;de;ct;on", Person: "true\xA60:1Q;a29b1Zc1Md1Ee18f15g13h0Ri0Qj0Nk0Jl0Gm09n06o05p00rPsItCusain bolt,v9w4xzibit,y1;anni,oko on2uji,v1;an,es;en,o;a3ednesday adams,i2o1;lfram,o0Q;ll ferrell,z khalifa;lt disn1Qr1;hol,r0G;a2i1oltai06;n dies0Zrginia wo17;lentino rossi,n goG;a4h3i2ripp,u1yra banks;lZpac shakur;ger woods,mba07;eresa may,or;kashi,t1ylor;um,ya1B;a5carlett johanss0h4i3lobodan milosevic,no2ocr1Lpider1uperm0Fwami; m0Em0E;op dogg,w whi1H;egfried,nbad;akespeaTerlock holm1Sia labeouf;ddam hussa16nt1;a cla11ig9;aAe6i5o3u1za;mi,n dmc,paul,sh limbau1;gh;bin hood,d stew16nald1thko;in0Mo;han0Yngo starr,valdo;ese witherspo0i1mbrandt;ll2nh1;old;ey,y;chmaninoff,ffi,iJshid,y roma1H;a4e3i2la16o1uff daddy;cahont0Ie;lar,p19;le,rZ;lm17ris hilt0;leg,prah winfr0Sra;a2e1iles cra1Bostradam0J; yo,l5tt06wmQ;pole0s;a5e4i2o1ubar03;by,lie5net,rriss0N;randa ju1tt romn0M;ly;rl0GssiaB;cklemo1rkov,s0ta hari,ya angelou;re;ady gaga,e1ibera0Pu;bron jam0Xch wale1e;sa;anye west,e3i1obe bryant;d cudi,efer suther1;la0P;ats,sha;a2effers0fk,k rowling,rr tolki1;en;ck the ripp0Mwaharlal nehru,y z;liTnez,ron m7;a7e5i3u1;lk hog5mphrey1sa01;! bog05;l1tl0H;de; m1dwig,nry 4;an;ile selassFlle ber4m3rrison1;! 1;ford;id,mo09;ry;ast0iannis,o1;odwPtye;ergus0lorence nightinga08r1;an1ederic chopN;s,z;ff5m2nya,ustaXzeki1;el;eril lagasse,i1;le zatop1nem;ek;ie;a6e4i2octor w1rake;ho;ck w1ego maradoC;olf;g1mi lovaOnzel washingt0;as;l1nHrth vadR;ai lNt0;a8h5lint0o1thulhu;n1olio;an,fuci1;us;on;aucKop2ristian baMy1;na;in;millo,ptain beefhe4r1;dinal wols2son1;! palmF;ey;art;a8e5hatt,i3oHro1;ck,n1;te;ll g1ng crosby;atB;ck,nazir bhut2rtil,yon1;ce;to;nksy,rack ob1;ama;l 6r3shton kutch2vril lavig8yn ra1;nd;er;chimed2istot1;le;es;capo2paci1;no;ne", Adjective: "true\xA60:AI;1:BS;2:BI;3:BA;4:A8;5:84;6:AV;7:AN;8:AF;9:7H;A:BQ;B:AY;C:BC;D:BH;E:9Y;aA2b9Ec8Fd7We79f6Ng6Eh61i4Xj4Wk4Tl4Im41n3Po36p2Oquart7Pr2Ds1Dt14uSvOwFye29;aMeKhIiHoF;man5oFrth7G;dADzy;despreB1n w97s86;acked1UoleF;!sa6;ather1PeFll o70ste1D;!k5;nt1Ist6Ate4;aHeGiFola5T;bBUce versa,gi3Lle;ng67rsa5R;ca1gBSluAV;lt0PnLpHrGsFttermoBL;ef9Ku3;b96ge1; Hb32pGsFtiAH;ca6ide d4R;er,i85;f52to da2;a0Fbeco0Hc0Bd04e02f01gu1XheaBGiXkn4OmUnTopp06pRrNsJtHus0wF;aFiel3K;nt0rra0P;app0eXoF;ld,uS;eHi37o5ApGuF;perv06spec39;e1ok9O;en,ttl0;eFu5;cogn06gul2RlGqu84sF;erv0olv0;at0en33;aFrecede0E;id,rallel0;am0otic0;aFet;rri0tF;ch0;nFq26vers3;sur0terFv7U;eFrupt0;st0;air,inish0orese98;mploy0n7Ov97xpF;ect0lain0;eHisFocume01ue;clFput0;os0;cid0rF;!a8Scov9ha8Jlyi8nea8Gprivileg0sMwF;aFei9I;t9y;hGircumcFonvin2U;is0;aFeck0;lleng0rt0;b20ppea85ssuGttend0uthorF;iz0;mi8;i4Ara;aLeIhoHip 25oGrF;anspare1encha1i2;geth9leADp notch,rpB;rny,ugh6H;ena8DmpGrFs6U;r49tia4;eCo8P;leFst4M;nt0;a0Dc09e07h06i04ki03l01mug,nobbi4XoVpRqueami4XtKuFymb94;bHccinAi generis,pFr5;erFre7N;! dup9b,vi70;du0li7Lp6IsFurb7J;eq9Atanda9X;aKeJi16o2QrGubboFy4Q;rn;aightFin5GungS; fFfF;or7V;adfa9Pri6;lwa6Ftu82;arHeGir6NlendBot Fry;on;c3Qe1S;k5se; call0lImb9phistic16rHuFviV;ndFth1B;proof;dBry;dFub6; o2A;e60ipF;pe4shod;ll0n d7R;g2HnF;ceEg6ist9;am3Se9;co1Zem5lfFn6Are7; suf4Xi43;aGholFient3A;ar5;rlFt4A;et;cr0me,tisfac7F;aOeIheumatoBiGoF;bu8Ztt7Gy3;ghtFv3; 1Sf6X;cJdu8PlInown0pro69sGtF;ard0;is47oF;lu2na1;e1Suc45;alcit8Xe1ondi2;bBci3mpa1;aSePicayu7laOoNrGuF;bl7Tnjabi;eKiIoF;b7VfGmi49pFxi2M;er,ort81;a7uD;maFor,sti7va2;!ry;ciDexis0Ima2CpaB;in55puli8G;cBid;ac2Ynt 3IrFti2;ma40tFv7W;!i3Z;i2YrFss7R;anoBtF; 5XiF;al,s5V;bSffQkPld OnMrLth9utKverF;!aIbMdHhGni75seas,t,wF;ei74rou74;a63e7A;ue;ll;do1Ger,si6A;d3Qg2Aotu5Z; bFbFe on o7g3Uli7;oa80;fashion0school;!ay; gua7XbFha5Uli7;eat;eHligGsF;ce7er0So1C;at0;diFse;a1e1;aOeNiMoGuF;anc0de; moEnHrthFt6V;!eFwe7L;a7Krn;chaGdescri7Iprof30sF;top;la1;ght5;arby,cessa4ighbor5wlyw0xt;k0usiaFv3;ti8;aQeNiLoHuF;dIltiF;facet0p6;deHlGnFot,rbBst;ochro4Xth5;dy;rn,st;ddle ag0nF;dbloZi,or;ag9diocEga,naGrFtropolit4Q;e,ry;ci8;cIgenta,inHj0Fkeshift,mmGnFri4Oscu61ver18;da5Dy;ali4Lo4U;!stream;abEho;aOeLiIoFumberi8;ngFuti1R;stan3RtF;erm,i4H;ghtGteraF;l,ry,te;heart0wei5O;ft JgFss9th3;al,eFi0M;nda4;nguBps0te5;apGind5noF;wi8;ut;ad0itte4uniW;ce co0Hgno6Mll0Cm04nHpso 2UrF;a2releF;va1; ZaYcoWdReQfOgrNhibi4Ri05nMoLsHtFvalu5M;aAeF;nDrdepe2K;a7iGolFuboI;ub6ve1;de,gF;nifica1;rdi5N;a2er;own;eriIiLluenVrF;ar0eq5H;pt,rt;eHiGoFul1O;or;e,reA;fiFpe26termi5E;ni2;mpFnsideCrreA;le2;ccuCdeq5Ene,ppr4J;fFsitu,vitro;ro1;mJpF;arHeGl15oFrop9;li2r11;n2LrfeA;ti3;aGeFi18;d4BnD;tuE;egGiF;c0YteC;al,iF;tiF;ma2;ld;aOelNiLoFuma7;a4meInHrrGsFur5;ti6;if4E;e58o3U; ma3GsF;ick;ghfalut2HspF;an49;li00pf33;i4llow0ndGrdFtM; 05coEworki8;sy,y;aLener44iga3Blob3oKrGuF;il1Nng ho;aFea1Fizzl0;cGtF;ef2Vis;ef2U;ld3Aod;iFuc2D;nf2R;aVeSiQlOoJrF;aGeFil5ug3;q43tf2O;gFnt3S;i6ra1;lk13oHrF; keeps,eFge0Vm9tu41;g0Ei2Ds3R;liF;sh;ag4Mowe4uF;e1or45;e4nF;al,i2;d Gmini7rF;ti6ve1;up;bl0lDmIr Fst pac0ux;oGreacF;hi8;ff;ed,ili0R;aXfVlTmQnOqu3rMthere3veryday,xF;aApIquisi2traHuF;be48lF;ta1;!va2L;edRlF;icF;it;eAstF;whi6; Famor0ough,tiE;rou2sui2;erGiF;ne1;ge1;dFe2Aoq34;er5;ficF;ie1;g9sF;t,ygF;oi8;er;aWeMiHoGrFue;ea4owY;ci6mina1ne,r31ti8ubQ;dact2Jfficult,m,sGverF;ge1se;creGePjoi1paCtF;a1inA;et,te; Nadp0WceMfiLgeneCliJmuEpeIreliAsGvoF;id,ut;pFtitu2ul1L;eCoF;nde1;ca2ghF;tf13;a1ni2;as0;facto;i5ngero0I;ar0Ce09h07i06l05oOrIuF;rmudgeon5stoma4teF;sy;ly;aIeHu1EystalF; cleFli7;ar;epy;fFv17z0;ty;erUgTloSmPnGrpoCunterclVveFy;rt;cLdJgr21jIsHtrF;aFi2;dic0Yry;eq1Yta1;oi1ug3;escenFuN;di8;a1QeFiD;it0;atoDmensuCpF;ass1SulF;so4;ni3ss3;e1niza1;ci1J;ockwiD;rcumspeAvil;eFintzy;e4wy;leGrtaF;in;ba2;diac,ef00;a00ePiLliJoGrFuck nak0;and new,isk,on22;gGldface,naF; fi05fi05;us;nd,tF;he;gGpartisFzarE;an;tiF;me;autifOhiNlLnHsFyoN;iWtselF;li8;eGiFt;gn;aFfi03;th;at0oF;v0w;nd;ul;ckwards,rF;e,rT; priori,b13c0Zd0Tf0Ng0Ihe0Hl09mp6nt06pZrTsQttracti0MuLvIwF;aGkF;wa1B;ke,re;ant garGeraF;ge;de;diIsteEtF;heFoimmu7;nt07;re;to4;hGlFtu2;eep;en;bitIchiv3roHtF;ifiFsy;ci3;ga1;ra4;ry;pFt;aHetizi8rF;oprF;ia2;llFre1;ed,i8;ng;iquFsy;at0e;ed;cohKiJkaHl,oGriFterX;ght;ne,of;li7;ne;ke,ve;olF;ic;ad;ain07gressiIi6rF;eeF;ab6;le;ve;fGraB;id;ectGlF;ue1;ioF;na2; JaIeGvF;erD;pt,qF;ua2;ma1;hoc,infinitum;cuCquiGtu3u2;al;esce1;ra2;erSjeAlPoNrKsGuF;nda1;e1olu2trF;aAuD;se;te;eaGuF;pt;st;aFve;rd;aFe;ze;ct;ra1;nt", Pronoun: "true\xA6elle,h3i2me,she,th0us,we,you;e0ou;e,m,y;!l,t;e,im", Preposition: "true\xA6aPbMcLdKexcept,fIinGmid,notwithstandiWoDpXqua,sCt7u4v2w0;/o,hereSith0;! whHin,oW;ersus,i0;a,s a vis;n1p0;!on;like,til;h1ill,oward0;!s;an,ereby,r0;ough0u;!oM;ans,ince,o that,uch G;f1n0ut;!to;!f;! 0to;effect,part;or,r0;om;espite,own,u3;hez,irca;ar1e0oBy;sides,tween;ri7;bo8cross,ft7lo6m4propos,round,s1t0;!op;! 0;a whole,long 0;as;id0ong0;!st;ng;er;ut", SportsTeam: "true\xA60:18;1:1E;2:1D;3:14;a1Db15c0Sd0Kfc dallas,g0Ihouston 0Hindiana0Gjacksonville jagua0k0El0Am01new UoRpKqueens parkJreal salt lake,sBt6utah jazz,vancouver whitecaps,w4yW;ashington 4h10;natio1Mredski2wizar0W;ampa bay 7e6o4;ronto 4ttenham hotspur;blue ja0Mrapto0;nnessee tita2xasD;buccanee0ra0K;a8eattle 6porting kansas0Wt4; louis 4oke0V;c1Drams;marine0s4;eah13ounH;cramento Rn 4;antonio spu0diego 4francisco gJjose earthquak1;char08paB; ran07;a9h6ittsburgh 5ortland t4;imbe0rail blaze0;pirat1steele0;il4oenix su2;adelphia 4li1;eagl1philNunE;dr1;akland 4klahoma city thunder,rlando magic;athle0Lrai4;de0;england 8orleans 7york 4;g5je3knYme3red bul0Xy4;anke1;ian3;pelica2sain3;patrio3revolut4;ion;anchEeAi4ontreal impact;ami 8lwaukee b7nnesota 4;t5vi4;kings;imberwolv1wi2;rewe0uc0J;dolphi2heat,marli2;mphis grizz4ts;li1;a6eic5os angeles 4;clippe0dodFlaB;esterV; galaxy,ke0;ansas city 4nF;chiefs,roya0D; pace0polis col3;astr05dynamo,rocke3texa2;olden state warrio0reen bay pac4;ke0;allas 8e4i04od6;nver 6troit 4;lio2pisto2ti4;ge0;broncYnugge3;cowbo5maver4;icZ;ys;arEelLhAincinnati 8leveland 6ol4;orado r4umbus crew sc;api7ocki1;brow2cavalie0guar4in4;dia2;bengaVre4;ds;arlotte horAicago 4;b5cubs,fire,wh4;iteB;ea0ulQ;diff4olina panthe0; city;altimore Alackburn rove0oston 6rooklyn 4uffalo bilN;ne3;ts;cel5red4; sox;tics;rs;oriol1rave2;rizona Ast8tlanta 4;brav1falco2h4;awA;ns;es;on villa,r4;os;c6di4;amondbac4;ks;ardi4;na4;ls", Unit: "true\xA6a07b04cXdWexVfTgRhePinYjoule0BkMlJmDnan08oCp9quart0Bsq ft,t7volts,w6y2ze3\xB01\xB50;g,s;c,f,n;dVear1o0;ttR; 0s 0;old;att,b;erNon0;!ne02;ascals,e1i0;cXnt00;rcent,tJ;hms,unceY;/s,e4i0m\xB2,\xB2,\xB3;/h,cro2l0;e0liK;!\xB2;grLsR;gCtJ;it1u0;menQx;erPreP;b5elvins,ilo1m0notO;/h,ph,\xB2;!byGgrEmCs;ct0rtzL;aJogrC;allonJb0ig3rB;ps;a0emtEl oz,t4;hrenheit,radG;aby9;eci3m1;aratDe1m0oulombD;\xB2,\xB3;lsius,nti0;gr2lit1m0;et0;er8;am7;b1y0;te5;l,ps;c2tt0;os0;econd1;re0;!s", "Noun|Gerund": "true\xA60:3O;1:3M;2:3N;3:3D;4:32;5:2V;6:3E;7:3K;8:36;9:3J;A:3B;a3Pb37c2Jd27e23f1Vg1Sh1Mi1Ij1Gk1Dl18m13n11o0Wp0Pques0Sr0EsTtNunderMvKwFyDzB;eroi0oB;ni0o3P;aw2eB;ar2l3;aEed4hispe5i5oCrB;ap8est3i1;n0ErB;ki0r31;i1r2s9tc9;isualizi0oB;lunt1Vti0;stan4ta6;aFeDhin6iCraBy8;c6di0i2vel1M;mi0p8;aBs1;c9si0;l6n2s1;aUcReQhOiMkatKl2Wmo6nowJpeItFuCwB;ea5im37;b35f0FrB;fi0vB;e2Mi2J;aAoryt1KrCuB;d2KfS;etc9ugg3;l3n4;bCi0;ebBi0;oar4;gnBnAt1;a3i0;ip8oB;p8rte2u1;a1r27t1;hCo5reBulp1;a2Qe2;edu3oo3;i3yi0;aKeEi4oCuB;li0n2;oBwi0;fi0;aFcEhear7laxi0nDpor1sB;pon4tructB;r2Iu5;de5;or4yc3;di0so2;p8ti0;aFeacek20laEoCrBublis9;a1Teten4in1oces7;iso2siB;tio2;n2yi0;ckaAin1rB;ki0t1O;fEpeDrganiCvB;erco24ula1;si0zi0;ni0ra1;fe5;avi0QeBur7;gotia1twor6;aDeCi2oB;de3nito5;a2dita1e1ssaA;int0XnBrke1;ifUufactu5;aEeaDiBodAyi0;cen7f1mi1stB;e2i0;r2si0;n4ug9;iCnB;ea4it1;c6l3;ogAuB;dAgg3stif12;ci0llust0VmDnBro2;nova1sp0NterBven1;ac1vie02;agi2plo4;aDea1iCoBun1;l4w3;ki0ri0;nd3rB;roWvB;es1;aCene0Lli4rBui4;ee1ie0N;rde2the5;aHeGiDlCorBros1un4;e0Pmat1;ir1oo4;gh1lCnBs9;anZdi0;i0li0;e3nX;r0Zscina1;a1du01nCxB;erci7plo5;chan1di0ginB;ee5;aLeHiGoub1rCum8wB;el3;aDeCiB;bb3n6vi0;a0Qs7;wi0;rTscoDvi0;ba1coZlBvelo8;eCiB;ve5;ga1;nGti0;aVelebUhSlPoDrBur3yc3;aBos7yi0;f1w3;aLdi0lJmFnBo6pi0ve5;dDsCvinB;ci0;trBul1;uc1;muniDpB;lBo7;ai2;ca1;lBo5;ec1;c9ti0;ap8eaCimToBubT;ni0t9;ni0ri0;aBee5;n1t1;ra1;m8rCs1te5;ri0;vi0;aPeNitMlLoGrDuB;dge1il4llBr8;yi0;an4eat9oadB;cas1;di0;a1mEokB;i0kB;ee8;pi0;bi0;es7oa1;c9i0;gin2lonAt1;gi0;bysit1c6ki0tt3;li0;ki0;bando2cGdverti7gi0pproac9rgDssuCtB;trac1;mi0;ui0;hi0;si0;coun1ti0;ti0;ni0;ng", PhrasalVerb: "true\xA60:92;1:96;2:8H;3:8V;4:8A;5:83;6:85;7:98;8:90;9:8G;A:8X;B:8R;C:8U;D:8S;E:70;F:97;G:8Y;H:81;I:7H;J:79;a9Fb7Uc6Rd6Le6Jf5Ig50h4Biron0j47k40l3Em31n2Yo2Wp2Cquiet Hr1Xs0KtZuXvacuu6QwNyammerBzK;ero Dip LonK;e0k0;by,ov9up;aQeMhLiKor0Mrit19;mp0n3Fpe0r5s5;ackAeel Di0S;aLiKn33;gh 3Wrd0;n Dr K;do1in,oJ;it 79k5lk Lrm 69sh Kt83v60;aw3do1o7up;aw3in,oC;rgeBsK;e 2herE;a00eYhViRoQrMuKypP;ckErn K;do1in,oJup;aLiKot0y 30;ckl7Zp F;ck HdK;e 5Y;n7Wp 3Es5K;ck MdLe Kghten 6me0p o0Rre0;aw3ba4do1in,up;e Iy 2;by,oG;ink Lrow K;aw3ba4in,up;ba4ov9up;aKe 77ll62;m 2r 5M;ckBke Llk K;ov9shit,u47;aKba4do1in,leave,o4Dup;ba4ft9pa69w3;a0Vc0Te0Mh0Ii0Fl09m08n07o06p01quar5GtQuOwK;earMiK;ngLtch K;aw3ba4o8K; by;cKi6Bm 2ss0;k 64;aReQiPoNrKud35;aigh2Det75iK;ke 7Sng K;al6Yup;p Krm2F;by,in,oG;c3Ln3Lr 2tc4O;p F;c3Jmp0nd LrKveAy 2O;e Ht 2L;ba4do1up;ar3GeNiMlLrKurB;ead0ingBuc5;a49it 6H;c5ll o3Cn 2;ak Fe1Xll0;a3Bber 2rt0und like;ap 5Vow Duggl5;ash 6Noke0;eep NiKow 6;cLp K;o6Dup;e 68;in,oK;ff,v9;de19gn 4NnKt 6Gz5;gKkE; al6Ale0;aMoKu5W;ot Kut0w 7M;aw3ba4f48oC;c2WdeEk6EveA;e Pll1Nnd Orv5tK; Ktl5J;do1foLin,o7upK;!on;ot,r5Z;aw3ba4do1in,o33up;oCto;al66out0rK;ap65ew 6J;ilAv5;aXeUiSoOuK;b 5Yle0n Kstl5;aLba4do1inKo2Ith4Nu5P;!to;c2Xr8w3;ll Mot LpeAuK;g3Ind17;a2Wf3Po7;ar8in,o7up;ng 68p oKs5;ff,p18;aKelAinEnt0;c6Hd K;o4Dup;c27t0;aZeYiWlToQrOsyc35uK;ll Mn5Kt K;aKba4do1in,oJto47up;pa4Dw3;a3Jdo1in,o21to45up;attleBess KiNop 2;ah2Fon;iLp Kr4Zu1Gwer 6N;do1in,o6Nup;nt0;aLuK;gEmp 6;ce u20y 6D;ck Kg0le 4An 6p5B;oJup;el 5NncilE;c53ir 39n0ss MtLy K;ba4oG; Hc2R;aw3ba4in,oJ;pKw4Y;e4Xt D;aLerd0oK;dAt53;il Hrrow H;aTeQiPoLuK;ddl5ll I;c1FnkeyMp 6uthAve K;aKdo1in,o4Lup;l4Nw3; wi4K;ss0x 2;asur5e3SlLss K;a21up;t 6;ke Ln 6rKs2Ax0;k 6ryA;do,fun,oCsure,up;a02eViQoLuK;ck0st I;aNc4Fg MoKse0;k Kse4D;aft9ba4do1forw37in56o0Zu46;in,oJ;d 6;e NghtMnLsKve 00;ten F;e 2k 2; 2e46;ar8do1in;aMt LvelK; oC;do1go,in,o7up;nEve K;in,oK;pKut;en;c5p 2sh LtchBughAy K;do1o59;in4Po7;eMick Lnock K;do1oCup;oCup;eLy K;in,up;l Ip K;aw3ba4do1f04in,oJto,up;aMoLuK;ic5mpE;ke3St H;c43zz 2;a01eWiToPuK;nLrrKsh 6;y 2;keLt K;ar8do1;r H;lKneErse3K;d Ke 2;ba4dKfast,o0Cup;ear,o1;de Lt K;ba4on,up;aw3o7;aKlp0;d Ml Ir Kt 2;fKof;rom;f11in,o03uW;cPm 2nLsh0ve Kz2P;at,it,to;d Lg KkerP;do1in,o2Tup;do1in,oK;ut,v9;k 2;aZeTive Rloss IoMrLunK; f0S;ab hold,in43ow 2U; Kof 2I;aMb1Mit,oLr8th1IuK;nd9;ff,n,v9;bo7ft9hQw3;aw3bKdo1in,oJrise,up,w3;a4ir2H;ar 6ek0t K;aLb1Fdo1in,oKr8up;ff,n,ut,v9;cLhKl2Fr8t,w3;ead;ross;d aKng 2;bo7;a0Ee07iYlUoQrMuK;ck Ke2N;ar8up;eLighten KownBy 2;aw3oG;eKshe27; 2z5;g 2lMol Krk I;aKwi20;bo7r8;d 6low 2;aLeKip0;sh0;g 6ke0mKrKtten H;e F;gRlPnNrLsKzzle0;h F;e Km 2;aw3ba4up;d0isK;h 2;e Kl 1T;aw3fPin,o7;ht ba4ure0;ePnLsK;s 2;cMd K;fKoG;or;e D;d04l 2;cNll Krm0t1G;aLbKdo1in,o09sho0Eth08victim;a4ehi2O;pa0C;e K;do1oGup;at Kdge0nd 12y5;in,o7up;aOi1HoNrK;aLess 6op KuN;aw3b03in,oC;gBwB; Ile0ubl1B;m 2;a0Ah05l02oOrLut K;aw3ba4do1oCup;ackBeep LoKy0;ss Dwd0;by,do1in,o0Uup;me NoLuntK; o2A;k 6l K;do1oG;aRbQforOin,oNtKu0O;hLoKrue;geth9;rough;ff,ut,v9;th,wK;ard;a4y;paKr8w3;rt;eaLose K;in,oCup;n 6r F;aNeLiK;ll0pE;ck Der Kw F;on,up;t 2;lRncel0rOsMtch LveE; in;o1Nup;h Dt K;doubt,oG;ry LvK;e 08;aw3oJ;l Km H;aLba4do1oJup;ff,n,ut;r8w3;a0Ve0MiteAl0Fo04rQuK;bblNckl05il0Dlk 6ndl05rLsKtMy FzzA;t 00;n 0HsK;t D;e I;ov9;anWeaUiLush K;oGup;ghQng K;aNba4do1forMin,oLuK;nd9p;n,ut;th;bo7lKr8w3;ong;teK;n 2;k K;do1in,o7up;ch0;arTg 6iRn5oPrNssMttlLunce Kx D;aw3ba4;e 6; ar8;e H;do1;k Dt 2;e 2;l 6;do1up;d 2;aPeed0oKurt0;cMw K;aw3ba4do1o7up;ck;k K;in,oC;ck0nk0stA; oQaNef 2lt0nd K;do1ov9up;er;up;r Lt K;do1in,oCup;do1o7;ff,nK;to;ck Pil0nMrgLsK;h D;ainBe D;g DkB; on;in,o7;aw3do1in,oCup;ff,ut;ay;ct FdQir0sk MuctionA; oG;ff;ar8o7;ouK;nd; o7;d K;do1oKup;ff,n;wn;o7up;ut", ProperNoun: "true\xA6aIbDc8dalhousHe7f5gosford,h4iron maiden,kirby,landsdowne,m2nis,r1s0wembF;herwood,paldiB;iel,othwe1;cgi0ercedes,issy;ll;intBudsB;airview,lorence,ra0;mpt9nco;lmo,uro;a1h0;arlt6es5risti;rl0talina;et4i0;ng;arb3e0;et1nt0rke0;ley;on;ie;bid,jax", "Person|Place": "true\xA6a8d6h4jordan,k3orlando,s1vi0;ctor9rgin9;a0ydney;lvador,mara,ntia4;ent,obe;amil0ous0;ton;arw2ie0;go;lexandr1ust0;in;ia", LastName: "true\xA60:BR;1:BF;2:B5;3:BH;4:AX;5:9Y;6:B6;7:BK;8:B0;9:AV;A:AL;B:8Q;C:8G;D:7K;E:BM;F:AH;aBDb9Zc8Wd88e81f7Kg6Wh64i60j5Lk4Vl4Dm39n2Wo2Op25quispe,r1Ls0Pt0Ev03wTxSyKzG;aIhGimmerm6A;aGou,u;ng,o;khar5ytsE;aKeun9BiHoGun;koya32shiBU;!lG;diGmaz;rim,z;maGng;da,g52mo83sGzaC;aChiBV;iao,u;aLeJiHoGright,u;jcA5lff,ng;lGmm0nkl0sniewsC;kiB1liams33s3;bGiss,lt0;b,er,st0;a6Vgn0lHtG;anabe,s3;k0sh,tG;e2Non;aLeKiHoGukD;gt,lk5roby5;dHllalGnogr3Kr1Css0val3S;ba,ob1W;al,ov4;lasHsel8W;lJn dIrgBEsHzG;qu7;ilyEqu7siljE;en b6Aijk,yk;enzueAIverde;aPeix1VhKi2j8ka43oJrIsui,uG;om5UrG;c2n0un1;an,emblA7ynisC;dorAMlst3Km4rrAth;atch0i8UoG;mHrG;are84laci79;ps3sG;en,on;hirDkah9Mnaka,te,varA;a06ch01eYhUiRmOoMtIuHvGzabo;en9Jobod3N;ar7bot4lliv2zuC;aIeHoG;i7Bj4AyanAB;ele,in2FpheBvens25;l8rm0;kol5lovy5re7Tsa,to,uG;ng,sa;iGy72;rn5tG;!h;l71mHnGrbu;at9cla9Egh;moBo7M;aIeGimizu;hu,vchG;en8Luk;la,r1G;gu9infe5YmGoh,pulveA7rra5P;jGyG;on5;evi6iltz,miHneid0roed0uGwarz;be3Elz;dHtG;!t,z;!t;ar4Th8ito,ka4OlJnGr4saCto,unde19v4;ch7dHtGz;a5Le,os;b53e16;as,ihDm4Po0Y;aVeSiPoJuHyG;a6oo,u;bio,iz,sG;so,u;bKc8Fdrigue67ge10j9YmJosevelt,sItHux,wG;e,li6;a9Ch;enb4Usi;a54e4L;erts15i93;bei4JcHes,vGzzo;as,e9;ci,hards12;ag2es,iHut0yG;es,nol5N;s,t0;dImHnGsmu97v6C;tan1;ir7os;ic,u;aUeOhMiJoHrGut8;asad,if6Zochazk27;lishc2GpGrti72u10we76;e3Aov51;cHe45nG;as,to;as70hl0;aGillips;k,m,n6I;a3Hde3Wete0Bna,rJtG;ersHrovGters54;!a,ic;!en,on;eGic,kiBss3;i9ra,tz,z;h86k,padopoulIrk0tHvG;ic,l4N;el,te39;os;bMconn2Ag2TlJnei6PrHsbor6XweBzG;dem7Rturk;ella4DtGwe6N;ega,iz;iGof7Hs8I;vGyn1R;ei9;aSri1;aPeNiJoGune50ym2;rHvGwak;ak4Qik5otn66;odahl,r4S;cholsZeHkolGls4Jx3;ic,ov84;ls1miG;!n1;ils3mG;co4Xec;gy,kaGray2sh,var38;jiGmu9shiG;ma;a07c04eZiWoMuHyeG;rs;lJnIrGssoli6S;atGp03r7C;i,ov4;oz,te58;d0l0;h2lOnNo0RrHsGza1A;er,s;aKeJiIoz5risHtG;e56on;!on;!n7K;au,i9no,t5J;!lA;r1Btgome59;i3El0;cracFhhail5kkeHlG;l0os64;ls1;hmeJiIj30lHn3Krci0ssiGyer2N;!er;n0Po;er,j0;dDti;cartHlG;aughl8e2;hy;dQe7Egnu68i0jer3TkPmNnMrItHyG;er,r;ei,ic,su21thews;iHkDquAroqu8tinG;ez,s;a5Xc,nG;!o;ci5Vn;a5UmG;ad5;ar5e6Kin1;rig77s1;aVeOiLoJuHyG;!nch;k4nGo;d,gu;mbarGpe3Fvr4we;di;!nGu,yana2B;coln,dG;b21holm,strom;bedEfeKhIitn0kaHn8rGw35;oy;!j;m11tG;in1on1;bvGvG;re;iGmmy,ng,rs2Qu,voie,ws3;ne,t1F;aZeYh2iWlUnez50oNrJuHvar2woG;k,n;cerGmar68znets5;a,o34;aHem0isGyeziu;h23t3O;m0sni4Fus3KvG;ch4O;bay57ch,rh0Usk16vaIwalGzl5;czGsC;yk;cIlG;!cGen4K;huk;!ev4ic,s;e8uiveG;rt;eff0kGl4mu9nnun1;ucF;ll0nnedy;hn,llKminsCne,pIrHstra3Qto,ur,yGzl5;a,s0;j0Rls22;l2oG;or;oe;aPenOha6im14oHuG;ng,r4;e32hInHrge32u6vG;anD;es,ss3;anHnsG;en,on,t3;nesGs1R;en,s1;kiBnings,s1;cJkob4EnGrv0E;kDsG;en,sG;en0Ion;ks3obs2A;brahimDglesi5Nke5Fl0Qno07oneIshikHto,vanoG;u,v54;awa;scu;aVeOiNjaltal8oIrist50uG;!aGb0ghAynh;m2ng;a6dz4fIjgaa3Hk,lHpUrGwe,x3X;ak1Gvat;mAt;er,fm3WmG;ann;ggiBtchcock;iJmingw4BnHrGss;nand7re9;deGriks1;rs3;kkiHnG;on1;la,n1;dz4g1lvoQmOns0ZqNrMsJuIwHyG;asFes;kiB;g1ng;anHhiG;mo14;i,ov0J;di6p0r10t;ue;alaG;in1;rs1;aVeorgUheorghe,iSjonRoLrJuGw3;errGnnar3Co,staf3Ctierr7zm2;a,eG;ro;ayli6ee2Lg4iffithGub0;!s;lIme0UnHodGrbachE;e,m2;calvAzale0S;dGubE;bGs0E;erg;aj,i;bs3l,mGordaO;en7;iev3U;gnMlJmaIndFo,rGsFuthi0;cGdn0za;ia;ge;eaHlG;agh0i,o;no;e,on;aVerQiLjeldsted,lKoIrHuG;chs,entAji41ll0;eem2iedm2;ntaGrt8urni0wl0;na;emi6orA;lipIsHtzgeraG;ld;ch0h0;ovG;!ic;hatDnanIrG;arGei9;a,i;deY;ov4;b0rre1D;dKinsJriksIsGvaB;cob3GpGtra3D;inoza,osiQ;en,s3;te8;er,is3warG;ds;aXePiNjurhuMoKrisco15uHvorakG;!oT;arte,boHmitru,nn,rGt3C;and,ic;is;g2he0Omingu7nErd1ItG;to;us;aGcki2Hmitr2Ossanayake,x3;s,z; JbnaIlHmirGrvisFvi,w2;!ov4;gado,ic;th;bo0groot,jo6lHsilGvriA;va;a cruz,e3uG;ca;hl,mcevsCnIt2WviG;dGes,s;ov,s3;ielsGku22;!en;ki;a0Be06hRiobQlarkPoIrGunningh1H;awfo0RivGuz;elli;h1lKntJoIrGs2Nx;byn,reG;a,ia;ke,p0;i,rer2K;em2liB;ns;!e;anu;aOeMiu,oIristGu6we;eGiaG;ns1;i,ng,p9uHwGy;!dH;dGng;huJ;!n,onGu6;!g;kJnIpm2ttHudhGv7;ry;erjee,o14;!d,g;ma,raboG;rty;bJl0Cng4rG;eghetHnG;a,y;ti;an,ota1C;cerAlder3mpbeLrIstGvadi0B;iGro;llo;doHl0Er,t0uGvalho;so;so,zo;ll;a0Fe01hYiXlUoNrKuIyG;rLtyG;qi;chan2rG;ke,ns;ank5iem,oGyant;oks,wG;ne;gdan5nIruya,su,uchaHyKziG;c,n5;rd;darGik;enG;ko;ov;aGond15;nco,zG;ev4;ancFshw16;a08oGuiy2;umGwmG;ik;ckRethov1gu,ktPnNrG;gJisInG;ascoGds1;ni;ha;er,mG;anG;!n;gtGit7nP;ss3;asF;hi;er,hG;am;b4ch,ez,hRiley,kk0ldw8nMrIshHtAu0;es;ir;bInHtlGua;ett;es,i0;ieYosa;dGik;a9yoG;padhyG;ay;ra;k,ng;ic;bb0Acos09d07g04kht05lZnPrLsl2tJyG;aHd8;in;la;chis3kiG;ns3;aImstro6sl2;an;ng;ujo,ya;dJgelHsaG;ri;ovG;!a;ersJov,reG;aGjEws;ss1;en;en,on,s3;on;eksejEiyEmeiIvG;ar7es;ez;da;ev;arwHuilG;ar;al;ams,l0;er;ta;as", Ordinal: "true\xA6eBf7nin5s3t0zeroE;enDhir1we0;lfCn7;d,t3;e0ixt8;cond,vent7;et0th;e6ie7;i2o0;r0urt3;tie4;ft1rst;ight0lev1;e0h,ie1;en0;th", Cardinal: "true\xA6bEeBf5mEnine7one,s4t0zero;en,h2rDw0;e0o;lve,n5;irt6ousands,ree;even2ix2;i3o0;r1ur0;!t2;ty;ft0ve;e2y;ight0lev1;!e0y;en;illions", Multiple: "true\xA6b3hundred,m3qu2se1t0;housand,r2;pt1xt1;adr0int0;illion", City: "true\xA60:74;1:61;2:6G;3:6J;4:5S;a68b53c4Id48e44f3Wg3Hh39i31j2Wk2Fl23m1Mn1Co19p0Wq0Ur0Os05tRuQvLwDxiBy9z5;a7h5i4Muri4O;a5e5ongsh0;ng3H;greb,nzib5G;ang2e5okoha3Sunfu;katerin3Hrev0;a5n0Q;m5Hn;arsBeAi6roclBu5;h0xi,zh5P;c7n5;d5nipeg,terth4;hoek,s1L;hi5Zkl3A;l63xford;aw;a8e6i5ladivost5Molgogr6L;en3lni6S;ni22r5;o3saill4N;lenc4Wncouv3Sr3ughn;lan bat1Crumqi,trecht;aFbilisi,eEheDiBo9r7u5;l21n63r5;in,ku;i5ondh62;es51poli;kyo,m2Zron1Pulo5;n,uS;an5jua3l2Tmisoa6Bra3;j4Tshui; hag62ssaloni2H;gucigal26hr0l av1U;briz,i6llinn,mpe56ng5rtu,shk2R;i3Esh0;an,chu1n0p2Eyu0;aEeDh8kopje,owe1Gt7u5;ra5zh4X;ba0Ht;aten is55ockholm,rasbou67uttga2V;an8e6i5;jiazhua1llo1m5Xy0;f50n5;ya1zh4H;gh3Kt4Q;att45o1Vv44;cramen16int ClBn5o paulo,ppo3Rrajevo; 7aa,t5;a 5o domin3E;a3fe,m1M;antonio,die3Cfrancisco,j5ped3Nsalvad0J;o5u0;se;em,t lake ci5Fz25;lou58peters24;a9e8i6o5;me,t59;ga,o5yadh;! de janei3F;cife,ims,nn3Jykjavik;b4Sip4lei2Inc2Pwalpindi;ingdao,u5;ez2i0Q;aFeEhDiCo9r7u6yong5;ya1;eb59ya1;a5etor3M;g52to;rt5zn0; 5la4Co;au prin0Melizabe24sa03;ls3Prae5Atts26;iladelph3Gnom pe1Aoenix;ki1tah tik3E;dua,lerYnaji,r4Ot5;na,r32;ak44des0Km1Mr6s5ttawa;a3Vlo;an,d06;a7ew5ing2Fovosibir1Jyc; 5cast36;del24orlea44taip14;g8iro4Wn5pl2Wshv33v0;ch6ji1t5;es,o1;a1o1;a6o5p4;ya;no,sa0W;aEeCi9o6u5;mb2Ani26sc3Y;gadishu,nt6s5;c13ul;evideo,pelli1Rre2Z;ami,l6n14s5;kolc,sissauga;an,waukee;cca,d5lbour2Mmph41ndo1Cssi3;an,ell2Xi3;cau,drAkass2Sl9n8r5shh4A;aca6ib5rakesh,se2L;or;i1Sy;a4EchFdal0Zi47;mo;id;aDeAi8o6u5vSy2;anMckn0Odhia3;n5s angel26;d2g bea1N;brev2Be3Lma5nz,sb2verpo28;!ss27; ma39i5;c5pzig;est16; p6g5ho2Wn0Cusan24;os;az,la33;aHharFiClaipeBo9rak0Du7y5;iv,o5;to;ala lump4n5;mi1sh0;hi0Hlka2Xpavog4si5wlo2;ce;da;ev,n5rkuk;gst2sha5;sa;k5toum;iv;bHdu3llakuric0Qmpa3Fn6ohsiu1ra5un1Iwaguc0Q;c0Pj;d5o,p4;ah1Ty;a7e6i5ohannesV;l1Vn0;dd36rusalem;ip4k5;ar2H;bad0mph1OnArkutUs7taXz5;mir,tapala5;pa;fah0l6tanb5;ul;am2Zi2H;che2d5;ianap2Mo20;aAe7o5yder2W; chi mi5ms,nolulu;nh;f6lsin5rakli2;ki;ei;ifa,lifax,mCn5rb1Dva3;g8nov01oi;aFdanEenDhCiPlasgBo9raz,u5;a5jr23;dal6ng5yaquil;zh1J;aja2Oupe;ld coa1Bthen5;bu2S;ow;ent;e0Uoa;sk;lw7n5za;dhi5gt1E;nag0U;ay;aisal29es,o8r6ukuya5;ma;ankfu5esno;rt;rt5sh0; wor6ale5;za;th;d5indhov0Pl paso;in5mont2;bur5;gh;aBe8ha0Xisp4o7resd0Lu5;b5esseldorf,nkirk,rb0shanbe;ai,l0I;ha,nggu0rtmu13;hradSl6nv5troit;er;hi;donghIe6k09l5masc1Zr es sala1KugavpiY;i0lU;gu,je2;aJebu,hAleve0Vo5raio02uriti1Q;lo7n6penhag0Ar5;do1Ok;akKst0V;gUm5;bo;aBen8i6ongqi1ristchur5;ch;ang m7ca5ttago1;go;g6n5;ai;du,zho1;ng5ttogr14;ch8sha,zh07;gliari,i9lga8mayenJn6pe town,r5tanO;acCdiff;ber1Ac5;un;ry;ro;aWeNhKirmingh0WoJr9u5;chareTdapeTenos air7r5s0tu0;g5sa;as;es;a9is6usse5;ls;ba6t5;ol;ne;sil8tisla7zzav5;il5;le;va;ia;goZst2;op6ubaneshw5;ar;al;iCl9ng8r5;g6l5n;in;en;aluru,hazi;fa6grade,o horizon5;te;st;ji1rut;ghd0BkFn9ot8r7s6yan n4;ur;el,r07;celo3i,ranquil09;ou;du1g6ja lu5;ka;alo6k5;ok;re;ng;ers5u;field;a05b02cc01ddis aba00gartaZhmedXizawl,lSmPnHqa00rEsBt7uck5;la5;nd;he7l5;an5;ta;ns;h5unci2;dod,gab5;at;li5;ngt2;on;a8c5kaOtwerp;hora6o3;na;ge;h7p5;ol5;is;eim;aravati,m0s5;terd5;am; 7buquerq6eppo,giers,ma5;ty;ue;basrah al qadim5mawsil al jadid5;ah;ab5;ad;la;ba;ra;idj0u dha5;bi;an;lbo6rh5;us;rg", Region: "true\xA60:2O;1:2L;2:2U;3:2F;a2Sb2Fc21d1Wes1Vf1Tg1Oh1Ki1Fj1Bk16l13m0Sn09o07pYqVrSsJtEuBverAw6y4zacatec2W;akut0o0Fu4;cat1k09;a5est 4isconsin,yomi1O;bengal,virgin0;rwick3shington4;! dc;acruz,mont;dmurt0t4;ah,tar4; 2Pa12;a6e5laxca1Vripu21u4;scaEva;langa2nnessee,x2J;bas10m4smQtar29;aulip2Hil nadu;a9elang07i7o5taf16u4ylh1J;ff02rr09s1E;me1Gno1Uuth 4;cZdY;ber0c4kkim,naloa;hu1ily;n5rawak,skatchew1xo4;ny; luis potosi,ta catari2;a4hodeA;j4ngp0C;asth1shahi;ingh29u4;e4intana roo;bec,en6retaro;aAe6rince edward4unjab; i4;sl0G;i,n5r4;ak,nambu0F;a0Rnsylv4;an0;ha0Pra4;!na;axa0Zdisha,h4klaho21ntar4reg7ss0Dx0I;io;aLeEo6u4;evo le4nav0X;on;r4tt18va scot0;f9mandy,th4; 4ampton3;c6d5yo4;rk3;ako1O;aroli2;olk;bras1Nva0Dw4; 6foundland4;! and labrad4;or;brunswick,hamp3jers5mexiTyork4;! state;ey;galPyarit;aAeghala0Mi6o4;nta2r4;dov0elos;ch6dlanDn5ss4zor11;issippi,ouri;as geraPneso18;ig1oac1;dhy12harasht0Gine,lac07ni5r4ssachusetts;anhao,i el,ylG;p4toba;ur;anca3e4incoln3ouisI;e4iR;ds;a6e5h4omi;aka06ul2;dah,lant1ntucky,ra01;bardino,lmyk0ns0Qr4;achay,el0nata0X;alis6har4iangxi;kh4;and;co;daho,llino7n4owa;d5gush4;et0;ia2;is;a6ert5i4un1;dalFm0D;ford3;mp3rya2waii;ansu,eorg0lou7oa,u4;an4izhou,jarat;ajuato,gdo4;ng;cester3;lori4uji1;da;sex;ageUe7o5uran4;go;rs4;et;lawaMrby3;aFeaEh9o4rim08umbr0;ahui7l6nnectic5rsi4ventry;ca;ut;i03orado;la;e5hattisgarh,i4uvash0;apRhuahua;chn5rke4;ss0;ya;ra;lGm4;bridge3peche;a9ihar,r8u4;ck4ryat0;ingham3;shi4;re;emen,itish columb0;h0ja cal8lk7s4v7;hkorto4que;st1;an;ar0;iforn0;ia;dygHguascalientes,lBndhr9r5ss4;am;izo2kans5un4;achal 7;as;na;a 4;pradesh;a6ber5t4;ai;ta;ba5s4;ka;ma;ea", Place: "true\xA60:53;1:55;2:4E;3:4L;4:3R;5:32;6:4U;a4Qb3Rc33d2Pe2Ff2Dg23h1Ri1Njapa2Tk1Jl1Am0Yn0Qo0Mp0Br07sVtPuNvLw9y7;a7o0Vyz;kut1Ingtze;aFeEhitDiBo7upatki,ycom2Z;ki2Fo7;d7l1J;b40s7;i4to4A;c0VllowbroEn7;c30gh2;by,chur1X;ed0ntw3Rs2B;ke8r44t7;erf1f1; is0Jf47;auxha3Yirgin is0Most7;ok;laanbaatar,pto7xb3P;n,wn;aBeotihuac4Fh9ive4Lo8ru2Ysarskoe selo,u7;l2Nzigo4J;nto,rquay,tt2U;am3e 7orn3Q;bronx,hamptons;hiti,j mah0Pu1W;aHcotts bluff,eFfo,hEoCpringBt9u7yd2Q;dbu26n7;der06set3N;aff1ock2Yr7;atf1oud;hi3Jw5;ho,uth7; 1Ram29wo3Q;erbroLopping1H;a7i2Y;f33t0;int lawrence riv6khal2N;ayleigh,ed9i7oc28;chmo1Mo gran4ver7;be1Lfr0Fsi4; s3Kcliffe,hi39;aEeBhAi7ompeii,utn2;c8ne7tcai34; 2Zc0N;keri1Bt0;l,x;k,lh2mbr8n7r2T;n1Qzance;oke;cif3Jpahanaumokuak3Br7;k7then0;si4w5;ak9ld t2Lr8x7;f1l38;ange county,d,f1inoco;mZw5;eAi24o7;r7tt2Y;th7wi0L; 10am1I;uschwanste1Zw7; eng8a7h2markKpo3H;rk;la0X;aAco,e8i7uc;dt28ll18;adow7ko0P;lands;chu picchu,gad32iBlAn9ple8r7;kh2; g1Mw5;hatt2Zsf2M;ibu,t0ve2A;dsto1Vn st7;!re7;et;aBeAgw,hr,i7owlSynd06;n7ttle italy;coln memori7dl2J;al;asi4w3;kefr9mbe1Un7s,x;ca2Pg7si09;f1l2Et0;ont;azan kreml1Ae9itchen6o8rasnoyar7ul;sk;re0Ysrae;ns0Ls20;ax,cn,lf1n8ps7st;wiP;d7glew5verness;ian2Dochina;aFeDi8kg,nd,ov7unti2N;d,enweep;gh8llc7;reN;bu07l7;and7;!s;r7yw5;ef1tf1;libu2Amp8r7stings;f1lem,row;stead,t0;aFodavari,r7uelph;avenCe7imsW;at Aen7; 8f1Lwi7;ch;acr3vall1N;brita0Klak3;hur7;st;ng3y villa11;airhavKco,inancial7ra; district;aCgliBnf1CppiAu9ver8x7;et6f1;glad3t0;rope,st0;ng;nt0;rls1Qs7;t 7;e7si4;nd;aFeCfw,igBo9ryd8u7xb;mfri3nstab04rh2tt0;en;nca1DrcNv6w7;nt0E;by;n8r7vonpo1H;ry;!h2;nuAr7;l8t7;f1moor;ingt0;be;aOdg,eLgk,hElDo7royd0;l8m7rnwa0F;pt0;c9lingw5osse7;um;ood;he0W;earwat6t;aBel9i7uuk;chen itza,mney ro0Bn7ricahua;atU;m12t7;enh2;mor7rlottetRth2;ro;dar 7ntervilC;breaks,fa02g7;rove;ldBmAr7versh2;lis8rizo pla7;in;le;bNpbellf1;weT;a02cn,eQingl04kk,lackOoNr7uckY;aIiCo7;ckt0ok7wns cany0;lyn,s7;i4to7;ne;de;dge8gh7;am,t0;n8t7;own;or7;th;ceb8m7;lQpt0;rid7;ge;ardwalk,lt0;bu7pool,waA;rn;aconsfGdf1lDrBverly9x7;hi7;ll; hi7;lls;wi7;ck; air,l7;ingh2;am;ie7;ld;ltimore,rnsl8tters7;ea;ey;bNct0driadic,frica,ginLlImHnBrcAs9tl8yleQzor3;es;!antA;hcroft,ia; de triomphe,t8;adyr,caAdov6tarct7;ic7; oce7;an;st6;er;ericas,s;be8dersh7hambra,list0;ot;rt0;cou7;rt;bot9i7;ngd0;on;sf1;ord", Country: "true\xA60:38;1:2L;2:3B;a2Xb2Ec22d1Ye1Sf1Mg1Ch1Ai14j12k0Zl0Um0Gn05om2pZqat1KrXsKtCu7v5wal4yemTz3;a25imbabwe;es,lis and futu2Y;a3enezue32ietnam;nuatu,tican city;gTk6nited 4ruXs3zbeE; 2Ca,sr;arab emirat0Kkingdom,states3;! of am2Y;!raiV;a8haCimor les0Co7rinidad 5u3;nis0rk3valu;ey,me2Zs and caic1V;and t3t3;oba1L;go,kel10nga;iw2ji3nz2T;ki2V;aDcotl1eCi9lov8o6pa2Dri lanka,u5w3yr0;az3edAitzerl1;il1;d2riname;lomon1Xmal0uth 3;afr2KkMsud2;ak0en0;erra leoFn3;gapo1Yt maart3;en;negLrb0ychellZ;int 3moa,n marino,udi arab0;hele26luc0mart21;epublic of ir0Eom2Euss0w3;an27;a4eIhilippinUitcairn1Mo3uerto riN;l1rtugF;ki2Dl4nama,pua new0Vra3;gu7;au,esti3;ne;aBe9i7or3;folk1Ith4w3;ay; k3ern mariana1D;or0O;caragua,ger3ue;!ia;p3ther1Aw zeal1;al;mib0u3;ru;a7exi6icro0Bo3yanm06;ldova,n3roc5zambA;a4gol0t3;enegro,serrat;co;cAdagasc01l7r5urit4yot3;te;an0i16;shall0Xtin3;ique;a4div3i,ta;es;wi,ys0;ao,ed02;a6e5i3uxembourg;b3echtenste12thu1G;er0ya;ban0Isotho;os,tv0;azakh1Fe4iriba04o3uwait,yrgyz1F;rXsovo;eling0Knya;a3erG;ma16p2;c7nd6r4s3taly,vory coast;le of m2rael;a3el1;n,q;ia,oJ;el1;aiTon3ungary;dur0Ng kong;aBermany,ha0QibraltAre8u3;a6ern5inea3ya0P;! biss3;au;sey;deloupe,m,tema0Q;e3na0N;ce,nl1;ar;bUmb0;a7i6r3;ance,ench 3;guia0Epoly3;nes0;ji,nl1;lklandUroeU;ast tim7cu6gypt,l salv6ngl1quatorial4ritr5st3thiop0;on0; guin3;ea;ad3;or;enmark,jibou5ominica4r con3;go;!n C;ti;aBentral african Ah8o5roat0u4yprRzech3; 9ia;ba,racao;c4lo3morQngo brazzaville,okGsta r04te de ivoiL;mb0;osE;i3ristmasG;le,na;republic;m3naUpe verde,ymanA;bod0ero3;on;aGeDhut2o9r5u3;lgar0r3;kina faso,ma,undi;azil,itish 3unei;virgin3; is3;lands;liv0nai5snia and herzegoviHtswaHuvet3; isl1;and;re;l3n8rmuG;ar3gium,ize;us;h4ngladesh,rbad3;os;am4ra3;in;as;fghaGlDmBn6r4ustr3zerbaij2;al0ia;genti3men0uba;na;dorra,g5t3;arct7igua and barbu3;da;o3uil3;la;er3;ica;b3ger0;an0;ia;ni3;st2;an", FirstName: "true\xA6aTblair,cQdOfrancoZgabMhinaLilya,jHkClBm6ni4quinn,re3s0;h0umit,yd;ay,e0iloh;a,lby;g9ne;co,ko0;!s;a1el0ina,org6;!okuhF;ds,naia,r1tt0xiB;i,y;ion,lo;ashawn,eif,uca;a3e1ir0rM;an;lsFn0rry;dall,yat5;i,sD;a0essIie,ude;i1m0;ie,mG;me;ta;rie0y;le;arcy,ev0;an,on;as1h0;arl8eyenne;ey,sidy;drien,kira,l4nd1ubr0vi;ey;i,r0;a,e0;a,y;ex2f1o0;is;ie;ei,is", WeekDay: "true\xA6fri2mon2s1t0wednesd3;hurs1ues1;aturd1und1;!d0;ay0;!s", Month: "true\xA6dec0february,july,nov0octo1sept0;em0;ber", Date: "true\xA6ago,on4som4t1week0yesterd5; end,ends;mr1o0;d2morrow;!w;ed0;ay", Duration: "true\xA6centurAd8h7m5q4se3w1y0;ear8r8;eek0k7;!end,s;ason,c5;tr,uarter;i0onth3;llisecond2nute2;our1r1;ay0ecade0;!s;ies,y", FemaleName: "true\xA60:J7;1:JB;2:IJ;3:IK;4:J1;5:IO;6:JS;7:JO;8:HB;9:JK;A:H4;B:I2;C:IT;D:JH;E:IX;F:BA;G:I4;aGTbFLcDRdD0eBMfB4gADh9Ti9Gj8Dk7Cl5Wm48n3Lo3Hp33qu32r29s15t0Eu0Cv02wVxiTyOzH;aLeIineb,oHsof3;e3Sf3la,ra;h2iKlIna,ynH;ab,ep;da,ma;da,h2iHra;nab;aKeJi0FolB7uIvH;et8onDP;i0na;le0sen3;el,gm3Hn,rGLs8W;aoHme0nyi;m5XyAD;aMendDZhiDGiH;dele9lJnH;if48niHo0;e,f47;a,helmi0lHma;a,ow;ka0nB;aNeKiHusa5;ck84kIl8oleAviH;anFenJ4;ky,toriBK;da,lA8rHs0;a,nHoniH9;a,iFR;leHnesH9;nILrH;i1y;g9rHs6xHA;su5te;aYeUhRiNoLrIuHy2;i,la;acJ3iHu0J;c3na,sH;hFta;nHr0F;iFya;aJffaEOnHs6;a,gtiH;ng;!nFSra;aIeHomasi0;a,l9Oo8Ares1;l3ndolwethu;g9Fo88rIssH;!a,ie;eHi,ri7;sa,za;bOlMmKnIrHs6tia0wa0;a60yn;iHya;a,ka,s6;arFe2iHm77ra;!ka;a,iH;a,t6;at6it6;a0Ecarlett,e0AhWiSkye,neza0oQri,tNuIyH;bIGlvi1;ha,mayIJniAsIzH;an3Net8ie,y;anHi7;!a,e,nH;aCe;aIeH;fan4l5Dphan6E;cI5r5;b3fiAAm0LnHphi1;d2ia,ja,ya;er2lJmon1nIobh8QtH;a,i;dy;lETv3;aMeIirHo0risFDy5;a,lDM;ba,e0i5lJrH;iHr6Jyl;!d8Ifa;ia,lDZ;hd,iMki2nJrIu0w0yH;la,ma,na;i,le9on,ron,yn;aIda,ia,nHon;a,on;!ya;k6mH;!aa;lJrItaye82vH;da,inj;e0ife;en1i0ma;anA9bLd5Oh1SiBkKlJmInd2rHs6vannaC;aCi0;ant6i2;lDOma,ome;ee0in8Tu2;in1ri0;a05eZhXiUoHuthDM;bScRghQl8LnPsJwIxH;anB3ie,y;an,e0;aIeHie,lD;ann7ll1marDGtA;!lHnn1;iHyn;e,nH;a,dF;da,i,na;ayy8G;hel67io;bDRerAyn;a,cIkHmas,nFta,ya;ki,o;h8Xki;ea,iannGMoH;da,n1P;an0bJemFgi0iInHta,y0;a8Bee;han86na;a,eH;cHkaC;a,ca;bi0chIe,i0mo0nHquETy0;di,ia;aERelHiB;!e,le;een4ia0;aPeOhMiLoJrHute6A;iHudenCV;scil3LyamvaB;lHrt3;i0ly;a,paluk;ilome0oebe,ylH;is,lis;ggy,nelope,r5t2;ige,m0VnKo5rvaDMtIulH;a,et8in1;ricHt4T;a,e,ia;do2i07;ctav3dIfD3is6ksa0lHphD3umC5yunbileg;a,ga,iv3;eHvAF;l3t8;aWeUiMoIurHy5;!ay,ul;a,eJor,rIuH;f,r;aCeEma;ll1mi;aNcLhariBQkKlaJna,sHta,vi;anHha;ur;!y;a,iDZki;hoGk9YolH;a,e4P;!mh;hir,lHna,risDEsreE;!a,iDDlBV;asuMdLh3i6Dl5nKomi7rgEVtH;aHhal4;lHs6;i1ya;cy,et8;e9iF0ya;nngu2X;a0Ackenz4e02iMoJrignayani,uriDJyH;a,rH;a,iOlNna,tG;bi0i2llBJnH;a,iH;ca,ka,qD9;a,cUdo4ZkaTlOmi,nMrItzi,yH;ar;aJiIlH;anET;am;!l,nB;dy,eHh,n4;nhGrva;aKdJe0iCUlH;iHy;cent,e;red;!gros;!e5;ae5hH;ae5el3Z;ag5DgNi,lKrH;edi7AiIjem,on,yH;em,l;em,sCG;an4iHliCF;nHsCJ;a,da;!an,han;b09cASd07e,g05ha,i04ja,l02n00rLsoum5YtKuIv84xBKyHz4;bell,ra,soBB;d7rH;a,eE;h8Gild1t4;a,cUgQiKjor4l7Un4s6tJwa,yH;!aHbe6Xja9lAE;m,nBL;a,ha,in1;!aJbCGeIja,lDna,sHt63;!a,ol,sa;!l1D;!h,mInH;!a,e,n1;!awit,i;arJeIie,oHr48ueri8;!t;!ry;et46i3B;el4Xi7Cy;dHon,ue5;akranAy;ak,en,iHlo3S;a,ka,nB;a,re,s4te;daHg4;!l3E;alDd4elHge,isDJon0;ei9in1yn;el,le;a0Ne0CiXoQuLyH;d3la,nH;!a,dIe2OnHsCT;!a,e2N;a,sCR;aD4cJel0Pis1lIna,pHz;e,iA;a,u,wa;iHy;a0Se,ja,l2NnB;is,l1UrItt1LuHvel4;el5is1;aKeIi7na,rH;aADi7;lHn1tA;ei;!in1;aTbb9HdSepa,lNnKsJvIzH;!a,be5Ret8z4;!ia;a,et8;!a,dH;a,sHy;ay,ey,i,y;a,iJja,lH;iHy;aA8e;!aH;!nF;ia,ya;!nH;!a,ne;aPda,e0iNjYla,nMoKsJtHx93y5;iHt4;c3t3;e2PlCO;la,nHra;a,ie,o2;a,or1;a,gh,laH;!ni;!h,nH;a,d2e,n5V;cOdon9DiNkes6mi9Gna,rMtJurIvHxmi,y5;ern1in3;a,e5Aie,yn;as6iIoH;nya,ya;fa,s6;a,isA9;a,la;ey,ie,y;a04eZhXiOlASoNrJyH;lHra;a,ee,ie;istHy6I;a,en,iIyH;!na;!e,n5F;nul,ri,urtnB8;aOerNlB7mJrHzzy;a,stH;en,in;!berlImernH;aq;eHi,y;e,y;a,stE;!na,ra;aHei2ongordzol;dij1w5;el7UiKjsi,lJnIrH;a,i,ri;d2na,za;ey,i,lBLs4y;ra,s6;biAcARdiat7MeBAiSlQmPnyakuma1DrNss6NtKviAyH;!e,lH;a,eH;e,i8T;!a6HeIhHi4TlDri0y;ar8Her8Hie,leErBAy;!lyn8Ori0;a,en,iHl5Xoli0yn;!ma,nFs95;a5il1;ei8Mi,lH;e,ie;a,tl6O;a0AeZiWoOuH;anMdLlHst88;es,iH;a8NeHs8X;!n9tH;!a,te;e5Mi3My;a,iA;!anNcelDdMelGhan7VleLni,sIva0yH;a,ce;eHie;fHlDph7Y;a,in1;en,n1;i7y;!a,e,n45;lHng;!i1DlH;!i1C;anNle0nKrJsH;i8JsH;!e,i8I;i,ri;!a,elGif2CnH;a,et8iHy;!e,f2A;a,eJiInH;a,eIiH;e,n1;!t8;cMda,mi,nIque4YsminFvie2y9zH;min7;a7eIiH;ce,e,n1s;!lHs82t0F;e,le;inIk6HlDquelH;in1yn;da,ta;da,lRmPnOo0rNsIvaHwo0zaro;!a0lu,na;aJiIlaHob89;!n9R;do2;belHdo2;!a,e,l3B;a7Ben1i0ma;di2es,gr72ji;a9elBogH;en1;a,e9iHo0se;a0na;aSeOiJoHus7Kyacin2C;da,ll4rten24snH;a,i9U;lImaH;ri;aIdHlaI;a,egard;ry;ath1BiJlInrietArmi9sH;sa,t1A;en2Uga,mi;di;bi2Fil8MlNnMrJsItHwa,yl8M;i5Tt4;n60ti;iHmo51ri53;etH;!te;aCnaC;a,ey,l4;a02eWiRlPoNrKunJwH;enHyne1R;!dolD;ay,el;acieIetHiselB;a,chE;!la;ld1CogooH;sh;adys,enHor3yn2K;a,da,na;aKgi,lIna,ov8EselHta;a,e,le;da,liH;an;!n0;mLnJorgIrH;ald5Si,m3Etrud7;et8i4X;a,eHna;s29vieve;ma;bIle,mHrnet,yG;al5Si5;iIrielH;a,l1;!ja;aTeQiPlorOoz3rH;anJeIiH;da,eB;da,ja;!cH;esIiHoi0P;n1s66;!ca;a,enc3;en,o0;lIn0rnH;anB;ec3ic3;jr,nArKtHy7;emIiHma,oumaA;ha,ma,n;eh;ah,iBrah,za0;cr4Rd0Re0Qi0Pk0Ol07mXn54rUsOtNuMvHwa;aKelIiH;!e,ta;inFyn;!a;!ngel4V;geni1ni47;h5Yien9ta;mLperanKtH;eIhHrel5;er;l31r7;za;a,eralB;iHma,ne4Lyn;cHka,n;a,ka;aPeNiKmH;aHe21ie,y;!li9nuH;elG;lHn1;e7iHy;a,e,ja;lHrald;da,y;!nue5;aWeUiNlMma,no2oKsJvH;a,iH;na,ra;a,ie;iHuiH;se;a,en,ie,y;a0c3da,e,f,nMsJzaH;!betHveA;e,h;aHe,ka;!beH;th;!a,or;anor,nH;!a,i;!in1na;ate1Rta;leEs6;vi;eIiHna,wi0;e,th;l,n;aYeMh3iLjeneKoH;lor5Vminiq4Ln3FrHtt4;a,eEis,la,othHthy;ea,y;ba;an09naCon9ya;anQbPde,eOiMlJmetr3nHsir5M;a,iH;ce,se;a,iIla,orHphi9;es,is;a,l6F;dHrdH;re;!d5Ena;!b2ForaCraC;a,d2nH;!a,e;hl3i0l0GmNnLphn1rIvi1WyH;le,na;a,by,cIia,lH;a,en1;ey,ie;a,et8iH;!ca,el1Aka,z;arHia;is;a0Re0Nh04i02lUoJristIynH;di,th3;al,i0;lPnMrIurH;tn1D;aJd2OiHn2Ori9;!nH;a,e,n1;!l4;cepci5Cn4sH;tanHuelo;ce,za;eHleE;en,t8;aJeoIotH;il54;!pat2;ir7rJudH;et8iH;a,ne;a,e,iH;ce,sZ;a2er2ndH;i,y;aReNloe,rH;isJyH;stH;al;sy,tH;a1Sen,iHy;an1e,n1;deJlseIrH;!i7yl;a,y;li9;nMrH;isKlImH;ai9;a,eHot8;n1t8;!sa;d2elGtH;al,elG;cIlH;es8i47;el3ilH;e,ia,y;itlYlXmilWndVrMsKtHy5;aIeIhHri0;er1IleErDy;ri0;a38sH;a37ie;a,iOlLmeJolIrH;ie,ol;!e,in1yn;lHn;!a,la;a,eIie,otHy;a,ta;ne,y;na,s1X;a0Ii0I;a,e,l1;isAl4;in,yn;a0Ke02iZlXoUrH;andi7eRiJoIyH;an0nn;nwDoke;an3HdgMgiLtH;n31tH;!aInH;ey,i,y;ny;d,t8;etH;!t7;an0e,nH;da,na;bbi7glarIlo07nH;iAn4;ka;ancHythe;a,he;an1Clja0nHsm3M;iAtH;ou;aWcVlinUniArPssOtJulaCvH;!erlH;ey,y;hJsy,tH;e,iHy7;e,na;!anH;ie,y;!ie;nItHyl;ha,ie;adIiH;ce;et8i9;ay,da;ca,ky;!triH;ce,z;rbJyaH;rmH;aa;a2o2ra;a2Ub2Od25g21i1Sj5l18m0Zn0Boi,r06sWtVuPvOwa,yIzH;ra,u0;aKes6gJlIn,seH;!l;in;un;!nH;a,na;a,i2K;drLguJrIsteH;ja;el3;stH;in1;a,ey,i,y;aahua,he0;hIi2Gja,miAs2DtrH;id;aMlIraqHt21;at;eIi7yH;!n;e,iHy;gh;!nH;ti;iJleIo6piA;ta;en,n1t8;aHelG;!n1J;a01dje5eZgViTjRnKohito,toHya;inet8nH;el5ia;te;!aKeIiHmJ;e,ka;!mHtt7;ar4;!belIliHmU;sa;!l1;a,eliH;ca;ka,sHta;a,sa;elHie;a,iH;a,ca,n1qH;ue;!tH;a,te;!bImHstasiMya;ar3;el;aLberKeliJiHy;e,l3naH;!ta;a,ja;!ly;hGiIl3nB;da;a,ra;le;aWba,ePiMlKthJyH;a,c3sH;a,on,sa;ea;iHys0N;e,s0M;a,cIn1sHza;a,e,ha,on,sa;e,ia,ja;c3is6jaKksaKna,sJxH;aHia;!nd2;ia,saH;nd2;ra;ia;i0nIyH;ah,na;a,is,naCoud;la;c6da,leEmNnLsH;haClH;inHyY;g,n;!h;a,o,slH;ey;ee;en;at6g4nIusH;ti0;es;ie;aWdiTelMrH;eJiH;anMenH;a,e,ne;an0;na;!aLeKiIyH;nn;a,n1;a,e;!ne;!iH;de;e,lDsH;on;yn;!lH;i9yn;ne;aKbIiHrL;!e,gaK;ey,i7y;!e;gaH;il;dKliyJradhIs6;ha;ya;ah;a,ya", Honorific: "true\xA6director1field marsh2lieutenant1rear0sergeant major,vice0; admir1; gener0;al", "Adj|Gerund": "true\xA60:3F;1:3H;2:31;3:2X;4:35;5:33;6:3C;7:2Z;8:36;9:29;a33b2Tc2Bd1Te1If19g12h0Zi0Rl0Nm0Gnu0Fo0Ap04rYsKtEuBvAw1Ayiel3;ar6e08;nBpA;l1Rs0B;fol3n1Zsett2;aEeDhrBi4ouc7rAwis0;e0Bif2oub2us0yi1;ea1SiA;l2vi1;l2mp0rr1J;nt1Vxi1;aMcreec7enten2NhLkyrocke0lo0Vmi2oJpHtDuBweA;e0Ul2;pp2ArA;gi1pri5roun3;aBea8iAri2Hun9;mula0r4;gge4rA;t2vi1;ark2eAraw2;e3llb2F;aAot7;ki1ri1;i9oc29;dYtisf6;aEeBive0oAus7;a4l2;assu4defi9fres7ig9juve07mai9s0vAwar3;ea2italiAol1G;si1zi1;gi1ll6mb2vi1;a6eDier23lun1VrAun2C;eBoA;mi5vo1Z;ce3s5vai2;n3rpleA;xi1;ffCpWutBverAwi1;arc7lap04p0Pri3whel8;goi1l6st1J;en3sA;et0;m2Jrtu4;aEeDiCoBuAyst0L;mb2;t1Jvi1;s5tiga0;an1Rl0n3smeri26;dAtu4;de9;aCeaBiAo0U;fesa0Tvi1;di1ni1;c1Fg19s0;llumiGmFnArri0R;cDfurHsCtBviA;go23ti1;e1Oimi21oxica0rig0V;pi4ul0;orpo20r0K;po5;na0;eaBorr02umilA;ia0;li1rtwar8;lFrA;atiDipCoBuelA;i1li1;undbrea10wi1;pi1;f6ng;a4ea8;a3etc7it0lEoCrBulfA;il2;ee1FighXust1L;rAun3;ebo3thco8;aCoA;a0wA;e4i1;mi1tte4;lectrJmHnExA;aCci0hBis0pA;an3lo3;aOila1B;c0spe1A;ab2coura0CdBergi13ga0Clive9ric7s02tA;hral2i0J;ea4u4;barras5er09pA;owe4;if6;aQeIiBrA;if0;sAzz6;aEgDhearCsen0tA;rAur11;ac0es5;te9;us0;ppoin0r8;biliGcDfi9gra3ligh0mBpres5sAvasG;erE;an3ea9orA;ali0L;a6eiBli9rA;ea5;vi1;ta0;maPri1s7un0zz2;aPhMlo5oAripp2ut0;mGnArrespon3;cer9fDspi4tA;inBrA;as0ibu0ol2;ui1;lic0u5;ni1;fDmCpA;eAromi5;l2ti1;an3;or0;aAil2;llenAnAr8;gi1;l8ptAri1;iva0;aff2eGin3lFoDrBuA;d3st2;eathtaAui5;ki1;gg2i2o8ri1unA;ci1;in3;co8wiA;lAtc7;de4;bsorVcOgonMlJmHnno6ppea2rFsA;pi4su4toA;nBun3;di1;is7;hi1;res0;li1;aFu5;si1;ar8lu4;ri1;mi1;iAzi1;zi1;cAhi1;eleDomA;moBpan6;yi1;da0;ra0;ti1;bi1;ng", Comparable: "true\xA60:3C;1:3Q;2:3F;a3Tb3Cc33d2Te2Mf2Ag1Wh1Li1Fj1Ek1Bl13m0Xn0So0Rp0Iqu0Gr07sHtCug0vAw4y3za0Q;el10ouN;ary,e6hi5i3ry;ck0Cde,l3n1ry,se;d,y;ny,te;a3i3R;k,ry;a3erda2ulgar;gue,in,st;a6en2Xhi5i4ouZr3;anqu2Cen1ue;dy,g36me0ny;ck,rs28;ll,me,rt,wd3I;aRcaPeOhMiLkin0BlImGoEpDt6u4w3;eet,ift;b3dd0Wperfi21rre28;sta26t21;a8e7iff,r4u3;pUr1;a4ict,o3;ng;ig2Vn0N;a1ep,rn;le,rk,te0;e1Si2Vright0;ci1Yft,l3on,re;emn,id;a3el0;ll,rt;e4i3y;g2Mm0Z;ek,nd2T;ck24l0mp1L;a3iRrill,y;dy,l01rp;ve0Jxy;n1Jr3;ce,y;d,fe,int0l1Hv0V;a8e6i5o3ude;mantic,o19sy,u3;gh;pe,t1P;a3d,mo0A;dy,l;gg4iFndom,p3re,w;id;ed;ai2i3;ck,et;hoAi1Fl9o8r5u3;ny,r3;e,p11;egna2ic4o3;fouSud;ey,k0;liXor;ain,easa2;ny;dd,i0ld,ranL;aive,e5i4o3u14;b0Sisy,rm0Ysy;bb0ce,mb0R;a3r1w;r,t;ad,e5ild,o4u3;nda12te;ist,o1;a4ek,l3;low;s0ty;a8e7i6o3ucky;f0Jn4o15u3ve0w10y0N;d,sy;e0g;ke0l,mp,tt0Eve0;e1Qwd;me,r3te;ge;e4i3;nd;en;ol0ui19;cy,ll,n3;secu6t3;e3ima4;llege2rmedia3;te;re;aAe7i6o5u3;ge,m3ng1C;bYid;me0t;gh,l0;a3fXsita2;dy,rWv3;en0y;nd13ppy,r3;d3sh;!y;aFenEhCiBlAoofy,r3;a8e6i5o3ue0Z;o3ss;vy;m,s0;at,e3y;dy,n;nd,y;ad,ib,ooD;a2d1;a3o3;st0;tDuiS;u1y;aCeebBi9l8o6r5u3;ll,n3r0N;!ny;aCesh,iend0;a3nd,rmD;my;at,ir7;erce,nan3;ci9;le;r,ul3;ty;a6erie,sse4v3xtre0B;il;nti3;al;r4s3;tern,y;ly,th0;appZe9i5ru4u3;mb;nk;r5vi4z3;zy;ne;e,ty;a3ep,n9;d3f,r;!ly;agey,h8l7o5r4u3;dd0r0te;isp,uel;ar3ld,mmon,st0ward0zy;se;evKou1;e3il0;ap,e3;sy;aHiFlCoAr5u3;ff,r0sy;ly;a6i3oad;g4llia2;nt;ht;sh,ve;ld,un3;cy;a4o3ue;nd,o1;ck,nd;g,tt3;er;d,ld,w1;dy;bsu6ng5we3;so3;me;ry;rd", Adverb: "true\xA6a08b05d00eYfSheQinPjustOkinda,likewiZmMnJoEpCquite,r9s5t2u0very,well;ltima01p0; to,wards5;h1iny bit,o0wiO;o,t6;en,us;eldom,o0uch;!me1rt0; of;how,times,w0C;a1e0;alS;ndomRth05;ar excellenEer0oint blank; Lhaps;f3n0utright;ce0ly;! 0;ag05moX; courGten;ewJo0; longWt 0;onHwithstand9;aybe,eanwhiNore0;!ovT;! aboX;deed,steY;lla,n0;ce;or3u0;ck1l9rther0;!moK;ing; 0evK;exampCgood,suH;n mas0vI;se;e0irect2; 2fini0;te0;ly;juAtrop;ackward,y 0;far,no0; means,w; GbroFd nauseam,gEl7ny5part,s4t 2w0;ay,hi0;le;be7l0mo7wor7;arge,ea6; soon,i4;mo0way;re;l 3mo2ongsi1ready,so,togeth0ways;er;de;st;b1t0;hat;ut;ain;ad;lot,posteriori", Conjunction: "true\xA6aXbTcReNhowMiEjust00noBo9p8supposing,t5wh0yet;e1il0o3;e,st;n1re0thN; if,by,vM;evL;h0il,o;erefOo0;!uU;lus,rovided th9;r0therwiM;! not; mattEr,w0;! 0;since,th4w7;f4n0; 0asmuch;as mIcaForder t0;h0o;at;! 0;only,t0w0;hen;!ev3;ith2ven0;! 0;if,tB;er;o0uz;s,z;e0ut,y the time;cau1f0;ore;se;lt3nd,s 0;far1if,m0soon1t2;uch0; as;hou0;gh", Currency: "true\xA6$,aud,bQcOdJeurIfHgbp,hkd,iGjpy,kElDp8r7s3usd,x2y1z0\xA2,\xA3,\xA5,\u0434\u0435\u043D,\u043B\u0432,\u0440\u0443\u0431,\u0E3F,\u20A1,\u20A8,\u20AC,\u20AD,\uFDFC;lotyQ\u0142;en,uanP;af,of;h0t5;e0il5;k0q0;elK;oubleJp,upeeJ;e2ound st0;er0;lingG;n0soF;ceEnies;empi7i7;n,r0wanzaCyatC;!onaBw;ls,nr;ori7ranc9;!os;en3i2kk,o0;b0ll2;ra5;me4n0rham4;ar3;e0ny;nt1;aht,itcoin0;!s", Determiner: "true\xA6aBboth,d9e6few,le5mu8neiDplenty,s4th2various,wh0;at0ich0;evC;a0e4is,ose;!t;everal,ome;!ast,s;a1l0very;!se;ch;e0u;!s;!n0;!o0y;th0;er", "Adj|Present": "true\xA6a07b04cVdQeNfJhollIidRlEmCnarrIoBp9qua8r7s3t2uttFw0;aKet,ro0;ng,u08;endChin;e2hort,l1mooth,our,pa9tray,u0;re,speU;i2ow;cu6da02leSpaN;eplica01i02;ck;aHerfePr0;eseUime,omV;bscu1pen,wn;atu0e3odeH;re;a2e1ive,ow0;er;an;st,y;ow;a2i1oul,r0;ee,inge;rm;iIke,ncy,st;l1mpty,x0;emHpress;abo4ic7;amp,e2i1oub0ry,ull;le;ffu9re6;fu8libe0;raE;alm,l5o0;mpleCn3ol,rr1unterfe0;it;e0u7;ct;juga8sum7;ea1o0;se;n,r;ankru1lu0;nt;pt;li2pproxi0rticula1;ma0;te;ght", "Person|Adj": "true\xA6b3du2earnest,frank,mi2r0san1woo1;an0ich,u1;dy;sty;ella,rown", Modal: "true\xA6c5lets,m4ought3sh1w0;ill,o5;a0o4;ll,nt;! to,a;ight,ust;an,o0;uld", Verb: "true\xA6born,cannot,gonna,has,keep tabs,msg", "Person|Verb": "true\xA6b8ch7dr6foster,gra5ja9lan4ma2ni9ollie,p1rob,s0wade;kip,pike,t5ue;at,eg,ier2;ck,r0;k,shal;ce;ce,nt;ew;ase,u1;iff,l1ob,u0;ck;aze,ossom", "Person|Date": "true\xA6a2j0sep;an0une;!uary;p0ugust,v0;ril" };
        const Po = 36, Ao = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", No = Ao.split("").reduce(function(e2, t2, n2) {
          return e2[t2] = n2, e2;
        }, {});
        var Co = function(e2) {
          if (void 0 !== No[e2]) return No[e2];
          let t2 = 0, n2 = 1, r2 = Po, o2 = 1;
          for (; n2 < e2.length; t2 += r2, n2++, r2 *= Po) ;
          for (let n3 = e2.length - 1; n3 >= 0; n3--, o2 *= Po) {
            let r3 = e2.charCodeAt(n3) - 48;
            r3 > 10 && (r3 -= 7), t2 += r3 * o2;
          }
          return t2;
        };
        const jo = function(e2, t2, n2) {
          const r2 = Co(t2);
          return r2 < e2.symCount ? e2.syms[r2] : n2 + r2 + 1 - e2.symCount;
        }, xo = function(e2) {
          const t2 = { nodes: e2.split(";"), syms: [], symCount: 0 };
          return e2.match(":") && function(e3) {
            const t3 = new RegExp("([0-9A-Z]+):([0-9A-Z]+)");
            for (let n2 = 0; n2 < e3.nodes.length; n2++) {
              const r2 = t3.exec(e3.nodes[n2]);
              if (!r2) {
                e3.symCount = n2;
                break;
              }
              e3.syms[Co(r2[1])] = Co(r2[2]);
            }
            e3.nodes = e3.nodes.slice(e3.symCount, e3.nodes.length);
          }(t2), function(e3) {
            const t3 = [], n2 = (r2, o2) => {
              let a2 = e3.nodes[r2];
              "!" === a2[0] && (t3.push(o2), a2 = a2.slice(1));
              const i2 = a2.split(/([A-Z0-9,]+)/g);
              for (let a3 = 0; a3 < i2.length; a3 += 2) {
                const s2 = i2[a3], l2 = i2[a3 + 1];
                if (!s2) continue;
                const u2 = o2 + s2;
                if ("," === l2 || void 0 === l2) {
                  t3.push(u2);
                  continue;
                }
                const c2 = jo(e3, l2, r2);
                n2(c2, u2);
              }
            };
            return n2(0, ""), t3;
          }(t2);
        }, Io = ["Possessive", "Pronoun"];
        const To = { a: [[/(antenn|formul|nebul|vertebr|vit)a$/i, "$1ae"], [/ia$/i, "ia"]], e: [[/(kn|l|w)ife$/i, "$1ives"], [/(hive)$/i, "$1s"], [/([m|l])ouse$/i, "$1ice"], [/([m|l])ice$/i, "$1ice"]], f: [[/^(dwar|handkerchie|hoo|scar|whar)f$/i, "$1ves"], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)f$/i, "$1ves"]], i: [[/(octop|vir)i$/i, "$1i"]], m: [[/([ti])um$/i, "$1a"]], n: [[/^(oxen)$/i, "$1"]], o: [[/(al|ad|at|er|et|ed)o$/i, "$1oes"]], s: [[/(ax|test)is$/i, "$1es"], [/(alias|status)$/i, "$1es"], [/sis$/i, "ses"], [/(bu)s$/i, "$1ses"], [/(sis)$/i, "ses"], [/^(?!talis|.*hu)(.*)man$/i, "$1men"], [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, "$1i"]], x: [[/(matr|vert|ind|cort)(ix|ex)$/i, "$1ices"], [/^(ox)$/i, "$1en"]], y: [[/([^aeiouy]|qu)y$/i, "$1ies"]], z: [[/(quiz)$/i, "$1zes"]] }, Do = /([xsz]|ch|sh)$/, Ho = function(e2 = "", t2) {
          const { irregularPlurals: n2, uncountable: r2 } = t2.two;
          if (r2.hasOwnProperty(e2)) return e2;
          if (n2.hasOwnProperty(e2)) return n2[e2];
          const o2 = function(e3) {
            const t3 = e3[e3.length - 1];
            if (true === To.hasOwnProperty(t3)) for (let n3 = 0; n3 < To[t3].length; n3 += 1) {
              const r3 = To[t3][n3][0];
              if (true === r3.test(e3)) return e3.replace(r3, To[t3][n3][1]);
            }
            return null;
          }(e2);
          return null !== o2 ? o2 : Do.test(e2) ? e2 + "es" : e2 + "s";
        }, Eo = /\|/, Go = { "20th century fox": "Organization", "7 eleven": "Organization", "motel 6": "Organization", g8: "Organization", vh1: "Organization", "76ers": "SportsTeam", "49ers": "SportsTeam", q1: "Date", q2: "Date", q3: "Date", q4: "Date", km2: "Unit", m2: "Unit", dm2: "Unit", cm2: "Unit", mm2: "Unit", mile2: "Unit", in2: "Unit", yd2: "Unit", ft2: "Unit", m3: "Unit", dm3: "Unit", cm3: "Unit", in3: "Unit", ft3: "Unit", yd3: "Unit", "at&t": "Organization", "black & decker": "Organization", "h & m": "Organization", "johnson & johnson": "Organization", "procter & gamble": "Organization", "ben & jerry's": "Organization", "&": "Conjunction", i: ["Pronoun", "Singular"], he: ["Pronoun", "Singular"], she: ["Pronoun", "Singular"], it: ["Pronoun", "Singular"], they: ["Pronoun", "Plural"], we: ["Pronoun", "Plural"], was: ["Copula", "PastTense"], is: ["Copula", "PresentTense"], are: ["Copula", "PresentTense"], am: ["Copula", "PresentTense"], were: ["Copula", "PastTense"], her: Io, his: Io, hers: Io, their: Io, theirs: Io, themselves: Io, your: Io, our: Io, ours: Io, my: Io, its: Io, vs: ["Conjunction", "Abbreviation"], if: ["Condition", "Preposition"], closer: "Comparative", closest: "Superlative", much: "Adverb", may: "Modal", babysat: "PastTense", blew: "PastTense", drank: "PastTense", drove: "PastTense", forgave: "PastTense", skiied: "PastTense", spilt: "PastTense", stung: "PastTense", swam: "PastTense", swung: "PastTense", guaranteed: "PastTense", shrunk: "PastTense", nears: "PresentTense", nearing: "Gerund", neared: "PastTense", no: ["Negative", "Expression"] }, Oo = {}, Fo = { two: { irregularPlurals: wo, uncountable: {} } };
        Object.keys(ko).forEach((e2) => {
          const t2 = function(e3) {
            if (!e3) return {};
            const t3 = e3.split("|").reduce((e4, t4) => {
              const n3 = t4.split("\xA6");
              return e4[n3[0]] = n3[1], e4;
            }, {}), n2 = {};
            return Object.keys(t3).forEach(function(e4) {
              const r2 = xo(t3[e4]);
              "true" === e4 && (e4 = true);
              for (let t4 = 0; t4 < r2.length; t4++) {
                const o2 = r2[t4];
                true === n2.hasOwnProperty(o2) ? false === Array.isArray(n2[o2]) ? n2[o2] = [n2[o2], e4] : n2[o2].push(e4) : n2[o2] = e4;
              }
            }), n2;
          }(ko[e2]);
          Eo.test(e2) ? Object.keys(t2).forEach((t3) => {
            if (Oo[t3] = e2, "Noun|Verb" === e2) {
              const e3 = Ho(t3, Fo);
              Oo[e3] = "Plural|Verb";
            }
          }) : Object.keys(t2).forEach((t3) => {
            Go[t3] = e2;
          });
        }), [":(", ":)", ":P", ":p", ":O", ";(", ";)", ";P", ";p", ";O", ":3", ":|", ":/", ":\\", ":$", ":*", ":@", ":-(", ":-)", ":-P", ":-p", ":-O", ":-3", ":-|", ":-/", ":-\\", ":-$", ":-*", ":-@", ":^(", ":^)", ":^P", ":^p", ":^O", ":^3", ":^|", ":^/", ":^\\", ":^$", ":^*", ":^@", "):", "(:", "$:", "*:", ")-:", "(-:", "$-:", "*-:", ")^:", "(^:", "$^:", "*^:", "<3", "</3", "<\\3", "=("].forEach((e2) => Go[e2] = "Emoticon"), delete Go[""], delete Go.null, delete Go[" "];
        const Vo = "Singular";
        var zo = { beforeTags: { Determiner: Vo, Possessive: Vo, Acronym: Vo, Noun: Vo, Adjective: Vo, PresentTense: Vo, Gerund: Vo, PastTense: Vo, Infinitive: Vo, Date: Vo, Ordinal: Vo, Demonym: Vo }, afterTags: { Value: Vo, Modal: Vo, Copula: Vo, PresentTense: Vo, PastTense: Vo, Demonym: Vo, Actor: Vo }, beforeWords: { the: Vo, with: Vo, without: Vo, of: Vo, for: Vo, any: Vo, all: Vo, on: Vo, cut: Vo, cuts: Vo, increase: Vo, decrease: Vo, raise: Vo, drop: Vo, save: Vo, saved: Vo, saves: Vo, make: Vo, makes: Vo, made: Vo, minus: Vo, plus: Vo, than: Vo, another: Vo, versus: Vo, neither: Vo, about: Vo, favorite: Vo, best: Vo, daily: Vo, weekly: Vo, linear: Vo, binary: Vo, mobile: Vo, lexical: Vo, technical: Vo, computer: Vo, scientific: Vo, security: Vo, government: Vo, popular: Vo, formal: Vo, no: Vo, more: Vo, one: Vo, let: Vo, her: Vo, his: Vo, their: Vo, our: Vo, sheer: Vo, monthly: Vo, yearly: Vo, current: Vo, previous: Vo, upcoming: Vo, last: Vo, next: Vo, main: Vo, initial: Vo, final: Vo, beginning: Vo, end: Vo, top: Vo, bottom: Vo, future: Vo, past: Vo, major: Vo, minor: Vo, side: Vo, central: Vo, peripheral: Vo, public: Vo, private: Vo }, afterWords: { of: Vo, system: Vo, aid: Vo, method: Vo, utility: Vo, tool: Vo, reform: Vo, therapy: Vo, philosophy: Vo, room: Vo, authority: Vo, says: Vo, said: Vo, wants: Vo, wanted: Vo, is: Vo, did: Vo, do: Vo, can: Vo, wise: Vo } };
        const Bo = "Infinitive";
        var So = { beforeTags: { Modal: Bo, Adverb: Bo, Negative: Bo, Plural: Bo }, afterTags: { Determiner: Bo, Adverb: Bo, Possessive: Bo, Reflexive: Bo, Preposition: Bo, Cardinal: Bo, Comparative: Bo, Superlative: Bo }, beforeWords: { i: Bo, we: Bo, you: Bo, they: Bo, to: Bo, please: Bo, will: Bo, have: Bo, had: Bo, would: Bo, could: Bo, come: Bo, should: Bo, do: Bo, did: Bo, does: Bo, can: Bo, must: Bo, us: Bo, me: Bo, let: Bo, even: Bo, when: Bo, help: Bo, he: Bo, she: Bo, it: Bo, being: Bo, bi: Bo, co: Bo, contra: Bo, de: Bo, inter: Bo, intra: Bo, mis: Bo, pre: Bo, out: Bo, counter: Bo, nobody: Bo, somebody: Bo, anybody: Bo, everybody: Bo, now: Bo, go: Bo, said: Bo, says: Bo, say: Bo, who: Bo, what: Bo }, afterWords: { the: Bo, me: Bo, you: Bo, him: Bo, us: Bo, her: Bo, his: Bo, them: Bo, they: Bo, it: Bo, himself: Bo, herself: Bo, itself: Bo, myself: Bo, ourselves: Bo, themselves: Bo, something: Bo, anything: Bo, a: Bo, an: Bo, up: Bo, down: Bo, by: Bo, out: Bo, off: Bo, under: Bo, what: Bo, all: Bo, to: Bo, because: Bo, although: Bo, how: Bo, otherwise: Bo, together: Bo, though: Bo, into: Bo, yet: Bo, more: Bo, here: Bo, there: Bo, away: Bo, now: Bo } };
        const $o = { beforeTags: Object.assign({}, So.beforeTags, zo.beforeTags, {}), afterTags: Object.assign({}, So.afterTags, zo.afterTags, {}), beforeWords: Object.assign({}, So.beforeWords, zo.beforeWords, {}), afterWords: Object.assign({}, So.afterWords, zo.afterWords, {}) }, Mo = "Adjective";
        var Ko = { beforeTags: { Determiner: Mo, Possessive: Mo, Hyphenated: Mo }, afterTags: { Adjective: Mo }, beforeWords: { seem: Mo, seemed: Mo, seems: Mo, feel: Mo, feels: Mo, felt: Mo, stay: Mo, appear: Mo, appears: Mo, appeared: Mo, also: Mo, over: Mo, under: Mo, too: Mo, it: Mo, but: Mo, still: Mo, really: Mo, quite: Mo, well: Mo, very: Mo, truly: Mo, how: Mo, deeply: Mo, hella: Mo, profoundly: Mo, extremely: Mo, so: Mo, badly: Mo, mostly: Mo, totally: Mo, awfully: Mo, rather: Mo, nothing: Mo, something: Mo, anything: Mo, not: Mo, me: Mo, is: Mo, face: Mo, faces: Mo, faced: Mo, look: Mo, looks: Mo, looked: Mo, reveal: Mo, reveals: Mo, revealed: Mo, sound: Mo, sounded: Mo, sounds: Mo, remains: Mo, remained: Mo, prove: Mo, proves: Mo, proved: Mo, becomes: Mo, stays: Mo, tastes: Mo, taste: Mo, smells: Mo, smell: Mo, gets: Mo, grows: Mo, as: Mo, rings: Mo, radiates: Mo, conveys: Mo, convey: Mo, conveyed: Mo, of: Mo }, afterWords: { too: Mo, also: Mo, or: Mo, enough: Mo, as: Mo } };
        const Lo = "Gerund";
        var Jo = { beforeTags: { Adverb: Lo, Preposition: Lo, Conjunction: Lo }, afterTags: { Adverb: Lo, Possessive: Lo, Person: Lo, Pronoun: Lo, Determiner: Lo, Copula: Lo, Preposition: Lo, Conjunction: Lo, Comparative: Lo }, beforeWords: { been: Lo, keep: Lo, continue: Lo, stop: Lo, am: Lo, be: Lo, me: Lo, began: Lo, start: Lo, starts: Lo, started: Lo, stops: Lo, stopped: Lo, help: Lo, helps: Lo, avoid: Lo, avoids: Lo, love: Lo, loves: Lo, loved: Lo, hate: Lo, hates: Lo, hated: Lo }, afterWords: { you: Lo, me: Lo, her: Lo, him: Lo, his: Lo, them: Lo, their: Lo, it: Lo, this: Lo, there: Lo, on: Lo, about: Lo, for: Lo, up: Lo, down: Lo } };
        const Wo = "Gerund", qo = "Adjective", Uo = { beforeTags: Object.assign({}, Ko.beforeTags, Jo.beforeTags, { Imperative: Wo, Infinitive: qo, Plural: Wo }), afterTags: Object.assign({}, Ko.afterTags, Jo.afterTags, { Noun: qo }), beforeWords: Object.assign({}, Ko.beforeWords, Jo.beforeWords, { is: qo, are: Wo, was: qo, of: qo, suggest: Wo, suggests: Wo, suggested: Wo, recommend: Wo, recommends: Wo, recommended: Wo, imagine: Wo, imagines: Wo, imagined: Wo, consider: Wo, considered: Wo, considering: Wo, resist: Wo, resists: Wo, resisted: Wo, avoid: Wo, avoided: Wo, avoiding: Wo, except: qo, accept: qo, assess: Wo, explore: Wo, fear: Wo, fears: Wo, appreciate: Wo, question: Wo, help: Wo, embrace: Wo, with: qo }), afterWords: Object.assign({}, Ko.afterWords, Jo.afterWords, { to: Wo, not: Wo, the: Wo }) }, Ro = { beforeTags: { Determiner: void 0, Cardinal: "Noun", PhrasalVerb: "Adjective" }, afterTags: {} }, Qo = { beforeTags: Object.assign({}, Ko.beforeTags, zo.beforeTags, Ro.beforeTags), afterTags: Object.assign({}, Ko.afterTags, zo.afterTags, Ro.afterTags), beforeWords: Object.assign({}, Ko.beforeWords, zo.beforeWords, { are: "Adjective", is: "Adjective", was: "Adjective", be: "Adjective", off: "Adjective", out: "Adjective" }), afterWords: Object.assign({}, Ko.afterWords, zo.afterWords) }, _o = "PastTense", Zo = "Adjective", Xo = { beforeTags: { Adverb: _o, Pronoun: _o, ProperNoun: _o, Auxiliary: _o, Noun: _o }, afterTags: { Possessive: _o, Pronoun: _o, Determiner: _o, Adverb: _o, Comparative: _o, Date: _o, Gerund: _o }, beforeWords: { be: _o, who: _o, get: Zo, had: _o, has: _o, have: _o, been: _o, it: _o, as: _o, for: Zo, more: Zo, always: Zo }, afterWords: { by: _o, back: _o, out: _o, in: _o, up: _o, down: _o, before: _o, after: _o, for: _o, the: _o, with: _o, as: _o, on: _o, at: _o, between: _o, to: _o, into: _o, us: _o, them: _o, his: _o, her: _o, their: _o, our: _o, me: _o, about: Zo } };
        var Yo = { beforeTags: Object.assign({}, Ko.beforeTags, Xo.beforeTags), afterTags: Object.assign({}, Ko.afterTags, Xo.afterTags), beforeWords: Object.assign({}, Ko.beforeWords, Xo.beforeWords), afterWords: Object.assign({}, Ko.afterWords, Xo.afterWords) };
        const ea = { afterTags: { Noun: "Adjective", Conjunction: void 0 } }, ta = { beforeTags: Object.assign({}, Ko.beforeTags, So.beforeTags, { Adverb: void 0, Negative: void 0 }), afterTags: Object.assign({}, Ko.afterTags, So.afterTags, ea.afterTags), beforeWords: Object.assign({}, Ko.beforeWords, So.beforeWords, { have: void 0, had: void 0, not: void 0, went: "Adjective", goes: "Adjective", got: "Adjective", be: "Adjective" }), afterWords: Object.assign({}, Ko.afterWords, So.afterWords, { to: void 0, as: "Adjective" }) }, na = { Copula: "Gerund", PastTense: "Gerund", PresentTense: "Gerund", Infinitive: "Gerund" }, ra = { Value: "Gerund" }, oa = { are: "Gerund", were: "Gerund", be: "Gerund", no: "Gerund", without: "Gerund", you: "Gerund", we: "Gerund", they: "Gerund", he: "Gerund", she: "Gerund", us: "Gerund", them: "Gerund" }, aa = { the: "Gerund", this: "Gerund", that: "Gerund", me: "Gerund", us: "Gerund", them: "Gerund" }, ia = { beforeTags: Object.assign({}, Jo.beforeTags, zo.beforeTags, na), afterTags: Object.assign({}, Jo.afterTags, zo.afterTags, ra), beforeWords: Object.assign({}, Jo.beforeWords, zo.beforeWords, oa), afterWords: Object.assign({}, Jo.afterWords, zo.afterWords, aa) }, sa = "Singular", la = "Infinitive", ua = { beforeTags: Object.assign({}, So.beforeTags, zo.beforeTags, { Adjective: sa, Particle: sa }), afterTags: Object.assign({}, So.afterTags, zo.afterTags, { ProperNoun: la, Gerund: la, Adjective: la, Copula: sa }), beforeWords: Object.assign({}, So.beforeWords, zo.beforeWords, { is: sa, was: sa, of: sa, have: null }), afterWords: Object.assign({}, So.afterWords, zo.afterWords, { instead: la, about: la, his: la, her: la, to: null, by: null, in: null }) }, ca = "Person";
        var ha = { beforeTags: { Honorific: ca, Person: ca }, afterTags: { Person: ca, ProperNoun: ca, Verb: ca }, beforeWords: { hi: ca, hey: ca, yo: ca, dear: ca, hello: ca }, afterWords: { said: ca, says: ca, told: ca, tells: ca, feels: ca, felt: ca, seems: ca, thinks: ca, thought: ca, spends: ca, spendt: ca, plays: ca, played: ca, sing: ca, sang: ca, learn: ca, learned: ca, wants: ca, wanted: ca } };
        const da = "Month", ga = { beforeTags: { Date: da, Value: da }, afterTags: { Date: da, Value: da }, beforeWords: { by: da, in: da, on: da, during: da, after: da, before: da, between: da, until: da, til: da, sometime: da, of: da, this: da, next: da, last: da, previous: da, following: da, with: "Person" }, afterWords: { sometime: da, in: da, of: da, until: da, the: da } };
        var ma = { beforeTags: Object.assign({}, ha.beforeTags, ga.beforeTags), afterTags: Object.assign({}, ha.afterTags, ga.afterTags), beforeWords: Object.assign({}, ha.beforeWords, ga.beforeWords), afterWords: Object.assign({}, ha.afterWords, ga.afterWords) };
        const pa = "Place", fa = { beforeTags: { Place: pa }, afterTags: { Place: pa, Abbreviation: pa }, beforeWords: { in: pa, by: pa, near: pa, from: pa, to: pa }, afterWords: { in: pa, by: pa, near: pa, from: pa, to: pa, government: pa, council: pa, region: pa, city: pa } }, ba = "Unit", va = { "Actor|Verb": $o, "Adj|Gerund": Uo, "Adj|Noun": Qo, "Adj|Past": Yo, "Adj|Present": ta, "Noun|Verb": ua, "Noun|Gerund": ia, "Person|Noun": { beforeTags: Object.assign({}, zo.beforeTags, ha.beforeTags), afterTags: Object.assign({}, zo.afterTags, ha.afterTags), beforeWords: Object.assign({}, zo.beforeWords, ha.beforeWords, { i: "Infinitive", we: "Infinitive" }), afterWords: Object.assign({}, zo.afterWords, ha.afterWords) }, "Person|Date": ma, "Person|Verb": { beforeTags: Object.assign({}, zo.beforeTags, ha.beforeTags, So.beforeTags), afterTags: Object.assign({}, zo.afterTags, ha.afterTags, So.afterTags), beforeWords: Object.assign({}, zo.beforeWords, ha.beforeWords, So.beforeWords), afterWords: Object.assign({}, zo.afterWords, ha.afterWords, So.afterWords) }, "Person|Place": { beforeTags: Object.assign({}, fa.beforeTags, ha.beforeTags), afterTags: Object.assign({}, fa.afterTags, ha.afterTags), beforeWords: Object.assign({}, fa.beforeWords, ha.beforeWords), afterWords: Object.assign({}, fa.afterWords, ha.afterWords) }, "Person|Adj": { beforeTags: Object.assign({}, ha.beforeTags, Ko.beforeTags), afterTags: Object.assign({}, ha.afterTags, Ko.afterTags), beforeWords: Object.assign({}, ha.beforeWords, Ko.beforeWords), afterWords: Object.assign({}, ha.afterWords, Ko.afterWords) }, "Unit|Noun": { beforeTags: { Value: ba }, afterTags: {}, beforeWords: { per: ba, every: ba, each: ba, square: ba, cubic: ba, sq: ba, metric: ba }, afterWords: { per: ba, squared: ba, cubed: ba, long: ba } } }, ya = (e2, t2) => {
          const n2 = Object.keys(e2).reduce((t3, n3) => (t3[n3] = "Infinitive" === e2[n3] ? "PresentTense" : "Plural", t3), {});
          return Object.assign(n2, t2);
        };
        va["Plural|Verb"] = { beforeWords: ya(va["Noun|Verb"].beforeWords, { had: "Plural", have: "Plural" }), afterWords: ya(va["Noun|Verb"].afterWords, { his: "PresentTense", her: "PresentTense", its: "PresentTense", in: null, to: null, is: "PresentTense", by: "PresentTense" }), beforeTags: ya(va["Noun|Verb"].beforeTags, { Conjunction: "PresentTense", Noun: void 0, ProperNoun: "PresentTense" }), afterTags: ya(va["Noun|Verb"].afterTags, { Gerund: "Plural", Noun: "PresentTense", Value: "PresentTense" }) };
        const wa = "Adjective", ka = "Infinitive", Pa = "PresentTense", Aa = "Singular", Na = "PastTense", Ca = "Adverb", ja = "Plural", xa = "Actor", Ia = "Verb", Ta = "Noun", Da = "LastName", Ha = "Modal", Ea = "Place", Ga = "Participle";
        var Oa = [null, null, { ea: Aa, ia: Ta, ic: wa, ly: Ca, "'n": Ia, "'t": Ia }, { oed: Na, ued: Na, xed: Na, " so": Ca, "'ll": Ha, "'re": "Copula", azy: wa, eer: Ta, end: Ia, ped: Na, ffy: wa, ify: ka, ing: "Gerund", ize: ka, ibe: ka, lar: wa, mum: wa, nes: Pa, nny: wa, ous: wa, que: wa, ger: Ta, ber: Ta, rol: Aa, sis: Aa, ogy: Aa, oid: Aa, ian: Aa, zes: Pa, eld: Na, ken: Ga, ven: Ga, ten: Ga, ect: ka, ict: ka, ign: ka, oze: ka, ful: wa, bal: wa, ton: Ta, pur: Ea }, { amed: Na, aped: Na, ched: Na, lked: Na, rked: Na, reed: Na, nded: Na, mned: wa, cted: Na, dged: Na, ield: Aa, akis: Da, cede: ka, chuk: Da, czyk: Da, ects: Pa, iend: Aa, ends: Ia, enko: Da, ette: Aa, iary: Aa, wner: Aa, fies: Pa, fore: Ca, gate: ka, gone: wa, ices: ja, ints: ja, ruct: ka, ines: ja, ions: ja, ners: ja, pers: ja, lers: ja, less: wa, llen: wa, made: wa, nsen: Da, oses: Pa, ould: Ha, some: wa, sson: Da, ians: ja, tion: Aa, tage: Ta, ique: Aa, tive: wa, tors: Ta, vice: Aa, lier: Aa, fier: Aa, wned: Na, gent: Aa, tist: xa, pist: xa, rist: xa, mist: xa, yist: xa, vist: xa, ists: xa, lite: Aa, site: Aa, rite: Aa, mite: Aa, bite: Aa, mate: Aa, date: Aa, ndal: Aa, vent: Aa, uist: xa, gist: xa, note: Aa, cide: Aa, ence: Aa, wide: wa, vide: ka, ract: ka, duce: ka, pose: ka, eive: ka, lyze: ka, lyse: ka, iant: wa, nary: wa, ghty: wa, uent: wa, erer: xa, bury: Ea, dorf: Ta, esty: Ta, wych: Ea, dale: Ea, folk: Ea, vale: Ea, abad: Ea, sham: Ea, wick: Ea, view: Ea }, { elist: xa, holic: Aa, phite: Aa, tized: Na, urned: Na, eased: Na, ances: ja, bound: wa, ettes: ja, fully: Ca, ishes: Pa, ities: ja, marek: Da, nssen: Da, ology: Ta, osome: Aa, tment: Aa, ports: ja, rough: wa, tches: Pa, tieth: "Ordinal", tures: ja, wards: Ca, where: Ca, archy: Ta, pathy: Ta, opoly: Ta, embly: Ta, phate: Ta, ndent: Aa, scent: Aa, onist: xa, anist: xa, alist: xa, olist: xa, icist: xa, ounce: ka, iable: wa, borne: wa, gnant: wa, inant: wa, igent: wa, atory: wa, rient: Aa, dient: Aa, maker: xa, burgh: Ea, mouth: Ea, ceter: Ea, ville: Ea, hurst: Ea, stead: Ea, endon: Ea, brook: Ea, shire: Ea, worth: Ta, field: "ProperNoun", ridge: Ea }, { auskas: Da, parent: Aa, cedent: Aa, ionary: Aa, cklist: Aa, brooke: Ea, keeper: xa, logist: xa, teenth: "Value", worker: xa, master: xa, writer: xa, brough: Ea, cester: Ea, ington: Ea, cliffe: Ea, ingham: Ea }, { chester: Ea, logists: xa, opoulos: Da, borough: Ea, sdottir: Da }];
        const Fa = "Adjective", Va = "Noun", za = "Verb";
        var Ba = [null, null, {}, { neo: Va, bio: Va, "de-": za, "re-": za, "un-": za, "ex-": Va }, { anti: Va, auto: Va, faux: Fa, hexa: Va, kilo: Va, mono: Va, nano: Va, octa: Va, poly: Va, semi: Fa, tele: Va, "pro-": Fa, "mis-": za, "dis-": za, "pre-": Fa }, { anglo: Va, centi: Va, ethno: Va, ferro: Va, grand: Va, hepta: Va, hydro: Va, intro: Va, macro: Va, micro: Va, milli: Va, nitro: Va, penta: Va, quasi: Fa, radio: Va, tetra: Va, "omni-": Fa, "post-": Fa }, { pseudo: Fa, "extra-": Fa, "hyper-": Fa, "inter-": Fa, "intra-": Fa, "deca-": Fa }, { electro: Va }];
        const Sa = "Adjective", $a = "Infinitive", Ma = "PresentTense", Ka = "Singular", La = "PastTense", Ja = "Adverb", Wa = "Expression", qa = "Actor", Ua = "Verb", Ra = "Noun", Qa = "LastName";
        var _a = { a: [[/.[aeiou]na$/, Ra, "tuna"], [/.[oau][wvl]ska$/, Qa], [/.[^aeiou]ica$/, Ka, "harmonica"], [/^([hyj]a+)+$/, Wa, "haha"]], c: [[/.[^aeiou]ic$/, Sa]], d: [[/[aeiou](pp|ll|ss|ff|gg|tt|rr|bb|nn|mm)ed$/, La, "popped"], [/.[aeo]{2}[bdgmnprvz]ed$/, La, "rammed"], [/.[aeiou][sg]hed$/, La, "gushed"], [/.[aeiou]red$/, La, "hired"], [/.[aeiou]r?ried$/, La, "hurried"], [/[^aeiou]ard$/, Ka, "steward"], [/[aeiou][^aeiou]id$/, Sa, ""], [/.[vrl]id$/, Sa, "livid"], [/..led$/, La, "hurled"], [/.[iao]sed$/, La, ""], [/[aeiou]n?[cs]ed$/, La, ""], [/[aeiou][rl]?[mnf]ed$/, La, ""], [/[aeiou][ns]?c?ked$/, La, "bunked"], [/[aeiou]gned$/, La], [/[aeiou][nl]?ged$/, La], [/.[tdbwxyz]ed$/, La], [/[^aeiou][aeiou][tvx]ed$/, La], [/.[cdflmnprstv]ied$/, La, "emptied"]], e: [[/.[lnr]ize$/, $a, "antagonize"], [/.[^aeiou]ise$/, $a, "antagonise"], [/.[aeiou]te$/, $a, "bite"], [/.[^aeiou][ai]ble$/, Sa, "fixable"], [/.[^aeiou]eable$/, Sa, "maleable"], [/.[ts]ive$/, Sa, "festive"], [/[a-z]-like$/, Sa, "woman-like"]], h: [[/.[^aeiouf]ish$/, Sa, "cornish"], [/.v[iy]ch$/, Qa, "..ovich"], [/^ug?h+$/, Wa, "ughh"], [/^uh[ -]?oh$/, Wa, "uhoh"], [/[a-z]-ish$/, Sa, "cartoon-ish"]], i: [[/.[oau][wvl]ski$/, Qa, "polish-male"]], k: [[/^(k){2}$/, Wa, "kkkk"]], l: [[/.[gl]ial$/, Sa, "familial"], [/.[^aeiou]ful$/, Sa, "fitful"], [/.[nrtumcd]al$/, Sa, "natal"], [/.[^aeiou][ei]al$/, Sa, "familial"]], m: [[/.[^aeiou]ium$/, Ka, "magnesium"], [/[^aeiou]ism$/, Ka, "schism"], [/^[hu]m+$/, Wa, "hmm"], [/^\d+ ?[ap]m$/, "Date", "3am"]], n: [[/.[lsrnpb]ian$/, Sa, "republican"], [/[^aeiou]ician$/, qa, "musician"], [/[aeiou][ktrp]in'$/, "Gerund", "cookin'"]], o: [[/^no+$/, Wa, "noooo"], [/^(yo)+$/, Wa, "yoo"], [/^wo{2,}[pt]?$/, Wa, "woop"]], r: [[/.[bdfklmst]ler$/, "Noun"], [/[aeiou][pns]er$/, Ka], [/[^i]fer$/, $a], [/.[^aeiou][ao]pher$/, qa], [/.[lk]er$/, "Noun"], [/.ier$/, "Comparative"]], t: [[/.[di]est$/, "Superlative"], [/.[icldtgrv]ent$/, Sa], [/[aeiou].*ist$/, Sa], [/^[a-z]et$/, Ua]], s: [[/.[^aeiou]ises$/, Ma], [/.[rln]ates$/, Ma], [/.[^z]ens$/, Ua], [/.[lstrn]us$/, Ka], [/.[aeiou]sks$/, Ma], [/.[aeiou]kes$/, Ma], [/[aeiou][^aeiou]is$/, Ka], [/[a-z]'s$/, Ra], [/^yes+$/, Wa]], v: [[/.[^aeiou][ai][kln]ov$/, Qa]], y: [[/.[cts]hy$/, Sa], [/.[st]ty$/, Sa], [/.[tnl]ary$/, Sa], [/.[oe]ry$/, Ka], [/[rdntkbhs]ly$/, Ja], [/.(gg|bb|zz)ly$/, Sa], [/...lly$/, Ja], [/.[gk]y$/, Sa], [/[bszmp]{2}y$/, Sa], [/.[ai]my$/, Sa], [/[ea]{2}zy$/, Sa], [/.[^aeiou]ity$/, Ka]] };
        const Za = "Verb", Xa = "Noun";
        var Ya = { leftTags: [["Adjective", Xa], ["Possessive", Xa], ["Determiner", Xa], ["Adverb", Za], ["Pronoun", Za], ["Value", Xa], ["Ordinal", Xa], ["Modal", Za], ["Superlative", Xa], ["Demonym", Xa], ["Honorific", "Person"]], leftWords: [["i", Za], ["first", Xa], ["it", Za], ["there", Za], ["not", Za], ["because", Xa], ["if", Xa], ["but", Xa], ["who", Za], ["this", Xa], ["his", Xa], ["when", Xa], ["you", Za], ["very", "Adjective"], ["old", Xa], ["never", Za], ["before", Xa], ["a", Xa], ["the", Xa], ["been", Za]], rightTags: [["Copula", Xa], ["PastTense", Xa], ["Conjunction", Xa], ["Modal", Xa]], rightWords: [["there", Za], ["me", Za], ["man", "Adjective"], ["him", Za], ["it", Za], ["were", Xa], ["took", Xa], ["himself", Za], ["went", Xa], ["who", Xa], ["jr", "Person"]] }, ei = { fwd: "3:ser,ier\xA61er:h,t,f,l,n\xA61r:e\xA62er:ss,or,om", both: "3er:ver,ear,alm\xA63ner:hin\xA63ter:lat\xA62mer:im\xA62er:ng,rm,mb\xA62ber:ib\xA62ger:ig\xA61er:w,p,k,d\xA6ier:y", rev: "1:tter,yer\xA62:uer,ver,ffer,oner,eler,ller,iler,ster,cer,uler,sher,ener,gher,aner,adder,nter,eter,rter,hter,rner,fter\xA63:oser,ooler,eafer,user,airer,bler,maler,tler,eater,uger,rger,ainer,urer,ealer,icher,pler,emner,icter,nser,iser\xA64:arser,viner,ucher,rosser,somer,ndomer,moter,oother,uarer,hiter\xA65:nuiner,esser,emier\xA6ar:urther", ex: "worse:bad\xA6better:good\xA64er:fair,gray,poor\xA61urther:far\xA63ter:fat,hot,wet\xA63der:mad,sad\xA63er:shy,fun\xA64der:glad\xA6:\xA64r:cute,dire,fake,fine,free,lame,late,pale,rare,ripe,rude,safe,sore,tame,wide\xA65r:eerie,stale" }, ti = { fwd: "1:nning,tting,rring,pping,eing,mming,gging,dding,bbing,kking\xA62:eking,oling,eling,eming\xA63:velling,siting,uiting,fiting,loting,geting,ialing,celling\xA64:graming", both: "1:aing,iing,fing,xing,ying,oing,hing,wing\xA62:tzing,rping,izzing,bting,mning,sping,wling,rling,wding,rbing,uping,lming,wning,mping,oning,lting,mbing,lking,fting,hting,sking,gning,pting,cking,ening,nking,iling,eping,ering,rting,rming,cting,lping,ssing,nting,nding,lding,sting,rning,rding,rking\xA63:belling,siping,toming,yaking,uaking,oaning,auling,ooping,aiding,naping,euring,tolling,uzzing,ganing,haning,ualing,halling,iasing,auding,ieting,ceting,ouling,voring,ralling,garing,joring,oaming,oaking,roring,nelling,ooring,uelling,eaming,ooding,eaping,eeting,ooting,ooming,xiting,keting,ooking,ulling,airing,oaring,biting,outing,oiting,earing,naling,oading,eeding,ouring,eaking,aiming,illing,oining,eaning,onging,ealing,aining,eading\xA64:thoming,melling,aboring,ivoting,weating,dfilling,onoring,eriting,imiting,tialling,rgining,otoring,linging,winging,lleting,louding,spelling,mpelling,heating,feating,opelling,choring,welling,ymaking,ctoring,calling,peating,iloring,laiting,utoring,uditing,mmaking,loating,iciting,waiting,mbating,voiding,otalling,nsoring,nselling,ocusing,itoring,eloping\xA65:rselling,umpeting,atrolling,treating,tselling,rpreting,pringing,ummeting,ossoming,elmaking,eselling,rediting,totyping,onmaking,rfeiting,ntrolling\xA65e:chmaking,dkeeping,severing,erouting,ecreting,ephoning,uthoring,ravening,reathing,pediting,erfering,eotyping,fringing,entoring,ombining,ompeting\xA64e:emaking,eething,twining,rruling,chuting,xciting,rseding,scoping,edoring,pinging,lunging,agining,craping,pleting,eleting,nciting,nfining,ncoding,tponing,ecoding,writing,esaling,nvening,gnoring,evoting,mpeding,rvening,dhering,mpiling,storing,nviting,ploring\xA63e:tining,nuring,saking,miring,haling,ceding,xuding,rining,nuting,laring,caring,miling,riding,hoking,piring,lading,curing,uading,noting,taping,futing,paring,hading,loding,siring,guring,vading,voking,during,niting,laning,caping,luting,muting,ruding,ciding,juring,laming,caling,hining,uoting,liding,ciling,duling,tuting,puting,cuting,coring,uiding,tiring,turing,siding,rading,enging,haping,buting,lining,taking,anging,haring,uiring,coming,mining,moting,suring,viding,luding\xA62e:tring,zling,uging,oging,gling,iging,vring,fling,lging,obing,psing,pling,ubing,cling,dling,wsing,iking,rsing,dging,kling,ysing,tling,rging,eging,nsing,uning,osing,uming,using,ibing,bling,aging,ising,asing,ating\xA62ie:rlying\xA61e:zing,uing,cing,ving", rev: "ying:ie\xA61ing:se,ke,te,we,ne,re,de,pe,me,le,c,he\xA62ing:ll,ng,dd,ee,ye,oe,rg,us\xA62ning:un\xA62ging:og,ag,ug,ig,eg\xA62ming:um\xA62bing:ub,ab,eb,ob\xA63ning:lan,can,hin,pin,win\xA63ring:cur,lur,tir,tar,pur,car\xA63ing:ait,del,eel,fin,eat,oat,eem,lel,ool,ein,uin\xA63ping:rop,rap,top,uip,wap,hip,hop,lap,rip,cap\xA63ming:tem,wim,rim,kim,lim\xA63ting:mat,cut,pot,lit,lot,hat,set,pit,put\xA63ding:hed,bed,bid\xA63king:rek\xA63ling:cil,pel\xA63bing:rib\xA64ning:egin\xA64ing:isit,ruit,ilot,nsit,dget,rkel,ival,rcel\xA64ring:efer,nfer\xA64ting:rmit,mmit,ysit,dmit,emit,bmit,tfit,gret\xA64ling:evel,xcel,ivel\xA64ding:hred\xA65ing:arget,posit,rofit\xA65ring:nsfer\xA65ting:nsmit,orget,cquit\xA65ling:ancel,istil", ex: "3:adding,eating,aiming,aiding,airing,outing,gassing,setting,getting,putting,cutting,winning,sitting,betting,mapping,tapping,letting,bidding,hitting,tanning,netting,popping,fitting,capping,lapping,barring,banning,vetting,topping,rotting,tipping,potting,wetting,pitting,dipping,budding,hemming,pinning,jetting,kidding,padding,podding,sipping,wedding,bedding,donning,warring,penning,gutting,cueing,wadding,petting,ripping,napping,matting,tinning,binning,dimming,hopping,mopping,nodding,panning,rapping,ridding,sinning\xA64:selling,falling,calling,waiting,editing,telling,rolling,heating,boating,hanging,beating,coating,singing,tolling,felling,polling,discing,seating,voiding,gelling,yelling,baiting,reining,ruining,seeking,spanning,stepping,knitting,emitting,slipping,quitting,dialing,omitting,clipping,shutting,skinning,abutting,flipping,trotting,cramming,fretting,suiting\xA65:bringing,treating,spelling,stalling,trolling,expelling,rivaling,wringing,deterring,singeing,befitting,refitting\xA66:enrolling,distilling,scrolling,strolling,caucusing,travelling\xA67:installing,redefining,stencilling,recharging,overeating,benefiting,unraveling,programing\xA69:reprogramming\xA6is:being\xA62e:using,aging,owing\xA63e:making,taking,coming,noting,hiring,filing,coding,citing,doping,baking,coping,hoping,lading,caring,naming,voting,riding,mining,curing,lining,ruling,typing,boring,dining,firing,hiding,piling,taping,waning,baling,boning,faring,honing,wiping,luring,timing,wading,piping,fading,biting,zoning,daring,waking,gaming,raking,ceding,tiring,coking,wining,joking,paring,gaping,poking,pining,coring,liming,toting,roping,wiring,aching\xA64e:writing,storing,eroding,framing,smoking,tasting,wasting,phoning,shaking,abiding,braking,flaking,pasting,priming,shoring,sloping,withing,hinging\xA65e:defining,refining,renaming,swathing,fringing,reciting\xA61ie:dying,tying,lying,vying\xA67e:sunbathing" }, ni = { fwd: "1:mt\xA62:llen\xA63:iven,aken\xA6:ne\xA6y:in", both: "1:wn\xA62:me,aten\xA63:seen,bidden,isen\xA64:roven,asten\xA63l:pilt\xA63d:uilt\xA62e:itten\xA61im:wum\xA61eak:poken\xA61ine:hone\xA61ose:osen\xA61in:gun\xA61ake:woken\xA6ear:orn\xA6eal:olen\xA6eeze:ozen\xA6et:otten\xA6ink:unk\xA6ing:ung", rev: "2:un\xA6oken:eak\xA6ought:eek\xA6oven:eave\xA61ne:o\xA61own:ly\xA61den:de\xA61in:ay\xA62t:am\xA62n:ee\xA63en:all\xA64n:rive,sake,take\xA65n:rgive", ex: "2:been\xA63:seen,run\xA64:given,taken\xA65:shaken\xA62eak:broken\xA61ive:dove\xA62y:flown\xA63e:hidden,ridden\xA61eek:sought\xA61ake:woken\xA61eave:woven" }, ri = { fwd: "1:oes\xA61ve:as", both: "1:xes\xA62:zzes,ches,shes,sses\xA63:iases\xA62y:llies,plies\xA61y:cies,bies,ties,vies,nies,pies,dies,ries,fies\xA6:s", rev: "1ies:ly\xA62es:us,go,do\xA63es:cho,eto", ex: "2:does,goes\xA63:gasses\xA65:focuses\xA6is:are\xA63y:relies\xA62y:flies\xA62ve:has" }, oi = { fwd: "1st:e\xA61est:l,m,f,s\xA61iest:cey\xA62est:or,ir\xA63est:ver", both: "4:east\xA65:hwest\xA65lest:erful\xA64est:weet,lgar,tter,oung\xA64most:uter\xA63est:ger,der,rey,iet,ong,ear\xA63test:lat\xA63most:ner\xA62est:pt,ft,nt,ct,rt,ht\xA62test:it\xA62gest:ig\xA61est:b,k,n,p,h,d,w\xA6iest:y", rev: "1:ttest,nnest,yest\xA62:sest,stest,rmest,cest,vest,lmest,olest,ilest,ulest,ssest,imest,uest\xA63:rgest,eatest,oorest,plest,allest,urest,iefest,uelest,blest,ugest,amest,yalest,ealest,illest,tlest,itest\xA64:cerest,eriest,somest,rmalest,ndomest,motest,uarest,tiffest\xA65:leverest,rangest\xA6ar:urthest\xA63ey:riciest", ex: "best:good\xA6worst:bad\xA65est:great\xA64est:fast,full,fair,dull\xA63test:hot,wet,fat\xA64nest:thin\xA61urthest:far\xA63est:gay,shy,ill\xA64test:neat\xA64st:late,wide,fine,safe,cute,fake,pale,rare,rude,sore,ripe,dire\xA66st:severe" }, ai = { fwd: "1:tistic,eable,lful,sful,ting,tty\xA62:onate,rtable,geous,ced,seful,ctful\xA63:ortive,ented\xA6arity:ear\xA6y:etic\xA6fulness:begone\xA61ity:re\xA61y:tiful,gic\xA62ity:ile,imous,ilous,ime\xA62ion:ated\xA62eness:iving\xA62y:trious\xA62ation:iring\xA62tion:vant\xA63ion:ect\xA63ce:mant,mantic\xA63tion:irable\xA63y:est,estic\xA63m:mistic,listic\xA63ess:ning\xA64n:utious\xA64on:rative,native,vative,ective\xA64ce:erant", both: "1:king,wing\xA62:alous,ltuous,oyful,rdous\xA63:gorous,ectable,werful,amatic\xA64:oised,usical,agical,raceful,ocused,lined,ightful\xA65ness:stful,lding,itous,nuous,ulous,otous,nable,gious,ayful,rvous,ntous,lsive,peful,entle,ciful,osive,leful,isive,ncise,reful,mious\xA65ty:ivacious\xA65ties:ubtle\xA65ce:ilient,adiant,atient\xA65cy:icient\xA65sm:gmatic\xA65on:sessive,dictive\xA65ity:pular,sonal,eative,entic\xA65sity:uminous\xA65ism:conic\xA65nce:mperate\xA65ility:mitable\xA65ment:xcited\xA65n:bitious\xA64cy:brant,etent,curate\xA64ility:erable,acable,icable,ptable\xA64ty:nacious,aive,oyal,dacious\xA64n:icious\xA64ce:vient,erent,stent,ndent,dient,quent,ident\xA64ness:adic,ound,hing,pant,sant,oing,oist,tute\xA64icity:imple\xA64ment:fined,mused\xA64ism:otic\xA64ry:dantic\xA64ity:tund,eral\xA64edness:hand\xA64on:uitive\xA64lity:pitable\xA64sm:eroic,namic\xA64sity:nerous\xA63th:arm\xA63ility:pable,bable,dable,iable\xA63cy:hant,nant,icate\xA63ness:red,hin,nse,ict,iet,ite,oud,ind,ied,rce\xA63ion:lute\xA63ity:ual,gal,volous,ial\xA63ce:sent,fensive,lant,gant,gent,lent,dant\xA63on:asive\xA63m:fist,sistic,iastic\xA63y:terious,xurious,ronic,tastic\xA63ur:amorous\xA63e:tunate\xA63ation:mined\xA63sy:rteous\xA63ty:ain\xA63ry:ave\xA63ment:azed\xA62ness:de,on,ue,rn,ur,ft,rp,pe,om,ge,rd,od,ay,ss,er,ll,oy,ap,ht,ld,ad,rt\xA62inousness:umous\xA62ity:neous,ene,id,ane\xA62cy:bate,late\xA62ation:ized\xA62ility:oble,ible\xA62y:odic\xA62e:oving,aring\xA62s:ost\xA62itude:pt\xA62dom:ee\xA62ance:uring\xA62tion:reet\xA62ion:oted\xA62sion:ending\xA62liness:an\xA62or:rdent\xA61th:ung\xA61e:uable\xA61ness:w,h,k,f\xA61ility:mble\xA61or:vent\xA61ement:ging\xA61tiquity:ncient\xA61ment:hed\xA6verty:or\xA6ength:ong\xA6eat:ot\xA6pth:ep\xA6iness:y", rev: "", ex: "5:forceful,humorous\xA68:charismatic\xA613:understanding\xA65ity:active\xA611ness:adventurous,inquisitive,resourceful\xA68on:aggressive,automatic,perceptive\xA67ness:amorous,fatuous,furtive,ominous,serious\xA65ness:ample,sweet\xA612ness:apprehensive,cantankerous,contemptuous,ostentatious\xA613ness:argumentative,conscientious\xA69ness:assertive,facetious,imperious,inventive,oblivious,rapacious,receptive,seditious,whimsical\xA610ness:attractive,expressive,impressive,loquacious,salubrious,thoughtful\xA63edom:boring\xA64ness:calm,fast,keen,tame\xA68ness:cheerful,gracious,specious,spurious,timorous,unctuous\xA65sity:curious\xA69ion:deliberate\xA68ion:desperate\xA66e:expensive\xA67ce:fragrant\xA63y:furious\xA69ility:ineluctable\xA66ism:mystical\xA68ity:physical,proactive,sensitive,vertical\xA65cy:pliant\xA67ity:positive\xA69ity:practical\xA612ism:professional\xA66ce:prudent\xA63ness:red\xA66cy:vagrant\xA63dom:wise" };
        const ii = function(e2 = "", t2 = {}) {
          let n2 = function(e3, t3 = {}) {
            return t3.hasOwnProperty(e3) ? t3[e3] : null;
          }(e2, t2.ex);
          return n2 = n2 || function(e3, t3 = []) {
            for (let n3 = 0; n3 < t3.length; n3 += 1) if (e3.endsWith(t3[n3])) return e3;
            return null;
          }(e2, t2.same), n2 = n2 || function(e3, t3, n3 = {}) {
            t3 = t3 || {};
            for (let r2 = e3.length - 1; r2 >= 1; r2 -= 1) {
              let o2 = e3.length - r2, a2 = e3.substring(o2, e3.length);
              if (true === t3.hasOwnProperty(a2)) return e3.slice(0, o2) + t3[a2];
              if (true === n3.hasOwnProperty(a2)) return e3.slice(0, o2) + n3[a2];
            }
            return t3.hasOwnProperty("") ? e3 + t3[""] : n3.hasOwnProperty("") ? e3 + n3[""] : null;
          }(e2, t2.fwd, t2.both), n2 = n2 || e2, n2;
        }, si = function(e2) {
          return Object.entries(e2).reduce((e3, t2) => (e3[t2[1]] = t2[0], e3), {});
        }, li = function(e2 = {}) {
          return { reversed: true, both: si(e2.both), ex: si(e2.ex), fwd: e2.rev || {} };
        }, ui = /^([0-9]+)/, ci = function(e2) {
          let t2 = function(e3) {
            let t3 = {};
            return e3.split("\xA6").forEach((e4) => {
              let [n2, r2] = e4.split(":");
              r2 = (r2 || "").split(","), r2.forEach((e5) => {
                t3[e5] = n2;
              });
            }), t3;
          }(e2);
          return Object.keys(t2).reduce((e3, n2) => (e3[n2] = function(e4 = "", t3 = "") {
            let n3 = (t3 = String(t3)).match(ui);
            if (null === n3) return t3;
            let r2 = Number(n3[1]) || 0;
            return e4.substring(0, r2) + t3.replace(ui, "");
          }(n2, t2[n2]), e3), {});
        }, hi = function(e2 = {}) {
          return "string" == typeof e2 && (e2 = JSON.parse(e2)), e2.fwd = ci(e2.fwd || ""), e2.both = ci(e2.both || ""), e2.rev = ci(e2.rev || ""), e2.ex = ci(e2.ex || ""), e2;
        }, di = hi({ fwd: "1:tted,wed,gged,nned,een,rred,pped,yed,bbed,oed,dded,rd,wn,mmed\xA62:eed,nded,et,hted,st,oled,ut,emed,eled,lded,ken,rt,nked,apt,ant,eped,eked\xA63:eared,eat,eaded,nelled,ealt,eeded,ooted,eaked,eaned,eeted,mited,bid,uit,ead,uited,ealed,geted,velled,ialed,belled\xA64:ebuted,hined,comed\xA6y:ied\xA6ome:ame\xA6ear:ore\xA6ind:ound\xA6ing:ung,ang\xA6ep:pt\xA6ink:ank,unk\xA6ig:ug\xA6all:ell\xA6ee:aw\xA6ive:ave\xA6eeze:oze\xA6old:eld\xA6ave:ft\xA6ake:ook\xA6ell:old\xA6ite:ote\xA6ide:ode\xA6ine:one\xA6in:un,on\xA6eal:ole\xA6im:am\xA6ie:ay\xA6and:ood\xA61ise:rose\xA61eak:roke\xA61ing:rought\xA61ive:rove\xA61el:elt\xA61id:bade\xA61et:got\xA61y:aid\xA61it:sat\xA63e:lid\xA63d:pent", both: "1:aed,fed,xed,hed\xA62:sged,xted,wled,rped,lked,kied,lmed,lped,uped,bted,rbed,rked,wned,rled,mped,fted,mned,mbed,zzed,omed,ened,cked,gned,lted,sked,ued,zed,nted,ered,rted,rmed,ced,sted,rned,ssed,rded,pted,ved,cted\xA63:cled,eined,siped,ooned,uked,ymed,jored,ouded,ioted,oaned,lged,asped,iged,mured,oided,eiled,yped,taled,moned,yled,lit,kled,oaked,gled,naled,fled,uined,oared,valled,koned,soned,aided,obed,ibed,meted,nicked,rored,micked,keted,vred,ooped,oaded,rited,aired,auled,filled,ouled,ooded,ceted,tolled,oited,bited,aped,tled,vored,dled,eamed,nsed,rsed,sited,owded,pled,sored,rged,osed,pelled,oured,psed,oated,loned,aimed,illed,eured,tred,ioned,celled,bled,wsed,ooked,oiled,itzed,iked,iased,onged,ased,ailed,uned,umed,ained,auded,nulled,ysed,eged,ised,aged,oined,ated,used,dged,doned\xA64:ntied,efited,uaked,caded,fired,roped,halled,roked,himed,culed,tared,lared,tuted,uared,routed,pited,naked,miled,houted,helled,hared,cored,caled,tired,peated,futed,ciled,called,tined,moted,filed,sided,poned,iloted,honed,lleted,huted,ruled,cured,named,preted,vaded,sured,talled,haled,peded,gined,nited,uided,ramed,feited,laked,gured,ctored,unged,pired,cuted,voked,eloped,ralled,rined,coded,icited,vided,uaded,voted,mined,sired,noted,lined,nselled,luted,jured,fided,puted,piled,pared,olored,cided,hoked,enged,tured,geoned,cotted,lamed,uiled,waited,udited,anged,luded,mired,uired,raded\xA65:modelled,izzled,eleted,umpeted,ailored,rseded,treated,eduled,ecited,rammed,eceded,atrolled,nitored,basted,twined,itialled,ncited,gnored,ploded,xcited,nrolled,namelled,plored,efeated,redited,ntrolled,nfined,pleted,llided,lcined,eathed,ibuted,lloted,dhered,cceded\xA63ad:sled\xA62aw:drew\xA62ot:hot\xA62ke:made\xA62ow:hrew,grew\xA62ose:hose\xA62d:ilt\xA62in:egan\xA61un:ran\xA61ink:hought\xA61ick:tuck\xA61ike:ruck\xA61eak:poke,nuck\xA61it:pat\xA61o:did\xA61ow:new\xA61ake:woke\xA6go:went", rev: "3:rst,hed,hut,cut,set\xA64:tbid\xA65:dcast,eread,pread,erbid\xA6ought:uy,eek\xA61ied:ny,ly,dy,ry,fy,py,vy,by,ty,cy\xA61ung:ling,ting,wing\xA61pt:eep\xA61ank:rink\xA61ore:bear,wear\xA61ave:give\xA61oze:reeze\xA61ound:rind,wind\xA61ook:take,hake\xA61aw:see\xA61old:sell\xA61ote:rite\xA61ole:teal\xA61unk:tink\xA61am:wim\xA61ay:lie\xA61ood:tand\xA61eld:hold\xA62d:he,ge,re,le,leed,ne,reed,be,ye,lee,pe,we\xA62ed:dd,oy,or,ey,gg,rr,us,ew,to\xA62ame:ecome,rcome\xA62ped:ap\xA62ged:ag,og,ug,eg\xA62bed:ub,ab,ib,ob\xA62lt:neel\xA62id:pay\xA62ang:pring\xA62ove:trive\xA62med:um\xA62ode:rride\xA62at:ysit\xA63ted:mit,hat,mat,lat,pot,rot,bat\xA63ed:low,end,tow,und,ond,eem,lay,cho,dow,xit,eld,ald,uld,law,lel,eat,oll,ray,ank,fin,oam,out,how,iek,tay,haw,ait,vet,say,cay,bow\xA63d:ste,ede,ode,ete,ree,ude,ame,oke,ote,ime,ute,ade\xA63red:lur,cur,pur,car\xA63ped:hop,rop,uip,rip,lip,tep,top\xA63ded:bed,rod,kid\xA63ade:orbid\xA63led:uel\xA63ned:lan,can,kin,pan,tun\xA63med:rim,lim\xA64ted:quit,llot\xA64ed:pear,rrow,rand,lean,mand,anel,pand,reet,link,abel,evel,imit,ceed,ruit,mind,peal,veal,hool,head,pell,well,mell,uell,band,hear,weak\xA64led:nnel,qual,ebel,ivel\xA64red:nfer,efer,sfer\xA64n:sake,trew\xA64d:ntee\xA64ded:hred\xA64ned:rpin\xA65ed:light,nceal,right,ndear,arget,hread,eight,rtial,eboot\xA65d:edite,nvite\xA65ted:egret\xA65led:ravel", ex: "2:been,upped\xA63:added,aged,aided,aimed,aired,bid,died,dyed,egged,erred,eyed,fit,gassed,hit,lied,owed,pent,pied,tied,used,vied,oiled,outed,banned,barred,bet,canned,cut,dipped,donned,ended,feed,inked,jarred,let,manned,mowed,netted,padded,panned,pitted,popped,potted,put,set,sewn,sowed,tanned,tipped,topped,vowed,weed,bowed,jammed,binned,dimmed,hopped,mopped,nodded,pinned,rigged,sinned,towed,vetted\xA64:ached,baked,baled,boned,bored,called,caned,cared,ceded,cited,coded,cored,cubed,cured,dared,dined,edited,exited,faked,fared,filed,fined,fired,fuelled,gamed,gelled,hired,hoped,joked,lined,mined,named,noted,piled,poked,polled,pored,pulled,reaped,roamed,rolled,ruled,seated,shed,sided,timed,tolled,toned,voted,waited,walled,waned,winged,wiped,wired,zoned,yelled,tamed,lubed,roped,faded,mired,caked,honed,banged,culled,heated,raked,welled,banded,beat,cast,cooled,cost,dealt,feared,folded,footed,handed,headed,heard,hurt,knitted,landed,leaked,leapt,linked,meant,minded,molded,neared,needed,peaked,plodded,plotted,pooled,quit,read,rooted,sealed,seeded,seeped,shipped,shunned,skimmed,slammed,sparred,stemmed,stirred,suited,thinned,twinned,swayed,winked,dialed,abutted,blotted,fretted,healed,heeded,peeled,reeled\xA65:basted,cheated,equalled,eroded,exiled,focused,opined,pleated,primed,quoted,scouted,shored,sloped,smoked,sniped,spelled,spouted,routed,staked,stored,swelled,tasted,treated,wasted,smelled,dwelled,honored,prided,quelled,eloped,scared,coveted,sweated,breaded,cleared,debuted,deterred,freaked,modeled,pleaded,rebutted,speeded\xA66:anchored,defined,endured,impaled,invited,refined,revered,strolled,cringed,recast,thrust,unfolded\xA67:authored,combined,competed,conceded,convened,excreted,extruded,redefined,restored,secreted,rescinded,welcomed\xA68:expedited,infringed\xA69:interfered,intervened,persevered\xA610:contravened\xA6eat:ate\xA6is:was\xA6go:went\xA6are:were\xA63d:bent,lent,rent,sent\xA63e:bit,fled,hid,lost\xA63ed:bled,bred\xA62ow:blew,grew\xA61uy:bought\xA62tch:caught\xA61o:did\xA61ive:dove,gave\xA62aw:drew\xA62ed:fed\xA62y:flew,laid,paid,said\xA61ight:fought\xA61et:got\xA62ve:had\xA61ang:hung\xA62ad:led\xA62ght:lit\xA62ke:made\xA62et:met\xA61un:ran\xA61ise:rose\xA61it:sat\xA61eek:sought\xA61each:taught\xA61ake:woke,took\xA61eave:wove\xA62ise:arose\xA61ear:bore,tore,wore\xA61ind:bound,found,wound\xA62eak:broke\xA62ing:brought,wrung\xA61ome:came\xA62ive:drove\xA61ig:dug\xA61all:fell\xA62el:felt\xA64et:forgot\xA61old:held\xA62ave:left\xA61ing:rang,sang\xA61ide:rode\xA61ink:sank\xA61ee:saw\xA62ine:shone\xA64e:slid\xA61ell:sold,told\xA64d:spent\xA62in:spun\xA61in:won" }), gi = hi(ri), mi = hi(ti), pi = hi(ni), fi = li(di), bi = li(gi), vi = li(mi), yi = li(pi), wi = hi(ei), ki = hi(oi);
        var Pi = { fromPast: di, fromPresent: gi, fromGerund: mi, fromParticiple: pi, toPast: fi, toPresent: bi, toGerund: vi, toParticiple: yi, toComparative: wi, toSuperlative: ki, fromComparative: li(wi), fromSuperlative: li(ki), adjToNoun: hi(ai) }, Ai = ["academy", "administration", "agence", "agences", "agencies", "agency", "airlines", "airways", "army", "assoc", "associates", "association", "assurance", "authority", "autorite", "aviation", "bank", "banque", "board", "boys", "brands", "brewery", "brotherhood", "brothers", "bureau", "cafe", "co", "caisse", "capital", "care", "cathedral", "center", "centre", "chemicals", "choir", "chronicle", "church", "circus", "clinic", "clinique", "club", "co", "coalition", "coffee", "collective", "college", "commission", "committee", "communications", "community", "company", "comprehensive", "computers", "confederation", "conference", "conseil", "consulting", "containers", "corporation", "corps", "corp", "council", "crew", "data", "departement", "department", "departments", "design", "development", "directorate", "division", "drilling", "education", "eglise", "electric", "electricity", "energy", "ensemble", "enterprise", "enterprises", "entertainment", "estate", "etat", "faculty", "faction", "federation", "financial", "fm", "foundation", "fund", "gas", "gazette", "girls", "government", "group", "guild", "herald", "holdings", "hospital", "hotel", "hotels", "inc", "industries", "institut", "institute", "institutes", "insurance", "international", "interstate", "investment", "investments", "investors", "journal", "laboratory", "labs", "llc", "ltd", "limited", "machines", "magazine", "management", "marine", "marketing", "markets", "media", "memorial", "ministere", "ministry", "military", "mobile", "motor", "motors", "musee", "museum", "news", "observatory", "office", "oil", "optical", "orchestra", "organization", "partners", "partnership", "petrol", "petroleum", "pharmacare", "pharmaceutical", "pharmaceuticals", "pizza", "plc", "police", "politburo", "polytechnic", "post", "power", "press", "productions", "quartet", "radio", "reserve", "resources", "restaurant", "restaurants", "savings", "school", "securities", "service", "services", "societe", "subsidiary", "society", "sons", "subcommittee", "syndicat", "systems", "telecommunications", "telegraph", "television", "times", "tribunal", "tv", "union", "university", "utilities", "workers"].reduce((e2, t2) => (e2[t2] = true, e2), {}), Ni = ["atoll", "basin", "bay", "beach", "bluff", "bog", "camp", "canyon", "canyons", "cape", "cave", "caves", "cliffs", "coast", "cove", "coves", "crater", "crossing", "creek", "desert", "dune", "dunes", "downs", "estates", "escarpment", "estuary", "falls", "fjord", "fjords", "forest", "forests", "glacier", "gorge", "gorges", "grove", "gulf", "gully", "highland", "heights", "hollow", "hill", "hills", "inlet", "island", "islands", "isthmus", "junction", "knoll", "lagoon", "lake", "lakeshore", "marsh", "marshes", "mount", "mountain", "mountains", "narrows", "peninsula", "plains", "plateau", "pond", "rapids", "ravine", "reef", "reefs", "ridge", "river", "rivers", "sandhill", "shoal", "shore", "shoreline", "shores", "strait", "straits", "springs", "stream", "swamp", "tombolo", "trail", "trails", "trench", "valley", "vallies", "village", "volcano", "waterfall", "watershed", "wetland", "woods", "acres", "burough", "county", "district", "municipality", "prefecture", "province", "region", "reservation", "state", "territory", "borough", "metropolis", "downtown", "uptown", "midtown", "city", "town", "township", "hamlet", "country", "kingdom", "enclave", "neighbourhood", "neighborhood", "kingdom", "ward", "zone", "airport", "amphitheater", "arch", "arena", "auditorium", "bar", "barn", "basilica", "battlefield", "bridge", "building", "castle", "centre", "coliseum", "cineplex", "complex", "dam", "farm", "field", "fort", "garden", "gardens", "gymnasium", "hall", "house", "levee", "library", "manor", "memorial", "monument", "museum", "gallery", "palace", "pillar", "pits", "plantation", "playhouse", "quarry", "sportsfield", "sportsplex", "stadium", "terrace", "terraces", "theater", "tower", "park", "parks", "site", "ranch", "raceway", "sportsplex", "ave", "st", "street", "rd", "road", "lane", "landing", "crescent", "cr", "way", "tr", "terrace", "avenue"].reduce((e2, t2) => (e2[t2] = true, e2), {}), Ci = [[/([^v])ies$/i, "$1y"], [/(ise)s$/i, "$1"], [/(kn|[^o]l|w)ives$/i, "$1ife"], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)ves$/i, "$1f"], [/^(dwar|handkerchie|hoo|scar|whar)ves$/i, "$1f"], [/(antenn|formul|nebul|vertebr|vit)ae$/i, "$1a"], [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, "$1us"], [/(buffal|tomat|tornad)(oes)$/i, "$1o"], [/(ause)s$/i, "$1"], [/(ease)s$/i, "$1"], [/(ious)es$/i, "$1"], [/(ouse)s$/i, "$1"], [/(ose)s$/i, "$1"], [/(..ase)s$/i, "$1"], [/(..[aeiu]s)es$/i, "$1"], [/(vert|ind|cort)(ices)$/i, "$1ex"], [/(matr|append)(ices)$/i, "$1ix"], [/([xo]|ch|ss|sh)es$/i, "$1"], [/men$/i, "man"], [/(n)ews$/i, "$1ews"], [/([ti])a$/i, "$1um"], [/([^aeiouy]|qu)ies$/i, "$1y"], [/(s)eries$/i, "$1eries"], [/(m)ovies$/i, "$1ovie"], [/(cris|ax|test)es$/i, "$1is"], [/(alias|status)es$/i, "$1"], [/(ss)$/i, "$1"], [/(ic)s$/i, "$1"], [/s$/i, ""]];
        const ji = function(e2, t2) {
          const { irregularPlurals: n2 } = t2.two, r2 = (o2 = n2, Object.keys(o2).reduce((e3, t3) => (e3[o2[t3]] = t3, e3), {}));
          var o2;
          if (r2.hasOwnProperty(e2)) return r2[e2];
          for (let t3 = 0; t3 < Ci.length; t3++) if (true === Ci[t3][0].test(e2)) return e2 = e2.replace(Ci[t3][0], Ci[t3][1]);
          return e2;
        };
        var xi = { toPlural: Ho, toSingular: ji, all: function(e2, t2) {
          const n2 = [e2], r2 = Ho(e2, t2);
          r2 !== e2 && n2.push(r2);
          const o2 = ji(e2, t2);
          return o2 !== e2 && n2.push(o2), n2;
        } };
        let Ii = { Gerund: ["ing"], Actor: ["erer"], Infinitive: ["ate", "ize", "tion", "rify", "then", "ress", "ify", "age", "nce", "ect", "ise", "ine", "ish", "ace", "ash", "ure", "tch", "end", "ack", "and", "ute", "ade", "ock", "ite", "ase", "ose", "use", "ive", "int", "nge", "lay", "est", "ain", "ant", "ent", "eed", "er", "le", "unk", "ung", "upt", "en"], PastTense: ["ept", "ed", "lt", "nt", "ew", "ld"], PresentTense: ["rks", "cks", "nks", "ngs", "mps", "tes", "zes", "ers", "les", "acks", "ends", "ands", "ocks", "lays", "eads", "lls", "els", "ils", "ows", "nds", "ays", "ams", "ars", "ops", "ffs", "als", "urs", "lds", "ews", "ips", "es", "ts", "ns"], Participle: ["ken", "wn"] };
        Ii = Object.keys(Ii).reduce((e2, t2) => (Ii[t2].forEach((n2) => e2[n2] = t2), e2), {});
        const Ti = function(e2) {
          const t2 = e2.substring(e2.length - 3);
          if (true === Ii.hasOwnProperty(t2)) return Ii[t2];
          const n2 = e2.substring(e2.length - 2);
          if (true === Ii.hasOwnProperty(n2)) return Ii[n2];
          return "s" === e2.substring(e2.length - 1) ? "PresentTense" : null;
        }, Di = { are: "be", were: "be", been: "be", is: "be", am: "be", was: "be", be: "be", being: "be" }, Hi = function(e2, t2, n2) {
          const { fromPast: r2, fromPresent: o2, fromGerund: a2, fromParticiple: i2 } = t2.two.models, { prefix: s2, verb: l2, particle: u2 } = function(e3, t3) {
            let n3 = "", r3 = {};
            t3.one && t3.one.prefixes && (r3 = t3.one.prefixes);
            let [o3, a3] = e3.split(/ /);
            return a3 && true === r3[o3] && (n3 = o3, o3 = a3, a3 = ""), { prefix: n3, verb: o3, particle: a3 };
          }(e2, t2);
          let c2 = "";
          if (n2 || (n2 = Ti(e2)), Di.hasOwnProperty(e2)) c2 = Di[e2];
          else if ("Participle" === n2) c2 = ii(l2, i2);
          else if ("PastTense" === n2) c2 = ii(l2, r2);
          else if ("PresentTense" === n2) c2 = ii(l2, o2);
          else {
            if ("Gerund" !== n2) return e2;
            c2 = ii(l2, a2);
          }
          return u2 && (c2 += " " + u2), s2 && (c2 = s2 + " " + c2), c2;
        }, Ei = function(e2, t2) {
          const { toPast: n2, toPresent: r2, toGerund: o2, toParticiple: a2 } = t2.two.models;
          if ("be" === e2) return { Infinitive: e2, Gerund: "being", PastTense: "was", PresentTense: "is" };
          const [i2, s2] = ((e3) => / /.test(e3) ? e3.split(/ /) : [e3, ""])(e2), l2 = { Infinitive: i2, PastTense: ii(i2, n2), PresentTense: ii(i2, r2), Gerund: ii(i2, o2), FutureTense: "will " + i2 };
          let u2 = ii(i2, a2);
          if (u2 !== e2 && u2 !== l2.PastTense) {
            const n3 = t2.one.lexicon || {};
            "Participle" !== n3[u2] && "Adjective" !== n3[u2] || ("play" === e2 && (u2 = "played"), l2.Participle = u2);
          }
          return s2 && Object.keys(l2).forEach((e3) => {
            l2[e3] += " " + s2;
          }), l2;
        };
        var Gi = { toInfinitive: Hi, conjugate: Ei, all: function(e2, t2) {
          const n2 = Ei(e2, t2);
          return delete n2.FutureTense, Object.values(n2).filter((e3) => e3);
        } };
        const Oi = function(e2, t2) {
          const n2 = t2.two.models.toSuperlative;
          return ii(e2, n2);
        }, Fi = function(e2, t2) {
          const n2 = t2.two.models.toComparative;
          return ii(e2, n2);
        }, Vi = function(e2 = "", t2 = []) {
          const n2 = e2.length;
          for (let r2 = n2 <= 6 ? n2 - 1 : 6; r2 >= 1; r2 -= 1) {
            const o2 = e2.substring(n2 - r2, e2.length);
            if (true === t2[o2.length].hasOwnProperty(o2)) {
              return e2.slice(0, n2 - r2) + t2[o2.length][o2];
            }
          }
          return null;
        }, zi = "ically", Bi = /* @__PURE__ */ new Set(["analyt" + zi, "chem" + zi, "class" + zi, "clin" + zi, "crit" + zi, "ecolog" + zi, "electr" + zi, "empir" + zi, "frant" + zi, "grammat" + zi, "ident" + zi, "ideolog" + zi, "log" + zi, "mag" + zi, "mathemat" + zi, "mechan" + zi, "med" + zi, "method" + zi, "method" + zi, "mus" + zi, "phys" + zi, "phys" + zi, "polit" + zi, "pract" + zi, "rad" + zi, "satir" + zi, "statist" + zi, "techn" + zi, "technolog" + zi, "theoret" + zi, "typ" + zi, "vert" + zi, "whims" + zi]), Si = [null, {}, { ly: "" }, { ily: "y", bly: "ble", ply: "ple" }, { ally: "al", rply: "rp" }, { ually: "ual", ially: "ial", cally: "cal", eally: "eal", rally: "ral", nally: "nal", mally: "mal", eeply: "eep", eaply: "eap" }, { ically: "ic" }], $i = /* @__PURE__ */ new Set(["early", "only", "hourly", "daily", "weekly", "monthly", "yearly", "mostly", "duly", "unduly", "especially", "undoubtedly", "conversely", "namely", "exceedingly", "presumably", "accordingly", "overly", "best", "latter", "little", "long", "low"]), Mi = { wholly: "whole", fully: "full", truly: "true", gently: "gentle", singly: "single", customarily: "customary", idly: "idle", publically: "public", quickly: "quick", superbly: "superb", cynically: "cynical", well: "good" }, Ki = [null, { y: "ily" }, { ly: "ly", ic: "ically" }, { ial: "ially", ual: "ually", tle: "tly", ble: "bly", ple: "ply", ary: "arily" }, {}, {}, {}], Li = { cool: "cooly", whole: "wholly", full: "fully", good: "well", idle: "idly", public: "publicly", single: "singly", special: "especially" }, Ji = function(e2) {
          if (Li.hasOwnProperty(e2)) return Li[e2];
          let t2 = Vi(e2, Ki);
          return t2 || (t2 = e2 + "ly"), t2;
        };
        var Wi = { toSuperlative: Oi, toComparative: Fi, toAdverb: Ji, toNoun: function(e2, t2) {
          const n2 = t2.two.models.adjToNoun;
          return ii(e2, n2);
        }, fromAdverb: function(e2) {
          return e2.endsWith("ly") ? Bi.has(e2) ? e2.replace(/ically/, "ical") : $i.has(e2) ? null : Mi.hasOwnProperty(e2) ? Mi[e2] : Vi(e2, Si) || e2 : null;
        }, fromSuperlative: function(e2, t2) {
          const n2 = t2.two.models.fromSuperlative;
          return ii(e2, n2);
        }, fromComparative: function(e2, t2) {
          const n2 = t2.two.models.fromComparative;
          return ii(e2, n2);
        }, all: function(e2, t2) {
          let n2 = [e2];
          return n2.push(Oi(e2, t2)), n2.push(Fi(e2, t2)), n2.push(Ji(e2)), n2 = n2.filter((e3) => e3), n2 = new Set(n2), Array.from(n2);
        } }, qi = { noun: xi, verb: Gi, adjective: Wi }, Ui = { Singular: (e2, t2, n2, r2) => {
          const o2 = r2.one.lexicon, a2 = n2.two.transform.noun.toPlural(e2, r2);
          o2[a2] || (t2[a2] = t2[a2] || "Plural");
        }, Actor: (e2, t2, n2, r2) => {
          const o2 = r2.one.lexicon, a2 = n2.two.transform.noun.toPlural(e2, r2);
          o2[a2] || (t2[a2] = t2[a2] || ["Plural", "Actor"]);
        }, Comparable: (e2, t2, n2, r2) => {
          const o2 = r2.one.lexicon, { toSuperlative: a2, toComparative: i2 } = n2.two.transform.adjective, s2 = a2(e2, r2);
          o2[s2] || (t2[s2] = t2[s2] || "Superlative");
          const l2 = i2(e2, r2);
          o2[l2] || (t2[l2] = t2[l2] || "Comparative"), t2[e2] = "Adjective";
        }, Demonym: (e2, t2, n2, r2) => {
          const o2 = n2.two.transform.noun.toPlural(e2, r2);
          t2[o2] = t2[o2] || ["Demonym", "Plural"];
        }, Infinitive: (e2, t2, n2, r2) => {
          const o2 = r2.one.lexicon, a2 = n2.two.transform.verb.conjugate(e2, r2);
          Object.entries(a2).forEach((e3) => {
            o2[e3[1]] || t2[e3[1]] || "FutureTense" === e3[0] || (t2[e3[1]] = e3[0]);
          });
        }, PhrasalVerb: (e2, t2, n2, r2) => {
          const o2 = r2.one.lexicon;
          t2[e2] = ["PhrasalVerb", "Infinitive"];
          const a2 = r2.one._multiCache, [i2, s2] = e2.split(" ");
          o2[i2] || (t2[i2] = t2[i2] || "Infinitive");
          const l2 = n2.two.transform.verb.conjugate(i2, r2);
          delete l2.FutureTense, Object.entries(l2).forEach((e3) => {
            if ("Actor" === e3[0] || "" === e3[1]) return;
            t2[e3[1]] || o2[e3[1]] || (t2[e3[1]] = e3[0]), a2[e3[1]] = 2;
            const n3 = e3[1] + " " + s2;
            t2[n3] = t2[n3] || [e3[0], "PhrasalVerb"];
          });
        }, Multiple: (e2, t2) => {
          t2[e2] = ["Multiple", "Cardinal"], t2[e2 + "th"] = ["Multiple", "Ordinal"], t2[e2 + "ths"] = ["Multiple", "Fraction"];
        }, Cardinal: (e2, t2) => {
          t2[e2] = ["TextValue", "Cardinal"];
        }, Ordinal: (e2, t2) => {
          t2[e2] = ["TextValue", "Ordinal"], t2[e2 + "s"] = ["TextValue", "Fraction"];
        }, Place: (e2, t2) => {
          t2[e2] = ["Place", "ProperNoun"];
        }, Region: (e2, t2) => {
          t2[e2] = ["Region", "ProperNoun"];
        } };
        const Ri = { e: ["mice", "louse", "antennae", "formulae", "nebulae", "vertebrae", "vitae"], i: ["tia", "octopi", "viri", "radii", "nuclei", "fungi", "cacti", "stimuli"], n: ["men"], t: ["feet"] }, Qi = /* @__PURE__ */ new Set(["israelis", "menus", "logos"]), _i = ["bus", "mas", "was", "ias", "xas", "vas", "cis", "lis", "nis", "ois", "ris", "sis", "tis", "xis", "aus", "cus", "eus", "fus", "gus", "ius", "lus", "nus", "das", "ous", "pus", "rus", "sus", "tus", "xus", "aos", "igos", "ados", "ogos", "'s", "ss"], Zi = function(e2) {
          if (!e2 || e2.length <= 3) return false;
          if (Qi.has(e2)) return true;
          const t2 = e2[e2.length - 1];
          return Ri.hasOwnProperty(t2) ? Ri[t2].find((t3) => e2.endsWith(t3)) : "s" === t2 && !_i.find((t3) => e2.endsWith(t3));
        };
        var Xi = { two: { quickSplit: function(e2) {
          const t2 = /[,:;]/, n2 = [];
          return e2.forEach((e3) => {
            let r2 = 0;
            e3.forEach((o2, a2) => {
              t2.test(o2.post) && function(e4, t3) {
                const n3 = /^[0-9]+$/, r3 = e4[t3];
                if (!r3) return false;
                const o3 = /* @__PURE__ */ new Set(["may", "april", "august", "jan"]);
                if ("like" === r3.normal || o3.has(r3.normal)) return false;
                if (r3.tags.has("Place") || r3.tags.has("Date")) return false;
                if (e4[t3 - 1]) {
                  const n4 = e4[t3 - 1];
                  if (n4.tags.has("Date") || o3.has(n4.normal)) return false;
                  if (n4.tags.has("Adjective") || r3.tags.has("Adjective")) return false;
                }
                const a3 = r3.normal;
                return 1 !== a3.length && 2 !== a3.length && 4 !== a3.length || !n3.test(a3);
              }(e3, a2 + 1) && (n2.push(e3.slice(r2, a2 + 1)), r2 = a2 + 1);
            }), r2 < e3.length && n2.push(e3.slice(r2, e3.length));
          }), n2;
        }, expandLexicon: function(e2, t2) {
          const { methods: n2, model: r2 } = t2, o2 = {}, a2 = {};
          return Object.keys(e2).forEach((t3) => {
            const i2 = e2[t3], s2 = (t3 = (t3 = t3.toLowerCase().trim()).replace(/'s\b/, "")).split(/ /);
            s2.length > 1 && (void 0 === a2[s2[0]] || s2.length > a2[s2[0]]) && (a2[s2[0]] = s2.length), true === Ui.hasOwnProperty(i2) && Ui[i2](t3, o2, n2, r2), o2[t3] = o2[t3] || i2;
          }), delete o2[""], delete o2.null, delete o2[" "], { lex: o2, _multi: a2 };
        }, transform: qi, looksPlural: Zi } };
        const Yi = { one: { lexicon: {} }, two: { models: Pi } }, es = { "Actor|Verb": "Actor", "Adj|Gerund": "Adjective", "Adj|Noun": "Adjective", "Adj|Past": "Adjective", "Adj|Present": "Adjective", "Noun|Verb": "Singular", "Noun|Gerund": "Gerund", "Person|Noun": "Noun", "Person|Date": "Month", "Person|Verb": "FirstName", "Person|Place": "Person", "Person|Adj": "Comparative", "Plural|Verb": "Plural", "Unit|Noun": "Noun" }, ts = function(e2, t2) {
          const n2 = { model: t2, methods: Xi }, { lex: r2, _multi: o2 } = Xi.two.expandLexicon(e2, n2);
          return Object.assign(t2.one.lexicon, r2), Object.assign(t2.one._multiCache, o2), t2;
        }, ns = function(e2, t2, n2) {
          const r2 = Ei(e2, Yi);
          t2[r2.PastTense] = t2[r2.PastTense] || "PastTense", t2[r2.Gerund] = t2[r2.Gerund] || "Gerund", true === n2 && (t2[r2.PresentTense] = t2[r2.PresentTense] || "PresentTense");
        }, rs = function(e2, t2, n2) {
          const r2 = Oi(e2, n2);
          t2[r2] = t2[r2] || "Superlative";
          const o2 = Fi(e2, n2);
          t2[o2] = t2[o2] || "Comparative";
        }, os = function(e2, t2) {
          const n2 = {}, r2 = t2.one.lexicon;
          return Object.keys(e2).forEach((o2) => {
            const a2 = e2[o2];
            if (n2[o2] = es[a2], "Noun|Verb" !== a2 && "Person|Verb" !== a2 && "Actor|Verb" !== a2 || ns(o2, r2, false), "Adj|Present" === a2 && (ns(o2, r2, true), rs(o2, r2, t2)), "Person|Adj" === a2 && rs(o2, r2, t2), "Adj|Gerund" === a2 || "Noun|Gerund" === a2) {
              const e3 = Hi(o2, Yi, "Gerund");
              r2[e3] || (n2[e3] = "Infinitive");
            }
            if ("Noun|Gerund" !== a2 && "Adj|Noun" !== a2 && "Person|Noun" !== a2 || function(e3, t3, n3) {
              const r3 = Ho(e3, n3);
              t3[r3] = t3[r3] || "Plural";
            }(o2, r2, t2), "Adj|Past" === a2) {
              const e3 = Hi(o2, Yi, "PastTense");
              r2[e3] || (n2[e3] = "Infinitive");
            }
          }), t2 = ts(n2, t2);
        };
        let as = { one: { _multiCache: {}, lexicon: Go, frozenLex: { "20th century fox": "Organization", "7 eleven": "Organization", "motel 6": "Organization", "excuse me": "Expression", "financial times": "Organization", "guns n roses": "Organization", "la z boy": "Organization", "labour party": "Organization", "new kids on the block": "Organization", "new york times": "Organization", "the guess who": "Organization", "thin lizzy": "Organization", "prime minister": "Actor", "free market": "Singular", "lay up": "Singular", "living room": "Singular", "living rooms": "Plural", "spin off": "Singular", "appeal court": "Uncountable", "cold war": "Uncountable", "gene pool": "Uncountable", "machine learning": "Uncountable", "nail polish": "Uncountable", "time off": "Uncountable", "take part": "Infinitive", "bill gates": "Person", "doctor who": "Person", "dr who": "Person", "he man": "Person", "iron man": "Person", "kid cudi": "Person", "run dmc": "Person", "rush limbaugh": "Person", "snow white": "Person", "tiger woods": "Person", "brand new": "Adjective", "en route": "Adjective", "left wing": "Adjective", "off guard": "Adjective", "on board": "Adjective", "part time": "Adjective", "right wing": "Adjective", "so called": "Adjective", "spot on": "Adjective", "straight forward": "Adjective", "super duper": "Adjective", "tip top": "Adjective", "top notch": "Adjective", "up to date": "Adjective", "win win": "Adjective", "brooklyn nets": "SportsTeam", "chicago bears": "SportsTeam", "houston astros": "SportsTeam", "houston dynamo": "SportsTeam", "houston rockets": "SportsTeam", "houston texans": "SportsTeam", "minnesota twins": "SportsTeam", "orlando magic": "SportsTeam", "san antonio spurs": "SportsTeam", "san diego chargers": "SportsTeam", "san diego padres": "SportsTeam", "iron maiden": "ProperNoun", "isle of man": "Country", "united states": "Country", "united states of america": "Country", "prince edward island": "Region", "cedar breaks": "Place", "cedar falls": "Place", "point blank": "Adverb", "tiny bit": "Adverb", "by the time": "Conjunction", "no matter": "Conjunction", "civil wars": "Plural", "credit cards": "Plural", "default rates": "Plural", "free markets": "Plural", "head starts": "Plural", "home runs": "Plural", "lay ups": "Plural", "phone calls": "Plural", "press releases": "Plural", "record labels": "Plural", "soft serves": "Plural", "student loans": "Plural", "tax returns": "Plural", "tv shows": "Plural", "video games": "Plural", "took part": "PastTense", "takes part": "PresentTense", "taking part": "Gerund", "taken part": "Participle", "light bulb": "Noun", "rush hour": "Noun", "fluid ounce": "Unit", "the rolling stones": "Organization" } }, two: { irregularPlurals: wo, models: Pi, suffixPatterns: Oa, prefixPatterns: Ba, endsWith: _a, neighbours: Ya, regexNormal: [[/^[\w.+]+@[\w.]+\.[a-z]{2,3}$/, "Email"], [/^(https?:\/\/|www\.)+\w+\.[a-z]{2,3}/, "Url", "http.."], [/^[a-z0-9./].+\.(com|net|gov|org|ly|edu|info|biz|dev|ru|jp|de|in|uk|br|io|ai)/, "Url", ".com"], [/^[PMCE]ST$/, "Timezone", "EST"], [/^ma?c'[a-z]{3}/, "LastName", "mc'neil"], [/^o'[a-z]{3}/, "LastName", "o'connor"], [/^ma?cd[aeiou][a-z]{3}/, "LastName", "mcdonald"], [/^(lol)+[sz]$/, "Expression", "lol"], [/^wo{2,}a*h?$/, "Expression", "wooah"], [/^(hee?){2,}h?$/, "Expression", "hehe"], [/^(un|de|re)\\-[a-z\u00C0-\u00FF]{2}/, "Verb", "un-vite"], [/^(m|k|cm|km)\/(s|h|hr)$/, "Unit", "5 k/m"], [/^(ug|ng|mg)\/(l|m3|ft3)$/, "Unit", "ug/L"], [/[^:/]\/\p{Letter}/u, "SlashedTerm", "love/hate"]], regexText: [[/^#[\p{Number}_]*\p{Letter}/u, "HashTag"], [/^@\w{2,}$/, "AtMention"], [/^([A-Z]\.){2}[A-Z]?/i, ["Acronym", "Noun"], "F.B.I"], [/.{3}[lkmnp]in['‘’‛‵′`´]$/, "Gerund", "chillin'"], [/.{4}s['‘’‛‵′`´]$/, "Possessive", "flanders'"], [/^[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u, "Emoji", "emoji-class"]], regexNumbers: [[/^@1?[0-9](am|pm)$/i, "Time", "3pm"], [/^@1?[0-9]:[0-9]{2}(am|pm)?$/i, "Time", "3:30pm"], [/^'[0-9]{2}$/, "Year"], [/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])$/, "Time", "3:12:31"], [/^[012]?[0-9](:[0-5][0-9])?(:[0-5][0-9])? ?(am|pm)$/i, "Time", "1:12pm"], [/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])? ?(am|pm)?$/i, "Time", "1:12:31pm"], [/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/i, "Date", "iso-date"], [/^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,4}$/, "Date", "iso-dash"], [/^[0-9]{1,4}\/[0-9]{1,2}\/([0-9]{4}|[0-9]{2})$/, "Date", "iso-slash"], [/^[0-9]{1,4}\.[0-9]{1,2}\.[0-9]{1,4}$/, "Date", "iso-dot"], [/^[0-9]{1,4}-[a-z]{2,9}-[0-9]{1,4}$/i, "Date", "12-dec-2019"], [/^utc ?[+-]?[0-9]+$/, "Timezone", "utc-9"], [/^(gmt|utc)[+-][0-9]{1,2}$/i, "Timezone", "gmt-3"], [/^[0-9]{3}-[0-9]{4}$/, "PhoneNumber", "421-0029"], [/^(\+?[0-9][ -])?[0-9]{3}[ -]?[0-9]{3}-[0-9]{4}$/, "PhoneNumber", "1-800-"], [/^[-+]?\p{Currency_Symbol}[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?([kmb]|bn)?\+?$/u, ["Money", "Value"], "$5.30"], [/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?\p{Currency_Symbol}\+?$/u, ["Money", "Value"], "5.30\xA3"], [/^[-+]?[$£]?[0-9]([0-9,.])+(usd|eur|jpy|gbp|cad|aud|chf|cny|hkd|nzd|kr|rub)$/i, ["Money", "Value"], "$400usd"], [/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?\+?$/, ["Cardinal", "NumericValue"], "5,999"], [/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?(st|nd|rd|r?th)$/, ["Ordinal", "NumericValue"], "53rd"], [/^\.[0-9]+\+?$/, ["Cardinal", "NumericValue"], ".73th"], [/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?%\+?$/, ["Percent", "Cardinal", "NumericValue"], "-4%"], [/^\.[0-9]+%$/, ["Percent", "Cardinal", "NumericValue"], ".3%"], [/^[0-9]{1,4}\/[0-9]{1,4}(st|nd|rd|th)?s?$/, ["Fraction", "NumericValue"], "2/3rds"], [/^[0-9.]{1,3}[a-z]{0,2}[-–—][0-9]{1,3}[a-z]{0,2}$/, ["Value", "NumberRange"], "3-4"], [/^[0-9]{1,2}(:[0-9][0-9])?(am|pm)? ?[-–—] ?[0-9]{1,2}(:[0-9][0-9])?(am|pm)$/, ["Time", "NumberRange"], "3-4pm"], [/^[0-9.]+([a-z°]{1,4})$/, "NumericValue", "9km"]], switches: Oo, clues: va, uncountable: {}, orgWords: Ai, placeWords: Ni } };
        as = function(e2) {
          return e2 = function(e3, t2) {
            return Object.keys(e3).forEach((n2) => {
              "Uncountable" === e3[n2] && (t2.two.uncountable[n2] = true, e3[n2] = "Uncountable");
            }), t2;
          }((e2 = ts(e2.one.lexicon, e2)).one.lexicon, e2), e2 = function(e3) {
            const { irregularPlurals: t2 } = e3.two, { lexicon: n2 } = e3.one;
            return Object.entries(t2).forEach((e4) => {
              n2[e4[0]] = n2[e4[0]] || "Singular", n2[e4[1]] = n2[e4[1]] || "Plural";
            }), e3;
          }(e2 = os(e2.two.switches, e2)), e2;
        }(as);
        const is = function(e2, t2, n2, r2) {
          const o2 = r2.methods.one.setTag;
          "-" === e2[t2].post && e2[t2 + 1] && o2([e2[t2], e2[t2 + 1]], "Hyphenated", r2, null, "1-punct-hyphen''");
        }, ss = /^(under|over|mis|re|un|dis|semi)-?/, ls = function(e2, t2, n2) {
          const r2 = n2.two.switches, o2 = e2[t2];
          if (r2.hasOwnProperty(o2.normal)) o2.switch = r2[o2.normal];
          else if (ss.test(o2.normal)) {
            const e3 = o2.normal.replace(ss, "");
            e3.length > 3 && r2.hasOwnProperty(e3) && (o2.switch = r2[e3]);
          }
        }, us = function(e2, t2, n2) {
          if (!t2 || 0 === t2.length) return;
          if (true === e2.frozen) return;
          const r2 = "undefined" != typeof process && process.env ? process.env : self.env || {};
          r2 && r2.DEBUG_TAGS && ((e3, t3, n3 = "") => {
            const r3 = e3.text || "[" + e3.implicit + "]";
            var o2;
            "string" != typeof t3 && t3.length > 2 && (t3 = t3.slice(0, 2).join(", #") + " +"), t3 = "string" != typeof t3 ? t3.join(", #") : t3, console.log(` ${(o2 = r3, "\x1B[33m\x1B[3m" + o2 + "\x1B[0m").padEnd(24)} \x1B[32m\u2192\x1B[0m #${t3.padEnd(22)}  ${((e4) => "\x1B[3m" + e4 + "\x1B[0m")(n3)}`);
          })(e2, t2, n2), e2.tags = e2.tags || /* @__PURE__ */ new Set(), "string" == typeof t2 ? e2.tags.add(t2) : t2.forEach((t3) => e2.tags.add(t3));
        }, cs = ["Acronym", "Abbreviation", "ProperNoun", "Uncountable", "Possessive", "Pronoun", "Activity", "Honorific", "Month"], hs = function(e2, t2, n2) {
          const r2 = e2[t2], o2 = Array.from(r2.tags);
          for (let e3 = 0; e3 < o2.length; e3 += 1) if (n2.one.tagSet[o2[e3]]) {
            const t3 = n2.one.tagSet[o2[e3]].parents;
            us(r2, t3, ` -inferred by #${o2[e3]}`);
          }
          !function(e3) {
            !e3.tags.has("Noun") || e3.tags.has("Plural") || e3.tags.has("Singular") || cs.find((t3) => e3.tags.has(t3)) || (Zi(e3.normal) ? us(e3, "Plural", "3-plural-guess") : us(e3, "Singular", "3-singular-guess"));
          }(r2), function(e3) {
            const t3 = e3.tags;
            if (t3.has("Verb") && 1 === t3.size) {
              const t4 = Ti(e3.normal);
              t4 && us(e3, t4, "3-verb-tense-guess");
            }
          }(r2);
        }, ds = /^\p{Lu}[\p{Ll}'’]/u, gs = /[0-9]/, ms = ["Date", "Month", "WeekDay", "Unit", "Expression"], ps = /[IVX]/, fs = /^[IVXLCDM]{2,}$/, bs = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/, vs = { li: true, dc: true, md: true, dm: true, ml: true }, ys = function(e2, t2, n2) {
          const r2 = e2[t2];
          r2.index = r2.index || [0, 0];
          const o2 = r2.index[1], a2 = r2.text || "";
          return 0 !== o2 && true === ds.test(a2) && false === gs.test(a2) ? ms.find((e3) => r2.tags.has(e3)) || r2.pre.match(/["']$/) || "the" === r2.normal ? null : (hs(e2, t2, n2), r2.tags.has("Noun") || r2.frozen || r2.tags.clear(), us(r2, "ProperNoun", "2-titlecase"), true) : a2.length >= 2 && fs.test(a2) && ps.test(a2) && bs.test(a2) && !vs[r2.normal] ? (us(r2, "RomanNumeral", "2-xvii"), true) : null;
        }, ws = function(e2 = "", t2 = []) {
          const n2 = e2.length;
          let r2 = 7;
          n2 <= r2 && (r2 = n2 - 1);
          for (let o2 = r2; o2 > 1; o2 -= 1) {
            const r3 = e2.substring(n2 - o2, n2);
            if (true === t2[r3.length].hasOwnProperty(r3)) {
              return t2[r3.length][r3];
            }
          }
          return null;
        }, ks = function(e2, t2, n2) {
          const r2 = e2[t2];
          if (0 === r2.tags.size) {
            let e3 = ws(r2.normal, n2.two.suffixPatterns);
            if (null !== e3) return us(r2, e3, "2-suffix"), r2.confidence = 0.7, true;
            if (r2.implicit && (e3 = ws(r2.implicit, n2.two.suffixPatterns), null !== e3)) return us(r2, e3, "2-implicit-suffix"), r2.confidence = 0.7, true;
          }
          return null;
        }, Ps = /['‘’‛‵′`´]/, As = function(e2, t2) {
          for (let n2 = 0; n2 < t2.length; n2 += 1) if (true === t2[n2][0].test(e2)) return t2[n2];
          return null;
        }, Ns = function(e2, t2, n2, r2) {
          const o2 = r2.methods.one.setTag, { regexText: a2, regexNormal: i2, regexNumbers: s2, endsWith: l2 } = n2.two, u2 = e2[t2], c2 = u2.machine || u2.normal;
          let h2 = u2.text;
          Ps.test(u2.post) && !Ps.test(u2.pre) && (h2 += u2.post.trim());
          let d2 = As(h2, a2) || As(c2, i2);
          return !d2 && /[0-9]/.test(c2) && (d2 = As(c2, s2)), d2 || 0 !== u2.tags.size || (d2 = function(e3 = "", t3) {
            const n3 = e3[e3.length - 1];
            if (true === t3.hasOwnProperty(n3)) {
              const r3 = t3[n3] || [];
              for (let t4 = 0; t4 < r3.length; t4 += 1) if (true === r3[t4][0].test(e3)) return r3[t4];
            }
            return null;
          }(c2, l2)), d2 ? (o2([u2], d2[1], r2, null, `2-regex-'${d2[2] || d2[0]}'`), u2.confidence = 0.6, true) : null;
        }, Cs = function(e2, t2, n2) {
          const r2 = e2[t2];
          if (0 === r2.tags.size) {
            const e3 = function(e4 = "", t3 = []) {
              const n3 = e4.length;
              let r3 = 7;
              r3 > n3 - 3 && (r3 = n3 - 3);
              for (let n4 = r3; n4 > 2; n4 -= 1) {
                const r4 = e4.substring(0, n4);
                if (true === t3[r4.length].hasOwnProperty(r4)) return t3[r4.length][r4];
              }
              return null;
            }(r2.normal, n2.two.prefixPatterns);
            if (null !== e3) return us(r2, e3, "2-prefix"), r2.confidence = 0.5, true;
          }
          return null;
        }, js = /* @__PURE__ */ new Set(["in", "on", "by", "until", "for", "to", "during", "throughout", "through", "within", "before", "after", "of", "this", "next", "last", "circa", "around", "post", "pre", "budget", "classic", "plan", "may"]), xs = function(e2) {
          if (!e2) return false;
          const t2 = e2.normal || e2.implicit;
          return !!js.has(t2) || (!!(e2.tags.has("Date") || e2.tags.has("Month") || e2.tags.has("WeekDay") || e2.tags.has("Year")) || !!e2.tags.has("ProperNoun"));
        }, Is = function(e2) {
          return !!e2 && (!!e2.tags.has("Ordinal") || (!!(e2.tags.has("Cardinal") && e2.normal.length < 3) || ("is" === e2.normal || "was" === e2.normal)));
        }, Ts = function(e2) {
          return e2 && (e2.tags.has("Date") || e2.tags.has("Month") || e2.tags.has("WeekDay") || e2.tags.has("Year"));
        }, Ds = function(e2, t2) {
          const n2 = e2[t2];
          if (n2.tags.has("NumericValue") && n2.tags.has("Cardinal") && 4 === n2.normal.length) {
            const r2 = Number(n2.normal);
            if (r2 && !isNaN(r2) && r2 > 1400 && r2 < 2100) {
              const o2 = e2[t2 - 1], a2 = e2[t2 + 1];
              if (xs(o2) || xs(a2)) return us(n2, "Year", "2-tagYear");
              if (r2 >= 1920 && r2 < 2025) {
                if (Is(o2) || Is(a2)) return us(n2, "Year", "2-tagYear-close");
                if (Ts(e2[t2 - 2]) || Ts(e2[t2 + 2])) return us(n2, "Year", "2-tagYear-far");
                if (o2 && (o2.tags.has("Determiner") || o2.tags.has("Possessive")) && a2 && a2.tags.has("Noun") && !a2.tags.has("Plural")) return us(n2, "Year", "2-tagYear-noun");
              }
            }
          }
          return null;
        }, Hs = function(e2, t2, n2, r2) {
          const o2 = r2.methods.one.setTag, a2 = e2[t2], i2 = ["PastTense", "PresentTense", "Auxiliary", "Modal", "Particle"];
          if (a2.tags.has("Verb")) {
            i2.find((e3) => a2.tags.has(e3)) || o2([a2], "Infinitive", r2, null, "2-verb-type''");
          }
        }, Es = /^[A-Z]('s|,)?$/, Gs = /^[A-Z-]+$/, Os = /^[A-Z]+s$/, Fs = /([A-Z]\.)+[A-Z]?,?$/, Vs = /[A-Z]{2,}('s|,)?$/, zs = /([a-z]\.)+[a-z]\.?$/, Bs = { I: true, A: true }, Ss = { la: true, ny: true, us: true, dc: true, gb: true, uk: true }, $s = function(e2, t2, n2) {
          const r2 = e2[t2];
          return r2.tags.has("RomanNumeral") || r2.tags.has("Acronym") || r2.frozen ? null : function(e3, t3) {
            let n3 = e3.text;
            if (false === Gs.test(n3)) {
              if (!(n3.length > 3 && true === Os.test(n3))) return false;
              n3 = n3.replace(/s$/, "");
            } else if (true === Ss.hasOwnProperty(e3.normal)) return true;
            return !(n3.length > 5 || Bs.hasOwnProperty(n3) || t3.one.lexicon.hasOwnProperty(e3.normal) || true !== Fs.test(n3) && true !== zs.test(n3) && true !== Es.test(n3) && true !== Vs.test(n3));
          }(r2, n2) ? (r2.tags.clear(), us(r2, ["Acronym", "Noun"], "3-no-period-acronym"), true === Ss[r2.normal] && us(r2, "Place", "3-place-acronym"), true === Os.test(r2.text) && us(r2, "Plural", "3-plural-acronym"), true) : !Bs.hasOwnProperty(r2.text) && Es.test(r2.text) ? (r2.tags.clear(), us(r2, ["Acronym", "Noun"], "3-one-letter-acronym"), true) : r2.tags.has("Organization") && r2.text.length <= 3 ? (us(r2, "Acronym", "3-org-acronym"), true) : r2.tags.has("Organization") && Gs.test(r2.text) && r2.text.length <= 6 ? (us(r2, "Acronym", "3-titlecase-acronym"), true) : null;
        }, Ms = function(e2, t2) {
          if (!e2) return null;
          const n2 = t2.find((t3) => e2.normal === t3[0]);
          return n2 ? n2[1] : null;
        }, Ks = function(e2, t2) {
          if (!e2) return null;
          const n2 = t2.find((t3) => e2.tags.has(t3[0]));
          return n2 ? n2[1] : null;
        }, Ls = function(e2, t2, n2) {
          const { leftTags: r2, leftWords: o2, rightWords: a2, rightTags: i2 } = n2.two.neighbours, s2 = e2[t2];
          if (0 === s2.tags.size) {
            let l2 = null;
            if (l2 = l2 || Ms(e2[t2 - 1], o2), l2 = l2 || Ms(e2[t2 + 1], a2), l2 = l2 || Ks(e2[t2 - 1], r2), l2 = l2 || Ks(e2[t2 + 1], i2), l2) return us(s2, l2, "3-[neighbour]"), hs(e2, t2, n2), e2[t2].confidence = 0.2, true;
          }
          return null;
        }, Js = function(e2, t2, n2) {
          return !!e2 && (!e2.tags.has("FirstName") && !e2.tags.has("Place") && (!!(e2.tags.has("ProperNoun") || e2.tags.has("Organization") || e2.tags.has("Acronym")) || !(n2 || (r2 = e2.text, !/^\p{Lu}[\p{Ll}'’]/u.test(r2))) && (0 !== t2 || e2.tags.has("Singular"))));
          var r2;
        }, Ws = function(e2, t2, n2, r2) {
          const o2 = n2.model.two.orgWords, a2 = n2.methods.one.setTag, i2 = e2[t2];
          if (true === o2[i2.machine || i2.normal] && Js(e2[t2 - 1], t2 - 1, r2)) {
            a2([e2[t2]], "Organization", n2, null, "3-[org-word]");
            for (let o3 = t2; o3 >= 0 && Js(e2[o3], o3, r2); o3 -= 1) a2([e2[o3]], "Organization", n2, null, "3-[org-word]");
          }
          return null;
        }, qs = /'s$/, Us = /* @__PURE__ */ new Set(["athletic", "city", "community", "eastern", "federal", "financial", "great", "historic", "historical", "local", "memorial", "municipal", "national", "northern", "provincial", "southern", "state", "western", "spring", "pine", "sunset", "view", "oak", "maple", "spruce", "cedar", "willow"]), Rs = /* @__PURE__ */ new Set(["center", "centre", "way", "range", "bar", "bridge", "field", "pit"]), Qs = function(e2, t2, n2) {
          if (!e2) return false;
          const r2 = e2.tags;
          return !(r2.has("Organization") || r2.has("Possessive") || qs.test(e2.normal)) && (!(!r2.has("ProperNoun") && !r2.has("Place")) || !(n2 || (o2 = e2.text, !/^\p{Lu}[\p{Ll}'’]/u.test(o2))) && (0 !== t2 || r2.has("Singular")));
          var o2;
        }, _s = function(e2, t2, n2, r2) {
          const o2 = n2.model.two.placeWords, a2 = n2.methods.one.setTag, i2 = e2[t2], s2 = i2.machine || i2.normal;
          if (true === o2[s2]) {
            for (let o3 = t2 - 1; o3 >= 0; o3 -= 1) if (!Us.has(e2[o3].normal)) {
              if (!Qs(e2[o3], o3, r2)) break;
              a2(e2.slice(o3, t2 + 1), "Place", n2, null, "3-[place-of-foo]");
            }
            if (Rs.has(s2)) return false;
            for (let o3 = t2 + 1; o3 < e2.length; o3 += 1) {
              if (Qs(e2[o3], o3, r2)) return a2(e2.slice(t2, o3 + 1), "Place", n2, null, "3-[foo-place]"), true;
              if ("of" !== e2[o3].normal && !Us.has(e2[o3].normal)) break;
            }
          }
          return null;
        }, Zs = function(e2, t2, n2) {
          let r2 = false;
          const o2 = e2[t2].tags;
          (0 === o2.size || 1 === o2.size && (o2.has("Hyphenated") || o2.has("HashTag") || o2.has("Prefix") || o2.has("SlashedTerm"))) && (r2 = true), r2 && (us(e2[t2], "Noun", "3-[fallback]"), hs(e2, t2, n2), e2[t2].confidence = 0.1);
        }, Xs = /^[A-Z][a-z]/, Ys = (e2, t2) => e2[t2].tags.has("ProperNoun") && Xs.test(e2[t2].text) ? "Noun" : null, el = (e2, t2, n2) => 0 !== t2 || e2[1] ? null : n2, tl = { "Adj|Gerund": (e2, t2) => Ys(e2, t2), "Adj|Noun": (e2, t2) => Ys(e2, t2) || function(e3, t3) {
          return !e3[t3 + 1] && e3[t3 - 1] && e3[t3 - 1].tags.has("Determiner") ? "Noun" : null;
        }(e2, t2), "Actor|Verb": (e2, t2) => Ys(e2, t2), "Adj|Past": (e2, t2) => Ys(e2, t2), "Adj|Present": (e2, t2) => Ys(e2, t2), "Noun|Gerund": (e2, t2) => Ys(e2, t2), "Noun|Verb": (e2, t2) => t2 > 0 && Ys(e2, t2) || el(e2, t2, "Infinitive"), "Plural|Verb": (e2, t2) => Ys(e2, t2) || el(e2, t2, "PresentTense") || function(e3, t3, n2) {
          return 0 === t3 && e3.length > 3 ? n2 : null;
        }(e2, t2, "Plural"), "Person|Noun": (e2, t2) => Ys(e2, t2), "Person|Verb": (e2, t2) => 0 !== t2 ? Ys(e2, t2) : null, "Person|Adj": (e2, t2) => 0 === t2 && e2.length > 1 || Ys(e2, t2) ? "Person" : null }, nl = "undefined" != typeof process && process.env ? process.env : self.env || {}, rl = /^(under|over|mis|re|un|dis|semi)-?/, ol = (e2, t2) => {
          if (!e2 || !t2) return null;
          const n2 = e2.normal || e2.implicit;
          let r2 = null;
          return t2.hasOwnProperty(n2) && (r2 = t2[n2]), r2 && nl.DEBUG_TAGS && console.log(`
    \x1B[2m\x1B[3m     \u2193 - '${n2}' \x1B[0m`), r2;
        }, al = (e2, t2 = {}, n2) => {
          if (!e2 || !t2) return null;
          const r2 = Array.from(e2.tags).sort((e3, t3) => (n2[e3] ? n2[e3].parents.length : 0) > (n2[t3] ? n2[t3].parents.length : 0) ? -1 : 1);
          let o2 = r2.find((e3) => t2[e3]);
          return o2 && nl.DEBUG_TAGS && console.log(`  \x1B[2m\x1B[3m      \u2193 - '${e2.normal || e2.implicit}' (#${o2})  \x1B[0m`), o2 = t2[o2], o2;
        }, il = function(e2, t2, n2) {
          const r2 = n2.model, o2 = n2.methods.one.setTag, { switches: a2, clues: i2 } = r2.two, s2 = e2[t2];
          let l2 = s2.normal || s2.implicit || "";
          if (rl.test(l2) && !a2[l2] && (l2 = l2.replace(rl, "")), s2.switch) {
            const a3 = s2.switch;
            if (s2.tags.has("Acronym") || s2.tags.has("PhrasalVerb")) return;
            let u2 = function(e3, t3, n3, r3) {
              if (!n3) return null;
              const o3 = "also" !== e3[t3 - 1]?.text ? t3 - 1 : Math.max(0, t3 - 2), a4 = r3.one.tagSet;
              let i3 = ol(e3[t3 + 1], n3.afterWords);
              return i3 = i3 || ol(e3[o3], n3.beforeWords), i3 = i3 || al(e3[o3], n3.beforeTags, a4), i3 = i3 || al(e3[t3 + 1], n3.afterTags, a4), i3;
            }(e2, t2, i2[a3], r2);
            tl[a3] && (u2 = tl[a3](e2, t2) || u2), u2 ? (o2([s2], u2, n2, null, `3-[switch] (${a3})`), hs(e2, t2, r2)) : nl.DEBUG_TAGS && console.log(`
   -> X  - '${l2}'  : (${a3})  `);
          }
        }, sl = { there: true, this: true, it: true, him: true, her: true, us: true }, ll = function(e2) {
          if (e2.filter((e3) => !e3.tags.has("ProperNoun")).length <= 3) return false;
          const t2 = /^[a-z]/;
          return e2.every((e3) => !t2.test(e3.text));
        }, ul = function(e2, t2, n2, r2) {
          for (let o2 = 0; o2 < e2.length; o2 += 1) true !== e2[o2].frozen && (ls(e2, o2, t2), false === r2 && ys(e2, o2, t2), ks(e2, o2, t2), Ns(e2, o2, t2, n2), Cs(e2, o2, t2), Ds(e2, o2));
        }, cl = function(e2, t2, n2, r2) {
          for (let n3 = 0; n3 < e2.length; n3 += 1) {
            let r3 = $s(e2, n3, t2);
            hs(e2, n3, t2), r3 = r3 || Ls(e2, n3, t2), r3 = r3 || Zs(e2, n3, t2);
          }
          for (let t3 = 0; t3 < e2.length; t3 += 1) true !== e2[t3].frozen && (Ws(e2, t3, n2, r2), _s(e2, t3, n2, r2), il(e2, t3, n2), Hs(e2, t3, 0, n2), is(e2, t3, 0, n2));
          !function(e3, t3) {
            const n3 = t3.methods.one.setTag, r3 = t3.model.one._multiCache || {}, o2 = e3[0];
            if (("Noun|Verb" === o2.switch || o2.tags.has("Infinitive")) && e3.length >= 2) {
              if (e3.length < 4 && !sl[e3[1].normal]) return;
              if (!o2.tags.has("PhrasalVerb") && r3.hasOwnProperty(o2.normal)) return;
              (e3[1].tags.has("Noun") || e3[1].tags.has("Determiner")) && (e3.slice(1, 3).some((e4) => e4.tags.has("Verb")) && !o2.tags.has("#PhrasalVerb") || n3([o2], "Imperative", t3, null, "3-[imperative]"));
            }
          }(e2, n2);
        }, hl = { Possessive: (e2) => {
          let t2 = e2.machine || e2.normal || e2.text;
          return t2 = t2.replace(/'s$/, ""), t2;
        }, Plural: (e2, t2) => {
          const n2 = e2.machine || e2.normal || e2.text;
          return t2.methods.two.transform.noun.toSingular(n2, t2.model);
        }, Copula: () => "is", PastTense: (e2, t2) => {
          const n2 = e2.machine || e2.normal || e2.text;
          return t2.methods.two.transform.verb.toInfinitive(n2, t2.model, "PastTense");
        }, Gerund: (e2, t2) => {
          const n2 = e2.machine || e2.normal || e2.text;
          return t2.methods.two.transform.verb.toInfinitive(n2, t2.model, "Gerund");
        }, PresentTense: (e2, t2) => {
          const n2 = e2.machine || e2.normal || e2.text;
          return e2.tags.has("Infinitive") ? n2 : t2.methods.two.transform.verb.toInfinitive(n2, t2.model, "PresentTense");
        }, Comparative: (e2, t2) => {
          const n2 = e2.machine || e2.normal || e2.text;
          return t2.methods.two.transform.adjective.fromComparative(n2, t2.model);
        }, Superlative: (e2, t2) => {
          const n2 = e2.machine || e2.normal || e2.text;
          return t2.methods.two.transform.adjective.fromSuperlative(n2, t2.model);
        }, Adverb: (e2, t2) => {
          const { fromAdverb: n2 } = t2.methods.two.transform.adjective;
          return n2(e2.machine || e2.normal || e2.text);
        } }, dl = { Adverb: "RB", Comparative: "JJR", Superlative: "JJS", Adjective: "JJ", TO: "Conjunction", Modal: "MD", Auxiliary: "MD", Gerund: "VBG", PastTense: "VBD", Participle: "VBN", PresentTense: "VBZ", Infinitive: "VB", Particle: "RP", Verb: "VB", Pronoun: "PRP", Cardinal: "CD", Conjunction: "CC", Determiner: "DT", Preposition: "IN", QuestionWord: "WP", Expression: "UH", Possessive: "POS", ProperNoun: "NNP", Person: "NNP", Place: "NNP", Organization: "NNP", Singular: "NN", Plural: "NNS", Noun: "NN", There: "EX" };
        var gl = { preTagger: function(e2) {
          const { methods: t2, model: n2, world: r2 } = e2, o2 = e2.docs;
          !function(e3, t3, n3) {
            e3.forEach((e4) => {
              !function(e5, t4, n4, r3) {
                const o3 = r3.methods.one.setTag;
                if (e5.length >= 3) {
                  const t5 = /:/;
                  if (e5[0].post.match(t5)) {
                    const t6 = e5[1];
                    if (t6.tags.has("Value") || t6.tags.has("Email") || t6.tags.has("PhoneNumber")) return;
                    o3([e5[0]], "Expression", r3, null, "2-punct-colon''");
                  }
                }
              }(e4, 0, 0, n3);
            });
          }(o2, 0, r2);
          const a2 = t2.two.quickSplit(o2);
          for (let e3 = 0; e3 < a2.length; e3 += 1) {
            const t3 = a2[e3], o3 = ll(t3);
            ul(t3, n2, r2, o3), cl(t3, n2, r2, o3);
          }
          return a2;
        }, root: function(e2) {
          const t2 = e2.world, n2 = Object.keys(hl);
          e2.docs.forEach((e3) => {
            for (let r2 = 0; r2 < e3.length; r2 += 1) {
              const o2 = e3[r2];
              for (let e4 = 0; e4 < n2.length; e4 += 1) if (o2.tags.has(n2[e4])) {
                const r3 = (0, hl[n2[e4]])(o2, t2);
                o2.normal !== r3 && (o2.root = r3);
                break;
              }
            }
          });
        }, penn: function(e2) {
          e2.compute("tagRank"), e2.docs.forEach((e3) => {
            e3.forEach((e4) => {
              e4.penn = function(e5) {
                if (e5.tags.has("ProperNoun") && e5.tags.has("Plural")) return "NNPS";
                if (e5.tags.has("Possessive") && e5.tags.has("Pronoun")) return "PRP$";
                if ("there" === e5.normal) return "EX";
                if ("to" === e5.normal) return "TO";
                const t2 = e5.tagRank || [];
                for (let e6 = 0; e6 < t2.length; e6 += 1) if (dl.hasOwnProperty(t2[e6])) return dl[t2[e6]];
                return null;
              }(e4);
            });
          });
        } };
        const ml = ["Person", "Place", "Organization"];
        var pl = { Noun: { not: ["Verb", "Adjective", "Adverb", "Value", "Determiner"] }, Singular: { is: "Noun", not: ["Plural", "Uncountable"] }, ProperNoun: { is: "Noun", alias: "Prop" }, Person: { is: "Singular", also: ["ProperNoun"], not: ["Place", "Organization", "Date"] }, FirstName: { is: "Person" }, MaleName: { is: "FirstName", not: ["FemaleName", "LastName"] }, FemaleName: { is: "FirstName", not: ["MaleName", "LastName"] }, LastName: { is: "Person", not: ["FirstName"] }, Honorific: { is: "Person", not: ["FirstName", "LastName", "Value"], alias: "Hon" }, Place: { is: "Singular", not: ["Person", "Organization"] }, Country: { is: "Place", also: ["ProperNoun"], not: ["City"] }, City: { is: "Place", also: ["ProperNoun"], not: ["Country"] }, Region: { is: "Place", also: ["ProperNoun"] }, Address: { alias: "Addr" }, Organization: { is: "ProperNoun", not: ["Person", "Place"], alias: "Org" }, SportsTeam: { is: "Organization" }, School: { is: "Organization" }, Company: { is: "Organization" }, Plural: { is: "Noun", not: ["Singular", "Uncountable"] }, Uncountable: { is: "Noun" }, Pronoun: { is: "Noun", not: ml }, Actor: { is: "Noun", not: ["Place", "Organization"] }, Activity: { is: "Noun", not: ["Person", "Place"] }, Unit: { is: "Noun", not: ml }, Demonym: { is: "Noun", also: ["ProperNoun"], not: ml }, Possessive: { is: "Noun", alias: "Poss" }, Reflexive: { is: "Pronoun" } };
        var fl = { Adjective: { not: ["Noun", "Verb", "Adverb", "Value"], alias: "Adj" }, Comparable: { is: "Adjective" }, Comparative: { is: "Adjective" }, Superlative: { is: "Adjective", not: ["Comparative"] }, NumberRange: {}, Adverb: { not: ["Noun", "Verb", "Adjective", "Value"], alias: "Adv" }, Determiner: { not: ["Noun", "Verb", "Adjective", "Adverb", "QuestionWord", "Conjunction"], alias: "Det" }, Conjunction: { not: ["Noun", "Verb", "Adjective", "Adverb", "Value", "QuestionWord"], alias: "Conj" }, Preposition: { not: ["Noun", "Verb", "Adjective", "Adverb", "QuestionWord", "Determiner"], alias: "Prep" }, QuestionWord: { not: ["Determiner"] }, Currency: { is: "Noun" }, Expression: { not: ["Noun", "Adjective", "Verb", "Adverb"], alias: "Expr" }, Abbreviation: { alias: "Abbr" }, Url: { not: ["HashTag", "PhoneNumber", "Verb", "Adjective", "Value", "AtMention", "Email", "SlashedTerm"] }, PhoneNumber: { not: ["HashTag", "Verb", "Adjective", "Value", "AtMention", "Email"] }, HashTag: {}, AtMention: { is: "Noun", not: ["HashTag", "Email"] }, Emoji: { not: ["HashTag", "Verb", "Adjective", "Value", "AtMention"] }, Emoticon: { not: ["HashTag", "Verb", "Adjective", "Value", "AtMention", "SlashedTerm"] }, SlashedTerm: { not: ["Emoticon", "Url", "Value"] }, Email: { not: ["HashTag", "Verb", "Adjective", "Value", "AtMention"] }, Acronym: { not: ["Plural", "RomanNumeral", "Pronoun", "Date"] }, Negative: { not: ["Noun", "Adjective", "Value", "Expression"] }, Condition: { not: ["Verb", "Adjective", "Noun", "Value"] }, There: { not: ["Verb", "Adjective", "Noun", "Value", "Conjunction", "Preposition"] }, Prefix: { not: ["Abbreviation", "Acronym", "ProperNoun"] }, Hyphenated: {} };
        const bl = Object.assign({}, pl, { Verb: { not: ["Noun", "Adjective", "Adverb", "Value", "Expression"], alias: "Vb" }, PresentTense: { is: "Verb", not: ["PastTense", "FutureTense"], alias: "Pres" }, Infinitive: { is: "PresentTense", not: ["Gerund"], alias: "Inf" }, Imperative: { is: "Verb", not: ["PastTense", "Gerund", "Copula"], alias: "Imp" }, Gerund: { is: "PresentTense", not: ["Copula"], alias: "Ger" }, PastTense: { is: "Verb", not: ["PresentTense", "Gerund", "FutureTense"], alias: "Past" }, FutureTense: { is: "Verb", not: ["PresentTense", "PastTense"], alias: "Fut" }, Copula: { is: "Verb" }, Modal: { is: "Verb", not: ["Infinitive"] }, Participle: { is: "PastTense" }, Auxiliary: { is: "Verb", not: ["PastTense", "PresentTense", "Gerund", "Conjunction"], alias: "Aux" }, PhrasalVerb: { is: "Verb", alias: "Phrasal" }, Particle: { is: "PhrasalVerb", not: ["PastTense", "PresentTense", "Copula", "Gerund"] }, Passive: { is: "Verb" } }, { Value: { not: ["Verb", "Adjective", "Adverb"], alias: "Val" }, Ordinal: { is: "Value", not: ["Cardinal"] }, Cardinal: { is: "Value", not: ["Ordinal"] }, Fraction: { is: "Value", not: ["Noun"] }, Multiple: { is: "TextValue" }, RomanNumeral: { is: "Cardinal", not: ["TextValue"] }, TextValue: { is: "Value", not: ["NumericValue"] }, NumericValue: { is: "Value", not: ["TextValue"], alias: "Numeric" }, Money: { is: "Cardinal" }, Percent: { is: "Value" } }, { Date: { not: ["Verb", "Adverb", "Adjective"] }, Month: { is: "Date", also: ["Noun"], not: ["Year", "WeekDay", "Time"] }, WeekDay: { is: "Date", also: ["Noun"] }, Year: { is: "Date", not: ["RomanNumeral"] }, FinancialQuarter: { is: "Date", not: "Fraction" }, Holiday: { is: "Date", also: ["Noun"] }, Season: { is: "Date" }, Timezone: { is: "Date", also: ["Noun"], not: ["ProperNoun"] }, Time: { is: "Date", not: ["AtMention"] }, Duration: { is: "Date", also: ["Noun"] } }, fl);
        var vl = { compute: gl, methods: Xi, model: as, tags: bl, hooks: ["preTagger"] };
        const yl = /[,)"';:\-–—.…]/, wl = function(e2, t2) {
          if (!e2.found) return;
          const n2 = e2.termList();
          for (let e3 = 0; e3 < n2.length - 1; e3++) {
            const t3 = n2[e3];
            if (yl.test(t3.post)) return;
          }
          n2[0].implicit = n2[0].normal, n2[0].text += t2, n2[0].normal += t2, n2.slice(1).forEach((e3) => {
            e3.implicit = e3.normal, e3.text = "", e3.normal = "";
          });
          for (let e3 = 0; e3 < n2.length - 1; e3++) n2[e3].post = n2[e3].post.replace(/ /, "");
        }, kl = function() {
          const e2 = this.not("@hasContraction");
          let t2 = e2.match("(we|they|you) are");
          return wl(t2, "'re"), t2 = e2.match("(he|she|they|it|we|you) will"), wl(t2, "'ll"), t2 = e2.match("(he|she|they|it|we) is"), wl(t2, "'s"), t2 = e2.match("#Person is"), wl(t2, "'s"), t2 = e2.match("#Person would"), wl(t2, "'d"), t2 = e2.match("(is|was|had|would|should|could|do|does|have|has|can) not"), wl(t2, "n't"), t2 = e2.match("(i|we|they) have"), wl(t2, "'ve"), t2 = e2.match("(would|should|could) have"), wl(t2, "'ve"), t2 = e2.match("i am"), wl(t2, "'m"), t2 = e2.match("going to"), this;
        }, Pl = /^\p{Lu}[\p{Ll}'’]/u, Al = function(e2, t2, n2) {
          const [r2, o2] = t2;
          n2 && 0 !== n2.length && (n2 = n2.map((e3, t3) => (e3.implicit = e3.text, e3.machine = e3.text, e3.pre = "", e3.post = "", e3.text = "", e3.normal = "", e3.index = [r2, o2 + t3], e3)), n2[0] && (n2[0].pre = e2[r2][o2].pre, n2[n2.length - 1].post = e2[r2][o2].post, n2[0].text = e2[r2][o2].text, n2[0].normal = e2[r2][o2].normal), e2[r2].splice(o2, 1, ...n2));
        }, Nl = /'/, Cl = /* @__PURE__ */ new Set(["been", "become"]), jl = /* @__PURE__ */ new Set(["what", "how", "when", "if", "too"]), xl = /* @__PURE__ */ new Set(["too", "also", "enough"]), Il = function(e2, t2) {
          const n2 = e2[t2].normal.split(Nl)[0];
          if ("let" === n2) return [n2, "us"];
          if ("there" === n2) {
            const r2 = e2[t2 + 1];
            if (r2 && r2.tags.has("Plural")) return [n2, "are"];
          }
          return "has" === ((e3, t3) => {
            for (let n3 = t3 + 1; n3 < e3.length; n3 += 1) {
              const t4 = e3[n3];
              if (Cl.has(t4.normal)) return "has";
              if (jl.has(t4.normal)) return "is";
              if (t4.tags.has("Gerund")) return "is";
              if (t4.tags.has("Determiner")) return "is";
              if (t4.tags.has("Adjective")) return "is";
              if ("Adj|Past" === t4.switch && e3[n3 + 1]) {
                if (xl.has(e3[n3 + 1].normal)) return "is";
                if (e3[n3 + 1].tags.has("Preposition")) return "is";
              }
              if (t4.tags.has("PastTense")) return e3[n3 + 1] && "for" === e3[n3 + 1].normal ? "is" : "has";
            }
            return "is";
          })(e2, t2) ? [n2, "has"] : [n2, "is"];
        }, Tl = /'/, Dl = /* @__PURE__ */ new Set(["better", "done", "before", "it", "had"]), Hl = /* @__PURE__ */ new Set(["have", "be"]), El = function(e2, t2) {
          const n2 = e2[t2].normal.split(Tl)[0];
          return "how" === n2 || "what" === n2 ? [n2, "did"] : "had" === ((e3, t3) => {
            for (let n3 = t3 + 1; n3 < e3.length; n3 += 1) {
              const t4 = e3[n3];
              if (Dl.has(t4.normal)) return "had";
              if (Hl.has(t4.normal)) return "would";
              if (t4.tags.has("PastTense") || "Adj|Past" === t4.switch) return "had";
              if (t4.tags.has("PresentTense") || t4.tags.has("Infinitive")) return "would";
              if (t4.tags.has("#Determiner")) return "had";
              if (t4.tags.has("Adjective")) return "would";
            }
            return false;
          })(e2, t2) ? [n2, "had"] : [n2, "would"];
        }, Gl = { that: true, there: true, let: true, here: true, everywhere: true }, Ol = { in: true, by: true, for: true }, Fl = /* @__PURE__ */ new Set(["too", "also", "enough", "about"]), Vl = /* @__PURE__ */ new Set(["is", "are", "did", "were", "could", "should", "must", "had", "have"]), zl = /'/, Bl = function(e2, t2, n2, r2) {
          const o2 = t2.update();
          o2.document = [e2];
          let a2 = n2 + r2;
          n2 > 0 && (n2 -= 1), e2[a2] && (a2 += 1), o2.ptrs = [[0, n2, a2]], o2.compute(["freeze", "lexicon", "preTagger", "unfreeze"]), function(e3) {
            e3.forEach((e4, t3) => {
              e4.index && (e4.index[1] = t3);
            });
          }(e2);
        }, Sl = { d: (e2, t2) => El(e2, t2), t: (e2, t2) => function(e3, t3) {
          if ("ain't" === e3[t3].normal || "aint" === e3[t3].normal) {
            if (e3[t3 + 1] && "never" === e3[t3 + 1].normal) return ["have"];
            const n2 = function(e4, t4) {
              for (let n3 = t4 - 1; n3 >= 0; n3 -= 1) if (e4[n3].tags.has("Noun") || e4[n3].tags.has("Pronoun") || e4[n3].tags.has("Plural") || e4[n3].tags.has("Singular")) return e4[n3];
              return null;
            }(e3, t3);
            if (n2) {
              if ("we" === n2.normal || "they" === n2.normal) return ["are", "not"];
              if ("i" === n2.normal) return ["am", "not"];
              if (n2.tags && n2.tags.has("Plural")) return ["are", "not"];
            }
            return ["is", "not"];
          }
          return [e3[t3].normal.replace(/n't/, ""), "not"];
        }(e2, t2), s: (e2, t2, n2) => ((e3, t3) => {
          const n3 = e3[t3];
          if (Gl.hasOwnProperty(n3.machine || n3.normal)) return false;
          if (n3.tags.has("Possessive")) return true;
          if (n3.tags.has("QuestionWord")) return false;
          if ("he's" === n3.normal || "she's" === n3.normal) return false;
          const r2 = e3[t3 + 1];
          if (!r2) return true;
          if ("it's" === n3.normal) return !!r2.tags.has("#Noun");
          if ("Noun|Gerund" == r2.switch) {
            const r3 = e3[t3 + 2];
            return r3 ? !!r3.tags.has("Copula") || ("on" === r3.normal || r3.normal, false) : !(!n3.tags.has("Actor") && !n3.tags.has("ProperNoun"));
          }
          if (r2.tags.has("Verb")) return !!r2.tags.has("Infinitive") || !r2.tags.has("Gerund") && !!r2.tags.has("PresentTense");
          if ("Adj|Noun" === r2.switch) {
            const n4 = e3[t3 + 2];
            if (!n4) return false;
            if (Vl.has(n4.normal)) return true;
            if (Fl.has(n4.normal)) return false;
          }
          if (r2.tags.has("Noun")) {
            const e4 = r2.machine || r2.normal;
            return !("here" === e4 || "there" === e4 || "everywhere" === e4 || r2.tags.has("Possessive") || r2.tags.has("ProperNoun") && !n3.tags.has("ProperNoun"));
          }
          if (e3[t3 - 1] && true === Ol[e3[t3 - 1].normal]) return true;
          if (r2.tags.has("Adjective")) {
            const n4 = e3[t3 + 2];
            if (!n4) return false;
            if (n4.tags.has("Noun") && !n4.tags.has("Pronoun")) {
              const e4 = r2.normal;
              return "above" !== e4 && "below" !== e4 && "behind" !== e4;
            }
            return "Noun|Verb" === n4.switch;
          }
          return !!r2.tags.has("Value");
        })(e2, t2) ? n2.methods.one.setTag([e2[t2]], "Possessive", n2, null, "2-contraction") : Il(e2, t2) }, $l = function(e2, t2) {
          const n2 = t2.fromText(e2.join(" "));
          return n2.compute("id"), n2.docs[0];
        };
        var Ml = { contractionTwo: (e2) => {
          const { world: t2, document: n2 } = e2;
          n2.forEach((r2, o2) => {
            for (let a2 = r2.length - 1; a2 >= 0; a2 -= 1) {
              if (r2[a2].implicit) continue;
              let i2 = null;
              true === zl.test(r2[a2].normal) && (i2 = r2[a2].normal.split(zl)[1]);
              let s2 = null;
              Sl.hasOwnProperty(i2) && (s2 = Sl[i2](r2, a2, t2)), s2 && (s2 = $l(s2, e2), Al(n2, [o2, a2], s2), Bl(n2[o2], e2, a2, s2.length));
            }
          });
        } }, Kl = { compute: Ml, api: function(e2) {
          class Contractions extends e2 {
            constructor(e3, t2, n2) {
              super(e3, t2, n2), this.viewType = "Contraction";
            }
            expand() {
              return this.docs.forEach((e3) => {
                const t2 = Pl.test(e3[0].text);
                e3.forEach((t3, n2) => {
                  t3.text = t3.implicit || "", delete t3.implicit, n2 < e3.length - 1 && "" === t3.post && (t3.post += " "), t3.dirty = true;
                }), t2 && (e3[0].text = function(e4 = "") {
                  return e4.replace(/^ *[a-z\u00C0-\u00FF]/, (e5) => e5.toUpperCase());
                }(e3[0].text));
              }), this.compute("normal"), this;
            }
          }
          e2.prototype.contractions = function() {
            const e3 = this.match("@hasContraction+");
            return new Contractions(this.document, e3.pointer);
          }, e2.prototype.contract = kl;
        }, hooks: ["contractionTwo"] };
        const Ll = "(hard|fast|late|early|high|right|deep|close|direct)";
        const Jl = "(i|we|they)";
        const Wl = [].concat([{ match: "(got|were|was|is|are|am) (#PastTense|#Participle)", tag: "Passive", reason: "got-walked" }, { match: "(was|were|is|are|am) being (#PastTense|#Participle)", tag: "Passive", reason: "was-being" }, { match: "(had|have|has) been (#PastTense|#Participle)", tag: "Passive", reason: "had-been" }, { match: "will be being? (#PastTense|#Participle)", tag: "Passive", reason: "will-be-cleaned" }, { match: "#Noun [(#PastTense|#Participle)] by (the|a) #Noun", group: 0, tag: "Passive", reason: "suffered-by" }], [{ match: "[(all|both)] #Determiner #Noun", group: 0, tag: "Noun", reason: "all-noun" }, { match: "#Copula [(just|alone)]$", group: 0, tag: "Adjective", reason: "not-adverb" }, { match: "#Singular is #Adverb? [#PastTense$]", group: 0, tag: "Adjective", reason: "is-filled" }, { match: "[#PastTense] #Singular is", group: 0, tag: "Adjective", reason: "smoked-poutine" }, { match: "[#PastTense] #Plural are", group: 0, tag: "Adjective", reason: "baked-onions" }, { match: "well [#PastTense]", group: 0, tag: "Adjective", reason: "well-made" }, { match: "#Copula [fucked up?]", group: 0, tag: "Adjective", reason: "swears-adjective" }, { match: "#Singular (seems|appears) #Adverb? [#PastTense$]", group: 0, tag: "Adjective", reason: "seems-filled" }, { match: "#Copula #Adjective? [(out|in|through)]$", group: 0, tag: "Adjective", reason: "still-out" }, { match: "^[#Adjective] (the|your) #Noun", group: 0, notIf: "(all|even)", tag: "Infinitive", reason: "shut-the" }, { match: "the [said] #Noun", group: 0, tag: "Adjective", reason: "the-said-card" }, { match: "[#Hyphenated (#Hyphenated && #PastTense)] (#Noun|#Conjunction)", group: 0, tag: "Adjective", notIf: "#Adverb", reason: "faith-based" }, { match: "[#Hyphenated (#Hyphenated && #Gerund)] (#Noun|#Conjunction)", group: 0, tag: "Adjective", notIf: "#Adverb", reason: "self-driving" }, { match: "[#PastTense (#Hyphenated && #PhrasalVerb)] (#Noun|#Conjunction)", group: 0, tag: "Adjective", reason: "dammed-up" }, { match: "(#Hyphenated && #Value) fold", tag: "Adjective", reason: "two-fold" }, { match: "must (#Hyphenated && #Infinitive)", tag: "Adjective", reason: "must-win" }, { match: "(#Hyphenated && #Infinitive) #Hyphenated", tag: "Adjective", notIf: "#PhrasalVerb", reason: "vacuum-sealed" }, { match: "too much", tag: "Adverb Adjective", reason: "bit-4" }, { match: "a bit much", tag: "Determiner Adverb Adjective", reason: "bit-3" }, { match: "[(un|contra|extra|inter|intra|macro|micro|mid|mis|mono|multi|pre|sub|tri|ex)] #Adjective", group: 0, tag: ["Adjective", "Prefix"], reason: "un-skilled" }], [{ match: "#Adverb [#Adverb] (and|or|then)", group: 0, tag: "Adjective", reason: "kinda-sparkly-and" }, { match: "[(dark|bright|flat|light|soft|pale|dead|dim|faux|little|wee|sheer|most|near|good|extra|all)] #Adjective", group: 0, tag: "Adverb", reason: "dark-green" }, { match: "#Copula [far too] #Adjective", group: 0, tag: "Adverb", reason: "far-too" }, { match: "#Copula [still] (in|#Gerund|#Adjective)", group: 0, tag: "Adverb", reason: "was-still-walking" }, { match: `#Plural ${Ll}`, tag: "#PresentTense #Adverb", reason: "studies-hard" }, { match: `#Verb [${Ll}] !#Noun?`, group: 0, notIf: "(#Copula|get|got|getting|become|became|becoming|feel|feels|feeling|#Determiner|#Preposition)", tag: "Adverb", reason: "shops-direct" }, { match: "[#Plural] a lot", tag: "PresentTense", reason: "studies-a-lot" }], [{ match: "as [#Gerund] as", group: 0, tag: "Adjective", reason: "as-gerund-as" }, { match: "more [#Gerund] than", group: 0, tag: "Adjective", reason: "more-gerund-than" }, { match: "(so|very|extremely) [#Gerund]", group: 0, tag: "Adjective", reason: "so-gerund" }, { match: "(found|found) it #Adverb? [#Gerund]", group: 0, tag: "Adjective", reason: "found-it-gerund" }, { match: "a (little|bit|wee) bit? [#Gerund]", group: 0, tag: "Adjective", reason: "a-bit-gerund" }, { match: "#Gerund [#Gerund]", group: 0, tag: "Adjective", notIf: "(impersonating|practicing|considering|assuming)", reason: "looking-annoying" }, { match: "(looked|look|looks) #Adverb? [%Adj|Gerund%]", group: 0, tag: "Adjective", notIf: "(impersonating|practicing|considering|assuming)", reason: "looked-amazing" }, { match: "[%Adj|Gerund%] #Determiner", group: 0, tag: "Gerund", reason: "developing-a" }, { match: "#Possessive [%Adj|Gerund%] #Noun", group: 0, tag: "Adjective", reason: "leading-manufacturer" }, { match: "%Noun|Gerund% %Adj|Gerund%", tag: "Gerund #Adjective", reason: "meaning-alluring" }, { match: "(face|embrace|reveal|stop|start|resume) %Adj|Gerund%", tag: "#PresentTense #Adjective", reason: "face-shocking" }, { match: "(are|were) [%Adj|Gerund%] #Plural", group: 0, tag: "Adjective", reason: "are-enduring-symbols" }], [{ match: "#Determiner [#Adjective] #Copula", group: 0, tag: "Noun", reason: "the-adj-is" }, { match: "#Adjective [#Adjective] #Copula", group: 0, tag: "Noun", reason: "adj-adj-is" }, { match: "(his|its) [%Adj|Noun%]", group: 0, tag: "Noun", notIf: "#Hyphenated", reason: "his-fine" }, { match: "#Copula #Adverb? [all]", group: 0, tag: "Noun", reason: "is-all" }, { match: "(have|had) [#Adjective] #Preposition .", group: 0, tag: "Noun", reason: "have-fun" }, { match: "#Gerund (giant|capital|center|zone|application)", tag: "Noun", reason: "brewing-giant" }, { match: "#Preposition (a|an) [#Adjective]$", group: 0, tag: "Noun", reason: "an-instant" }, { match: "no [#Adjective] #Modal", group: 0, tag: "Noun", reason: "no-golden" }, { match: "[brand #Gerund?] new", group: 0, tag: "Adverb", reason: "brand-new" }, { match: "(#Determiner|#Comparative|new|different) [kind]", group: 0, tag: "Noun", reason: "some-kind" }, { match: "#Possessive [%Adj|Noun%] #Noun", group: 0, tag: "Adjective", reason: "her-favourite" }, { match: "must && #Hyphenated .", tag: "Adjective", reason: "must-win" }, { match: "#Determiner [#Adjective]$", tag: "Noun", notIf: "(this|that|#Comparative|#Superlative)", reason: "the-south" }, { match: "(#Noun && #Hyphenated) (#Adjective && #Hyphenated)", tag: "Adjective", notIf: "(this|that|#Comparative|#Superlative)", reason: "company-wide" }, { match: "#Determiner [#Adjective] (#Copula|#Determiner)", notIf: "(#Comparative|#Superlative)", group: 0, tag: "Noun", reason: "the-poor" }, { match: "[%Adj|Noun%] #Noun", notIf: "(#Pronoun|#ProperNoun)", group: 0, tag: "Adjective", reason: "stable-foundations" }], [{ match: "[still] #Adjective", group: 0, tag: "Adverb", reason: "still-advb" }, { match: "[still] #Verb", group: 0, tag: "Adverb", reason: "still-verb" }, { match: "[so] #Adjective", group: 0, tag: "Adverb", reason: "so-adv" }, { match: "[way] #Comparative", group: 0, tag: "Adverb", reason: "way-adj" }, { match: "[way] #Adverb #Adjective", group: 0, tag: "Adverb", reason: "way-too-adj" }, { match: "[all] #Verb", group: 0, tag: "Adverb", reason: "all-verb" }, { match: "#Verb  [like]", group: 0, notIf: "(#Modal|#PhrasalVerb)", tag: "Adverb", reason: "verb-like" }, { match: "(barely|hardly) even", tag: "Adverb", reason: "barely-even" }, { match: "[even] #Verb", group: 0, tag: "Adverb", reason: "even-walk" }, { match: "[even] #Comparative", group: 0, tag: "Adverb", reason: "even-worse" }, { match: "[even] (#Determiner|#Possessive)", group: 0, tag: "#Adverb", reason: "even-the" }, { match: "even left", tag: "#Adverb #Verb", reason: "even-left" }, { match: "[way] #Adjective", group: 0, tag: "#Adverb", reason: "way-over" }, { match: "#PresentTense [(hard|quick|bright|slow|fast|backwards|forwards)]", notIf: "#Copula", group: 0, tag: "Adverb", reason: "lazy-ly" }, { match: "[much] #Adjective", group: 0, tag: "Adverb", reason: "bit-1" }, { match: "#Copula [#Adverb]$", group: 0, tag: "Adjective", reason: "is-well" }, { match: "a [(little|bit|wee) bit?] #Adjective", group: 0, tag: "Adverb", reason: "a-bit-cold" }, { match: "[(super|pretty)] #Adjective", group: 0, tag: "Adverb", reason: "super-strong" }, { match: "(become|fall|grow) #Adverb? [#PastTense]", group: 0, tag: "Adjective", reason: "overly-weakened" }, { match: "(a|an) #Adverb [#Participle] #Noun", group: 0, tag: "Adjective", reason: "completely-beaten" }, { match: "#Determiner #Adverb? [close]", group: 0, tag: "Adjective", reason: "a-close" }, { match: "#Gerund #Adverb? [close]", group: 0, tag: "Adverb", notIf: "(getting|becoming|feeling)", reason: "being-close" }, { match: "(the|those|these|a|an) [#Participle] #Noun", group: 0, tag: "Adjective", reason: "blown-motor" }, { match: "(#PresentTense|#PastTense) [back]", group: 0, tag: "Adverb", notIf: "(#PhrasalVerb|#Copula)", reason: "charge-back" }, { match: "#Verb [around]", group: 0, tag: "Adverb", notIf: "#PhrasalVerb", reason: "send-around" }, { match: "[later] #PresentTense", group: 0, tag: "Adverb", reason: "later-say" }, { match: "#Determiner [well] !#PastTense?", group: 0, tag: "Noun", reason: "the-well" }, { match: "#Adjective [enough]", group: 0, tag: "Adverb", reason: "high-enough" }], [{ match: "[sun] the #Ordinal", tag: "WeekDay", reason: "sun-the-5th" }, { match: "[sun] #Date", group: 0, tag: "WeekDay", reason: "sun-feb" }, { match: "#Date (on|this|next|last|during)? [sun]", group: 0, tag: "WeekDay", reason: "1pm-sun" }, { match: "(in|by|before|during|on|until|after|of|within|all) [sat]", group: 0, tag: "WeekDay", reason: "sat" }, { match: "(in|by|before|during|on|until|after|of|within|all) [wed]", group: 0, tag: "WeekDay", reason: "wed" }, { match: "(in|by|before|during|on|until|after|of|within|all) [march]", group: 0, tag: "Month", reason: "march" }, { match: "[sat] #Date", group: 0, tag: "WeekDay", reason: "sat-feb" }, { match: "#Preposition [(march|may)]", group: 0, tag: "Month", reason: "in-month" }, { match: "(this|next|last) (march|may) !#Infinitive?", tag: "#Date #Month", reason: "this-month" }, { match: "(march|may) the? #Value", tag: "#Month #Date #Date", reason: "march-5th" }, { match: "#Value of? (march|may)", tag: "#Date #Date #Month", reason: "5th-of-march" }, { match: "[(march|may)] .? #Date", group: 0, tag: "Month", reason: "march-and-feb" }, { match: "#Date .? [(march|may)]", group: 0, tag: "Month", reason: "feb-and-march" }, { match: "#Adverb [(march|may)]", group: 0, tag: "Verb", reason: "quickly-march" }, { match: "[(march|may)] #Adverb", group: 0, tag: "Verb", reason: "march-quickly" }, { match: "#Value (am|pm)", tag: "Time", reason: "2-am" }], [{ match: "#Holiday (day|eve)", tag: "Holiday", reason: "holiday-day" }, { match: "#Value of #Month", tag: "Date", reason: "value-of-month" }, { match: "#Cardinal #Month", tag: "Date", reason: "cardinal-month" }, { match: "#Month #Value to #Value", tag: "Date", reason: "value-to-value" }, { match: "#Month the #Value", tag: "Date", reason: "month-the-value" }, { match: "(#WeekDay|#Month) #Value", tag: "Date", reason: "date-value" }, { match: "#Value (#WeekDay|#Month)", tag: "Date", reason: "value-date" }, { match: "(#TextValue && #Date) #TextValue", tag: "Date", reason: "textvalue-date" }, { match: "#Month #NumberRange", tag: "Date", reason: "aug 20-21" }, { match: "#WeekDay #Month #Ordinal", tag: "Date", reason: "week mm-dd" }, { match: "#Month #Ordinal #Cardinal", tag: "Date", reason: "mm-dd-yyy" }, { match: "(#Place|#Demonmym) (standard|daylight|central|mountain)? time", tag: "Timezone", reason: "std-time" }, { match: "(eastern|mountain|pacific|central|atlantic) (standard|daylight|summer)? time", tag: "Timezone", reason: "eastern-time" }, { match: "#Time [(eastern|mountain|pacific|central|est|pst|gmt)]", group: 0, tag: "Timezone", reason: "5pm-central" }, { match: "(central|western|eastern) european time", tag: "Timezone", reason: "cet" }], [{ match: "(the|any) [more]", group: 0, tag: "Singular", reason: "more-noun" }, { match: "[more] #Noun", group: 0, tag: "Adjective", reason: "more-noun" }, { match: "(right|rights) of .", tag: "Noun", reason: "right-of" }, { match: "a [bit]", group: 0, tag: "Singular", reason: "bit-2" }, { match: "a [must]", group: 0, tag: "Singular", reason: "must-2" }, { match: "(we|us) [all]", group: 0, tag: "Noun", reason: "we all" }, { match: "due to [#Verb]", group: 0, tag: "Noun", reason: "due-to" }, { match: "some [#Verb] #Plural", group: 0, tag: "Noun", reason: "determiner6" }, { match: "#Possessive #Ordinal [#PastTense]", group: 0, tag: "Noun", reason: "first-thought" }, { match: "(the|this|those|these) #Adjective [%Verb|Noun%]", group: 0, tag: "Noun", notIf: "#Copula", reason: "the-adj-verb" }, { match: "(the|this|those|these) #Adverb #Adjective [#Verb]", group: 0, tag: "Noun", reason: "determiner4" }, { match: "the [#Verb] #Preposition .", group: 0, tag: "Noun", reason: "determiner1" }, { match: "(a|an|the) [#Verb] of", group: 0, tag: "Noun", reason: "the-verb-of" }, { match: "#Determiner #Noun of [#Verb]", group: 0, tag: "Noun", notIf: "#Gerund", reason: "noun-of-noun" }, { match: "#PastTense #Preposition [#PresentTense]", group: 0, notIf: "#Gerund", tag: "Noun", reason: "ended-in-ruins" }, { match: "#Conjunction [u]", group: 0, tag: "Pronoun", reason: "u-pronoun-2" }, { match: "[u] #Verb", group: 0, tag: "Pronoun", reason: "u-pronoun-1" }, { match: "#Determiner [(western|eastern|northern|southern|central)] #Noun", group: 0, tag: "Noun", reason: "western-line" }, { match: "(#Singular && @hasHyphen) #PresentTense", tag: "Noun", reason: "hyphen-verb" }, { match: "is no [#Verb]", group: 0, tag: "Noun", reason: "is-no-verb" }, { match: "do [so]", group: 0, tag: "Noun", reason: "so-noun" }, { match: "#Determiner [(shit|damn|hell)]", group: 0, tag: "Noun", reason: "swears-noun" }, { match: "to [(shit|hell)]", group: 0, tag: "Noun", reason: "to-swears" }, { match: "(the|these) [#Singular] (were|are)", group: 0, tag: "Plural", reason: "singular-were" }, { match: "a #Noun+ or #Adverb+? [#Verb]", group: 0, tag: "Noun", reason: "noun-or-noun" }, { match: "(the|those|these|a|an) #Adjective? [#PresentTense #Particle?]", group: 0, tag: "Noun", notIf: "(seem|appear|include|#Gerund|#Copula)", reason: "det-inf" }, { match: "#Noun #Actor", tag: "Actor", notIf: "(#Person|#Pronoun)", reason: "thing-doer" }, { match: "#Gerund #Actor", tag: "Actor", reason: "gerund-doer" }, { match: "co #Singular", tag: "Actor", reason: "co-noun" }, { match: "[#Noun+] #Actor", group: 0, tag: "Actor", notIf: "(#Honorific|#Pronoun|#Possessive)", reason: "air-traffic-controller" }, { match: "(urban|cardiac|cardiovascular|respiratory|medical|clinical|visual|graphic|creative|dental|exotic|fine|certified|registered|technical|virtual|professional|amateur|junior|senior|special|pharmaceutical|theoretical)+ #Noun? #Actor", tag: "Actor", reason: "fine-artist" }, { match: "#Noun+ (coach|chef|king|engineer|fellow|personality|boy|girl|man|woman|master)", tag: "Actor", reason: "dance-coach" }, { match: "chief . officer", tag: "Actor", reason: "chief-x-officer" }, { match: "chief of #Noun+", tag: "Actor", reason: "chief-of-police" }, { match: "senior? vice? president of #Noun+", tag: "Actor", reason: "president-of" }, { match: "#Determiner [sun]", group: 0, tag: "Singular", reason: "the-sun" }, { match: "#Verb (a|an) [#Value]$", group: 0, tag: "Singular", reason: "did-a-value" }, { match: "the [(can|will|may)]", group: 0, tag: "Singular", reason: "the can" }, { match: "#FirstName #Acronym? (#Possessive && #LastName)", tag: "Possessive", reason: "name-poss" }, { match: "#Organization+ #Possessive", tag: "Possessive", reason: "org-possessive" }, { match: "#Place+ #Possessive", tag: "Possessive", reason: "place-possessive" }, { match: "#Possessive #PresentTense #Particle?", notIf: "(#Gerund|her)", tag: "Noun", reason: "possessive-verb" }, { match: "(my|our|their|her|his|its) [(#Plural && #Actor)] #Noun", tag: "Possessive", reason: "my-dads" }, { match: "#Value of a [second]", group: 0, unTag: "Value", tag: "Singular", reason: "10th-of-a-second" }, { match: "#Value [seconds]", group: 0, unTag: "Value", tag: "Plural", reason: "10-seconds" }, { match: "in [#Infinitive]", group: 0, tag: "Singular", reason: "in-age" }, { match: "a [#Adjective] #Preposition", group: 0, tag: "Noun", reason: "a-minor-in" }, { match: "#Determiner [#Singular] said", group: 0, tag: "Actor", reason: "the-actor-said" }, { match: "#Determiner #Noun [(feel|sense|process|rush|side|bomb|bully|challenge|cover|crush|dump|exchange|flow|function|issue|lecture|limit|march|process)] !(#Preposition|to|#Adverb)?", group: 0, tag: "Noun", reason: "the-noun-sense" }, { match: "[#PresentTense] (of|by|for) (a|an|the) #Noun #Copula", group: 0, tag: "Plural", reason: "photographs-of" }, { match: "#Infinitive and [%Noun|Verb%]", group: 0, tag: "Infinitive", reason: "fight and win" }, { match: "#Noun and [#Verb] and #Noun", group: 0, tag: "Noun", reason: "peace-and-flowers" }, { match: "the #Cardinal [%Adj|Noun%]", group: 0, tag: "Noun", reason: "the-1992-classic" }, { match: "#Copula the [%Adj|Noun%] #Noun", group: 0, tag: "Adjective", reason: "the-premier-university" }, { match: "i #Verb [me] #Noun", group: 0, tag: "Possessive", reason: "scottish-me" }, { match: "[#Infinitive] (music|class|lesson|night|party|festival|league|ceremony)", group: 0, tag: "Noun", reason: "dance-music" }, { match: "[wit] (me|it)", group: 0, tag: "Presposition", reason: "wit-me" }, { match: "#PastTense #Possessive [#Verb]", group: 0, tag: "Noun", notIf: "(saw|made)", reason: "left-her-boots" }, { match: "#Value [%Plural|Verb%]", group: 0, tag: "Plural", notIf: "(one|1|a|an)", reason: "35-signs" }, { match: "had [#PresentTense]", group: 0, tag: "Noun", notIf: "(#Gerund|come|become)", reason: "had-time" }, { match: "%Adj|Noun% %Noun|Verb%", tag: "#Adjective #Noun", notIf: "#ProperNoun #Noun", reason: "instant-access" }, { match: "#Determiner [%Adj|Noun%] #Conjunction", group: 0, tag: "Noun", reason: "a-rep-to" }, { match: "#Adjective #Noun [%Plural|Verb%]$", group: 0, tag: "Plural", notIf: "#Pronoun", reason: "near-death-experiences" }, { match: "#Possessive #Noun [%Plural|Verb%]$", group: 0, tag: "Plural", reason: "your-guild-colors" }], [{ match: "(this|that|the|a|an) [#Gerund #Infinitive]", group: 0, tag: "Singular", reason: "the-planning-process" }, { match: "(that|the) [#Gerund #PresentTense]", group: 0, ifNo: "#Copula", tag: "Plural", reason: "the-paving-stones" }, { match: "#Determiner [#Gerund] #Noun", group: 0, tag: "Adjective", reason: "the-gerund-noun" }, { match: "#Pronoun #Infinitive [#Gerund] #PresentTense", group: 0, tag: "Noun", reason: "tipping-sucks" }, { match: "#Adjective [#Gerund]", group: 0, tag: "Noun", notIf: "(still|even|just)", reason: "early-warning" }, { match: "[#Gerund] #Adverb? not? #Copula", group: 0, tag: "Activity", reason: "gerund-copula" }, { match: "#Copula [(#Gerund|#Activity)] #Copula", group: 0, tag: "Gerund", reason: "are-doing-is" }, { match: "[#Gerund] #Modal", group: 0, tag: "Activity", reason: "gerund-modal" }, { match: "#Singular for [%Noun|Gerund%]", group: 0, tag: "Gerund", reason: "noun-for-gerund" }, { match: "#Comparative (for|at) [%Noun|Gerund%]", group: 0, tag: "Gerund", reason: "better-for-gerund" }, { match: "#PresentTense the [#Gerund]", group: 0, tag: "Noun", reason: "keep-the-touching" }], [{ match: "#Infinitive (this|that|the) [#Infinitive]", group: 0, tag: "Noun", reason: "do-this-dance" }, { match: "#Gerund #Determiner [#Infinitive]", group: 0, tag: "Noun", reason: "running-a-show" }, { match: "#Determiner (only|further|just|more|backward) [#Infinitive]", group: 0, tag: "Noun", reason: "the-only-reason" }, { match: "(the|this|a|an) [#Infinitive] #Adverb? #Verb", group: 0, tag: "Noun", reason: "determiner5" }, { match: "#Determiner #Adjective #Adjective? [#Infinitive]", group: 0, tag: "Noun", reason: "a-nice-inf" }, { match: "#Determiner #Demonym [#PresentTense]", group: 0, tag: "Noun", reason: "mexican-train" }, { match: "#Adjective #Noun+ [#Infinitive] #Copula", group: 0, tag: "Noun", reason: "career-move" }, { match: "at some [#Infinitive]", group: 0, tag: "Noun", reason: "at-some-inf" }, { match: "(go|goes|went) to [#Infinitive]", group: 0, tag: "Noun", reason: "goes-to-verb" }, { match: "(a|an) #Adjective? #Noun [#Infinitive] (#Preposition|#Noun)", group: 0, notIf: "from", tag: "Noun", reason: "a-noun-inf" }, { match: "(a|an) #Noun [#Infinitive]$", group: 0, tag: "Noun", reason: "a-noun-inf2" }, { match: "#Gerund #Adjective? for [#Infinitive]", group: 0, tag: "Noun", reason: "running-for" }, { match: "about [#Infinitive]", group: 0, tag: "Singular", reason: "about-love" }, { match: "#Plural on [#Infinitive]", group: 0, tag: "Noun", reason: "on-stage" }, { match: "any [#Infinitive]", group: 0, tag: "Noun", reason: "any-charge" }, { match: "no [#Infinitive]", group: 0, tag: "Noun", reason: "no-doubt" }, { match: "number of [#PresentTense]", group: 0, tag: "Noun", reason: "number-of-x" }, { match: "(taught|teaches|learns|learned) [#PresentTense]", group: 0, tag: "Noun", reason: "teaches-x" }, { match: "(try|use|attempt|build|make) [#Verb #Particle?]", notIf: "(#Copula|#Noun|sure|fun|up)", group: 0, tag: "Noun", reason: "do-verb" }, { match: "^[#Infinitive] (is|was)", group: 0, tag: "Noun", reason: "checkmate-is" }, { match: "#Infinitive much [#Infinitive]", group: 0, tag: "Noun", reason: "get-much" }, { match: "[cause] #Pronoun #Verb", group: 0, tag: "Conjunction", reason: "cause-cuz" }, { match: "the #Singular [#Infinitive] #Noun", group: 0, tag: "Noun", notIf: "#Pronoun", reason: "cardio-dance" }, { match: "#Determiner #Modal [#Noun]", group: 0, tag: "PresentTense", reason: "should-smoke" }, { match: "this [#Plural]", group: 0, tag: "PresentTense", notIf: "(#Preposition|#Date)", reason: "this-verbs" }, { match: "#Noun that [#Plural]", group: 0, tag: "PresentTense", notIf: "(#Preposition|#Pronoun|way)", reason: "voice-that-rocks" }, { match: "that [#Plural] to", group: 0, tag: "PresentTense", notIf: "#Preposition", reason: "that-leads-to" }, { match: "(let|make|made) (him|her|it|#Person|#Place|#Organization)+ [#Singular] (a|an|the|it)", group: 0, tag: "Infinitive", reason: "let-him-glue" }, { match: "#Verb (all|every|each|most|some|no) [#PresentTense]", notIf: "#Modal", group: 0, tag: "Noun", reason: "all-presentTense" }, { match: "(had|have|#PastTense) #Adjective [#PresentTense]", group: 0, tag: "Noun", notIf: "better", reason: "adj-presentTense" }, { match: "#Value #Adjective [#PresentTense]", group: 0, tag: "Noun", notIf: "#Copula", reason: "one-big-reason" }, { match: "#PastTense #Adjective+ [#PresentTense]", group: 0, tag: "Noun", notIf: "(#Copula|better)", reason: "won-wide-support" }, { match: "(many|few|several|couple) [#PresentTense]", group: 0, tag: "Noun", notIf: "#Copula", reason: "many-poses" }, { match: "#Determiner #Adverb #Adjective [%Noun|Verb%]", group: 0, tag: "Noun", notIf: "#Copula", reason: "very-big-dream" }, { match: "from #Noun to [%Noun|Verb%]", group: 0, tag: "Noun", reason: "start-to-finish" }, { match: "(for|with|of) #Noun (and|or|not) [%Noun|Verb%]", group: 0, tag: "Noun", notIf: "#Pronoun", reason: "for-food-and-gas" }, { match: "#Adjective #Adjective [#PresentTense]", group: 0, tag: "Noun", notIf: "#Copula", reason: "adorable-little-store" }, { match: "#Gerund #Adverb? #Comparative [#PresentTense]", group: 0, tag: "Noun", notIf: "#Copula", reason: "higher-costs" }, { match: "(#Noun && @hasComma) #Noun (and|or) [#PresentTense]", group: 0, tag: "Noun", notIf: "#Copula", reason: "noun-list" }, { match: "(many|any|some|several) [#PresentTense] for", group: 0, tag: "Noun", reason: "any-verbs-for" }, { match: "to #PresentTense #Noun [#PresentTense] #Preposition", group: 0, tag: "Noun", reason: "gas-exchange" }, { match: "#PastTense (until|as|through|without) [#PresentTense]", group: 0, tag: "Noun", reason: "waited-until-release" }, { match: "#Gerund like #Adjective? [#PresentTense]", group: 0, tag: "Plural", reason: "like-hot-cakes" }, { match: "some #Adjective [#PresentTense]", group: 0, tag: "Noun", reason: "some-reason" }, { match: "for some [#PresentTense]", group: 0, tag: "Noun", reason: "for-some-reason" }, { match: "(same|some|the|that|a) kind of [#PresentTense]", group: 0, tag: "Noun", reason: "some-kind-of" }, { match: "(same|some|the|that|a) type of [#PresentTense]", group: 0, tag: "Noun", reason: "some-type-of" }, { match: "#Gerund #Adjective #Preposition [#PresentTense]", group: 0, tag: "Noun", reason: "doing-better-for-x" }, { match: "(get|got|have) #Comparative [#PresentTense]", group: 0, tag: "Noun", reason: "got-better-aim" }, { match: "whose [#PresentTense] #Copula", group: 0, tag: "Noun", reason: "whos-name-was" }, { match: "#PhrasalVerb #Particle #Preposition [#PresentTense]", group: 0, tag: "Noun", reason: "given-up-on-x" }, { match: "there (are|were) #Adjective? [#PresentTense]", group: 0, tag: "Plural", reason: "there-are" }, { match: "#Value [#PresentTense] of", group: 0, notIf: "(one|1|#Copula|#Infinitive)", tag: "Plural", reason: "2-trains" }, { match: "[#PresentTense] (are|were) #Adjective", group: 0, tag: "Plural", reason: "compromises-are-possible" }, { match: "^[(hope|guess|thought|think)] #Pronoun #Verb", group: 0, tag: "Infinitive", reason: "suppose-i" }, { match: "#Possessive #Adjective [#Verb]", group: 0, tag: "Noun", notIf: "#Copula", reason: "our-full-support" }, { match: "[(tastes|smells)] #Adverb? #Adjective", group: 0, tag: "PresentTense", reason: "tastes-good" }, { match: "#Copula #Gerund [#PresentTense] !by?", group: 0, tag: "Noun", notIf: "going", reason: "ignoring-commute" }, { match: "#Determiner #Adjective? [(shed|thought|rose|bid|saw|spelt)]", group: 0, tag: "Noun", reason: "noun-past" }, { match: "how to [%Noun|Verb%]", group: 0, tag: "Infinitive", reason: "how-to-noun" }, { match: "which [%Noun|Verb%] #Noun", group: 0, tag: "Infinitive", reason: "which-boost-it" }, { match: "#Gerund [%Plural|Verb%]", group: 0, tag: "Plural", reason: "asking-questions" }, { match: "(ready|available|difficult|hard|easy|made|attempt|try) to [%Noun|Verb%]", group: 0, tag: "Infinitive", reason: "ready-to-noun" }, { match: "(bring|went|go|drive|run|bike) to [%Noun|Verb%]", group: 0, tag: "Noun", reason: "bring-to-noun" }, { match: "#Modal #Noun [%Noun|Verb%]", group: 0, tag: "Infinitive", reason: "would-you-look" }, { match: "#Copula just [#Infinitive]", group: 0, tag: "Noun", reason: "is-just-spam" }, { match: "^%Noun|Verb% %Plural|Verb%", tag: "Imperative #Plural", reason: "request-copies" }, { match: "#Adjective #Plural and [%Plural|Verb%]", group: 0, tag: "#Plural", reason: "pickles-and-drinks" }, { match: "#Determiner #Year [#Verb]", group: 0, tag: "Noun", reason: "the-1968-film" }, { match: "#Determiner [#PhrasalVerb #Particle]", group: 0, tag: "Noun", reason: "the-break-up" }, { match: "#Determiner [%Adj|Noun%] #Noun", group: 0, tag: "Adjective", notIf: "(#Pronoun|#Possessive|#ProperNoun)", reason: "the-individual-goals" }, { match: "[%Noun|Verb%] or #Infinitive", group: 0, tag: "Infinitive", reason: "work-or-prepare" }, { match: "to #Infinitive [#PresentTense]", group: 0, tag: "Noun", notIf: "(#Gerund|#Copula|help)", reason: "to-give-thanks" }, { match: "[#Noun] me", group: 0, tag: "Verb", reason: "kills-me" }, { match: "%Plural|Verb% %Plural|Verb%", tag: "#PresentTense #Plural", reason: "removes-wrinkles" }, { match: "i [#Noun] the #Noun", group: 0, tag: "Infinitive", reason: "i-water-the-plants" }], [{ match: "#Money and #Money #Currency?", tag: "Money", reason: "money-and-money" }, { match: "#Value #Currency [and] #Value (cents|ore|centavos|sens)", group: 0, tag: "Money", reason: "and-5-cents" }, { match: "#Value (mark|rand|won|rub|ore)", tag: "#Money #Currency", reason: "4-mark" }, { match: "a pound", tag: "#Money #Unit", reason: "a-pound" }, { match: "#Value (pound|pounds)", tag: "#Money #Unit", reason: "4-pounds" }], [{ match: "[(half|quarter)] of? (a|an)", group: 0, tag: "Fraction", reason: "millionth" }, { match: "#Adverb [half]", group: 0, tag: "Fraction", reason: "nearly-half" }, { match: "[half] the", group: 0, tag: "Fraction", reason: "half-the" }, { match: "#Cardinal and a half", tag: "Fraction", reason: "and-a-half" }, { match: "#Value (halves|halfs|quarters)", tag: "Fraction", reason: "two-halves" }, { match: "a #Ordinal", tag: "Fraction", reason: "a-quarter" }, { match: "[#Cardinal+] (#Fraction && /s$/)", tag: "Fraction", reason: "seven-fifths" }, { match: "[#Cardinal+ #Ordinal] of .", group: 0, tag: "Fraction", reason: "ordinal-of" }, { match: "[(#NumericValue && #Ordinal)] of .", group: 0, tag: "Fraction", reason: "num-ordinal-of" }, { match: "(a|one) #Cardinal?+ #Ordinal", tag: "Fraction", reason: "a-ordinal" }, { match: "#Cardinal+ out? of every? #Cardinal", tag: "Fraction", reason: "out-of" }], [{ match: "#Cardinal [second]", tag: "Unit", reason: "one-second" }, { match: "!once? [(a|an)] (#Duration|hundred|thousand|million|billion|trillion)", group: 0, tag: "Value", reason: "a-is-one" }, { match: "(1|+1) #Value #PhoneNumber", tag: "PhoneNumber", reason: "1-800-Value" }, { match: "#NumericValue #PhoneNumber", tag: "PhoneNumber", reason: "(800) PhoneNumber" }, { match: "#Demonym #Currency", tag: "Currency", reason: "demonym-currency" }, { match: "#Value [(buck|bucks|grand)]", group: 0, tag: "Currency", reason: "value-bucks" }, { match: "[#Value+] #Currency", group: 0, tag: "Money", reason: "15 usd" }, { match: "[second] #Noun", group: 0, tag: "Ordinal", reason: "second-noun" }, { match: "#Value+ [#Currency]", group: 0, tag: "Unit", reason: "5-yan" }, { match: "#Value [(foot|feet)]", group: 0, tag: "Unit", reason: "foot-unit" }, { match: "#Value [#Abbreviation]", group: 0, tag: "Unit", reason: "value-abbr" }, { match: "#Value [k]", group: 0, tag: "Unit", reason: "value-k" }, { match: "#Unit an hour", tag: "Unit", reason: "unit-an-hour" }, { match: "(minus|negative) #Value", tag: "Value", reason: "minus-value" }, { match: "#Value (point|decimal) #Value", tag: "Value", reason: "value-point-value" }, { match: "#Determiner [(half|quarter)] #Ordinal", group: 0, tag: "Value", reason: "half-ordinal" }, { match: "#Multiple+ and #Value", tag: "Value", reason: "magnitude-and-value" }, { match: "#Value #Unit [(per|an) (hr|hour|sec|second|min|minute)]", group: 0, tag: "Unit", reason: "12-miles-per-second" }, { match: "#Value [(square|cubic)] #Unit", group: 0, tag: "Unit", reason: "square-miles" }, { match: "#Cardinal percent", tag: "#Percent #Unit", reason: "value-percent" }, { match: "#Value [(gb|pa|ft|foot|feet|m)]", group: 0, tag: "Unit", reason: "ambiguous-unit" }], [{ match: "#Copula [(#Noun|#PresentTense)] #LastName", group: 0, tag: "FirstName", reason: "copula-noun-lastname" }, { match: "(sister|pope|brother|father|aunt|uncle|grandpa|grandfather|grandma) #ProperNoun", tag: "Person", reason: "lady-titlecase", safe: true }, { match: "#FirstName [#Determiner #Noun] #LastName", group: 0, tag: "Person", reason: "first-noun-last" }, { match: "#ProperNoun (b|c|d|e|f|g|h|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z) #ProperNoun", tag: "Person", reason: "titlecase-acronym-titlecase", safe: true }, { match: "#Acronym #LastName", tag: "Person", reason: "acronym-lastname", safe: true }, { match: "#Person (jr|sr|md)", tag: "Person", reason: "person-honorific" }, { match: "#Honorific #Acronym", tag: "Person", reason: "Honorific-TitleCase" }, { match: "#Person #Person the? #RomanNumeral", tag: "Person", reason: "roman-numeral" }, { match: "#FirstName [/^[^aiurck]$/]", group: 0, tag: ["Acronym", "Person"], reason: "john-e" }, { match: "#Noun van der? #Noun", tag: "Person", reason: "van der noun", safe: true }, { match: "(king|queen|prince|saint|lady) of #Noun", tag: "Person", reason: "king-of-noun", safe: true }, { match: "(prince|lady) #Place", tag: "Person", reason: "lady-place" }, { match: "(king|queen|prince|saint) #ProperNoun", tag: "Person", notIf: "#Place", reason: "saint-foo" }, { match: "al (#Person|#ProperNoun)", tag: "Person", reason: "al-borlen", safe: true }, { match: "#FirstName de #Noun", tag: "Person", reason: "bill-de-noun" }, { match: "#FirstName (bin|al) #Noun", tag: "Person", reason: "bill-al-noun" }, { match: "#FirstName #Acronym #ProperNoun", tag: "Person", reason: "bill-acronym-title" }, { match: "#FirstName #FirstName #ProperNoun", tag: "Person", reason: "bill-firstname-title" }, { match: "#Honorific #FirstName? #ProperNoun", tag: "Person", reason: "dr-john-Title" }, { match: "#FirstName the #Adjective", tag: "Person", reason: "name-the-great" }, { match: "#ProperNoun (van|al|bin) #ProperNoun", tag: "Person", reason: "title-van-title", safe: true }, { match: "#ProperNoun (de|du) la? #ProperNoun", tag: "Person", notIf: "#Place", reason: "title-de-title" }, { match: "#Singular #Acronym #LastName", tag: "#FirstName #Person .", reason: "title-acro-noun", safe: true }, { match: "[#ProperNoun] #Person", group: 0, tag: "Person", reason: "proper-person", safe: true }, { match: "#Person [#ProperNoun #ProperNoun]", group: 0, tag: "Person", notIf: "#Possessive", reason: "three-name-person", safe: true }, { match: "#FirstName #Acronym? [#ProperNoun]", group: 0, tag: "LastName", notIf: "#Possessive", reason: "firstname-titlecase" }, { match: "#FirstName [#FirstName]", group: 0, tag: "LastName", reason: "firstname-firstname" }, { match: "#FirstName #Acronym #Noun", tag: "Person", reason: "n-acro-noun", safe: true }, { match: "#FirstName [(de|di|du|van|von)] #Person", group: 0, tag: "LastName", reason: "de-firstname" }, { match: "[(lieutenant|corporal|sergeant|captain|qeen|king|admiral|major|colonel|marshal|president|queen|king)+] #ProperNoun", group: 0, tag: "Honorific", reason: "seargeant-john" }, { match: "[(private|general|major|rear|prime|field|count|miss)] #Honorific? #Person", group: 0, tag: ["Honorific", "Person"], reason: "ambg-honorifics" }, { match: "#Honorific #FirstName [#Singular]", group: 0, tag: "LastName", notIf: "#Possessive", reason: "dr-john-foo", safe: true }, { match: "[(his|her) (majesty|honour|worship|excellency|honorable)] #Person", group: 0, tag: "Honorific", reason: "his-excellency" }, { match: "#Honorific #Actor", tag: "Honorific", reason: "Lieutenant colonel" }, { match: "(first|second|third|1st|2nd|3rd) #Actor", tag: "Honorific", reason: "first lady" }, { match: "#Person #RomanNumeral", tag: "Person", reason: "louis-IV" }], [{ match: "#FirstName #Noun$", tag: ". #LastName", notIf: "(#Possessive|#Organization|#Place|#Pronoun|@hasTitleCase)", reason: "firstname-noun" }, { match: "%Person|Date% #Acronym? #ProperNoun", tag: "Person", reason: "jan-thierson" }, { match: "%Person|Noun% #Acronym? #ProperNoun", tag: "Person", reason: "switch-person", safe: true }, { match: "%Person|Noun% #Organization", tag: "Organization", reason: "olive-garden" }, { match: "%Person|Verb% #Acronym? #ProperNoun", tag: "Person", reason: "verb-propernoun", ifNo: "#Actor" }, { match: "[%Person|Verb%] (will|had|has|said|says|told|did|learned|wants|wanted)", group: 0, tag: "Person", reason: "person-said" }, { match: "[%Person|Place%] (harbor|harbour|pier|town|city|place|dump|landfill)", group: 0, tag: "Place", reason: "sydney-harbour" }, { match: "(west|east|north|south) [%Person|Place%]", group: 0, tag: "Place", reason: "east-sydney" }, { match: "#Modal [%Person|Verb%]", group: 0, tag: "Verb", reason: "would-mark" }, { match: "#Adverb [%Person|Verb%]", group: 0, tag: "Verb", reason: "really-mark" }, { match: "[%Person|Verb%] (#Adverb|#Comparative)", group: 0, tag: "Verb", reason: "drew-closer" }, { match: "%Person|Verb% #Person", tag: "Person", reason: "rob-smith" }, { match: "%Person|Verb% #Acronym #ProperNoun", tag: "Person", reason: "rob-a-smith" }, { match: "[will] #Verb", group: 0, tag: "Modal", reason: "will-verb" }, { match: "(will && @isTitleCase) #ProperNoun", tag: "Person", reason: "will-name" }, { match: "(#FirstName && !#Possessive) [#Singular] #Verb", group: 0, safe: true, tag: "LastName", reason: "jack-layton" }, { match: "^[#Singular] #Person #Verb", group: 0, safe: true, tag: "Person", reason: "sherwood-anderson" }, { match: "(a|an) [#Person]$", group: 0, unTag: "Person", reason: "a-warhol" }], [{ match: "#Copula (pretty|dead|full|well|sure) (#Adjective|#Noun)", tag: "#Copula #Adverb #Adjective", reason: "sometimes-adverb" }, { match: "(#Pronoun|#Person) (had|#Adverb)? [better] #PresentTense", group: 0, tag: "Modal", reason: "i-better" }, { match: "(#Modal|i|they|we|do) not? [like]", group: 0, tag: "PresentTense", reason: "modal-like" }, { match: "#Noun #Adverb? [left]", group: 0, tag: "PastTense", reason: "left-verb" }, { match: "will #Adverb? not? #Adverb? [be] #Gerund", group: 0, tag: "Copula", reason: "will-be-copula" }, { match: "will #Adverb? not? #Adverb? [be] #Adjective", group: 0, tag: "Copula", reason: "be-copula" }, { match: "[march] (up|down|back|toward)", notIf: "#Date", group: 0, tag: "Infinitive", reason: "march-to" }, { match: "#Modal [march]", group: 0, tag: "Infinitive", reason: "must-march" }, { match: "[may] be", group: 0, tag: "Verb", reason: "may-be" }, { match: "[(subject|subjects|subjected)] to", group: 0, tag: "Verb", reason: "subject to" }, { match: "[home] to", group: 0, tag: "PresentTense", reason: "home to" }, { match: "[open] #Determiner", group: 0, tag: "Infinitive", reason: "open-the" }, { match: "(were|was) being [#PresentTense]", group: 0, tag: "PastTense", reason: "was-being" }, { match: "(had|has|have) [been /en$/]", group: 0, tag: "Auxiliary Participle", reason: "had-been-broken" }, { match: "(had|has|have) [been /ed$/]", group: 0, tag: "Auxiliary PastTense", reason: "had-been-smoked" }, { match: "(had|has) #Adverb? [been] #Adverb? #PastTense", group: 0, tag: "Auxiliary", reason: "had-been-adj" }, { match: "(had|has) to [#Noun] (#Determiner|#Possessive)", group: 0, tag: "Infinitive", reason: "had-to-noun" }, { match: "have [#PresentTense]", group: 0, tag: "PastTense", notIf: "(come|gotten)", reason: "have-read" }, { match: "(does|will|#Modal) that [work]", group: 0, tag: "PastTense", reason: "does-that-work" }, { match: "[(sound|sounds)] #Adjective", group: 0, tag: "PresentTense", reason: "sounds-fun" }, { match: "[(look|looks)] #Adjective", group: 0, tag: "PresentTense", reason: "looks-good" }, { match: "[(start|starts|stop|stops|begin|begins)] #Gerund", group: 0, tag: "Verb", reason: "starts-thinking" }, { match: "(have|had) read", tag: "Modal #PastTense", reason: "read-read" }, { match: "(is|was|were) [(under|over) #PastTense]", group: 0, tag: "Adverb Adjective", reason: "was-under-cooked" }, { match: "[shit] (#Determiner|#Possessive|them)", group: 0, tag: "Verb", reason: "swear1-verb" }, { match: "[damn] (#Determiner|#Possessive|them)", group: 0, tag: "Verb", reason: "swear2-verb" }, { match: "[fuck] (#Determiner|#Possessive|them)", group: 0, tag: "Verb", reason: "swear3-verb" }, { match: "#Plural that %Noun|Verb%", tag: ". #Preposition #Infinitive", reason: "jobs-that-work" }, { match: "[works] for me", group: 0, tag: "PresentTense", reason: "works-for-me" }, { match: "as #Pronoun [please]", group: 0, tag: "Infinitive", reason: "as-we-please" }, { match: "[(co|mis|de|inter|intra|pre|re|un|out|under|over|counter)] #Verb", group: 0, tag: ["Verb", "Prefix"], notIf: "(#Copula|#PhrasalVerb)", reason: "co-write" }, { match: "#PastTense and [%Adj|Past%]", group: 0, tag: "PastTense", reason: "dressed-and-left" }, { match: "[%Adj|Past%] and #PastTense", group: 0, tag: "PastTense", reason: "dressed-and-left" }, { match: "#Copula #Pronoun [%Adj|Past%]", group: 0, tag: "Adjective", reason: "is-he-stoked" }, { match: "to [%Noun|Verb%] #Preposition", group: 0, tag: "Infinitive", reason: "to-dream-of" }], [{ match: "(slowly|quickly) [#Adjective]", group: 0, tag: "Verb", reason: "slowly-adj" }, { match: "does (#Adverb|not)? [#Adjective]", group: 0, tag: "PresentTense", reason: "does-mean" }, { match: "[(fine|okay|cool|ok)] by me", group: 0, tag: "Adjective", reason: "okay-by-me" }, { match: "i (#Adverb|do)? not? [mean]", group: 0, tag: "PresentTense", reason: "i-mean" }, { match: "will #Adjective", tag: "Auxiliary Infinitive", reason: "will-adj" }, { match: "#Pronoun [#Adjective] #Determiner #Adjective? #Noun", group: 0, tag: "Verb", reason: "he-adj-the" }, { match: "#Copula [%Adj|Present%] to #Verb", group: 0, tag: "Verb", reason: "adj-to" }, { match: "#Copula [#Adjective] (well|badly|quickly|slowly)", group: 0, tag: "Verb", reason: "done-well" }, { match: "#Adjective and [#Gerund] !#Preposition?", group: 0, tag: "Adjective", reason: "rude-and-x" }, { match: "#Copula #Adverb? (over|under) [#PastTense]", group: 0, tag: "Adjective", reason: "over-cooked" }, { match: "#Copula #Adjective+ (and|or) [#PastTense]$", group: 0, tag: "Adjective", reason: "bland-and-overcooked" }, { match: "got #Adverb? [#PastTense] of", group: 0, tag: "Adjective", reason: "got-tired-of" }, { match: "(seem|seems|seemed|appear|appeared|appears|feel|feels|felt|sound|sounds|sounded) (#Adverb|#Adjective)? [#PastTense]", group: 0, tag: "Adjective", reason: "felt-loved" }, { match: "(seem|feel|seemed|felt) [#PastTense #Particle?]", group: 0, tag: "Adjective", reason: "seem-confused" }, { match: "a (bit|little|tad) [#PastTense #Particle?]", group: 0, tag: "Adjective", reason: "a-bit-confused" }, { match: "not be [%Adj|Past% #Particle?]", group: 0, tag: "Adjective", reason: "do-not-be-confused" }, { match: "#Copula just [%Adj|Past% #Particle?]", group: 0, tag: "Adjective", reason: "is-just-right" }, { match: "as [#Infinitive] as", group: 0, tag: "Adjective", reason: "as-pale-as" }, { match: "[%Adj|Past%] and #Adjective", group: 0, tag: "Adjective", reason: "faled-and-oppressive" }, { match: "or [#PastTense] #Noun", group: 0, tag: "Adjective", notIf: "(#Copula|#Pronoun)", reason: "or-heightened-emotion" }, { match: "(become|became|becoming|becomes) [#Verb]", group: 0, tag: "Adjective", reason: "become-verb" }, { match: "#Possessive [#PastTense] #Noun", group: 0, tag: "Adjective", reason: "declared-intentions" }, { match: "#Copula #Pronoun [%Adj|Present%]", group: 0, tag: "Adjective", reason: "is-he-cool" }, { match: "#Copula [%Adj|Past%] with", group: 0, tag: "Adjective", notIf: "(associated|worn|baked|aged|armed|bound|fried|loaded|mixed|packed|pumped|filled|sealed)", reason: "is-crowded-with" }, { match: "#Copula #Adverb? [%Adj|Present%]$", group: 0, tag: "Adjective", reason: "was-empty$" }], [{ match: "will (#Adverb|not)+? [have] (#Adverb|not)+? #Verb", group: 0, tag: "Auxiliary", reason: "will-have-vb" }, { match: "[#Copula] (#Adverb|not)+? (#Gerund|#PastTense)", group: 0, tag: "Auxiliary", reason: "copula-walking" }, { match: "[(#Modal|did)+] (#Adverb|not)+? #Verb", group: 0, tag: "Auxiliary", reason: "modal-verb" }, { match: "#Modal (#Adverb|not)+? [have] (#Adverb|not)+? [had] (#Adverb|not)+? #Verb", group: 0, tag: "Auxiliary", reason: "would-have" }, { match: "[(has|had)] (#Adverb|not)+? #PastTense", group: 0, tag: "Auxiliary", reason: "had-walked" }, { match: "[(do|does|did|will|have|had|has|got)] (not|#Adverb)+? #Verb", group: 0, tag: "Auxiliary", reason: "have-had" }, { match: "[about to] #Adverb? #Verb", group: 0, tag: ["Auxiliary", "Verb"], reason: "about-to" }, { match: "#Modal (#Adverb|not)+? [be] (#Adverb|not)+? #Verb", group: 0, tag: "Auxiliary", reason: "would-be" }, { match: "[(#Modal|had|has)] (#Adverb|not)+? [been] (#Adverb|not)+? #Verb", group: 0, tag: "Auxiliary", reason: "had-been" }, { match: "[(be|being|been)] #Participle", group: 0, tag: "Auxiliary", reason: "being-driven" }, { match: "[may] #Adverb? #Infinitive", group: 0, tag: "Auxiliary", reason: "may-want" }, { match: "#Copula (#Adverb|not)+? [(be|being|been)] #Adverb+? #PastTense", group: 0, tag: "Auxiliary", reason: "being-walked" }, { match: "will [be] #PastTense", group: 0, tag: "Auxiliary", reason: "will-be-x" }, { match: "[(be|been)] (#Adverb|not)+? #Gerund", group: 0, tag: "Auxiliary", reason: "been-walking" }, { match: "[used to] #PresentTense", group: 0, tag: "Auxiliary", reason: "used-to-walk" }, { match: "#Copula (#Adverb|not)+? [going to] #Adverb+? #PresentTense", group: 0, tag: "Auxiliary", reason: "going-to-walk" }, { match: "#Imperative [(me|him|her)]", group: 0, tag: "Reflexive", reason: "tell-him" }, { match: "(is|was) #Adverb? [no]", group: 0, tag: "Negative", reason: "is-no" }, { match: "[(been|had|became|came)] #PastTense", group: 0, notIf: "#PhrasalVerb", tag: "Auxiliary", reason: "been-told" }, { match: "[(being|having|getting)] #Verb", group: 0, tag: "Auxiliary", reason: "being-born" }, { match: "[be] #Gerund", group: 0, tag: "Auxiliary", reason: "be-walking" }, { match: "[better] #PresentTense", group: 0, tag: "Modal", notIf: "(#Copula|#Gerund)", reason: "better-go" }, { match: "even better", tag: "Adverb #Comparative", reason: "even-better" }], [{ match: "(#Verb && @hasHyphen) up", tag: "PhrasalVerb", reason: "foo-up" }, { match: "(#Verb && @hasHyphen) off", tag: "PhrasalVerb", reason: "foo-off" }, { match: "(#Verb && @hasHyphen) over", tag: "PhrasalVerb", reason: "foo-over" }, { match: "(#Verb && @hasHyphen) out", tag: "PhrasalVerb", reason: "foo-out" }, { match: "[#Verb (in|out|up|down|off|back)] (on|in)", notIf: "#Copula", tag: "PhrasalVerb Particle", reason: "walk-in-on" }, { match: "(lived|went|crept|go) [on] for", group: 0, tag: "PhrasalVerb", reason: "went-on" }, { match: "#Verb (up|down|in|on|for)$", tag: "PhrasalVerb #Particle", notIf: "#PhrasalVerb", reason: "come-down$" }, { match: "help [(stop|end|make|start)]", group: 0, tag: "Infinitive", reason: "help-stop" }, { match: "#PhrasalVerb (in && #Particle) #Determiner", tag: "#Verb #Preposition #Determiner", unTag: "PhrasalVerb", reason: "work-in-the" }, { match: "[(stop|start|finish|help)] #Gerund", group: 0, tag: "Infinitive", reason: "start-listening" }, { match: "#Verb (him|her|it|us|himself|herself|itself|everything|something) [(up|down)]", group: 0, tag: "Adverb", reason: "phrasal-pronoun-advb" }], [{ match: "^do not? [#Infinitive #Particle?]", notIf: Jl, group: 0, tag: "Imperative", reason: "do-eat" }, { match: "^please do? not? [#Infinitive #Particle?]", group: 0, tag: "Imperative", reason: "please-go" }, { match: "^just do? not? [#Infinitive #Particle?]", group: 0, tag: "Imperative", reason: "just-go" }, { match: "^[#Infinitive] it #Comparative", notIf: Jl, group: 0, tag: "Imperative", reason: "do-it-better" }, { match: "^[#Infinitive] it (please|now|again|plz)", notIf: Jl, group: 0, tag: "Imperative", reason: "do-it-please" }, { match: "^[#Infinitive] (#Adjective|#Adverb|hard|high|fast|slow)$", group: 0, tag: "Imperative", notIf: "(so|such|rather|enough)", reason: "go-quickly" }, { match: "^[#Infinitive] (up|down|over) #Determiner", group: 0, tag: "Imperative", reason: "turn-down" }, { match: "^[#Infinitive] (your|my|the|a|an|any|each|every|some|more|with|on)", group: 0, notIf: "like", tag: "Imperative", reason: "eat-my-shorts" }, { match: "^[#Infinitive] (him|her|it|us|me|there)", group: 0, tag: "Imperative", reason: "tell-him" }, { match: "^[#Infinitive] #Adjective #Noun$", group: 0, tag: "Imperative", reason: "avoid-loud-noises" }, { match: "^[#Infinitive] (#Adjective|#Adverb)? and #Infinitive", group: 0, tag: "Imperative", reason: "call-and-reserve" }, { match: "^(go|stop|wait|hurry) please?$", tag: "Imperative", reason: "go" }, { match: "^(somebody|everybody) [#Infinitive]", group: 0, tag: "Imperative", reason: "somebody-call" }, { match: "^let (us|me) [#Infinitive]", group: 0, tag: "Imperative", reason: "lets-leave" }, { match: "^[(shut|close|open|start|stop|end|keep)] #Determiner #Noun", group: 0, tag: "Imperative", reason: "shut-the-door" }, { match: "^[#PhrasalVerb #Particle] #Determiner #Noun", group: 0, tag: "Imperative", reason: "turn-off-the-light" }, { match: "^[go] to .", group: 0, tag: "Imperative", reason: "go-to-toronto" }, { match: "^#Modal you [#Infinitive]", group: 0, tag: "Imperative", reason: "would-you-" }, { match: "^never [#Infinitive]", group: 0, tag: "Imperative", reason: "never-stop" }, { match: "^come #Infinitive", tag: "Imperative", notIf: "on", reason: "come-have" }, { match: "^come and? #Infinitive", tag: "Imperative . Imperative", notIf: "#PhrasalVerb", reason: "come-and-have" }, { match: "^stay (out|away|back)", tag: "Imperative", reason: "stay-away" }, { match: "^[(stay|be|keep)] #Adjective", group: 0, tag: "Imperative", reason: "stay-cool" }, { match: "^[keep it] #Adjective", group: 0, tag: "Imperative", reason: "keep-it-cool" }, { match: "^do not [#Infinitive]", group: 0, tag: "Imperative", reason: "do-not-be" }, { match: "[#Infinitive] (yourself|yourselves)", group: 0, tag: "Imperative", reason: "allow-yourself" }, { match: "[#Infinitive] what .", group: 0, tag: "Imperative", reason: "look-what" }, { match: "^[#Infinitive] #Gerund", group: 0, tag: "Imperative", reason: "keep-playing" }, { match: "^[#Infinitive] (to|for|into|toward|here|there)", group: 0, tag: "Imperative", reason: "go-to" }, { match: "^[#Infinitive] (and|or) #Infinitive", group: 0, tag: "Imperative", reason: "inf-and-inf" }, { match: "^[%Noun|Verb%] to", group: 0, tag: "Imperative", reason: "commit-to" }, { match: "^[#Infinitive] #Adjective? #Singular #Singular", group: 0, tag: "Imperative", reason: "maintain-eye-contact" }, { match: "do not (forget|omit|neglect) to [#Infinitive]", group: 0, tag: "Imperative", reason: "do-not-forget" }, { match: "^[(ask|wear|pay|look|help|show|watch|act|fix|kill|stop|start|turn|try|win)] #Noun", group: 0, tag: "Imperative", reason: "pay-attention" }], [{ match: "(that|which) were [%Adj|Gerund%]", group: 0, tag: "Gerund", reason: "that-were-growing" }, { match: "#Gerund [#Gerund] #Plural", group: 0, tag: "Adjective", reason: "hard-working-fam" }], [{ match: "u r", tag: "#Pronoun #Copula", reason: "u r" }, { match: "#Noun [(who|whom)]", group: 0, tag: "Determiner", reason: "captain-who" }, { match: "[had] #Noun+ #PastTense", group: 0, tag: "Condition", reason: "had-he" }, { match: "[were] #Noun+ to #Infinitive", group: 0, tag: "Condition", reason: "were-he" }, { match: "some sort of", tag: "Adjective Noun Conjunction", reason: "some-sort-of" }, { match: "of some sort", tag: "Conjunction Adjective Noun", reason: "of-some-sort" }, { match: "[such] (a|an|is)? #Noun", group: 0, tag: "Determiner", reason: "such-skill" }, { match: "[right] (before|after|in|into|to|toward)", group: 0, tag: "#Adverb", reason: "right-into" }, { match: "#Preposition [about]", group: 0, tag: "Adjective", reason: "at-about" }, { match: "(are|#Modal|see|do|for) [ya]", group: 0, tag: "Pronoun", reason: "are-ya" }, { match: "[long live] .", group: 0, tag: "#Adjective #Infinitive", reason: "long-live" }, { match: "[plenty] of", group: 0, tag: "#Uncountable", reason: "plenty-of" }, { match: "(always|nearly|barely|practically) [there]", group: 0, tag: "Adjective", reason: "always-there" }, { match: "[there] (#Adverb|#Pronoun)? #Copula", group: 0, tag: "There", reason: "there-is" }, { match: "#Copula [there] .", group: 0, tag: "There", reason: "is-there" }, { match: "#Modal #Adverb? [there]", group: 0, tag: "There", reason: "should-there" }, { match: "^[do] (you|we|they)", group: 0, tag: "QuestionWord", reason: "do-you" }, { match: "^[does] (he|she|it|#ProperNoun)", group: 0, tag: "QuestionWord", reason: "does-he" }, { match: "#Determiner #Noun+ [who] #Verb", group: 0, tag: "Preposition", reason: "the-x-who" }, { match: "#Determiner #Noun+ [which] #Verb", group: 0, tag: "Preposition", reason: "the-x-which" }, { match: "a [while]", group: 0, tag: "Noun", reason: "a-while" }, { match: "guess who", tag: "#Infinitive #QuestionWord", reason: "guess-who" }, { match: "[fucking] !#Verb", group: 0, tag: "#Gerund", reason: "f-as-gerund" }], [{ match: "university of #Place", tag: "Organization", reason: "university-of-Foo" }, { match: "#Noun (&|n) #Noun", tag: "Organization", reason: "Noun-&-Noun" }, { match: "#Organization of the? #ProperNoun", tag: "Organization", reason: "org-of-place", safe: true }, { match: "#Organization #Country", tag: "Organization", reason: "org-country" }, { match: "#ProperNoun #Organization", tag: "Organization", notIf: "#FirstName", reason: "titlecase-org" }, { match: "#ProperNoun (ltd|co|inc|dept|assn|bros)", tag: "Organization", reason: "org-abbrv" }, { match: "the [#Acronym]", group: 0, tag: "Organization", reason: "the-acronym", safe: true }, { match: "government of the? [#Place+]", tag: "Organization", reason: "government-of-x" }, { match: "(health|school|commerce) board", tag: "Organization", reason: "school-board" }, { match: "(nominating|special|conference|executive|steering|central|congressional) committee", tag: "Organization", reason: "special-comittee" }, { match: "(world|global|international|national|#Demonym) #Organization", tag: "Organization", reason: "global-org" }, { match: "#Noun+ (public|private) school", tag: "School", reason: "noun-public-school" }, { match: "#Place+ #SportsTeam", tag: "SportsTeam", reason: "place-sportsteam" }, { match: "(dc|atlanta|minnesota|manchester|newcastle|sheffield) united", tag: "SportsTeam", reason: "united-sportsteam" }, { match: "#Place+ fc", tag: "SportsTeam", reason: "fc-sportsteam" }, { match: "#Place+ #Noun{0,2} (club|society|group|team|committee|commission|association|guild|crew)", tag: "Organization", reason: "place-noun-society" }], [{ match: "(west|north|south|east|western|northern|southern|eastern)+ #Place", tag: "Region", reason: "west-norfolk" }, { match: "#City [(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|pa|sc|tn|tx|ut|vt|pr)]", group: 0, tag: "Region", reason: "us-state" }, { match: "portland [or]", group: 0, tag: "Region", reason: "portland-or" }, { match: "(eat|ate|eating|roast|roasted|thanksgiving|with) [turkey]", group: 0, unTag: "Place", tag: "Uncountable", reason: "food-turkey" }, { match: "[turkey] (roast|dinner|sandwich|burger)", group: 0, unTag: "Place", tag: "Uncountable", reason: "turkey-food" }, { match: "#Place [turkey]", group: 0, tag: "Country", reason: "ankara turkey" }, { match: "(in|near|nearby|to|from) [turkey]", group: 0, tag: "Country", reason: "near turkey" }, { match: "#ProperNoun+ (cliff|place|range|pit|place|point|room|grounds|ruins)", tag: "Place", reason: "foo-point" }, { match: "in [#ProperNoun] #Place", group: 0, tag: "Place", reason: "propernoun-place" }, { match: "#Value #Noun+ (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave|lane|boulevard|blvd|drive|dr|parkway|way)", tag: "Address", reason: "address-st" }, { match: "(port|mount|mt) #ProperName", tag: "Place", reason: "port-name" }, { match: "#Address in #Place", tag: "Place", reason: "address-place" }], [{ match: "[so] #Noun", group: 0, tag: "Conjunction", reason: "so-conj" }, { match: "[(who|what|where|why|how|when)] #Noun #Copula #Adverb? (#Verb|#Adjective)", group: 0, tag: "Conjunction", reason: "how-he-is-x" }, { match: "#Copula [(who|what|where|why|how|when)] #Noun", group: 0, tag: "Conjunction", reason: "when-he" }, { match: "#Verb [that] #Pronoun", group: 0, tag: "Conjunction", reason: "said-that-he" }, { match: "#Noun [that] #Copula", group: 0, tag: "Conjunction", reason: "that-are" }, { match: "#Noun [that] #Verb #Adjective", group: 0, tag: "Conjunction", reason: "that-seem" }, { match: "#Noun #Copula not? [that] #Adjective", group: 0, tag: "Adverb", reason: "that-adj" }, { match: "[to] (#Determiner|#Possessive|#Pronoun)", group: 0, unTag: "Conjunction", tag: "Preposition", reason: "to-the-store" }, { match: "#Verb #Adverb? #Noun [(that|which)]", group: 0, tag: "Preposition", reason: "that-prep" }, { match: "@hasComma [which] (#Pronoun|#Verb)", group: 0, tag: "Preposition", reason: "which-copula" }, { match: "#Noun [like] #Noun", group: 0, tag: "Preposition", reason: "noun-like" }, { match: "^[like] #Determiner", group: 0, tag: "Preposition", reason: "like-the" }, { match: "a #Noun [like] (#Noun|#Determiner)", group: 0, tag: "Preposition", reason: "a-noun-like" }, { match: "#Adverb [like]", group: 0, tag: "Verb", reason: "really-like" }, { match: "(not|nothing|never) [like]", group: 0, tag: "Preposition", reason: "nothing-like" }, { match: "#Infinitive #Pronoun [like]", group: 0, tag: "Preposition", reason: "treat-them-like" }, { match: "[#QuestionWord] (#Pronoun|#Determiner)", group: 0, tag: "Preposition", reason: "how-he" }, { match: "[#QuestionWord] #Participle", group: 0, tag: "Preposition", reason: "when-stolen" }, { match: "[how] (#Determiner|#Copula|#Modal|#PastTense)", group: 0, tag: "QuestionWord", reason: "how-is" }, { match: "#Plural [(who|which|when)] .", group: 0, tag: "Preposition", reason: "people-who" }], [{ match: "holy (shit|fuck|hell)", tag: "Expression", reason: "swears-expression" }, { match: "^[(well|so|okay|now)] !#Adjective?", group: 0, tag: "Expression", reason: "well-" }, { match: "^come on", tag: "Expression", reason: "come-on" }, { match: "(say|says|said) [sorry]", group: 0, tag: "Expression", reason: "say-sorry" }, { match: "^(ok|alright|shoot|hell|anyways)", tag: "Expression", reason: "ok-" }, { match: "^(say && @hasComma)", tag: "Expression", reason: "say-" }, { match: "^(like && @hasComma)", tag: "Expression", reason: "like-" }, { match: "^[(dude|man|girl)] #Pronoun", group: 0, tag: "Expression", reason: "dude-i" }]);
        let ql = null;
        var Ul = { postTagger: function(e2) {
          const { world: t2 } = e2, { model: n2, methods: r2 } = t2;
          ql = ql || r2.one.buildNet(n2.two.matches, t2);
          const o2 = r2.two.quickSplit(e2.document).map((e3) => {
            const t3 = e3[0];
            return [t3.index[0], t3.index[1], t3.index[1] + e3.length];
          }), a2 = e2.update(o2);
          return a2.cache(), a2.sweep(ql), e2.uncache(), e2.unfreeze(), e2;
        }, tagger: (e2) => e2.compute(["freeze", "lexicon", "preTagger", "postTagger", "unfreeze"]) };
        const Rl = { api: function(e2) {
          e2.prototype.confidence = function() {
            let e3 = 0, t2 = 0;
            return this.docs.forEach((n2) => {
              n2.forEach((n3) => {
                t2 += 1, e3 += n3.confidence || 1;
              });
            }), 0 === t2 ? 1 : ((e4) => Math.round(100 * e4) / 100)(e3 / t2);
          }, e2.prototype.tagger = function() {
            return this.compute(["tagger"]);
          };
        }, compute: Ul, model: { two: { matches: Wl } }, hooks: ["postTagger"] }, Ql = function(e2, t2) {
          const n2 = function(e3) {
            return Object.keys(e3.hooks).filter((e4) => !e4.startsWith("#") && !e4.startsWith("%"));
          }(t2);
          if (0 === n2.length) return e2;
          e2._cache || e2.cache();
          const r2 = e2._cache;
          return e2.filter((e3, t3) => n2.some((e4) => r2[t3].has(e4)));
        };
        var _l = { lib: { lazy: function(e2, t2) {
          let n2 = t2;
          "string" == typeof t2 && (n2 = this.buildNet([{ match: t2 }]));
          const r2 = this.tokenize(e2), o2 = Ql(r2, n2);
          return o2.found ? (o2.compute(["index", "tagger"]), o2.match(t2)) : r2.none();
        } } };
        const Zl = function(e2, t2, n2) {
          let r2 = e2.split(/ /g).map((e3) => e3.toLowerCase().trim());
          r2 = r2.filter((e3) => e3), r2 = r2.map((e3) => `{${e3}}`).join(" ");
          let o2 = this.match(r2);
          return n2 && (o2 = o2.if(n2)), o2.has("#Verb") ? function(e3, t3) {
            let n3 = t3;
            return e3.forEach((e4) => {
              e4.has("#Infinitive") || (n3 = function(e5, t4) {
                const n4 = (0, e5.methods.two.transform.verb.conjugate)(t4, e5.model);
                return e5.has("#Gerund") ? n4.Gerund : e5.has("#PastTense") ? n4.PastTense : e5.has("#PresentTense") ? n4.PresentTense : e5.has("#Gerund") ? n4.Gerund : t4;
              }(e4, t3)), e4.replaceWith(n3);
            }), e3;
          }(o2, t2) : o2.has("#Noun") ? function(e3, t3) {
            let n3 = t3;
            e3.has("#Plural") && (n3 = (0, e3.methods.two.transform.noun.toPlural)(t3, e3.model));
            e3.replaceWith(n3, { possessives: true });
          }(o2, t2) : o2.has("#Adverb") ? function(e3, t3) {
            const { toAdverb: n3 } = e3.methods.two.transform.adjective, r3 = n3(t3);
            r3 && e3.replaceWith(r3);
          }(o2, t2) : o2.has("#Adjective") ? function(e3, t3) {
            const { toComparative: n3, toSuperlative: r3 } = e3.methods.two.transform.adjective;
            let o3 = t3;
            e3.has("#Comparative") ? o3 = n3(o3, e3.model) : e3.has("#Superlative") && (o3 = r3(o3, e3.model)), o3 && e3.replaceWith(o3);
          }(o2, t2) : this;
        };
        var Xl = { api: function(e2) {
          e2.prototype.swap = Zl;
        } };
        d.plugin(vl), d.plugin(Kl), d.plugin(Rl), d.plugin(_l), d.plugin(Xl);
        const Yl = function(e2) {
          const { fromComparative: t2, fromSuperlative: n2 } = e2.methods.two.transform.adjective, r2 = e2.text("normal");
          return e2.has("#Comparative") ? t2(r2, e2.model) : e2.has("#Superlative") ? n2(r2, e2.model) : r2;
        };
        var eu = { api: function(e2) {
          class Adjectives extends e2 {
            constructor(e3, t2, n2) {
              super(e3, t2, n2), this.viewType = "Adjectives";
            }
            json(e3 = {}) {
              const { toAdverb: t2, toNoun: n2, toSuperlative: r2, toComparative: o2 } = this.methods.two.transform.adjective;
              return e3.normal = true, this.map((a2) => {
                const i2 = a2.toView().json(e3)[0] || {}, s2 = Yl(a2);
                return i2.adjective = { adverb: t2(s2, this.model), noun: n2(s2, this.model), superlative: r2(s2, this.model), comparative: o2(s2, this.model) }, i2;
              }, []);
            }
            adverbs() {
              return this.before("#Adverb+$").concat(this.after("^#Adverb+"));
            }
            conjugate(e3) {
              const { toComparative: t2, toSuperlative: n2, toNoun: r2, toAdverb: o2 } = this.methods.two.transform.adjective;
              return this.getNth(e3).map((e4) => {
                const a2 = Yl(e4);
                return { Adjective: a2, Comparative: t2(a2, this.model), Superlative: n2(a2, this.model), Noun: r2(a2, this.model), Adverb: o2(a2, this.model) };
              }, []);
            }
            toComparative(e3) {
              const { toComparative: t2 } = this.methods.two.transform.adjective;
              return this.getNth(e3).map((e4) => {
                const n2 = Yl(e4), r2 = t2(n2, this.model);
                return e4.replaceWith(r2);
              });
            }
            toSuperlative(e3) {
              const { toSuperlative: t2 } = this.methods.two.transform.adjective;
              return this.getNth(e3).map((e4) => {
                const n2 = Yl(e4), r2 = t2(n2, this.model);
                return e4.replaceWith(r2);
              });
            }
            toAdverb(e3) {
              const { toAdverb: t2 } = this.methods.two.transform.adjective;
              return this.getNth(e3).map((e4) => {
                const n2 = Yl(e4), r2 = t2(n2, this.model);
                return e4.replaceWith(r2);
              });
            }
            toNoun(e3) {
              const { toNoun: t2 } = this.methods.two.transform.adjective;
              return this.getNth(e3).map((e4) => {
                const n2 = Yl(e4), r2 = t2(n2, this.model);
                return e4.replaceWith(r2);
              });
            }
          }
          e2.prototype.adjectives = function(e3) {
            let t2 = this.match("#Adjective");
            return t2 = t2.getNth(e3), new Adjectives(t2.document, t2.pointer);
          }, e2.prototype.superlatives = function(e3) {
            let t2 = this.match("#Superlative");
            return t2 = t2.getNth(e3), new Adjectives(t2.document, t2.pointer);
          }, e2.prototype.comparatives = function(e3) {
            let t2 = this.match("#Comparative");
            return t2 = t2.getNth(e3), new Adjectives(t2.document, t2.pointer);
          };
        } };
        var tu = { api: function(e2) {
          class Adverbs extends e2 {
            constructor(e3, t2, n2) {
              super(e3, t2, n2), this.viewType = "Adverbs";
            }
            conjugate(e3) {
              return this.getNth(e3).map((e4) => {
                const t2 = function(e5) {
                  return e5.compute("root").text("root");
                }(e4);
                return { Adverb: e4.text("normal"), Adjective: t2 };
              }, []);
            }
            json(e3 = {}) {
              const t2 = this.methods.two.transform.adjective.fromAdverb;
              return e3.normal = true, this.map((n2) => {
                const r2 = n2.toView().json(e3)[0] || {};
                return r2.adverb = { adjective: t2(r2.normal) }, r2;
              }, []);
            }
          }
          e2.prototype.adverbs = function(e3) {
            let t2 = this.match("#Adverb");
            return t2 = t2.getNth(e3), new Adverbs(t2.document, t2.pointer);
          };
        } };
        const nu = function(e2) {
          let t2 = this;
          t2 = function(e3) {
            let t3 = e3.parentheses();
            return t3 = t3.filter((e4) => e4.wordCount() >= 3 && e4.has("#Verb") && e4.has("#Noun")), e3.splitOn(t3);
          }(t2), t2 = function(e3) {
            let t3 = e3.quotations();
            return t3 = t3.filter((e4) => e4.wordCount() >= 3 && e4.has("#Verb") && e4.has("#Noun")), e3.splitOn(t3);
          }(t2), t2 = function(e3) {
            let t3 = e3.match("@hasComma");
            return t3 = t3.filter((e4) => {
              if (1 === e4.growLeft(".").wordCount()) return false;
              if (1 === e4.growRight(". .").wordCount()) return false;
              let t4 = e4.grow(".");
              return t4 = t4.ifNo("@hasComma @hasComma"), t4 = t4.ifNo("@hasComma (and|or) ."), t4 = t4.ifNo("(#City && @hasComma) #Country"), t4 = t4.ifNo("(#WeekDay && @hasComma) #Date"), t4 = t4.ifNo("(#Date+ && @hasComma) #Value"), t4 = t4.ifNo("(#Adjective && @hasComma) #Adjective"), t4.found;
            }), e3.splitAfter(t3);
          }(t2), t2 = t2.splitAfter("(@hasEllipses|@hasSemicolon|@hasDash|@hasColon)"), t2 = t2.splitAfter("^#Pronoun (said|says)"), t2 = t2.splitBefore("(said|says) #ProperNoun$"), t2 = t2.splitBefore(". . if .{4}"), t2 = t2.splitBefore("and while"), t2 = t2.splitBefore("now that"), t2 = t2.splitBefore("ever since"), t2 = t2.splitBefore("(supposing|although)"), t2 = t2.splitBefore("even (while|if|though)"), t2 = t2.splitBefore("(whereas|whose)"), t2 = t2.splitBefore("as (though|if)"), t2 = t2.splitBefore("(til|until)");
          const n2 = t2.match("#Verb .* [but] .* #Verb", 0);
          n2.found && (t2 = t2.splitBefore(n2));
          const r2 = t2.if("if .{2,9} then .").match("then");
          return t2 = t2.splitBefore(r2), "number" == typeof e2 && (t2 = t2.get(e2)), t2;
        }, ru = { this: "Noun", then: "Pivot" }, ou = [{ match: "[that] #Determiner #Noun", group: 0, chunk: "Pivot" }, { match: "#PastTense [that]", group: 0, chunk: "Pivot" }, { match: "[so] #Determiner", group: 0, chunk: "Pivot" }, { match: "#Copula #Adverb+? [#Adjective]", group: 0, chunk: "Adjective" }, { match: "#Adjective and #Adjective", chunk: "Adjective" }, { match: "#Adverb+ and #Adverb #Verb", chunk: "Verb" }, { match: "#Gerund #Adjective$", chunk: "Verb" }, { match: "#Gerund to #Verb", chunk: "Verb" }, { match: "#PresentTense and #PresentTense", chunk: "Verb" }, { match: "#Adverb #Negative", chunk: "Verb" }, { match: "(want|wants|wanted) to #Infinitive", chunk: "Verb" }, { match: "#Verb #Reflexive", chunk: "Verb" }, { match: "#Verb [to] #Adverb? #Infinitive", group: 0, chunk: "Verb" }, { match: "[#Preposition] #Gerund", group: 0, chunk: "Verb" }, { match: "#Infinitive [that] <Noun>", group: 0, chunk: "Verb" }, { match: "#Noun of #Determiner? #Noun", chunk: "Noun" }, { match: "#Value+ #Adverb? #Adjective", chunk: "Noun" }, { match: "the [#Adjective] #Noun", chunk: "Noun" }, { match: "#Singular in #Determiner? #Singular", chunk: "Noun" }, { match: "#Plural [in] #Determiner? #Noun", group: 0, chunk: "Pivot" }, { match: "#Noun and #Determiner? #Noun", notIf: "(#Possessive|#Pronoun)", chunk: "Noun" }];
        let au = null;
        const iu = function(e2, t2) {
          if (("undefined" != typeof process && process.env ? process.env : self.env || {}).DEBUG_CHUNKS) {
            const n2 = (e2.normal + "'").padEnd(8);
            console.log(`  | '${n2}  \u2192  \x1B[34m${t2.padEnd(12)}\x1B[0m \x1B[2m -fallback- \x1B[0m`);
          }
          e2.chunk = t2;
        };
        var su = { chunks: function(e2) {
          const { document: t2, world: n2 } = e2;
          !function(e3) {
            for (let t3 = 0; t3 < e3.length; t3 += 1) for (let n3 = 0; n3 < e3[t3].length; n3 += 1) {
              const r2 = e3[t3][n3];
              true !== ru.hasOwnProperty(r2.normal) ? r2.tags.has("Verb") ? r2.chunk = "Verb" : r2.tags.has("Noun") || r2.tags.has("Determiner") || r2.tags.has("Value") ? r2.chunk = "Noun" : r2.tags.has("QuestionWord") && (r2.chunk = "Pivot") : r2.chunk = ru[r2.normal];
            }
          }(t2), function(e3) {
            for (let t3 = 0; t3 < e3.length; t3 += 1) for (let n3 = 0; n3 < e3[t3].length; n3 += 1) {
              const r2 = e3[t3][n3];
              if (r2.chunk) continue;
              const o2 = e3[t3][n3 + 1], a2 = e3[t3][n3 - 1];
              if (r2.tags.has("Adjective")) {
                if (a2 && a2.tags.has("Copula")) {
                  r2.chunk = "Adjective";
                  continue;
                }
                if (a2 && a2.tags.has("Determiner")) {
                  r2.chunk = "Noun";
                  continue;
                }
                if (o2 && o2.tags.has("Noun")) {
                  r2.chunk = "Noun";
                  continue;
                }
              } else if (r2.tags.has("Adverb") || r2.tags.has("Negative")) {
                if (a2 && a2.tags.has("Adjective")) {
                  r2.chunk = "Adjective";
                  continue;
                }
                if (a2 && a2.tags.has("Verb")) {
                  r2.chunk = "Verb";
                  continue;
                }
                if (o2 && o2.tags.has("Adjective")) {
                  r2.chunk = "Adjective";
                  continue;
                }
                if (o2 && o2.tags.has("Verb")) {
                  r2.chunk = "Verb";
                  continue;
                }
              }
            }
          }(t2), function(e3, t3, n3) {
            const { methods: r2 } = n3;
            au = au || r2.one.buildNet(ou, n3), e3.sweep(au);
          }(e2, 0, n2), function(e3) {
            for (let t3 = 0; t3 < e3.length; t3 += 1) for (let n3 = 0; n3 < e3[t3].length; n3 += 1) {
              const r2 = e3[t3][n3];
              void 0 === r2.chunk && (r2.tags.has("Conjunction") || r2.tags.has("Preposition") ? iu(r2, "Pivot") : r2.tags.has("Adverb") ? iu(r2, "Verb") : r2.chunk = "Noun");
            }
          }(t2), function(e3) {
            const t3 = [];
            let n3 = null;
            e3.forEach((e4) => {
              for (let r2 = 0; r2 < e4.length; r2 += 1) {
                const o2 = e4[r2];
                n3 && o2.chunk === n3 ? t3[t3.length - 1].terms.push(o2) : (t3.push({ chunk: o2.chunk, terms: [o2] }), n3 = o2.chunk);
              }
            }), t3.forEach((e4) => {
              if ("Verb" === e4.chunk) {
                const t4 = e4.terms.find((e5) => e5.tags.has("Verb"));
                t4 || e4.terms.forEach((e5) => e5.chunk = null);
              }
            });
          }(t2);
        } }, lu = { compute: su, api: function(e2) {
          class Chunks extends e2 {
            constructor(e3, t2, n2) {
              super(e3, t2, n2), this.viewType = "Chunks";
            }
            isVerb() {
              return this.filter((e3) => e3.has("<Verb>"));
            }
            isNoun() {
              return this.filter((e3) => e3.has("<Noun>"));
            }
            isAdjective() {
              return this.filter((e3) => e3.has("<Adjective>"));
            }
            isPivot() {
              return this.filter((e3) => e3.has("<Pivot>"));
            }
            debug() {
              return this.toView().debug("chunks"), this;
            }
            update(e3) {
              const t2 = new Chunks(this.document, e3);
              return t2._cache = this._cache, t2;
            }
          }
          e2.prototype.chunks = function(e3) {
            let t2 = function(e4) {
              const t3 = [];
              let n2 = null;
              return e4.clauses().docs.forEach((e5) => {
                e5.forEach((e6) => {
                  e6.chunk && e6.chunk === n2 ? t3[t3.length - 1][2] = e6.index[1] + 1 : (n2 = e6.chunk, t3.push([e6.index[0], e6.index[1], e6.index[1] + 1]));
                }), n2 = null;
              }), e4.update(t3);
            }(this);
            return t2 = t2.getNth(e3), new Chunks(this.document, t2.pointer);
          }, e2.prototype.clauses = nu;
        }, hooks: ["chunks"] };
        const uu = /\./g, cu = /\(/, hu = /\)/, du = function(e2, t2) {
          for (; t2 < e2.length; t2 += 1) if (e2[t2].post && hu.test(e2[t2].post)) {
            let [, n2] = e2[t2].index;
            return n2 = n2 || 0, n2;
          }
          return null;
        }, gu = function(e2) {
          class Parentheses extends e2 {
            constructor(e3, t2, n2) {
              super(e3, t2, n2), this.viewType = "Possessives";
            }
            strip() {
              return function(e3) {
                return e3.docs.forEach((e4) => {
                  e4[0].pre = e4[0].pre.replace(cu, "");
                  const t2 = e4[e4.length - 1];
                  t2.post = t2.post.replace(hu, "");
                }), e3;
              }(this);
            }
          }
          e2.prototype.parentheses = function(e3) {
            let t2 = function(e4) {
              const t3 = [];
              return e4.docs.forEach((e5) => {
                for (let n2 = 0; n2 < e5.length; n2 += 1) {
                  const r2 = e5[n2];
                  if (r2.pre && cu.test(r2.pre)) {
                    const r3 = du(e5, n2);
                    if (null !== r3) {
                      const [o2, a2] = e5[n2].index;
                      t3.push([o2, a2, r3 + 1, e5[n2].id]), n2 = r3;
                    }
                  }
                }
              }), e4.update(t3);
            }(this);
            return t2 = t2.getNth(e3), new Parentheses(t2.document, t2.pointer);
          };
        }, mu = /'s$/, pu = { '"': '"', "\uFF02": "\uFF02", "'": "'", "\u201C": "\u201D", "\u2018": "\u2019", "\u201F": "\u201D", "\u201B": "\u2019", "\u201E": "\u201D", "\u2E42": "\u201D", "\u201A": "\u2019", "\xAB": "\xBB", "\u2039": "\u203A", "\u2035": "\u2032", "\u2036": "\u2033", "\u2037": "\u2034", "\u301D": "\u301E", "`": "\xB4", "\u301F": "\u301E" }, fu = RegExp("[" + Object.keys(pu).join("") + "]"), bu = RegExp("[" + Object.values(pu).join("") + "]"), vu = function(e2, t2) {
          const n2 = e2[t2].pre.match(fu)[0] || "";
          if (!n2 || !pu[n2]) return null;
          const r2 = pu[n2];
          for (; t2 < e2.length; t2 += 1) if (e2[t2].post && e2[t2].post.match(r2)) return t2;
          return null;
        }, yu = function(e2) {
          class Quotations extends e2 {
            constructor(e3, t2, n2) {
              super(e3, t2, n2), this.viewType = "Possessives";
            }
            strip() {
              return function(e3) {
                e3.docs.forEach((e4) => {
                  e4[0].pre = e4[0].pre.replace(fu, "");
                  const t2 = e4[e4.length - 1];
                  t2.post = t2.post.replace(bu, "");
                });
              }(this);
            }
          }
          e2.prototype.quotations = function(e3) {
            let t2 = function(e4) {
              const t3 = [];
              return e4.docs.forEach((e5) => {
                for (let n2 = 0; n2 < e5.length; n2 += 1) {
                  const r2 = e5[n2];
                  if (r2.pre && fu.test(r2.pre)) {
                    const r3 = vu(e5, n2);
                    if (null !== r3) {
                      const [o2, a2] = e5[n2].index;
                      t3.push([o2, a2, r3 + 1, e5[n2].id]), n2 = r3;
                    }
                  }
                }
              }), e4.update(t3);
            }(this);
            return t2 = t2.getNth(e3), new Quotations(t2.document, t2.pointer);
          };
        }, wu = function(e2) {
          let t2 = this.splitAfter("@hasComma");
          return t2 = t2.match("#PhoneNumber+"), t2 = t2.getNth(e2), t2;
        }, ku = function(e2) {
          let t2 = this.match("#Address+");
          return t2 = t2.getNth(e2), t2;
        }, Pu = [["hyphenated", "@hasHyphen ."], ["hashTags", "#HashTag"], ["emails", "#Email"], ["emoji", "#Emoji"], ["emoticons", "#Emoticon"], ["atMentions", "#AtMention"], ["urls", "#Url"], ["conjunctions", "#Conjunction"], ["prepositions", "#Preposition"], ["abbreviations", "#Abbreviation"], ["honorifics", "#Honorific"]], Au = [["emojis", "emoji"], ["atmentions", "atMentions"]], Nu = /\//;
        var Cu = { api: function(e2) {
          !function(e3) {
            class Acronyms extends e3 {
              constructor(e4, t2, n2) {
                super(e4, t2, n2), this.viewType = "Acronyms";
              }
              strip() {
                return this.docs.forEach((e4) => {
                  e4.forEach((e5) => {
                    e5.text = e5.text.replace(uu, ""), e5.normal = e5.normal.replace(uu, "");
                  });
                }), this;
              }
              addPeriods() {
                return this.docs.forEach((e4) => {
                  e4.forEach((e5) => {
                    e5.text = e5.text.replace(uu, ""), e5.normal = e5.normal.replace(uu, ""), e5.text = e5.text.split("").join(".") + ".", e5.normal = e5.normal.split("").join(".") + ".";
                  });
                }), this;
              }
            }
            e3.prototype.acronyms = function(e4) {
              let t2 = this.match("#Acronym");
              return t2 = t2.getNth(e4), new Acronyms(t2.document, t2.pointer);
            };
          }(e2), gu(e2), function(e3) {
            class Possessives extends e3 {
              constructor(e4, t2, n2) {
                super(e4, t2, n2), this.viewType = "Possessives";
              }
              strip() {
                return this.docs.forEach((e4) => {
                  e4.forEach((e5) => {
                    e5.text = e5.text.replace(mu, ""), e5.normal = e5.normal.replace(mu, "");
                  });
                }), this;
              }
            }
            e3.prototype.possessives = function(e4) {
              let t2 = function(e5) {
                let t3 = e5.match("#Possessive+");
                return t3.has("#Person") && (t3 = t3.growLeft("#Person+")), t3.has("#Place") && (t3 = t3.growLeft("#Place+")), t3.has("#Organization") && (t3 = t3.growLeft("#Organization+")), t3;
              }(this);
              return t2 = t2.getNth(e4), new Possessives(t2.document, t2.pointer);
            };
          }(e2), yu(e2), function(e3) {
            Pu.forEach((t2) => {
              e3.prototype[t2[0]] = function(e4) {
                const n2 = this.match(t2[1]);
                return "number" == typeof e4 ? n2.get(e4) : n2;
              };
            }), e3.prototype.phoneNumbers = wu, e3.prototype.addresses = ku, Au.forEach((t2) => {
              e3.prototype[t2[0]] = e3.prototype[t2[1]];
            });
          }(e2), function(e3) {
            class Slashes extends e3 {
              constructor(e4, t2, n2) {
                super(e4, t2, n2), this.viewType = "Slashes";
              }
              split() {
                return this.map((e4) => {
                  const t2 = e4.text().split(Nu);
                  return (e4 = e4.replaceWith(t2.join(" "))).growRight("(" + t2.join("|") + ")+");
                });
              }
            }
            e3.prototype.slashes = function(e4) {
              let t2 = this.match("#SlashedTerm");
              return t2 = t2.getNth(e4), new Slashes(t2.document, t2.pointer);
            };
          }(e2);
        } };
        const ju = function(e2, t2) {
          e2.docs.forEach((e3) => {
            e3.forEach(t2);
          });
        };
        var xu = { case: (e2) => {
          ju(e2, (e3) => {
            e3.text = e3.text.toLowerCase();
          });
        }, unicode: (e2) => {
          const t2 = e2.world, n2 = t2.methods.one.killUnicode;
          ju(e2, (e3) => e3.text = n2(e3.text, t2));
        }, whitespace: (e2) => {
          ju(e2, (e3) => {
            e3.post = e3.post.replace(/\s+/g, " "), e3.post = e3.post.replace(/\s([.,?!:;])/g, "$1"), e3.pre = e3.pre.replace(/\s+/g, "");
          });
        }, punctuation: (e2) => {
          ju(e2, (e3) => {
            e3.post = e3.post.replace(/[–—-]/g, " "), e3.post = e3.post.replace(/[,:;]/g, ""), e3.post = e3.post.replace(/\.{2,}/g, ""), e3.post = e3.post.replace(/\?{2,}/g, "?"), e3.post = e3.post.replace(/!{2,}/g, "!"), e3.post = e3.post.replace(/\?!+/g, "?");
          });
          const t2 = e2.docs, n2 = t2[t2.length - 1];
          if (n2 && n2.length > 0) {
            const e3 = n2[n2.length - 1];
            e3.post = e3.post.replace(/ /g, "");
          }
        }, contractions: (e2) => {
          e2.contractions().expand();
        }, acronyms: (e2) => {
          e2.acronyms().strip();
        }, parentheses: (e2) => {
          e2.parentheses().strip();
        }, possessives: (e2) => {
          e2.possessives().strip();
        }, quotations: (e2) => {
          e2.quotations().strip();
        }, emoji: (e2) => {
          e2.emojis().remove();
        }, honorifics: (e2) => {
          e2.match("#Honorific+ #Person").honorifics().remove();
        }, adverbs: (e2) => {
          e2.adverbs().remove();
        }, nouns: (e2) => {
          e2.nouns().toSingular();
        }, verbs: (e2) => {
          e2.verbs().toInfinitive();
        }, numbers: (e2) => {
          e2.numbers().toNumber();
        }, debullet: (e2) => {
          const t2 = /^\s*([-–—*•])\s*$/;
          return e2.docs.forEach((e3) => {
            t2.test(e3[0].pre) && (e3[0].pre = e3[0].pre.replace(t2, ""));
          }), e2;
        } };
        const Iu = (e2) => e2.split("|").reduce((e3, t2) => (e3[t2] = true, e3), {}), Tu = "unicode|punctuation|whitespace|acronyms", Du = "|case|contractions|parentheses|quotations|emoji|honorifics|debullet", Hu = { light: Iu(Tu), medium: Iu(Tu + Du), heavy: Iu(Tu + Du + "|possessives|adverbs|nouns|verbs") };
        var Eu = { api: function(e2) {
          e2.prototype.normalize = function(e3 = "light") {
            return "string" == typeof e3 && (e3 = Hu[e3]), Object.keys(e3).forEach((t2) => {
              xu.hasOwnProperty(t2) && xu[t2](this, e3[t2]);
            }), this;
          };
        } };
        const Gu = ["after", "although", "as if", "as long as", "as", "because", "before", "even if", "even though", "ever since", "if", "in order that", "provided that", "since", "so that", "than", "that", "though", "unless", "until", "what", "whatever", "when", "whenever", "where", "whereas", "wherever", "whether", "which", "whichever", "who", "whoever", "whom", "whomever", "whose"], Ou = function(e2) {
          if (e2.before("#Preposition$").found) return true;
          if (!e2.before().found) return false;
          for (let t2 = 0; t2 < Gu.length; t2 += 1) if (e2.has(Gu[t2])) return true;
          return false;
        }, Fu = function(e2, t2) {
          if (e2.has("#Plural")) return true;
          if (e2.has("#Noun and #Noun")) return true;
          if (e2.has("(we|they)")) return true;
          if (true === t2.has("(#Pronoun|#Place|#Value|#Person|#Uncountable|#Month|#WeekDay|#Holiday|#Possessive)")) return false;
          if (e2.has("#Singular")) return false;
          const n2 = t2.text("normal");
          return n2.length > 3 && n2.endsWith("s") && !n2.endsWith("ss");
        }, Vu = function(e2) {
          const t2 = function(e3) {
            let t3 = e3.clone();
            return t3 = t3.match("#Noun+"), t3 = t3.remove("(#Adjective|#Preposition|#Determiner|#Value)"), t3 = t3.not("#Possessive"), t3 = t3.first(), t3.found ? t3 : e3;
          }(e2);
          return { determiner: e2.match("#Determiner").eq(0), adjectives: e2.match("#Adjective"), number: e2.values(), isPlural: Fu(e2, t2), isSubordinate: Ou(e2), root: t2 };
        }, zu = (e2) => e2.text(), Bu = (e2) => e2.json({ terms: false, normal: true }).map((e3) => e3.normal), Su = function(e2) {
          if (!e2.found) return null;
          const t2 = e2.values(0);
          if (t2.found) {
            return (t2.parse()[0] || {}).num;
          }
          return null;
        }, $u = function(e2) {
          return !e2.has("^(#Uncountable|#ProperNoun|#Place|#Pronoun|#Acronym)+$");
        }, Mu = { tags: true }, Ku = { tags: true };
        var Lu = { api: function(e2) {
          class Nouns extends e2 {
            constructor(e3, t2, n2) {
              super(e3, t2, n2), this.viewType = "Nouns";
            }
            parse(e3) {
              return this.getNth(e3).map(Vu);
            }
            json(e3) {
              const t2 = "object" == typeof e3 ? e3 : {};
              return this.getNth(e3).map((e4) => {
                const n2 = e4.toView().json(t2)[0] || {};
                return t2 && false !== t2.noun && (n2.noun = function(e5) {
                  const t3 = Vu(e5);
                  return { root: zu(t3.root), number: Su(t3.number), determiner: zu(t3.determiner), adjectives: Bu(t3.adjectives), isPlural: t3.isPlural, isSubordinate: t3.isSubordinate };
                }(e4)), n2;
              }, []);
            }
            conjugate(e3) {
              const t2 = this.world.methods.two.transform.noun;
              return this.getNth(e3).map((e4) => {
                const n2 = Vu(e4), r2 = n2.root.compute("root").text("root"), o2 = { Singular: r2 };
                return $u(n2.root) && (o2.Plural = t2.toPlural(r2, this.model)), o2.Singular === o2.Plural && delete o2.Plural, o2;
              }, []);
            }
            isPlural(e3) {
              const t2 = this.filter((e4) => Vu(e4).isPlural);
              return t2.getNth(e3);
            }
            isSingular(e3) {
              const t2 = this.filter((e4) => !Vu(e4).isPlural);
              return t2.getNth(e3);
            }
            adjectives(e3) {
              let t2 = this.update([]);
              return this.forEach((e4) => {
                const n2 = Vu(e4).adjectives;
                n2.found && (t2 = t2.concat(n2));
              }), t2.getNth(e3);
            }
            toPlural(e3) {
              return this.getNth(e3).map((e4) => function(e5, t2) {
                if (true === t2.isPlural) return e5;
                if (t2.root.has("#Possessive") && (t2.root = t2.root.possessives().strip()), !$u(t2.root)) return e5;
                const { methods: n2, model: r2 } = e5.world, { toPlural: o2 } = n2.two.transform.noun, a2 = o2(t2.root.text({ keepPunct: false }), r2);
                e5.match(t2.root).replaceWith(a2, Mu).tag("Plural", "toPlural"), t2.determiner.has("(a|an)") && e5.remove(t2.determiner);
                const i2 = t2.root.after("not? #Adverb+? [#Copula]", 0);
                return i2.found && (i2.has("is") ? e5.replace(i2, "are") : i2.has("was") && e5.replace(i2, "were")), e5;
              }(e4, Vu(e4)));
            }
            toSingular(e3) {
              return this.getNth(e3).map((e4) => function(e5, t2) {
                if (false === t2.isPlural) return e5;
                const { methods: n2, model: r2 } = e5.world, { toSingular: o2 } = n2.two.transform.noun, a2 = o2(t2.root.text("normal"), r2);
                return e5.replace(t2.root, a2, Ku).tag("Singular", "toPlural"), e5;
              }(e4, Vu(e4)));
            }
            update(e3) {
              const t2 = new Nouns(this.document, e3);
              return t2._cache = this._cache, t2;
            }
          }
          e2.prototype.nouns = function(e3) {
            let t2 = function(e4) {
              let t3 = e4.clauses().match("<Noun>"), n2 = t3.match("@hasComma");
              return n2 = n2.not("#Place"), n2.found && (t3 = t3.splitAfter(n2)), t3 = t3.splitOn("#Expression"), t3 = t3.splitOn("(he|she|we|you|they|i)"), t3 = t3.splitOn("(#Noun|#Adjective) [(he|him|she|it)]", 0), t3 = t3.splitOn("[(he|him|she|it)] (#Determiner|#Value)", 0), t3 = t3.splitBefore("#Noun [(the|a|an)] #Adjective? #Noun", 0), t3 = t3.splitOn("[(here|there)] #Noun", 0), t3 = t3.splitOn("[#Noun] (here|there)", 0), t3 = t3.splitBefore("(our|my|their|your)"), t3 = t3.splitOn("#Noun [#Determiner]", 0), t3 = t3.if("#Noun"), t3;
            }(this);
            return t2 = t2.getNth(e3), new Nouns(this.document, t2.pointer);
          };
        } };
        var Ju = { ones: { zeroth: 0, first: 1, second: 2, third: 3, fourth: 4, fifth: 5, sixth: 6, seventh: 7, eighth: 8, ninth: 9, zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 }, teens: { tenth: 10, eleventh: 11, twelfth: 12, thirteenth: 13, fourteenth: 14, fifteenth: 15, sixteenth: 16, seventeenth: 17, eighteenth: 18, nineteenth: 19, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19 }, tens: { twentieth: 20, thirtieth: 30, fortieth: 40, fourtieth: 40, fiftieth: 50, sixtieth: 60, seventieth: 70, eightieth: 80, ninetieth: 90, twenty: 20, thirty: 30, forty: 40, fourty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 }, multiples: { hundredth: 100, thousandth: 1e3, millionth: 1e6, billionth: 1e9, trillionth: 1e12, quadrillionth: 1e15, quintillionth: 1e18, sextillionth: 1e21, septillionth: 1e24, hundred: 100, thousand: 1e3, million: 1e6, billion: 1e9, trillion: 1e12, quadrillion: 1e15, quintillion: 1e18, sextillion: 1e21, septillion: 1e24, grand: 1e3 } };
        const Wu = (e2, t2) => {
          if (Ju.ones.hasOwnProperty(e2)) {
            if (t2.ones || t2.teens) return false;
          } else if (Ju.teens.hasOwnProperty(e2)) {
            if (t2.ones || t2.teens || t2.tens) return false;
          } else if (Ju.tens.hasOwnProperty(e2) && (t2.ones || t2.teens || t2.tens)) return false;
          return true;
        }, qu = function(e2) {
          let t2 = "0.";
          for (let n2 = 0; n2 < e2.length; n2++) {
            const r2 = e2[n2];
            if (true === Ju.ones.hasOwnProperty(r2)) t2 += Ju.ones[r2];
            else if (true === Ju.teens.hasOwnProperty(r2)) t2 += Ju.teens[r2];
            else if (true === Ju.tens.hasOwnProperty(r2)) t2 += Ju.tens[r2];
            else {
              if (true !== /^[0-9]$/.test(r2)) return 0;
              t2 += r2;
            }
          }
          return parseFloat(t2);
        }, Uu = (e2) => e2 = (e2 = (e2 = (e2 = (e2 = (e2 = (e2 = (e2 = e2.replace(/1st$/, "1")).replace(/2nd$/, "2")).replace(/3rd$/, "3")).replace(/([4567890])r?th$/, "$1")).replace(/^[$€¥£¢]/, "")).replace(/[%$€¥£¢]$/, "")).replace(/,/g, "")).replace(/([0-9])([a-z\u00C0-\u00FF]{1,2})$/, "$1"), Ru = /^([0-9,. ]+)\/([0-9,. ]+)$/, Qu = { "a few": 3, "a couple": 2, "a dozen": 12, "two dozen": 24, zero: 0 }, _u = (e2) => Object.keys(e2).reduce((t2, n2) => t2 += e2[n2], 0), Zu = function(e2) {
          if (true === Qu.hasOwnProperty(e2)) return Qu[e2];
          if ("a" === e2 || "an" === e2) return 1;
          const t2 = ((e3) => {
            const t3 = [{ reg: /^(minus|negative)[\s-]/i, mult: -1 }, { reg: /^(a\s)?half[\s-](of\s)?/i, mult: 0.5 }];
            for (let n3 = 0; n3 < t3.length; n3++) if (true === t3[n3].reg.test(e3)) return { amount: t3[n3].mult, str: e3.replace(t3[n3].reg, "") };
            return { amount: 1, str: e3 };
          })(e2);
          let n2 = null, r2 = {}, o2 = 0, a2 = false;
          const i2 = (e2 = t2.str).split(/[ -]/);
          for (let e3 = 0; e3 < i2.length; e3++) {
            let s2 = i2[e3];
            if (s2 = Uu(s2), !s2 || "and" === s2) continue;
            if ("-" === s2 || "negative" === s2) {
              a2 = true;
              continue;
            }
            if ("-" === s2.charAt(0) && (a2 = true, s2 = s2.substring(1)), "point" === s2) return o2 += _u(r2), o2 += qu(i2.slice(e3 + 1, i2.length)), o2 *= t2.amount, o2;
            const l2 = s2.match(Ru);
            if (l2) {
              const e4 = parseFloat(l2[1].replace(/[, ]/g, "")), t3 = parseFloat(l2[2].replace(/[, ]/g, ""));
              t3 && (o2 += e4 / t3 || 0);
            } else {
              if (Ju.tens.hasOwnProperty(s2) && r2.ones && 1 === Object.keys(r2).length && (o2 = 100 * r2.ones, r2 = {}), false === Wu(s2, r2)) return null;
              if (/^[0-9.]+$/.test(s2)) r2.ones = parseFloat(s2);
              else if (true === Ju.ones.hasOwnProperty(s2)) r2.ones = Ju.ones[s2];
              else if (true === Ju.teens.hasOwnProperty(s2)) r2.teens = Ju.teens[s2];
              else if (true === Ju.tens.hasOwnProperty(s2)) r2.tens = Ju.tens[s2];
              else if (true === Ju.multiples.hasOwnProperty(s2)) {
                let t3 = Ju.multiples[s2];
                if (t3 === n2) return null;
                if (100 === t3 && void 0 !== i2[e3 + 1]) {
                  const n3 = i2[e3 + 1];
                  Ju.multiples[n3] && (t3 *= Ju.multiples[n3], e3 += 1);
                }
                null === n2 || t3 < n2 ? (o2 += (_u(r2) || 1) * t3, n2 = t3, r2 = {}) : (o2 += _u(r2), n2 = t3, o2 = (o2 || 1) * t3, r2 = {});
              }
            }
          }
          return o2 += _u(r2), o2 *= t2.amount, o2 *= a2 ? -1 : 1, 0 === o2 && 0 === Object.keys(r2).length ? null : o2;
        }, Xu = /s$/, Yu = function(e2) {
          const t2 = e2.text("reduced");
          return Zu(t2);
        }, ec = { half: 2, halve: 2, quarter: 4 }, tc = function(e2) {
          const t2 = function(e3) {
            const t3 = e3.text("reduced");
            return ec.hasOwnProperty(t3) ? { numerator: 1, denominator: ec[t3] } : null;
          }(e2 = e2.clone()) || function(e3) {
            const t3 = e3.text("reduced").match(/^([-+]?[0-9]+)\/([-+]?[0-9]+)(st|nd|rd|th)?s?$/);
            return t3 && t3[1] && t3[0] ? { numerator: Number(t3[1]), denominator: Number(t3[2]) } : null;
          }(e2) || function(e3) {
            const t3 = e3.match("[<num>#Value+] out of every? [<den>#Value+]");
            if (true !== t3.found) return null;
            let { num: n2, den: r2 } = t3.groups();
            return n2 && r2 ? (n2 = Yu(n2), r2 = Yu(r2), n2 && r2 && "number" == typeof n2 && "number" == typeof r2 ? { numerator: n2, denominator: r2 } : null) : null;
          }(e2) || function(e3) {
            const t3 = e3.match("[<num>(#Cardinal|a)+] [<den>#Fraction+]");
            if (true !== t3.found) return null;
            let { num: n2, den: r2 } = t3.groups();
            n2 = n2.has("a") ? 1 : Yu(n2);
            let o2 = r2.text("reduced");
            return Xu.test(o2) && (o2 = o2.replace(Xu, ""), r2 = r2.replaceWith(o2)), r2 = ec.hasOwnProperty(o2) ? ec[o2] : Yu(r2), "number" == typeof n2 && "number" == typeof r2 ? { numerator: n2, denominator: r2 } : null;
          }(e2) || function(e3) {
            const t3 = e3.match("^#Ordinal$");
            if (true !== t3.found) return null;
            if (e3.lookAhead("^of .")) return { numerator: 1, denominator: Yu(t3) };
            return null;
          }(e2) || null;
          return null !== t2 && t2.numerator && t2.denominator && (t2.decimal = t2.numerator / t2.denominator, t2.decimal = ((e3) => {
            const t3 = Math.round(1e3 * e3) / 1e3;
            return 0 === t3 && 0 !== e3 ? e3 : t3;
          })(t2.decimal)), t2;
        }, nc = function(e2) {
          if (e2 < 1e6) return String(e2);
          let t2;
          return t2 = "number" == typeof e2 ? e2.toFixed(0) : e2, -1 === t2.indexOf("e+") ? t2 : t2.replace(".", "").split("e+").reduce(function(e3, t3) {
            return e3 + Array(t3 - e3.length + 2).join(0);
          });
        }, rc = [["ninety", 90], ["eighty", 80], ["seventy", 70], ["sixty", 60], ["fifty", 50], ["forty", 40], ["thirty", 30], ["twenty", 20]], oc = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"], ac = [[1e24, "septillion"], [1e20, "hundred sextillion"], [1e21, "sextillion"], [1e20, "hundred quintillion"], [1e18, "quintillion"], [1e17, "hundred quadrillion"], [1e15, "quadrillion"], [1e14, "hundred trillion"], [1e12, "trillion"], [1e11, "hundred billion"], [1e9, "billion"], [1e8, "hundred million"], [1e6, "million"], [1e5, "hundred thousand"], [1e3, "thousand"], [100, "hundred"], [1, "one"]], ic = function(e2) {
          const t2 = [];
          if (e2 > 100) return t2;
          for (let n2 = 0; n2 < rc.length; n2++) e2 >= rc[n2][1] && (e2 -= rc[n2][1], t2.push(rc[n2][0]));
          return oc[e2] && t2.push(oc[e2]), t2;
        }, sc = function(e2) {
          let t2 = e2.num;
          if (0 === t2 || "0" === t2) return "zero";
          t2 > 1e21 && (t2 = nc(t2));
          let n2 = [];
          t2 < 0 && (n2.push("minus"), t2 = Math.abs(t2));
          const r2 = function(e3) {
            let t3 = e3;
            const n3 = [];
            return ac.forEach((r3) => {
              if (e3 >= r3[0]) {
                const e4 = Math.floor(t3 / r3[0]);
                t3 -= e4 * r3[0], e4 && n3.push({ unit: r3[1], count: e4 });
              }
            }), n3;
          }(t2);
          for (let e3 = 0; e3 < r2.length; e3++) {
            let t3 = r2[e3].unit;
            "one" === t3 && (t3 = "", n2.length > 1 && n2.push("and")), n2 = n2.concat(ic(r2[e3].count)), n2.push(t3);
          }
          return n2 = n2.concat(((e3) => {
            const t3 = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"], n3 = [], r3 = nc(e3).match(/\.([0-9]+)/);
            if (!r3 || !r3[0]) return n3;
            n3.push("point");
            const o2 = r3[0].split("");
            for (let e4 = 0; e4 < o2.length; e4++) n3.push(t3[o2[e4]]);
            return n3;
          })(t2)), n2 = n2.filter((e3) => e3), 0 === n2.length && (n2[0] = ""), n2.join(" ");
        }, lc = { one: "first", two: "second", three: "third", five: "fifth", eight: "eighth", nine: "ninth", twelve: "twelfth", twenty: "twentieth", thirty: "thirtieth", forty: "fortieth", fourty: "fourtieth", fifty: "fiftieth", sixty: "sixtieth", seventy: "seventieth", eighty: "eightieth", ninety: "ninetieth" }, uc = (e2) => {
          const t2 = sc(e2).split(" "), n2 = t2[t2.length - 1];
          return lc.hasOwnProperty(n2) ? t2[t2.length - 1] = lc[n2] : t2[t2.length - 1] = n2.replace(/y$/, "i") + "th", t2.join(" ");
        }, cc = function(e2) {
          if (!e2.numerator || !e2.denominator) return "";
          const t2 = sc({ num: e2.numerator });
          let n2 = uc({ num: e2.denominator });
          return 2 === e2.denominator && (n2 = "half"), t2 && n2 ? (1 !== e2.numerator && (n2 += "s"), `${t2} ${n2}`) : "";
        }, hc = function(e2) {
          class Fractions extends e2 {
            constructor(e3, t2, n2) {
              super(e3, t2, n2), this.viewType = "Fractions";
            }
            parse(e3) {
              return this.getNth(e3).map(tc);
            }
            get(e3) {
              return this.getNth(e3).map(tc);
            }
            json(e3) {
              return this.getNth(e3).map((t2) => {
                const n2 = t2.toView().json(e3)[0], r2 = tc(t2);
                return n2.fraction = r2, n2;
              }, []);
            }
            toDecimal(e3) {
              return this.getNth(e3).forEach((e4) => {
                const { decimal: t2 } = tc(e4);
                (e4 = e4.replaceWith(String(t2), true)).tag("NumericValue"), e4.unTag("Fraction");
              }), this;
            }
            toFraction(e3) {
              return this.getNth(e3).forEach((e4) => {
                const t2 = tc(e4);
                if (t2 && "number" == typeof t2.numerator && "number" == typeof t2.denominator) {
                  const n2 = `${t2.numerator}/${t2.denominator}`;
                  this.replace(e4, n2);
                }
              }), this;
            }
            toOrdinal(e3) {
              return this.getNth(e3).forEach((e4) => {
                const t2 = tc(e4);
                let n2 = cc(t2);
                e4.after("^#Noun").found && (n2 += " of"), e4.replaceWith(n2);
              }), this;
            }
            toCardinal(e3) {
              return this.getNth(e3).forEach((e4) => {
                const t2 = function(e5) {
                  return e5.numerator && e5.denominator ? `${sc({ num: e5.numerator })} out of ${sc({ num: e5.denominator })}` : "";
                }(tc(e4));
                e4.replaceWith(t2);
              }), this;
            }
            toText(e3) {
              return this.getNth(e3).forEach((e4) => {
                const t2 = tc(e4), n2 = cc(t2);
                n2 && e4.replaceWith(n2);
              }), this;
            }
            toPercentage(e3) {
              return this.getNth(e3).forEach((e4) => {
                const { decimal: t2 } = tc(e4);
                let n2 = 100 * t2;
                n2 = Math.round(100 * n2) / 100, e4.replaceWith(`${n2}%`);
              }), this;
            }
          }
          e2.prototype.fractions = function(e3) {
            let t2 = function(e4, t3) {
              let n2 = e4.match("#Fraction+");
              return n2 = n2.filter((e5) => !e5.lookBehind("#Value and$").found), n2 = n2.notIf("#Value seconds"), n2;
            }(this);
            return t2 = t2.getNth(e3), new Fractions(this.document, t2.pointer);
          };
        }, dc = "twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|fourty", gc = function(e2) {
          let t2 = e2.match("#Value+");
          if (t2.has("#NumericValue #NumericValue") && (t2.has("#Value @hasComma #Value") ? t2.splitAfter("@hasComma") : t2.has("#NumericValue #Fraction") ? t2.splitAfter("#NumericValue #Fraction") : t2 = t2.splitAfter("#NumericValue")), t2.has("#Value #Value #Value") && !t2.has("#Multiple") && t2.has("(" + dc + ") #Cardinal #Cardinal") && (t2 = t2.splitAfter("(" + dc + ") #Cardinal")), t2.has("#Value #Value")) {
            t2.has("#NumericValue #NumericValue") && (t2 = t2.splitOn("#Year")), t2.has("(" + dc + ") (eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen)") && (t2 = t2.splitAfter("(" + dc + ")"));
            const e3 = t2.match("#Cardinal #Cardinal");
            if (e3.found && !t2.has("(point|decimal|#Fraction)") && !e3.has("#Cardinal (#Multiple|point|decimal)")) {
              const n2 = t2.has(`(one|two|three|four|five|six|seven|eight|nine) (${dc})`), r2 = e3.has("(" + dc + ") #Cardinal"), o2 = e3.has("#Multiple #Value");
              n2 || r2 || o2 || e3.terms().forEach((e4) => {
                t2 = t2.splitOn(e4);
              });
            }
            t2.match("#Ordinal #Ordinal").match("#TextValue").found && !t2.has("#Multiple") && (t2.has("(" + dc + ") #Ordinal") || (t2 = t2.splitAfter("#Ordinal"))), t2.has("#Time") && (t2 = t2.splitOn("#Time")), t2 = t2.splitBefore("#Ordinal [#Cardinal]", 0), t2.has("#TextValue #NumericValue") && !t2.has("(" + dc + "|#Multiple)") && (t2 = t2.splitBefore("#TextValue #NumericValue"));
          }
          return t2 = t2.splitAfter("#NumberRange"), t2 = t2.splitBefore("#Year"), t2;
        }, mc = function(e2) {
          if ("string" == typeof e2) return { num: Zu(e2) };
          let t2 = e2.text("reduced");
          const n2 = e2.growRight("#Unit").match("#Unit$").text("machine"), r2 = /[0-9],[0-9]/.test(e2.text("text"));
          if (1 === e2.terms().length && !e2.has("#Multiple")) {
            const o3 = function(e3, t3) {
              const n3 = (e3 = e3.replace(/,/g, "")).split(/([0-9.,]*)/);
              let [r3, o4] = n3, a3 = n3.slice(2).join("");
              return "" !== o4 && t3.length < 2 ? (o4 = Number(o4 || e3), "number" != typeof o4 && (o4 = null), a3 = a3 || "", "st" !== a3 && "nd" !== a3 && "rd" !== a3 && "th" !== a3 || (a3 = ""), { prefix: r3 || "", num: o4, suffix: a3 }) : null;
            }(t2, e2);
            if (null !== o3) return o3.hasComma = r2, o3.unit = n2, o3;
          }
          let o2 = e2.match("#Fraction{2,}$");
          o2 = false === o2.found ? e2.match("^#Fraction$") : o2;
          let a2 = null;
          o2.found && (o2.has("#Value and #Value #Fraction") && (o2 = o2.match("and #Value #Fraction")), a2 = tc(o2), t2 = (e2 = (e2 = e2.not(o2)).not("and$")).text("reduced"));
          let i2 = 0;
          return t2 && (i2 = Zu(t2) || 0), a2 && a2.decimal && (i2 += a2.decimal), { hasComma: r2, prefix: "", num: i2, suffix: "", isOrdinal: e2.has("#Ordinal"), isText: e2.has("#TextValue"), isFraction: e2.has("#Fraction"), isMoney: e2.has("#Money"), unit: n2 };
        }, pc = { "\xA2": "cents", $: "dollars", "\xA3": "pounds", "\xA5": "yen", "\u20AC": "euros", "\u20A1": "col\xF3n", "\u0E3F": "baht", "\u20AD": "kip", "\u20A9": "won", "\u20B9": "rupees", "\u20BD": "ruble", "\u20BA": "liras" }, fc = { "%": "percent", "\xB0": "degrees" }, bc = function(e2) {
          const t2 = { suffix: "", prefix: e2.prefix };
          return pc.hasOwnProperty(e2.prefix) && (t2.suffix += " " + pc[e2.prefix], t2.prefix = ""), fc.hasOwnProperty(e2.suffix) && (t2.suffix += " " + fc[e2.suffix]), t2.suffix && 1 === e2.num && (t2.suffix = t2.suffix.replace(/s$/, "")), !t2.suffix && e2.suffix && (t2.suffix += " " + e2.suffix), t2;
        }, vc = function(e2, t2) {
          if ("TextOrdinal" === t2) {
            const { prefix: t3, suffix: n3 } = bc(e2);
            return t3 + uc(e2) + n3;
          }
          if ("Ordinal" === t2) return e2.prefix + function(e3) {
            const t3 = e3.num;
            if (!t3 && 0 !== t3) return null;
            const n3 = t3 % 100;
            if (n3 > 10 && n3 < 20) return String(t3) + "th";
            const r2 = { 0: "th", 1: "st", 2: "nd", 3: "rd" };
            let o2 = nc(t3);
            const a2 = o2.slice(o2.length - 1, o2.length);
            return o2 += r2[a2] ? r2[a2] : "th", o2;
          }(e2) + e2.suffix;
          if ("TextCardinal" === t2) {
            const { prefix: t3, suffix: n3 } = bc(e2);
            return t3 + sc(e2) + n3;
          }
          let n2 = e2.num;
          return e2.hasComma && (n2 = n2.toLocaleString()), e2.prefix + String(n2) + e2.suffix;
        }, yc = function(e2) {
          if ("string" == typeof e2 || "number" == typeof e2) {
            const t3 = {};
            return t3[e2] = true, t3;
          }
          return t2 = e2, "[object Array]" === Object.prototype.toString.call(t2) ? e2.reduce((e3, t3) => (e3[t3] = true, e3), {}) : e2 || {};
          var t2;
        }, wc = function(e2) {
          class Numbers extends e2 {
            constructor(e3, t2, n2) {
              super(e3, t2, n2), this.viewType = "Numbers";
            }
            parse(e3) {
              return this.getNth(e3).map(mc);
            }
            get(e3) {
              return this.getNth(e3).map(mc).map((e4) => e4.num);
            }
            json(e3) {
              const t2 = "object" == typeof e3 ? e3 : {};
              return this.getNth(e3).map((e4) => {
                const n2 = e4.toView().json(t2)[0], r2 = mc(e4);
                return n2.number = { prefix: r2.prefix, num: r2.num, suffix: r2.suffix, hasComma: r2.hasComma, unit: r2.unit }, n2;
              }, []);
            }
            units() {
              return this.growRight("#Unit").match("#Unit$");
            }
            isUnit(e3) {
              return function(e4, t2 = {}) {
                return t2 = yc(t2), e4.filter((e5) => {
                  const { unit: n2 } = mc(e5);
                  return !(!n2 || true !== t2[n2]);
                });
              }(this, e3);
            }
            isOrdinal() {
              return this.if("#Ordinal");
            }
            isCardinal() {
              return this.if("#Cardinal");
            }
            toNumber() {
              const e3 = this.map((e4) => {
                if (!this.has("#TextValue")) return e4;
                const t2 = mc(e4);
                if (null === t2.num) return e4;
                const n2 = e4.has("#Ordinal") ? "Ordinal" : "Cardinal", r2 = vc(t2, n2);
                return e4.replaceWith(r2, { tags: true }), e4.tag("NumericValue");
              });
              return new Numbers(e3.document, e3.pointer);
            }
            toLocaleString() {
              return this.forEach((e3) => {
                const t2 = mc(e3);
                if (null === t2.num) return;
                let n2 = t2.num.toLocaleString();
                if (e3.has("#Ordinal")) {
                  const e4 = vc(t2, "Ordinal").match(/[a-z]+$/);
                  e4 && (n2 += e4[0] || "");
                }
                e3.replaceWith(n2, { tags: true });
              }), this;
            }
            toText() {
              const e3 = this.map((e4) => {
                if (e4.has("#TextValue")) return e4;
                const t2 = mc(e4);
                if (null === t2.num) return e4;
                const n2 = e4.has("#Ordinal") ? "TextOrdinal" : "TextCardinal", r2 = vc(t2, n2);
                return e4.replaceWith(r2, { tags: true }), e4.tag("TextValue"), e4;
              });
              return new Numbers(e3.document, e3.pointer);
            }
            toCardinal() {
              const e3 = this.map((e4) => {
                if (!e4.has("#Ordinal")) return e4;
                const t2 = mc(e4);
                if (null === t2.num) return e4;
                const n2 = e4.has("#TextValue") ? "TextCardinal" : "Cardinal", r2 = vc(t2, n2);
                return e4.replaceWith(r2, { tags: true }), e4.tag("Cardinal"), e4;
              });
              return new Numbers(e3.document, e3.pointer);
            }
            toOrdinal() {
              const e3 = this.map((e4) => {
                if (e4.has("#Ordinal")) return e4;
                const t2 = mc(e4);
                if (null === t2.num) return e4;
                const n2 = e4.has("#TextValue") ? "TextOrdinal" : "Ordinal", r2 = vc(t2, n2);
                return e4.replaceWith(r2, { tags: true }), e4.tag("Ordinal"), e4;
              });
              return new Numbers(e3.document, e3.pointer);
            }
            isEqual(e3) {
              return this.filter((t2) => mc(t2).num === e3);
            }
            greaterThan(e3) {
              return this.filter((t2) => mc(t2).num > e3);
            }
            lessThan(e3) {
              return this.filter((t2) => mc(t2).num < e3);
            }
            between(e3, t2) {
              return this.filter((n2) => {
                const r2 = mc(n2).num;
                return r2 > e3 && r2 < t2;
              });
            }
            set(e3) {
              if (void 0 === e3) return this;
              "string" == typeof e3 && (e3 = mc(e3).num);
              const t2 = this.map((t3) => {
                const n2 = mc(t3);
                if (n2.num = e3, null === n2.num) return t3;
                let r2 = t3.has("#Ordinal") ? "Ordinal" : "Cardinal";
                t3.has("#TextValue") && (r2 = t3.has("#Ordinal") ? "TextOrdinal" : "TextCardinal");
                let o2 = vc(n2, r2);
                return n2.hasComma && "Cardinal" === r2 && (o2 = Number(o2).toLocaleString()), (t3 = t3.not("#Currency")).replaceWith(o2, { tags: true }), t3;
              });
              return new Numbers(t2.document, t2.pointer);
            }
            add(e3) {
              if (!e3) return this;
              "string" == typeof e3 && (e3 = mc(e3).num);
              const t2 = this.map((t3) => {
                const n2 = mc(t3);
                if (null === n2.num) return t3;
                n2.num += e3;
                let r2 = t3.has("#Ordinal") ? "Ordinal" : "Cardinal";
                n2.isText && (r2 = t3.has("#Ordinal") ? "TextOrdinal" : "TextCardinal");
                const o2 = vc(n2, r2);
                return t3.replaceWith(o2, { tags: true }), t3;
              });
              return new Numbers(t2.document, t2.pointer);
            }
            subtract(e3, t2) {
              return this.add(-1 * e3, t2);
            }
            increment(e3) {
              return this.add(1, e3);
            }
            decrement(e3) {
              return this.add(-1, e3);
            }
            update(e3) {
              const t2 = new Numbers(this.document, e3);
              return t2._cache = this._cache, t2;
            }
          }
          Numbers.prototype.toNice = Numbers.prototype.toLocaleString, Numbers.prototype.isBetween = Numbers.prototype.between, Numbers.prototype.minus = Numbers.prototype.subtract, Numbers.prototype.plus = Numbers.prototype.add, Numbers.prototype.equals = Numbers.prototype.isEqual, e2.prototype.numbers = function(e3) {
            let t2 = gc(this);
            return t2 = t2.getNth(e3), new Numbers(this.document, t2.pointer);
          }, e2.prototype.percentages = function(e3) {
            let t2 = gc(this);
            return t2 = t2.filter((e4) => e4.has("#Percent")), t2 = t2.getNth(e3), new Numbers(this.document, t2.pointer);
          }, e2.prototype.values = e2.prototype.numbers;
        };
        var kc = [["$", "dollar"], ["\u20AC", "EUR"], ["\xA3", "GBP"], ["\xA5", "JPY/YEN"], ["\u20B9", "INR"], ["\u20A9", "KRW"], ["\u20BD", "RUB"], ["\u20BA", "TRY"], ["\u0E3F", "THB"], ["\u20AA", "ILS"], ["\u20AB", "VND"], ["\u20B4", "UAH"], ["\u20A6", "NGN"], ["\u20B1", "PHP"], ["\u20B2", "PYG"], ["\u20A1", "CRC"], ["\uFDFC", "SAR"], ["\u20AE", "MNT"], ["\u20AD", "LAK"], ["\u20B8", "KZT"]];
        const Pc = function(e2) {
          let t2 = (e2 = e2.clone()).match("#Currency").nouns().toSingular().text("normal");
          const n2 = e2.match("#Money").numbers().get()[0];
          if (!t2) {
            let n3 = e2.text();
            const r2 = kc.find(([e3]) => n3.includes(e3));
            r2 && (t2 = r2[1]);
          }
          return { currency: t2, num: n2 };
        };
        var Ac = { api: function(e2) {
          hc(e2), wc(e2), function(e3) {
            class Money extends e3 {
              constructor(e4, t2, n2) {
                super(e4, t2, n2), this.viewType = "Money";
              }
              parse(e4) {
                return this.getNth(e4).map(Pc);
              }
              get(e4) {
                return this.getNth(e4).map(Pc).map((e5) => e5.num);
              }
              json(e4) {
                return this.getNth(e4).map((t2) => {
                  const n2 = t2.toView().json(e4)[0], r2 = Pc(t2);
                  return n2.money = r2, n2;
                }, []);
              }
              currency(e4) {
                return this.getNth(e4).map((e5) => Pc(e5).currency);
              }
            }
            e3.prototype.money = function(e4) {
              let t2 = this.match("#Money+ #Currency? (#Money+ #Currency?)?");
              return t2 = t2.getNth(e4), new Money(this.document, t2.pointer);
            };
          }(e2);
        } };
        const Nc = { people: true, places: true, organizations: true, acronyms: true, money: true, percentages: true, fractions: true, emails: true, phoneNumbers: true, atMentions: true, urls: true, properNouns: false, dates: false, numbers: false, pronouns: false }, Cc = { people: ["MaleName", "FemaleName", "FirstName", "LastName"], places: ["City", "State", "Country", "Region"], organizations: ["SportsTeam", "Company", "School"] };
        Cc.pronouns = [...Cc.people, ...Cc.places, ...Cc.organizations];
        const jc = function(e2, t2, n2 = true) {
          return (e2 = e2.notIf("#Redacted")).replaceWith(t2, n2), e2.tag("Redacted"), e2;
        }, xc = function(e2 = {}, t2 = "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588", n2 = true) {
          return false !== (e2 = Object.assign({}, Nc, e2)).people && jc(this.people(), t2, n2).unTag(Cc.people), false !== e2.places && jc(this.places(), t2, n2).unTag(Cc.places), false !== e2.organizations && jc(this.organizations(), t2, n2).unTag(Cc.organizations), false !== e2.emails && jc(this.emails(), t2, n2), false !== e2.money && jc(this.money(), t2, n2), false !== e2.percentages && jc(this.percentages(), t2, n2), false !== e2.fractions && jc(this.fractions(), t2, n2), false !== e2.phoneNumbers && jc(this.phoneNumbers(), t2, n2), false !== e2.atMentions && jc(this.atMentions(), t2, n2), false !== e2.acronyms && jc(this.acronyms(), t2, n2), false !== e2.urls && jc(this.urls(), t2, n2), false !== e2.properNouns && jc(this.properNouns(), t2, n2), false !== e2.dates && jc(this.dates(), t2, n2), false !== e2.numbers && jc(this.numbers(), t2, n2), false !== e2.pronouns && jc(this.pronouns(), t2, n2).unTag(Cc.pronouns), this;
        }, Ic = { model: { one: { tagSet: { Redacted: true } } }, api: function(e2) {
          e2.prototype.redact = xc;
        } }, Tc = function(e2) {
          let t2 = null;
          return e2.has("#PastTense") ? t2 = "PastTense" : e2.has("#FutureTense") ? t2 = "FutureTense" : e2.has("#PresentTense") && (t2 = "PresentTense"), { tense: t2 };
        }, Dc = function(e2) {
          const t2 = function(e3) {
            let t3 = e3;
            return 1 === t3.length ? t3 : (t3 = t3.if("#Verb"), 1 === t3.length ? t3 : (t3 = t3.ifNo("(after|although|as|because|before|if|since|than|that|though|when|whenever|where|whereas|wherever|whether|while|why|unless|until|once)"), t3 = t3.ifNo("^even (if|though)"), t3 = t3.ifNo("^so that"), t3 = t3.ifNo("^rather than"), t3 = t3.ifNo("^provided that"), 1 === t3.length ? t3 : (t3 = t3.ifNo("(that|which|whichever|who|whoever|whom|whose|whomever)"), 1 === t3.length ? t3 : (t3 = t3.ifNo("(^despite|^during|^before|^through|^throughout)"), 1 === t3.length ? t3 : (t3 = t3.ifNo("^#Gerund"), 1 === t3.length ? t3 : (0 === t3.length && (t3 = e3), t3.eq(0)))))));
          }(e2.clauses()), n2 = t2.chunks();
          let r2 = e2.none(), o2 = e2.none(), a2 = e2.none();
          return n2.forEach((e3, t3) => {
            0 !== t3 || e3.has("<Verb>") ? o2.found || !e3.has("<Verb>") ? o2.found && (a2 = a2.concat(e3)) : o2 = e3 : r2 = e3;
          }), o2.found && !r2.found && (r2 = o2.before("<Noun>+").first()), { subj: r2, verb: o2, pred: a2, grammar: Tc(o2) };
        };
        var Hc = { api: function(e2) {
          class Sentences extends e2 {
            constructor(e3, t3, n2) {
              super(e3, t3, n2), this.viewType = "Sentences";
            }
            json(e3 = {}) {
              return this.map((t3) => {
                const n2 = t3.toView().json(e3)[0] || {}, { subj: r2, verb: o2, pred: a2, grammar: i2 } = Dc(t3);
                return n2.sentence = { subject: r2.text("normal"), verb: o2.text("normal"), predicate: a2.text("normal"), grammar: i2 }, n2;
              }, []);
            }
            toPastTense(e3) {
              return this.getNth(e3).map((e4) => (Dc(e4), function(e5) {
                let t3 = e5.verbs();
                const n2 = t3.eq(0);
                if (n2.has("#PastTense")) return e5;
                if (n2.toPastTense(), t3.length > 1) {
                  t3 = t3.slice(1), t3 = t3.filter((e6) => !e6.lookBehind("to$").found), t3 = t3.if("#PresentTense"), t3 = t3.notIf("#Gerund");
                  const n3 = e5.match("to #Verb+ #Conjunction #Verb").terms();
                  t3 = t3.not(n3), t3.found && t3.verbs().toPastTense();
                }
                return e5;
              }(e4)));
            }
            toPresentTense(e3) {
              return this.getNth(e3).map((e4) => (Dc(e4), function(e5) {
                let t3 = e5.verbs();
                return t3.eq(0).toPresentTense(), t3.length > 1 && (t3 = t3.slice(1), t3 = t3.filter((e6) => !e6.lookBehind("to$").found), t3 = t3.notIf("#Gerund"), t3.found && t3.verbs().toPresentTense()), e5;
              }(e4)));
            }
            toFutureTense(e3) {
              return this.getNth(e3).map((e4) => (Dc(e4), e4 = function(e5) {
                let t3 = e5.verbs();
                if (t3.eq(0).toFutureTense(), t3 = (e5 = e5.fullSentence()).verbs(), t3.length > 1) {
                  t3 = t3.slice(1);
                  const e6 = t3.filter((e7) => !(e7.lookBehind("to$").found || !e7.has("#Copula #Gerund") && (e7.has("#Gerund") || !e7.has("#Copula") && e7.has("#PresentTense") && !e7.has("#Infinitive") && e7.lookBefore("(he|she|it|that|which)$").found)));
                  e6.found && e6.forEach((e7) => {
                    if (e7.has("#Copula")) return e7.match("was").replaceWith("is"), void e7.match("is").replaceWith("will be");
                    e7.toInfinitive();
                  });
                }
                return e5;
              }(e4), e4));
            }
            toInfinitive(e3) {
              return this.getNth(e3).map((e4) => (Dc(e4), function(e5) {
                return e5.verbs().toInfinitive(), e5;
              }(e4)));
            }
            toNegative(e3) {
              return this.getNth(e3).map((e4) => (Dc(e4), function(e5) {
                return e5.verbs().first().toNegative().compute("chunks"), e5;
              }(e4)));
            }
            toPositive(e3) {
              return this.getNth(e3).map((e4) => (Dc(e4), function(e5) {
                return e5.verbs().first().toPositive().compute("chunks"), e5;
              }(e4)));
            }
            isQuestion(e3) {
              return this.questions(e3);
            }
            isExclamation(e3) {
              const t3 = this.filter((e4) => e4.lastTerm().has("@hasExclamation"));
              return t3.getNth(e3);
            }
            isStatement(e3) {
              const t3 = this.filter((e4) => !e4.isExclamation().found && !e4.isQuestion().found);
              return t3.getNth(e3);
            }
            update(e3) {
              const t3 = new Sentences(this.document, e3);
              return t3._cache = this._cache, t3;
            }
          }
          Sentences.prototype.toPresent = Sentences.prototype.toPresentTense, Sentences.prototype.toPast = Sentences.prototype.toPastTense, Sentences.prototype.toFuture = Sentences.prototype.toFutureTense;
          const t2 = { sentences: function(e3) {
            let t3 = this.map((e4) => e4.fullSentence());
            return t3 = t3.getNth(e3), new Sentences(this.document, t3.pointer);
          }, questions: function(e3) {
            const t3 = function(e4) {
              const t4 = /\?/, { document: n2 } = e4;
              return e4.filter((e5) => {
                const r2 = e5.docs[0] || [], o2 = r2[r2.length - 1];
                return !(!o2 || n2[o2.index[0]].length !== r2.length) && (!!t4.test(o2.post) || function(e6) {
                  const t5 = e6.clauses();
                  return !(/\.\.$/.test(e6.out("text")) || e6.has("^#QuestionWord") && e6.has("@hasComma") || !e6.has("or not$") && !e6.has("^#QuestionWord") && !e6.has("^(do|does|did|is|was|can|could|will|would|may) #Noun") && !e6.has("^(have|must) you") && !t5.has("(do|does|is|was) #Noun+ #Adverb? (#Adjective|#Infinitive)$"));
                }(e5));
              });
            }(this);
            return t3.getNth(e3);
          } };
          Object.assign(e2.prototype, t2);
        } };
        const Ec = function(e2) {
          const t2 = {};
          t2.firstName = e2.match("#FirstName+"), t2.lastName = e2.match("#LastName+"), t2.honorific = e2.match("#Honorific+");
          const n2 = t2.lastName, r2 = t2.firstName;
          return r2.found && n2.found || r2.found || n2.found || !e2.has("^#Honorific .$") || (t2.lastName = e2.match(".$")), t2;
        }, Gc = "male", Oc = "female", Fc = { mr: Gc, mrs: Oc, miss: Oc, madam: Oc, king: Gc, queen: Oc, duke: Gc, duchess: Oc, baron: Gc, baroness: Oc, count: Gc, countess: Oc, prince: Gc, princess: Oc, sire: Gc, dame: Oc, lady: Oc, ayatullah: Gc, congressman: Gc, congresswoman: Oc, "first lady": Oc, mx: null }, Vc = function(e2, t2) {
          const { firstName: n2, honorific: r2 } = e2;
          if (n2.has("#FemaleName")) return Oc;
          if (n2.has("#MaleName")) return Gc;
          if (r2.found) {
            let e3 = r2.text("normal");
            if (e3 = e3.replace(/\./g, ""), Fc.hasOwnProperty(e3)) return Fc[e3];
            if (/^her /.test(e3)) return Oc;
            if (/^his /.test(e3)) return Gc;
          }
          const o2 = t2.after();
          if (!o2.has("#Person") && o2.has("#Pronoun")) {
            const e3 = o2.match("#Pronoun");
            if (e3.has("(they|their)")) return null;
            const t3 = e3.has("(he|his)"), n3 = e3.has("(she|her|hers)");
            if (t3 && !n3) return Gc;
            if (n3 && !t3) return Oc;
          }
          return null;
        }, zc = function(e2) {
          const t2 = this.clauses();
          let n2 = t2.people();
          return n2 = n2.concat(t2.places()), n2 = n2.concat(t2.organizations()), n2 = n2.not("(someone|man|woman|mother|brother|sister|father)"), n2 = n2.sort("seq"), n2 = n2.getNth(e2), n2;
        };
        var Bc = { api: function(e2) {
          !function(e3) {
            class People extends e3 {
              constructor(e4, t2, n2) {
                super(e4, t2, n2), this.viewType = "People";
              }
              parse(e4) {
                return this.getNth(e4).map(Ec);
              }
              json(e4) {
                const t2 = "object" == typeof e4 ? e4 : {};
                return this.getNth(e4).map((e5) => {
                  const n2 = e5.toView().json(t2)[0], r2 = Ec(e5);
                  return n2.person = { firstName: r2.firstName.text("normal"), lastName: r2.lastName.text("normal"), honorific: r2.honorific.text("normal"), presumed_gender: Vc(r2, e5) }, n2;
                }, []);
              }
              presumedMale() {
                return this.filter((e4) => e4.has("(#MaleName|mr|mister|sr|jr|king|pope|prince|sir)"));
              }
              presumedFemale() {
                return this.filter((e4) => e4.has("(#FemaleName|mrs|miss|queen|princess|madam)"));
              }
              update(e4) {
                const t2 = new People(this.document, e4);
                return t2._cache = this._cache, t2;
              }
            }
            e3.prototype.people = function(e4) {
              let t2 = function(e5) {
                let t3 = e5.splitAfter("@hasComma");
                t3 = t3.match("#Honorific+? #Person+");
                const n2 = t3.match("#Possessive").notIf("(his|her)");
                return t3 = t3.splitAfter(n2), t3;
              }(this);
              return t2 = t2.getNth(e4), new People(this.document, t2.pointer);
            };
          }(e2), function(e3) {
            e3.prototype.places = function(t2) {
              let n2 = function(e4) {
                let t3 = e4.match("(#Place|#Address)+"), n3 = t3.match("@hasComma");
                return n3 = n3.filter((e5) => !!e5.has("(asia|africa|europe|america)$") || !e5.has("(#City|#Region|#ProperNoun)$") || !e5.after("^(#Country|#Region)").found), t3 = t3.splitAfter(n3), t3;
              }(this);
              return n2 = n2.getNth(t2), new e3(this.document, n2.pointer);
            };
          }(e2), function(e3) {
            e3.prototype.organizations = function(e4) {
              return this.match("#Organization+").getNth(e4);
            };
          }(e2), function(e3) {
            e3.prototype.topics = zc;
          }(e2);
        } };
        const Sc = function(e2, t2) {
          const n2 = { pre: e2.none(), post: e2.none() };
          if (!e2.has("#Adverb")) return n2;
          const r2 = e2.splitOn(t2);
          return 3 === r2.length ? { pre: r2.eq(0).adverbs(), post: r2.eq(2).adverbs() } : r2.eq(0).isDoc(t2) ? (n2.post = r2.eq(1).adverbs(), n2) : (n2.pre = r2.eq(0).adverbs(), n2);
        }, $c = function(e2, t2) {
          const n2 = e2.splitBefore(t2);
          if (n2.length <= 1) return e2.none();
          let r2 = n2.eq(0);
          return r2 = r2.not("(#Adverb|#Negative|#Prefix)"), r2;
        }, Mc = function(e2) {
          return e2.match("#Negative");
        }, Kc = function(e2) {
          if (!e2.has("(#Particle|#PhrasalVerb)")) return { verb: e2.none(), particle: e2.none() };
          const t2 = e2.match("#Particle$");
          return { verb: e2.not(t2), particle: t2 };
        }, Lc = function(e2) {
          const t2 = e2.clone();
          t2.contractions().expand();
          const n2 = function(e3) {
            let t3 = e3;
            return e3.wordCount() > 1 && (t3 = e3.not("(#Negative|#Auxiliary|#Modal|#Adverb|#Prefix)")), t3.length > 1 && !t3.has("#Phrasal #Particle") && (t3 = t3.last()), t3 = t3.not("(want|wants|wanted) to"), t3.found || (t3 = e3.not("#Negative")), t3;
          }(t2);
          return { root: n2, prefix: t2.match("#Prefix"), adverbs: Sc(t2, n2), auxiliary: $c(t2, n2), negative: Mc(t2), phrasal: Kc(n2) };
        }, Jc = { tense: "PresentTense" }, Wc = { conditional: true }, qc = { tense: "FutureTense" }, Uc = { progressive: true }, Rc = { tense: "PastTense" }, Qc = { complete: true, progressive: false }, _c = { passive: true }, Zc = function(e2) {
          const t2 = {};
          return e2.forEach((e3) => {
            Object.assign(t2, e3);
          }), t2;
        }, Xc = { imperative: [["#Imperative", []]], "want-infinitive": [["^(want|wants|wanted) to #Infinitive$", [Jc]], ["^wanted to #Infinitive$", [Rc]], ["^will want to #Infinitive$", [qc]]], "gerund-phrase": [["^#PastTense #Gerund$", [Rc]], ["^#PresentTense #Gerund$", [Jc]], ["^#Infinitive #Gerund$", [Jc]], ["^will #Infinitive #Gerund$", [qc]], ["^have #PastTense #Gerund$", [Rc]], ["^will have #PastTense #Gerund$", [Rc]]], "simple-present": [["^#PresentTense$", [Jc]], ["^#Infinitive$", [Jc]]], "simple-past": [["^#PastTense$", [Rc]]], "simple-future": [["^will #Adverb? #Infinitive", [qc]]], "present-progressive": [["^(is|are|am) #Gerund$", [Jc, Uc]]], "past-progressive": [["^(was|were) #Gerund$", [Rc, Uc]]], "future-progressive": [["^will be #Gerund$", [qc, Uc]]], "present-perfect": [["^(has|have) #PastTense$", [Rc, Qc]]], "past-perfect": [["^had #PastTense$", [Rc, Qc]], ["^had #PastTense to #Infinitive", [Rc, Qc]]], "future-perfect": [["^will have #PastTense$", [qc, Qc]]], "present-perfect-progressive": [["^(has|have) been #Gerund$", [Rc, Uc]]], "past-perfect-progressive": [["^had been #Gerund$", [Rc, Uc]]], "future-perfect-progressive": [["^will have been #Gerund$", [qc, Uc]]], "passive-past": [["(got|were|was) #Passive", [Rc, _c]], ["^(was|were) being #Passive", [Rc, _c]], ["^(had|have) been #Passive", [Rc, _c]]], "passive-present": [["^(is|are|am) #Passive", [Jc, _c]], ["^(is|are|am) being #Passive", [Jc, _c]], ["^has been #Passive", [Jc, _c]]], "passive-future": [["will have been #Passive", [qc, _c, Wc]], ["will be being? #Passive", [qc, _c, Wc]]], "present-conditional": [["would be #PastTense", [Jc, Wc]]], "past-conditional": [["would have been #PastTense", [Rc, Wc]]], "auxiliary-future": [["(is|are|am|was) going to (#Infinitive|#PresentTense)", [qc]]], "auxiliary-past": [["^did #Infinitive$", [Rc, { plural: false }]], ["^used to #Infinitive$", [Rc, Qc]]], "auxiliary-present": [["^(does|do) #Infinitive$", [Jc, Qc, { plural: true }]]], "modal-past": [["^(could|must|should|shall) have #PastTense$", [Rc]]], "modal-infinitive": [["^#Modal #Infinitive$", []]], infinitive: [["^#Infinitive$", []]] }, Yc = [];
        Object.keys(Xc).map((e2) => {
          Xc[e2].forEach((t2) => {
            Yc.push({ name: e2, match: t2[0], data: Zc(t2[1]) });
          });
        });
        const eh = function(e2, t2) {
          const n2 = {};
          e2 = function(e3, t3) {
            return e3 = e3.clone(), t3.adverbs.post && t3.adverbs.post.found && e3.remove(t3.adverbs.post), t3.adverbs.pre && t3.adverbs.pre.found && e3.remove(t3.adverbs.pre), e3.has("#Negative") && (e3 = e3.remove("#Negative")), e3.has("#Prefix") && (e3 = e3.remove("#Prefix")), t3.root.has("#PhrasalVerb #Particle") && e3.remove("#Particle$"), e3.not("#Adverb");
          }(e2, t2);
          for (let t3 = 0; t3 < Yc.length; t3 += 1) {
            const r2 = Yc[t3];
            if (true === e2.has(r2.match)) {
              n2.form = r2.name, Object.assign(n2, r2.data);
              break;
            }
          }
          return n2.form || e2.has("^#Verb$") && (n2.form = "infinitive"), n2.tense || (n2.tense = t2.root.has("#PastTense") ? "PastTense" : "PresentTense"), n2.copula = t2.root.has("#Copula"), n2.isInfinitive = function(e3) {
            if (e3.has("#Infinitive") && e3.growLeft("to").has("^to #Infinitive")) return true;
            return false;
          }(e2), n2;
        }, th = function(e2) {
          if (e2.length <= 1) return false;
          return (e2.parse()[0] || {}).isSubordinate;
        }, nh = function(e2, t2) {
          return !!t2.has("(are|were|does)") || (!!e2.has("(those|they|we)") || !(!e2.found || !e2.isPlural) && e2.isPlural().found);
        }, rh = function(e2) {
          const t2 = function(e3) {
            let t3 = e3.before();
            t3 = function(e4) {
              let t4 = e4.clauses();
              return t4 = t4.filter((e5, t5) => !(e5.has("^(if|unless|while|but|for|per|at|by|that|which|who|from)") || t5 > 0 && e5.has("^#Verb . #Noun+$") || t5 > 0 && e5.has("^#Adverb"))), 0 === t4.length ? e4 : t4;
            }(t3);
            const n2 = t3.nouns();
            let r2 = n2.last();
            const o2 = r2.match("(i|he|she|we|you|they)");
            if (o2.found) return o2.nouns();
            let a2 = n2.if("^(that|this|those)");
            return a2.found || false === n2.found && (a2 = t3.match("^(that|this|those)"), a2.found) ? a2 : (r2 = n2.last(), th(r2) && (n2.remove(r2), r2 = n2.last()), th(r2) && (n2.remove(r2), r2 = n2.last()), r2);
          }(e2);
          return { subject: t2, plural: nh(t2, e2) };
        }, oh = (e2) => e2, ah = (e2, t2) => {
          const n2 = rh(e2), r2 = n2.subject;
          return !(!r2.has("i") && !r2.has("we")) || n2.plural;
        }, ih = function(e2, t2) {
          if (e2.has("were")) return "are";
          const { subject: n2, plural: r2 } = rh(e2);
          return n2.has("i") ? "am" : n2.has("we") || r2 ? "are" : "is";
        }, sh = function(e2, t2) {
          const n2 = rh(e2), r2 = n2.subject;
          return r2.has("i") || r2.has("we") || n2.plural ? "do" : "does";
        }, lh = function(e2) {
          return e2.has("#Infinitive") ? "Infinitive" : e2.has("#Participle") ? "Participle" : e2.has("#PastTense") ? "PastTense" : e2.has("#Gerund") ? "Gerund" : e2.has("#PresentTense") ? "PresentTense" : void 0;
        }, uh = function(e2, t2) {
          const { toInfinitive: n2 } = e2.methods.two.transform.verb;
          let r2 = t2.root.text({ keepPunct: false });
          return r2 = n2(r2, e2.model, lh(e2)), r2 && e2.replace(t2.root, r2), e2;
        }, ch = (e2) => e2.has("will not") ? e2.replace("will not", "have not") : e2.remove("will"), hh = function(e2) {
          if (!e2 || !e2.isView) return [];
          return e2.json({ normal: true, terms: false, text: false }).map((e3) => e3.normal);
        }, dh = function(e2) {
          return e2 && e2.isView ? e2.text("normal") : "";
        }, gh = function(e2) {
          const { toInfinitive: t2 } = e2.methods.two.transform.verb;
          return t2(e2.text("normal"), e2.model, lh(e2));
        }, mh = { tags: true }, ph = { tags: true }, fh = { noAux: (e2, t2) => (t2.auxiliary.found && (e2 = e2.remove(t2.auxiliary)), e2), simple: (e2, t2) => {
          const { conjugate: n2, toInfinitive: r2 } = e2.methods.two.transform.verb, o2 = t2.root;
          if (o2.has("#Modal")) return e2;
          let a2 = o2.text({ keepPunct: false });
          a2 = r2(a2, e2.model, lh(o2));
          return a2 = n2(a2, e2.model).PastTense, a2 = "been" === a2 ? "was" : a2, "was" === a2 && (a2 = ((e3, t3) => {
            const { subject: n3, plural: r3 } = rh(e3);
            return r3 || n3.has("we") ? "were" : "was";
          })(e2)), a2 && e2.replace(o2, a2, ph), e2;
        }, both: function(e2, t2) {
          return t2.negative.found ? (e2.replace("will", "did"), e2) : (e2 = fh.simple(e2, t2), e2 = fh.noAux(e2, t2));
        }, hasHad: (e2) => (e2.replace("has", "had", ph), e2), hasParticiple: (e2, t2) => {
          const { conjugate: n2, toInfinitive: r2 } = e2.methods.two.transform.verb, o2 = t2.root;
          let a2 = o2.text("normal");
          return a2 = r2(a2, e2.model, lh(o2)), n2(a2, e2.model).Participle;
        } }, bh = { infinitive: fh.simple, "simple-present": fh.simple, "simple-past": oh, "simple-future": fh.both, "present-progressive": (e2) => (e2.replace("are", "were", ph), e2.replace("(is|are|am)", "was", ph), e2), "past-progressive": oh, "future-progressive": (e2, t2) => (e2.match(t2.root).insertBefore("was"), e2.remove("(will|be)"), e2), "present-perfect": fh.hasHad, "past-perfect": oh, "future-perfect": (e2, t2) => (e2.match(t2.root).insertBefore("had"), e2.has("will") && (e2 = ch(e2)), e2.remove("have"), e2), "present-perfect-progressive": fh.hasHad, "past-perfect-progressive": oh, "future-perfect-progressive": (e2) => (e2.remove("will"), e2.replace("have", "had", ph), e2), "passive-past": (e2) => (e2.replace("have", "had", ph), e2), "passive-present": (e2) => (e2.replace("(is|are)", "was", ph), e2), "passive-future": (e2, t2) => (t2.auxiliary.has("will be") && (e2.match(t2.root).insertBefore("had been"), e2.remove("(will|be)")), t2.auxiliary.has("will have been") && (e2.replace("have", "had", ph), e2.remove("will")), e2), "present-conditional": (e2) => (e2.replace("be", "have been"), e2), "past-conditional": oh, "auxiliary-future": (e2) => (e2.replace("(is|are|am)", "was", ph), e2), "auxiliary-past": oh, "auxiliary-present": (e2) => (e2.replace("(do|does)", "did", ph), e2), "modal-infinitive": (e2, t2) => (e2.has("can") ? e2.replace("can", "could", ph) : (fh.simple(e2, t2), e2.match("#Modal").insertAfter("have").tag("Auxiliary")), e2), "modal-past": oh, "want-infinitive": (e2) => (e2.replace("(want|wants)", "wanted", ph), e2.remove("will"), e2), "gerund-phrase": (e2, t2) => (t2.root = t2.root.not("#Gerund$"), fh.simple(e2, t2), ch(e2), e2) }, vh = function(e2, t2) {
          const n2 = rh(e2), r2 = n2.subject;
          return r2.has("(i|we|you)") ? "have" : false === n2.plural || r2.has("he") || r2.has("she") || r2.has("#Person") ? "has" : "have";
        }, yh = (e2, t2) => {
          const { conjugate: n2, toInfinitive: r2 } = e2.methods.two.transform.verb, { root: o2, auxiliary: a2 } = t2;
          if (o2.has("#Modal")) return e2;
          let i2 = o2.text({ keepPunct: false });
          i2 = r2(i2, e2.model, lh(o2));
          const s2 = n2(i2, e2.model);
          if (i2 = s2.Participle || s2.PastTense, i2) {
            e2 = e2.replace(o2, i2);
            const t3 = vh(e2);
            e2.prepend(t3).match(t3).tag("Auxiliary"), e2.remove(a2);
          }
          return e2;
        }, wh = { infinitive: yh, "simple-present": yh, "simple-future": (e2, t2) => e2.replace("will", vh(e2)), "present-perfect": oh, "past-perfect": oh, "future-perfect": (e2, t2) => e2.replace("will have", vh(e2)), "present-perfect-progressive": oh, "past-perfect-progressive": oh, "future-perfect-progressive": oh }, kh = { tags: true }, Ph = (e2, t2) => {
          const { conjugate: n2, toInfinitive: r2 } = e2.methods.two.transform.verb, o2 = t2.root;
          let a2 = o2.text("normal");
          return a2 = r2(a2, e2.model, lh(o2)), false === ah(e2) && (a2 = n2(a2, e2.model).PresentTense), o2.has("#Copula") && (a2 = ih(e2)), a2 && (e2 = e2.replace(o2, a2, kh)).not("#Particle").tag("PresentTense"), e2;
        }, Ah = (e2, t2) => {
          const { conjugate: n2, toInfinitive: r2 } = e2.methods.two.transform.verb, o2 = t2.root;
          let a2 = o2.text("normal");
          return a2 = r2(a2, e2.model, lh(o2)), false === ah(e2) && (a2 = n2(a2, e2.model).Gerund), a2 && (e2 = e2.replace(o2, a2, kh)).not("#Particle").tag("Gerund"), e2;
        }, Nh = { infinitive: Ph, "simple-present": (e2, t2) => {
          const { conjugate: n2 } = e2.methods.two.transform.verb, { root: r2 } = t2;
          if (!r2.has("#Infinitive")) return Ph(e2, t2);
          {
            const t3 = rh(e2).subject;
            if (ah(e2) || t3.has("i")) return e2;
            const o2 = r2.text("normal"), a2 = n2(o2, e2.model).PresentTense;
            o2 !== a2 && e2.replace(r2, a2, kh);
          }
          return e2;
        }, "simple-past": Ph, "simple-future": (e2, t2) => {
          const { root: n2, auxiliary: r2 } = t2;
          if (r2.has("will") && n2.has("be")) {
            const t3 = ih(e2);
            e2.replace(n2, t3), (e2 = e2.remove("will")).replace("not " + t3, t3 + " not");
          } else Ph(e2, t2), e2 = e2.remove("will");
          return e2;
        }, "present-progressive": oh, "past-progressive": (e2, t2) => {
          const n2 = ih(e2);
          return e2.replace("(were|was)", n2, kh);
        }, "future-progressive": (e2) => (e2.match("will").insertBefore("is"), e2.remove("be"), e2.remove("will")), "present-perfect": (e2, t2) => (Ph(e2, t2), e2 = e2.remove("(have|had|has)")), "past-perfect": (e2, t2) => {
          const n2 = rh(e2).subject;
          return ah(e2) || n2.has("i") ? ((e2 = uh(e2, t2)).remove("had"), e2) : (e2.replace("had", "has", kh), e2);
        }, "future-perfect": (e2) => (e2.match("will").insertBefore("has"), e2.remove("have").remove("will")), "present-perfect-progressive": oh, "past-perfect-progressive": (e2) => e2.replace("had", "has", kh), "future-perfect-progressive": (e2) => (e2.match("will").insertBefore("has"), e2.remove("have").remove("will")), "passive-past": (e2, t2) => {
          const n2 = ih(e2);
          return e2.has("(had|have|has)") && e2.has("been") ? (e2.replace("(had|have|has)", n2, kh), e2.replace("been", "being"), e2) : e2.replace("(got|was|were)", n2);
        }, "passive-present": oh, "passive-future": (e2) => (e2.replace("will", "is"), e2.replace("be", "being")), "present-conditional": oh, "past-conditional": (e2) => (e2.replace("been", "be"), e2.remove("have")), "auxiliary-future": (e2, t2) => (Ah(e2, t2), e2.remove("(going|to)"), e2), "auxiliary-past": (e2, t2) => {
          if (t2.auxiliary.has("did")) {
            const n2 = sh(e2);
            return e2.replace(t2.auxiliary, n2), e2;
          }
          return Ah(e2, t2), e2.replace(t2.auxiliary, "is"), e2;
        }, "auxiliary-present": oh, "modal-infinitive": oh, "modal-past": (e2, t2) => (((e3, t3) => {
          const { toInfinitive: n2 } = e3.methods.two.transform.verb, r2 = t3.root;
          let o2 = t3.root.text("normal");
          o2 = n2(o2, e3.model, lh(r2)), o2 && (e3 = e3.replace(t3.root, o2, kh));
        })(e2, t2), e2.remove("have")), "gerund-phrase": (e2, t2) => (t2.root = t2.root.not("#Gerund$"), Ph(e2, t2), e2.remove("(will|have)")), "want-infinitive": (e2, t2) => {
          let n2 = "wants";
          return ah(e2) && (n2 = "want"), e2.replace("(want|wanted|wants)", n2, kh), e2.remove("will"), e2;
        } }, Ch = { tags: true }, jh = (e2, t2) => {
          const { toInfinitive: n2 } = e2.methods.two.transform.verb, { root: r2, auxiliary: o2 } = t2;
          if (r2.has("#Modal")) return e2;
          let a2 = r2.text("normal");
          return a2 = n2(a2, e2.model, lh(r2)), a2 && (e2 = e2.replace(r2, a2, Ch)).not("#Particle").tag("Verb"), e2.prepend("will").match("will").tag("Auxiliary"), e2.remove(o2), e2;
        }, xh = (e2, t2) => {
          const { conjugate: n2, toInfinitive: r2 } = e2.methods.two.transform.verb, { root: o2, auxiliary: a2 } = t2;
          let i2 = o2.text("normal");
          return i2 = r2(i2, e2.model, lh(o2)), i2 && (i2 = n2(i2, e2.model).Gerund, e2.replace(o2, i2, Ch), e2.not("#Particle").tag("PresentTense")), e2.remove(a2), e2.prepend("will be").match("will be").tag("Auxiliary"), e2;
        }, Ih = { infinitive: jh, "simple-present": jh, "simple-past": jh, "simple-future": oh, "present-progressive": xh, "past-progressive": xh, "future-progressive": oh, "present-perfect": (e2) => (e2.match("(have|has)").replaceWith("will have"), e2), "past-perfect": (e2) => e2.replace("(had|has)", "will have"), "future-perfect": oh, "present-perfect-progressive": (e2) => e2.replace("has", "will have"), "past-perfect-progressive": (e2) => e2.replace("had", "will have"), "future-perfect-progressive": oh, "passive-past": (e2) => e2.has("got") ? e2.replace("got", "will get") : e2.has("(was|were)") ? (e2.replace("(was|were)", "will be"), e2.remove("being")) : e2.has("(have|has|had) been") ? e2.replace("(have|has|had) been", "will be") : e2, "passive-present": (e2) => (e2.replace("being", "will be"), e2.remove("(is|are|am)"), e2), "passive-future": oh, "present-conditional": (e2) => e2.replace("would", "will"), "past-conditional": (e2) => e2.replace("would", "will"), "auxiliary-future": oh, "auxiliary-past": (e2) => e2.has("used") && e2.has("to") ? (e2.replace("used", "will"), e2.remove("to")) : (e2.replace("did", "will"), e2), "auxiliary-present": (e2) => e2.replace("(do|does)", "will"), "modal-infinitive": oh, "modal-past": oh, "gerund-phrase": (e2, t2) => (t2.root = t2.root.not("#Gerund$"), jh(e2, t2), e2.remove("(had|have)")), "want-infinitive": (e2) => (e2.replace("(want|wants|wanted)", "will want"), e2) }, Th = { tags: true }, Dh = { tags: true }, Hh = function(e2, t2) {
          const n2 = sh(e2);
          return e2.prepend(n2 + " not"), e2;
        }, Eh = function(e2) {
          let t2 = e2.match("be");
          return t2.found ? (t2.prepend("not"), e2) : (t2 = e2.match("(is|was|am|are|will|were)"), t2.found ? (t2.append("not"), e2) : e2);
        }, Gh = (e2) => e2.has("(is|was|am|are|will|were|be)"), Oh = { "simple-present": (e2, t2) => true === Gh(e2) ? Eh(e2) : (e2 = uh(e2, t2), e2 = Hh(e2)), "simple-past": (e2, t2) => true === Gh(e2) ? Eh(e2) : ((e2 = uh(e2, t2)).prepend("did not"), e2), imperative: (e2) => (e2.prepend("do not"), e2), infinitive: (e2, t2) => true === Gh(e2) ? Eh(e2) : Hh(e2), "passive-past": (e2) => {
          if (e2.has("got")) return e2.replace("got", "get", Dh), e2.prepend("did not"), e2;
          const t2 = e2.match("(was|were|had|have)");
          return t2.found && t2.append("not"), e2;
        }, "auxiliary-past": (e2) => {
          if (e2.has("used")) return e2.prepend("did not"), e2;
          const t2 = e2.match("(did|does|do)");
          return t2.found && t2.append("not"), e2;
        }, "want-infinitive": (e2, t2) => e2 = (e2 = Hh(e2)).replace("wants", "want", Dh) };
        var Fh = { api: function(e2) {
          class Verbs extends e2 {
            constructor(e3, t2, n2) {
              super(e3, t2, n2), this.viewType = "Verbs";
            }
            parse(e3) {
              return this.getNth(e3).map(Lc);
            }
            json(e3, t2) {
              const n2 = this.getNth(t2).map((t3) => {
                const n3 = t3.toView().json(e3)[0] || {};
                return n3.verb = function(e4) {
                  const t4 = Lc(e4);
                  e4 = e4.clone().toView();
                  const n4 = eh(e4, t4);
                  return { root: t4.root.text(), preAdverbs: hh(t4.adverbs.pre), postAdverbs: hh(t4.adverbs.post), auxiliary: dh(t4.auxiliary), negative: t4.negative.found, prefix: dh(t4.prefix), infinitive: gh(t4.root), grammar: n4 };
                }(t3), n3;
              }, []);
              return n2;
            }
            subjects(e3) {
              return this.getNth(e3).map((e4) => (Lc(e4), rh(e4).subject));
            }
            adverbs(e3) {
              return this.getNth(e3).map((e4) => e4.match("#Adverb"));
            }
            isSingular(e3) {
              return this.getNth(e3).filter((e4) => true !== rh(e4).plural);
            }
            isPlural(e3) {
              return this.getNth(e3).filter((e4) => true === rh(e4).plural);
            }
            isImperative(e3) {
              return this.getNth(e3).filter((e4) => e4.has("#Imperative"));
            }
            toInfinitive(e3) {
              return this.getNth(e3).map((e4) => {
                const t2 = Lc(e4);
                return function(e5, t3) {
                  const { toInfinitive: n2 } = e5.methods.two.transform.verb, { root: r2, auxiliary: o2 } = t3, a2 = o2.terms().harden();
                  let i2 = r2.text("normal");
                  if (i2 = n2(i2, e5.model, lh(r2)), i2 && e5.replace(r2, i2, mh).tag("Verb").firstTerm().tag("Infinitive"), a2.found && e5.remove(a2), t3.negative.found) {
                    e5.has("not") || e5.prepend("not");
                    const t4 = sh(e5);
                    e5.prepend(t4);
                  }
                  return e5.fullSentence().compute(["freeze", "lexicon", "preTagger", "postTagger", "unfreeze", "chunks"]), e5;
                }(e4, t2, eh(e4, t2).form);
              });
            }
            toPresentTense(e3) {
              return this.getNth(e3).map((e4) => {
                const t2 = Lc(e4), n2 = eh(e4, t2);
                return n2.isInfinitive ? e4 : function(e5, t3, n3) {
                  return Nh.hasOwnProperty(n3) ? ((e5 = Nh[n3](e5, t3)).fullSentence().compute(["tagger", "chunks"]), e5) : e5;
                }(e4, t2, n2.form);
              });
            }
            toPastTense(e3) {
              return this.getNth(e3).map((e4) => {
                const t2 = Lc(e4), n2 = eh(e4, t2);
                return n2.isInfinitive ? e4 : function(e5, t3, n3) {
                  return bh.hasOwnProperty(n3) ? ((e5 = bh[n3](e5, t3)).fullSentence().compute(["tagger", "chunks"]), e5) : e5;
                }(e4, t2, n2.form);
              });
            }
            toFutureTense(e3) {
              return this.getNth(e3).map((e4) => {
                const t2 = Lc(e4), n2 = eh(e4, t2);
                return n2.isInfinitive ? e4 : function(e5, t3, n3) {
                  return e5.has("will") || e5.has("going to") ? e5 : Ih.hasOwnProperty(n3) ? ((e5 = Ih[n3](e5, t3)).fullSentence().compute(["tagger", "chunks"]), e5) : e5;
                }(e4, t2, n2.form);
              });
            }
            toGerund(e3) {
              return this.getNth(e3).map((e4) => {
                const t2 = Lc(e4), n2 = eh(e4, t2);
                return n2.isInfinitive ? e4 : function(e5, t3) {
                  const { toInfinitive: n3, conjugate: r2 } = e5.methods.two.transform.verb, { root: o2, auxiliary: a2 } = t3;
                  if (e5.has("#Gerund")) return e5;
                  let i2 = o2.text("normal");
                  i2 = n3(i2, e5.model, lh(o2));
                  const s2 = r2(i2, e5.model).Gerund;
                  if (s2) {
                    const t4 = ih(e5);
                    e5.replace(o2, s2, Th), e5.remove(a2), e5.prepend(t4);
                  }
                  return e5.replace("not is", "is not"), e5.replace("not are", "are not"), e5.fullSentence().compute(["tagger", "chunks"]), e5;
                }(e4, t2, n2.form);
              });
            }
            toPastParticiple(e3) {
              return this.getNth(e3).map((e4) => {
                const t2 = Lc(e4), n2 = eh(e4, t2);
                return n2.isInfinitive ? e4 : function(e5, t3, n3) {
                  return wh.hasOwnProperty(n3) ? ((e5 = wh[n3](e5, t3)).fullSentence().compute(["tagger", "chunks"]), e5) : ((e5 = yh(e5, t3)).fullSentence().compute(["tagger", "chunks"]), e5);
                }(e4, t2, n2.form);
              });
            }
            conjugate(e3) {
              const { conjugate: t2, toInfinitive: n2 } = this.world.methods.two.transform.verb;
              return this.getNth(e3).map((e4) => {
                const r2 = Lc(e4), o2 = eh(e4, r2);
                "imperative" === o2.form && (o2.form = "simple-present");
                let a2 = r2.root.text("normal");
                if (!r2.root.has("#Infinitive")) {
                  const t3 = lh(r2.root);
                  a2 = n2(a2, e4.model, t3) || a2;
                }
                return t2(a2, e4.model);
              }, []);
            }
            isNegative() {
              return this.if("#Negative");
            }
            isPositive() {
              return this.ifNo("#Negative");
            }
            toPositive() {
              const e3 = this.match("do not #Verb");
              return e3.found && e3.remove("do not"), this.remove("#Negative");
            }
            toNegative(e3) {
              return this.getNth(e3).map((e4) => {
                const t2 = Lc(e4);
                return function(e5, t3, n2) {
                  if (e5.has("#Negative")) return e5;
                  if (Oh.hasOwnProperty(n2)) return Oh[n2](e5, t3);
                  let r2 = e5.matchOne("be");
                  return r2.found ? (r2.prepend("not"), e5) : true === Gh(e5) ? Eh(e5) : (r2 = e5.matchOne("(will|had|have|has|did|does|do|#Modal)"), r2.found ? (r2.append("not"), e5) : e5);
                }(e4, t2, eh(e4, t2).form);
              });
            }
            update(e3) {
              const t2 = new Verbs(this.document, e3);
              return t2._cache = this._cache, t2;
            }
          }
          Verbs.prototype.toPast = Verbs.prototype.toPastTense, Verbs.prototype.toPresent = Verbs.prototype.toPresentTense, Verbs.prototype.toFuture = Verbs.prototype.toFutureTense, e2.prototype.verbs = function(e3) {
            let t2 = function(e4) {
              let t3 = e4.match("<Verb>");
              return t3 = t3.not("#Conjunction"), t3 = t3.not("#Preposition"), t3 = t3.splitAfter("@hasComma"), t3 = t3.splitAfter("[(do|did|am|was|is|will)] (is|was)", 0), t3 = t3.splitBefore("(#Verb && !#Copula) [being] #Verb", 0), t3 = t3.splitBefore("#Verb [to be] #Verb", 0), t3 = t3.splitAfter("[help] #PresentTense", 0), t3 = t3.splitBefore("(#PresentTense|#PastTense) [#Copula]$", 0), t3 = t3.splitBefore("(#PresentTense|#PastTense) [will be]$", 0), t3 = t3.splitBefore("(#PresentTense|#PastTense) [(had|has)]", 0), t3 = t3.not("#Reflexive$"), t3 = t3.not("#Adjective"), t3 = t3.splitAfter("[#PastTense] #PastTense", 0), t3 = t3.splitAfter("[#PastTense] #Auxiliary+ #PastTense", 0), t3 = t3.splitAfter("#Copula [#Gerund] #PastTense", 0), t3 = t3.if("#Verb"), t3.has("(#Verb && !#Auxiliary) #Adverb+? #Copula") && (t3 = t3.splitBefore("#Copula")), t3;
            }(this);
            return t2 = t2.getNth(e3), new Verbs(this.document, t2.pointer);
          };
        } };
        const Vh = function(e2, t2) {
          const n2 = t2.match(e2);
          if (n2.found) {
            const e3 = n2.pronouns().refersTo();
            if (e3.found) return e3;
          }
          return t2.none();
        }, zh = function(e2) {
          if (!e2.found) return e2;
          const [t2] = e2.fullPointer[0];
          return t2 && t2 > 0 ? e2.update([[t2 - 1]]) : e2.none();
        }, Bh = function(e2, t2) {
          let n2 = e2.people();
          return n2 = function(e3, t3) {
            return "m" === t3 ? e3.filter((e4) => !e4.presumedFemale().found) : "f" === t3 ? e3.filter((e4) => !e4.presumedMale().found) : e3;
          }(n2, t2), n2.found ? n2.last() : (n2 = e2.nouns("#Actor"), n2.found ? n2.last() : "f" === t2 ? Vh("(she|her|hers)", e2) : "m" === t2 ? Vh("(he|him|his)", e2) : e2.none());
        }, Sh = function(e2) {
          const t2 = e2.nouns();
          let n2 = t2.isPlural().notIf("#Pronoun");
          if (n2.found) return n2.last();
          const r2 = Vh("(they|their|theirs)", e2);
          return r2.found ? r2 : (n2 = t2.match("(somebody|nobody|everybody|anybody|someone|noone|everyone|anyone)"), n2.found ? n2.last() : e2.none());
        }, $h = function(e2, t2) {
          let n2 = e2.before(), r2 = t2(n2);
          return r2.found ? r2 : (n2 = zh(e2), r2 = t2(n2), r2.found ? r2 : (n2 = zh(n2), r2 = t2(n2), r2.found ? r2 : e2.none()));
        };
        var Mh = { compute: { coreference: function(e2) {
          e2.pronouns().if("(he|him|his|she|her|hers|they|their|theirs|it|its)").forEach((e3) => {
            let t2 = null;
            e3.has("(he|him|his)") ? t2 = $h(e3, (e4) => Bh(e4, "m")) : e3.has("(she|her|hers)") ? t2 = $h(e3, (e4) => Bh(e4, "f")) : e3.has("(they|their|theirs)") && (t2 = $h(e3, Sh)), t2 && t2.found && function(e4, t3) {
              t3 && t3.found && (e4.docs[0][0].reference = t3.ptrs[0]);
            }(e3, t2);
          });
        } }, api: function(e2) {
          class Pronouns extends e2 {
            constructor(e3, t2, n2) {
              super(e3, t2, n2), this.viewType = "Pronouns";
            }
            hasReference() {
              return this.compute("coreference"), this.filter((e3) => e3.docs[0][0].reference);
            }
            refersTo() {
              return this.compute("coreference"), this.map((e3) => {
                if (!e3.found) return e3.none();
                const t2 = e3.docs[0][0];
                return t2.reference ? e3.update([t2.reference]) : e3.none();
              });
            }
            update(e3) {
              const t2 = new Pronouns(this.document, e3);
              return t2._cache = this._cache, t2;
            }
          }
          e2.prototype.pronouns = function(e3) {
            let t2 = this.match("#Pronoun");
            return t2 = t2.getNth(e3), new Pronouns(t2.document, t2.pointer);
          };
        } };
        return d.plugin(eu), d.plugin(tu), d.plugin(lu), d.plugin(Mh), d.plugin(Cu), d.plugin(Eu), d.plugin(Lu), d.plugin(Ac), d.plugin(Ic), d.plugin(Hc), d.plugin(Bc), d.plugin(Fh), d;
      });
    }
  });

  // build/vendor-entry.js
  module.exports = require_compromise_three();

  __vendoredModules__['compromise'] = module.exports;
})();
function __patchedRequire__(name) {
  return Object.prototype.hasOwnProperty.call(__vendoredModules__, name)
    ? __vendoredModules__[name]
    : __nodeRequire__(name);
}
// ---- End vendored dependency --------------------------------------------

(function (require) {
/*
 * Amoeba - An Obsidian plugin that brings movement and life to Graph view.
 * Copyright (C) 2026 Gregory Manni
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

const {
  Plugin,
  PluginSettingTab,
  Setting,
  Notice,
  TFile,
  TFolder,
  setIcon,
  AbstractInputSuggest,
  normalizePath,
  Platform,
  getFrontMatterInfo,
} = require('obsidian');

// Rule-based grammar/tagging for the Vault Poem feature — fully offline,
// no network or model calls. Bundled at build time (see build/assemble.js);
// this require() only ever resolves the vendored copy, never fetched at
// runtime. Third-party library, MIT licensed (full license text embedded
// in the vendored bundle by assemble.js).
const nlp = require('compromise');

// Lazily resolved on first call, not at load time — see
// isRecognizedEnglishWord() below. undefined = not looked up yet; null =
// looked up and unavailable (mobile, or require('electron') failing for
// any other reason).
let cachedWebFrame;

// Rejects a term whose RAW surface text (as it actually appeared in the
// note — see harvestWordsFromText(), which checks this against
// `original.text`, never against the already-lowercased/normalized word)
// contains anything outside the ordinary English alphabet, apostrophes
// (both the plain ' and the curly '/' a smart-quote autoreplace or pasted
// text commonly uses in contractions like "don't"), or hyphens (kept for
// compounds like "co-benefit"). Must run against the untouched surface
// text specifically: compromise's own `.normal` field folds accented
// characters to their plain-ASCII equivalents as part of its normalization
// ("café" -> "cafe", "mañana" -> "manana") — exactly the signal this check
// needs, silently gone by the time any already-normalized word reaches
// isRecognizedEnglishWord() below. See that function's comment for why
// this exists as a separate, earlier layer rather than folded into it.
const NON_ENGLISH_CHAR_PATTERN = /[^a-z'‘’-]/;

// English has exactly three standalone one-letter words — "a", "i", "o"
// (vocative "O") — the complete closed set, not a trimmed source list.
// "a"/"i" are usually already routed to the determiner/subject-pronoun
// closed classes earlier in harvestWordsFromText(); this mainly catches a
// stray single letter surfacing as a Noun/Adjective/Adverb candidate.
const POEM_1_LETTER_WORDS = ['a', 'i', 'o'];

// Curated allowlists of real 2- and 3-letter English words, hand-trimmed
// from standard word-list sources to drop abbreviations/initialisms,
// interjection/filler sounds (onomatopoeia like "shh"), and obscure or
// archaic entries no general reader would recognize as current English —
// not a mechanical dictionary dump, which would let through enough
// dialectal/trivia filler to look like nonsense fragments in a poem.
// Common casual/slang words in real current use are kept regardless of
// formality. A judgment pass over source lists of ~1,450 words, not a
// guaranteed-perfect one.
const POEM_2_LETTER_WORDS = [
  'ad', 'ah', 'am', 'an', 'as', 'at', 'aw', 'ax', 'ay',
  'be', 'bi', 'by',
  'da', 'do',
  'eh', 'el', 'em', 'er', 'ex',
  'fa',
  'gi', 'go',
  'ha', 'he', 'hi', 'ho',
  'id', 'if', 'in', 'is', 'it',
  'la', 'lo',
  'ma', 'me', 'mi', 'mo', 'mu', 'my',
  'no', 'nu',
  'of', 'oh', 'oi', 'om', 'on', 'ow', 'ox', 'oy',
  'pa', 'pi', 'po',
  'qi',
  're',
  'sh', 'so',
  'ta', 'te', 'ti', 'to',
  'um', 'up', 'us',
  'we',
  'xi',
  'ye', 'yo',
];
const POEM_3_LETTER_WORDS = [
  'abs', 'ace', 'act', 'add', 'ado', 'ads', 'adz', 'aft', 'age', 'ago', 'aha', 'ahi', 'aid', 'ail',
  'aim', 'air', 'ale', 'all', 'alp', 'alt', 'amp', 'and', 'ant', 'any', 'ape', 'app', 'apt', 'arc',
  'are', 'ark', 'arm', 'art', 'ash', 'ask', 'asp', 'ass', 'ate', 'auk', 'ave', 'awe', 'awl', 'axe',
  'aye',
  'bad', 'bae', 'bag', 'ban', 'bao', 'bar', 'bat', 'bay', 'bed', 'bee', 'beg', 'bet', 'bib', 'bid',
  'big', 'bin', 'bio', 'bit', 'biz', 'boa', 'bog', 'boo', 'bop', 'bot', 'bow', 'box', 'boy', 'bra',
  'bro', 'bud', 'bug', 'bum', 'bun', 'bus', 'but', 'buy', 'bye',
  'cab', 'cad', 'caf', 'cam', 'can', 'cap', 'car', 'cat', 'caw', 'chi', 'cig', 'cob', 'cod', 'cog',
  'con', 'coo', 'cop', 'cot', 'cow', 'cox', 'coy', 'cry', 'cub', 'cud', 'cue', 'cup', 'cur', 'cut',
  'dab', 'dad', 'dam', 'day', 'deb', 'def', 'den', 'dev', 'dew', 'did', 'die', 'dig', 'dim', 'din',
  'dip', 'dis', 'doc', 'doe', 'dog', 'dom', 'don', 'dry', 'dub', 'dud', 'due', 'dug', 'duh', 'duo',
  'dye',
  'ear', 'eat', 'eau', 'ebb', 'eco', 'egg', 'ego', 'eke', 'elf', 'elk', 'elm', 'emo', 'emu', 'end',
  'eon', 'era', 'err', 'eta', 'eve', 'ewe', 'eye',
  'fab', 'fad', 'fam', 'fan', 'far', 'fat', 'fav', 'fax', 'fed', 'fee', 'few', 'fez', 'fib', 'fig',
  'fin', 'fir', 'fit', 'fix', 'flu', 'fly', 'fob', 'foe', 'fog', 'fop', 'for', 'fox', 'fro', 'fry',
  'fun', 'fur',
  'gab', 'gag', 'gal', 'gap', 'gas', 'gay', 'gee', 'gel', 'gem', 'gen', 'get', 'ghi', 'gif', 'gig',
  'gin', 'gnu', 'god', 'goo', 'got', 'gov', 'gum', 'gun', 'gut', 'guv', 'guy', 'gym',
  'had', 'hag', 'haj', 'ham', 'has', 'hat', 'hay', 'hem', 'hen', 'her', 'hew', 'hex', 'hey', 'hid',
  'him', 'hip', 'his', 'hit', 'hob', 'hod', 'hoe', 'hog', 'hon', 'hop', 'hot', 'how', 'hub', 'hue',
  'hug', 'huh', 'hum', 'hun', 'hut',
  'ice', 'ick', 'icy', 'ilk', 'ill', 'imp', 'ink', 'inn', 'ion', 'ire', 'irk', 'ish', 'ism', 'iso',
  'its', 'ivy',
  'jab', 'jag', 'jam', 'jar', 'jaw', 'jay', 'jet', 'jib', 'jig', 'job', 'jog', 'jot', 'joy', 'jug',
  'jut',
  'kat', 'keg', 'ken', 'key', 'kid', 'kin', 'kip', 'kit', 'koi',
  'lab', 'lad', 'lap', 'law', 'lax', 'lay', 'lea', 'led', 'lee', 'leg', 'lei', 'let', 'lib', 'lid',
  'lie', 'lip', 'lit', 'lob', 'log', 'loo', 'lot', 'low', 'lox', 'lug', 'luv', 'lux', 'lye',
  'mac', 'mad', 'mag', 'mam', 'man', 'map', 'mar', 'mat', 'max', 'may', 'med', 'meg', 'meh', 'men',
  'met', 'mew', 'mic', 'mid', 'mil', 'mix', 'mob', 'mod', 'moi', 'mom', 'mon', 'moo', 'mop', 'mow',
  'mud', 'mug', 'mum',
  'nab', 'nag', 'nah', 'nan', 'nap', 'nav', 'nay', 'neg', 'net', 'new', 'nib', 'nil', 'nip', 'nit',
  'nix', 'nod', 'nor', 'not', 'now', 'nth', 'nub', 'nun', 'nut',
  'oaf', 'oak', 'oar', 'oat', 'odd', 'ode', 'off', 'oft', 'ohm', 'oil', 'old', 'ole', 'one', 'opt',
  'orb', 'orc', 'ore', 'our', 'out', 'ova', 'owe', 'owl', 'own',
  'pad', 'pal', 'pan', 'par', 'pat', 'paw', 'pay', 'pea', 'pec', 'pee', 'peg', 'pen', 'pep', 'per',
  'pet', 'pew', 'phi', 'pho', 'pic', 'pie', 'pig', 'pin', 'pip', 'pit', 'ply', 'pod', 'poi', 'pol',
  'pom', 'poo', 'pop', 'pot', 'pow', 'pro', 'pry', 'pub', 'pug', 'pun', 'pup', 'pus', 'put', 'pwn',
  'qat', 'qin', 'qua',
  'rad', 'rag', 'raj', 'ram', 'ran', 'rap', 'rat', 'raw', 'ray', 'rec', 'red', 'ref', 'rem', 'rep',
  'rev', 'rex', 'rho', 'rib', 'rid', 'rig', 'rim', 'rip', 'rob', 'roc', 'rod', 'roe', 'rom', 'roo',
  'rot', 'row', 'rub', 'rue', 'rug', 'rum', 'run', 'rut', 'rye',
  'sac', 'sad', 'sap', 'sat', 'saw', 'sax', 'say', 'sea', 'sec', 'see', 'set', 'sew', 'sex', 'she',
  'shy', 'sib', 'sic', 'sim', 'sin', 'sip', 'sir', 'sis', 'sit', 'six', 'ska', 'ski', 'sky', 'sly',
  'sob', 'sod', 'sol', 'son', 'sou', 'sow', 'soy', 'spa', 'spy', 'sri', 'sty', 'sub', 'sue', 'sum',
  'sun', 'sup',
  'tab', 'tad', 'tag', 'taj', 'tam', 'tan', 'tao', 'tap', 'tar', 'tat', 'tau', 'tax', 'tea', 'tee',
  'ten', 'the', 'tho', 'thy', 'tic', 'tie', 'tin', 'tip', 'toe', 'tom', 'ton', 'too', 'top', 'tor',
  'tot', 'tow', 'toy', 'try', 'tub', 'tug', 'tum', 'tux', 'two',
  'ufo', 'ugh', 'uke', 'ump', 'uni', 'ups', 'urn', 'use', 'ute',
  'vac', 'van', 'vat', 'vax', 'veg', 'vet', 'vex', 'via', 'vie', 'vim', 'vow',
  'wad', 'wag', 'wan', 'war', 'was', 'wax', 'way', 'web', 'wed', 'wee', 'wet', 'who', 'why', 'wig',
  'win', 'wit', 'wiz', 'woe', 'wok', 'won', 'woo', 'wow', 'wry',
  'yah', 'yak', 'yam', 'yap', 'yaw', 'yay', 'yea', 'yen', 'yep', 'yes', 'yet', 'yew', 'yin', 'yip',
  'yob', 'yon', 'you', 'yuk', 'yum', 'yup',
  'zag', 'zap', 'zed', 'zee', 'zen', 'zig', 'zin', 'zip', 'zit', 'zoo',
];
// Merged, lowercased once at load time — every harvested word reaching
// isRecognizedEnglishWord() is already lowercase by construction, but
// lowercasing here too is a cheap, harmless guard against that ever
// changing silently.
const POEM_ALLOWED_SHORT_WORDS = new Set(
  [...POEM_1_LETTER_WORDS, ...POEM_2_LETTER_WORDS, ...POEM_3_LETTER_WORDS].map((w) => w.toLowerCase())
);

// Whether `word` is a real English word rather than a fragment (truncated
// token, OCR noise, typo) — filters Vault Poem harvesting. Complementary to
// NON_ENGLISH_CHAR_PATTERN above (checked earlier, against raw surface
// text): that catches accented foreign words, this catches gibberish/typos
// that compromise's tagger can't flag as unknown (it tags unrecognized
// text with a confident guess rather than marking it unknown).
//
// Words of length 1-3 are checked against POEM_ALLOWED_SHORT_WORDS instead
// of spellcheck below (see that constant's comment). Everything else goes
// through Electron's spellcheck dictionary (webFrame.isWordMisspelled()) —
// desktop-only, fails open (nothing filtered) on mobile or if requiring
// 'electron' fails. Not fully English-specific either: the OS/Electron
// spellchecker can have other languages active too, so an unaccented
// foreign word can still slip through.
function isRecognizedEnglishWord(word) {
  if (word && word.length >= 1 && word.length <= 3) {
    return POEM_ALLOWED_SHORT_WORDS.has(word);
  }
  if (cachedWebFrame === undefined) {
    cachedWebFrame = null;
    if (Platform.isDesktopApp) {
      try {
        cachedWebFrame = require('electron').webFrame;
      } catch (e) {
        cachedWebFrame = null;
      }
    }
  }
  if (!cachedWebFrame || typeof cachedWebFrame.isWordMisspelled !== 'function') return true;
  try {
    return !cachedWebFrame.isWordMisspelled(word);
  } catch (e) {
    return true; // fail open — never let a spellcheck error block harvesting
  }
}

// Poem-word linking is decided by a flat role check (see POEM_LINKED_ROLES
// near POEM_TITLE_CASE_LOWERCASE_ROLES, and renderPoemSlot()): every noun/
// verb/adjective role gets linked regardless of whether compromise's
// lexicon happens to recognize the word.

// A few things below reach past the documented Plugin API into internal
// Obsidian structures that aren't part of the official TypeScript types.
// They've been stable in practice, but could change without notice in a
// future release:
//   - metadataCache.isUserIgnored()      — Excluded files check, see isUserIgnored()
//   - app.internalPlugins.plugins.graph  — core Graph view plugin, see ensureGraphColorGroup()
//   - leaf.view.fileItems                — File Explorer's row lookup, see getFolderRowEl()
//   - leaf.view.dataEngine               — a Graph pane's live options, see ensureGraphColorGroup()
// Every call site below is written to degrade gracefully — no-op or fall
// back to a safe default — if the internal shape it depends on changes.

// localStorage key (via app.saveLocalStorage()/loadLocalStorage(), not
// settings/data.json) for whether Amoeba is disabled on this specific
// device. data.json lives inside the vault and travels with it through
// whatever syncs the vault (iCloud, Obsidian Sync, a plain file-sync
// service) — a device-scoped override has to live outside that, or it
// would just turn into "disabled everywhere" the moment it synced.
// localStorage is per-device by design, so this stays put regardless of
// how the vault itself is kept in sync.
const DEVICE_DISABLED_KEY = 'amoeba-disabled-on-this-device';

// Frontmatter property that starts/stops the amoeba, shown as-is in
// Obsidian's Properties panel — the key itself is the human-readable label.
const FIELD_ENABLED = 'Run Amoeba';
// Legacy field name. migrateLegacyEnabledField() carries its value over to
// FIELD_ENABLED and removes this key.
const LEGACY_FIELD_ENABLED = 'amoeba';
// Frontmatter property mirroring the Scan for broken links setting — same
// idea as FIELD_ENABLED above (checkbox and setting can't drift out of sync;
// see setCleanupHelper()/setFrontmatterScanning()), just for cleanupHelper
// instead of the running state. Unchecked (the default) is 'visualOnly';
// checked is 'on'.
const FIELD_SCAN = 'Scan for broken links';
// Markers delimiting the note's managed content blocks.
const LINK_BLOCK_START = '%% amoeba-link %%';
const LINK_BLOCK_END = '%% /amoeba-link %%';
const LOG_BLOCK_START = '%% amoeba-broken-links-log %%';
const LOG_BLOCK_END = '%% /amoeba-broken-links-log %%';
const PSEUDOPODS_BLOCK_START = '%% amoeba-pseudopods %%';
const PSEUDOPODS_BLOCK_END = '%% /amoeba-pseudopods %%';
// Legacy marker names. migrateLegacyPseudopodBlockMarkers() rewrites these
// to the current markers in place, before ensureNoteStructure() runs.
const LEGACY_ARMS_BLOCK_START = '%% amoeba-arms %%';
const LEGACY_ARMS_BLOCK_END = '%% /amoeba-arms %%';
// Holds the rendered Vault Poem — see the "Vault Poem" section further
// down for the harvesting/pacing/rendering pipeline.
const POEM_BLOCK_START = '%% amoeba-poem %%';
const POEM_BLOCK_END = '%% /amoeba-poem %%';
// The custom obsidian:// action registered in onload() (see
// registerObsidianProtocolHandler()) and rendered as a plain link inside
// the Vault Poem block (see renderPoemRestartLink()) so clearing today's
// poem and starting fresh works for anyone with just this plugin
// installed — no Buttons/Templater/Advanced URI or any other community
// plugin required, since registering a custom obsidian:// action is core
// Obsidian Plugin API. Deliberately a plain Markdown link rather than a
// frontmatter checkbox: a checkbox models ongoing state (see FIELD_ENABLED/
// FIELD_SCAN, both persistent on/off settings), but "restart the poem" is
// a one-time action, not a state — a checkbox modeling it would need the
// plugin to silently re-uncheck itself right after firing, and get that
// exactly right every time, or risk either re-triggering on an unrelated
// frontmatter edit or never firing again after the first stray race. A
// link avoids that whole class of bug: clicking it fires once, there's no
// state to fall out of sync.
const POEM_RESTART_ACTION = 'amoeba-restart-poem';

// Two more obsidian:// actions, for developer testing only — never
// rendered as a link or shown anywhere in the UI (unlike
// POEM_RESTART_ACTION above), reachable only by visiting the exact URI.
// See registerObsidianProtocolHandler() in onload() for the handlers these
// fire, and obsidianRestartPoemUri() for the URI-building pattern.
const TEST_TRIGGER_MITOSIS_ACTION = 'amoeba-test-trigger-mitosis';
const TEST_FAST_TRACK_POEM_ACTION = 'amoeba-test-fast-track-poem';

// Heading order enforced by ensureNoteStructure(): Vault Poem, Broken Link
// Encounters, Note Stream, Pseudopods.
const HEADING_POEM = "#### Today's Vault Poem";
const HEADING_ACTIVE = '#### Note Stream';
const HEADING_CLEANUP = '#### Broken Link Encounters';
const HEADING_PSEUDOPODS = '#### Pseudopods';

// --- Vault Poem word harvesting --------------------------------------------
// Pulls candidate words out of a freshly-visited note's text and sorts them
// into this.poemPool by role, for a later pacing/rendering pass to draw
// from (see writePoemToNote() and friends further down).
//
// Determiner, conjunction, and preposition are read straight from
// compromise's own contextual tag (Determiner/Conjunction/Preposition — see
// harvestWordsFromText()) rather than a fixed word list, since many of
// these words are genuinely multi-role depending on context ("so" is an
// adverb in "so cold" but a conjunction in "so I left"; "to" is a
// preposition in "went to the store" but part of an infinitive elsewhere).
// A fixed list can only pick one answer regardless of what a given
// sentence calls for; trusting compromise's per-instance tag, the same way
// noun/verb/adjective/adverb already do, handles this with no list to
// maintain. Role names throughout this file are compromise's own tag names
// (lowercased/kebab-cased — e.g. 'determiner' for #Determiner,
// 'present-tense' for #PresentTense), not paraphrases, so they can be
// cross-referenced directly against compromise's own docs.
//
// One category compromise has no tag for at all: relative/interrogative
// pronouns ("which", "who", "whom", "whose") come back tagged Preposition
// or QuestionWord in relative-clause use, never anything indicating
// pronoun-hood. Handled by a short fixed list below feeding a dedicated
// 'pronoun' role. Ordinary personal pronouns ("I"/"you"/"they"/"me") aren't
// part of this — compromise already tags those Noun as well as Pronoun, so
// they flow into the ordinary noun bucket further down.
const POEM_RELATIVE_PRONOUNS = new Set(['which', 'who', 'whom', 'whose']);
// A second category compromise has no tag for: "this"/"that"/"these"/
// "those" tag Determiner identically whether modifying a following noun
// ("this book") or standing alone as subject/object ("this is good," a
// demonstrative pronoun) — no distinguishing tag exists. What does
// distinguish them reliably: the word immediately following — determiner
// use is followed by a noun-phrase head, pronoun use by the verb it's the
// subject of ("this IS"). See harvestWordsFromText(), which checks the
// next term's tag before routing a Determiner-tagged demonstrative to
// 'determiner' vs. the dedicated 'demonstrative-pronoun' role below.
// ("that" also separately tags Conjunction in relative-clause use — "the
// plums that are..." — handled by the ordinary Conjunction branch; this
// only intercepts the Determiner-tagged branch, so the two never
// conflict.)
const POEM_DEMONSTRATIVES = new Set(['this', 'that', 'these', 'those']);
// Personal pronoun family, split by grammatical case, since compromise
// tags every personal pronoun identically (Noun,Pronoun — no case
// distinction at the tag level, subject-form and object-form alike). Left
// alone, a structure slot meant to hold a sentence's subject could just as
// easily draw an object-form pronoun ("them was optionally swimming").
// Split here into a small curated list per case, same technique as
// POEM_RELATIVE_PRONOUNS/POEM_DEMONSTRATIVES above, since this is a fully
// closed class compromise doesn't distinguish. "you"/"it" take the
// identical form in either position, so they get their own
// 'invariant-pronoun' role. "her" is genuinely ambiguous between object
// pronoun ("saw her") and possessive determiner ("her book"), with no tag
// distinguishing the two — treated as object-pronoun here, a disclosed
// simplification, not a chased-down edge case.
const POEM_SUBJECT_PRONOUNS = new Set(['i', 'we', 'they', 'he', 'she']);
const POEM_OBJECT_PRONOUNS = new Set(['me', 'us', 'them', 'him', 'her']);
const POEM_INVARIANT_PRONOUNS = new Set(['you', 'it']);
// Possessive-determiner pronouns ("my," "your," "his," "its," "our,"
// "their") — a small, fully enumerable closed class (6 words),
// grammatically parallel to "the"/"a" (they fill the same slot in front of
// a noun), so they get their own closed-class role rather than being
// forced into the personal-pronoun case lists above, none of which they
// belong to. See POEM_APOSTROPHE_PATTERN's comment and
// harvestWordsFromText() for the 'possessive-noun' role that handles the
// OTHER kind of possessive — an ordinary noun with 's attached — a
// genuinely different, open-class category that shouldn't share a role
// with this closed one.
const POEM_POSSESSIVE_DETERMINERS = new Set(['my', 'your', 'his', 'its', 'our', 'their']);
// Reflexive pronouns are a small, fully enumerable closed class in English
// (8 words) — a curated list rather than compromise's own #Reflexive tag,
// since that tag is inconsistent across these words in practice.
const POEM_REFLEXIVE_PRONOUNS = new Set([
  'myself', 'yourself', 'himself', 'herself', 'itself',
  'ourselves', 'yourselves', 'themselves',
]);
// Pronoun contractions ("she's", "that's", "who's", "there's", ...) — NOT
// possessives (see POEM_POSSESSIVE_DETERMINERS/'possessive-noun' above/
// below for those). A contraction like "she's" is short for "she is"/"she
// has", not a possessive at all, and none of compromise's tags distinguish
// it from an ordinary pronoun — it keeps the whole thing as one token
// tagged plain Noun,Pronoun, identical to "she" alone. What every
// contraction does have, that a real word never does: a literal apostrophe
// still attached mid-word (not stripped the way a bare trailing possessive
// apostrophe is — see 'possessive-noun' below). That's a hard structural
// fact about English spelling in general — no ordinary base-form word
// contains an apostrophe. Checked against the untouched surface text (same
// reasoning as NON_ENGLISH_CHAR_PATTERN above), covering straight and
// curly apostrophes.
const POEM_APOSTROPHE_PATTERN = /['‘’]/;
// Render-time-only punctuation: a comma before a coordinating conjunction
// joining two clause-like chunks. Deliberately narrow — NOT "comma before
// any conjunction-role word": compromise's 'conjunction' role also catches
// subordinating conjunctions ("that", "to", "than", "as", "before"...),
// which don't take a comma. Only the classic FANBOYS coordinating set gets
// the comma. compromise has no clause-boundary or punctuation-insertion
// API at all, so there's no general way to decide where a period or
// semicolon "should" go in harvested text — this rule is the one
// exception that's well-founded, since it only depends on the
// already-tracked 'conjunction' role and a fixed word list, never on
// meaning.
const POEM_COORDINATING_CONJUNCTIONS = new Set(['and', 'but', 'or', 'nor', 'yet', 'so']);
// Render-time-only dynamic line wrap: once the run of words since the last
// break is longer than 3 words, insert a break right after the next
// noun/plural-noun encountered from that point on — never mid-run, only
// ever at a noun boundary, and never forced if no noun ever turns up (a
// run with no noun in it stays one line, however long). This means each
// entry in a structure's `lines`/title-less body array is no longer
// rendered as one literal line — it's a STANZA (see renderPoemStanza()):
// the actual visual line breaks inside it are computed dynamically by this
// rule, while a blank line still separates one array entry from the next,
// same as stanzas in a real poem. Applies uniformly to every structure's
// body, including single-line ones, which can now wrap into multiple
// lines — that's intentional, not a special case. Excludes the title
// (rendered separately by renderPoemTitle(), untouched by this constant).
const POEM_LINE_WRAP_WORD_LIMIT = 3;
// A second, independent render-time line-break rule, layered on top of the
// noun-triggered one above rather than replacing it: every adjective
// (plain/comparative/superlative — see POEM_ADJECTIVE_ROLES) gets a small
// chance of a break right after it, but only once the current visual line
// is already at least 2 words long (counting the adjective itself) — so an
// adjective that's the very first word of a fresh line never qualifies.
// Rolled left-to-right across the whole poem body, sharing the same
// sinceBreak counter the noun rule uses (see renderPoemStanza()): a break
// from either rule resets the count for whichever rule looks at it next.
// 0.12 is a "small chance" — enough to occasionally reshape line lengths
// without becoming the dominant source of breaks.
const POEM_ADJECTIVE_BREAK_CHANCE = 0.12;
const POEM_ADJECTIVE_BREAK_MIN_LINE_WORDS = 2;
// A short, manually-curated denylist of specific words confirmed to come
// back mistagged by compromise even with full sentence context — not a
// general suffix/prefix rule (most words sharing a suffix/prefix with an
// entry here tag correctly; these are specific, isolated exceptions). Add
// to this only after confirming a word is genuinely mistagged both in
// isolation and in a plain sentence, not on a hunch — a general heuristic
// to catch this class of case tends to be false in enough legitimate
// constructions to do more harm than good.
// Confirmed mistagged by compromise across multiple contexts (isolated and
// in plain sentences), not vault-tuned exclusions — general library
// quirks that would misfire the same way in any vault containing these
// words. Add to this only after confirming a word is mistagged both in
// isolation and in a plain sentence, not on a hunch.
const POEM_MISTAGGED_WORDS = new Map([
  ['underbelly', 'noun'],
  ['brown', 'adjective'],
  ['soon', 'adverb'],
]);
// Verb roles — split by compromise's own tense/form tags instead of one
// generic 'verb' bucket, since force-normalizing every verb to the
// infinitive breaks subject-verb agreement and tense-dependent
// constructions for any slot that isn't a bare/imperative verb.
//   'infinitive'    — #Infinitive (always co-occurs with #PresentTense).
//                      Normalized via normalizeOpenClassWord() (a no-op
//                      most of the time, since it's usually already base
//                      form).
//   'present-tense' — #PresentTense with none of #Infinitive/#Gerund/
//                      #Copula. Stored as-harvested — lemmatizing would
//                      strip the "-s" agreement this role exists to keep.
//   'gerund'        — #Gerund (compromise only tags this when the -ing
//                      word is functioning verbally; a standalone gerund
//                      used as a noun subject tags #Noun instead and flows
//                      into the ordinary noun role). Stored as-harvested.
//   'past-tense'    — #PastTense — covers both simple past and past
//                      participle in one bucket (compromise's #Participle
//                      tag is inconsistent, so splitting them out isn't
//                      reliable). Stored as-harvested.
//   'modal'         — #Modal (always co-occurs with #Auxiliary) — "will",
//                      "can", "could", "should", "must", "might", "would".
//   'auxiliary'     — #Auxiliary without #Modal or #Copula — "have",
//                      "has", "had", "do", "does", "did", "been".
//                      compromise doesn't distinguish their tense at the
//                      word level (that only exists at the phrase level,
//                      via nlp(text).verbs().json()'s per-phrase grammar
//                      object, not the per-word tags this harvester reads).
//   'copula'        — #Copula — "am", "is", "are", "was", "were", "being",
//                      whether the main linking verb or a
//                      progressive/passive auxiliary. Not split further by
//                      tense/number.
// modal/auxiliary/copula are closed classes, same spirit as
// determiner/conjunction/preposition below — every occurrence is kept (see
// harvestWordsFromText()): no daily dedupe, no POEM_MUNDANE_WORDS filter,
// no isRecognizedEnglishWord() check. infinitive/present-tense/gerund/
// past-tense are open-class content words and keep all three checks.
//
// A short denylist, not a whitelist — filtering candidate words down to a
// "safe"/common lexicon was rejected, since that would suppress exactly
// the vault-specific vocabulary that makes a poem feel tied to the actual
// vault. Only excludes a small handful of especially generic words so they
// don't crowd out more distinctive ones; deliberately not exhaustive, and
// only applies to open-class content roles (noun/plural-noun/adjective/
// adverb/infinitive/present-tense/gerund/past-tense) —
// determiner/conjunction/preposition/modal/auxiliary/copula are inherently
// common words, and that's expected for them.
const POEM_MUNDANE_WORDS = new Set([
  'thing', 'things', 'way', 'ways', 'time', 'times', 'make', 'made', 'get',
  'got', 'go', 'went', 'use', 'used', 'good', 'bad', 'big', 'small', 'nice',
  'new', 'old', 'lot', 'stuff', 'part', 'parts', 'kind', 'sort',
]);
// Rolling cap per role, so a long stretch of harvesting (before a pacing
// pass exists to drain the pool — or simply outpacing it once one does)
// can't grow this.poemPool without bound. Oldest entries drop first, same
// rolling-window philosophy as the amoeba's own Note Stream.
const POEM_POOL_MAX_PER_ROLE = 40;

// A structure is a title (a flat ordered list of role strings) plus an
// ordered list of lines (each itself an ordered list of role strings).
// Rendering walks the title's slots, then each line's slots, in order,
// pulling one harvested word per role from this.poemPool — every single
// word, including determiners and prepositions, comes from a note; nothing
// here is fixed/filler text. A slot whose role never gets matched before
// the day's pacing window closes renders as a blank space instead (see
// POEM_BLANK_SLOT_TEXT) rather than waiting forever or substituting a
// different role. The title renders in bold, above the lines — see
// renderPoemTitle()/writePoemToNote().
//
// Each entry's `lines` are stanzas, not literal rendered lines — see
// POEM_LINE_WRAP_WORD_LIMIT/POEM_ADJECTIVE_BREAK_CHANCE above for how
// visual line breaks are actually computed. Optional per-structure fields:
//   `stanzaSize` (uniform) or `stanzaSizes` (an array) — how `lines`
//     entries group into printed (blank-line-separated) stanzas.
//   `strictLineBreaks: true` — suppresses the comma-before-conjunction
//     rule, the random per-adjective line-break roll, and the noun-break
//     wrap rule, for a structure whose exact line shape needs to be
//     preserved rather than left to those probabilistic/deterministic
//     render rules.
//   `titleMirrorsLine`/`titleMirrorsWordCount` — the title echoes the
//     first N words of a given line index instead of being independently
//     harvested (`title` is then just `[]`).
//   `allLowercase` — suppresses all capitalization (stanza-first-word and
//     title-casing).
//   `lineIndents: { lineIndex: nbspCount }` — prepends a fixed run of
//     POEM_INDENT_UNIT to one line's rendered text.
// Random selection in ensurePoemPoolForToday() adapts automatically to
// however many structures exist here.
//
// A couple of general compromise-tagging quirks worth knowing when
// authoring a new structure: "over" tags Adjective in most constructions,
// never Preposition, so it will never itself fill a 'preposition' slot
// (real prepositions still do). Words like "no" that intuitively read as a
// determiner but don't carry that tag need a closed-class carve-out in
// harvestWordsFromText() (see the "no" case there) rather than a role
// mismatch here.
const POEM_STRUCTURES = [
  {
    name: 'pangram',
    title: ['determiner', 'noun'],
    lines: [
      ['determiner', 'adjective', 'adjective', 'noun', 'present-tense', 'preposition', 'determiner', 'adjective', 'noun'],
    ],
  },
  {
    name: 'cut-flower',
    title: ['adjective', 'plural-noun'],
    lines: [
      [
        'determiner', 'adjective', 'adjective', 'noun', 'conjunction', 'determiner',
        'adjective', 'past-tense', 'noun', 'determiner', 'noun', 'conjunction', 'determiner',
        'adjective', 'noun', 'determiner', 'adverb', 'adverb', 'adjective',
      ],
    ],
  },
  {
    // No fixed punctuation needed — just line breaks and one stanza break.
    // "to" before a noun phrase tags Conjunction (same as before an
    // infinitive) and routes to 'infinitive-marker' via the existing rule.
    // A cardinal number like "84" uses 'cardinal-number' (checks only the
    // Cardinal tag, so a digit numeral routes the same as a spelled-out
    // one) — flagged as an untested edge case: whether a bare digit string
    // can actually pass isRecognizedEnglishWord()'s spellcheck gate in
    // real Obsidian/Electron isn't confirmed. A bare 2-word title with no
    // determiner tags its first word as a past-tense verb, not an
    // adjective (adjective use needs a preceding determiner) — confirmed
    // before choosing the role here.
    name: 'collected-gravities',
    title: ['past-tense', 'plural-noun'],
    // Irregular stanza grouping — 1 line, then 1, then 3 — so the uniform
    // `stanzaSize: N` field doesn't fit; `stanzaSizes` is the general form,
    // an array of per-stanza line counts summing to `lines.length`.
    stanzaSizes: [1, 1, 3],
    lines: [
      ['subject-pronoun', 'infinitive', 'gerund', 'plural-noun', 'infinitive-marker', 'determiner', 'plural-agent-noun', 'subject-pronoun', 'infinitive'],
      ['infinitive', 'gerund', 'possessive-determiner', 'possessive-noun', 'noun'],
      ['conjunction', 'preposition', 'cardinal-number', 'plural-time-noun', 'preposition', 'possessive-determiner', 'plural-noun'],
      ['determiner', 'plural-time-noun'],
      ['determiner', 'plural-time-noun', 'infinitive'],
    ],
  },
  {
    // Title mirrors the first two words of line 1 exactly, via
    // `titleMirrorsLine`/`titleMirrorsWordCount` — see renderPoemTitle() —
    // rather than an independently-harvested `title` array (left empty
    // below, as that mechanism requires).
    //
    // Line 2's opening slot is 'conjunction' even though compromise itself
    // tags "when" as Preposition, never Conjunction, in every context
    // tried — "when" never fills a conjunction slot despite reading like
    // one (same quirk as "over" and the preposition role); ordinary
    // harvested conjunctions still fill the slot fine. Two adjective slots
    // on line 3, both independently harvested.
    //
    // One printed stanza, all 3 lines, no blank lines between them, via
    // the uniform `stanzaSize: 3` field.
    name: 'she-eats',
    title: [],
    titleMirrorsLine: 0,
    titleMirrorsWordCount: 2,
    stanzaSize: 3,
    lines: [
      ['subject-pronoun', 'present-tense', 'determiner', 'adjective', 'agent-noun'],
      ['conjunction', 'subject-pronoun', 'present-tense', 'infinitive-marker', 'infinitive'],
      ['determiner', 'adjective', 'adjective', 'agent-noun'],
    ],
  },
  {
    // `strictLineBreaks: true` here is for the noun-break suppression
    // specifically: line 1 has noun-family roles at word 2 and word 5,
    // which — unmodified — the ordinary noun-break wrap rule would
    // deterministically split at word 5 every time. No adjective slots and
    // no mid-line conjunctions in this structure, so the comma/adjective-
    // roll parts of the flag are inert here.
    //
    // 3 lines, one printed stanza via `stanzaSize: 3`, no stanza break.
    //
    // Two known limitations worth keeping in mind when editing this
    // structure or the harvesting pipeline:
    //   - Line 3's 'auxiliary' slot can only ever be filled by an
    //     uncontracted, unnegated auxiliary ("do," "does," "have," "has").
    //     A contraction like "don't" produces a [Verb,Auxiliary] term plus
    //     a separate textless [Negative] term that the harvester silently
    //     drops — so a negated auxiliary can never actually reach this
    //     slot, and a rendered line could end up with the opposite
    //     sentiment from what a contracted source would have meant. This
    //     project has no mechanism for fixed negation (unlike fixed
    //     punctuation, see POEM_LINE_PUNCTUATION_RULES), so there's no
    //     clean fix within the existing system.
    //   - Line 2 uses 'determiner'/'noun' for "such release" even though
    //     compromise itself tags that exact bare phrase as Adverb+Infinitive
    //     (a verb/noun-ambiguous word after "such" drags "such" into an
    //     adverb reading too). 'determiner'/'noun' was chosen deliberately
    //     over the literally-verified tag because it reads naturally with
    //     any real noun at render time ("with such joy"), whereas the
    //     verified roles would read as broken English regardless of which
    //     real word filled them.
    //
    // Remaining roles are straightforward: "is" before a gerund ("is
    // weeping") is the standard progressive-auxiliary use of 'copula' (see
    // the role-taxonomy comment above POEM_STRUCTURES). "to" before an
    // infinitive routes to 'infinitive-marker' via the existing rule.
    name: 'absolution',
    title: ['noun'],
    strictLineBreaks: true,
    stanzaSize: 3,
    lines: [
      ['determiner', 'agent-noun', 'preposition', 'determiner', 'noun', 'copula', 'gerund'],
      ['conjunction', 'preposition', 'determiner', 'noun'],
      ['subject-pronoun', 'auxiliary', 'infinitive', 'object-pronoun', 'infinitive-marker', 'infinitive'],
    ],
  },
  {
    // `strictLineBreaks: true` here also covers the noun-break rule (not
    // just the adjective-roll/comma suppression it covers elsewhere): line
    // 4 has two noun-role words more than 3 words apart, which the
    // ordinary noun-break wrap rule would otherwise split deterministically
    // every time.
    //
    // 4 lines, each its own structure line, grouped into 2 printed stanzas
    // via `stanzaSizes: [2, 2]`. Title uses standard title-casing
    // (capitalize both edges, lowercase an internal determiner/
    // conjunction/preposition), independently harvested.
    //
    // Two harvesting quirks specific to this structure's source words:
    //   - "No" never tags Determiner in any construction (Expression or
    //     Negative depending on context) — a genuine gap in the role
    //     taxonomy. Fixed with a one-word closed-class carve-out in
    //     harvestWordsFromText() (see the "no" case there, right before the
    //     Determiner branch), so "no" is now harvestable as 'determiner'
    //     generally, not just for this structure.
    //   - A recognized two-word place name immediately before a noun sweeps
    //     that noun into ProperNoun too (e.g. "the Atlantic ocean" makes
    //     "ocean" itself unharvestable in that context, though "ocean" on
    //     its own is fine). Proper nouns are banned from harvesting
    //     entirely, so the place-name word itself can never fill whatever
    //     role it's given here — 'adjective' was used as the best
    //     syntactic fit for its attributive position; real fillable words
    //     still land there normally from other vault prose.
    //
    // Remaining roles confirmed reliable: gerund (verbal use after "No"),
    // preposition x5 (including "over", which per the pangram note never
    // itself fills a preposition slot but doesn't block real prepositions
    // from doing so), plain noun/plural-noun, adjective, subject-pronoun,
    // infinitive. "Her" uses 'object-pronoun' rather than
    // 'possessive-determiner' — see the existing simplification noted above
    // POEM_OBJECT_PRONOUNS. "carries" agrees with a non-pronoun subject via
    // subjectNumber()'s plain-noun branch (singular for any noun-family
    // subject).
    name: 'on-a-walk',
    title: ['preposition', 'determiner', 'noun'],
    strictLineBreaks: true,
    stanzaSizes: [2, 2],
    lines: [
      ['determiner', 'gerund', 'preposition', 'noun'],
      ['subject-pronoun', 'infinitive', 'preposition', 'determiner', 'adjective', 'noun'],
      ['object-pronoun', 'noun', 'present-tense'],
      ['preposition', 'noun', 'preposition', 'adjective', 'noun', 'preposition', 'plural-noun'],
    ],
  },
  {
    // `strictLineBreaks: true` applied for the adjective-roll suppression:
    // line 4 puts an adjective-role word two words in with a real word
    // still following it, exactly the shape where the random per-adjective
    // break roll could visibly split the line on some fraction of days. No
    // coordinating conjunctions and no noun-role run past the wrap
    // threshold, so the comma-suppression and noun-break parts of the flag
    // are inert here.
    //
    // 4 lines, one printed stanza via `stanzaSize: 4` — every line stays
    // separate (each capitalizes its own first word independently) but
    // grouped into one blank-line-free stanza.
    //
    // Harvesting notes:
    //   - The single-word title tags Gerund (no Infinitive co-occurrence)
    //     -> 'gerund'. First single-word title in POEM_STRUCTURES; needs no
    //     special render handling — `isEdge` is true at both index 0 and
    //     the (also 0) last index, so it capitalizes like any edge word.
    //   - An imperative verb (line 2) still carries the Infinitive tag like
    //     any other bare-form verb, so it routes to 'infinitive' via the
    //     existing Infinitive-wins-routing rule — no special imperative
    //     handling needed; compromise doesn't have a separate imperative
    //     role.
    //   - The line-4 noun ("fleeing"-shaped word) is the interesting case:
    //     bare/verbal use tags Gerund, but as the head of a noun phrase
    //     after a possessive-determiner (this line's exact shape) it tags
    //     plain Noun instead — compromise's gerund/noun split is about
    //     phrase position, not the word itself. -> 'noun' here, matching
    //     what this line actually produces.
    name: 'inhaling',
    title: ['gerund'],
    strictLineBreaks: true,
    stanzaSize: 4,
    lines: [
      ['preposition', 'determiner', 'noun'],
      ['infinitive', 'determiner', 'plural-noun'],
      ['preposition', 'determiner', 'noun'],
      ['possessive-determiner', 'adjective', 'noun'],
    ],
  },
];
// Fixed, structure-authored punctuation — a different thing from the
// render rules above (POEM_LINE_WRAP_WORD_LIMIT, POEM_ADJECTIVE_BREAK_CHANCE,
// POEM_COORDINATING_CONJUNCTIONS), which all apply uniformly by ROLE across
// every structure. This is a fixed rule at a specific WORD POSITION in one
// specific structure's line — a punctuation mark (or a random choice among
// a few) inserted after a given word index, independent of which role word
// actually lands there. A random choice is rolled once when the day's pool
// is created (see buildEmptySlotLine()) and never re-rolled on render, so it
// doesn't flicker across reloads.
// Keyed by structure name -> line index (into that structure's `lines`) ->
// a list of { afterWord, kind } rules. Read by buildEmptyPoemSlots() at
// slot-creation time and applied by renderPoemStanza() at render time via
// each slot's own `fixedPunctuationAfter`.
// Currently empty — no structure needs this right now, but the mechanism
// (POEM_RANDOM_BREAK_CHOICES, buildEmptySlotLine()'s punctuationRules
// argument, renderPoemStanza()'s fixed-punctuation/trailing-punctuation/
// capitalize-after-period handling) is fully general and stays in place for
// whenever a future structure wants fixed, structure-authored punctuation.
const POEM_LINE_PUNCTUATION_RULES = {};
// The three equally-likely outcomes for a 'random-break' rule above.
// 'line-break' renders as an actual newline with no visible character (see
// renderPoemStanza()); 'colon'/'semicolon' render as ':'/';' and stay on
// the same visual line, same as any other inline punctuation.
const POEM_RANDOM_BREAK_CHOICES = ['colon', 'semicolon', 'line-break'];
// ~30 minutes to fill out the whole day's poem — see maybeAdvancePoem().
// Scaled by the amoeba's own current tick delay the same way
// MITOSIS_AVERAGE_INTERVAL_MS is, so the expected fill time holds
// regardless of Speed / Circadian rhythm / "Move like a
// spider". Held per-pool (PoemPool.durationMs) rather than read as this
// constant directly, so the "Fast-track Vault Poem" testing command below
// can shorten just the current day's pool without needing a separate code
// path — see POEM_TEST_DURATION_MS and restartPoemForTesting().
const POEM_TARGET_DURATION_MS = 30 * 60 * 1000;
// Used by the hidden "fast-track Vault Poem" developer testing hook (see
// TEST_FAST_TRACK_POEM_ACTION) to shorten just the current day's pool
// duration, so a whole day's poem — pacing, deadline-forced blanks, all of
// it — can be watched resolve in about a minute instead of the real 30.
const POEM_TEST_DURATION_MS = 60 * 1000;
// Stands in for a slot the pacing window closed out without a matching
// word. Plain repeated spaces would just collapse to one in rendered
// Markdown, so this uses non-breaking spaces instead, to actually hold the
// visible gap.
const POEM_BLANK_SLOT_TEXT = '&nbsp;'.repeat(10);
// One column of a structure-authored line indent (see `lineIndents` in
// renderPoemLines()) — a non-breaking space, same reasoning as
// POEM_BLANK_SLOT_TEXT above: plain leading spaces collapse to nothing once
// Markdown renders the note.
const POEM_INDENT_UNIT = '&nbsp;';
// Stands in for a slot that's still pending (word === null, blank ===
// false) — i.e. the pacing window hasn't closed on it yet, it just hasn't
// been matched to a word so far. Visually distinct from
// POEM_BLANK_SLOT_TEXT on purpose, so a reader glancing at today's
// still-filling poem can tell "still writing this one" from "this role
// just didn't get a word today" at a glance, rather than both looking like
// the same empty gap.
const POEM_PENDING_SLOT_TEXT = '/'.repeat(10);
// Roles a standard title-case convention lowercases (unless the word is
// the title's first or last, which is always capitalized regardless of
// role) — see titleCaseWord()/renderPoemTitle(). The whole pronoun family
// ('relative-pronoun', 'subject-pronoun', 'object-pronoun', etc.) is
// deliberately not in this set: pronouns ("Which", "Who", "They") are
// capitalized in title case same as any other content word.
const POEM_TITLE_CASE_LOWERCASE_ROLES = new Set(['determiner', 'conjunction', 'preposition']);
// The full noun family — every role harvestWordsFromText()'s Noun branch
// can produce, split by compromise's own sub-tags rather than one flat
// 'noun'/'plural-noun' pair. 'agent-noun'/'plural-agent-noun' come from
// compromise's #Actor tag (reliable but narrow — it catches an agentive-
// suffix pattern like "scientist"/"researcher", not every noun that
// happens to refer to a person). 'mass-noun' comes from #Uncountable
// (present but under-applied by compromise itself — a real ceiling in what
// it distinguishes, not a bug here) — no plural counterpart, since
// uncountable nouns don't pluralize. 'time-noun'/'plural-time-noun' come
// from #Date (covers hour/Tuesday/March/yesterday alike — WeekDay/Month/
// Duration are all just more specific Date sub-tags, not split further
// here; a granularity choice, not a limitation). Plain 'noun'/'plural-noun'
// remains the catch-all for every common noun compromise doesn't further
// sub-tag at all — compromise has no abstract/concrete or collective/
// individual distinction to lean on, so this bucket was never going away
// entirely, it's just scoped to "ordinary," not "every noun."
// 'possessive-noun' (a common noun's possessive form) counts as a full
// member of the noun family too — treated as legitimate content, not
// excluded.
const POEM_NOUN_ROLES = new Set([
  'noun', 'plural-noun', 'agent-noun', 'plural-agent-noun', 'mass-noun',
  'time-noun', 'plural-time-noun', 'possessive-noun',
]);
// Roles that render as a clickable link back to their source note — see
// renderPoemSlot(). Nouns/verbs/adjectives, full stop: every role in
// POEM_NOUN_ROLES above for nouns, every degree of adjective ('adjective'/
// 'comparative-adjective'/'superlative-adjective') for adjectives, and the
// four lexical-verb roles ('infinitive'/'present-tense'/'gerund'/
// 'past-tense') for verbs. Deliberately excludes 'modal'/'auxiliary'/
// 'copula' even though they're verb-tagged: those are closed-class helper
// words (a small fixed inventory — is/are/was/were, have/has/had, will/
// can/could — same as determiner/conjunction/preposition), not the kind of
// distinctive word linking is meant to surface. Also excludes 'adverb' and
// the whole pronoun family — 'relative-pronoun', 'demonstrative-pronoun',
// 'subject-pronoun', 'object-pronoun', 'invariant-pronoun',
// 'reflexive-pronoun', 'possessive-determiner' — same closed-class
// reasoning.
const POEM_LINKED_ROLES = new Set([
  ...POEM_NOUN_ROLES, 'adjective', 'comparative-adjective', 'superlative-adjective',
  'infinitive', 'present-tense', 'gerund', 'past-tense',
]);
// Every degree of adjective, treated as one family for the
// POEM_ADJECTIVE_BREAK_CHANCE render rule (see renderPoemStanza()) — a
// superlative or comparative is just as eligible for the roll as a plain
// positive-degree adjective.
const POEM_ADJECTIVE_ROLES = new Set(['adjective', 'comparative-adjective', 'superlative-adjective']);
// Deadline-only fallback order for an unfillable 'past-tense' slot — see
// decidePoemSlot()/backfillPastTenseSlot(). Each of these is a genuine
// lexical verb, just the wrong tense; convertWordToPastTense() re-inflects
// whichever one is tried. modal/auxiliary/copula are deliberately not
// candidates here — they're a different grammatical role entirely (a
// helper verb, not a tense variant of the same lexical verb), not
// something "past-tense-ing" would even make sense for.
const POEM_PAST_TENSE_FALLBACK_ROLES = ['infinitive', 'present-tense', 'gerund'];

// Placeholder shown in the Broken Link Encounters log when scanning is on
// and nothing's been found. Excluded when parsing existing lines in
// syncBrokenLinksLogBatch() so it's never mistaken for a real entry.
const EMPTY_ENCOUNTERS_TEXT = '*No broken links found.*';
// Status line appended after Scan for broken links is set to Off: Visual
// Only — scanning/logging is paused, but any already-logged entries are
// kept and this is shown below them (or alone if the log is empty). Also
// excluded when parsing existing lines.
const CLEANUP_OFF_TEXT = '*This function is currently turned off.*';
// Shown in the Vault Poem block when "Write a daily vault poem" is off and
// there's genuinely nothing there yet — same wording/reasoning as
// CLEANUP_OFF_TEXT above, kept as its own constant (rather than reused
// directly) since the two are conceptually separate settings that just
// happen to share phrasing today.
const POEM_OFF_TEXT = '*This function is currently turned off.*';

// Static explanatory line under the Pseudopods heading, above the managed
// link block. Regenerated fresh by ensureNoteStructure() every load (see
// stripKnownSections()), so editing it here updates it everywhere.
const PSEUDOPODS_DESCRIPTION =
  '*Add your own trailing "pseudopods" by linking orphan notes to the [[Amoeba]]. ' +
  "They won't be deleted by changing the number of pseudopods in settings, or by removing the plugin.*";

// Separates the note's sections. Regenerated fresh on every rebuild (see
// stripKnownSections()), same as PSEUDOPODS_DESCRIPTION.
const SECTION_SEPARATOR = '---';

// Default location for a fresh install — the folder Initialize creates the
// first time it runs. Once created, its live location is tracked in
// settings.amoebaFolderPath instead of assumed to stay here (see
// getAmoebaFolder() and friends below), so dragging the folder elsewhere in
// the vault doesn't orphan it — see the vault 'rename' listener in onload().
const DEFAULT_AMOEBA_FOLDER = 'Amoeba';
// Default Graph view group color for the Amoeba folder, used only the
// moment ensureGraphColorGroup() first creates the group.
const AMOEBA_GRAPH_GROUP_COLOR = '#B7D2C5';
// Amoeba.2's color, for as long as a mitosis event is alive, is derived
// rather than fixed: ensureMitosisGraphColorGroup() takes whatever color
// the main Amoeba group is actually set to and computes a shade darker of
// it via darkerShade() (see its own comment for the exact rule), so a user
// who's recolored their amoeba gets a matching Amoeba.2. AMOEBA_GRAPH_GROUP_COLOR
// above is darkerShade()'s fallback input when no main group can be found
// at all.
// File Explorer icon for the Amoeba folder (see decorateFolderIcon()), and
// the class marking the injected icon element so it's never duplicated.
const AMOEBA_FOLDER_ICON = 'air-vent';
const FOLDER_ICON_CLASS = 'amoeba-folder-icon';
const MIN_PSEUDOPODS = 0;
const MAX_PSEUDOPODS = 10;
// Bounds for the Speed and Simultaneous links settings, shared
// across every running amoeba (see getSpeedMs()/getLinkCount()).
const MIN_SPEED_MS = 250; // 0.25s — matches the Speed slider's floor
const MAX_SPEED_MS = 5000; // 5s — matches the Speed slider's ceiling
const MIN_LINK_COUNT = 1;
const MAX_LINK_COUNT = 10;

// Circadian rhythm's own bounds — a separate pair from MIN_SPEED_MS/
// MAX_SPEED_MS above (the fixed dropdown's range) because they mean
// something different: not a selectable value, but the fixed slowest/
// fastest points getCircadianSpeedMs() oscillates between over the course
// of a day. Deliberately wider than the fixed range's 5s ceiling, so the
// rhythm reads as a clear departure from any fixed speed rather than
// blending into it. See CIRCADIAN_ANCHORS below.
const CIRCADIAN_SLOWEST_MS = 10000; // 10s, at the daily alertness low
const CIRCADIAN_FASTEST_MS = 1000; // 1s, at the daily alertness peak

// "Move like a spider"'s own timing — not a steady rate, so it isn't one of
// the Speed picker's options, and not mentioned in its own
// description either (see the "Move like a spider" setting below) — it's a
// hidden touch, not a documented one. While moving, ticks always land
// exactly SPIDER_TICK_MS apart; every SPIDER_BURST_MIN_MS-SPIDER_BURST_MAX_MS
// or so, one tick's delay is swapped out for a single pause instead — most
// of the time a quick SPIDER_PAUSE_MIN_MS-SPIDER_PAUSE_MAX_MS beat, but
// occasionally (SPIDER_RARE_PAUSE_CHANCE) a longer freeze instead
// (SPIDER_RARE_FREEZE_MIN_MS-SPIDER_RARE_FREEZE_MAX_MS) — before bursting
// resumes. Modeled on how a real spider actually moves: short, quick dashes
// rather than sustained running, each one broken by only a brief beat
// before the next dash, punctuated every so often by a longer stop (as if
// it's sensing something) rather than one that's merely a bit longer than
// usual. See getSpiderTickDelay().
const SPIDER_TICK_MS = 250; // 0.25s, always, whenever it's actually moving
const SPIDER_BURST_MIN_MS = 1500; // 1.5s — a quick dash, not a sustained run
const SPIDER_BURST_MAX_MS = 4000; // 4s
const SPIDER_PAUSE_MIN_MS = 400; // 0.4s — a brief beat between dashes
const SPIDER_PAUSE_MAX_MS = 1200; // 1.2s
const SPIDER_RARE_PAUSE_CHANCE = 0.08; // roughly 1 in 12 pauses
const SPIDER_RARE_FREEZE_MIN_MS = 5000; // 5s
const SPIDER_RARE_FREEZE_MAX_MS = 9000; // 9s
// The Simultaneous links / Pseudopods values "Move like a spider" applies —
// shared with the mismatch check in exitSpiderModeIfMismatched() below, so
// that check and the preset itself can never drift apart from each other.
const SPIDER_LINK_COUNT = 8;
const SPIDER_PSEUDOPOD_COUNT = 8;

// Rare mitosis — a once-in-a-while visual surprise, not a constant behavior.
// Every so often the amoeba splits into a temporary "Amoeba.2", complete
// with its own duplicated pseudopods, which wanders off independently for a
// while before dissolving back. The trigger chance is evaluated every tick,
// scaled by that tick's own delay (state.lastDelayMs, set in scheduleTick())
// against this target average — so the *expected* time between events stays
// ~MITOSIS_AVERAGE_INTERVAL_MS regardless of how fast the amoeba is
// currently ticking (Circadian rhythm, a fixed speed, and "Move like a
// spider" all tick at very different rates). See maybeTriggerMitosis().
const MITOSIS_AVERAGE_INTERVAL_MS = 3 * 60 * 60 * 1000; // ~3 hours, on average

// Mitosis's own choreography timing — three phases (duplicate pseudopods
// one by one, dropping the main body's own bridge link the moment the
// first duplicate exists; then unlink every duplicate pseudopod from its
// original pair in a fast near-simultaneous burst; then the main body
// wanders off on its own), together running about a minute for a typical
// pseudopod count. See startMitosis() and the runMitosisPhase*Step()/
// beginMitosisPhase*() methods below for the full sequence.
// A single fixed beat right after the trigger — the main note stream has
// already emptied, but Amoeba.2 doesn't exist yet. Deliberately a flat
// value rather than a min/max pair: this is one quiet pause, not a rhythm
// that benefits from variation.
const MITOSIS_PRE_SPLIT_REST_MS = 5000; // 5s
const MITOSIS_STAGGER_MIN_MS = 3000; // 3s — gap between each duplicate's own step
const MITOSIS_STAGGER_MAX_MS = 5000; // 5s
// Amoeba.2's own beat once it exists (skeleton written, bridge link to the
// main note visible) but before its first duplicate pseudopod appears —
// its own timer, separate from the phase 1 per-duplicate stagger above, so
// Amoeba.2 reads as pausing on its own before it starts duplicating.
const MITOSIS_AMOEBA2_INTRO_MIN_MS = 3000; // 3s
const MITOSIS_AMOEBA2_INTRO_MAX_MS = 5000; // 5s
// The rest between "every pseudopod has finished duplicating" and phase
// 2's snap — deliberately its own (shorter) pair rather than reusing
// MITOSIS_PHASE_GAP_*, so this specific pause can be tuned on its own: long
// enough to actually read as "resting, fully connected" before the snap,
// not just another beat in the same rhythm as the phase 1 stagger.
const MITOSIS_CONNECTED_REST_MIN_MS = 6000; // 6s
const MITOSIS_CONNECTED_REST_MAX_MS = 7000; // 7s
const MITOSIS_PHASE_GAP_MIN_MS = 2000; // 2s — pause between phases
const MITOSIS_PHASE_GAP_MAX_MS = 3000; // 3s
// Phase 2's own timing (see runMitosisPhase2Step()) — a fast burst rather
// than phase 1's leisurely per-item stagger above, so the pseudopod pairs
// actually separating reads as a dramatic, near-simultaneous "snap" instead
// of another gradual step. Floored at MIN_SPEED_MS (250ms) rather than
// going faster still — that floor exists because note updates faster than
// that are what cause Obsidian trouble in the first place (see the Speed
// slider), and phase 2 writes to a different note on every step, so it's
// no safer to ignore here than anywhere else the plugin writes notes.
const MITOSIS_SNAP_STAGGER_MIN_MS = 250; // 0.25s — matches MIN_SPEED_MS
const MITOSIS_SNAP_STAGGER_MAX_MS = 300; // 0.3s
// How long Amoeba.2 wanders fully independently (phase 3) before dissolving
// back — long enough to read as its own organism for a little while, short
// enough to stay a passing surprise rather than a second permanent fixture.
const MITOSIS_WANDER_MIN_MS = 2 * 60 * 1000; // 2 minutes
const MITOSIS_WANDER_MAX_MS = 4 * 60 * 1000; // 4 minutes
// Dissolve's own per-deletion stagger — its own pair rather than reusing
// MITOSIS_STAGGER_* above, so dissolve timing can be tuned independently
// of phase 1's creation stagger even though they currently match.
const MITOSIS_DISSOLVE_STAGGER_MIN_MS = 3000; // 3s
const MITOSIS_DISSOLVE_STAGGER_MAX_MS = 5000; // 5s

// Plugin-wide settings (not per-note) — live in data.json, not frontmatter.
const DEFAULT_SETTINGS = {
  // Notes in Obsidian's Excluded files list are skipped entirely unless on.
  // Only takes effect once cleanupHelper is 'on' — see isPickable().
  includeExcludedFiles: false,
  // 'circadian' is the default for anyone installing fresh: the interval
  // drifts on its own with time of day (see getCircadianSpeedMs()) instead
  // of holding still at one speed. 'fixed' uses speedMs below verbatim.
  // onload() overrides this to 'fixed' for anyone upgrading from a version
  // before this setting existed, so their existing movement speed doesn't
  // change out from under them — see the migration note there.
  speedMode: 'circadian',
  speedMs: 1000, // 1 second — only used when speedMode is 'fixed'
  linkCount: 3,
  // On by default: harvesting/pacing the daily Vault Poem happens
  // alongside the amoeba's ordinary movement. See setPoemEnabled() for the
  // single place that changes this and reflects it in the note.
  poemEnabled: true,
  // 'on' scans each visited note for broken links and maintains the log.
  // 'visualOnly' (the default) disables scanning/logging, keeping just the
  // movement.
  cleanupHelper: 'visualOnly',
  // Off by default. A global toggle for whether the amoeba keeps doing
  // anything — walking (Note Stream), Vault Poem writing, and broken-link
  // scanning/logging (if that's separately turned on) — while the global
  // Graph view is closed. Off: all of it pauses the instant Graph view
  // closes, same as before this setting existed. On: all of it keeps
  // running in the background exactly as if Graph view were still open.
  // A general "keep interacting in the background" toggle, not
  // scanning-specific — always visible and always in effect regardless of
  // the broken-link scanning setting. See tick()'s keepWalking/logBroken
  // calculation.
  continueScanningWhileGraphClosed: false,
  // Trailing sub-notes, permanently linked from the main note.
  pseudopods: 5,
  // '' scans the whole vault; a folder path restricts scanning to it and
  // its subfolders — see isWithinScanFolder(), the other half of
  // isPickable()'s gate alongside the Excluded files check. Only takes
  // effect once cleanupHelper is 'on', same as includeExcludedFiles.
  scanFolderPath: '',
  // Live location of the Amoeba folder, updated by the vault 'rename'
  // listener in onload() whenever the user moves or renames it. Every path
  // the plugin manages (the main note, the pseudopods subfolder, etc.) is
  // derived from this at call time — see getAmoebaFolder() and friends —
  // rather than assumed to sit at DEFAULT_AMOEBA_FOLDER forever.
  amoebaFolderPath: DEFAULT_AMOEBA_FOLDER,
};

// Per-running-note timer and rolling-window state, keyed by file path in
// this.amoebas.
class AmoebaState {
  constructor(path) {
    this.path = path;
    this.timeoutId = null;
    this.lastPickedPaths = new Set();
    this.window = []; // rolling link set for the (always-on) stepwise walk
    // "Move like a spider"'s burst timing (see getSpiderTickDelay()) — the
    // timestamp its current 0.25s burst window runs until, null until the
    // first tick under spider mode sets it. Lives per-note rather than
    // plugin-wide so multiple concurrently-running amoebas would each burst
    // and pause on their own independent schedule.
    this.spiderBurstEndsAt = null;
    // The delay this note's *current* scheduled tick was given (set in
    // scheduleTick(), read in maybeTriggerMitosis()) — i.e. roughly how much
    // time just elapsed since the previous tick. Used to scale that tick's
    // mitosis trigger chance, so the event's expected frequency stays
    // constant regardless of how fast the amoeba happens to be ticking.
    this.lastDelayMs = null;
  }
}

// Tracks a single in-progress "rare mitosis" event — see the MITOSIS_*
// constants above and the mitosis-prefixed methods below. Only one at a
// time (this.mitosis on the plugin; null when nothing's happening). window/
// lastPickedPaths/spiderBurstEndsAt deliberately mirror AmoebaState's own
// fields, so phase 3's independent wander can reuse stepwiseAdvance() and
// getSpiderTickDelay() verbatim instead of duplicating them.
class MitosisState {
  constructor(pseudopodCount, speedMode, speedMs, linkCount) {
    this.phase = 'phase1'; // 'phase1' | 'phase2' | 'phase3' | 'dissolving'
    this.pseudopodCount = pseudopodCount; // snapshot of Pseudopods at trigger time
    // A genetic copy inherits the parent's traits as they were at the
    // moment of duplication, not an ongoing link to however those traits
    // change afterward — so Amoeba.2 keeps these for its whole life
    // regardless of later changes to Speed / Simultaneous
    // links / speed mode. speedMs is already the *resolved* millisecond
    // value (see getSpeedMs()), so under Circadian rhythm Amoeba.2 doesn't
    // keep drifting with time of day after the split — it inherits the
    // instant, not the rule. Only meaningful when speedMode isn't 'spider'
    // (spider's own bursts-then-pauses timing runs off fixed SPIDER_*
    // constants, not a single ms value — see getMitosisWanderDelay()).
    this.speedMode = speedMode;
    this.speedMs = speedMs;
    this.linkCount = linkCount;
    this.createdPseudopods = 0; // phase 1 progress: duplicates created so far
    this.unlinkedPseudopods = 0; // phase 2 progress: pairs unlinked so far
    this.dissolvedPseudopods = 0; // dissolve progress: duplicates deleted so far
    this.phaseTimeoutId = null; // drives phase 1/2 steps, inter-phase gaps, and dissolve steps
    this.wanderTimeoutId = null; // phase 3's own tick loop, mirrors AmoebaState.timeoutId
    this.dissolveAtTimeoutId = null; // one-shot: when phase 3 gives way to dissolving
    this.window = []; // phase 3's rolling wander window — see stepwiseAdvance()
    this.lastPickedPaths = new Set();
    this.spiderBurstEndsAt = null; // see getSpiderTickDelay()
  }
}

// A day's worth of harvested Vault Poem candidate words, sorted by role
// (article/conjunction/preposition/noun/verb/adjective/adverb) — see the
// POEM_* constants and harvestWordsFromText() above/below. Held on the
// plugin as this.poemPool, replaced wholesale by ensurePoemPoolForToday()
// the moment the calendar day changes, so a pool never spans two days.
class PoemPool {
  constructor(dateKey) {
    this.dateKey = dateKey; // 'YYYY-MM-DD', local time — see todayDateKey()
    // When the day's pacing window closes — see maybeAdvancePoem(). Stored
    // as an epoch ms timestamp (not recomputed from dateKey) so a plugin
    // reload mid-day resumes the same deadline rather than granting a
    // fresh 30 minutes on every restart.
    this.createdAt = Date.now();
    // How long from createdAt until unmatched slots get force-blanked — see
    // maybeAdvancePoem(). Normally POEM_TARGET_DURATION_MS; shortened to
    // POEM_TEST_DURATION_MS by restartPoemForTesting() for the "Fast-track
    // Vault Poem" testing command, so the fast/normal choice lives on the
    // pool itself rather than as a second branch through the pacing logic.
    this.durationMs = POEM_TARGET_DURATION_MS;
    this.byRole = new Map(); // role -> array of { word, path }, oldest first
    // Normalized (already-singularized/infinitive) content words harvested
    // today, so the same distinctive noun/verb/adjective/adverb isn't
    // queued twice in one day. Deliberately not applied to article/
    // conjunction/preposition — see POEM_MUNDANE_WORDS above for why those
    // are exempt from this the same way they're exempt from that filter.
    this.seenWords = new Set();
    // Chosen once, for the whole day, the moment this pool is created —
    // see POEM_STRUCTURES above.
    this.structureIndex = Math.floor(Math.random() * POEM_STRUCTURES.length);
    const structure = POEM_STRUCTURES[this.structureIndex];
    this.title = buildEmptySlotLine(structure.title, undefined, structure.strictLineBreaks);
    this.slots = buildEmptyPoemSlots(structure);
    // Empty for a brand-new pool (no slot has a path yet) — see
    // collectUsedPaths() below for why this is derived rather than a
    // separately-tracked field.
    this.usedPaths = collectUsedPaths(this);
  }
}

// Turns one flat list of role strings (a structure's title, or one line)
// into per-slot state: { role, word, path, blank, adjectiveBreakRoll,
// fixedPunctuationAfter }. `word`/`path` start null (not yet decided);
// `blank` flips true only once the pacing window has closed on a slot the
// pool still couldn't match — see decidePoemSlot()/maybeAdvancePoem(). A
// slot with `word === null` and `blank === false` is still pending, and
// renders as POEM_PENDING_SLOT_TEXT (see renderPoemSlot()) until it's
// actually decided one way or the other, at which point it's either a
// real word or POEM_BLANK_SLOT_TEXT.
//
// `adjectiveBreakRoll` is the POEM_ADJECTIVE_BREAK_CHANCE dice roll for this
// slot, decided ONCE, right here, and never re-rolled — see
// renderPoemStanza(). It's rolled for every adjective-family slot
// regardless of where it lands in its stanza (false for every other role),
// because the eligibility check ("is the current line already >= 2 words")
// depends only on the structure's fixed role sequence, which never changes
// after today's structure is chosen — so the roll can safely happen up
// front, at slot-creation time, well before any word is harvested for it.
// Rolling here (rather than fresh on every render) is what keeps a poem's
// line breaks stable across repeated re-renders during the pacing window
// and across a plugin reload — Math.random() called inside renderPoemStanza
// itself would otherwise make the poem's shape flicker on every save.
//
// `fixedPunctuationAfter` is null unless `punctuationRules` (this line's
// entry from POEM_LINE_PUNCTUATION_RULES, if any) has a rule anchored to
// this slot's position — same "decide once, at slot-creation time, never
// re-roll" reasoning as adjectiveBreakRoll, for the same reason (a
// 'random-break' choice re-rolled on every render would flicker between
// colon/semicolon/line-break on every save instead of staying put for the
// day). A 'comma' rule is deterministic (always 'comma'), but still
// resolved here rather than at render time, so both kinds of rule are read
// the same simple way in renderPoemStanza().
// `strictLineBreaks` skips the adjectiveBreakRoll entirely (always false) —
// a structure whose author wants every line break exactly as given can't
// tolerate the ordinary small per-adjective chance of an unrequested extra
// one. Doesn't touch fixedPunctuationAfter — a structure
// with strictLineBreaks simply has no entry in POEM_LINE_PUNCTUATION_RULES
// to begin with, so there's nothing to suppress there.
function buildEmptySlotLine(roles, punctuationRules, strictLineBreaks) {
  return roles.map((role, i) => {
    const rule = punctuationRules && punctuationRules.find((r) => r.afterWord === i);
    let fixedPunctuationAfter = null;
    if (rule) {
      // 'period' is deterministic, same as 'comma', never part of the
      // POEM_RANDOM_BREAK_CHOICES roll.
      fixedPunctuationAfter =
        rule.kind === 'comma'
          ? 'comma'
          : rule.kind === 'period'
            ? 'period'
            : POEM_RANDOM_BREAK_CHOICES[Math.floor(Math.random() * POEM_RANDOM_BREAK_CHOICES.length)];
    }
    return {
      role,
      word: null,
      path: null,
      blank: false,
      adjectiveBreakRoll:
        !strictLineBreaks && POEM_ADJECTIVE_ROLES.has(role) && Math.random() < POEM_ADJECTIVE_BREAK_CHANCE,
      fixedPunctuationAfter,
    };
  });
}

// Mirrors a structure's `lines` shape exactly — an array of lines, each
// built via buildEmptySlotLine(). The title is built separately (see the
// PoemPool constructor) since it's a single flat line, not a list of them
// (and POEM_LINE_PUNCTUATION_RULES is never keyed for a title, so it never
// needs a punctuationRules argument). Looks up this structure's fixed
// punctuation rules (if any — most structures have none) by name, then by
// each line's own index within `lines`, and hands the matching entry down
// to buildEmptySlotLine() for that line only.
function buildEmptyPoemSlots(structure) {
  const structureRules = POEM_LINE_PUNCTUATION_RULES[structure.name] || {};
  return structure.lines.map((roles, lineIndex) =>
    buildEmptySlotLine(roles, structureRules[lineIndex], structure.strictLineBreaks)
  );
}

// Every source-note path already contributing a word to a DECIDED slot in
// this pool (title or any line) — the "no more than one word per note"
// rule, see drawUnusedPoolEntry()/decidePoemSlot(). Deliberately derived
// by scanning the slots rather than tracked as its own persisted field:
// recomputing it from whatever's actually decided (called once in the
// PoemPool constructor, where it comes out empty since nothing's decided
// yet, and once in deserializePoemPool(), where it reconstructs whatever
// was true when the pool was last saved) means there's no separate piece
// of state that could ever drift out of sync with the slots themselves —
// the slots are the only source of truth. Cheap enough to recompute (a
// handful of slots per structure) that there's no reason to maintain it
// incrementally at load time; it IS maintained incrementally during a live
// session, in decidePoemSlot(), since that's the one place a slot's path
// actually changes after the pool already exists.
function collectUsedPaths(pool) {
  const used = new Set();
  for (const slot of pool.title) {
    if (slot.path) used.add(slot.path);
  }
  for (const line of pool.slots) {
    for (const slot of line) {
      if (slot.path) used.add(slot.path);
    }
  }
  return used;
}

// Capitalizes just the first letter, leaving the rest of the word alone —
// harvested words are always stored lowercase (so dedupe/pool logic never
// has to think about case), so any capitalization is applied only at
// render time, never to the stored word itself. Used for the first
// word of each body line (see renderPoemLines()) and, via titleCaseWord()
// below, for the title.
function capitalizeFirst(word) {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Standard (simplified) title-case convention for the bolded title: the
// first and last word are always capitalized regardless of role; every
// other word is capitalized too *unless* its role is one title case
// conventionally lowercases (article/conjunction/preposition — see
// POEM_TITLE_CASE_LOWERCASE_ROLES). `isEdge` is true for the first and
// last slot in the title.
function titleCaseWord(word, role, isEdge) {
  if (!word) return word;
  if (isEdge || !POEM_TITLE_CASE_LOWERCASE_ROLES.has(role)) return capitalizeFirst(word);
  return word;
}

// a/an agreement — a plain phonetic heuristic, not an NLP judgment.
// Compromise has no concept of pronunciation at all (confirmed: nothing in
// its API distinguishes "a apple" from "a university"), so this doesn't
// belong in harvestWordsFromText() or
// anywhere near compromise's tags; it's applied purely at render time,
// same as capitalizeFirst()/titleCaseWord() above, and never touches the
// stored slot.word. Handles the ordinary case (vowel-letter words sound
// vowel-initial, consonant-letter words don't) plus the standard named
// exceptions on both sides: silent-h words that sound vowel-initial
// despite a consonant spelling ("hour", "honest"), and words that sound
// consonant-initial despite a vowel spelling because they start with a
// "y" glide ("university", "one"). Not exhaustive — no short exception
// list ever is for English spelling — but covers ordinary vault
// vocabulary well; a miss here is a small readability blemish ("a hour"),
// not a broken poem, so it's not worth chasing every last exception.
const POEM_AN_SOUND_EXCEPTIONS = new Set([
  'hour', 'hourly', 'hours', 'honest', 'honestly', 'honesty', 'honor',
  'honors', 'honored', 'honorable', 'honorary', 'heir', 'heirs', 'heiress',
]);
const POEM_A_SOUND_EXCEPTIONS = new Set([
  'university', 'universities', 'universal', 'unique', 'unicorn', 'uniform',
  'uniforms', 'union', 'unions', 'unit', 'units', 'united', 'usual',
  'usually', 'user', 'users', 'used', 'useful', 'europe', 'european',
  'europeans', 'one', 'ones', 'once',
]);
function startsWithVowelSound(word) {
  const w = (word || '').toLowerCase();
  if (POEM_A_SOUND_EXCEPTIONS.has(w)) return false;
  if (POEM_AN_SOUND_EXCEPTIONS.has(w)) return true;
  return /^[aeiou]/.test(w);
}

// Only ever fires when the harvested/stored word is literally "a" or "an"
// — every other determiner ("the", "this", "some", ...) passes through
// untouched. `nextWord` is the next slot's raw stored word (null if that
// slot isn't decided yet, in which case this leaves the article as
// harvested — see renderPoemLines()/renderPoemTitle() for how nextWord is
// found). Because rendering re-runs from scratch on every pacing tick
// (see writePoemToNote()), an article rendered before its neighbor was
// decided self-corrects on the very next render once that neighbor fills
// in — no separate fix-up pass needed.
function correctedIndefiniteArticle(article, nextWord) {
  if (article !== 'a' && article !== 'an') return article;
  if (!nextWord) return article;
  return startsWithVowelSound(nextWord) ? 'an' : 'a';
}

// Copula subject-agreement — same render-time-only, never-touches-stored-
// word approach as correctedIndefiniteArticle() above, applied to a
// different mismatch: a `copula` slot ("am"/"is"/"are"/"was"/"were") is
// harvested independently of whatever subject slot happens to precede it
// in a structure, so nothing previously stopped "This are" or "This were"
// (this/that are singular, so "is"/"was" is what agrees) or, more sharply,
// "am" landing after any subject other than "I" ("the fox am tired" reads
// broken the moment the subject isn't literally "I" — "am" is the most
// restrictive form of "be", correct for exactly one subject).
//
// This is intentionally scoped to *direct* adjacency only — the slot
// immediately before a copula slot in the same title/line — not any
// subject earlier in the sentence. That covers most of what
// POEM_STRUCTURES actually does (a demonstrative-pronoun or noun slot
// sitting right before a copula slot) but not a copula reached through an
// intervening relative pronoun/
// conjunction ("the plums THAT are..." — "are" agrees with "plums," two
// slots back, past a 'conjunction' slot this doesn't look through). Left
// alone in that case rather than guessed at — same fallback-to-unchanged
// philosophy as correctedIndefiniteArticle() when the next word isn't
// known yet.
//
// Deliberately built as a small self-contained lookup rather than handed
// to compromise's own re-conjugation (`nlp(subject + ' ' + copula).verbs()
// .toPresentTense()`), even though that exists and does account for a
// recognized pronoun subject ("I was" -> "I am", "they was" -> "they
// are") — tested, and it does NOT handle a demonstrative subject
// correctly ("this were tired" -> "this ARE tired" via that path, wrong
// number). A lookup this small doesn't need an external, only-partially-
// reliable conjugator anyway.
//
// Tense is preserved, not changed — only person/number is corrected, off
// whichever of "was"/"were" vs. "am"/"is"/"are" the harvested copula word
// already was. subjectRole/subjectWord are the slot immediately before;
// subjectNumber() below turns that into 'first-singular' (I) / 'you' /
// 'plural' (we/they/plural-noun/these/those) / 'singular' (an ordinary
// noun, he/she/it, this/that) / null (can't tell — 'noun' or
// 'demonstrative-pronoun' whose word isn't decided yet, or any other
// preceding role, e.g. reaching a copula through 'conjunction').
//
// One thing worth knowing when authoring a new structure: a "to be"-style
// slot (as in "to be honest") wants role 'infinitive', not 'copula' — bare
// "be" tags #Infinitive in ordinary use (confirmed; it only also picks up
// #Copula after certain auxiliaries, e.g. "will be"), and 'infinitive'
// harvests/renders it as plain "be" with no agreement question at all,
// which is what "to ___" always wants. Only use 'copula' for a slot that's
// actually meant to inflect (is/am/are/was/were).
function subjectNumber(role, word) {
  if (role === 'plural-noun' || role === 'plural-agent-noun' || role === 'plural-time-noun') return 'plural';
  if (role === 'noun' || role === 'agent-noun' || role === 'mass-noun' || role === 'time-noun') {
    // Ordinary common-noun family — always singular by this point (the
    // plural variants are their own roles above), and no longer holds any
    // personal pronoun ("i"/"you"/"we"/"they") the way it used to before
    // the pronoun-case split below — every one of those now arrives via
    // its own dedicated role instead, so the special-casing that used to
    // live here for them is gone, not just unused.
    return word ? 'singular' : null;
  }
  if (role === 'demonstrative-pronoun') {
    if (!word) return null;
    return word === 'these' || word === 'those' ? 'plural' : 'singular';
  }
  if (role === 'subject-pronoun') {
    if (!word) return null;
    if (word === 'i') return 'first-singular';
    if (word === 'we' || word === 'they') return 'plural';
    return 'singular'; // he/she
  }
  if (role === 'object-pronoun') {
    // A structure slot shouldn't really place an object-form pronoun
    // right before a copula/auxiliary it's meant to agree with — that's
    // a template-authoring mismatch, not something this function can fix.
    // Handled defensively anyway rather than left to guess wrong: "us"/
    // "them" are plural, the rest (me/him/her) default to singular.
    if (!word) return null;
    return word === 'us' || word === 'them' ? 'plural' : 'singular';
  }
  if (role === 'invariant-pronoun') {
    if (!word) return null;
    return word === 'you' ? 'you' : 'singular'; // 'it'
  }
  return null;
}
function correctedCopula(copulaWord, subjectRole, subjectWord) {
  if (!copulaWord) return copulaWord;
  const isPast = copulaWord === 'was' || copulaWord === 'were';
  const number = subjectNumber(subjectRole, subjectWord);
  if (!number) return copulaWord;
  if (number === 'first-singular') return isPast ? 'was' : 'am';
  if (number === 'you' || number === 'plural') return isPast ? 'were' : 'are';
  return isPast ? 'was' : 'is';
}

// Auxiliary subject-agreement — same pattern as correctedCopula() above,
// reusing the same subjectNumber() lookup, for the mismatch that shows up
// when an ordinary singular noun ends up paired with "have" instead of
// "has". Only "have"/"has" and "do"/"does"
// vary by person/number in modern English; "had" and "did" are invariant
// across every subject ("I had", "she had", "they had" — all "had"), so
// this leaves those two untouched rather than guessing at a correction
// that was never wrong to begin with. Same direct-adjacency-only scope as
// correctedCopula() — a subject reached through an intervening slot isn't
// looked for.
const POEM_AUXILIARY_AGREEMENT_FAMILIES = {
  have: { thirdSingular: 'has', other: 'have' },
  has: { thirdSingular: 'has', other: 'have' },
  do: { thirdSingular: 'does', other: 'do' },
  does: { thirdSingular: 'does', other: 'do' },
};
function correctedAuxiliary(auxWord, subjectRole, subjectWord) {
  if (!auxWord) return auxWord;
  const family = POEM_AUXILIARY_AGREEMENT_FAMILIES[auxWord];
  if (!family) return auxWord;
  const number = subjectNumber(subjectRole, subjectWord);
  if (!number) return auxWord;
  if (number === 'first-singular' || number === 'you' || number === 'plural') return family.other;
  return family.thirdSingular;
}

// Present-tense subject-verb agreement — applies to any structure with a
// 'present-tense' slot: English's ordinary present tense has two forms — a bare
// form ("I jump," "we lurk," "they sing") and a third-person-singular "-s"
// form ("he jumps," "the fox lurks," "it sings") — and a word harvested
// from the vault under one form isn't necessarily the form a DIFFERENT
// day's subject actually needs (a present-tense pool built from "she
// arrives" could easily fill a slot that turns out to need "I arrive").
// Same render-time-only, never-touches-stored-word approach as
// correctedCopula()/correctedAuxiliary() above, reusing the same
// subjectNumber() lookup, but conjugates via compromise's per-WORD
// .conjugate() (Infinitive/PresentTense forms) rather than a hand-rolled
// suffix rule — tested against 14 verbs including every tricky orthographic
// case (carry->carries, watch->watches, go->goes, fix->fixes, sing->sings)
// and it handles all of them correctly.
//
// Deliberately NOT using compromise's sentence-level `.verbs().toPresentTense()`
// (i.e. running the subject+verb together through compromise and letting IT
// infer the right form) even though it looks tempting — tested it directly
// across subject pronouns/determiners/nouns first, and it's wrong for two
// concrete cases: "you" incorrectly gets the "-s" form ("you lurks"), and
// "these"/"those" as the subject produce an EMPTY result. Per-word
// .conjugate() plus this project's own subjectNumber() (which already
// correctly categorizes "you" as its own case and "these"/"those" as
// plural) sidesteps both bugs entirely, since the person/number decision
// never goes through compromise's sentence parser at all.
function correctedPresentTenseVerb(word, subjectRole, subjectWord) {
  if (!word) return word;
  const number = subjectNumber(subjectRole, subjectWord);
  if (!number) return word;
  const conjugations = nlp(word).tag('Verb').verbs().conjugate();
  const conj = conjugations && conjugations[0];
  if (!conj) return word;
  if (number === 'first-singular' || number === 'you' || number === 'plural') {
    return conj.Infinitive || word;
  }
  return conj.PresentTense || word;
}

// PoemPool <-> plain-JSON, for persisting today's poem progress into the
// plugin's own stored data (see savePoemPoolData()/loadPoemPoolFromPluginData())
// so a plugin reload resumes instead of restarting the day's poem from
// scratch. Needed only because Map/Set (byRole/seenWords) aren't JSON-native —
// everything else on PoemPool round-trips as plain data already.
function serializePoemPool(pool) {
  return {
    dateKey: pool.dateKey,
    createdAt: pool.createdAt,
    durationMs: pool.durationMs,
    structureIndex: pool.structureIndex,
    title: pool.title,
    slots: pool.slots,
    byRole: Object.fromEntries(pool.byRole),
    seenWords: Array.from(pool.seenWords),
  };
}

function deserializePoemPool(saved) {
  const pool = Object.create(PoemPool.prototype);
  pool.dateKey = saved.dateKey;
  pool.createdAt = saved.createdAt;
  // Older saved state (from before the fast-track testing command existed)
  // won't have this field — default it to the normal duration rather than
  // leaving it undefined, so maybeAdvancePoem()'s deadline math still works.
  pool.durationMs = saved.durationMs || POEM_TARGET_DURATION_MS;
  pool.structureIndex = saved.structureIndex;
  pool.title = saved.title || [];
  pool.slots = saved.slots;
  pool.byRole = new Map(Object.entries(saved.byRole || {}));
  pool.seenWords = new Set(saved.seenWords || []);
  // Not read from `saved` — reconstructed from pool.title/pool.slots,
  // which are already loaded above by this point. See collectUsedPaths()
  // for why this is deliberately derived rather than its own saved field.
  pool.usedPaths = collectUsedPaths(pool);
  return pool;
}

module.exports = class AmoebaPlugin extends Plugin {
  async onload() {
    // Read before anything else touches vault/sync state — a purely local,
    // synchronous read, so there's no window where a sync-driven event
    // could fire before this is set. See DEVICE_DISABLED_KEY.
    this.disabledOnThisDevice = !!this.app.loadLocalStorage(DEVICE_DISABLED_KEY);
    this.amoebas = new Map(); // file path -> AmoebaState
    this.mitosis = null; // the one in-progress mitosis event, if any — see MitosisState
    this.poemPool = null; // today's harvested Vault Poem words — see PoemPool, ensurePoemPoolForToday()
    // path -> outstanding-write count. Each entry means "this many of our
    // own writes to this mitosis-managed file (Amoeba.2 or one of its
    // duplicate pseudopods) haven't had their 'modify' event accounted for
    // yet" — checked and consumed one at a time by the 'modify' listener
    // below via markMitosisWrite()/consumeMitosisWrite(), so a write we
    // made ourselves never gets re-verified (and, if a cachedRead() races
    // it and looks stale, redundantly rewritten). This used to be a plain
    // Set (one path either pending or not), which broke as soon as two of
    // our own writes to the *same* file were ever outstanding at once —
    // e.g. syncMitosisPseudopodLinks() then writeLinks(), back to back,
    // both touching Amoeba.2.md: the first write's 'modify' event would
    // consume the one flag, leaving the second write's own event to find
    // nothing there and fall through to the fallback verification, which
    // could then race the second write while it was still settling and
    // misfire — which is what kept making Amoeba.2's own note flash even
    // after every individual write site was marking correctly. A count
    // handles any number of our own writes to the same path outstanding
    // at once, consumed in order regardless of exactly when each one's
    // event happens to arrive. See markMitosisWrite()/consumeMitosisWrite().
    this.pendingMitosisWrites = new Map();

    const rawData = (await this.loadData()) || {};
    // Migrates the legacy 'arms' settings key to 'pseudopods'.
    if (rawData.arms !== undefined && rawData.pseudopods === undefined) {
      rawData.pseudopods = rawData.arms;
    }
    delete rawData.arms;
    // Whether this vault already had a fixed speed value saved, from
    // before speedMode existed — checked against the raw loaded data, not
    // this.settings, since Object.assign below would otherwise mask it with
    // DEFAULT_SETTINGS.speedMs.
    const hadPriorFixedSpeed =
      Object.prototype.hasOwnProperty.call(rawData, 'speedMs') &&
      !Object.prototype.hasOwnProperty.call(rawData, 'speedMode');
    this.settings = Object.assign({}, DEFAULT_SETTINGS, rawData);
    // Circadian rhythm is the default for a fresh install (see
    // DEFAULT_SETTINGS.speedMode), but anyone upgrading from a version that
    // only ever had a fixed speedMs shouldn't have their movement speed
    // silently change — pin them to 'fixed' at whatever value they already
    // had, persisted immediately so this is a one-time migration rather than
    // something recomputed from rawData on every future load.
    if (hadPriorFixedSpeed) {
      this.settings.speedMode = 'fixed';
      await this.saveSettings();
    }

    this.setupBlocked = false;
    // Paths whose next 'changed' event is expected to be our own
    // processFrontMatter write (from startOn/stop), not a manual edit —
    // checked and consumed by the listener below so writing the property
    // ourselves never gets mistaken for the user toggling the checkbox.
    this.pendingSelfWrites = new Set();
    this.addSettingTab(new AmoebaSettingTab(this.app, this));

    this.addCommand({
      id: 'start',
      name: 'Start Amoeba',
      checkCallback: (checking) => {
        if (this.setupBlocked || this.disabledOnThisDevice) return false;
        if (this.amoebas.has(this.getAmoebaNotePath())) return false; // already running
        if (checking) return true;
        this.initializeAndStart();
        return true;
      },
    });

    this.addCommand({
      id: 'stop',
      name: 'Stop Amoeba',
      checkCallback: (checking) => {
        if (!this.amoebas.has(this.getAmoebaNotePath())) return false;
        if (checking) return true;
        this.stopAmoeba();
        return true;
      },
    });

    // Two testing-only obsidian:// actions — see TEST_TRIGGER_MITOSIS_ACTION/
    // TEST_FAST_TRACK_POEM_ACTION's own comment. Reachable only by visiting
    // the exact URI, never appearing in the Command Palette or anywhere
    // else in the UI; the "amoeba must be running" precondition is enforced
    // here (a Notice explains it rather than silently doing nothing). To use: with the
    // amoeba running, open (paste into a browser's address bar, or
    // anywhere else that opens a URI) —
    //   obsidian://amoeba-test-trigger-mitosis?vault=YOUR_VAULT_NAME
    //   obsidian://amoeba-test-fast-track-poem?vault=YOUR_VAULT_NAME
    // — substituting your real vault name (URL-encoded if it has spaces or
    // punctuation, e.g. a space becomes %20).
    this.registerObsidianProtocolHandler(TEST_TRIGGER_MITOSIS_ACTION, () => {
      if (!this.amoebas.has(this.getAmoebaNotePath())) {
        new Notice('Amoeba: start the amoeba first.');
        return;
      }
      if (this.mitosis) {
        new Notice('Amoeba: mitosis is already in progress.');
        return;
      }
      this.startMitosis();
    });
    this.registerObsidianProtocolHandler(TEST_FAST_TRACK_POEM_ACTION, () => {
      if (!this.amoebas.has(this.getAmoebaNotePath())) {
        new Notice('Amoeba: start the amoeba first.');
        return;
      }
      this.restartPoemForTesting();
    });

    // Clears today's Vault Poem and starts a fresh one. See
    // restartVaultPoem() for what "clear" means here (a whole new pool,
    // not just the display) and why this isn't a frontmatter checkbox. No
    // separate Command Palette entry — the in-note "Construct another poem"
    // link (see renderPoemRestartLink()/obsidianRestartPoemUri()) already
    // covers it. A plain obsidian:// link click routes straight here with
    // no other plugin involved, since registering a custom action is core
    // Plugin API — restartVaultPoem() → writePoemToNote() already no-ops
    // harmlessly if the main note doesn't exist, so nothing else needs
    // guarding here.
    this.registerObsidianProtocolHandler(POEM_RESTART_ACTION, () => {
      this.restartVaultPoem();
    });

    // Runs on every load: migrates legacy data, resumes an already-running
    // amoeba, and keeps an already-initialized note tidy — but never
    // creates the folder, the main note, pseudopod notes, or the Graph
    // view color group. Those only ever happen from initializeAndStart(),
    // triggered by the user via the Initialize button in settings or the
    // Start Amoeba command. See runStartupMaintenance() and
    // initializeAndStart() for the full split.
    this.app.workspace.onLayoutReady(() => this.runStartupMaintenance());

    // The File Explorer redraws a folder's row from scratch on layout
    // changes (panes opening/closing, the explorer toggling, etc.), which
    // wipes out the injected icon — this re-applies it whenever that might
    // have happened. The check inside is a cheap DOM lookup that no-ops if
    // the icon's already there, so firing on every layout change needs no
    // further debouncing.
    this.registerEvent(this.app.workspace.on('layout-change', () => this.decorateFolderIcon()));

    // Metadata cache updates asynchronously after a write, so this is the
    // reliable way to notice a manual edit to the "Run Amoeba" or "Scan for
    // broken links" checkboxes rather than re-checking the cache on every
    // tick. Ticking either box on/off runs the same setter its own settings-
    // tab control uses (skipping the frontmatter write, since the box is
    // already correct) — the checkbox and the settings-tab control are two
    // doors into the same underlying setter, same idea for both fields.
    this.registerEvent(
      this.app.metadataCache.on('changed', async (file) => {
        if (this.pendingSelfWrites.delete(file.path)) return; // our own write, not a manual edit
        const fm = this.app.metadataCache.getFileCache(file)?.frontmatter;
        if (!fm) return;

        if (FIELD_ENABLED in fm) {
          const wantsRunning = fm[FIELD_ENABLED] !== false;
          const isRunning = this.amoebas.has(file.path);
          if (wantsRunning && !isRunning) {
            // Unlike the stop branch below, starting is gated — never while
            // a setup conflict is blocking things, never on a device that's
            // disabled itself (this checkbox can flip to true here from a
            // sync pulling in another device's change, not just a local
            // edit), and only for the actual Amoeba note. A plain `return`
            // here would also skip the Scan for broken links check further
            // down, so this just skips its own branch instead.
            if (!this.setupBlocked && !this.disabledOnThisDevice && file.path === this.getAmoebaNotePath()) {
              await this.startOn(file, { skipFrontmatterWrite: true });
            }
          } else if (!wantsRunning && isRunning) {
            await this.stop(file, { skipFrontmatterWrite: true });
          }
        }

        // Only the main note has a Scan for broken links checkbox to react
        // to — unlike Run Amoeba, this isn't a per-note running flag, it's a
        // single plugin-wide setting (cleanupHelper), so there's nothing to
        // key off this.amoebas for.
        if (FIELD_SCAN in fm && file.path === this.getAmoebaNotePath()) {
          const wantsScanning = fm[FIELD_SCAN] === true;
          const desired = wantsScanning ? 'on' : 'visualOnly';
          if (this.settings.cleanupHelper !== desired) {
            await this.setCleanupHelper(desired, { skipFrontmatterWrite: true });
          }
        }
      })
    );

    // Pseudopod notes hold nothing at all — this is the enforcement side:
    // any modification (typed into, pasted into, whatever) is wiped back
    // to empty. It's reactive rather than a keystroke-level block (Obsidian
    // has no API for that on regular notes), so text can flash briefly
    // before it's cleared, but it never persists — which is what makes
    // leaving unlinked pseudopod notes in place, rather than deleting them,
    // safe: they can never hold real data.
    this.registerEvent(
      this.app.vault.on('modify', async (file) => {
        if (!(file instanceof TFile)) return;

        if (this.isPseudopodNotePath(file.path) || this.isMitosisPseudopodNotePath(file.path)) {
          // A routine write we just made ourselves (see the mitosis write
          // methods further down, each of which adds here right before
          // writing) — already correct, nothing to verify.
          if (
            this.isMitosisPseudopodNotePath(file.path) &&
            this.consumeMitosisWrite(file.path)
          ) {
            return;
          }
          // Almost always blank, exactly like a regular pseudopod — except a
          // mitosis duplicate mid-phase-1 briefly carries one line, its
          // bridge link to the original it's paired with (see
          // expectedMitosisPseudopodContent()). Either way, never anything
          // the user typed themselves.
          const expected = this.isMitosisPseudopodNotePath(file.path)
            ? this.expectedMitosisPseudopodContent(file.path)
            : '';
          const content = await this.app.vault.cachedRead(file);
          if (content !== expected) {
            // This corrective write is itself a genuine content change, so
            // it fires its own 'modify' event too — mark it the same as any
            // routine mitosis write above, or a cachedRead() that races
            // *this* write (e.g. a sync client re-touching the file) would
            // look like another mismatch and kick off a rewrite loop, which
            // is what was making duplicate pseudopods flash rapidly.
            if (this.isMitosisPseudopodNotePath(file.path)) {
              this.markMitosisWrite(file.path);
            }
            await this.app.vault.process(file, () => expected);
          }
          return;
        }

        if (this.isMitosisMainNotePath(file.path)) {
          // Same as above — skip entirely for a write we just made
          // ourselves, rather than re-verifying it.
          if (this.consumeMitosisWrite(file.path)) return;

          const m = this.mitosis;
          // Nothing to enforce without an in-progress mitosis event. Most
          // relevantly, this covers the brief window in abortMitosis()
          // between it clearing this.mitosis and cleanupStaleMitosisArtifacts()
          // actually deleting the file — without this guard, a 'modify'
          // event arriving in that window found this.mitosis already gone,
          // read the note's very real content as a mismatch against
          // nothing, and wiped it to empty.
          if (!m) return;

          // Only the two blocks the plugin actually owns are checked and
          // patched here — Note Stream and Pseudopods — never the whole
          // file. That leaves frontmatter or anything else outside those
          // blocks alone, the same as the main Amoeba note (see the
          // class-level comment above for why a full-file reconstruction
          // here was the actual bug).
          const content = await this.app.vault.cachedRead(file);

          // Same target logic as the main amoeba's own walk, just for
          // Amoeba.2's current phase: only before the first duplicate
          // pseudopod exists (start of phase 1) does the Note Stream hold
          // the bridge link back to the main Amoeba note (dropped the
          // instant that first duplicate links — see runMitosisPhase1Step());
          // through the rest of phase 1 and all of phase 2 it sits empty
          // (the pseudopod-pair bridges live on the duplicate pseudopod
          // notes themselves, not here); phase 3 onward it's Amoeba.2's own
          // rolling wander window, same idea as the main note's Note Stream.
          const mainAmoebaFile = this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath());
          const streamTargets =
            m.phase === 'phase1' && m.createdPseudopods === 0
              ? mainAmoebaFile instanceof TFile
                ? [mainAmoebaFile]
                : []
              : m.phase === 'phase3' || m.phase === 'dissolving'
                ? m.window
                : [];
          const modifyHandlerBasenameCounts = this.buildBasenameCounts();
          // Reversed the same way writeLinks() itself now renders — see its
          // comment — so this predicted content actually matches what's in
          // the note instead of permanently reading as stale and forcing a
          // rewrite every time this handler fires.
          const expectedStream = streamTargets
            .slice()
            .reverse()
            .map((f) => `[[${this.wikilinkTarget(f, modifyHandlerBasenameCounts)}]]`)
            .join('\n');
          const currentStream = extractBlockInner(content, LINK_BLOCK_START, LINK_BLOCK_END);
          if (currentStream !== expectedStream) {
            await this.writeLinks(file, streamTargets);
          }

          const pseudopodTargets = [];
          for (let i = 1; i <= m.createdPseudopods; i++) {
            const f = this.app.vault.getAbstractFileByPath(this.getMitosisPseudopodNotePath(i));
            if (f instanceof TFile) pseudopodTargets.push(f);
          }
          const expectedPods = pseudopodTargets
            .map((f) => `[[${this.wikilinkTarget(f, modifyHandlerBasenameCounts)}]]`)
            .join('\n');
          const currentPods = extractBlockInner(content, PSEUDOPODS_BLOCK_START, PSEUDOPODS_BLOCK_END);
          if (currentPods !== expectedPods) {
            await this.syncMitosisPseudopodLinks();
          }
        }
      })
    );

    // Follows the Amoeba folder if the user drags it somewhere else in the
    // vault, or renames it. Without this, every path the plugin manages
    // (the main note, pseudopods, the Graph color group) is derived from a
    // fixed location — moving the folder would silently drop a running
    // amoeba, and the next Start Amoeba / Initialize would quietly create a
    // second Amoeba folder at the default location rather than resuming
    // the moved one.
    //
    // Only reacts to the tracked folder's own rename event, not its
    // children — every path inside it is computed from getAmoebaFolder()
    // at call time (see that method and the ones below it), so it follows
    // automatically once the folder's tracked path is updated here.
    //
    // Guards against adopting some unrelated folder that merely happens to
    // sit at the tracked path (e.g. before Initialize has ever run): only
    // follows the move if an amoeba was actually running there, or the
    // moved folder still contains an Amoeba.md note after the move.
    this.registerEvent(
      this.app.vault.on('rename', async (file, oldPath) => {
        if (!(file instanceof TFolder) || oldPath !== this.getAmoebaFolder()) return;

        const oldNotePath = `${oldPath}/Amoeba.md`;
        const newNotePath = `${file.path}/Amoeba.md`;
        const wasRunning = this.amoebas.has(oldNotePath);
        const looksLikeOurs =
          wasRunning || this.app.vault.getAbstractFileByPath(newNotePath) instanceof TFile;
        if (!looksLikeOurs) return; // some other folder that happened to sit at this path

        this.settings.amoebaFolderPath = file.path;
        await this.saveSettings();

        // Carry a running amoeba's in-memory state over to its new path so
        // the next scheduled tick still finds it instead of concluding the
        // note is gone and stopping.
        if (wasRunning) {
          const state = this.amoebas.get(oldNotePath);
          this.amoebas.delete(oldNotePath);
          state.path = newNotePath;
          this.amoebas.set(state.path, state);
        }

        await this.updateGraphColorGroupFolder(oldPath, file.path);
        this.decorateFolderIcon();
      })
    );
  }

  onunload() {
    for (const state of this.amoebas.values()) this.clearTimer(state);
    this.amoebas.clear();
    // Just stop the timers — an in-progress mitosis's notes are left as-is
    // (async vault deletes aren't reliable during unload). The next load's
    // cleanupStaleMitosisArtifacts() sweeps up whatever's left behind.
    if (this.mitosis) {
      clearTimeout(this.mitosis.phaseTimeoutId);
      clearTimeout(this.mitosis.wanderTimeoutId);
      clearTimeout(this.mitosis.dissolveAtTimeoutId);
    }
    this.removeFolderIconDecoration();
  }

  // Finds the Amoeba folder's row in an open File Explorer pane, via the
  // core view's own fileItems map (an internal structure, not part of the
  // documented Plugin API, but stable in practice — every icon-related
  // community plugin relies on it). No-ops quietly if the explorer isn't
  // open, the folder doesn't exist yet, or the internal shape changes.
  getFolderRowEl(leaf) {
    const item = leaf?.view?.fileItems?.[this.getAmoebaFolder()];
    const rowEl = item?.selfEl || item?.titleEl;
    return rowEl?.querySelector?.('.nav-folder-title-content') || rowEl || null;
  }

  decorateFolderIcon() {
    for (const leaf of this.app.workspace.getLeavesOfType('file-explorer')) {
      const titleEl = this.getFolderRowEl(leaf);
      if (!titleEl || titleEl.querySelector(`.${FOLDER_ICON_CLASS}`)) continue; // not found, or already applied

      const iconEl = titleEl.createSpan({ cls: FOLDER_ICON_CLASS });
      setIcon(iconEl, AMOEBA_FOLDER_ICON);
      titleEl.prepend(iconEl);
    }
  }

  removeFolderIconDecoration() {
    for (const leaf of this.app.workspace.getLeavesOfType('file-explorer')) {
      const titleEl = this.getFolderRowEl(leaf);
      titleEl?.querySelector(`.${FOLDER_ICON_CLASS}`)?.remove();
    }
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  // Where the Amoeba folder currently lives. Read from persisted settings
  // rather than assumed to be a fixed vault-root path, so a folder the user
  // has dragged elsewhere in the vault is still recognized — kept current
  // by the vault 'rename' listener in onload(). Every other path below is
  // derived from this at call time, never cached, so it always reflects
  // the folder's live location.
  getAmoebaFolder() {
    return this.settings.amoebaFolderPath || DEFAULT_AMOEBA_FOLDER;
  }

  getAmoebaNotePath() {
    return `${this.getAmoebaFolder()}/Amoeba.md`;
  }

  // Subfolder holding trailing pseudopod notes, kept separate from the main
  // note so the Amoeba folder only ever contains the note plus this
  // subfolder.
  getPseudopodsSubfolder() {
    return `${this.getAmoebaFolder()}/amoeba.pseudopods`;
  }

  getPseudopodNotePath(n) {
    return `${this.getPseudopodsSubfolder()}/amoeba.pseudopod.${n}.md`;
  }

  // Legacy pseudopod note locations, from before amoeba.pseudopods existed.
  // migrateLegacyPseudopodNotes() renames files matching either pattern
  // into getPseudopodsSubfolder(). Built from the current folder path
  // rather than a fixed constant so migration is still correct even if it
  // happens to run right after a move.
  getLegacyArmPattern() {
    return new RegExp(`^${escapeRegex(this.getAmoebaFolder())}/amoeba\\.arm\\.\\d+\\.md$`);
  }

  getLegacyArmsSubfolder() {
    return `${this.getAmoebaFolder()}/amoeba.arms`;
  }

  getLegacyArmInSubfolderPattern() {
    return new RegExp(`^${escapeRegex(this.getLegacyArmsSubfolder())}/amoeba\\.arm\\.\\d+\\.md$`);
  }

  // Whether Initialize has already been run — i.e. the main note exists.
  // Used to gate anything that would otherwise create the folder or
  // pseudopod notes before the user has deliberately clicked Initialize
  // (the Pseudopods slider, its reset button, and "Move like a spider" in
  // the settings tab all check this before syncing pseudopods).
  isInitialized() {
    return this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath()) instanceof TFile;
  }

  // Which placeholder belongs in an empty Broken Link Encounters log right
  // now, based on the current Scan for broken links setting. Only used when
  // the block is entirely empty/missing (fresh note, or ensureNoteStructure()
  // rebuilding one with no prior content) — see resetBrokenLinksLog() below
  // for the case where real entries already exist.
  currentEmptyLogText() {
    return this.settings.cleanupHelper === 'visualOnly' ? CLEANUP_OFF_TEXT : EMPTY_ENCOUNTERS_TEXT;
  }

  // Same idea as currentEmptyLogText(), for the Vault Poem block: only
  // matters when the block is genuinely empty (feature never started, or a
  // fresh/reset day) — a poem already in progress is never overwritten by
  // this just because the setting happens to be off right now, same
  // "off doesn't erase history" behavior as broken-link scanning above.
  currentEmptyPoemText() {
    return this.settings.poemEnabled ? '' : POEM_OFF_TEXT;
  }

  // Immediately reflects a Scan for broken links toggle in the note, rather
  // than waiting on the next tick (which may never come again if switching
  // to Off, since scanning stops). Already-logged entries are always kept —
  // switching to Off appends the "turned off" status line after them (or
  // shows it alone if the log is empty); switching back to On removes that
  // status line and leaves the entries in place for scanning to continue
  // updating.
  async resetBrokenLinksLog() {
    const mainFile = this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath());
    if (!(mainFile instanceof TFile)) return;

    const blockRegex = new RegExp(
      `${escapeRegex(LOG_BLOCK_START)}[\\s\\S]*?${escapeRegex(LOG_BLOCK_END)}`
    );
    await this.app.vault.process(mainFile, (data) => {
      const match = data.match(blockRegex);
      const existingLines = match ? match[0].split('\n').slice(1, -1) : [];
      // Real logged entries only — strips out either placeholder line so
      // toggling back and forth never leaves a stale one mixed in with them.
      const entries = existingLines.filter(
        (l) => l.trim().length > 0 && l.trim() !== EMPTY_ENCOUNTERS_TEXT && l.trim() !== CLEANUP_OFF_TEXT
      );

      const bodyLines =
        this.settings.cleanupHelper === 'visualOnly'
          ? entries.length > 0
            // Blank line separates already-logged entries from the status
            // line below them, so it doesn't read as just another entry.
            ? [...entries, '', CLEANUP_OFF_TEXT]
            : [CLEANUP_OFF_TEXT]
          : entries.length > 0
            ? entries
            : [EMPTY_ENCOUNTERS_TEXT];

      // Blank lines around the body — see buildManagedBlock()'s comment for
      // why a %%marker%% line can never touch its content directly.
      const block = `${LOG_BLOCK_START}\n\n${bodyLines.join('\n')}\n\n${LOG_BLOCK_END}`;
      if (blockRegex.test(data)) return data.replace(blockRegex, block);
      const trimmed = data.endsWith('\n') ? data : data + '\n';
      return `${trimmed}\n${block}\n`;
    });
  }

  // Immediately wipes the Vault Poem block down to POEM_OFF_TEXT when
  // "Write a daily vault poem" is switched off — a deliberate HARD reset,
  // unlike resetBrokenLinksLog()'s "keep existing entries, just append a
  // status line" behavior for Scan for broken links. Whatever was there (a
  // finished poem, a still-filling
  // one, or nothing at all) is replaced unconditionally, not just when the
  // block happens to be empty — so switching back On always restarts the
  // poem process from scratch rather than resuming stale progress (see
  // setPoemEnabled(), which also clears this.poemPool/poemPoolData
  // alongside calling this, so there's nothing left to resume even if this
  // write is somehow skipped). Only ever called from setPoemEnabled()'s
  // off branch — turning back on goes through ensurePoemPoolForToday()/
  // writePoemToNote() instead, which write a fresh pool's real content.
  async writePoemOffPlaceholder() {
    const mainFile = this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath());
    if (!(mainFile instanceof TFile)) return;

    const blockRegex = new RegExp(
      `${escapeRegex(POEM_BLOCK_START)}[\\s\\S]*?${escapeRegex(POEM_BLOCK_END)}`
    );
    const block = buildManagedBlock(POEM_BLOCK_START, POEM_OFF_TEXT, POEM_BLOCK_END);
    await this.app.vault.process(mainFile, (data) => {
      if (blockRegex.test(data)) return data.replace(blockRegex, block);
      const trimmed = data.endsWith('\n') ? data : data + '\n';
      return `${trimmed}\n${block}\n`;
    });
  }

  // Delegates to Obsidian's own "is this path covered by my Excluded files
  // list" check — not in the official TS types, but stable in the runtime
  // API. Falls back to "not ignored" if a future Obsidian version ever
  // removes it, so this degrades safely rather than erroring.
  isUserIgnored(path) {
    const mc = this.app.metadataCache;
    return typeof mc.isUserIgnored === 'function' ? mc.isUserIgnored(path) : false;
  }

  clearTimer(state) {
    if (state.timeoutId) {
      clearTimeout(state.timeoutId);
      state.timeoutId = null;
    }
  }

  // Runs on every load, before the user has necessarily touched Initialize.
  // Unlike ensureAmoebaSetup() below (which only the Initialize button and
  // the Start Amoeba command call), this never creates the folder, the main
  // note, pseudopod notes, or the Graph view color group. It migrates
  // legacy data, resumes an already-running amoeba, and keeps an
  // already-initialized note tidy. If Amoeba hasn't been initialized yet,
  // this is close to a no-op: migrations and the conflict check both
  // degrade to "nothing to do" when nothing exists yet, and everything
  // past that is gated on the main note already being there.
  async runStartupMaintenance() {
    await this.migrateLegacyPseudopodNotes();
    await this.migrateLegacyPseudopodBlockMarkers();
    await this.migrateLegacyEnabledField();
    // A mitosis event never legitimately survives a restart — this.mitosis
    // is always null right after onload(), so anything left at these paths
    // is stale from an interrupted session (Obsidian closed mid-event).
    // Resuming mid-phase timing isn't worth the complexity, so this just
    // clears it out rather than trying to pick back up where it left off.
    await this.cleanupStaleMitosisArtifacts();

    const conflict = await this.findSetupConflict();
    if (conflict) {
      this.setupBlocked = true;
      new Notice(
        `Amoeba: "${conflict}" already exists and doesn't look like it belongs to this plugin, so setup stopped to avoid touching it. Rename or move it, then reload Obsidian or click Initialize to retry.`,
        0
      );
      return;
    }
    this.setupBlocked = false;

    const mainFile = this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath());
    if (!(mainFile instanceof TFile)) return; // never initialized yet — nothing more to do until Initialize is clicked

    await this.ensureGraphColorGroupExcludesMitosis();
    await this.ensureNoteStructure();
    await this.syncPseudopods();
    // Resumes today's poem progress instead of restarting it — reads from
    // this.settings.poemPoolData (already in memory since settings load
    // earlier in onload()), not from the note, so unlike most of this
    // startup sequence it has no dependency on ensureNoteStructure() having
    // run first. A brand new install, or a note from a version before this
    // feature existed (or before it moved out of the note — see
    // savePoemPoolData()), just has nothing to load — the first harvest/
    // pacing tick creates a fresh pool on its own.
    this.loadPoemPoolFromPluginData();

    // Respect a manual Stop — only auto-resume if it wasn't explicitly
    // turned off (a brand new note has no frontmatter yet, which counts
    // as "not stopped") — and never on a device disabled via
    // DEVICE_DISABLED_KEY, regardless of what the (possibly synced-in)
    // frontmatter says.
    const fm = this.app.metadataCache.getFileCache(mainFile)?.frontmatter;
    const explicitlyStopped = fm && fm[FIELD_ENABLED] === false;
    if (!explicitlyStopped && !this.disabledOnThisDevice) {
      await this.startOn(mainFile);
    }
    // Backfills the Scan for broken links checkbox the first time this note
    // is seen without one — a brand new note, or an upgrade from a version
    // before this field existed. See seedFrontmatterScanField().
    if (!fm || !(FIELD_SCAN in fm)) {
      await this.seedFrontmatterScanField();
    }

    this.decorateFolderIcon();
  }

  // Seeds the "Scan for broken links" checkbox to match the current
  // cleanupHelper setting — called only when the main note doesn't have the
  // field yet (a fresh Initialize, or an upgrade from a version before this
  // field existed). Once seeded, the checkbox and the setting stay in sync
  // with each other from then on through setCleanupHelper()/
  // setFrontmatterScanning() instead of this being consulted again.
  async seedFrontmatterScanField() {
    await this.setFrontmatterScanning(this.settings.cleanupHelper === 'on');
  }

  // Creates the folder, main note, and pseudopod notes/links if they don't
  // exist yet, and matches them to current settings. Never overwrites
  // existing note content — only fills in what's missing. This is the only
  // method in the plugin that creates the folder, the main note, or the
  // Graph view color group — it only ever runs from initializeAndStart(),
  // triggered by the user. If "Amoeba" already means something else in this
  // vault, setup stops entirely rather than silently taking the name over.
  async ensureAmoebaSetup() {
    // File/folder migration first, then in-note marker migration (needs the
    // note to already exist), then the frontmatter field migration — all
    // before conflict detection, so an upgrade never looks like a naming
    // conflict. runStartupMaintenance() already runs these same migrations
    // on every load, so by the time a user can click Initialize they'll
    // normally be no-ops — repeated here so ensureAmoebaSetup() stays
    // correct on its own, independent of load-time timing.
    await this.migrateLegacyPseudopodNotes();
    await this.migrateLegacyPseudopodBlockMarkers();
    await this.migrateLegacyEnabledField();
    await this.cleanupStaleMitosisArtifacts();

    const conflict = await this.findSetupConflict();
    if (conflict) {
      this.setupBlocked = true;
      new Notice(
        `Amoeba: "${conflict}" already exists and doesn't look like it belongs to this plugin, so setup stopped to avoid touching it. Rename or move it, then click Initialize again.`,
        0
      );
      return;
    }
    this.setupBlocked = false;

    await this.ensureFolder(this.getAmoebaFolder());
    await this.ensureGraphColorGroup();
    await this.ensureGraphColorGroupExcludesMitosis();
    if (!(this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath()) instanceof TFile)) {
      await this.app.vault.create(this.getAmoebaNotePath(), '');
    }
    await this.ensureNoteStructure();
    await this.syncPseudopods();
  }

  // The base Graph view group's query: everything in the Amoeba folder
  // *except* the split-off organism, which gets its own group and color
  // while it's alive (see getMitosisGraphGroupQuery()). The exclusion is
  // what actually matters: Graph view applies an *earlier*-listed group
  // over a later one when a node matches both, so without it, this group
  // — seeded first, at Initialize time, long before any mitosis event —
  // would keep overriding the mitosis-specific group added later,
  // regardless of list order.
  getBaseGraphGroupQuery(folderPath) {
    return `path:"${folderPath}" -path:"${folderPath}/amoeba.2"`;
  }

  // Seeds a Graph view color group for the Amoeba folder, but only if
  // nothing already groups that folder — after that it's an ordinary
  // group, freely recolored/moved/deleted from Graph view's own settings,
  // and this never touches it again.
  //
  // Goes through the core "graph" internal plugin's loadData()/saveData()
  // (undocumented but stable), which persists the default any new Graph
  // pane initializes itself with. A pane that's already open keeps its own
  // live copy of these options on view.dataEngine and won't pick up that
  // saved default on its own, so this also merges the group into every
  // open pane's live options directly: dataEngine.getOptions() first, so
  // the pane's other settings (search text, other groups, display toggles)
  // aren't clobbered, then .setOptions() with the new group added in.
  async ensureGraphColorGroup() {
    const graph = this.app.internalPlugins?.plugins?.graph;
    if (!graph) return; // core Graph view plugin disabled or unavailable

    try {
      const settings = (await graph.loadData()) || {};
      const groups = Array.isArray(settings.colorGroups) ? settings.colorGroups : [];

      // Loose match on purpose: also treats a group set up by hand that
      // happens to reference the folder as "already grouped", so it's
      // never duplicated.
      const alreadyGrouped = groups.some(
        (g) => typeof g?.query === 'string' && g.query.includes(this.getAmoebaFolder())
      );
      if (alreadyGrouped) return;

      const newGroup = {
        query: this.getBaseGraphGroupQuery(this.getAmoebaFolder()),
        color: { a: 1, rgb: hexToPackedRgb(AMOEBA_GRAPH_GROUP_COLOR) },
      };
      groups.push(newGroup);
      settings.colorGroups = groups;
      await graph.saveData(settings);

      for (const leaf of this.app.workspace.getLeavesOfType('graph')) {
        const dataEngine = leaf.view?.dataEngine;
        if (!dataEngine?.getOptions || !dataEngine?.setOptions) continue;

        const liveOptions = dataEngine.getOptions() || {};
        const liveGroups = Array.isArray(liveOptions.colorGroups) ? liveOptions.colorGroups : [];
        if (
          liveGroups.some((g) => typeof g?.query === 'string' && g.query.includes(this.getAmoebaFolder()))
        ) {
          continue; // this pane already has it somehow
        }
        dataEngine.setOptions({ ...liveOptions, colorGroups: [...liveGroups, newGroup] });
      }
    } catch (e) {
      // Cosmetic only, never worth blocking setup over — but logged (unlike
      // the rest of this file's silent best-effort catches) since this is
      // reaching into undocumented internals and worth knowing if it breaks.
      console.error('Amoeba: failed to seed the Graph view color group', e);
    }
  }

  // Called by the vault 'rename' listener when the tracked Amoeba folder
  // moves, so the Graph view color group ensureGraphColorGroup() seeded
  // keeps pointing at the folder instead of silently going stale. Only
  // touches a group whose query is exactly the one this plugin writes
  // (getBaseGraphGroupQuery()) — a group the user has since hand-edited to
  // something else is left alone. Best-effort and non-fatal, same as
  // ensureGraphColorGroup(): this is cosmetic, never worth surfacing an
  // error to the user over.
  async updateGraphColorGroupFolder(oldFolderPath, newFolderPath) {
    const graph = this.app.internalPlugins?.plugins?.graph;
    if (!graph) return;

    const oldQuery = this.getBaseGraphGroupQuery(oldFolderPath);
    const newQuery = this.getBaseGraphGroupQuery(newFolderPath);

    try {
      const settings = (await graph.loadData()) || {};
      const groups = Array.isArray(settings.colorGroups) ? settings.colorGroups : [];
      let changed = false;
      for (const g of groups) {
        if (g?.query === oldQuery) {
          g.query = newQuery;
          changed = true;
        }
      }
      if (changed) {
        settings.colorGroups = groups;
        await graph.saveData(settings);
      }

      for (const leaf of this.app.workspace.getLeavesOfType('graph')) {
        const dataEngine = leaf.view?.dataEngine;
        if (!dataEngine?.getOptions || !dataEngine?.setOptions) continue;

        const liveOptions = dataEngine.getOptions() || {};
        const liveGroups = Array.isArray(liveOptions.colorGroups) ? liveOptions.colorGroups : [];
        if (!liveGroups.some((g) => g?.query === oldQuery)) continue;

        const updatedGroups = liveGroups.map((g) =>
          g?.query === oldQuery ? { ...g, query: newQuery } : g
        );
        dataEngine.setOptions({ ...liveOptions, colorGroups: updatedGroups });
      }
    } catch (e) {
      console.error('Amoeba: failed to update the Graph view color group after a move', e);
    }
  }

  // One-time migration for installs that already have a base color group
  // saved from before getBaseGraphGroupQuery() added the -path exclusion.
  // Without this, an existing group's query stays the old plain
  // path:"<folder>" form forever — ensureGraphColorGroup() only creates a
  // group when none exists yet, so it would never pick up the new query on
  // its own. Rewrites any group matching the old plain query, in both the
  // persisted settings and any already-open Graph pane. No-op once the
  // group has already been migrated (or was never the plain form to begin
  // with). Best-effort and non-fatal, same as the other Graph helpers.
  async ensureGraphColorGroupExcludesMitosis() {
    const graph = this.app.internalPlugins?.plugins?.graph;
    if (!graph) return;

    const folder = this.getAmoebaFolder();
    const plainQuery = `path:"${folder}"`;
    const excludingQuery = this.getBaseGraphGroupQuery(folder);
    if (plainQuery === excludingQuery) return;

    try {
      const settings = (await graph.loadData()) || {};
      const groups = Array.isArray(settings.colorGroups) ? settings.colorGroups : [];
      let changed = false;
      for (const g of groups) {
        if (g?.query === plainQuery) {
          g.query = excludingQuery;
          changed = true;
        }
      }
      if (changed) {
        settings.colorGroups = groups;
        await graph.saveData(settings);
      }

      for (const leaf of this.app.workspace.getLeavesOfType('graph')) {
        const dataEngine = leaf.view?.dataEngine;
        if (!dataEngine?.getOptions || !dataEngine?.setOptions) continue;

        const liveOptions = dataEngine.getOptions() || {};
        const liveGroups = Array.isArray(liveOptions.colorGroups) ? liveOptions.colorGroups : [];
        if (!liveGroups.some((g) => g?.query === plainQuery)) continue;

        const updatedGroups = liveGroups.map((g) =>
          g?.query === plainQuery ? { ...g, query: excludingQuery } : g
        );
        dataEngine.setOptions({ ...liveOptions, colorGroups: updatedGroups });
      }
    } catch (e) {
      console.error('Amoeba: failed to update the Graph view color group to exclude the split-off organism', e);
    }
  }

  // Guarantees the four headings and their blocks always appear in the
  // same fixed order — Vault Poem, Broken Link Encounters, Note Stream,
  // Pseudopods — separated by a "---" rule. No-ops if that's already the
  // case (cheap check, safe every load). Otherwise it rebuilds the note
  // losslessly: each block's existing inner content is preserved, and
  // anything else in the note that isn't part of a managed heading/block is
  // kept too, placed above the four sections rather than discarded.
  async ensureNoteStructure() {
    const mainFile = this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath());
    if (!(mainFile instanceof TFile)) return;

    const raw = await this.app.vault.cachedRead(mainFile);
    // Never let anything below touch YAML frontmatter — same
    // getFrontMatterInfo() technique already used in harvestPoemWords()
    // (content-based, not metadataCache, so it matches exactly what
    // Obsidian itself considers the frontmatter block even on a
    // just-edited file the cache hasn't caught up to yet). `current` from
    // here down is the note's BODY only; frontmatterBlock is re-prepended
    // untouched when the note is rebuilt below.
    //
    // This fixes a real corruption bug: stripKnownSections() (used a few
    // lines down to preserve anything outside the four managed sections)
    // treats any bare "---" line as a stale section separator and strips
    // it — which used to include the frontmatter's own opening/closing
    // "---" fences whenever this function actually rebuilt the note,
    // since frontmatter was previously just part of `current` like
    // everything else. That silently mangled the YAML block (its content
    // survived as bare, unfenced text, no longer wrapped in "---" at all)
    // the first time an existing note went through a full rebuild —
    // surfaced later as Obsidian itself refusing to parse the file
    // ("Malformed frontmatter ... Missing directives-end indicator line")
    // the next time anything tried to read or write a frontmatter
    // property (e.g. clicking Start Amoeba). Excluding frontmatter here
    // entirely, rather than trying to make stripKnownSections() smarter
    // about telling a real section separator from a frontmatter fence, is
    // both simpler and strictly safer.
    const info = getFrontMatterInfo(raw);
    // A file that STARTS with "---" but getFrontMatterInfo() says isn't
    // complete, valid frontmatter (info.exists === false) has a dangling,
    // unclosed opening fence — some earlier edit (possibly this very bug,
    // before the fix above existed) left the file in that state. Adding
    // ANY new bare "---" line further down the file while it's like this
    // is dangerous: Obsidian's own frontmatter parser would very plausibly
    // treat that new line as the accidental closing fence of the dangling
    // block, silently swallowing everything in between — including real
    // note content — into what Obsidian treats as YAML properties. Bailing
    // out here entirely, leaving the note untouched, is safer than
    // guessing at an automatic repair; this is a rare, already-broken
    // state that needs a human to look at the top of the file once.
    if (!info.exists && raw.trimStart().startsWith('---')) {
      console.error(
        'Amoeba: the Amoeba note appears to have a malformed frontmatter block (an opening "---" with no valid closing "---"). Skipping the automatic note-structure rebuild to avoid making it worse — please check the top of the note and fix or remove the stray "---" by hand.'
      );
      return;
    }
    const frontmatterBlock = info.exists ? raw.slice(0, info.contentStart) : '';
    const current = info.exists ? raw.slice(info.contentStart) : raw;

    const idxPoem = current.indexOf(HEADING_POEM);
    const idxActive = current.indexOf(HEADING_ACTIVE);
    const idxCleanup = current.indexOf(HEADING_CLEANUP);
    const idxPseudopods = current.indexOf(HEADING_PSEUDOPODS);
    // Also requires the "---" separator between each pair of sections, not
    // just heading order, so a note missing it still gets rebuilt.
    const hasSeparatorBetween = (afterMarker, beforeHeading) =>
      new RegExp(
        `${escapeRegex(afterMarker)}[\\s\\S]*?\\n${escapeRegex(SECTION_SEPARATOR)}\\n[\\s\\S]*?${escapeRegex(
          beforeHeading
        )}`
      ).test(current);
    // The Pseudopods description line lives after its block now (not
    // before) — require that ordering too, so a note built under the old
    // layout gets rebuilt once to pick up the move.
    const idxPseudopodsBlockEnd = current.indexOf(PSEUDOPODS_BLOCK_END);
    const idxPseudopodsDescription = current.indexOf(PSEUDOPODS_DESCRIPTION);
    const descriptionAfterBlock =
      idxPseudopodsBlockEnd !== -1 &&
      idxPseudopodsDescription !== -1 &&
      idxPseudopodsBlockEnd < idxPseudopodsDescription;
    // A heading landing directly on top of its %%marker%% line (no blank
    // line between) is the old layout, and triggers the Obsidian Reading
    // View spacing bug described below — require the blank line here too,
    // so a note built before this fix gets rebuilt once to pick it up.
    const hasBlankLineAfterHeading = (heading, marker) =>
      current.includes(`${heading}\n\n${marker}`);
    const hasNewMarkerSpacing =
      hasBlankLineAfterHeading(HEADING_POEM, POEM_BLOCK_START) &&
      hasBlankLineAfterHeading(HEADING_CLEANUP, LOG_BLOCK_START) &&
      hasBlankLineAfterHeading(HEADING_ACTIVE, LINK_BLOCK_START) &&
      hasBlankLineAfterHeading(HEADING_PSEUDOPODS, PSEUDOPODS_BLOCK_START);
    // A "---" rule leads off the very first section (Vault Poem) too, not
    // just separating the four from each other — but ONLY when something
    // (real frontmatter, or leftover user content) actually precedes it.
    // A bare "---" as the literal first line of the raw file is never
    // safe: Obsidian always treats a file starting with "---" as the
    // opening of a YAML frontmatter block, regardless of the plugin's own
    // intent for that line — a real bug found on a freshly created note (no
    // frontmatter, nothing above the first heading),
    // where this separator landed as literal line 1 and Obsidian tried
    // (and failed) to parse everything down to the NEXT "---" as YAML,
    // corrupting the note. So the correct state differs by situation: with
    // nothing at all above the heading (fresh note, no frontmatter), correct
    // means NO leading separator; with frontmatter and/or leftover content
    // present, correct means the separator IS there, right before the
    // heading (blank-line-wise), same shape as hasSeparatorBetween's check
    // between sections.
    const contentBeforeHeading = idxPoem === -1 ? '' : current.slice(0, idxPoem);
    const nothingPrecedesHeadingInBody = contentBeforeHeading.trim() === '';
    const hasLeadingSeparator =
      frontmatterBlock === '' && nothingPrecedesHeadingInBody
        ? true
        : new RegExp(`(^|\\n)${escapeRegex(SECTION_SEPARATOR)}\\n\\n${escapeRegex(HEADING_POEM)}`).test(
            current
          );
    const alreadyInOrder =
      idxPoem !== -1 &&
      idxActive !== -1 &&
      idxCleanup !== -1 &&
      idxPseudopods !== -1 &&
      idxPoem < idxCleanup &&
      idxCleanup < idxActive &&
      idxActive < idxPseudopods &&
      hasSeparatorBetween(POEM_BLOCK_END, HEADING_CLEANUP) &&
      hasSeparatorBetween(LOG_BLOCK_END, HEADING_ACTIVE) &&
      hasSeparatorBetween(LINK_BLOCK_END, HEADING_PSEUDOPODS) &&
      descriptionAfterBlock &&
      hasNewMarkerSpacing &&
      hasLeadingSeparator;
    if (alreadyInOrder) return;

    const poemInner = extractBlockInner(current, POEM_BLOCK_START, POEM_BLOCK_END);
    const linkInner = extractBlockInner(current, LINK_BLOCK_START, LINK_BLOCK_END);
    const logInner = extractBlockInner(current, LOG_BLOCK_START, LOG_BLOCK_END);
    const pseudopodsInner = extractBlockInner(current, PSEUDOPODS_BLOCK_START, PSEUDOPODS_BLOCK_END);
    const leftover = stripKnownSections(current);

    // Falls back to the current state's placeholder when the log is empty.
    const logBody = logInner.trim().length > 0 ? logInner : this.currentEmptyLogText();
    // Same idea for the poem: a real poem already in progress is always
    // kept as-is; POEM_OFF_TEXT only ever fills in for a genuinely empty
    // block, same as the log above.
    const poemBody = poemInner.trim().length > 0 ? poemInner : this.currentEmptyPoemText();

    // A blank line separates a heading from its block, and another
    // separates the block's markers from whatever's inside them — never let
    // a %%marker%% line sit directly against a heading or content line with
    // no blank line between. This isn't cosmetic: Obsidian's Reading View
    // has a documented rendering bug where a standalone %%comment%% line
    // touching an adjacent heading/content line with no blank line produces
    // unwanted extra blank-line spacing underneath it (see
    // https://forum.obsidian.md/t/comment-text-blocks-unwanted-extra-lines-in-reading-mode/58280),
    // which showed up under the Amoeba note's section headers. The
    // community-tested fix is a blank line on both sides of every
    // standalone comment line, applied here. Sections
    // themselves are separated by a "---" rule, not just a blank line, so
    // the four still read as clearly distinct parts of the note.
    const sections = [
      buildManagedBlock(HEADING_POEM, POEM_BLOCK_START, poemBody, POEM_BLOCK_END),
      buildManagedBlock(HEADING_CLEANUP, LOG_BLOCK_START, logBody, LOG_BLOCK_END),
      buildManagedBlock(HEADING_ACTIVE, LINK_BLOCK_START, linkInner, LINK_BLOCK_END),
      buildManagedBlock(
        HEADING_PSEUDOPODS,
        PSEUDOPODS_BLOCK_START,
        pseudopodsInner,
        PSEUDOPODS_BLOCK_END,
        PSEUDOPODS_DESCRIPTION
      ),
    ];
    // A leading "---" opens the note the same way one already separates
    // each of the four sections from the next — but ONLY when something
    // (frontmatterBlock or leftover) actually precedes it, per the
    // hasLeadingSeparator comment above: with nothing above the first
    // heading, that "---" would be literal line 1 of the raw file, which
    // Obsidian always reads as opening a YAML frontmatter block no matter
    // what the plugin meant it as. frontmatterBlock (if any) goes back
    // first, untouched, with a blank line separating it from whatever
    // comes next — same spacing treatment leftover content already gets —
    // so it never sits directly against the leading "---" rule below it.
    const leadingSeparator = frontmatterBlock || leftover ? `${SECTION_SEPARATOR}\n\n` : '';
    const rebuilt =
      frontmatterBlock +
      (frontmatterBlock ? '\n' : '') +
      (leftover ? `${leftover}\n\n` : '') +
      leadingSeparator +
      sections.join(`\n\n${SECTION_SEPARATOR}\n\n`) +
      '\n';

    await this.app.vault.process(mainFile, () => rebuilt);
  }

  // Looks for anything at the paths Amoeba wants to use that isn't
  // recognizably its own — an existing main note without our block
  // markers, anything in the Amoeba folder besides the main note and the
  // amoeba.pseudopods subfolder, or anything inside amoeba.pseudopods that
  // isn't an expected, empty pseudopod note. Returns the conflicting path,
  // or null if it's clear (including "doesn't exist yet", the normal case).
  async findSetupConflict() {
    const mainFile = this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath());
    if (mainFile instanceof TFile) {
      const content = await this.app.vault.cachedRead(mainFile);
      if (!this.looksPluginOwned(content)) return this.getAmoebaNotePath();
    }

    const folder = this.app.vault.getAbstractFileByPath(this.getAmoebaFolder());
    if (folder instanceof TFolder) {
      for (const child of folder.children || []) {
        if (child.path === this.getAmoebaNotePath()) continue; // already checked above
        if (child.path === this.getPseudopodsSubfolder()) continue; // checked separately below
        // A leftover, now-empty legacy folder is harmless — migration
        // already moved everything out of it, and removing the folder
        // itself is only ever best-effort (see migrateLegacyPseudopodNotes()).
        if (child.path === this.getLegacyArmsSubfolder()) continue;
        // In practice cleanupStaleMitosisArtifacts() (called just above, in
        // both callers of this method) already removes these before this
        // loop ever runs — this is only a defensive backstop.
        if (child.path === this.getMitosisNotePath()) continue;
        if (child.path === this.getMitosisPseudopodsSubfolder()) continue;
        return child.path; // some other file or folder we don't recognize at all
      }
    }

    const pseudopodsFolder = this.app.vault.getAbstractFileByPath(this.getPseudopodsSubfolder());
    if (pseudopodsFolder instanceof TFolder) {
      for (const child of pseudopodsFolder.children || []) {
        if (!(child instanceof TFile) || !this.isPseudopodNotePath(child.path)) return child.path;
        const content = await this.app.vault.cachedRead(child);
        if (content && content.trim().length > 0) return child.path; // should be empty
      }
    }
    return null;
  }

  // Renames loose Amoeba/amoeba.arm.N.md files and Amoeba/amoeba.arms/
  // files into Amoeba/amoeba.pseudopods/amoeba.pseudopod.N.md. Content is
  // always empty, so this is purely a rename — nothing is lost, and it
  // keeps an upgrade from looking like a naming conflict.
  async migrateLegacyPseudopodNotes() {
    const folder = this.app.vault.getAbstractFileByPath(this.getAmoebaFolder());
    if (folder instanceof TFolder) {
      // Snapshot before renaming: TFolder.children is a live array in real
      // Obsidian, spliced in place as files move — mutating it mid-iteration
      // shifts indices and silently skips whatever child was next. See
      // syncPseudopods() below for the same pattern on the delete side.
      const rootChildren = (folder.children || []).slice();
      for (const child of rootChildren) {
        if (!(child instanceof TFile) || !this.getLegacyArmPattern().test(child.path)) continue;
        await this.renameToPseudopodPath(child);
      }
    }

    const legacySubfolder = this.app.vault.getAbstractFileByPath(this.getLegacyArmsSubfolder());
    if (legacySubfolder instanceof TFolder) {
      const subChildren = (legacySubfolder.children || []).slice();
      for (const child of subChildren) {
        if (!(child instanceof TFile) || !this.getLegacyArmInSubfolderPattern().test(child.path)) continue;
        await this.renameToPseudopodPath(child);
      }
      // Best-effort tidy-up: remove the old subfolder once it's empty. Not
      // required for correctness — findSetupConflict() above also tolerates
      // it being left behind — so any failure here is silently ignored.
      const remaining = this.app.vault.getAbstractFileByPath(this.getLegacyArmsSubfolder());
      if (remaining instanceof TFolder && (remaining.children || []).length === 0) {
        try {
          await this.app.vault.delete(remaining);
        } catch (e) {
          // Non-fatal.
        }
      }
    }
  }

  async renameToPseudopodPath(child) {
    await this.ensureFolder(this.getPseudopodsSubfolder());
    const match = child.path.match(/amoeba\.arm\.(\d+)\.md$/);
    const newPath = match
      ? this.getPseudopodNotePath(match[1])
      : `${this.getPseudopodsSubfolder()}/${child.path.slice(child.path.lastIndexOf('/') + 1)}`;
    if (this.app.vault.getAbstractFileByPath(newPath) instanceof TFile) return;
    await this.app.vault.rename(child, newPath);
  }

  // Rewrites %% amoeba-arms %% markers to %% amoeba-pseudopods %% in place,
  // before ensureNoteStructure() runs — otherwise the trailing-link content
  // between the old markers wouldn't be recognized as a managed block, and
  // would fall back to being treated as unmanaged leftover text.
  async migrateLegacyPseudopodBlockMarkers() {
    const mainFile = this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath());
    if (!(mainFile instanceof TFile)) return;
    const current = await this.app.vault.cachedRead(mainFile);
    if (!current.includes(LEGACY_ARMS_BLOCK_START)) return;

    await this.app.vault.process(mainFile, (data) =>
      data
        .split(LEGACY_ARMS_BLOCK_END)
        .join(PSEUDOPODS_BLOCK_END)
        .split(LEGACY_ARMS_BLOCK_START)
        .join(PSEUDOPODS_BLOCK_START)
    );
  }

  // Migrates the legacy 'amoeba' checkbox value to 'Run Amoeba' and
  // removes the old key, so upgrading doesn't leave a stray duplicate
  // property or silently reset the running/stopped state.
  async migrateLegacyEnabledField() {
    const mainFile = this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath());
    if (!(mainFile instanceof TFile)) return;
    const fm = this.app.metadataCache.getFileCache(mainFile)?.frontmatter;
    if (!fm || !(LEGACY_FIELD_ENABLED in fm) || FIELD_ENABLED in fm) return;

    const value = fm[LEGACY_FIELD_ENABLED];
    this.pendingSelfWrites.add(mainFile.path);
    await this.app.fileManager.processFrontMatter(mainFile, (data) => {
      data[FIELD_ENABLED] = value;
      delete data[LEGACY_FIELD_ENABLED];
    });
  }

  // Single place that writes the "Run Amoeba" property, so every write goes
  // through the same pendingSelfWrites bookkeeping that keeps our own
  // writes from being mistaken for a manual checkbox toggle.
  async setFrontmatterEnabled(file, value) {
    this.pendingSelfWrites.add(file.path);
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      fm[FIELD_ENABLED] = value;
    });
  }

  // Single place that writes the "Scan for broken links" property — same
  // pendingSelfWrites bookkeeping as setFrontmatterEnabled(), so our own
  // write is never mistaken for a manual checkbox toggle. Unlike
  // setFrontmatterEnabled() this isn't handed a file — Scan for broken
  // links only ever lives on the main note, so it looks that path up itself
  // and quietly no-ops before Initialize has ever run (no note yet to write
  // to; the note gets this field for the first time in
  // runStartupMaintenance()/ensureAmoebaSetup() instead).
  async setFrontmatterScanning(value) {
    const file = this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath());
    if (!(file instanceof TFile)) return;
    this.pendingSelfWrites.add(file.path);
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      fm[FIELD_SCAN] = value;
    });
  }

  // Single place that changes the Scan for broken links setting, so the
  // settings-tab dropdown and the note's own checkbox can't drift out of
  // sync with each other — same idea as setRunning()/setFrontmatterEnabled()
  // for the Run Amoeba checkbox, just for cleanupHelper instead of the
  // running state. Both the dropdown's onChange and the checkbox's
  // 'changed' listener (see onload()) call this rather than assigning
  // this.settings.cleanupHelper directly.
  async setCleanupHelper(value, opts = {}) {
    if (this.settings.cleanupHelper === value) return;
    this.settings.cleanupHelper = value;
    await this.saveSettings();
    // Reflect the toggle in the note immediately, rather than waiting on
    // the next tick (which never comes if we just switched to Off).
    if (this.isInitialized()) await this.resetBrokenLinksLog();
    if (!opts.skipFrontmatterWrite) {
      await this.setFrontmatterScanning(value === 'on');
    }
  }

  // Single place that changes the "Write a daily vault poem" setting —
  // same reasoning as setCleanupHelper() above, just no frontmatter
  // checkbox to keep in sync for this one (unlike Scan for broken links,
  // there's no per-note "Run Vault Poem" checkbox). Unlike scanning,
  // though, this is a hard on/off rather than a preserve-and-annotate
  // toggle — turning it off wipes whatever's there (see
  // writePoemOffPlaceholder()) and clears the underlying pool
  // entirely, so turning it back on always restarts the poem process
  // fresh instead of resuming.
  async setPoemEnabled(value) {
    if (this.settings.poemEnabled === value) return;
    this.settings.poemEnabled = value;
    await this.saveSettings();
    if (value) {
      // Reflect the restart in the note immediately, same "don't wait for
      // the next tick" reasoning as the off branch below — there's
      // nothing to resume (the off branch already cleared this.poemPool),
      // so this always begins a brand-new pool, not a continuation.
      if (this.isInitialized()) {
        this.ensurePoemPoolForToday();
        await this.writePoemToNote();
      }
    } else {
      // Clears the in-memory AND persisted pool, not just the note's
      // display — otherwise a reload before the next "on" toggle would
      // resurrect the old pool via loadPoemPoolFromPluginData(), silently
      // contradicting the "restarts fresh" promise above.
      this.poemPool = null;
      await this.savePoemPoolData();
      if (this.isInitialized()) await this.writePoemOffPlaceholder();
    }
  }

  looksPluginOwned(content) {
    if (!content || content.trim().length === 0) return true;
    return (
      content.includes(LINK_BLOCK_START) ||
      content.includes(PSEUDOPODS_BLOCK_START) ||
      content.includes(LEGACY_ARMS_BLOCK_START) ||
      content.includes(LOG_BLOCK_START) ||
      content.includes(POEM_BLOCK_START)
    );
  }

  isPseudopodNotePath(path) {
    return new RegExp(
      `^${escapeRegex(this.getPseudopodsSubfolder())}/amoeba\\.pseudopod\\.\\d+\\.md$`
    ).test(path);
  }

  async ensureFolder(path) {
    if (!(this.app.vault.getAbstractFileByPath(path) instanceof TFolder)) {
      await this.app.vault.createFolder(path);
    }
  }

  // Creates any pseudopod notes up to the configured count that don't exist
  // yet, clears out stray content in ones that already do, deletes any
  // pseudopod notes beyond the configured count, then re-syncs the main
  // note's pseudopods link block to match. Deleting is safe — the
  // modify-listener in onload() guarantees a pseudopod note can never hold
  // real content — and it's permanent (not trash), since pseudopod notes
  // are disposable enough that they shouldn't pile up anywhere.
  async syncPseudopods() {
    if (this.setupBlocked) {
      new Notice('Amoeba: setup is blocked by a naming conflict — see the earlier notice.');
      return;
    }

    const desired = this.getPseudopodsCount();
    await this.ensureFolder(this.getAmoebaFolder());
    await this.ensureFolder(this.getPseudopodsSubfolder());

    for (let i = 1; i <= desired; i++) {
      const path = this.getPseudopodNotePath(i);
      const existing = this.app.vault.getAbstractFileByPath(path);
      if (!(existing instanceof TFile)) {
        await this.app.vault.create(path, '');
      } else {
        const content = await this.app.vault.cachedRead(existing);
        if (content !== '') await this.app.vault.process(existing, () => '');
      }
    }

    const pseudopodsFolder = this.app.vault.getAbstractFileByPath(this.getPseudopodsSubfolder());
    if (pseudopodsFolder instanceof TFolder) {
      // Snapshot before deleting: TFolder.children is a live array in real
      // Obsidian, spliced in place as each file is removed — deleting while
      // iterating that live array shifts indices mid-loop and can skip
      // whatever child lands at the now-reused index. Iterating a plain
      // snapshot instead means later deletions can't affect which children
      // this loop still has left to check.
      const children = (pseudopodsFolder.children || []).slice();
      for (const child of children) {
        if (!(child instanceof TFile) || !this.isPseudopodNotePath(child.path)) continue;
        const match = child.path.match(/amoeba\.pseudopod\.(\d+)\.md$/);
        const num = match ? parseInt(match[1], 10) : null;
        if (num !== null && num > desired) {
          await this.deletePseudopodNote(child);
        }
      }
    }

    await this.syncPseudopodLinks(desired);

    // Creating/deleting files inside the folder can make the File Explorer
    // redraw its row, which would otherwise silently drop the icon.
    this.decorateFolderIcon();
  }

  // Permanent delete — no system trash, no in-vault .trash folder, and
  // nothing worth saving anyway since pseudopod notes are enforced empty.
  async deletePseudopodNote(file) {
    await this.app.vault.delete(file);
  }

  getPseudopodsCount() {
    return Math.round(Math.min(MAX_PSEUDOPODS, Math.max(MIN_PSEUDOPODS, this.settings.pseudopods)));
  }

  // Permanent links, separate from the rotating %% amoeba-link %% block —
  // that block gets fully replaced every tick, which would wipe these out
  // if they lived there. Being real, permanent [[wikilinks]] (not the
  // obsidian:// trick the log uses) is the point: it's what lets Graph
  // View's physics drag them along behind the main note as it moves.
  async syncPseudopodLinks(desired) {
    const mainFile = this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath());
    if (!(mainFile instanceof TFile)) return;

    const pseudopodFiles = [];
    for (let i = 1; i <= desired; i++) {
      const f = this.app.vault.getAbstractFileByPath(this.getPseudopodNotePath(i));
      if (f instanceof TFile) pseudopodFiles.push(f);
    }
    const basenameCounts = this.buildBasenameCounts();
    const links = pseudopodFiles.map((f) => `[[${this.wikilinkTarget(f, basenameCounts)}]]`);
    const block = buildManagedBlock(PSEUDOPODS_BLOCK_START, links.join('\n'), PSEUDOPODS_BLOCK_END);

    await this.app.vault.process(mainFile, (data) => {
      const blockRegex = new RegExp(
        `${escapeRegex(PSEUDOPODS_BLOCK_START)}[\\s\\S]*?${escapeRegex(PSEUDOPODS_BLOCK_END)}`
      );
      if (blockRegex.test(data)) {
        return data.replace(blockRegex, block);
      }
      const trimmed = data.endsWith('\n') ? data : data + '\n';
      return `${trimmed}\n${block}\n`;
    });
  }

  // The single entry point for creating the folder/note/color group for the
  // first time (or after a conflict has been resolved) and starting the
  // amoeba — used by both the Start Amoeba command and the Initialize
  // button in settings. This is the only place ensureAmoebaSetup() gets
  // called, so folder/note creation, the Graph view color group, and
  // pseudopod creation all happen here, on explicit user action.
  //
  // Once initialized, resuming after an Obsidian restart is handled
  // separately by runStartupMaintenance() on every load — this method is
  // only needed again if the amoeba was never initialized, or a conflict
  // blocked it and the user has since resolved it.
  async initializeAndStart() {
    if (this.disabledOnThisDevice) {
      new Notice('Amoeba is disabled on this device — turn it back on in settings first.');
      return;
    }
    await this.ensureAmoebaSetup();
    if (this.setupBlocked) return; // ensureAmoebaSetup() already surfaced the conflict Notice
    const file = this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath());
    if (!(file instanceof TFile)) return;
    await this.startOn(file);
    // A brand new note has neither checkbox yet — Run Amoeba was just
    // written above by startOn(); this backfills Scan for broken links the
    // same way runStartupMaintenance() does for a note surviving a restart.
    const fm = this.app.metadataCache.getFileCache(file)?.frontmatter;
    if (!fm || !(FIELD_SCAN in fm)) {
      await this.seedFrontmatterScanField();
    }
  }

  async stopAmoeba() {
    const file = this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath());
    if (file instanceof TFile) await this.stop(file);
  }

  // Both commands (Start/Stop Amoeba) and the "Run Amoeba" checkbox
  // listener call startOn()/stop(), thin wrappers around this one method —
  // there's exactly one code path that flips this.amoebas membership and
  // exactly one that writes the frontmatter property, so the running
  // state, the checkbox, and the commands' enabled/disabled state can't
  // drift out of sync with each other.
  async setRunning(file, running, opts = {}) {
    if (running) {
      if (this.amoebas.has(file.path)) {
        new Notice('Amoeba is already running');
        return;
      }
      const state = new AmoebaState(file.path);
      this.amoebas.set(file.path, state);
      if (!opts.skipFrontmatterWrite) {
        await this.setFrontmatterEnabled(file, true);
      }
      if (!opts.silent) new Notice('Amoeba started');
      this.scheduleTick(state);
    } else {
      const state = this.amoebas.get(file.path);
      if (!state) return;
      this.clearTimer(state);
      this.amoebas.delete(file.path);
      // A split-off Amoeba.2 doesn't make sense once the original has
      // stopped — clean it up immediately rather than leaving it to wander
      // (or sit half-formed) on its own.
      if (this.mitosis) await this.abortMitosis();
      if (!opts.skipFrontmatterWrite) {
        await this.setFrontmatterEnabled(file, false);
      }
      if (!opts.silent) new Notice('Amoeba stopped');
    }
  }

  async startOn(file, opts = {}) {
    await this.setRunning(file, true, opts);
  }

  async stop(file, opts = {}) {
    await this.setRunning(file, false, opts);
  }

  // Single place that changes the per-device disable flag — same "one
  // setter, so nothing can drift" reasoning as setCleanupHelper()/
  // setPoemEnabled(), just backed by localStorage (DEVICE_DISABLED_KEY)
  // instead of settings/data.json, since this is deliberately device-local
  // rather than something that should sync with the rest of the vault.
  // Pauses or resumes the local tick loop immediately rather than waiting
  // for the next reload, without writing the shared "Run Amoeba" property
  // either way — this only ever affects the current device.
  async setDisabledOnThisDevice(value) {
    if (this.disabledOnThisDevice === value) return;
    this.disabledOnThisDevice = value;
    this.app.saveLocalStorage(DEVICE_DISABLED_KEY, value);

    const file = this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath());
    if (file instanceof TFile) {
      if (value) {
        if (this.amoebas.has(file.path)) {
          await this.stop(file, { skipFrontmatterWrite: true, silent: true });
        }
      } else {
        const fm = this.app.metadataCache.getFileCache(file)?.frontmatter;
        const shouldBeRunning = !fm || fm[FIELD_ENABLED] !== false;
        if (shouldBeRunning && !this.setupBlocked && !this.amoebas.has(file.path)) {
          await this.startOn(file, { skipFrontmatterWrite: true, silent: true });
        }
      }
    }

    new Notice(
      value
        ? 'Amoeba disabled on this device. Other devices sharing this vault are unaffected.'
        : 'Amoeba re-enabled on this device.'
    );
  }

  scheduleTick(state) {
    // The amoebas map is the source of truth for "should this keep running"
    // — start()/stop()/the metadataCache listener own membership in it.
    if (!this.amoebas.has(state.path)) return;
    const file = this.app.vault.getAbstractFileByPath(state.path);
    if (!(file instanceof TFile)) {
      this.amoebas.delete(state.path);
      return;
    }

    const delay =
      this.settings.speedMode === 'spider' ? this.getSpiderTickDelay(state) : this.getSpeedMs();
    state.lastDelayMs = delay;
    state.timeoutId = setTimeout(() => this.tick(state), delay);
  }

  async tick(state) {
    const file = this.app.vault.getAbstractFileByPath(state.path);
    if (!(file instanceof TFile)) {
      this.amoebas.delete(state.path);
      return;
    }

    // With Graph view open, the amoeba walks and writes both the Note
    // Stream (the visual link block) and, if logging is on, the broken-link
    // log. With Graph view closed, it normally pauses entirely — unless
    // "Continue interactions while global graph view is closed" is on, in
    // which case it keeps walking and writing the Note Stream (and, if
    // scanning is separately on, the log too) exactly as if Graph view were
    // still open. This is a plain global toggle, independent of the
    // broken-link scanning setting — see AmoebaSettingTab and
    // DEFAULT_SETTINGS' comment on continueScanningWhileGraphClosed.
    const graphOpen = this.isGraphViewOpen();
    const cleanupOn = this.settings.cleanupHelper !== 'visualOnly';
    const keepWalking = graphOpen || this.settings.continueScanningWhileGraphClosed;
    const logBroken = cleanupOn && keepWalking;

    // While a mitosis event is still splitting apart (phase 1 and phase 2
    // — everything up to the moment the two organisms actually separate),
    // the main amoeba holds still instead of continuing to wander — its
    // Note Stream was already cleared the moment mitosis began (see
    // startMitosis()), and nothing writes to it again until this check
    // stops being true. It resumes on its own once phase 3 begins (see
    // beginMitosisPhase3()) — no separate "resume" call needed.
    const splitting = this.isMitosisSplitting();

    if (keepWalking && !splitting) {
      // Snapshotted before stepwiseAdvance() mutates state.window, so the
      // difference after tells us which note(s) are newly visited this
      // tick — stepwiseAdvance() itself is shared with Amoeba.2's own
      // wander (mitosisWanderTick()), so this is done here rather than
      // inside it, keeping Vault Poem harvesting a main-amoeba-only thing
      // without touching that shared method at all.
      const previouslyVisited = new Set(state.window.map((f) => f.path));

      // Amoeba always walks stepwise — no toggle for it, that's the point.
      const targets = await this.stepwiseAdvance(file, state, this.getLinkCount(), keepWalking);

      if (logBroken && targets.length > 0) {
        await this.syncBrokenLinksLogBatch(file, targets);
      }

      const newlyVisited = targets.filter((f) => !previouslyVisited.has(f.path));
      if (this.settings.poemEnabled && newlyVisited.length > 0) {
        await this.harvestPoemWords(newlyVisited);
      }
    }

    // Rare mitosis only gets a chance to trigger on the same ticks that
    // actually do something visible (keepWalking) — same reasoning as the
    // walk/log above: it's a graph-visual event, not worth starting while
    // there's nothing open to see it happen in.
    this.maybeTriggerMitosis(state, keepWalking);

    // Same gating as the walk/log/mitosis above, and for the same reason:
    // nothing new is being encountered while the amoeba isn't visibly
    // walking, so there's nothing to pace forward either. Progress simply
    // resumes (and, if the ~30-minute window closed in the meantime,
    // immediately finalizes whatever's left) once keepWalking is true
    // again — see maybeAdvancePoem(). Also gated on the "Write a daily
    // vault poem" setting, same as the harvesting call above — while it's
    // off, today's pool (if any) just holds still rather than continuing
    // to pace toward its deadline.
    if (this.settings.poemEnabled) this.maybeAdvancePoem(state, keepWalking);

    this.scheduleTick(state);
  }

  // --- Vault Poem word harvesting ------------------------------------------
  // See the POEM_* constants near the top of the file for the fixed word
  // lists and the reasoning behind them, and PoemPool for what gets built
  // up here. This is only the harvesting half of the feature — a later
  // pacing pass (not built yet) will drain this.poemPool into the actual
  // rendered poem in the Vault Poem block.

  // 'YYYY-MM-DD' in local time — deliberately not UTC, so the poem resets
  // when the amoeba's own day actually turns over for whoever's running it,
  // not at a fixed UTC instant that could be mid-afternoon somewhere.
  todayDateKey() {
    const d = new Date();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }

  // Returns the current pool, replacing it wholesale the moment the
  // calendar day changes — the simplest possible daily reset. Also
  // reflects that reset in the note right away (rather than waiting on the
  // next pacing tick, which could be a while off) — fire-and-forget, since
  // this is called from plenty of places (including deep inside
  // harvesting) that shouldn't themselves fail if a note write hiccups.
  ensurePoemPoolForToday() {
    const today = this.todayDateKey();
    if (!this.poemPool || this.poemPool.dateKey !== today) {
      this.poemPool = new PoemPool(today);
      this.writePoemToNote().catch((e) =>
        console.error('Amoeba: failed to reset the Vault Poem note for the new day', e)
      );
    }
    return this.poemPool;
  }

  // Every not-yet-decided slot across every line, in reading order (top
  // line first, left to right) — the order maybeAdvancePoem() fills them.
  pendingPoemSlots(pool) {
    const pending = [];
    // Title first, so it's the first thing to fill in as the day's poem
    // builds — reads like actually writing a poem title-down, and means a
    // poem that never fully fills at least gets its title decided first.
    for (const slot of pool.title) {
      if (slot.word === null && !slot.blank) pending.push(slot);
    }
    for (const line of pool.slots) {
      for (const slot of line) {
        if (slot.word === null && !slot.blank) pending.push(slot);
      }
    }
    return pending;
  }

  // Tries to fill one slot from whatever this.poemPool currently has for
  // its role. If nothing matches yet: leaves it pending (to try again on a
  // later qualifying tick) unless forceBlank is set, in which case it's
  // decided permanently blank instead — see maybeAdvancePoem() for when
  // each of those applies. Pulls oldest-first (FIFO), same as every other
  // rolling buffer in this file.
  decidePoemSlot(pool, slot, forceBlank) {
    const entry = this.drawUnusedPoolEntry(pool, slot.role);
    if (entry) {
      slot.word = entry.word;
      slot.path = entry.path;
      pool.usedPaths.add(entry.path);
      return;
    }
    // 'past-tense' specifically gets one more chance before going blank —
    // see backfillPastTenseSlot(). Deadline-only (forceBlank implies this
    // is the forced-decide pass — see maybeAdvancePoem()): during ordinary
    // pacing a slot with nothing yet just stays pending and tries again
    // next tick, same as any other role, so this never preempts a
    // genuinely harvested past-tense word that simply hasn't arrived yet.
    if (slot.role === 'past-tense' && forceBlank) {
      const backfilled = this.backfillPastTenseSlot(pool);
      if (backfilled) {
        slot.word = backfilled.word;
        slot.path = backfilled.path;
        pool.usedPaths.add(backfilled.path);
        return;
      }
    }
    if (forceBlank) slot.blank = true;
  }

  // Finds the oldest entry for `role` whose source note hasn't already
  // supplied a word elsewhere in today's poem — the "no more than one word
  // per note" rule, checked here rather than at harvest
  // time since a note's words are harvested well before it's known which
  // of them (if any) the poem will actually use. An entry from an
  // already-used note is skipped, not discarded — it stays in the bucket
  // in case that note somehow becomes usable again (it won't, within a
  // day, once the pool's one-word budget for it is spent, but there's no
  // reason to throw away real harvested data over it; POEM_POOL_MAX_PER_ROLE
  // still caps the bucket regardless). Returns null if every entry in the
  // bucket is from an already-used note — decidePoemSlot() treats that the
  // same as an empty bucket.
  drawUnusedPoolEntry(pool, role) {
    const bucket = pool.byRole.get(role);
    if (!bucket) return null;
    for (let i = 0; i < bucket.length; i++) {
      if (!pool.usedPaths.has(bucket[i].path)) {
        const [entry] = bucket.splice(i, 1);
        return entry;
      }
    }
    return null;
  }

  // Last-resort source for an unfillable 'past-tense' slot at the pacing
  // deadline: borrow a word harvested for a related lexical-verb role and
  // re-inflect it via convertWordToPastTense(), rather than render a blank
  // when a perfectly good verb was sitting in an adjacent bucket the whole
  // time. Tries POEM_PAST_TENSE_FALLBACK_ROLES in order; within each
  // bucket, scans oldest-first and skips (doesn't remove) any word that
  // fails to convert OR whose note is already used elsewhere in the poem —
  // same one-word-per-note rule as drawUnusedPoolEntry() above, since this
  // is just a different way of drawing from the pool, not an exemption
  // from it — so a single bad/already-used candidate like "go" doesn't
  // cost that bucket a usable word it might still supply to whatever role
  // it was actually harvested for, if this slot ends up blank anyway.
  backfillPastTenseSlot(pool) {
    for (const role of POEM_PAST_TENSE_FALLBACK_ROLES) {
      const bucket = pool.byRole.get(role);
      if (!bucket || bucket.length === 0) continue;
      for (let i = 0; i < bucket.length; i++) {
        if (pool.usedPaths.has(bucket[i].path)) continue;
        const converted = this.convertWordToPastTense(bucket[i].word);
        if (converted) {
          const [entry] = bucket.splice(i, 1);
          return { word: converted, path: entry.path };
        }
      }
    }
    return null;
  }

  // Called every tick (alongside maybeTriggerMitosis()) to advance today's
  // poem by at most one slot. Two modes: once the day's pacing window
  // (pool.durationMs, from when today's pool was created — normally
  // ~30 minutes, or 1 via the "Fast-track Vault Poem" testing command; see
  // POEM_TARGET_DURATION_MS/POEM_TEST_DURATION_MS) has closed, every
  // remaining pending slot is decided right away — filled if the pool can
  // still match it, blanked otherwise, so the poem is fully resolved rather
  // than left hanging. Before that, it paces itself: same idea as
  // maybeTriggerMitosis()'s trigger chance — an average interval (target
  // duration ÷ total slot count) scaled by how much time this tick's own
  // delay actually covers, so the fill rate holds regardless of the
  // amoeba's current movement speed.
  maybeAdvancePoem(state, active) {
    if (!active) return;
    const pool = this.ensurePoemPoolForToday();
    const pending = this.pendingPoemSlots(pool);
    if (pending.length === 0) return; // today's poem is already fully decided

    const deadlinePassed = Date.now() - pool.createdAt >= pool.durationMs;
    if (deadlinePassed) {
      for (const slot of pending) this.decidePoemSlot(pool, slot, true);
      this.writePoemToNote().catch((e) =>
        console.error('Amoeba: failed to write the finished Vault Poem to the note', e)
      );
      return;
    }

    const totalSlots = pool.title.length + pool.slots.reduce((n, line) => n + line.length, 0);
    const targetIntervalMs = pool.durationMs / Math.max(totalSlots, 1);
    const chance = (state.lastDelayMs || 0) / targetIntervalMs;
    // Pick a random pending slot rather than always the earliest one. If we
    // always attacked pending[0], a single slot whose role has no matching
    // words yet would never get skipped over — it'd sit at the front of the
    // queue forever, and every later slot (even ones with plenty of pool
    // supply) would be stuck waiting behind it. Random choice lets
    // well-supplied slots keep filling in while a starved slot just keeps
    // missing harmlessly until either the pool catches up or the deadline
    // force-blanks it.
    if (Math.random() < chance) {
      const target = pending[Math.floor(Math.random() * pending.length)];
      this.decidePoemSlot(pool, target, false);
      this.writePoemToNote().catch((e) =>
        console.error('Amoeba: failed to write the updated Vault Poem to the note', e)
      );
    }
  }

  // Testing-only helper, not wired to a Command Palette entry — reachable
  // via the TEST_FAST_TRACK_POEM_ACTION obsidian:// action instead — see
  // that constant's comment and its registerObsidianProtocolHandler() call
  // in onload() for the exact URI. Shortens today's existing pool to a 1-minute
  // pacing window instead of the normal ~30, and restarts the countdown
  // from now, so the whole pipeline — pacing, deadline-forced blanks,
  // rendering — can be watched end-to-end without waiting out the real
  // thing. Deliberately non-destructive: already-decided slots and
  // whatever's already been harvested into pool.byRole stay exactly as
  // they are, since testing the pacing/deadline logic doesn't require
  // throwing away real progress.
  restartPoemForTesting() {
    const pool = this.ensurePoemPoolForToday();
    pool.durationMs = POEM_TEST_DURATION_MS;
    pool.createdAt = Date.now();
    this.writePoemToNote().catch((e) =>
      console.error('Amoeba: failed to write the fast-tracked Vault Poem to the note', e)
    );
    new Notice('Amoeba: Vault Poem fast-tracked — finishes in about 1 minute.');
  }

  // Permanent (not testing-only) — throws away today's pool entirely and
  // starts a brand new one: fresh random structure, empty title/lines,
  // nothing harvested yet. Different from restartPoemForTesting() above,
  // which keeps everything already decided/harvested and only shortens the
  // remaining pacing window — this is the real "clear and start over"
  // action, wired to the in-note "Construct another poem" link (see
  // POEM_RESTART_ACTION / renderPoemRestartLink() /
  // registerObsidianProtocolHandler() in onload()) — no separate Command
  // Palette entry, since the in-note link already covers it. Setting
  // this.poemPool to null first (rather than mutating the existing pool in place) means
  // ensurePoemPoolForToday() takes its normal "no pool yet" branch and does
  // the actual reconstruction — one code path for "new day" and "user
  // asked to restart," not two.
  restartVaultPoem() {
    this.poemPool = null;
    this.ensurePoemPoolForToday();
    this.writePoemToNote().catch((e) =>
      console.error('Amoeba: failed to write the restarted Vault Poem to the note', e)
    );
  }

  // One slot's rendered text: POEM_PENDING_SLOT_TEXT while still waiting on
  // a match within the pacing window; POEM_BLANK_SLOT_TEXT once that
  // window has closed and the role still couldn't be matched (the two
  // render distinctly so a reader can tell "still writing this one" from
  // "didn't get a word today" while glancing at a poem that's still
  // filling in); otherwise the harvested word (optionally case-adjusted
  // via `displayWord` — see renderPoemTitle()/renderPoemLines()), linked
  // or not depending on POEM_LINKED_ROLES. A slot whose role is in that
  // set gets a plain Markdown link back to its source note via
  // obsidianUri() (same non-graph-edge link style as the broken-link log,
  // deliberately not a [[wikilink]] — wikilinks would create a Graph view
  // edge from the main note to every linked source note, which isn't the
  // relationship this represents); every other role renders as plain text.
  renderPoemSlot(slot, displayWord) {
    if (!slot.word) return slot.blank ? POEM_BLANK_SLOT_TEXT : POEM_PENDING_SLOT_TEXT;
    const text = displayWord || slot.word;
    if (!POEM_LINKED_ROLES.has(slot.role)) return text;
    const href = this.obsidianUri({ path: slot.path });
    return `[${text}](${href})`;
  }

  // The title, bolded — the whole title sits inside one **...** span, with
  // each word still its own clickable link nested inside (Markdown/
  // Obsidian render **[word](url)** as a bold clickable link just fine).
  // Title-cased per titleCaseWord() rather than rendered as harvested.
  //
  // `structure.titleMirrorsLine` makes the title copy live from the first
  // `titleMirrorsWordCount` slots of a specific body line instead of being
  // independently harvested — for a structure whose title IS its opening
  // phrase, `title` is left as an empty role array (nothing to
  // independently harvest/pace) and this reads straight from
  // pool.slots[titleMirrorsLine] instead. Deliberately reuses every
  // word-level correction below (a/an, copula/auxiliary agreement,
  // title-casing) exactly as pool.title would have gotten — the mirrored
  // words are just sourced from a different array. Does NOT copy that
  // line's own fixedPunctuationAfter (e.g. a trailing period) — only the
  // words themselves are echoed, never the line's own punctuation.
  renderPoemTitle(pool) {
    const structure = POEM_STRUCTURES[pool.structureIndex];
    const titleSlots =
      structure && structure.titleMirrorsLine !== undefined
        ? pool.slots[structure.titleMirrorsLine].slice(0, structure.titleMirrorsWordCount)
        : pool.title;
    const lastIndex = titleSlots.length - 1;
    const pieces = titleSlots.map((slot, i) => {
      const isEdge = i === 0 || i === lastIndex;
      const nextWord = titleSlots[i + 1] ? titleSlots[i + 1].word : null;
      const prevSlot = titleSlots[i - 1];
      let word = slot.word;
      if (slot.role === 'determiner') word = correctedIndefiniteArticle(word, nextWord);
      else if (slot.role === 'copula' && prevSlot) word = correctedCopula(word, prevSlot.role, prevSlot.word);
      else if (slot.role === 'auxiliary' && prevSlot) word = correctedAuxiliary(word, prevSlot.role, prevSlot.word);
      else if (slot.role === 'present-tense' && prevSlot) word = correctedPresentTenseVerb(word, prevSlot.role, prevSlot.word);
      // `allLowercase` (see renderPoemStanza()'s matching comment) skips
      // title-casing entirely — the title stays exactly as harvested, no
      // edge-word capitals.
      const displayWord = !word
        ? word
        : structure && structure.allLowercase
        ? word
        : titleCaseWord(word, slot.role, isEdge);
      // `strictLineBreaks` (see renderPoemStanza()'s matching comment)
      // suppresses this too — a title with a mid-title coordinating
      // conjunction is unusual, but the suppression is general, not
      // special-cased to whichever structure first needed it.
      const leadingComma =
        !(structure && structure.strictLineBreaks) &&
        i > 0 &&
        slot.role === 'conjunction' &&
        POEM_COORDINATING_CONJUNCTIONS.has(word);
      return { text: this.renderPoemSlot(slot, displayWord), leadingComma };
    });
    const rendered = pieces.reduce(
      (acc, p, i) => acc + (i === 0 ? '' : p.leadingComma ? ', ' : ' ') + p.text,
      ''
    );
    return `**${rendered}**`;
  }

  // One stanza (one entry of pool.slots — see POEM_LINE_WRAP_WORD_LIMIT for
  // why "line" in the structure schema means "stanza" at render time now).
  // Grammar corrections (a/an, copula agreement) and the leading-comma rule
  // still look at strict slot adjacency within the whole stanza — inserting
  // a visual line break never changes what counts as "the next/previous
  // word" for those, only where the text wraps. Capitalization is likewise
  // anchored to the stanza's first slot only (i === 0), not to whichever
  // slot a dynamic wrap happens to start a new visual line on.
  //
  // Two independent break rules, each with its OWN running counter — not
  // one shared counter. The noun rule (POEM_LINE_WRAP_WORD_LIMIT) breaks
  // after a noun once ITS OWN count of words since ITS OWN last break
  // exceeds 3; the adjective rule (POEM_ADJECTIVE_BREAK_CHANCE) gives every
  // adjective-family slot a small, pre-rolled chance (see
  // buildEmptySlotLine()) of breaking once ITS OWN count since ITS OWN last
  // break reaches POEM_ADJECTIVE_BREAK_MIN_LINE_WORDS. If the two counters
  // were merged into one, a break from either rule would eat into the
  // other's count, and a noun-triggered break that's actually due could
  // fail to fire just because an adjective-break happened recently.
  // Keeping the counters separate lets both fire independently, then a
  // slot's final breakAfter is true if EITHER rule says so. In rare cases
  // this can land a break just 1-2 words after another one (a very short
  // line) — accepted as a low-probability edge case rather than something
  // worth adding extra logic to prevent, given how small
  // POEM_ADJECTIVE_BREAK_CHANCE is.
  //
  // A third, independent source of a break: a slot's own
  // `fixedPunctuationAfter` (see POEM_LINE_PUNCTUATION_RULES/
  // buildEmptySlotLine()) — a fixed, structure-authored rule at a specific
  // word position, not a general role-based one. It doesn't touch either
  // counter above (same "don't bother preventing rare short lines"
  // reasoning already established for the noun/adjective rules), and when
  // it's 'comma'/'colon'/'semicolon' rather than 'line-break' it inserts
  // that character in place of the ordinary space/comma logic below,
  // without necessarily forcing a break at all.
  // `previousLine` is the RAW previous structure-line array, if any — used
  // only as a fallback subject source for copula/auxiliary/present-tense
  // agreement when a slot has nothing before it WITHIN its own line
  // (i === 0). This supports a structure whose subject-pronoun trails at
  // the end of one line and is grammatically the subject of the next
  // line's verb (an enjambment shape) — without this, such a present-tense
  // slot would have no adjacent subject to agree with at all. Deliberately
  // NOT used for the capitalize-after-period check below, which is a
  // same-line-only concept (unaffected by this param — see `rawPrevSlot`).
  // `allLowercase` suppresses every capitalization this function would
  // otherwise apply — the stanza's first word and any word following a
  // fixed period both stay exactly as harvested. Nothing else changes:
  // grammar corrections, noun/adjective line-wrap breaks, and fixed
  // punctuation all still run normally, since none of those are
  // capitalization. See renderPoemTitle() for the matching title-side
  // suppression.
  //
  // `strictLineBreaks` suppresses every automatic thing this function
  // (plus buildEmptySlotLine(), for one of the three) could otherwise do
  // that a structure's author didn't explicitly ask for:
  //   - the comma inserted before a mid-line coordinating conjunction
  //     ("and"/"but"/"or"/"nor"/"yet"/"so" — see
  //     POEM_COORDINATING_CONJUNCTIONS).
  //   - the random per-adjective break roll (via buildEmptySlotLine()'s
  //     matching check on adjectiveBreakRoll) — could otherwise silently
  //     split a run of several adjective-role slots on one line onto an
  //     extra, unrequested line some fraction of the time.
  //   - the deterministic noun-break line-wrap rule below (`nounBreak`) —
  //     most structures still get this one; a structure whose line has a
  //     second noun-role word landing more than 3 words after the first
  //     needs it suppressed, since otherwise the noun-break rule breaks
  //     deterministically (not probabilistically, unlike the adjective
  //     roll above) at exactly that point every single time.
  renderPoemStanza(line, previousLine, allLowercase, strictLineBreaks) {
    let sinceNounBreak = 0;
    let sinceAdjectiveBreak = 0;
    // Fixed punctuation (periods/commas/colons/semicolons/line-breaks, and
    // the capitalization that follows a period) only reveals once every
    // slot in THIS line is decided (word or forced-blank), scoped to one
    // line at a time (not the whole poem): a period/comma sitting next to a
    // still-pending
    // "//////////" marker read as premature/wrong, so it's withheld until
    // the line it belongs to is actually finished, then appears all at
    // once. Everything else about the line (words, links, ordinary
    // conjunction-comma, noun/adjective breaks) is unaffected — this only
    // gates the STRUCTURE-AUTHORED punctuation.
    const lineFullyDecided = line.every((slot) => slot.word !== null || slot.blank);
    const previousLineLastSlot =
      previousLine && previousLine.length ? previousLine[previousLine.length - 1] : undefined;
    const pieces = line.map((slot, i) => {
      const nextWord = line[i + 1] ? line[i + 1].word : null;
      const rawPrevSlot = line[i - 1];
      const agreementSubject = rawPrevSlot || (i === 0 ? previousLineLastSlot : undefined);
      let word = slot.word;
      if (slot.role === 'determiner') word = correctedIndefiniteArticle(word, nextWord);
      else if (slot.role === 'copula' && agreementSubject) word = correctedCopula(word, agreementSubject.role, agreementSubject.word);
      else if (slot.role === 'auxiliary' && agreementSubject) word = correctedAuxiliary(word, agreementSubject.role, agreementSubject.word);
      else if (slot.role === 'present-tense' && agreementSubject) word = correctedPresentTenseVerb(word, agreementSubject.role, agreementSubject.word);
      // Capitalize the stanza's true first word (as before), OR any word
      // immediately following a fixed 'period' — a word recurring mid-
      // stanza right after a period needs the same capital as a genuine
      // sentence-initial word, not just the stanza's literal slot 0. Same-
      // line only (rawPrevSlot, not agreementSubject/previousLine) — a
      // period belongs to and is only ever "seen" within its own line.
      const afterFixedPeriod = lineFullyDecided && rawPrevSlot && rawPrevSlot.fixedPunctuationAfter === 'period';
      const displayWord = !allLowercase && (i === 0 || afterFixedPeriod) && word ? capitalizeFirst(word) : word;
      sinceNounBreak += 1;
      sinceAdjectiveBreak += 1;
      const isNoun = POEM_NOUN_ROLES.has(slot.role);
      const isAdjective = POEM_ADJECTIVE_ROLES.has(slot.role);
      const nounBreak = !strictLineBreaks && isNoun && sinceNounBreak > POEM_LINE_WRAP_WORD_LIMIT;
      const adjectiveBreak =
        isAdjective && slot.adjectiveBreakRoll && sinceAdjectiveBreak >= POEM_ADJECTIVE_BREAK_MIN_LINE_WORDS;
      const effectiveFixedPunctuation = lineFullyDecided ? slot.fixedPunctuationAfter : null;
      const fixedBreak = effectiveFixedPunctuation === 'line-break';
      const breakAfter = nounBreak || adjectiveBreak || fixedBreak;
      if (nounBreak) sinceNounBreak = 0;
      if (adjectiveBreak) sinceAdjectiveBreak = 0;
      return {
        role: slot.role,
        word,
        text: this.renderPoemSlot(slot, displayWord),
        breakAfter,
        fixedPunctuationAfter: effectiveFixedPunctuation,
      };
    });
    let out = '';
    pieces.forEach((piece, i) => {
      if (i > 0) {
        const prev = pieces[i - 1];
        const needsComma =
          !strictLineBreaks && piece.role === 'conjunction' && POEM_COORDINATING_CONJUNCTIONS.has(piece.word);
        // A fixed rule on the PREVIOUS slot wins over the ordinary
        // conjunction-comma check — the precedence is explicit rather than
        // left to accident, even where the two rarely land on the same
        // slot in practice.
        let punctuation = '';
        if (prev.fixedPunctuationAfter === 'comma') punctuation = ',';
        else if (prev.fixedPunctuationAfter === 'colon') punctuation = ':';
        else if (prev.fixedPunctuationAfter === 'semicolon') punctuation = ';';
        else if (prev.fixedPunctuationAfter === 'period') punctuation = '.';
        else if (needsComma) punctuation = ',';
        out += punctuation + (prev.breakAfter ? '\n' : ' ');
      }
      out += piece.text;
    });
    // Trailing fixed punctuation — a rule anchored to a line's very LAST
    // slot (nothing follows it within this line, so the loop above never
    // gets a chance to emit it) still needs to render, for a line that ends
    // its sentence right on its final word rather than trailing into
    // another word first. 'line-break' is deliberately not handled here: there's
    // nothing left within this stanza to break into. Already respects the
    // lineFullyDecided gate above, via piece.fixedPunctuationAfter having
    // been nulled out when the line isn't finished.
    const lastPiece = pieces[pieces.length - 1];
    if (lastPiece) {
      if (lastPiece.fixedPunctuationAfter === 'period') out += '.';
      else if (lastPiece.fixedPunctuationAfter === 'comma') out += ',';
      else if (lastPiece.fixedPunctuationAfter === 'colon') out += ':';
      else if (lastPiece.fixedPunctuationAfter === 'semicolon') out += ';';
    }
    return out;
  }

  // The poem body: one rendered stanza per structure "line" entry, grouped
  // into PRINTED stanzas — a blank line between groups, a single line
  // break between entries within the same group. Two ways for a structure
  // to configure the grouping, checked in this order:
  //   - `stanzaSizes` (an array, e.g. [1, 1, 3]): an explicit per-stanza
  //     line count, for IRREGULAR groupings. Any lines left over past what
  //     the array accounts for (shouldn't normally happen if the counts
  //     sum to `lines.length`) each get rendered as their own trailing
  //     stanza rather than silently dropped.
  //   - `stanzaSize` (a single number): every group is this many lines —
  //     for a UNIFORM grouping.
  //   - Neither set: defaults to 1 (every line-entry is its own printed
  //     stanza, blank-line-separated from the next).
  renderPoemLines(pool) {
    const structure = POEM_STRUCTURES[pool.structureIndex];
    const rendered = pool.slots.map((line, i) => {
      const text = this.renderPoemStanza(
        line,
        pool.slots[i - 1],
        structure && structure.allLowercase,
        structure && structure.strictLineBreaks
      );
      // `lineIndents`: {lineIndex: nbspCount} — a fixed, structure-authored
      // leading indent
      // on one specific structure line, same spirit as
      // POEM_LINE_PUNCTUATION_RULES's fixed-position rules but for
      // whitespace instead of punctuation. Non-breaking spaces, not plain
      // ones — a run of plain leading spaces collapses to nothing in
      // rendered Markdown (same reason POEM_BLANK_SLOT_TEXT uses &nbsp;
      // rather than repeated plain spaces). Applied to the very start of
      // the stanza's rendered text, before any internal noun/adjective-
      // break line wrap — since it's a fixed visual offset unrelated to
      // which words filled the line, it's shown regardless of whether the
      // line has finished filling, unlike the fixed-punctuation rules
      // above (which gate on `lineFullyDecided`).
      const indent = structure && structure.lineIndents && structure.lineIndents[i];
      return indent ? POEM_INDENT_UNIT.repeat(indent) + text : text;
    });
    const grouped = [];
    if (structure && Array.isArray(structure.stanzaSizes)) {
      let idx = 0;
      for (const size of structure.stanzaSizes) {
        grouped.push(rendered.slice(idx, idx + size).join('\n'));
        idx += size;
      }
      while (idx < rendered.length) {
        grouped.push(rendered[idx]);
        idx += 1;
      }
    } else {
      const stanzaSize = (structure && structure.stanzaSize) || 1;
      for (let i = 0; i < rendered.length; i += stanzaSize) {
        grouped.push(rendered.slice(i, i + stanzaSize).join('\n'));
      }
    }
    return grouped.join('\n\n');
  }

  // A small italic action link under the poem, same visual register as
  // PSEUDOPODS_DESCRIPTION/EMPTY_ENCOUNTERS_TEXT elsewhere in the note —
  // plugin-generated UI text, not poem content. See POEM_RESTART_ACTION
  // for why this is a link and not a frontmatter checkbox.
  renderPoemRestartLink() {
    return `*[Construct another poem](${this.obsidianRestartPoemUri()})*`;
  }

  // Patches just the Vault Poem block — leaving the rest of the note alone,
  // same targeted-block-regex technique as writeLinks()/
  // resetBrokenLinksLog(). Pool state lives in the plugin's own stored data
  // (see savePoemPoolData()), not embedded in the note itself — a full
  // day's pool JSON is large enough that inlining it would make the note
  // look chaotic in edit/source view for anyone with note editing on — so
  // this block is purely the poem as anyone would want to actually read
  // it: title, stanzas, restart link, nothing else.
  async writePoemToNote() {
    const pool = this.poemPool;
    if (!pool) return;
    const mainFile = this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath());
    if (!(mainFile instanceof TFile)) return;

    // Blank lines flank the markers themselves (start->title, link->end) on
    // top of the existing blank lines between title/lines/link — see
    // buildManagedBlock()'s comment for why a %%marker%% line can never
    // touch a heading or content line directly. The gap before the restart
    // link gets a second blank line on top of that (three newlines, not
    // two) — purely aesthetic breathing room so the poem itself reads as
    // its own distinct block before the plugin-generated action link below
    // it.
    const block =
      `${POEM_BLOCK_START}\n\n${this.renderPoemTitle(pool)}\n\n${this.renderPoemLines(pool)}\n\n\n` +
      `${this.renderPoemRestartLink()}\n\n${POEM_BLOCK_END}`;
    const blockRegex = new RegExp(
      `${escapeRegex(POEM_BLOCK_START)}[\\s\\S]*?${escapeRegex(POEM_BLOCK_END)}`
    );
    await this.app.vault.process(mainFile, (data) => {
      if (blockRegex.test(data)) return data.replace(blockRegex, block);
      const trimmed = data.endsWith('\n') ? data : data + '\n';
      return `${trimmed}\n${block}\n`;
    });
    // Every call site that mutates this.poemPool already calls
    // writePoemToNote() right afterward to reflect the change visually —
    // folding the persistence step in here too means there's exactly one
    // place "the poem changed" fans out to both its effects, rather than
    // requiring every mutation site to separately remember to persist.
    await this.savePoemPoolData();
  }

  // Persists today's poem progress into the plugin's own stored data (see
  // this.settings/onload()'s loadData() call, and saveSettings()) instead
  // of inside the note itself. Reuses saveSettings() as-is — it writes
  // this.settings wholesale via saveData(), and poemPoolData rides along
  // as just another property on that same object. Not really a
  // user-facing "setting," but Obsidian's loadData()/saveData() API is one
  // JSON blob per plugin, period — this.settings already IS that blob,
  // "settings" is just what most of its properties happen to be.
  // Deliberately kept OUT of DEFAULT_SETTINGS on purpose: that object is
  // the reset-to-default schema for actual user preferences (what the
  // per-setting "reset to default" buttons in the settings tab pull from),
  // not a home for internal cache state — poemPoolData simply starts out
  // undefined on a fresh install/upgrade, which loadPoemPoolFromPluginData()
  // below already treats the same as "nothing to resume."
  async savePoemPoolData() {
    this.settings.poemPoolData = this.poemPool ? serializePoemPool(this.poemPool) : null;
    await this.saveSettings();
  }

  // Rehydrates this.poemPool from whatever's saved in the plugin's own
  // data, so a plugin reload resumes today's poem instead of starting a
  // new one — called once from runStartupMaintenance(). A saved pool from
  // any day but today is left alone (not loaded): the next call to
  // ensurePoemPoolForToday() creates a fresh one and rewrites the note
  // itself, same as any other new-day reset, so there's nothing to do here
  // beyond simply not loading stale state. Synchronous — this.settings is
  // already loaded into memory well before onLayoutReady() ever calls this
  // (see onload()), so unlike the old note-comment version, there's no I/O
  // left to await here at all.
  loadPoemPoolFromPluginData() {
    const saved = this.settings.poemPoolData;
    if (!saved) return;
    try {
      if (saved.dateKey === this.todayDateKey()) {
        this.poemPool = deserializePoemPool(saved);
      }
    } catch (e) {
      console.error('Amoeba: failed to restore saved Vault Poem state — starting fresh', e);
    }
  }

  // Appends one harvested word to its role's bucket, applying today's
  // dedupe (content roles only — see PoemPool.seenWords) and the rolling
  // POEM_POOL_MAX_PER_ROLE cap (oldest dropped first) regardless of role.
  // dedupeKey defaults to word itself, but can be overridden — see the
  // noun/plural-noun split in harvestWordsFromText(), where the two roles
  // store different surface forms of the same lemma (singular vs. the
  // original plural) but need to dedupe against each other, not just
  // within themselves, so the same underlying word can't show up as both
  // its singular and plural form in one day's poem.
  addToPoemPoolEntry(pool, role, word, sourcePath, dedupe, dedupeKey) {
    const key = dedupeKey || word;
    if (dedupe) {
      if (pool.seenWords.has(key)) return;
      pool.seenWords.add(key);
    }
    if (!pool.byRole.has(role)) pool.byRole.set(role, []);
    const bucket = pool.byRole.get(role);
    bucket.push({ word, path: sourcePath });
    if (bucket.length > POEM_POOL_MAX_PER_ROLE) bucket.shift();
  }

  // Normalizes a single already-classified word to its dictionary form —
  // toInfinitive() for a verb, toSingular() for a noun — entirely in
  // isolation from the sentence it came from. This used to run as a second
  // whole-document pass instead (mutate a full copy of the text, then read
  // back the same word index from it), on the assumption that singularizing
  // or infinitive-ing a word is always a same-token text substitution. That
  // assumption turned out to be false: a verb PHRASE like "have eaten" or
  // "were saving" collapses to a single infinitive token ("eat"/"save"),
  // which shifts every following term's index in the normalized document
  // out of alignment with the original one — silently harvesting the wrong
  // word under the right role from that point on (caught via a test
  // sentence with auxiliary/copula constructions, which finally triggered
  // a merge; earlier, simpler test sentences never happened to). Normalizing one word by itself sidesteps the problem
  // entirely — there's no neighboring token left for it to merge with —
  // at the cost of one extra compromise doc per open-class word instead of
  // one for the whole note; that trade is an easy one at harvesting's
  // scale. `.tag(tag)` forces the classification we already determined
  // from the real sentence, since compromise can't reliably reclassify a
  // single word correctly out of context, but the infinitive/singular
  // transform itself doesn't need that context to run correctly.
  normalizeOpenClassWord(word, tag) {
    const doc = nlp(word).tag(tag);
    if (tag === 'Verb') doc.verbs().toInfinitive();
    else if (tag === 'Noun') doc.nouns().toSingular();
    const result = doc.text().toLowerCase().trim();
    // A negated contraction forced to Verb and infinitive-ed expands into
    // several words instead of one — "don't" -> "does do not", "won't" ->
    // "does will not" — since compromise reads it as a whole (negated)
    // verb phrase, not a single token, once tagged this way. A poem slot
    // is always exactly one word, so treat this the same as normalization
    // failing outright (callers already skip harvesting on an empty
    // result) rather than harvesting a multi-word phrase into it.
    return result.includes(' ') ? '' : result;
  }

  // Converts an already-classified lexical verb to past tense via
  // compromise's .toPastTense(), entirely in isolation — same one-word-doc
  // approach as normalizeOpenClassWord() above, for the same reason (no
  // neighboring token to misalign). Used only by backfillPastTenseSlot().
  // Verified against 14 regular and irregular verbs (walk/jump/save, but
  // also eat->ate, sell->sold, catch->caught, write->wrote, etc.) — all but
  // one converted correctly. The exception: "go" alone silently stays "go"
  // instead of becoming "went" — .toPastTense() doesn't error, it just
  // no-ops — so it's excluded outright rather than trusted. Everything else
  // is checked with a self-consistency pass (the converted result must
  // itself tag PastTense) rather than assumed correct just because
  // .toPastTense() didn't throw, in case a future compromise version has
  // another silent no-op like "go" that this project's testing didn't
  // happen to catch. Returns '' on any failure — callers treat that as
  // "try a different word," never as "use it anyway."
  convertWordToPastTense(word) {
    if (!word || word === 'go') return '';
    const doc = nlp(word).tag('Verb');
    doc.verbs().toPastTense();
    const result = doc.text().toLowerCase().trim();
    if (!result || result.includes(' ')) return '';
    const resultTerms = (nlp(result).json({ terms: { tags: true } })[0] || {}).terms || [];
    if (!resultTerms[0] || !resultTerms[0].tags.includes('PastTense')) return '';
    return result;
  }

  // Tags every term in a freshly-visited note's text and sorts the ones
  // worth keeping into this.poemPool by role.
  harvestWordsFromText(text, sourcePath) {
    if (!text || !text.trim()) return;
    const pool = this.ensurePoemPoolForToday();

    // compromise's .json() returns one entry per SENTENCE it detects, each
    // with its own .terms array — not one flat array for the whole text.
    // An earlier version of this read only sentences[0], which silently
    // dropped every sentence after the first in any multi-sentence note
    // (caught the same way as the verb-phrase merge bug above: the "This
    // Is Just To Say" sample is three sentences, and its last one — with
    // both "so"s — never got harvested at all until this was flattened).
    // Safe to flatten now that each word is normalized independently (see
    // normalizeOpenClassWord() above) — there's no cross-sentence index
    // alignment left to break by doing so.
    const originalTerms = (nlp(text).json({ terms: { tags: true } }) || []).flatMap(
      (sentence) => sentence.terms || []
    );
    if (originalTerms.length === 0) return;

    for (let i = 0; i < originalTerms.length; i++) {
      const original = originalTerms[i];
      let rawWord = (original.normal || original.text || '').toLowerCase().trim();
      if (!rawWord) continue;

      // Non-English words: checked against the term's RAW surface text
      // (original.text), never against rawWord above — rawWord prefers
      // compromise's own .normal field, which folds accented characters to
      // plain ASCII as part of its normalization ("café" -> "cafe",
      // "mañana" -> "manana"), silently erasing the exact signal this
      // needs. See NON_ENGLISH_CHAR_PATTERN's comment for the full
      // reasoning (including why this alone doesn't catch every foreign
      // word, just the accented ones).
      const surfaceText = (original.text || '').toLowerCase().trim();
      if (NON_ENGLISH_CHAR_PATTERN.test(surfaceText)) continue;

      // Read once, early — needed both for the apostrophe check right
      // below (has to tell a genuine possessive from a contraction) and
      // every tag-based rule further down.
      const tags = original.tags || [];

      // Pronoun contractions ("she's", "that's", "who's", ...) — NOT
      // possessive nouns, which are handled on their own terms further
      // down (see 'possessive-noun' below) rather than excluded; see
      // POEM_APOSTROPHE_PATTERN above for the full reasoning on why a
      // contraction specifically can't be kept. Gated on the #Possessive
      // tag so this only catches an actual contraction — a genuine
      // possessive noun keeps its apostrophe and reaches the Noun branch
      // below instead.
      if (POEM_APOSTROPHE_PATTERN.test(surfaceText) && !tags.includes('Possessive')) continue;

      // Manually-confirmed mistags: checked first, ahead of every tag-based
      // rule below, so a known-bad tag never gets the chance to route this
      // word anywhere else. See POEM_MISTAGGED_WORDS above for why this is
      // a short curated list rather than a general rule.
      if (POEM_MISTAGGED_WORDS.has(rawWord)) {
        this.addToPoemPoolEntry(pool, POEM_MISTAGGED_WORDS.get(rawWord), rawWord, sourcePath, true);
        continue;
      }

      // Relative/interrogative pronouns: the one closed class compromise
      // has no tag for at all — see POEM_RELATIVE_PRONOUNS above. Checked
      // ahead of the tag-based classes below since compromise would
      // otherwise misfile these under Preposition or QuestionWord instead.
      // Role renamed from the old plain 'pronoun' to 'relative-pronoun'
      // now that the personal-pronoun family below has its own roles too
      // — keeps every pronoun-family role name equally specific rather
      // than leaving this one as a vague leftover generic name.
      if (POEM_RELATIVE_PRONOUNS.has(rawWord)) {
        this.addToPoemPoolEntry(pool, 'relative-pronoun', rawWord, sourcePath, false);
        continue;
      }

      // Reflexive pronouns — see POEM_REFLEXIVE_PRONOUNS above for why a
      // curated list, not compromise's #Reflexive tag.
      if (POEM_REFLEXIVE_PRONOUNS.has(rawWord)) {
        this.addToPoemPoolEntry(pool, 'reflexive-pronoun', rawWord, sourcePath, false);
        continue;
      }
      // Personal pronouns, split by grammatical case — see
      // POEM_SUBJECT_PRONOUNS/POEM_OBJECT_PRONOUNS/POEM_INVARIANT_PRONOUNS
      // above. Checked ahead of every tag-based rule below since
      // compromise gives all of these the identical Noun,Pronoun tag with
      // no case distinction to route on.
      if (POEM_SUBJECT_PRONOUNS.has(rawWord)) {
        this.addToPoemPoolEntry(pool, 'subject-pronoun', rawWord, sourcePath, false);
        continue;
      }
      if (POEM_OBJECT_PRONOUNS.has(rawWord)) {
        this.addToPoemPoolEntry(pool, 'object-pronoun', rawWord, sourcePath, false);
        continue;
      }
      if (POEM_INVARIANT_PRONOUNS.has(rawWord)) {
        this.addToPoemPoolEntry(pool, 'invariant-pronoun', rawWord, sourcePath, false);
        continue;
      }
      // Possessive-determiner pronouns ("my", "your", "his", "its",
      // "our", "their") — see POEM_POSSESSIVE_DETERMINERS above. "his" is
      // genuinely ambiguous between determiner ("his book") and
      // standalone possessive pronoun ("the book is his"), with no tag
      // distinguishing the two uses — routed here either way rather than
      // guessed at, same disclosed-simplification spirit as "her" above.
      if (POEM_POSSESSIVE_DETERMINERS.has(rawWord)) {
        this.addToPoemPoolEntry(pool, 'possessive-determiner', rawWord, sourcePath, false);
        continue;
      }

      // Possessive nouns (e.g. "farmer's," "harvests'") are kept, not
      // excluded, just correctly typed rather than dumped into a plain
      // noun slot where the apostrophe made the fill ungrammatical. An
      // ordinary common noun's possessive form is open-class (formed from
      // any noun compromise recognizes), so it gets its own noun-family
      // role rather than a closed-class one like 'possessive-determiner'
      // above. Compromise reliably tags every possessive form with
      // #Possessive, common noun and proper noun alike — a possessive
      // PROPER noun deliberately does NOT reach this branch: the
      // `!tags.includes('ProperNoun')` guard lets it fall straight through
      // to the ordinary proper-noun ban further down instead, so it's
      // excluded by that one already-general rule rather than by a second,
      // redundant special case here. The dictionary-word check strips the
      // trailing possessive marker first ("'s"/"s'"/"'") since checking the
      // possessive form itself against a spellcheck dictionary would never
      // pass — confirmed compromise keeps the apostrophe-s attached as one
      // token, so the raw harvested/rendered word still carries its own
      // possessive marker, just checked without it. One known rendering
      // quirk, not a bug here: a PLURAL possessive (trailing apostrophe
      // only, no s) loses that trailing apostrophe entirely at compromise's
      // own tokenization step — confirmed directly, both `.text` and
      // `.normal` come back without it — so it will render indistinguishable
      // from an ordinary plural noun despite being tracked as
      // 'possessive-noun' internally; nothing to fix on this side,
      // compromise never hands that character back.
      if (tags.includes('Possessive') && tags.includes('Noun') && !tags.includes('ProperNoun')) {
        const strippedWord = rawWord.replace(/'s$|s'$|'$/, '');
        if (
          strippedWord &&
          strippedWord.length >= 2 &&
          !POEM_MUNDANE_WORDS.has(strippedWord) &&
          isRecognizedEnglishWord(strippedWord)
        ) {
          this.addToPoemPoolEntry(pool, 'possessive-noun', rawWord, sourcePath, true, strippedWord);
        }
        continue;
      }

      // Acronyms/initialisms/abbreviations ("CET", "NASA", ...): compromise
      // tags these with a dedicated #Acronym tag, distinct from #ProperNoun
      // — confirmed an acronym can tag Acronym,Noun with no ProperNoun tag
      // at all, so this needs its own check even with proper nouns banned
      // below. Skipped outright, same "not harvested" treatment as
      // numbers/punctuation-only tokens at the end of this loop.
      if (tags.includes('Acronym')) continue;

      // Proper nouns: not harvested at all, full stop. Two reasons: (1) a
      // name-shaped word breaks the poem's flow (a sentence built around a
      // proper name reads like a factual claim about a specific person or
      // place, not found poetry); (2) an ethical one — a real named
      // individual's name (a colleague, an interviewee, anyone mentioned in
      // a vault note) showing up decontextualized in a randomly-arranged
      // poem is a different kind of thing than a country or place name
      // doing the same, and simply excluding every proper noun (person,
      // place, organization alike) is the safest way to make sure that
      // never happens rather than trying to distinguish person names from
      // place names and getting it wrong. The span-detection loop below is
      // still needed even though nothing gets added to the pool anymore:
      // without it, only the FIRST word of a multi-word name would be
      // skipped here, and the rest (e.g. the second word of a two-word
      // place name) would fall through to the ordinary Noun/Adjective
      // branches below and get harvested as if it were an ordinary common
      // noun — skipping the whole span is what stops that. Still only
      // merges truly-adjacent ProperNoun terms separated by nothing but a
      // plain space (`post === ' '`), same boundary check as before, so a
      // comma-separated pair ("Boston,
      // Puerto Rico") doesn't over-merge.
      if (tags.includes('ProperNoun')) {
        let j = i + 1;
        while (
          j < originalTerms.length &&
          (originalTerms[j - 1].post || '') === ' ' &&
          (originalTerms[j].tags || []).includes('ProperNoun')
        ) {
          j++;
        }
        i = j - 1; // this iteration's i++ lands exactly at the next unconsumed term
        continue;
      }

      // Hyphenated compounds ("mish-mash", "climate-related", "self-
      // aware"): reconstructed here for the same reason as the proper-noun
      // run above. Compromise splits most (not all — "co-benefit" stayed
      // one term in testing) hyphen-joined compounds into separate terms,
      // each carrying a #Hyphenated tag; merging on `post === '-'` keeps
      // two distinct compounds sitting near each other in one sentence
      // ("long-overdue climate-related plan") from fusing — confirmed
      // empirically that the boundary between them is a plain space, not a
      // hyphen. The reconstructed word then falls through to the ordinary
      // Verb/Noun/Adjective/Adverb branches below exactly like any other
      // word — same normalization, same mundane-word/recognized-word
      // checks — using the first piece's tags to decide which branch,
      // since every case tested but one had every piece agree on the same
      // broad category (Noun+Noun, Adjective+Adjective...). The exception:
      // "well-being" tags Adverb+Verb, disagreeing pieces, with no clean
      // signal for "this compound is really a noun" — it takes whichever
      // category the first piece implies rather than guessing further. Not
      // perfect, but one whole word under a not-quite-right role beats two
      // disconnected fragments under two different roles, which is the bug
      // this exists to fix.
      if (tags.includes('Hyphenated')) {
        let j = i + 1;
        while (
          j < originalTerms.length &&
          (originalTerms[j - 1].post || '') === '-' &&
          (originalTerms[j].tags || []).includes('Hyphenated')
        ) {
          j++;
        }
        if (j > i + 1) {
          const spanTerms = originalTerms.slice(i, j);
          rawWord = spanTerms
            .map((t) => (t.normal || t.text || '').toLowerCase())
            .join('-')
            .trim();
          i = j - 1;
        }
      }

      // "no" as a quantifier-determiner ("no landing," "no answer," "no
      // exit") — a genuine gap rather than a mistagging: compromise never tags "no" as
      // Determiner in any construction tried (sentence/phrase-initial ->
      // Expression; after a copula ("there is no time") -> Negative;
      // after "have"/"has" -> Expression again), so without this it falls
      // through every branch below and is silently dropped, never
      // entering any pool. Grammatically it sits in exactly the
      // determiner slot ("no"/"any"/"some" all precede a bare noun the
      // same way), so it's routed there directly — a one-word closed-class
      // carve-out, same spirit as POEM_DEMONSTRATIVES just below, checked
      // ahead of (and independently of) the tag-based Determiner branch
      // rather than folded into it, since "no" never actually carries
      // that tag to begin with.
      if (rawWord === 'no') {
        this.addToPoemPoolEntry(pool, 'determiner', rawWord, sourcePath, false);
        continue;
      }
      // Determiner/conjunction/preposition: read straight from compromise's
      // own contextual tag for this instance — see the comment above
      // POEM_RELATIVE_PRONOUNS for why a fixed list was the wrong call
      // here. Every occurrence is kept (no dedupe, no mundane-word filter —
      // neither makes sense for words this common).
      if (tags.includes('Determiner')) {
        // Demonstrative pronoun vs. ordinary determiner — see
        // POEM_DEMONSTRATIVES above for why the next word's tag is what
        // decides this, not anything on the determiner's own tag.
        if (POEM_DEMONSTRATIVES.has(rawWord)) {
          const nextTags = (originalTerms[i + 1] && originalTerms[i + 1].tags) || [];
          if (nextTags.includes('Verb')) {
            this.addToPoemPoolEntry(pool, 'demonstrative-pronoun', rawWord, sourcePath, false);
            continue;
          }
        }
        this.addToPoemPoolEntry(pool, 'determiner', rawWord, sourcePath, false);
        continue;
      }
      if (tags.includes('Conjunction')) {
        // "to" tags Conjunction specifically in its infinitival-particle
        // use ("just to say," "structured to fit") — confirmed this is a
        // different grammatical function from an ordinary coordinating
        // ("and"/"but"/"or") or subordinating ("that"/"before"/"than")
        // conjunction, even though compromise gives all of them the
        // identical tag. Left in one shared bucket, "to" landing in a
        // structure slot that actually wanted a relativizer produced
        // "to was" — grammatically broken, but a legal fill as far as the
        // old undifferentiated 'conjunction' role knew. Pulled out into
        // its own role here, same pattern as POEM_RELATIVE_PRONOUNS/
        // POEM_DEMONSTRATIVES above pulling a specific closed-class word
        // out ahead of a too-coarse tag-based rule. Deliberately narrow:
        // only "to" moves — ordinary coordinating/subordinating
        // conjunctions stay in 'conjunction', since this fixes the concrete
        // case rather than a full 3-way split of the role. Any future
        // structure with a 'conjunction' slot that actually means "to"
        // should request 'infinitive-marker' directly instead.
        if (rawWord === 'to') {
          this.addToPoemPoolEntry(pool, 'infinitive-marker', rawWord, sourcePath, false);
          continue;
        }
        this.addToPoemPoolEntry(pool, 'conjunction', rawWord, sourcePath, false);
        continue;
      }
      if (tags.includes('Preposition')) {
        this.addToPoemPoolEntry(pool, 'preposition', rawWord, sourcePath, false);
        continue;
      }
      // Spelled-out cardinal numbers ("seven", "twelve"...) — a genuine
      // grammatical gap: compromise has no existing role for these (they
      // carry no Noun tag at all, so they never reach the noun-family
      // branch below). Confirmed reliable across ten cardinals (one..ten)
      // plus "twelve" — always Value,TextValue,Cardinal, and distinct from Ordinal ("first",
      // "second"...), which is never mistaken for a cardinal. Treated like
      // an open content class (deduped per day, spellcheck-gated) rather
      // than a closed one, since which specific number shows up is the
      // point, not just that some number does.
      if (tags.includes('Cardinal')) {
        if (!rawWord || rawWord.length < 1) continue;
        if (!isRecognizedEnglishWord(rawWord)) continue;
        this.addToPoemPoolEntry(pool, 'cardinal-number', rawWord, sourcePath, true);
        continue;
      }

      // Verbs: split into role-specific buckets by compromise's own
      // tense/form tags instead of one generic 'verb' role — see the
      // POEM_RELATIVE_PRONOUNS-adjacent comment block above (near
      // POEM_MUNDANE_WORDS) for the full reasoning and the tag combination
      // each role is keyed on. Checked in this order because a term can
      // carry several of these tags at once (e.g. Modal always also carries
      // Auxiliary) and the more specific class should win: copula, then
      // modal, then plain auxiliary, then infinitive, then gerund, then
      // past-tense, then bare present-tense, with a final infinitive-typed
      // fallback for the rare Verb-tagged term matching none of these
      // (mirrors the original design's unconditional infinitive fallback,
      // just narrowed to the leftover case instead of the default case).
      if (tags.includes('Verb') && tags.includes('Copula')) {
        this.addToPoemPoolEntry(pool, 'copula', rawWord, sourcePath, false);
        continue;
      }
      if (tags.includes('Verb') && tags.includes('Modal')) {
        this.addToPoemPoolEntry(pool, 'modal', rawWord, sourcePath, false);
        continue;
      }
      if (tags.includes('Verb') && tags.includes('Auxiliary')) {
        this.addToPoemPoolEntry(pool, 'auxiliary', rawWord, sourcePath, false);
        continue;
      }
      if (tags.includes('Verb') && tags.includes('Infinitive')) {
        const normalizedWord = this.normalizeOpenClassWord(rawWord, 'Verb');
        if (!normalizedWord || normalizedWord.length < 1) continue;
        if (POEM_MUNDANE_WORDS.has(normalizedWord)) continue;
        if (!isRecognizedEnglishWord(normalizedWord)) continue;
        this.addToPoemPoolEntry(pool, 'infinitive', normalizedWord, sourcePath, true);
        continue;
      }
      if (tags.includes('Verb') && tags.includes('Gerund')) {
        if (!rawWord || rawWord.length < 1) continue;
        if (POEM_MUNDANE_WORDS.has(rawWord)) continue;
        if (!isRecognizedEnglishWord(rawWord)) continue;
        this.addToPoemPoolEntry(pool, 'gerund', rawWord, sourcePath, true);
        continue;
      }
      if (tags.includes('Verb') && tags.includes('PastTense')) {
        if (!rawWord || rawWord.length < 1) continue;
        if (POEM_MUNDANE_WORDS.has(rawWord)) continue;
        if (!isRecognizedEnglishWord(rawWord)) continue;
        this.addToPoemPoolEntry(pool, 'past-tense', rawWord, sourcePath, true);
        continue;
      }
      if (tags.includes('Verb') && tags.includes('PresentTense')) {
        if (!rawWord || rawWord.length < 1) continue;
        if (POEM_MUNDANE_WORDS.has(rawWord)) continue;
        if (!isRecognizedEnglishWord(rawWord)) continue;
        this.addToPoemPoolEntry(pool, 'present-tense', rawWord, sourcePath, true);
        continue;
      }
      if (tags.includes('Verb')) {
        // Leftover case: a Verb-tagged term with none of the specific tags
        // above (compromise is inconsistent about attaching a tense/form
        // tag to every verb it tags). Same fallback the original design
        // used unconditionally — normalize to infinitive and file it under
        // 'infinitive' rather than drop it.
        const normalizedWord = this.normalizeOpenClassWord(rawWord, 'Verb');
        if (!normalizedWord || normalizedWord.length < 1) continue;
        if (POEM_MUNDANE_WORDS.has(normalizedWord)) continue;
        if (!isRecognizedEnglishWord(normalizedWord)) continue;
        this.addToPoemPoolEntry(pool, 'infinitive', normalizedWord, sourcePath, true);
        continue;
      }

      // Remaining open classes: role comes from the original (untransformed)
      // tags — already read into `tags` above. Note compromise tags a
      // pronoun ("I"/"you"/"they"/"me"...) as Noun too, alongside Pronoun —
      // that's compromise's own doing, not a gap here, so pronouns are
      // already harvested as ordinary nouns rather than skipped.
      if (tags.includes('Noun')) {
        // Fine-grained noun classification — see POEM_NOUN_ROLES above for
        // the full reasoning and what each sub-tag does/doesn't reliably
        // catch. Sub-type decided first, from compromise's own #Actor/
        // #Uncountable/#Date tags; singular/plural split (mirroring the
        // original noun/plural-noun split) applied within whichever family
        // this word landed in, except 'mass-noun' — uncountable nouns
        // don't have a meaningful plural counterpart, so that family never
        // splits.
        //
        // isPlural is read from the tag BEFORE normalizing, and gates
        // whether normalizeOpenClassWord() (toSingular()) even runs — a
        // real bug, not a hypothetical one: this used to call
        // normalizeOpenClassWord() unconditionally on every noun, plural or
        // not, and a Latin -us singular tagged Noun,Singular (never
        // Plural) — e.g. "focus" — came out the other end mangled ("focu"),
        // linked to a note that actually said the real word. Confirmed
        // directly: compromise's toSingular() blindly strips a trailing "s"
        // as if it were always a regular plural marker, which mangles a
        // word that merely ends in "s" for other reasons even though
        // nothing about the word is actually plural. Gating on the tag
        // fixes every noun compromise itself already recognizes as
        // singular/uncountable — spot-checked across a wide sample of
        // singular nouns ending in -s (-ness abstracts, -itis medical
        // terms, -ess terms, -sis terms, -ics disciplines, -ss words, and
        // several -us words) confirms this covers the large majority of the
        // pattern; only a genuine minority are actually mistagged Plural by
        // compromise in the first place.
        //
        // For that minority — confirmed via the same sweep: a handful of
        // singular/invariant words (an -us word, an -os word, a word ending
        // in a bare "s", a French loanword ending in "s") that get mistagged
        // Noun,PLURAL despite being singular/invariant — trusting the tag
        // alone isn't enough, since the tag itself is wrong. The general,
        // word-list-free rule used instead of hand-listing exceptions:
        // after singularizing a tag-confirmed-plural word, verify the
        // result is actually a real English word via
        // isRecognizedEnglishWord() (the same check already used everywhere
        // else in this function) before trusting it. A genuine plural
        // always singularizes to something real and sails through this
        // check untouched. A false Plural tag produces a mangled non-word
        // that fails the check — at which point the Plural tag itself is
        // treated as wrong, falling back to the surface form as already
        // singular/invariant, which also flows into the role decision below
        // so grammar agreement downstream (subjectNumber()) doesn't get a
        // "plural" subject that isn't really plural either. Scales to any
        // word compromise mistags the same way, without this file ever
        // needing to know their spellings — general rules over hardcoded
        // word lists is the deliberate approach here, since this plugin
        // ships to other people's vaults with words this file can't
        // anticipate.
        const rawIsPlural = tags.includes('Plural');
        let isPlural = rawIsPlural;
        let normalizedWord = rawWord;
        if (rawIsPlural) {
          const candidate = this.normalizeOpenClassWord(rawWord, 'Noun');
          if (candidate && isRecognizedEnglishWord(candidate)) {
            normalizedWord = candidate;
          } else {
            isPlural = false;
          }
        }
        if (!normalizedWord || normalizedWord.length < 1) continue;
        if (POEM_MUNDANE_WORDS.has(normalizedWord)) continue;
        let role;
        if (tags.includes('Uncountable')) {
          role = 'mass-noun';
        } else if (tags.includes('Date')) {
          role = isPlural ? 'plural-time-noun' : 'time-noun';
        } else if (tags.includes('Actor')) {
          role = isPlural ? 'plural-agent-noun' : 'agent-noun';
        } else {
          role = isPlural ? 'plural-noun' : 'noun';
        }
        if (isPlural && role !== 'mass-noun') {
          // Plural surface form kept as-harvested (rawWord), same as
          // before — still dedupes against the singular lemma, so the
          // same underlying word can't show up as both its singular and
          // plural form (e.g. "scientist"/"scientists", "hour"/"hours") in
          // one poem. Checked against rawWord, not normalizedWord — a
          // fragment that happens to singularize to something
          // dictionary-shaped shouldn't slip through just because its
          // singular form would have passed.
          if (!isRecognizedEnglishWord(rawWord)) continue;
          this.addToPoemPoolEntry(pool, role, rawWord, sourcePath, true, normalizedWord);
        } else {
          if (!isRecognizedEnglishWord(normalizedWord)) continue;
          this.addToPoemPoolEntry(pool, role, normalizedWord, sourcePath, true);
        }
      } else if (tags.includes('Adjective')) {
        // Adjectives/adverbs aren't singularized/infinitive-ed — rawWord is
        // already their dictionary form — so no normalizeOpenClassWord()
        // call needed here, just the same length/mundane-word/recognized-
        // word checks.
        if (!rawWord || rawWord.length < 1) continue;
        if (POEM_MUNDANE_WORDS.has(rawWord)) continue;
        if (!isRecognizedEnglishWord(rawWord)) continue;
        // Differentiated by degree — compromise reliably tags an inflected
        // comparative/superlative form (#Comparative/#Superlative),
        // confirmed across both regular ("faster"/"fastest") and irregular
        // ("worse"/"worst"/"better") adjectives, so this is a genuine tag-
        // based split, not a guess. Stored as-harvested (not normalized
        // back to the positive/base form) — same "keep the actual
        // inflection, don't collapse it" approach already used for
        // past-tense/present-tense/gerund. Two known, disclosed gaps, not
        // silently swallowed: (1) "best" specifically was confirmed to
        // mistag as a plain Noun rather than Adjective,Superlative when
        // used elliptically ("in fact the best" — standing in for an
        // implied noun) — compromise's own inconsistency, same category as
        // POEM_MISTAGGED_WORDS' known gaps, not something fixable here
        // without a word-specific override this project deliberately
        // avoids in favor of general rules (see the note above
        // POEM_MISTAGGED_WORDS); (2)
        // periphrastic comparison ("more resilient," "most vulnerable") —
        // very plausible in academic prose — isn't caught at all: the
        // adjective itself stays plain #Adjective (no degree tag), and
        // "more"/"most" don't reliably tag as comparison-signal words
        // either (confirmed "more" tags Noun, "most" tags Adverb,
        // inconsistently), so this split only surfaces INFLECTED
        // comparative/superlative forms, not every comparative/superlative
        // construction in the text.
        if (tags.includes('Superlative')) {
          this.addToPoemPoolEntry(pool, 'superlative-adjective', rawWord, sourcePath, true);
        } else if (tags.includes('Comparative')) {
          this.addToPoemPoolEntry(pool, 'comparative-adjective', rawWord, sourcePath, true);
        } else {
          this.addToPoemPoolEntry(pool, 'adjective', rawWord, sourcePath, true);
        }
      } else if (tags.includes('Adverb')) {
        if (!rawWord || rawWord.length < 1) continue;
        if (POEM_MUNDANE_WORDS.has(rawWord)) continue;
        if (!isRecognizedEnglishWord(rawWord)) continue;
        this.addToPoemPoolEntry(pool, 'adverb', rawWord, sourcePath, true);
      }
      // Anything else (numbers, punctuation-only tokens, tags we don't
      // have a role for) is simply not harvested.
    }
  }

  // Reads and harvests each freshly-visited note in one tick's batch. Only
  // ever called from tick() with the note(s) newly added to the main
  // amoeba's own rolling window this tick — never for every note in the
  // window on every tick (that would re-harvest the same notes repeatedly
  // for as long as they sit in the window), and never for Amoeba.2's own
  // wander (see the call site in tick() for why).
  async harvestPoemWords(files) {
    for (const file of files) {
      try {
        const raw = await this.app.vault.cachedRead(file);
        // Only a note's actual content should feed the poem, never YAML
        // properties (tags, aliases, project status fields, etc.). Uses
        // Obsidian's own getFrontMatterInfo() (content-based, not
        // metadataCache — works even if the cache hasn't caught up to a
        // just-edited file yet, and matches exactly what Obsidian itself
        // considers the frontmatter block) rather than a hand-rolled
        // regex. info.exists is false for a note with no frontmatter at
        // all, in which case the text is used as-is.
        const info = getFrontMatterInfo(raw);
        const text = info.exists ? raw.slice(info.contentStart) : raw;
        this.harvestWordsFromText(text, file.path);
      } catch (e) {
        // Non-fatal — worst case this one note's words are skipped today.
        console.error('Amoeba: failed to harvest Vault Poem words from', file.path, e);
      }
    }
  }

  // The interval stays exactly as configured — this just changes what
  // happens each tick. Instead of reshuffling all `count` links at once, it
  // keeps a rolling window of `count` notes and swaps out only the single
  // oldest one each tick, so the display walks forward one link at a time
  // (A,B -> C,B -> C,D -> D,E ...) instead of jumping wholesale.
  async stepwiseAdvance(file, state, count, writeVisual) {
    if (state.window.length === 0) {
      // First tick since stepwise turned on (or vault too small before):
      // populate the window fully, with no swap yet.
      state.window = this.pickRandomNotes(file, state, count);
    } else {
      // Keep the window sized to the current count in case it changed.
      while (state.window.length < count) {
        const pick = this.pickOneRandomNote(file, state.window.map((f) => f.path));
        if (!pick) break;
        state.window.push(pick);
      }
      while (state.window.length > count) {
        state.window.shift();
      }
      // Roll forward one step: drop the oldest, add one fresh pick.
      if (state.window.length > 0) {
        state.window.shift();
        const pick = this.pickOneRandomNote(file, state.window.map((f) => f.path));
        if (pick) state.window.push(pick);
      }
    }

    if (state.window.length > 0) {
      if (writeVisual) await this.writeLinks(file, state.window);
      state.lastPickedPaths = new Set(state.window.map((f) => f.path));
    }

    return state.window;
  }

  pickOneRandomNote(amoebaFile, excludePaths) {
    const excludeSet = new Set(excludePaths);
    const candidates = this.app.vault
      .getMarkdownFiles()
      .filter(
        (f) =>
          f.path !== amoebaFile.path && !excludeSet.has(f.path) && this.isPickable(f.path)
      );
    if (candidates.length === 0) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  // Scan folder and Interact with excluded files only take effect once
  // broken-link scanning is on — they're hidden in the settings tab in that
  // case too (see AmoebaSettingTab), so this keeps their actual behavior
  // consistent with what's visible. With scanning off, the amoeba picks
  // from the whole vault, respecting the user's Excluded files list by
  // default same as before either setting existed.
  //
  // With scanning on: either/or, driven by the one plugin-wide setting —
  // excluded notes are either fully in play (visual links and log both) or
  // fully out (never picked at all). The scan folder restriction is
  // checked first and separately — a note outside the chosen folder is
  // never pickable regardless of the Excluded files setting.
  isPickable(path) {
    if (this.settings.cleanupHelper !== 'on') return !this.isUserIgnored(path);
    if (!this.isWithinScanFolder(path)) return false;
    if (this.settings.includeExcludedFiles) return true;
    return !this.isUserIgnored(path);
  }

  // A blank Scan folder setting means the whole vault is in play — '/' is
  // treated the same way defensively, since normalizePath('') actually
  // returns '/' rather than '' (see the Scan folder field's onChange in
  // AmoebaSettingTab, which works around this at the source; this is a
  // backstop in case '/' ever ends up stored some other way). Otherwise a
  // note only counts if it's the folder itself or somewhere underneath it —
  // a plain path.startsWith() would also match a sibling folder that
  // happens to share a prefix (e.g. "Journal" matching "Journal Drafts"),
  // so the "/" boundary check guards against that.
  isWithinScanFolder(path) {
    const folder = this.settings.scanFolderPath;
    if (!folder || folder === '/') return true;
    return path === folder || path.startsWith(`${folder}/`);
  }

  // Reads straight from plugin settings — no cache to go stale, so a
  // slider change takes effect the next time a tick gets scheduled (not
  // necessarily the very next instant, since a timer already in flight was
  // scheduled with whatever the delay was at that time). In Circadian mode
  // this also means each tick re-evaluates the current time of day fresh,
  // rather than computing it once when the amoeba started.
  getSpeedMs() {
    if (this.settings.speedMode === 'circadian') return getCircadianSpeedMs();
    return Math.round(Math.min(MAX_SPEED_MS, Math.max(MIN_SPEED_MS, this.settings.speedMs)));
  }

  // "Move like a spider"'s bursts-then-pauses timing (see scheduleTick(),
  // the only caller). state.spiderBurstEndsAt marks when the current 0.25s
  // burst should give way to one pause — while "now" is still short of it,
  // every tick lands SPIDER_TICK_MS apart, same as a steady fixed interval.
  // Once it's passed, this picks a random pause, then immediately queues up
  // the next burst window (spiderBurstEndsAt = now + pause + a fresh burst
  // length) so that by the time the pause itself elapses, bursting is
  // already the active phase — no separate "which phase are we in" field
  // needed, just the one timestamp.
  getSpiderTickDelay(state) {
    const now = Date.now();
    if (state.spiderBurstEndsAt === null) {
      state.spiderBurstEndsAt = now + randomBetween(SPIDER_BURST_MIN_MS, SPIDER_BURST_MAX_MS);
    }
    if (now < state.spiderBurstEndsAt) return SPIDER_TICK_MS;

    const pauseMs = randomSpiderPauseMs();
    state.spiderBurstEndsAt = now + pauseMs + randomBetween(SPIDER_BURST_MIN_MS, SPIDER_BURST_MAX_MS);
    return Math.round(pauseMs);
  }

  // "Move like a spider" is a matched trio — Speed, Simultaneous
  // links, and Pseudopods all set together. Once Simultaneous links or
  // Pseudopods drifts away from the value the preset applied (8, currently),
  // the burst/pause timing no longer matches what's actually on screen, so
  // spider mode quietly steps back to a plain fixed 0.25s interval instead
  // of silently continuing to burst and pause underneath a setup that no
  // longer looks like "Move like a spider". Speed doesn't need
  // a matching check here — picking anything from its dropdown already
  // overwrites speedMode unconditionally (see that setting below).
  exitSpiderModeIfMismatched() {
    if (this.settings.speedMode !== 'spider') return;
    if (this.settings.linkCount !== SPIDER_LINK_COUNT || this.settings.pseudopods !== SPIDER_PSEUDOPOD_COUNT) {
      this.settings.speedMode = 'fixed'; // speedMs is already 250, from when spider mode was applied
    }
  }

  getLinkCount() {
    return Math.round(
      Math.min(MAX_LINK_COUNT, Math.max(MIN_LINK_COUNT, this.settings.linkCount))
    );
  }

  // Global graph only, on purpose — an amoeba's link constantly changing
  // makes any local graph it wanders through (or lives in) harder to use,
  // so local graph panes being open doesn't count as a reason to animate.
  isGraphViewOpen() {
    return this.app.workspace.getLeavesOfType('graph').length > 0;
  }

  pickRandomNotes(amoebaFile, state, count) {
    const all = this.app.vault
      .getMarkdownFiles()
      .filter((f) => f.path !== amoebaFile.path && this.isPickable(f.path));
    if (all.length === 0) return [];

    const shuffled = shuffle(all.slice());
    // Prefer notes that weren't in the last batch, so movement stays visible
    // tick to tick — but only if there's enough of the vault left to do that
    // without falling short of the requested count.
    const fresh = shuffled.filter((f) => !state.lastPickedPaths.has(f.path));
    const pool = fresh.length >= count ? fresh : shuffled;

    return pool.slice(0, Math.min(count, pool.length));
  }

  // Always emits a plain [[wikilink]], regardless of the vault's default
  // link-format setting. Falls back to a full path when two notes share a
  // basename, so the link is never ambiguous.
  //
  // Accepts an optional pre-built basename->count map (see
  // buildBasenameCounts()) so a caller writing several links in one pass —
  // writeLinks(), syncBrokenLinksLogBatch(), syncPseudopodLinks(),
  // syncMitosisPseudopodLinks(), and the mitosis-note modify handler in
  // onload() — can scan the vault's file list once and reuse it for every
  // link, instead of rescanning the whole vault per link. That rescan-per-
  // link pattern used to run on every tick (as often as every 250ms in
  // spider mode) for every "Simultaneous links" target, which is exactly
  // the kind of large-vault CPU cost the README already warns about. A
  // caller with just one link to write can omit the map and this falls
  // back to scanning on its own, same behavior as before.
  wikilinkTarget(targetFile, basenameCounts) {
    const count = basenameCounts
      ? basenameCounts.get(targetFile.basename) || 0
      : this.app.vault.getMarkdownFiles().filter((f) => f.basename === targetFile.basename).length;
    if (count > 1) {
      return targetFile.path.slice(0, -3); // strip ".md"
    }
    return targetFile.basename;
  }

  // Basename -> count across every markdown file in the vault. Built once
  // per batch of links so wikilinkTarget() doesn't rescan the whole vault
  // for each individual link — see that method's own comment. Deliberately
  // vault-wide rather than scoped to just the batch's own targets, since a
  // basename collision can come from any note in the vault, not only the
  // ones being linked this pass.
  buildBasenameCounts() {
    const counts = new Map();
    for (const f of this.app.vault.getMarkdownFiles()) {
      counts.set(f.basename, (counts.get(f.basename) || 0) + 1);
    }
    return counts;
  }

  // targetFiles arrives oldest-to-newest — state.window (and Amoeba.2's own
  // m.window) is built by pushing new picks onto the end and shifting the
  // oldest off the front (see stepwiseAdvance()), so the last element is
  // always the most recently added. Reversed here (a copy — .reverse()
  // mutates in place, and targetFiles is often that same live window
  // array, not a throwaway one) so the Note Stream displays newest-first,
  // top-to-bottom — the window's own oldest-at-front storage order is
  // unaffected, only how it's rendered.
  async writeLinks(amoebaFile, targetFiles) {
    const basenameCounts = this.buildBasenameCounts();
    const links = targetFiles
      .slice()
      .reverse()
      .map((f) => `[[${this.wikilinkTarget(f, basenameCounts)}]]`)
      .join('\n');
    const block = buildManagedBlock(LINK_BLOCK_START, links, LINK_BLOCK_END);

    // Shared by the main amoeba's own walk and Amoeba.2 (its initial bridge
    // link, phase 2's bridge drop, and phase 3's own wander) — a plain
    // targeted block-regex patch either way. Marking the path here is a
    // no-op for the main note (nothing ever checks pendingMitosisWrites for
    // it) but keeps Amoeba.2's own 'modify' listener from re-verifying a
    // write it already knows is correct.
    this.markMitosisWrite(amoebaFile.path);
    await this.app.vault.process(amoebaFile, (data) => {
      const blockRegex = new RegExp(
        `${escapeRegex(LINK_BLOCK_START)}[\\s\\S]*?${escapeRegex(LINK_BLOCK_END)}`
      );
      if (blockRegex.test(data)) {
        return data.replace(blockRegex, block);
      }
      const trimmed = data.endsWith('\n') ? data : data + '\n';
      return `${trimmed}\n${block}\n`;
    });
  }

  // Builds a link that's clickable (jumps straight to the note) but doesn't
  // register as a real connection: Obsidian only feeds [[wikilinks]] and
  // vault-relative [text](path) links into the graph/backlinks engine — a
  // custom-scheme URI like obsidian://open is treated the same as any
  // external https:// link, so it's navigable without ever becoming an edge.
  obsidianUri(note) {
    const vaultName = this.app.vault.getName();
    const pathNoExt = note.path.replace(/\.md$/, '');
    return `obsidian://open?vault=${encodeURIComponent(vaultName)}&file=${encodeURIComponent(
      pathNoExt
    )}`;
  }

  // Same vault-qualified shape as obsidianUri() above, just pointed at
  // POEM_RESTART_ACTION instead of the built-in "open" action — see
  // registerObsidianProtocolHandler() in onload() for the handler this
  // fires, and renderPoemRestartLink() for where this gets used.
  obsidianRestartPoemUri() {
    const vaultName = this.app.vault.getName();
    return `obsidian://${POEM_RESTART_ACTION}?vault=${encodeURIComponent(vaultName)}`;
  }

  // Checks every note in a tick's target batch against Obsidian's
  // unresolved-links table (no content parsing needed) and keeps each one's
  // entry in the Broken Link Encounters log in sync: adds/updates a line if
  // it has broken links, removes the line if it doesn't (self-healing on a
  // later revisit). An entry that's revisited with no actual change to its
  // broken links or checked state is left exactly where it is — it is never
  // rewritten just to move it, which would otherwise make the log reshuffle
  // on every revisit under a fast/wide scan.
  //
  // All targets from one tick are folded into a single read-modify-write
  // rather than one per note. All managed sections live in the same
  // file, so a per-note version of this (read/regex/rewrite the whole note,
  // once per target) means up to "Simultaneous links" full-file passes and
  // disk writes every tick — expensive once the log itself has grown large.
  // Batching keeps the cost to one parse and one write per tick regardless
  // of how many targets it covers.
  //
  // Each entry is a real checkbox (- [ ] / - [x]) so it can be checked off
  // by hand while waiting for the amoeba to naturally revisit and confirm
  // the fix — re-syncing preserves whatever checked state is already
  // there. Checking the box doesn't itself remove the line; only a
  // confirmed fix, on revisit, does that.
  //
  // Entries link out via obsidianUri() rather than [[wikilinks]], so a log
  // that grows to dozens of entries doesn't add dozens of permanent graph
  // edges. A hidden HTML-comment marker carries the note's path for
  // matching an entry to its note, decoupled from how the line displays.
  //
  // Reads and updates the log entirely from inside vault.process()'s
  // callback rather than a separate cachedRead() beforehand. vault.process()
  // debounces its writes, so a stale read taken outside the callback can run
  // against a cache that hasn't caught up with another pending write yet —
  // silently clobbering it. Building and returning the new content from the
  // same callback that performs the write keeps the whole batch atomic
  // against that race.
  async syncBrokenLinksLogBatch(amoebaFile, notes) {
    const blockRegex = new RegExp(
      `${escapeRegex(LOG_BLOCK_START)}[\\s\\S]*?${escapeRegex(LOG_BLOCK_END)}`
    );
    // Built once for the whole batch — see wikilinkTarget()'s comment on
    // why this matters on the tick() hot path.
    const basenameCounts = this.buildBasenameCounts();

    await this.app.vault.process(amoebaFile, (data) => {
      const match = data.match(blockRegex);
      const lines = match
        ? match[0]
            .split('\n')
            .slice(1, -1)
            .filter(
              (l) => l.trim().length > 0 && l.trim() !== EMPTY_ENCOUNTERS_TEXT && l.trim() !== CLEANUP_OFF_TEXT
            )
        : [];

      let changed = false;

      for (const note of notes) {
        const unresolved = this.app.metadataCache.unresolvedLinks?.[note.path] || {};
        const brokenTexts = Object.keys(unresolved).filter((key) => unresolved[key] > 0);
        const marker = `<!-- amoeba:${note.path} -->`;
        const displayName = this.wikilinkTarget(note, basenameCounts);
        const href = this.obsidianUri(note);

        const existingIndex = lines.findIndex((line) => line.includes(marker));
        const existingLine = existingIndex !== -1 ? lines[existingIndex] : null;
        const wasChecked = existingLine ? /^-\s*\[x\]/i.test(existingLine.trim()) : false;

        if (brokenTexts.length > 0) {
          const checkbox = wasChecked ? '[x]' : '[ ]';
          const entry = `- ${checkbox} [${displayName}](${href}) → broken link${
            brokenTexts.length > 1 ? 's' : ''
          }: ${brokenTexts.map((t) => `"${t}"`).join(', ')} ${marker}`;

          if (existingIndex !== -1) {
            if (existingLine === entry) continue; // unchanged — leave it in place
            lines[existingIndex] = entry; // update in place, never reorder
          } else {
            lines.push(entry); // newly broken — append
          }
        } else {
          if (existingIndex === -1) continue; // wasn't logged, still isn't
          lines.splice(existingIndex, 1); // fixed — drop it
        }
        changed = true;
      }

      if (!changed) return data; // nothing in this batch actually changed — no write

      const block = renderLogBlock(lines);
      if (blockRegex.test(data)) {
        return data.replace(blockRegex, block);
      }
      if (lines.length === 0) return data; // nothing to add, no block yet
      const trimmed = data.endsWith('\n') ? data : data + '\n';
      return `${trimmed}\n${block}\n`;
    });
  }

  // --- Rare mitosis -------------------------------------------------------
  // See the MITOSIS_* constants near the top of the file for the timing
  // this section reads, and MitosisState for the fields it tracks. Overall
  // shape: startMitosis() creates Amoeba.2, bridges it to the main Amoeba
  // note, and clears the main note's own Note Stream (see below), then
  // kicks off phase 1 (runMitosisPhase1Step(), staggered one pseudopod
  // duplicate at a time, each briefly bridged to its original pair — and
  // the instant the *first* one links, Amoeba.2's own bridge to the main
  // Amoeba note drops, well before the rest have finished duplicating) ->
  // beginMitosisPhase2() (runMitosisPhase2Step(), cutting every remaining
  // pseudopod-pair bridge in a fast near-simultaneous burst — this is what
  // actually separates the two organisms) -> beginMitosisPhase3()
  // (Amoeba.2 wanders fully independently via
  // scheduleMitosisWanderTick()/mitosisWanderTick(), reusing the same
  // stepwiseAdvance()/getSpiderTickDelay() the main amoeba uses) ->
  // beginMitosisDissolve()/runMitosisDissolveStep() (Amoeba.2 deleted
  // first, then its duplicate pseudopods one by one). abortMitosis() and
  // cleanupStaleMitosisArtifacts() are the two ways this can end early
  // instead — see their own comments below.
  //
  // The main amoeba itself holds still (see isMitosisSplitting(), read
  // from tick()) for as long as the two organisms are still connected in
  // any way — phases 1 and 2 — and only resumes wandering once phase 3
  // actually separates them.
  //
  // Amoeba.2's note is set up once (ensureMitosisNoteSkeleton(), at
  // creation) with the same two-section block layout the main note uses,
  // then every update patches just the one block that changed — writeLinks()
  // (shared with the main note) for the Note Stream, syncMitosisPseudopodLinks()
  // for the Pseudopods block — rather than rewriting the whole file each
  // time. That alone isn't quite enough on its own, though: every one of
  // those writes still fires a 'modify' event, which the listener in
  // onload() re-verifies. Two things make that safe rather than a source of
  // extra rewrites: pendingMitosisWrites (see onload()) means every mitosis
  // write marks its own path right before writing, so the listener skips
  // its own writes entirely instead of re-verifying them; and the
  // verification itself only checks and patches the two blocks the plugin
  // owns (Note Stream, Pseudopods), never the whole file — so frontmatter
  // or anything else outside those blocks is left alone, the same as the
  // main Amoeba note. An earlier version diffed the whole file against a
  // from-scratch reconstruction that never included frontmatter, so
  // anything added outside the two blocks (most notably Obsidian's own
  // Properties UI adding an empty frontmatter block while the note sat open
  // in edit mode) read as a "manual edit" and got wiped immediately —
  // and if whatever added it kept re-adding it, the two fought in a loop,
  // which is what was actually causing the frontmatter-wiping/header-
  // flashing bug.

  getMitosisNotePath() {
    return `${this.getAmoebaFolder()}/Amoeba.2.md`;
  }

  getMitosisPseudopodsSubfolder() {
    return `${this.getAmoebaFolder()}/amoeba.2.pseudopods`;
  }

  getMitosisPseudopodNotePath(n) {
    return `${this.getMitosisPseudopodsSubfolder()}/amoeba.2.pseudopod.${n}.md`;
  }

  isMitosisMainNotePath(path) {
    return path === this.getMitosisNotePath();
  }

  isMitosisPseudopodNotePath(path) {
    return new RegExp(
      `^${escapeRegex(this.getMitosisPseudopodsSubfolder())}/amoeba\\.2\\.pseudopod\\.\\d+\\.md$`
    ).test(path);
  }

  // True for as long as the two organisms are still connected in some way
  // — phase 1 (duplicating, main bridge dropped partway through) and
  // phase 2 (cutting the remaining pseudopod-pair bridges) — false once
  // phase 3 actually separates them, and false while nothing's happening
  // at all. Read from tick() to hold the main amoeba's own Note Stream
  // still for the whole splitting event, not just part of it.
  isMitosisSplitting() {
    const m = this.mitosis;
    return !!m && m.phase !== 'phase3' && m.phase !== 'dissolving';
  }

  // See the comment on pendingMitosisWrites in onload() for why this counts
  // instead of just flagging true/false. Call right before any write we
  // make ourselves to a mitosis-managed file.
  markMitosisWrite(path) {
    this.pendingMitosisWrites.set(path, (this.pendingMitosisWrites.get(path) || 0) + 1);
  }

  // Consumes one outstanding write for `path`, if there is one — returns
  // true (skip verification, this is our own write) or false (nothing
  // pending, verify normally). Called from the 'modify' listener in
  // onload().
  consumeMitosisWrite(path) {
    const count = this.pendingMitosisWrites.get(path) || 0;
    if (count <= 0) return false;
    if (count === 1) this.pendingMitosisWrites.delete(path);
    else this.pendingMitosisWrites.set(path, count - 1);
    return true;
  }

  // A [[wikilink]] to whatever's currently at `path`, or null if there's
  // nothing there to link to (e.g. a pseudopod count that shrank out from
  // under an in-progress mitosis). Shared by every place below that needs
  // to point at the main Amoeba note, an original pseudopod, or a mitosis
  // duplicate.
  linkFor(path) {
    const f = this.app.vault.getAbstractFileByPath(path);
    return f instanceof TFile ? `[[${this.wikilinkTarget(f)}]]` : null;
  }

  // A path substring that matches Amoeba.2.md and everything under
  // amoeba.2.pseudopods/, but nothing belonging to the original organism —
  // "amoeba.2" only ever appears in the split-off organism's own paths
  // (the folder-name prefix keeps this scoped to this vault's actual
  // Amoeba folder, same as ensureGraphColorGroup()'s own query, even if
  // that folder's been renamed or moved). Obsidian's path: search is a
  // plain case-insensitive substring match, which is exactly why a bare
  // "amoeba" query doesn't work here — it would also match "Amoeba.2".
  getMitosisGraphGroupQuery() {
    return `path:"${this.getAmoebaFolder()}/amoeba.2"`;
  }

  // Whatever color the user currently has the main Amoeba group set to —
  // after ensureGraphColorGroup()'s one-time creation, that's entirely the
  // user's own choice via Graph view's own color picker, never touched by
  // this plugin again, so this has to be read back live rather than
  // assumed to still be AMOEBA_GRAPH_GROUP_COLOR. `groups` is passed in
  // rather than re-fetched, since the one caller (below) already has it
  // loaded. Loose query match, same reasoning as ensureGraphColorGroup()'s
  // own "already grouped" check: still finds the group even if its query's
  // been hand-edited, as long as it still references the Amoeba folder —
  // excluding an exact match on getMitosisGraphGroupQuery() rules out
  // Amoeba.2's own group specifically (relevant if a stale one somehow
  // lingers), not just anything mentioning "amoeba.2" — the base group's
  // own query legitimately contains that substring too, as its exclusion
  // clause (see getBaseGraphGroupQuery()). Returns null if no matching
  // group exists at all (e.g. the user deleted it outright) — the caller
  // falls back to AMOEBA_GRAPH_GROUP_COLOR in that case.
  currentAmoebaGroupColorHex(groups) {
    const folder = this.getAmoebaFolder();
    const mitosisQuery = this.getMitosisGraphGroupQuery();
    const group = groups.find(
      (g) => typeof g?.query === 'string' && g.query.includes(folder) && g.query !== mitosisQuery
    );
    const rgb = group?.color?.rgb;
    return typeof rgb === 'number' ? packedRgbToHex(rgb) : null;
  }

  // Seeds a second Graph view color group, specific to the split-off
  // organism, for as long as a mitosis event is alive — added here (called
  // from startMitosis()), removed again by removeMitosisGraphColorGroup()
  // once the split-off organism is actually gone: at the end of
  // runMitosisDissolveStep() (once the pseudopods subfolder itself is
  // deleted, not when dissolving merely begins — Amoeba.2 and its
  // remaining duplicates should stay colored while they're still visibly
  // dissolving) or from cleanupStaleMitosisArtifacts() (abortMitosis() and
  // a stale group left over from a crashed session), both of which also
  // remove the folder first. Unlike ensureGraphColorGroup() above
  // (seeded once, ever, then left alone for the user to freely edit), this
  // group is fully plugin-owned for its entire lifetime: added fresh every
  // mitosis event and removed again once it ends, so it never lingers as a
  // stale, permanently-non-matching group after Amoeba.2 is gone. New
  // groups are appended to the end of the list, same place
  // ensureGraphColorGroup()'s own group would already be sitting from
  // earlier — Graph view applies a later group over an earlier one when a
  // node matches both, which is what lets this take over Amoeba.2's own
  // color without touching the general folder-wide group underneath it.
  async ensureMitosisGraphColorGroup() {
    const graph = this.app.internalPlugins?.plugins?.graph;
    if (!graph) return;

    const query = this.getMitosisGraphGroupQuery();
    try {
      const settings = (await graph.loadData()) || {};
      const groups = Array.isArray(settings.colorGroups) ? settings.colorGroups : [];
      if (groups.some((g) => g?.query === query)) return; // already there somehow

      // A shade darker of whatever the user's actual main-Amoeba color is
      // right now, not a fixed color regardless of it — see
      // currentAmoebaGroupColorHex()/darkerShade()'s own comments.
      const mainColorHex = this.currentAmoebaGroupColorHex(groups) || AMOEBA_GRAPH_GROUP_COLOR;
      const newGroup = {
        query,
        color: { a: 1, rgb: hexToPackedRgb(darkerShade(mainColorHex)) },
      };
      groups.push(newGroup);
      settings.colorGroups = groups;
      await graph.saveData(settings);

      for (const leaf of this.app.workspace.getLeavesOfType('graph')) {
        const dataEngine = leaf.view?.dataEngine;
        if (!dataEngine?.getOptions || !dataEngine?.setOptions) continue;

        const liveOptions = dataEngine.getOptions() || {};
        const liveGroups = Array.isArray(liveOptions.colorGroups) ? liveOptions.colorGroups : [];
        if (liveGroups.some((g) => g?.query === query)) continue;
        dataEngine.setOptions({ ...liveOptions, colorGroups: [...liveGroups, newGroup] });
      }
    } catch (e) {
      console.error('Amoeba: failed to seed the mitosis Graph view color group', e);
    }
  }

  // The other half of ensureMitosisGraphColorGroup() — removes exactly the
  // group this plugin added (matched by its exact query, so a group the
  // user has since hand-edited to something else is left alone), from both
  // the persisted graph settings and every open Graph pane's live options.
  async removeMitosisGraphColorGroup() {
    const graph = this.app.internalPlugins?.plugins?.graph;
    if (!graph) return;

    const query = this.getMitosisGraphGroupQuery();
    try {
      const settings = (await graph.loadData()) || {};
      const groups = Array.isArray(settings.colorGroups) ? settings.colorGroups : [];
      const filtered = groups.filter((g) => g?.query !== query);
      if (filtered.length !== groups.length) {
        settings.colorGroups = filtered;
        await graph.saveData(settings);
      }

      for (const leaf of this.app.workspace.getLeavesOfType('graph')) {
        const dataEngine = leaf.view?.dataEngine;
        if (!dataEngine?.getOptions || !dataEngine?.setOptions) continue;

        const liveOptions = dataEngine.getOptions() || {};
        const liveGroups = Array.isArray(liveOptions.colorGroups) ? liveOptions.colorGroups : [];
        const liveFiltered = liveGroups.filter((g) => g?.query !== query);
        if (liveFiltered.length !== liveGroups.length) {
          dataEngine.setOptions({ ...liveOptions, colorGroups: liveFiltered });
        }
      }
    } catch (e) {
      console.error('Amoeba: failed to remove the mitosis Graph view color group', e);
    }
  }

  // Deletes the amoeba.2.pseudopods subfolder, first clearing out anything
  // still in it. Used both when it should already be empty (the normal end
  // of dissolving, once every duplicate has been deleted one by one — this
  // still clears it unconditionally rather than trusting that it already
  // is, so a stray leftover can never keep the folder itself around) and
  // when it isn't (cleanupStaleMitosisArtifacts(), abortMitosis()).
  async deleteMitosisPseudopodsFolder() {
    const path = this.getMitosisPseudopodsSubfolder();
    const folder = this.app.vault.getAbstractFileByPath(path);
    if (!(folder instanceof TFolder)) return;

    for (const child of (folder.children || []).slice()) {
      try {
        await this.app.vault.delete(child);
      } catch (e) {
        // Non-fatal — the fallback below covers a straggler.
      }
    }
    try {
      await this.app.vault.delete(folder);
      return;
    } catch (e) {
      // vault.delete() can refuse a folder Obsidian's own TFolder.children
      // still shows as non-empty, even right after the loop above — that
      // in-memory list can lag the actual deletes by a moment. Falling
      // through to a direct, recursive filesystem-level removal below
      // means a stale children snapshot here can never leave the folder
      // behind permanently.
    }
    try {
      await this.app.vault.adapter.rmdir(path, true);
    } catch (e) {
      console.error('Amoeba: failed to remove the amoeba.2.pseudopods folder after a mitosis event', e);
    }
  }

  // Only ever called on plugin load, when this.mitosis is always still
  // null — so anything found at these paths is left over from a session
  // that ended (crash, force-quit, update) mid-event, not a real
  // in-progress mitosis. Called from both runStartupMaintenance() and
  // ensureAmoebaSetup(), same as the migrateLegacy*() calls beside it,
  // before findSetupConflict() runs — otherwise stale mitosis notes would
  // look like an unrecognized conflict and block setup entirely.
  async cleanupStaleMitosisArtifacts() {
    const file = this.app.vault.getAbstractFileByPath(this.getMitosisNotePath());
    if (file instanceof TFile) {
      try {
        await this.app.vault.delete(file);
      } catch (e) {
        // Non-fatal — worst case it's caught again on the next load.
      }
    }
    await this.deleteMitosisPseudopodsFolder();
    // Also called from abortMitosis(), so this covers both a mid-event
    // Stop Amoeba and a stale group left over from a crashed session.
    await this.removeMitosisGraphColorGroup();
  }

  // Called every tick that actually does something visible (see tick()).
  // Always on — no setting gates this, it's meant to just happen. Scales the
  // per-tick trigger chance by how much time this tick's delay represents
  // (state.lastDelayMs, set in scheduleTick()) against the target average,
  // so the *expected* time between mitosis events stays constant regardless
  // of the current Speed setting.
  maybeTriggerMitosis(state, graphActive) {
    if (!graphActive || this.mitosis || this.setupBlocked) return;
    const elapsed = state.lastDelayMs || this.getSpeedMs();
    const chance = Math.min(1, elapsed / MITOSIS_AVERAGE_INTERVAL_MS);
    if (Math.random() < chance) this.startMitosis();
  }

  // Establishes Amoeba.2's fixed two-section layout the moment it's
  // created — same headings as the main note (Note Stream, then
  // Pseudopods), minus Broken Link Encounters, since Amoeba.2 never scans
  // for broken links. A one-time whole-file write on a brand new, still-
  // blank note — after this, nothing rewrites the whole file again; every
  // later update patches just one block (see the class-level comment
  // above).
  async ensureMitosisNoteSkeleton(file) {
    // No leading "---" here, unlike the main note's first section — this
    // skeleton is always written to a brand-new, still-blank Amoeba.2 note
    // with no frontmatter and nothing above the first heading, so a
    // leading separator would land as literal line 1 of the file. Obsidian
    // always treats a file starting with "---" as opening a YAML
    // frontmatter block regardless of intent, and (having no valid closing
    // fence in the expected place) fails to parse it — a real bug found via
    // this exact code path on a freshly-initialized note. See
    // ensureNoteStructure()'s matching hasLeadingSeparator comment for
    // the main note, where a leading separator IS safe (and added) once
    // real frontmatter or leftover content precedes it.
    const skeleton =
      `${buildManagedBlock(HEADING_ACTIVE, LINK_BLOCK_START, LINK_BLOCK_END)}\n\n` +
      `${SECTION_SEPARATOR}\n\n` +
      `${buildManagedBlock(HEADING_PSEUDOPODS, PSEUDOPODS_BLOCK_START, PSEUDOPODS_BLOCK_END)}\n`;
    this.markMitosisWrite(file.path);
    await this.app.vault.process(file, () => skeleton);
  }

  // Kicks off a mitosis event: real trigger logic, called both by the
  // genuine random chance above (maybeTriggerMitosis()) and, for manual
  // testing, via the TEST_TRIGGER_MITOSIS_ACTION obsidian:// action — see
  // that constant's comment and its registerObsidianProtocolHandler() call
  // in onload() for the exact URI (that handler enforces the "amoeba must
  // be running" guard; this method already guards against a second
  // mitosis starting mid-split via `this.mitosis` below). Clears the main
  // amoeba's own Note Stream (not just pausing future writes to it — the
  // split should be visible immediately, not just frozen wherever it
  // happened to be), rests for
  // MITOSIS_PRE_SPLIT_REST_MS with nothing else visible yet, then hands off
  // to continueMitosisAfterSplitRest() to actually create Amoeba.2. See the
  // class-level comment above for the full phase sequence.
  async startMitosis() {
    if (this.mitosis || this.setupBlocked) return;
    const mainFile = this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath());
    if (!(mainFile instanceof TFile)) return;

    // Brief, purely cosmetic heads-up that a mitosis event just started —
    // uses Notice's own default ~5s auto-dismiss timing, same as every
    // other Notice in the plugin (e.g. 'Amoeba started'/'Amoeba stopped'
    // above), rather than a custom duration.
    new Notice('The Amoeba is dividing...');

    this.mitosis = new MitosisState(
      this.getPseudopodsCount(),
      this.settings.speedMode,
      this.getSpeedMs(),
      this.getLinkCount()
    );
    await this.ensureMitosisGraphColorGroup();

    // The rolling window is reset too, not just the note — so once phase 3
    // resumes the main amoeba's wandering, it starts a fresh walk rather
    // than picking up from wherever the window happened to be when mitosis
    // began.
    const mainState = this.amoebas.get(mainFile.path);
    if (mainState) {
      mainState.window = [];
      mainState.lastPickedPaths = new Set();
    }
    await this.writeLinks(mainFile, []);

    const m = this.mitosis;
    m.phaseTimeoutId = setTimeout(
      () => this.continueMitosisAfterSplitRest(mainFile),
      MITOSIS_PRE_SPLIT_REST_MS
    );
  }

  // Fires once MITOSIS_PRE_SPLIT_REST_MS has elapsed: creates Amoeba.2, sets
  // up its skeleton, and writes its initial bridge link to the main Amoeba
  // note (phase 1's Note Stream) — so Amoeba.2 appears bridged, on its own,
  // before it starts duplicating pseudopods. Rests again for its own
  // MITOSIS_AMOEBA2_INTRO_*_MS beat, then starts phase 1 proper.
  async continueMitosisAfterSplitRest(mainFile) {
    const m = this.mitosis;
    if (!m) return; // aborted during the pre-split rest

    await this.ensureFolder(this.getMitosisPseudopodsSubfolder());
    let mitosisFile = this.app.vault.getAbstractFileByPath(this.getMitosisNotePath());
    if (!(mitosisFile instanceof TFile)) {
      mitosisFile = await this.app.vault.create(this.getMitosisNotePath(), '');
    }
    await this.ensureMitosisNoteSkeleton(mitosisFile);
    await this.writeLinks(mitosisFile, [mainFile]); // Note Stream -> the bridge link

    m.phaseTimeoutId = setTimeout(
      () => this.runMitosisPhase1Step(),
      randomBetween(MITOSIS_AMOEBA2_INTRO_MIN_MS, MITOSIS_AMOEBA2_INTRO_MAX_MS)
    );
  }

  // Rewrites Amoeba.2's own Pseudopods block to link every duplicate
  // created so far (m.createdPseudopods) — a targeted regex patch of just
  // that block, the exact same technique (and largely the exact same code)
  // as the main note's syncPseudopodLinks(), just against Amoeba.2's note
  // and its own duplicate list.
  async syncMitosisPseudopodLinks() {
    const m = this.mitosis;
    if (!m) return;
    const file = this.app.vault.getAbstractFileByPath(this.getMitosisNotePath());
    if (!(file instanceof TFile)) return;

    const pseudopodFiles = [];
    for (let i = 1; i <= m.createdPseudopods; i++) {
      const f = this.app.vault.getAbstractFileByPath(this.getMitosisPseudopodNotePath(i));
      if (f instanceof TFile) pseudopodFiles.push(f);
    }
    const basenameCounts = this.buildBasenameCounts();
    const links = pseudopodFiles.map((f) => `[[${this.wikilinkTarget(f, basenameCounts)}]]`);
    const block = buildManagedBlock(PSEUDOPODS_BLOCK_START, links.join('\n'), PSEUDOPODS_BLOCK_END);

    this.markMitosisWrite(file.path);
    await this.app.vault.process(file, (data) => {
      const blockRegex = new RegExp(
        `${escapeRegex(PSEUDOPODS_BLOCK_START)}[\\s\\S]*?${escapeRegex(PSEUDOPODS_BLOCK_END)}`
      );
      if (blockRegex.test(data)) return data.replace(blockRegex, block);
      const trimmed = data.endsWith('\n') ? data : data + '\n';
      return `${trimmed}\n${block}\n`;
    });
  }

  // What a given mitosis duplicate pseudopod's content should be right now:
  // blank, same as an ordinary pseudopod, except while it's still bridged to
  // its original pair (created in phase 1, not yet unlinked in phase 2) —
  // then it holds exactly one line, the link to that original. Single
  // source of truth for the note's content at every point in its life: the
  // one-shot spawn write in runMitosisPhase1Step() (already bridged, no
  // separate write after create), the one-shot unlink write in
  // syncMitosisPseudopodContent() (phase 2, back to blank — the only time
  // this note is rewritten after it exists), and reverting a manual edit
  // (the modify listener in onload()).
  expectedMitosisPseudopodContent(path) {
    const m = this.mitosis;
    if (!m) return '';
    const match = path.match(/amoeba\.2\.pseudopod\.(\d+)\.md$/);
    const index = match ? parseInt(match[1], 10) : null;
    if (index === null) return '';
    const stillBridged = index <= m.createdPseudopods && index > m.unlinkedPseudopods;
    if (!stillBridged) return '';
    return this.linkFor(this.getPseudopodNotePath(index)) || '';
  }

  // Unconditionally marks-then-writes, exactly like writeLinks() and
  // syncMitosisPseudopodLinks() — no pre-check via cachedRead() first. That
  // pre-check used to be here (read current content, only mark+write if it
  // looked different), which is exactly the pattern that caused Amoeba.2's
  // own note to flash: a cachedRead() done *before* our own write is racy
  // in the same way one done right after a write is — it can return
  // content that's already stale relative to a write still settling, wrongly
  // conclude a change is needed when the file is already correct, and end
  // up re-triggering itself. vault.process() already no-ops internally when
  // its callback's return value matches what's on disk, so there's no need
  // to duplicate that check here — trusting it, the same way the other
  // mitosis writes already do, is what actually stops the loop.
  async syncMitosisPseudopodContent(index) {
    const path = this.getMitosisPseudopodNotePath(index);
    const file = this.app.vault.getAbstractFileByPath(path);
    if (!(file instanceof TFile)) return;
    const expected = this.expectedMitosisPseudopodContent(path);
    this.markMitosisWrite(path);
    await this.app.vault.process(file, () => expected);
  }

  // Phase 1: creates one duplicate pseudopod per step, staggered, each
  // bridged to its original pair the moment it's created. The instant the
  // *first* one links, Amoeba.2 also drops its own bridge to the main
  // Amoeba note — the two bodies separate right away, rather than waiting
  // for every pseudopod to finish duplicating first. Once all of them
  // exist, pauses (MITOSIS_CONNECTED_REST_*) before handing off to phase 2.
  async runMitosisPhase1Step() {
    const m = this.mitosis;
    if (!m || m.phase !== 'phase1') return;

    const next = m.createdPseudopods + 1;
    if (next > m.pseudopodCount) {
      // Every pseudopod is now duplicated and connected — rest here,
      // fully linked, before phase 2's snap.
      m.phaseTimeoutId = setTimeout(
        () => this.beginMitosisPhase2(),
        randomBetween(MITOSIS_CONNECTED_REST_MIN_MS, MITOSIS_CONNECTED_REST_MAX_MS)
      );
      return;
    }

    const path = this.getMitosisPseudopodNotePath(next);
    const isFirst = next === 1;
    m.createdPseudopods = next; // before expectedMitosisPseudopodContent() below, which reads it

    const existing = this.app.vault.getAbstractFileByPath(path);
    if (existing instanceof TFile) {
      // Only reachable if a stale note from an earlier interrupted mitosis
      // survived cleanup — normally nothing exists at this path yet, so
      // this is a fallback, not the routine case.
      await this.syncMitosisPseudopodContent(next);
    } else {
      // Spawned already holding its bridge link, in one single write —
      // deliberately not create-blank-then-write-link as two separate
      // steps. vault.create() fires a 'create' event, not 'modify', so the
      // 'modify' listener never even sees this note until much later (the
      // one unlink write below, in phase 2) — no intermediate blank state,
      // and no window where that listener's own verification could catch
      // it mid-transition and start rewriting it. Marking pendingMitosisWrites
      // here too is belt-and-suspenders in case some Obsidian version/vault
      // setup ever does fire a 'modify' alongside 'create' — harmless if it
      // never gets consumed (the phase 2 unlink write below marks its own
      // path again before its own write regardless).
      this.markMitosisWrite(path);
      await this.app.vault.create(path, this.expectedMitosisPseudopodContent(path));
    }
    await this.syncMitosisPseudopodLinks(); // adds [[amoeba.2.pseudopod.N]] to Amoeba.2's own Pseudopods block

    if (isFirst) {
      const mitosisFile = this.app.vault.getAbstractFileByPath(this.getMitosisNotePath());
      if (mitosisFile instanceof TFile) await this.writeLinks(mitosisFile, []); // main bridge link -> gone
    }

    m.phaseTimeoutId = setTimeout(
      () => this.runMitosisPhase1Step(),
      randomBetween(MITOSIS_STAGGER_MIN_MS, MITOSIS_STAGGER_MAX_MS)
    );
  }

  beginMitosisPhase2() {
    const m = this.mitosis;
    if (!m) return;
    m.phase = 'phase2';
    this.runMitosisPhase2Step();
  }

  // Phase 2: cuts every remaining pseudopod-pair bridge in a fast,
  // near-simultaneous burst (MITOSIS_SNAP_STAGGER_*, a fraction of phase
  // 1's per-item stagger) — each duplicate pseudopod drops back to blank,
  // exactly like an ordinary pseudopod, since it's now fully its own note
  // rather than paired with the original. This is what actually separates
  // the two organisms (the main bridge was already dropped partway through
  // phase 1) — the snap timing is what makes the separation itself read as
  // dramatic and sudden rather than another gradual step. Once every
  // bridge is cut, pauses before handing off to phase 3.
  async runMitosisPhase2Step() {
    const m = this.mitosis;
    if (!m || m.phase !== 'phase2') return;

    const next = m.unlinkedPseudopods + 1;
    if (next > m.createdPseudopods) {
      m.phaseTimeoutId = setTimeout(
        () => this.beginMitosisPhase3(),
        randomBetween(MITOSIS_PHASE_GAP_MIN_MS, MITOSIS_PHASE_GAP_MAX_MS)
      );
      return;
    }

    m.unlinkedPseudopods = next;
    await this.syncMitosisPseudopodContent(next); // bridge cut — back to blank

    m.phaseTimeoutId = setTimeout(
      () => this.runMitosisPhase2Step(),
      randomBetween(MITOSIS_SNAP_STAGGER_MIN_MS, MITOSIS_SNAP_STAGGER_MAX_MS)
    );
  }

  // Phase 3: the two organisms are now fully separated (the main bridge
  // dropped partway through phase 1, the pseudopod-pair bridges all cut in
  // phase 2) — Amoeba.2 starts wandering fully independently, same
  // movement settings as the original (Speed, Simultaneous
  // links), just picking its own random targets. This is also where the
  // main amoeba resumes its own wandering (see isMitosisSplitting(), read
  // from tick()). Runs for MITOSIS_WANDER_*_MS before dissolving. No note
  // write happens here — the Note Stream is already empty from phase 1,
  // and the first wander tick below fills it in via the normal
  // writeLinks() path.
  async beginMitosisPhase3() {
    const m = this.mitosis;
    if (!m) return;
    m.phase = 'phase3';

    // Amoeba.2's very first wander tick gets an extra half-interval on top
    // of the normal delay, purely cosmetic — with matching Movement
    // interval settings, the two would otherwise often step at the same
    // moment. Every tick after this one runs on its own normal cadence (see
    // scheduleMitosisWanderTick()); only the starting offset is deliberate.
    this.scheduleMitosisWanderTick({ halfTickBehind: true });
    m.dissolveAtTimeoutId = setTimeout(
      () => this.beginMitosisDissolve(),
      randomBetween(MITOSIS_WANDER_MIN_MS, MITOSIS_WANDER_MAX_MS)
    );
  }

  // Phase 3's own tick loop — deliberately parallel to scheduleTick()/
  // tick() for the main amoeba, reusing the very same stepwiseAdvance() and
  // getSpiderTickDelay() (both already take a generic file/state rather
  // than assuming the main amoeba specifically). No broken-link scanning
  // here — Amoeba.2 is a visual echo, not a full second scanner. Uses m's
  // own frozen speedMode/speedMs (snapshotted at duplication time in
  // startMitosis()) rather than live plugin settings — see the class-level
  // comment on MitosisState.
  scheduleMitosisWanderTick({ halfTickBehind = false } = {}) {
    const m = this.mitosis;
    if (!m || m.phase !== 'phase3') return;
    let delay = m.speedMode === 'spider' ? this.getSpiderTickDelay(m) : m.speedMs;
    if (halfTickBehind) delay += delay / 2; // one-time extra offset — see beginMitosisPhase3()
    m.wanderTimeoutId = setTimeout(() => this.mitosisWanderTick(), delay);
  }

  async mitosisWanderTick() {
    const m = this.mitosis;
    if (!m || m.phase !== 'phase3') return;
    const file = this.app.vault.getAbstractFileByPath(this.getMitosisNotePath());
    if (!(file instanceof TFile)) {
      // Shouldn't normally happen (only this plugin deletes Amoeba.2, and
      // only via beginMitosisDissolve()/abortMitosis(), both of which stop
      // this loop first) — but if it's gone, there's nothing left to do.
      this.mitosis = null;
      return;
    }

    // Same graph-visibility gating as the main amoeba's own walk — no point
    // wandering where nothing's open to see it. m.linkCount is also frozen
    // at duplication time, same reasoning as m.speedMode/m.speedMs above.
    if (this.isGraphViewOpen()) {
      await this.stepwiseAdvance(file, m, m.linkCount, true);
    }
    this.scheduleMitosisWanderTick();
  }

  // Dissolving: Amoeba.2 itself is deleted first (so its duplicate
  // pseudopods are immediately orphaned), then each duplicate pseudopod is
  // deleted one by one, staggered — mirroring how they were created.
  async beginMitosisDissolve() {
    const m = this.mitosis;
    if (!m) return;
    m.phase = 'dissolving';
    clearTimeout(m.wanderTimeoutId);
    m.wanderTimeoutId = null;
    // The color group stays in place through the whole dissolve — Amoeba.2
    // and its remaining duplicate pseudopods are still visibly dissolving
    // in the folder, so they should keep reading as the split-off organism
    // until there's genuinely nothing left of it. Removed in
    // runMitosisDissolveStep() instead, at the point the pseudopods
    // subfolder itself actually goes.

    const mainMitosisFile = this.app.vault.getAbstractFileByPath(this.getMitosisNotePath());
    if (mainMitosisFile instanceof TFile) {
      try {
        await this.app.vault.delete(mainMitosisFile);
      } catch (e) {
        // Non-fatal.
      }
    }

    m.phaseTimeoutId = setTimeout(
      () => this.runMitosisDissolveStep(),
      randomBetween(MITOSIS_DISSOLVE_STAGGER_MIN_MS, MITOSIS_DISSOLVE_STAGGER_MAX_MS)
    );
  }

  async runMitosisDissolveStep() {
    const m = this.mitosis;
    if (!m || m.phase !== 'dissolving') return;

    const next = m.dissolvedPseudopods + 1;
    if (next > m.createdPseudopods) {
      // Fully dissolved — the subfolder should already be empty at this
      // point (every duplicate deleted below, one by one), but this clears
      // it unconditionally rather than trusting that, so it's never left
      // behind by a straggler.
      await this.deleteMitosisPseudopodsFolder();
      // Only now, once the folder is actually gone, does the color group
      // come off — see the comment in beginMitosisDissolve().
      await this.removeMitosisGraphColorGroup();
      this.mitosis = null;
      return;
    }

    const file = this.app.vault.getAbstractFileByPath(this.getMitosisPseudopodNotePath(next));
    if (file instanceof TFile) {
      try {
        await this.deletePseudopodNote(file);
      } catch (e) {
        // Non-fatal — worst case this one lingers as an ordinary blank note.
      }
    }
    m.dissolvedPseudopods = next;

    m.phaseTimeoutId = setTimeout(
      () => this.runMitosisDissolveStep(),
      randomBetween(MITOSIS_DISSOLVE_STAGGER_MIN_MS, MITOSIS_DISSOLVE_STAGGER_MAX_MS)
    );
  }

  // Ends an in-progress mitosis early and cleans up after it immediately —
  // called when the main amoeba is stopped (see setRunning()). Unlike the
  // normal dissolve, this doesn't stagger anything: the whole point is the
  // main amoeba has already stopped, so there's no more "wandering" for
  // Amoeba.2 to be seen doing anyway.
  async abortMitosis() {
    const m = this.mitosis;
    if (!m) return;
    this.mitosis = null; // stop referencing it immediately so no in-flight timeout keeps acting on it

    clearTimeout(m.phaseTimeoutId);
    clearTimeout(m.wanderTimeoutId);
    clearTimeout(m.dissolveAtTimeoutId);

    await this.cleanupStaleMitosisArtifacts();
  }
};

class AmoebaSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    // Reference to "Move like a spider"'s toggle (built further down),
    // captured here so every other control that can affect spider mode —
    // Simultaneous links, Pseudopods, Speed, and each of their reset
    // buttons — can sync it directly from inside their own
    // onChange/onClick handlers, instead of a full containerEl.empty()/
    // rebuild (which would also rip out whichever slider the user has
    // mid-drag).
    let spiderToggle;

    // References to "Scan folder" and "Interact with excluded files" (built
    // further down), captured for the same reason as spiderToggle above —
    // the "Scan for broken links" toggle flips their visibility directly via
    // Obsidian's own HTMLElement.toggleVisibility() instead of a full
    // containerEl.empty()/rebuild.
    let scanFolderSetting;
    let includeExcludedSetting;

    // References to the Speed dropdown and the Simultaneous links/Pseudopods
    // sliders (built further down), captured so "Move like a spider" can
    // push its preset values into them directly with setValue() instead of
    // a full containerEl.empty()/rebuild.
    let speedDropdown;
    let linkCountSlider;
    let pseudopodsSlider;

    // Obsidian's own components invoke their registered onChange whenever
    // setValue() actually flips their value — not only when a person
    // interacts with them — so syncing, say, the Speed dropdown from
    // "Move like a spider"'s onChange would re-enter the dropdown's own
    // onChange, which would then reprocess that value as a fresh pick and
    // overwrite whatever speedMode this call was trying to set (this is
    // exactly what caused speedMode to silently revert to 'fixed' right
    // after being set to 'circadian', for one real example). Every setValue()
    // call below that syncs one control's display from a different one's
    // onChange/onClick is wrapped in withSyncGuard(); every onChange that
    // could be re-entered this way bails out immediately while the guard
    // is up, the same "ignore our own write" idea as pendingSelfWrites/
    // pendingMitosisWrites elsewhere in this file, just for UI components
    // instead of vault writes.
    let syncingControls = false;
    const withSyncGuard = (fn) => {
      syncingControls = true;
      try {
        fn();
      } finally {
        syncingControls = false;
      }
    };

    // Reference to the Initialize button's own refresh function (built
    // further down), captured so "Disable Amoeba on this device" can grey
    // it out immediately, the same surgical-sync pattern as every other
    // control on this tab.
    let refreshInitializeButton;

    // The only place in the whole plugin that triggers folder/note creation
    // — see initializeAndStart(). The button's label and click behavior
    // both flip based on whether an amoeba is currently running, so this
    // one control also doubles as the settings-tab equivalent of the Start
    // Amoeba / Stop Amoeba commands.
    new Setting(containerEl)
      .setName('Initialize')
      .setDesc('The amoeba can also be initialized via the command palette.')
      .addButton((button) => {
        const refreshLabel = () => {
          const running = this.plugin.amoebas.has(this.plugin.getAmoebaNotePath());
          button.setButtonText(running ? 'Stop Amoeba' : 'Start Amoeba');
          button.buttonEl.classList.toggle('mod-warning', running);
          // Starting is blocked outright while disabled on this device (see
          // initializeAndStart()) — greyed out here so that's visible
          // rather than just silently no-opping on click. Stopping still
          // works regardless, in the unlikely case something is running
          // anyway (e.g. the device was disabled after Amoeba was already
          // going).
          button.setDisabled(this.plugin.disabledOnThisDevice && !running);
        };
        refreshInitializeButton = refreshLabel;
        refreshLabel();
        button.onClick(async () => {
          if (this.plugin.amoebas.has(this.plugin.getAmoebaNotePath())) {
            await this.plugin.stopAmoeba();
          } else {
            await this.plugin.initializeAndStart();
          }
          refreshLabel();
        });
      });

    // A per-device override, stored outside settings/data.json (see
    // DEVICE_DISABLED_KEY) so it never syncs along with the rest of the
    // vault. Vault-syncing services (iCloud, Obsidian Sync, etc.) otherwise
    // have to keep re-uploading the "Amoeba" note on every tick — as often
    // as every second at the daily circadian peak, faster still in spider
    // mode — and if the vault is open on more than one device at once,
    // both devices' tick loops can write to that same note independently,
    // which is exactly what produces sync conflicts. This lets someone
    // keep Amoeba running on one device while it stays fully inert
    // (no ticking, no writes at all) on every other device sharing the
    // vault.
    new Setting(containerEl)
      .setName('Disable Amoeba on this device')
      .setDesc(
        "Stops all of Amoeba's activity on this device only — other devices sharing this vault are unaffected. Useful if this vault is synced (iCloud, Obsidian Sync, or similar) and you don't want Amoeba's frequent note edits colliding across devices."
      )
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.disabledOnThisDevice).onChange(async (value) => {
          await this.plugin.setDisabledOnThisDevice(value);
          refreshInitializeButton?.();
        })
      );

    // A dropdown: Circadian rhythm listed first, then the seven fixed
    // speeds ascending. No self-updating name or tooltip — the dropdown's
    // own selection already shows the current choice, and this setting's
    // been through a slider and a segmented control before landing here.
    const SPEED_OPTIONS = [
      { key: 'circadian', mode: 'circadian', speedMs: null, label: 'Circadian rhythm' },
      { key: '0.25', mode: 'fixed', speedMs: 250, label: '0.25 seconds' },
      { key: '0.5', mode: 'fixed', speedMs: 500, label: '0.5 seconds' },
      { key: '1', mode: 'fixed', speedMs: 1000, label: '1 second' },
      { key: '2', mode: 'fixed', speedMs: 2000, label: '2 seconds' },
      { key: '3', mode: 'fixed', speedMs: 3000, label: '3 seconds' },
      { key: '4', mode: 'fixed', speedMs: 4000, label: '4 seconds' },
      { key: '5', mode: 'fixed', speedMs: 5000, label: '5 seconds' },
    ];

    // Falls back to the nearest fixed option by absolute difference rather
    // than erroring if speedMs is ever something that doesn't land exactly
    // on one of the seven fixed choices (e.g. hand-edited data.json, or a
    // value left over from "Move like a spider").
    const currentSpeedKey = () => {
      if (this.plugin.settings.speedMode === 'circadian') return 'circadian';
      let best = SPEED_OPTIONS[1];
      let bestDiff = Infinity;
      for (const option of SPEED_OPTIONS) {
        if (option.mode !== 'fixed') continue;
        const diff = Math.abs(option.speedMs - this.plugin.settings.speedMs);
        if (diff < bestDiff) {
          bestDiff = diff;
          best = option;
        }
      }
      return best.key;
    };

    const noteEl = containerEl.createEl('p', {
      cls: 'setting-item-description',
    });
    noteEl.createEl('em', {
      text: 'Note: This plugin frequently agitates the Graph view renderer to simulate organic movement, which may cause a spike in CPU usage as long as Graph view is open.',
    });

    new Setting(containerEl).setName('Customize your amoeba').setHeading();

    new Setting(containerEl)
      .setName('Speed')
      .setDesc(
        'How often the amoeba jumps to a new note. By default, movement follows a circadian ' +
          'rhythm, increasing during the day and slowing at night.'
      )
      .addDropdown((dropdown) => {
        speedDropdown = dropdown;
        for (const option of SPEED_OPTIONS) dropdown.addOption(option.key, option.label);
        dropdown.setValue(currentSpeedKey()).onChange(async (key) => {
          if (syncingControls) return;
          const option = SPEED_OPTIONS.find((o) => o.key === key);
          if (!option) return;
          this.plugin.settings.speedMode = option.mode;
          if (option.mode === 'fixed') this.plugin.settings.speedMs = option.speedMs;
          // Picking anything here always overwrites speedMode away from
          // 'spider' — same surgical sync as Simultaneous links/Pseudopods
          // use, so the toggle doesn't keep showing on after this exits
          // spider mode too.
          withSyncGuard(() => spiderToggle?.setValue(this.plugin.settings.speedMode === 'spider'));
          await this.plugin.saveSettings();
        });
      })
      .addExtraButton((button) =>
        button
          .setIcon('rotate-ccw')
          .setTooltip('Reset to default')
          .onClick(async () => {
            this.plugin.settings.speedMode = DEFAULT_SETTINGS.speedMode;
            this.plugin.settings.speedMs = DEFAULT_SETTINGS.speedMs;
            await this.plugin.saveSettings();
            withSyncGuard(() => {
              speedDropdown?.setValue(currentSpeedKey());
              spiderToggle?.setValue(this.plugin.settings.speedMode === 'spider');
            });
          })
      );

    new Setting(containerEl)
      .setName('Simultaneous links')
      .setDesc('How many notes the amoeba links to at once. Higher is a busier, faster scan.')
      .addSlider((slider) => {
        linkCountSlider = slider;
        slider
          .setLimits(1, 10, 1)
          .setValue(this.plugin.settings.linkCount)
          .setDynamicTooltip()
          .onChange(async (value) => {
            if (syncingControls) return;
            this.plugin.settings.linkCount = value;
            this.plugin.exitSpiderModeIfMismatched();
            withSyncGuard(() => spiderToggle?.setValue(this.plugin.settings.speedMode === 'spider'));
            await this.plugin.saveSettings();
          });
      })
      .addExtraButton((button) =>
        button
          .setIcon('rotate-ccw')
          .setTooltip('Reset to default')
          .onClick(async () => {
            this.plugin.settings.linkCount = DEFAULT_SETTINGS.linkCount;
            this.plugin.exitSpiderModeIfMismatched();
            await this.plugin.saveSettings();
            withSyncGuard(() => {
              linkCountSlider?.setValue(this.plugin.settings.linkCount);
              spiderToggle?.setValue(this.plugin.settings.speedMode === 'spider');
            });
          })
      );

    new Setting(containerEl)
      .setName('Pseudopods')
      .setDesc(
        "The number of trailing sub-notes linked to the main 'Amoeba' note, which are dragged along like a real amoeba's pseudopods. 'Amoeba.pseudopod' notes cannot hold text content."
      )
      .addSlider((slider) => {
        pseudopodsSlider = slider;
        slider
          .setLimits(0, 10, 1)
          .setValue(this.plugin.settings.pseudopods)
          .setDynamicTooltip()
          .onChange(async (value) => {
            if (syncingControls) return;
            this.plugin.settings.pseudopods = value;
            this.plugin.exitSpiderModeIfMismatched();
            withSyncGuard(() => spiderToggle?.setValue(this.plugin.settings.speedMode === 'spider'));
            await this.plugin.saveSettings();
            // Don't create pseudopod notes before Initialize has run —
            // the setting is saved either way and takes effect once it has.
            if (this.plugin.isInitialized()) await this.plugin.syncPseudopods();
          });
      })
      .addExtraButton((button) =>
        button
          .setIcon('rotate-ccw')
          .setTooltip('Reset to default')
          .onClick(async () => {
            this.plugin.settings.pseudopods = DEFAULT_SETTINGS.pseudopods;
            this.plugin.exitSpiderModeIfMismatched();
            await this.plugin.saveSettings();
            if (this.plugin.isInitialized()) await this.plugin.syncPseudopods();
            withSyncGuard(() => {
              pseudopodsSlider?.setValue(this.plugin.settings.pseudopods);
              spiderToggle?.setValue(this.plugin.settings.speedMode === 'spider');
            });
          })
      );

    // An on/off toggle rather than a one-shot "Apply" — off by default (no
    // separate setting needed for that: speedMode only ever becomes
    // 'spider' from switching this on, and DEFAULT_SETTINGS.speedMode is
    // 'circadian', never 'spider'). Switching it off doesn't touch
    // Simultaneous links/Pseudopods — it only steps speedMode back to
    // 'fixed', the same way exitSpiderModeIfMismatched() above does when
    // those settings drift out from under it on their own.
    new Setting(containerEl)
      .setName('Move like a spider')
      .setDesc('Sets Speed to 0.25s, Simultaneous links to 8, and Pseudopods to 8 — fast, busy, many-legged movement.')
      .addToggle((toggle) => {
        spiderToggle = toggle;
        toggle.setValue(this.plugin.settings.speedMode === 'spider').onChange(async (value) => {
          if (syncingControls) return;
          if (value) {
            // speedMode 'spider' (not 'fixed') is what actually produces
            // the bursts-then-pauses timing — see getSpiderTickDelay().
            // speedMs is still set alongside it so the Speed
            // picker has something sensible to fall back to display if the
            // mode ever reverts to 'fixed'.
            this.plugin.settings.speedMode = 'spider';
            this.plugin.settings.speedMs = SPIDER_TICK_MS;
            this.plugin.settings.linkCount = SPIDER_LINK_COUNT;
            this.plugin.settings.pseudopods = SPIDER_PSEUDOPOD_COUNT;
          } else {
            this.plugin.settings.speedMode = 'fixed';
          }
          await this.plugin.saveSettings();
          if (this.plugin.isInitialized()) await this.plugin.syncPseudopods();
          // Pushes the preset (or, on switching off, the unchanged current
          // values) into the Speed/Simultaneous links/Pseudopods controls
          // directly — the same surgical-sync pattern those controls already
          // use to update this toggle — instead of a full
          // containerEl.empty()/rebuild that would reset scroll position.
          withSyncGuard(() => {
            speedDropdown?.setValue(currentSpeedKey());
            linkCountSlider?.setValue(this.plugin.settings.linkCount);
            pseudopodsSlider?.setValue(this.plugin.settings.pseudopods);
          });
        });
      });

    // Sentence case, per Obsidian's settings-heading convention. This is
    // the Settings tab's own heading text, distinct from HEADING_POEM
    // ("Today's Vault Poem"), the plugin's own generated heading inside the
    // Amoeba note itself, which is styled separately and not subject to
    // this convention.
    new Setting(containerEl).setName('Note interactions').setHeading();

    // A general "keep interacting in the background" toggle — always shown,
    // always in effect (not gated on broken-link scanning): see tick()'s
    // keepWalking calculation and DEFAULT_SETTINGS' comment on
    // continueScanningWhileGraphClosed for what it actually gates.
    new Setting(containerEl)
      .setName('Continue interactions while global graph view is closed')
      .setDesc(
        "The amoeba continues running note interactions in the background, even when it isn't visible."
      )
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.continueScanningWhileGraphClosed)
          .onChange(async (value) => {
            this.plugin.settings.continueScanningWhileGraphClosed = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Write a daily vault poem')
      .setDesc(
        'The amoeba constructs a daily poem using words pulled from other notes in the vault (non-LLM computation).'
      )
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.poemEnabled).onChange(async (value) => {
          await this.plugin.setPoemEnabled(value);
        })
      );

    // Plain on/off toggle — cleanupHelper is still the 'on'/'visualOnly'
    // string setCleanupHelper() takes underneath.
    new Setting(containerEl)
      .setName('Scan for broken links')
      .setDesc(
        "Logs broken links the amoeba encounters and creates a checklist inside the 'Amoeba' note, which you can check off as you fix them. Off by default, leaving just the visual movement in Graph view."
      )
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.cleanupHelper === 'on')
          .onChange(async (value) => {
            // Also keeps the note's own "Scan for broken links" checkbox in
            // sync — see setCleanupHelper().
            await this.plugin.setCleanupHelper(value ? 'on' : 'visualOnly');
            // Scan folder / Interact with excluded files only make sense
            // once scanning is on. Toggling their visibility directly
            // (Obsidian's own HTMLElement.toggleVisibility(), the same
            // show/hide convention Obsidian's own UI uses — not a
            // containerEl.empty()/rebuild) leaves the rest of the tab, and
            // the user's scroll position, untouched. ("Continue
            // interactions while global graph view is closed" used to be a
            // third setting gated here too — it's a general toggle now,
            // shown unconditionally further up, so it's unaffected.)
            scanFolderSetting.settingEl.toggleVisibility(value);
            includeExcludedSetting.settingEl.toggleVisibility(value);
          })
      );

    // The two settings below only apply once broken-link scanning is on, so
    // they start hidden rather than shown disabled — toggleVisibility() is
    // applied once here too, since cleanupHelper may already be 'on' when
    // the tab first opens. "Continue interactions while global graph view is
    // closed" used to live here too, but it's a general toggle (not
    // scanning-specific — see its own setting above, directly under the
    // "Note interactions" heading), so it moved out and stays visible
    // regardless of this setting.
    scanFolderSetting = new Setting(containerEl)
      .setName('Scan folder')
      .setDesc(
        'Restrict which notes the amoeba will interact with to just this folder and its subfolders. Leave blank to use the whole vault.'
      )
      .addText((text) => {
        text
          .setPlaceholder('Example: Folder/Subfolder')
          .setValue(this.plugin.settings.scanFolderPath)
          .onChange(async (value) => {
            // normalizePath('') returns '/' rather than '', which
            // isWithinScanFolder() would treat as a real (unmatchable)
            // folder instead of "whole vault" — so an emptied field has
            // to bypass normalizePath() entirely rather than pass '' to it.
            const trimmed = value.trim();
            this.plugin.settings.scanFolderPath = trimmed ? normalizePath(trimmed) : '';
            await this.plugin.saveSettings();
          });
        new FolderSuggest(this.app, text.inputEl, async (path) => {
          this.plugin.settings.scanFolderPath = normalizePath(path);
          await this.plugin.saveSettings();
        });
      });
    scanFolderSetting.settingEl.toggleVisibility(this.plugin.settings.cleanupHelper === 'on');

    includeExcludedSetting = new Setting(containerEl)
      .setName('Interact with excluded files')
      .setDesc(
        "Turn on to allow notes in your Excluded files to be scanned. Off by default."
      )
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.includeExcludedFiles).onChange(async (value) => {
          this.plugin.settings.includeExcludedFiles = value;
          await this.plugin.saveSettings();
        })
      );
    includeExcludedSetting.settingEl.toggleVisibility(this.plugin.settings.cleanupHelper === 'on');
  }
}

// Folder autocomplete for the Scan folder text field, built on Obsidian's
// AbstractInputSuggest — the same public API core uses for the Attachment
// folder path setting, so it gets a matching dropdown UX for free.
class FolderSuggest extends AbstractInputSuggest {
  constructor(app, inputEl, onSelect) {
    super(app, inputEl);
    this.inputEl = inputEl;
    this.onSelect = onSelect;
  }

  getSuggestions(query) {
    const q = query.toLowerCase();
    const folders = this.app.vault
      .getAllLoadedFiles()
      .filter((f) => f instanceof TFolder && f.path.toLowerCase().includes(q));
    // Root folder's path is '' internally, which reads as a blank/confusing
    // suggestion row — it also just means "whole vault", already covered by
    // clearing the field, so it's left out rather than shown as a choice.
    return folders.filter((f) => f.path !== '/' && f.path !== '');
  }

  renderSuggestion(folder, el) {
    el.setText(folder.path);
  }

  selectSuggestion(folder) {
    this.inputEl.value = folder.path;
    this.onSelect(folder.path);
    this.close();
  }
}

// Converts a "#RRGGBB" hex string to the packed 24-bit integer the graph
// internal plugin's settings expect for a color group's "rgb" field.
function hexToPackedRgb(hex) {
  return parseInt(hex.replace('#', ''), 16);
}

// The inverse of hexToPackedRgb() above — needed to read back whatever
// color a user currently has the main Amoeba group set to (stored in that
// same packed form), so darkerShade() below has a real hex string to work
// from. padStart guards against a color with a leading zero byte (e.g.
// pure blue, 0x0000ff) printing as fewer than 6 hex digits.
function packedRgbToHex(rgb) {
  return `#${(rgb & 0xffffff).toString(16).padStart(6, '0')}`;
}

// Standard hex -> HSL conversion (hue in degrees 0-360, saturation/
// lightness as 0-100). Grayscale input (max === min channel) has no
// meaningful hue — returned as 0, but s is also 0 for those inputs, so
// hslToHex() below ignores h entirely in that case anyway.
function hexToHsl(hex) {
  const packed = hexToPackedRgb(hex);
  const r = ((packed >> 16) & 0xff) / 255;
  const g = ((packed >> 8) & 0xff) / 255;
  const b = (packed & 0xff) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: l * 100 };

  const delta = max - min;
  const s = delta / (1 - Math.abs(2 * l - 1));
  let h;
  if (max === r) h = ((g - b) / delta) % 6;
  else if (max === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h *= 60;
  if (h < 0) h += 360;
  return { h, s: s * 100, l: l * 100 };
}

// The inverse of hexToHsl() above.
function hslToHex(h, s, l) {
  const sFrac = s / 100;
  const lFrac = l / 100;
  const c = (1 - Math.abs(2 * lFrac - 1)) * sFrac;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lFrac - c / 2;
  let r1, g1, b1;
  if (h < 60) [r1, g1, b1] = [c, x, 0];
  else if (h < 120) [r1, g1, b1] = [x, c, 0];
  else if (h < 180) [r1, g1, b1] = [0, c, x];
  else if (h < 240) [r1, g1, b1] = [0, x, c];
  else if (h < 300) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];

  const toHexByte = (v) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${toHexByte(r1)}${toHexByte(g1)}${toHexByte(b1)}`;
}

// Derives Amoeba.2's color from whatever the main Amoeba group's color
// currently is — see ensureMitosisGraphColorGroup(), the only caller.
// Same hue, saturation x1.4 (clamped at 100 — it can't go higher),
// lightness x0.85 — reverse-engineered from this plugin's own original
// fixed color pair (main #B7D2C5: H~151°, S~23%, L~77% / Amoeba.2
// #88C3A8: H~153°, S~33%, L~65%), which turn out to share almost exactly
// the same hue and differ by almost exactly these two multipliers. Applying
// that same relationship to any other main color reproduces the same "one
// shade darker, slightly richer" look of the original pair, rather than
// jumping to an unrelated hue or color family.
function darkerShade(hex) {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex(h, Math.min(100, s * 1.4), Math.max(0, l * 0.85));
}

// Circadian rhythm anchor points: [hour-of-day (24h, fractional), alertness
// 0..1]. Sorted ascending and read cyclically by circadianAlertness() below,
// so the segment from the last entry back to the first wraps across
// midnight. Hours are the midpoints of the ranges in a typical "average"
// human circadian rhythm:
//   Core body temperature minimum ~4:00–6:00  -> lowest alertness
//   Wake ~7:00–8:00 / Cortisol peak ~6:00–9:00 -> alertness starts climbing
//     (their ranges overlap, so they're combined into one rising anchor)
//   Strongest alertness ~10:00–12:00           -> daily peak
//   Afternoon dip ~13:00–15:00                 -> partial pullback
//   Melatonin begins rising ~21:00–22:00       -> decline resumes
//   Sleepiness becomes strong ~22:00–00:00     -> nearly at the low again
// "Sleep ~23:00–7:00" isn't its own anchor — it's the low stretch these
// anchors already produce between "sleepiness becomes strong" and "core body
// temperature minimum".
const CIRCADIAN_ANCHORS = [
  [5.0, 0.0], // core body temperature minimum
  [7.5, 0.35], // wake / cortisol peak
  [11.0, 1.0], // strongest alertness
  [14.0, 0.5], // afternoon dip
  [21.5, 0.3], // melatonin begins rising
  [23.0, 0.12], // sleepiness becomes strong
];

// Cosine ease between two anchors (t in 0..1) instead of a straight line, so
// the interval drifts smoothly through the day with no visible kink at each
// anchor — it reads as a rhythm, not a route between waypoints.
function easeBetween(t) {
  return (1 - Math.cos(t * Math.PI)) / 2;
}

// Interpolates CIRCADIAN_ANCHORS for the given moment, wrapping across
// midnight, and returns 0 (least alert) .. 1 (most alert).
function circadianAlertness(date) {
  const hour = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
  const anchors = CIRCADIAN_ANCHORS;
  const n = anchors.length;

  // Find the pair of anchors hour falls between. Defaults to the wrapped
  // final segment (last anchor of today -> first anchor of tomorrow), which
  // is also where hour lands whenever it's earlier than the first anchor
  // (e.g. 2am, before the 5am core-temperature-minimum anchor).
  let i = n - 1;
  for (let k = 0; k < n - 1; k++) {
    if (hour >= anchors[k][0] && hour < anchors[k + 1][0]) {
      i = k;
      break;
    }
  }

  const [h0, a0] = anchors[i];
  const [h1, a1] = anchors[(i + 1) % n];
  const span = i === n - 1 ? h1 + 24 - h0 : h1 - h0;
  const elapsed = hour >= h0 ? hour - h0 : hour + 24 - h0;
  return a0 + (a1 - a0) * easeBetween(elapsed / span);
}

// Ambient movement speed for Circadian rhythm mode. Pure Date() math, no
// settings involved — oscillates between CIRCADIAN_SLOWEST_MS at the daily
// low and CIRCADIAN_FASTEST_MS at the daily peak, following
// circadianAlertness() above. Takes an optional date so it stays testable.
function getCircadianSpeedMs(date = new Date()) {
  const alertness = circadianAlertness(date);
  return Math.round(
    CIRCADIAN_SLOWEST_MS - alertness * (CIRCADIAN_SLOWEST_MS - CIRCADIAN_FASTEST_MS)
  );
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Inclusive-ish random float in [min, max) — used for "Move like a
// spider"'s burst/pause lengths (see getSpiderTickDelay()).
function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

// "Move like a spider"'s pause length: almost always a brief
// SPIDER_PAUSE_MIN_MS-SPIDER_PAUSE_MAX_MS beat between dashes, but with a
// SPIDER_RARE_PAUSE_CHANCE odds of a longer freeze instead
// (SPIDER_RARE_FREEZE_MIN_MS-SPIDER_RARE_FREEZE_MAX_MS).
function randomSpiderPauseMs() {
  if (Math.random() < SPIDER_RARE_PAUSE_CHANCE) {
    return randomBetween(SPIDER_RARE_FREEZE_MIN_MS, SPIDER_RARE_FREEZE_MAX_MS);
  }
  return randomBetween(SPIDER_PAUSE_MIN_MS, SPIDER_PAUSE_MAX_MS);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Pulls out whatever's currently between a block's start/end markers, so
// ensureNoteStructure() can rebuild the note around its fixed headings
// without losing live data (the rotating links, the log entries).
// Returns '' if the block isn't present yet (e.g. a brand-new note), which
// yields an empty-but-present block in the rebuilt skeleton. Trimmed —
// see POEM_MARKER_BLANK_LINE_SPACING for why the surrounding blank lines
// this now deliberately writes around every marker must NOT be treated as
// part of a block's actual inner content: without trimming here, a
// blank line inserted by the template on one rebuild would get captured
// back as "inner" content on the next extract, and the template would add
// its own blank line on top of that again — an extra blank line piling up
// a little further every single rebuild. Trimming decouples "what's
// logically inside the block" from "how much incidental whitespace
// happens to surround it," so any number of extract/rebuild cycles stays
// stable.
function extractBlockInner(content, startMarker, endMarker) {
  const regex = new RegExp(
    `${escapeRegex(startMarker)}\\n?([\\s\\S]*?)\\n?${escapeRegex(endMarker)}`
  );
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

// Assembles a managed section (heading, block markers, and anything after
// the block, e.g. Pseudopods' description line) with a single blank line
// between every part, and never a doubled-up blank line when a part is
// empty (an empty inner block, most commonly). See the comment on
// ensureNoteStructure()'s `sections` array for why every part boundary
// here needs that blank line: it's the confirmed fix for a real Obsidian
// Reading View rendering bug around standalone %%comment%% lines, not
// stylistic preference. `.filter(Boolean)` drops empty parts (e.g. a
// fresh, still-empty block's inner content) so joining with '\n\n' never
// produces two blank lines in a row where content is simply absent.
function buildManagedBlock(...parts) {
  return parts.filter((p) => p !== undefined && p !== null && p !== '').join('\n\n');
}

// Renders the Broken Link Encounters log block body from a list of entry
// lines, falling back to EMPTY_ENCOUNTERS_TEXT when there are none — the
// single place that decides what an empty log looks like, so
// ensureNoteStructure() and syncBrokenLinksLogBatch() can't drift out of sync
// on that formatting.
function renderLogBlock(lines) {
  const body = lines.length > 0 ? lines.join('\n') : EMPTY_ENCOUNTERS_TEXT;
  return buildManagedBlock(LOG_BLOCK_START, body, LOG_BLOCK_END);
}

// Strips every known heading and full block (markers included) out of the
// note, leaving only content the user typed themselves outside those
// managed sections. That leftover is preserved verbatim, placed above the
// three canonical sections when the note gets rebuilt.
function stripKnownSections(content) {
  let result = content;
  const blockPairs = [
    [POEM_BLOCK_START, POEM_BLOCK_END],
    [LINK_BLOCK_START, LINK_BLOCK_END],
    [LOG_BLOCK_START, LOG_BLOCK_END],
    [PSEUDOPODS_BLOCK_START, PSEUDOPODS_BLOCK_END],
  ];
  for (const [start, end] of blockPairs) {
    const regex = new RegExp(`${escapeRegex(start)}[\\s\\S]*?${escapeRegex(end)}`, 'g');
    result = result.replace(regex, '');
  }
  for (const heading of [HEADING_POEM, HEADING_ACTIVE, HEADING_CLEANUP, HEADING_PSEUDOPODS]) {
    result = result.split(heading).join('');
  }
  // The Pseudopods section's fixed explanatory line is regenerated fresh
  // above rather than treated as user content.
  result = result.split(PSEUDOPODS_DESCRIPTION).join('');
  // Same for a "---" section separator — also regenerated fresh above, so
  // a bare one here is never anything the user meant to keep.
  result = result.replace(/^[ \t]*---[ \t]*$/gm, '');
  return result.replace(/\n{3,}/g, '\n\n').trim();
}

})(__patchedRequire__);
