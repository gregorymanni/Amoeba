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
} = require('obsidian');

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
// Markers delimiting the note's three managed content blocks.
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

// Heading order enforced by ensureNoteStructure(): Broken Link Encounters,
// Note Stream, Pseudopods.
const HEADING_ACTIVE = '#### Note Stream';
const HEADING_CLEANUP = '#### Broken Link Encounters';
const HEADING_PSEUDOPODS = '#### Pseudopods';

// Placeholder shown in the Broken Link Encounters log when scanning is on
// and nothing's been found. Excluded when parsing existing lines in
// syncBrokenLinksLogBatch() so it's never mistaken for a real entry.
const EMPTY_ENCOUNTERS_TEXT = '*No broken links found.*';
// Status line appended after Scan for broken links is set to Off: Visual
// Only — scanning/logging is paused, but any already-logged entries are
// kept and this is shown below them (or alone if the log is empty). Also
// excluded when parsing existing lines.
const CLEANUP_OFF_TEXT = '*This function is currently turned off.*';

// Static explanatory line under the Pseudopods heading, above the managed
// link block. Regenerated fresh by ensureNoteStructure() every load (see
// stripKnownSections()), so editing it here updates it everywhere.
const PSEUDOPODS_DESCRIPTION =
  '*Add your own trailing "pseudopods" by linking orphan notes to the [[Amoeba]]. ' +
  "They won't be deleted by changing the number of pseudopods in settings, or by removing the plugin.*";

// Separates the note's three sections. Regenerated fresh on every rebuild
// (see stripKnownSections()), same as PSEUDOPODS_DESCRIPTION.
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
// File Explorer icon for the Amoeba folder (see decorateFolderIcon()), and
// the class marking the injected icon element so it's never duplicated.
const AMOEBA_FOLDER_ICON = 'air-vent';
const FOLDER_ICON_CLASS = 'amoeba-folder-icon';
const MIN_PSEUDOPODS = 0;
const MAX_PSEUDOPODS = 10;
// Bounds for the Movement interval and Simultaneous links settings, shared
// across every running amoeba (see getSpeedMs()/getLinkCount()).
const MIN_SPEED_MS = 250; // 0.25s — matches the Speed slider's floor
const MAX_SPEED_MS = 5000; // 5s — matches the Speed slider's ceiling
const MIN_LINK_COUNT = 1;
const MAX_LINK_COUNT = 10;

// Plugin-wide settings (not per-note) — live in data.json, not frontmatter.
const DEFAULT_SETTINGS = {
  // Notes in Obsidian's Excluded files list are skipped entirely unless on.
  // Only takes effect once cleanupHelper is 'on' — see isPickable().
  includeExcludedFiles: false,
  speedMs: 1000, // 1 second
  linkCount: 3,
  // 'on' scans each visited note for broken links and maintains the log.
  // 'visualOnly' (the default) disables scanning/logging, keeping just the
  // movement.
  cleanupHelper: 'visualOnly',
  // On by default, but only takes effect once cleanupHelper is 'on' — with
  // scanning off there's nothing to continue scanning for, so this is inert
  // (and hidden in the settings tab) until then. When it does apply, the
  // amoeba keeps walking (updating the Note Stream) and scanning/logging in
  // the background with Graph view closed. See tick()'s keepWalking/
  // logBroken calculation.
  continueScanningWhileGraphClosed: true,
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
  }
}

