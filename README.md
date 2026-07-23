# Rolodex — People Notes

A small private app for remembering people: names, spouses, family, facts,
what social group they belong to, tags, and links between people who know
each other. Runs entirely in your browser — no server, no account, no cost.

## Put it on GitHub Pages (free)

1. Create a new **public** GitHub repository (private repos can't use free
   Pages hosting on a personal plan, so keep this in mind — see "About your
   data" below before you decide).
2. Upload these five files to the repo root:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
   - `apple-touch-icon.png`
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch",
   branch `main`, folder `/ (root)`. Save.
5. GitHub gives you a URL like
   `https://yourusername.github.io/your-repo-name/`. It usually takes a
   minute or two to go live the first time.

## Add it to your iPhone home screen

1. Open that URL in **Safari** on your iPhone (must be Safari, not Chrome).
2. Tap the **Share** icon (square with an arrow).
3. Tap **Add to Home Screen**.
4. It now opens full-screen, with its own icon, like a regular app.

## About your data — read this before you use it

This app stores everything **only in your iPhone's local browser storage**
(nothing is sent to a server). That has two real consequences:

- **It's private by default** — nobody but you can see it, not even GitHub,
  even though the *code* of the app is public on GitHub.
- **It doesn't sync.** If you open the site on another device, or clear
  Safari's website data, that copy starts empty. There's no built-in
  backup/sync between devices.

To protect against losing data (e.g. if you reset your phone), use the
**Export backup** link at the bottom of the app now and then — it downloads
a JSON file you can save anywhere (iCloud, email to yourself, etc.), and
**Import backup** on any device to restore it.

If down the road you want real sync across devices, that requires adding a
backend/database, which is a meaningfully bigger and no-longer-free step —
worth revisiting only if this local version proves useful to you.

## Editing later

Everything is in `index.html` (structure, styling, and logic are all in that
one file to keep this simple to host and edit). `manifest.json` and `sw.js`
are what make "Add to Home Screen" behave like a real app and let it load
even with no signal.
