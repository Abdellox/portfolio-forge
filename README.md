# 📝 README Forge — GitHub Profile README Generator

**A free, open-source tool that turns any GitHub username into a beautiful profile README.**

Type a username → pick a style → copy → paste into your `username/username` repo. No sign-up, no backend, 100% client-side (your data goes from the GitHub API straight to your browser).

**Live demo:** https://abdellox.github.io/portfolio-forge/

## ✨ Why it exists

Most profile-README tools are closed, tracked, or paid. This one is:

- 🔓 **Free & open source (MIT)** — you can read every line of code
- 🔒 **Privacy-first** — no analytics, no backend, no cookies. GitHub API → your browser, nothing else
- ⚡ **No setup** — it's a static site. You can run it on GitHub Pages with zero backend
- 🎨 **3 styles** inspired by the most-followed profiles in [awesome-github-profile-readme](https://github.com/roypriyanshu02/awesome-github-profile-readme):
  - **Clean & Simple** (anuraghazra-style) — stats cards + about bullets
  - **Typing Header** (DenverCoder1-style) — animated typewriter + centered
  - **Badge Heavy** (classic) — tech-stack badge wall
- 📊 **Auto stats** — GitHub stats + top-language cards render automatically via `github-readme-stats`
- 🚀 **Live preview** — see the rendered README before you commit it

## 🚀 Usage

1. Open the demo, type a username, pick a style
2. Click **Copy** (or **Download**)
3. On GitHub: create a repo named `your-username/your-username`
4. Add the markdown as `README.md` — commit. Done 🎉

You can also deep-link: `https://abdellox.github.io/portfolio-forge/?username=sindresorhus`

## 🧑💻 Run it yourself

No build step. Just serve the folder:

```bash
python -m http.server 8080
# or: npx serve .
```

Or host it free on GitHub Pages (Settings → Pages → Deploy from branch → `main` → root).

## 🧱 Tech

Pure HTML/CSS/JS. No dependencies except `marked` (loaded from CDN for the preview tab). GitHub `users` + `repos` REST API.

## 📄 License

[MIT](LICENSE). Fork it, ship it, star it if it helps.

---

**Built with ❤️ by [Abdellox](https://github.com/Abdellox) as an open-source contribution to the GitHub community.**