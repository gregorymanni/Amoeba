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
        if (this.setupBlocked) return false;
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
            // a setup conflict is blocking things, and only for the actual
            // Amoeba note. A plain `return` here would also skip the Scan
            // for broken links check further down, so this just skips its
            // own branch instead.
            if (!this.setupBlocked && file.path === this.getAmoebaNotePath()) {
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
    // as "not stopped").
    const fm = this.app.metadataCache.getFileCache(mainFile)?.frontmatter;
    const explicitlyStopped = fm && fm[FIELD_ENABLED] === false;
    if (!explicitlyStopped) {
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
      new Notice('Amoeba started');
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
      new Notice('Amoeba stopped');
    }
  }

  async startOn(file, opts = {}) {
    await this.setRunning(file, true, opts);
  }

  async stop(file, opts = {}) {
    await this.setRunning(file, false, opts);
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
    new Notice("Amoeba: today's Vault Poem cleared — a new one has started.");
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
    // captured here so Simultaneous links and Pseudopods — built earlier —
    // can flip it off from inside their own onChange handlers without a
    // full containerEl.empty()/rebuild, which would rip out whichever
    // slider the user has mid-drag. Their reset buttons don't need this —
    // they already call this.display() themselves, which rebuilds the
    // toggle correctly along with everything else.
    let spiderToggle;

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
        };
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

    new Setting(containerEl)
      .setName('Speed')
      .setDesc(
        'How often the amoeba jumps to a new note. By default, movement follows a circadian ' +
          'rhythm, increasing during the day and slowing at night.'
      )
      .addDropdown((dropdown) => {
        for (const option of SPEED_OPTIONS) dropdown.addOption(option.key, option.label);
        dropdown.setValue(currentSpeedKey()).onChange(async (key) => {
          const option = SPEED_OPTIONS.find((o) => o.key === key);
          if (!option) return;
          this.plugin.settings.speedMode = option.mode;
          if (option.mode === 'fixed') this.plugin.settings.speedMs = option.speedMs;
          // Picking anything here always overwrites speedMode away from
          // 'spider' — same surgical sync as Simultaneous links/Pseudopods
          // use, so the toggle doesn't keep showing on after this exits
          // spider mode too.
          spiderToggle?.setValue(this.plugin.settings.speedMode === 'spider');
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
            this.display();
          })
      );

    new Setting(containerEl)
      .setName('Simultaneous links')
      .setDesc('How many notes the amoeba links to at once. Higher is a busier, faster scan.')
      .addSlider((slider) =>
        slider
          .setLimits(1, 10, 1)
          .setValue(this.plugin.settings.linkCount)
          .setDynamicTooltip()
          .onChange(async (value) => {
            this.plugin.settings.linkCount = value;
            this.plugin.exitSpiderModeIfMismatched();
            spiderToggle?.setValue(this.plugin.settings.speedMode === 'spider');
            await this.plugin.saveSettings();
          })
      )
      .addExtraButton((button) =>
        button
          .setIcon('rotate-ccw')
          .setTooltip('Reset to default')
          .onClick(async () => {
            this.plugin.settings.linkCount = DEFAULT_SETTINGS.linkCount;
            this.plugin.exitSpiderModeIfMismatched();
            await this.plugin.saveSettings();
            this.display();
          })
      );

    new Setting(containerEl)
      .setName('Pseudopods')
      .setDesc(
        "The number of trailing sub-notes linked to the main 'Amoeba' note, which are dragged along like a real amoeba's pseudopods. 'Amoeba.pseudopod' notes cannot hold text content."
      )
      .addSlider((slider) =>
        slider
          .setLimits(0, 10, 1)
          .setValue(this.plugin.settings.pseudopods)
          .setDynamicTooltip()
          .onChange(async (value) => {
            this.plugin.settings.pseudopods = value;
            this.plugin.exitSpiderModeIfMismatched();
            spiderToggle?.setValue(this.plugin.settings.speedMode === 'spider');
            await this.plugin.saveSettings();
            // Don't create pseudopod notes before Initialize has run —
            // the setting is saved either way and takes effect once it has.
            if (this.plugin.isInitialized()) await this.plugin.syncPseudopods();
          })
      )
      .addExtraButton((button) =>
        button
          .setIcon('rotate-ccw')
          .setTooltip('Reset to default')
          .onClick(async () => {
            this.plugin.settings.pseudopods = DEFAULT_SETTINGS.pseudopods;
            this.plugin.exitSpiderModeIfMismatched();
            await this.plugin.saveSettings();
            if (this.plugin.isInitialized()) await this.plugin.syncPseudopods();
            this.display();
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
          this.display();
        });
      });

    // A general "keep interacting in the background" toggle — always shown,
    // always in effect (not gated on broken-link scanning): see tick()'s
    // keepWalking calculation and DEFAULT_SETTINGS' comment on
    // continueScanningWhileGraphClosed for what it actually gates.
    new Setting(containerEl)
      .setName('Continue interactions while global graph view is closed')
      .setDesc(
        "The amoeba continues running vault interactions in the background, even when it isn't visible."
      )
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.continueScanningWhileGraphClosed)
          .onChange(async (value) => {
            this.plugin.settings.continueScanningWhileGraphClosed = value;
            await this.plugin.saveSettings();
          })
      );

    const noteEl = containerEl.createEl('p', {
      cls: 'setting-item-description',
    });
    noteEl.createEl('em', {
      text: 'Note: This plugin frequently agitates the graph view renderer to simulate organic movement, which may cause a spike in CPU usage as long as graph view is open.',
    });

    // Sentence case, per Obsidian's settings-heading convention. This is
    // the Settings tab's own heading text, distinct from HEADING_POEM
    // ("Today's Vault Poem"), the plugin's own generated heading inside the
    // Amoeba note itself, which is styled separately and not subject to
    // this convention.
    new Setting(containerEl).setName('Note interactions').setHeading();

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
            // once scanning is on — redraw to show/hide them, same
            // behavior as before this was a dropdown. ("Continue
            // interactions while global graph view is closed" used to be a
            // third setting gated here too — it's a general toggle now,
            // shown unconditionally further up, so it's unaffected.)
            this.display();
          })
      );

    // The two settings below only apply once broken-link scanning is on,
    // so they're hidden entirely while it's off rather than shown disabled.
    // "Continue interactions while global graph view is closed" used to
    // live here too, but it's a general toggle (not scanning-specific —
    // see its own setting above, near "Move like a spider"), so it moved
    // out and stays visible regardless of this setting.
    if (this.plugin.settings.cleanupHelper === 'on') {
      new Setting(containerEl)
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

      new Setting(containerEl)
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
    }
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
