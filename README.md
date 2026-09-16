# ⚒️ Portfolio Forge

**A free, open-source, config-driven portfolio for developers.**
Fork it → edit one file (`config.json`) → deploy to GitHub Pages. No build step, no backend, no account required.

> Built as an open-source contribution to the developer community. MIT Licensed.

## ✨ Why Portfolio Forge?

- 🔓 **100% free & open source** — unlike closed "portfolio generators", this is MIT and can't be paywalled
- ⚡ **Zero build step** — edit `config.json`, push, done. No npm, no CLI, no framework
- 🎨 **Dark & light themes** — toggle built-in, preference saved in the browser
- 📊 **Live GitHub stats** — plug in your username, stats cards render automatically
- 🧩 **Optional sections** — About, Projects, Skills, GitHub, Experience, Contact. Add or remove by editing config
- 🚀 **Customizable** — socials, CTAs, project tags, highlight cards, timeline, and a `assets/custom.css` hook
- 📱 **Responsive & fast** — pure HTML/CSS/JS, no dependencies, loads in milliseconds

## 🚀 Quick start (your portfolio in 5 minutes)

1. **Fork this repository** → https://github.com/Abdellox/portfolio-forge (use the *Fork* button, then *Own account*)
2. **Rename the fork** to YOUR username: **Settings → General → Repository name** → `yourusername.github.io`
3. **Edit `config.json`** — replace the example with your info (see how below)
4. **Enable GitHub Pages**: Settings → Pages → Source: *Deploy from a branch* → `main` → root → Save
5. **Visit** `https://yourusername.github.io` 🎉

Your live portfolio is now on the internet — free, forever, under your control.

## ⚙️ Configuration

Everything lives in **`config.json`**. Sections render automatically — leave a section empty or remove it and it won't appear.

| Field | Type | What it does |
|---|---|---|
| `theme` | `"dark"` \| `"light"` | Default theme |
| `profile.name` | string | Your name |
| `profile.tagline` | string | Small mono-style label under the nav |
| `profile.bio` | string | One or two sentences about you |
| `profile.avatar` | URL | Profile picture (GitHub URLs look great: `https://github.com/username.png`) |
| `profile.cta` | array | Primary + secondary buttons |
| `profile.socials` | array | `{label, url}` pairs — icons auto-detected |
| `githubUsername` | string | Enables the live stats cards |
| `githubStats` | bool | `false` to hide stats cards |
| `about.text` | string | Paragraph about you |
| `about.highlights` | array | `{title, text}` cards |
| `projects[]` | array | `{name, description, tags[], url, demo, stars}` |
| `skills[]` | array | `{name, items[]}` groups |
| `experience[]` | array | `{title, period, text}` timeline |
| `contact.text` | string | Contact message |
| `contact.socials` | array | Social badges |
| `footer` | string | Small footer line |

## 🎨 Advanced customization

- **Custom CSS**: create `assets/custom.css` — it's the last stylesheet loaded, so you can override anything (colors are CSS variables in `style.css`).
- **Colors**: the design uses CSS variables (`--bg`, `--surface`, `--text`, `--accent`, `--accent-2`) — change 5 values and you have a whole new palette.

## 📄 License

[MIT](LICENSE) — use it, fork it, ship it. A tiny ⭐ and a credit in the footer is appreciated but not required.

---

**Made with ⚒️ by [Abdellox](https://github.com/Abdellox) as an open-source contribution to the GitHub community.**