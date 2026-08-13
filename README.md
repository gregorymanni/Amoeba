# Obsidian Amoeba

Amoeba drops a living organism into your vault, bringing dynamic visual movement to Graph view, and helping you clean up broken links at the same time.

<p align="left">
  <img src="./images/amoeba.gif" width="48%" alt="Amoeba moving through Graph view" />
  <img src="./images/spider.gif" width="48%" alt="Amoeba using the Spider preset" />
</p>

## The Idea

Graph view looks great, but it quickly becomes the same stale, motionless vault overview that you saw yesterday... and the day before that. Ideas are organic and always changing, and our technology should reflect that.

Amoeba brings life into your graph by:

- Introducing a self-powered, moving 'Amoeba' note inside the Graph view environment, which sets the global graph in motion
- Providing customizable parameters to adjust the movement of the amoeba to your liking — including a Spider preset!
- (Optionally) Logging your broken links as the amoeba encounters them to help you clean up your vault

## How it works

Amoeba creates a note inside your vault that randomly links and unlinks with other notes — a constantly self-updating process that causes the note to pull itself and other notes around the graph. Sub-notes that trail the amoeba are also created, adding to the visual effect.

But the amoeba can be helpful too. Turn on broken link scanning, and the amoeba logs broken links found across the notes it encounters and adds them to a checklist. Check them off as you fix them, and the amoeba eventually removes them from the log.

Parameters in settings help you determine the movement, speed, and look of your amoeba, including: 
- **Movement interval:** how quickly the amoeba jumps to a new note
- **Simultaneous links:** how many notes the amoeba links to at once
- **Pseudopods:** the number of trailing sub-notes linked to the amoeba
- **Color:** can be changed in Graph view settings, like any other note
- **Advanced settings** to fine-tune link scanning, if desired

Inside the Amoeba note itself, you will find:
- **The Note Stream:** shows the notes the amoeba is currently linked to
- **Broken Link Encounters:** a checklist log of broken links that have been discovered
- **Pseudopods:** a short list linking the amoeba's trailing sub-notes 

<p align="left">
  <img src="./images/amoeba2.gif" width="100%" alt="Amoeba closeup" />
</p>

*Note: This plugin frequently agitates the graph view renderer, which may cause a spike in CPU usage as long as the amoeba is active. It is not recommended for giant database-style vaults.* 

## Getting started

1. Install Amoeba from **Settings → Community plugins** in Obsidian, or manually by copying `main.js`, `manifest.json`, and `styles.css` into `<vault>/.obsidian/plugins/amoeba/`.
2. Enable the plugin.
3. Open **Settings → Amoeba** and click **Start Amoeba** (or run the **Start Amoeba** command from the command palette) to create the 'Amoeba' note/folder and start it running.
4. The amoeba immediately starts moving around your graph.

## Commands

- **Start Amoeba** — Starts the amoeba moving and scanning the graph. If plugin is newly installed, initializes amoeba folder setup.
- **Stop Amoeba** — Stops the amoeba in its tracks: no more movement, scanning, or logging.
- A frontmatter checkbox inside the Amoeba note serves the same function, as well as a button in settings.

## Settings

| Setting                                             | Description                                                                              |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Initialize                                          | *Creates the amoeba, also used for stopping and starting*                                  |
| Movement interval                                   | *Sets the interval between movements (0.25-5 seconds)*                                     |
| Simultaneous links                                  | *Sets the number of links the amoeba connects to (0-10)*                                   |
| Pseudopods                                          | *Sets the number of trailing sub-notes (0-10)*                                             |
| Move like a spider                                  | *Button preset that makes the amoeba behave like a fast-moving spider*                     |
| **Broken Link Scanning**                            |                                                                                            |
| Scan for broken links                               | *Toggles broken link scanning on/off*                                                      |
| Continue scanning while global Graph view is closed | *Toggles whether broken link scanning continues in the background, even when the amoeba isn't visible* |
| Scan folder                                         | *Limits scanning to a specific folder/subfolder*                                           |
| Interact with excluded files                        | *Toggles whether to scan your Excluded files*                                    |

## FAQ

**Why can't I see the amoeba moving?**
- Very large graph databases with several thousand links will likely make it hard to view the amoeba. It's also possible your Graph view 'Forces' settings aren't optimal for viewing.

**What are the best Graph view 'Forces' settings to view the amoeba?**
- The most important is a high 'Link force' value, otherwise the amoeba will be stationary. Here's a good place to start with your settings: *Center force = 0.50, Repel force = 13.50, Link force = 1.00, Link distance = 30*.

**Will this plugin write inside or change any of my existing notes?**
- No, only the 'Amoeba' note itself changes.

**Will removing this plugin delete the 'Amoeba' folder or its contents?**
- No — no need to worry about losing any notes you add to the 'Amoeba' folder.

**Why can't I write inside 'Amoeba.pseudopod' notes?**  
-  The Pseudopods slider in settings adds and removes 'Amoeba.pseudopod' notes, so they are uneditable on purpose. However, it's possible to link your own orphan notes to the 'Amoeba' to create the same effect, and these will not be impacted by the plugin.

## Developer Notes

**Support:** If you like Amoeba and would like to support my work and other future creative projects, you can donate here: 

<a href="https://ko-fi.com/gregory_manni"><img src="https://storage.ko-fi.com/cdn/kofi3.png?v=3" width="150" alt="ko-fi" /></a>

*AI Use Disclosure: This plugin was coded responsibly with the help of Claude Sonnet 5.*