module.exports = class AmoebaPlugin extends Plugin {
  async onload() {
    this.amoebas = new Map(); // file path -> AmoebaState

    const rawData = (await this.loadData()) || {};
    // Migrates the legacy 'arms' settings key to 'pseudopods'.
    if (rawData.arms !== undefined && rawData.pseudopods === undefined) {
      rawData.pseudopods = rawData.arms;
    }
    delete rawData.arms;
    this.settings = Object.assign({}, DEFAULT_SETTINGS, rawData);

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
    // reliable way to notice a manual edit to the "Run Amoeba" checkbox
    // rather than re-checking the cache on every tick. Ticking the box
    // on/off runs the same startOn()/stop() the commands use (skipping the
    // frontmatter write, since the box is already correct) — the checkbox
    // and the two commands are two doors into the same start/stop logic.
    this.registerEvent(
      this.app.metadataCache.on('changed', async (file) => {
        if (this.pendingSelfWrites.delete(file.path)) return; // our own write, not a manual edit
        const fm = this.app.metadataCache.getFileCache(file)?.frontmatter;
        if (!fm || !(FIELD_ENABLED in fm)) return;

        const wantsRunning = fm[FIELD_ENABLED] !== false;
        const isRunning = this.amoebas.has(file.path);
        if (wantsRunning && !isRunning) {
          if (this.setupBlocked || file.path !== this.getAmoebaNotePath()) return;
          await this.startOn(file, { skipFrontmatterWrite: true });
        } else if (!wantsRunning && isRunning) {
          await this.stop(file, { skipFrontmatterWrite: true });
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
        if (!(file instanceof TFile) || !this.isPseudopodNotePath(file.path)) return;
        const content = await this.app.vault.cachedRead(file);
        if (content !== '') {
          await this.app.vault.process(file, () => '');
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

      const block = `${LOG_BLOCK_START}\n${bodyLines.join('\n')}\n${LOG_BLOCK_END}`;
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

    await this.ensureNoteStructure();
    await this.syncPseudopods();

    // Respect a manual Stop — only auto-resume if it wasn't explicitly
    // turned off (a brand new note has no frontmatter yet, which counts
    // as "not stopped").
    const fm = this.app.metadataCache.getFileCache(mainFile)?.frontmatter;
    const explicitlyStopped = fm && fm[FIELD_ENABLED] === false;
    if (!explicitlyStopped) {
      await this.startOn(mainFile);
    }

    this.decorateFolderIcon();
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
    if (!(this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath()) instanceof TFile)) {
      await this.app.vault.create(this.getAmoebaNotePath(), '');
    }
    await this.ensureNoteStructure();
    await this.syncPseudopods();
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
        query: `path:"${this.getAmoebaFolder()}"`,
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
  // (path:"<old folder>") — a group the user has since hand-edited to
  // something else is left alone. Best-effort and non-fatal, same as
  // ensureGraphColorGroup(): this is cosmetic, never worth surfacing an
  // error to the user over.
  async updateGraphColorGroupFolder(oldFolderPath, newFolderPath) {
    const graph = this.app.internalPlugins?.plugins?.graph;
    if (!graph) return;

    const oldQuery = `path:"${oldFolderPath}"`;
    const newQuery = `path:"${newFolderPath}"`;

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

  // Guarantees the three headings and their blocks always appear in the
  // same fixed order — Broken Link Encounters, Note Stream, Pseudopods —
  // separated by a "---" rule. No-ops if that's already the case (cheap
  // check, safe every load). Otherwise it rebuilds the note losslessly:
  // each block's existing inner content is preserved, and anything else in
  // the note that isn't part of a managed heading/block is kept too,
  // placed above the three sections rather than discarded.
  async ensureNoteStructure() {
    const mainFile = this.app.vault.getAbstractFileByPath(this.getAmoebaNotePath());
    if (!(mainFile instanceof TFile)) return;

    const current = await this.app.vault.cachedRead(mainFile);

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
    const alreadyInOrder =
      idxActive !== -1 &&
      idxCleanup !== -1 &&
      idxPseudopods !== -1 &&
      idxCleanup < idxActive &&
      idxActive < idxPseudopods &&
      hasSeparatorBetween(LOG_BLOCK_END, HEADING_ACTIVE) &&
      hasSeparatorBetween(LINK_BLOCK_END, HEADING_PSEUDOPODS) &&
      descriptionAfterBlock;
    if (alreadyInOrder) return;

    const linkInner = extractBlockInner(current, LINK_BLOCK_START, LINK_BLOCK_END);
    const logInner = extractBlockInner(current, LOG_BLOCK_START, LOG_BLOCK_END);
    const pseudopodsInner = extractBlockInner(current, PSEUDOPODS_BLOCK_START, PSEUDOPODS_BLOCK_END);
    const leftover = stripKnownSections(current);

    // Falls back to the current state's placeholder when the log is empty.
    const logBody = logInner.trim().length > 0 ? logInner : this.currentEmptyLogText();

    // No blank line between a heading and its block — the block sits
    // directly under the header. Pseudopods' description line comes after
    // its block instead, with a blank line separating them. Sections
    // themselves are separated by a "---" rule, not just a blank line, so
    // the three read as clearly distinct parts of the note.
    const sections = [
      `${HEADING_CLEANUP}\n${LOG_BLOCK_START}\n${logBody}\n${LOG_BLOCK_END}`,
      `${HEADING_ACTIVE}\n${LINK_BLOCK_START}\n${linkInner}\n${LINK_BLOCK_END}`,
      `${HEADING_PSEUDOPODS}\n${PSEUDOPODS_BLOCK_START}\n${pseudopodsInner}\n${PSEUDOPODS_BLOCK_END}\n\n${PSEUDOPODS_DESCRIPTION}`,
    ];
    const rebuilt =
      (leftover ? `${leftover}\n\n` : '') + sections.join(`\n\n${SECTION_SEPARATOR}\n\n`) + '\n';

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

  looksPluginOwned(content) {
    if (!content || content.trim().length === 0) return true;
    return (
      content.includes(LINK_BLOCK_START) ||
      content.includes(PSEUDOPODS_BLOCK_START) ||
      content.includes(LEGACY_ARMS_BLOCK_START) ||
      content.includes(LOG_BLOCK_START)
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
    const links = pseudopodFiles.map((f) => `[[${this.wikilinkTarget(f)}]]`);
    const block =
      links.length > 0
        ? `${PSEUDOPODS_BLOCK_START}\n${links.join('\n')}\n${PSEUDOPODS_BLOCK_END}`
        : `${PSEUDOPODS_BLOCK_START}\n${PSEUDOPODS_BLOCK_END}`;

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
    if (file instanceof TFile) await this.startOn(file);
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

    state.timeoutId = setTimeout(() => this.tick(state), this.getSpeedMs());
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
    // "Continue scanning while global Graph view is closed" is on, in which case it
    // keeps walking and writing the Note Stream too (not just the log), so
    // there's a visible sign in the note that it's still active even with
    // the graph closed. That setting only has an effect once broken-link
    // scanning itself is on, though — with scanning off there's nothing to
    // continue scanning for, so the Note Stream correctly pauses with the
    // graph closed regardless of this setting's stored value (it's also
    // hidden from the settings tab in that case — see AmoebaSettingTab).
    const graphOpen = this.isGraphViewOpen();
    const cleanupOn = this.settings.cleanupHelper !== 'visualOnly';
    const keepWalking = graphOpen || (cleanupOn && this.settings.continueScanningWhileGraphClosed);
    const logBroken = cleanupOn && keepWalking;

    if (keepWalking) {
      // Amoeba always walks stepwise — no toggle for it, that's the point.
      const targets = await this.stepwiseAdvance(file, state, this.getLinkCount(), keepWalking);

      if (logBroken && targets.length > 0) {
        await this.syncBrokenLinksLogBatch(file, targets);
      }
    }

    this.scheduleTick(state);
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
  // scheduled with whatever the delay was at that time).
  getSpeedMs() {
    return Math.round(Math.min(MAX_SPEED_MS, Math.max(MIN_SPEED_MS, this.settings.speedMs)));
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
  wikilinkTarget(targetFile) {
    const allFiles = this.app.vault.getMarkdownFiles();
    const sameBasename = allFiles.filter((f) => f.basename === targetFile.basename);
    if (sameBasename.length > 1) {
      return targetFile.path.slice(0, -3); // strip ".md"
    }
    return targetFile.basename;
  }

  async writeLinks(amoebaFile, targetFiles) {
    const links = targetFiles.map((f) => `[[${this.wikilinkTarget(f)}]]`).join('\n');
    const block = `${LINK_BLOCK_START}\n${links}\n${LINK_BLOCK_END}`;

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
  // rather than one per note. All three managed sections live in the same
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
        const displayName = this.wikilinkTarget(note);
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
};

class AmoebaSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

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

    // Name shows the current value with its unit (e.g. "Movement interval —
    // 1s") since Obsidian's slider tooltip only appears while dragging —
    // this keeps the seconds figure visible at rest too, in sync via the
    // onChange below rather than depending on any slider internals.
    const speedSetting = new Setting(containerEl)
      .setName(`Movement interval — ${this.plugin.settings.speedMs / 1000} second(s)`)
      .setDesc('How often the amoeba jumps to a new note. Lower interval means faster movement.')
      .addSlider((slider) =>
        slider
          .setLimits(0.25, 5, 0.25)
          .setValue(this.plugin.settings.speedMs / 1000)
          .setDynamicTooltip()
          .onChange(async (value) => {
            this.plugin.settings.speedMs = Math.round(value * 1000);
            await this.plugin.saveSettings();
            speedSetting.setName(`Movement interval — ${value} second(s)`);
          })
      )
      .addExtraButton((button) =>
        button
          .setIcon('rotate-ccw')
          .setTooltip('Reset to default')
          .onClick(async () => {
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
            await this.plugin.saveSettings();
          })
      )
      .addExtraButton((button) =>
        button
          .setIcon('rotate-ccw')
          .setTooltip('Reset to default')
          .onClick(async () => {
            this.plugin.settings.linkCount = DEFAULT_SETTINGS.linkCount;
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
            await this.plugin.saveSettings();
            if (this.plugin.isInitialized()) await this.plugin.syncPseudopods();
            this.display();
          })
      );

    new Setting(containerEl)
      .setName('Move like a spider')
      .setDesc('Sets Movement interval to 0.25s, Simultaneous links to 8, and Pseudopods to 8 — fast, busy, many-legged movement.')
      .addButton((button) =>
        button
          .setButtonText('Apply')
          .onClick(async () => {
            this.plugin.settings.speedMs = 250;
            this.plugin.settings.linkCount = 8;
            this.plugin.settings.pseudopods = 8;
            await this.plugin.saveSettings();
            if (this.plugin.isInitialized()) await this.plugin.syncPseudopods();
            this.display();
          })
      );

    const noteEl = containerEl.createEl('p', {
      cls: 'setting-item-description',
    });
    noteEl.createEl('em', {
      text: 'Note: This plugin frequently agitates the graph view renderer to simulate organic movement, which may cause a spike in CPU usage as long as the amoeba is active.',
    });

    new Setting(containerEl).setName('Broken Link Scanning').setHeading();

    new Setting(containerEl)
      .setName('Scan for broken links')
      .setDesc(
        "Logs broken links the amoeba encounters and creates a checklist inside the 'Amoeba' note, which you can check off as you fix them. Off by default, leaving just the visual movement in Graph view."
      )
      .addDropdown((dropdown) =>
        dropdown
          .addOption('on', 'On')
          .addOption('visualOnly', 'Off: Visual Only')
          .setValue(this.plugin.settings.cleanupHelper)
          .onChange(async (value) => {
            this.plugin.settings.cleanupHelper = value;
            await this.plugin.saveSettings();
            // Reflect the toggle in the note immediately, rather than
            // waiting on the next tick (which never comes if we just
            // switched to Off).
            if (this.plugin.isInitialized()) await this.plugin.resetBrokenLinksLog();
            // Continue scanning / Scan folder / Interact with excluded files
            // only make sense once scanning is on — redraw to show/hide them.
            this.display();
          })
      );

    // The three settings below only apply once broken-link scanning is on,
    // so they're hidden entirely while it's off rather than shown disabled.
    if (this.plugin.settings.cleanupHelper === 'on') {
      new Setting(containerEl)
        .setName('Continue scanning while global Graph view is closed')
        .setDesc('The amoeba continues scanning and logging in the background.')
        .addToggle((toggle) =>
          toggle
            .setValue(this.plugin.settings.continueScanningWhileGraphClosed)
            .onChange(async (value) => {
              this.plugin.settings.continueScanningWhileGraphClosed = value;
              await this.plugin.saveSettings();
            })
        );

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

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Pulls out whatever's currently between a block's start/end markers, so
// ensureNoteStructure() can rebuild the note around the three fixed
// headings without losing live data (the rotating links, the log entries).
// Returns '' if the block isn't present yet (e.g. a brand-new note), which
// yields an empty-but-present block in the rebuilt skeleton.
function extractBlockInner(content, startMarker, endMarker) {
  const regex = new RegExp(
    `${escapeRegex(startMarker)}\\n?([\\s\\S]*?)\\n?${escapeRegex(endMarker)}`
  );
  const match = content.match(regex);
  return match ? match[1] : '';
}

// Renders the Broken Link Encounters log block body from a list of entry
// lines, falling back to EMPTY_ENCOUNTERS_TEXT when there are none — the
// single place that decides what an empty log looks like, so
// ensureNoteStructure() and syncBrokenLinksLogBatch() can't drift out of sync
// on that formatting.
function renderLogBlock(lines) {
  const body = lines.length > 0 ? lines.join('\n') : EMPTY_ENCOUNTERS_TEXT;
  return `${LOG_BLOCK_START}\n${body}\n${LOG_BLOCK_END}`;
}

// Strips every known heading and full block (markers included) out of the
// note, leaving only content the user typed themselves outside those
// managed sections. That leftover is preserved verbatim, placed above the
// three canonical sections when the note gets rebuilt.
function stripKnownSections(content) {
  let result = content;
  const blockPairs = [
    [LINK_BLOCK_START, LINK_BLOCK_END],
    [LOG_BLOCK_START, LOG_BLOCK_END],
    [PSEUDOPODS_BLOCK_START, PSEUDOPODS_BLOCK_END],
  ];
  for (const [start, end] of blockPairs) {
    const regex = new RegExp(`${escapeRegex(start)}[\\s\\S]*?${escapeRegex(end)}`, 'g');
    result = result.replace(regex, '');
  }
  for (const heading of [HEADING_ACTIVE, HEADING_CLEANUP, HEADING_PSEUDOPODS]) {
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
