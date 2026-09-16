(() => {
  'use strict';

  const GITHUB_API = 'https://api.github.com';
  const ESC = /([&<>"'])/g;
  const esc = (s) => String(s == null ? '' : s).replace(ESC, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));

  const STYLES = {
    clean: {
      emoji: '📄',
      name: 'Clean & Simple',
      desc: 'The most-followed layout style (anuraghazra). Professional, scannable, converts visitors.',
      tags: ['stats cards', 'about bullets', 'top languages']
    },
    typing: {
      emoji: '⌨️',
      name: 'Typing Header',
      desc: 'Animated typewriter header (DenverCoder1-style) with centered layout. Playful but professional.',
      tags: ['typing animation', 'social icons', 'light + dark']
    },
    badges: {
      emoji: '🎨',
      name: 'Badge Heavy',
      desc: 'Full tech-stack badge wall (classic style). Good for showing every tool you know.',
      tags: ['shields.io badges', 'sections', 'footer quote']
    }
  };

  let state = { style: 'clean', user: null, repos: [] };

  const $ = (id) => document.getElementById(id);
  const setErr = (msg, ok) => {
    const el = $('form-error');
    el.textContent = msg;
    el.classList.remove('hidden');
    el.classList.toggle('ok', !!ok);
  };

  const langIcon = (lang) => {
    const map = {
      'typescript': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png',
      'javascript': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png',
      'python': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/python/python.png',
      'react': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png',
      'java': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/java/java.png',
      'go': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/go/go.png',
      'rust': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/rust/rust.png',
      'php': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/php/php.png',
      'ruby': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/ruby/ruby.png',
      'c': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/c/c.png',
      'cpp': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/cpp/cpp.png',
      'csharp': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/csharp/csharp.png',
      'swift': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/swift/swift.png',
      'kotlin': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/kotlin/kotlin.png',
      'html': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png',
      'css': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png',
      'shell': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/bash/bash.png',
      'vue': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/vue/vue.png',
      'dart': 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/dart/dart.png',
    };
    if (!lang) return '';
    const key = lang.toLowerCase();
    if (map[key]) return '<code><img height="20" alt="' + esc(lang) + '" src="' + map[key] + '"></code> ';
    if (key.includes('type')) return '<code><img height="20" alt="typescript" src="' + map.typescript + '"></code> ';
    return '<code><img height="20" alt="' + esc(lang) + '" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/' + encodeURIComponent(key) + '/' + encodeURIComponent(key) + '.png"></code> ';
  };

  async function api(path) {
    const r = await fetch(GITHUB_API + path, {
      headers: { Accept: 'application/vnd.github+json' }
    });
    if (r.status === 404) throw new Error('user-not-found');
    if (r.status === 403) throw new Error('rate-limited');
    if (!r.ok) throw new Error('http-' + r.status);
    return r.json();
  }

  async function loadUser(username) {
    const u = username.trim().replace(/^@/, '');
    const [user, repos] = await Promise.all([
      api('/users/' + encodeURIComponent(u)),
      api('/users/' + encodeURIComponent(u) + '/repos?per_page=100&sort=pushed')
    ]);
    return { user, repos: repos.filter((r) => !r.fork) };
  }

  function topLanguages(repos, user) {
    const lang = user && user.language || null;
    const counts = {};
    repos.forEach((r) => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1; });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const langs = sorted.slice(0, 8).map((l) => l[0]);
    if (lang && !langs.includes(lang)) langs.unshift(lang);
    return langs.slice(0, 8);
  }

  function topRepos(repos, n) {
    return [...repos].sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)).slice(0, n);
  }

  function featuredRepoTable(repos) {
    const top = topRepos(repos, 6);
    if (!top.length) return '';
    const rows = top.map((r) => {
      const name = r.name;
      const desc = (r.description || '').replace(/\s+/g, ' ').trim().slice(0, 70);
      const stars = r.stargazers_count || 0;
      const lang = r.language ? '<img height="20" alt="' + esc(r.language) + '" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/' + encodeURIComponent((r.language || '').toLowerCase()) + '/' + encodeURIComponent((r.language || '').toLowerCase()) + '.png">' : '';
      return '| [' + esc(name) + '](https://github.com/' + esc(state.user.login) + '/' + esc(name) + ') | ' + (stars ? '★ ' + stars : '') + ' | ' + lang + ' | ' + esc(desc) + ' |';
    }).join('\n');
    return rows;
  }

  function badges(user) {
    return [
      '![GitHub followers](https://img.shields.io/github/followers/' + esc(user.login) + '?style=social)',
    ].join('\n');
  }

  function generate() {
    const { user, repos } = state;
    const langs = topLanguages(repos, user);
    const langIcons = langs.map(langIcon).join('');
    const u = user.login;
    const name = user.name || u;
    const bio = (user.bio || 'A developer who loves building things.') + (user.location ? ' Based in ' + user.location + '.' : '');
    const extra = user.company ? '\n\n- 💼 Working at **' + esc(user.company) + '**\n' : '';
    const repoTable = featuredRepoTable(repos);
    const topRepoNames = topRepos(repos, 3).map((r) => '[' + esc(r.name) + '](https://github.com/' + esc(u) + '/' + esc(r.name) + ')').join(', ');

    const cards = '<a href="https://github.com/' + esc(u) + '"><img align="center" src="https://github-readme-stats.vercel.app/api?username=' + esc(u) + '&show_icons=true&include_all_commits=true&theme=transparent&hide_border=true" alt="' + esc(u) + '\'s GitHub stats" /></a>';

    const styles = {
      clean: `### Hi there 👋, I'm **${esc(name)}**

${badges(user)}

I'm ${esc(bio)}

**About me**
- 🔭 Currently working on: ${topRepoNames || 'open source'}
- 🌱 Always learning new technologies
- 💬 Ask me about anything
- ⚡ Fun fact: I believe in building in public${extra}

${langIcons}

| ${cards.replace(/\n/g, ' ')} | <a href="https://github.com/${esc(u)}"><img align="center" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${esc(u)}&layout=compact&theme=transparent&hide_border=true" /></a> |
| ------------- | ------------- |

#### ⭐ Featured projects
${repoTable ? '\n' + repoTable : 'Check out my repos: https://github.com/' + esc(u)}`,

      typing: `<h3 align="center">Hi 👋, I'm <a href="https://github.com/${esc(u)}">${esc(name)}</a></h3>
<p align="center">
  <img src="https://readme-typing-svg.demolab.com/?lines=${encodeURIComponent((user.bio || 'Developer') + ';' + (user.location || 'Building in public'))}&font=Fira%20Code&center=true&width=500&height=45&color=46b6ff&vCenter=true&pause=1200&size=22" />
</p>

<p align="center">
  <a href="https://github.com/${esc(u)}"><img width="32px" src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg" alt="GitHub" /></a>
  &#8287;&#8287;${user.blog ? '\n  <a href="' + esc(user.blog) + '"><img width="32px" src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/globe.svg" alt="Website" /></a>\n  &#8287;&#8287;' : ''}<a href="mailto:${esc('hello@' + (user.email || ((user.login || 'example.com').indexOf('@') > -1 ? user.login : user.login + '@example.com')))}"><img width="32px" src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/gmail.svg" alt="Email" /></a>
</p>

<p align="center">
  <a href="https://github.com/${esc(u)}">${esc(user.followers || 0)} Followers</a> &#8287;·&#8287;
  <a href="https://github.com/${esc(u)}">${esc(user.following || 0)} Following</a>
</p>

**About me**
- 🔭 I'm ${esc(bio)}
- 🌱 I'm currently learning and building in public
- 💬 Ask me about anything${extra}

${langIcons}

| ${cards.replace(/\n/g, ' ')} | <a href="https://github.com/${esc(u)}"><img align="center" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${esc(u)}&layout=compact&theme=transparent&hide_border=true" /></a> |
| ------------- | ------------- |

#### ⭐ Featured projects
${repoTable ? '\n' + repoTable : 'Check out my repos: https://github.com/' + esc(u)}`,

      badges: `# ${esc(name)}

${badges(user)}

${esc(bio)}

## 🛠️ Tech Stack
${langs.map((l) => '![tech](https://img.shields.io/badge/Tech-' + encodeURIComponent(l) + '-blue)').join(' ')}

## 💼 Experience
- **Software Developer** — building products and open source (${new Date().getFullYear()} - present)

## 🚀 Featured Projects
${repoTable ? repoTable.replace(/\$\[/g, '[').replace(/\]https:\/\//g, '](https://') : 'https://github.com/' + esc(u)}

## 📊 Stats
| ${cards.replace(/\n/g, ' ')} | <a href="https://github.com/${esc(u)}"><img align="center" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${esc(u)}&layout=compact&theme=transparent&hide_border=true" /></a> |
| ------------- | ------------- |

---
*Profile generated with [README Forge](https://github.com/Abdellox/portfolio-forge) — free & open source.*`
    };

    return styles[state.style] || styles.clean;
  }

  function renderStyleCards() {
    const grid = $('style-cards');
    grid.innerHTML = '';
    Object.entries(STYLES).forEach(([key, s]) => {
      const el = document.createElement('div');
      el.className = 'style-card' + (key === state.style ? ' active' : '');
      el.dataset.style = key;
      el.innerHTML =
        '<div class="style-emoji">' + s.emoji + '</div>' +
        '<h3>' + s.name + '</h3>' +
        '<p>' + s.desc + '</p>' +
        '<div class="style-tags">' + s.tags.map((t) => '<span>' + t + '</span>').join('') + '</div>';
      el.addEventListener('click', () => {
        state.style = key;
        document.querySelectorAll('.style-card').forEach((c) => c.classList.toggle('active', c === el));
        refresh();
      });
      grid.appendChild(el);
    });
  }

  function setUsername(username) {
    $('username').value = username;
  }

  async function refresh() {
    if (!state.user) return;
    const md = generate();
    $('md-output').value = md;
    $('output').classList.remove('hidden');
    $('output').scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.marked) {
      $('tab-preview').innerHTML = marked.parse(md);
      $('tab-preview').querySelectorAll('a').forEach((a) => { a.target = '_blank'; a.rel = 'noopener'; });
    } else {
      $('tab-preview').textContent = 'Loading preview...';
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    const username = $('username').value.trim();
    if (!username) { setErr('Please enter a GitHub username.'); return; }
    const btn = $('gen-btn');
    const spinner = btn.querySelector('.spinner');
    btn.disabled = true;
    btn.querySelector('.btn-label').textContent = 'Fetching...';
    spinner.classList.remove('hidden');
    setErr('');
    try {
      const data = await loadUser(username);
      state.user = data.user;
      state.repos = data.repos;
      setUsername(username);
      $('output-title').textContent = 'Your README — ' + data.user.name || data.user.login;
      await refresh();
    } catch (err) {
      if (err.message === 'user-not-found') setErr('User not found on GitHub — check the spelling.');
      else if (err.message === 'rate-limited') setErr('Rate limit hit (60 req/hr). Wait a minute and try again, or add ?username= URL param.');
      else setErr('Could not fetch user: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.querySelector('.btn-label').textContent = 'Generate README';
      spinner.classList.add('hidden');
    }
  }

  $('gen-form').addEventListener('submit', onSubmit);

  $('copy-btn').addEventListener('click', async () => {
    const md = $('md-output').value;
    try {
      await navigator.clipboard.writeText(md);
      const b = $('copy-btn');
      b.textContent = '✅ Copied!';
      setTimeout(() => { b.textContent = '📋 Copy'; }, 2000);
    } catch (err) {
      $('md-output').select();
      document.execCommand('copy');
      $('copy-btn').textContent = '✅ Copied!';
      setTimeout(() => { $('copy-btn').textContent = '📋 Copy'; }, 2000);
    }
  });

  $('download-btn').addEventListener('click', () => {
    const name = (state.user && state.user.login) || 'profile';
    const blob = new Blob([$('md-output').value], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '-README.md';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  document.querySelectorAll('.tab').forEach((t) => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((x) => x.classList.remove('active'));
      t.classList.add('active');
      const id = t.dataset.tab;
      $('tab-preview').classList.toggle('hidden', id !== 'preview');
      $('tab-markdown').classList.toggle('hidden', id !== 'markdown');
      if (id === 'markdown') $('md-output').focus();
    });
  });

  document.getElementById('theme-toggle').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('rf-theme', next); } catch (e) {}
  });

  const savedTheme = (() => { try { return localStorage.getItem('rf-theme'); } catch (e) { return null; } })();
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme === 'dark' ? 'dark' : 'light');

  renderStyleCards();

  const urlName = new URLSearchParams(location.search).get('username');
  if (urlName) {
    $('username').value = urlName;
    setErr('');
  }
})();