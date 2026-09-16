(() => {
  'use strict';

  const FALLBACK = {
    profile: {
      name: 'Your Name',
      tagline: 'Software Engineer',
      bio: 'Edit config.json to make this your own.',
      avatar: 'https://github.com/github.png',
      cta: [{ label: 'View my work', url: '#projects' }],
      socials: [{ label: 'GitHub', url: 'https://github.com' }]
    },
    theme: 'dark',
    githubUsername: '',
    about: { text: 'Tell your story in config.json.', highlights: [] },
    projects: [],
    skills: [],
    githubStats: true
  };

  let cfg = null;

  const $ = (id) => document.getElementById(id);

  const esc = (s) => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const socialIcon = (label) => {
    const l = label.toLowerCase();
    if (l.includes('github')) return '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.27 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>';
    if (l.includes('linkedin')) return '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z"/></svg>';
    if (l.includes('mail') || l.includes('email')) return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>';
    if (l.includes('x') || l.includes('twitter')) return '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z"/></svg>';
    if (l.includes('youtube')) return '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>';
    if (l.includes('dev.to') || l.includes('devto')) return '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.9-.02-1.97-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.8-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.13zm4.58 2.18c-.25.86-1.01 1.31-2.02 1.2-.62-.06-.85-.17-1.1-.52l-.24-.33.42-.74.41-.72.24.26c.18.2.24.24.55.23.3.01.45-.13.5-.55.04-.25.03-.29-.83-1.88-.95-1.77-1.09-2.23-1.09-3.5 0-1.47.1-1.76.65-2.13.44-.28 1.08-.37 2.1-.28 1.75.12 2.22.48 2.47 1.83.02.1.05.29.08.41l1.2 2.1h.1a271.84 271.84 0 0 0 .33 2.1h-1.06l-.78-1.24-.75-1.17-.28-.06c-.19-.05-.3.01-.36.2-.06.21-.05.32.06.93l.9 1.66.05.01c.65.13.95.43 1.02.9.08.48-.06 1.19-.3 1.53zM20.9 15.65h-2.07l-.07-1.4c-.03-.77-.06-1.94-.06-2.6v-1.2l1.8-2.8c.98-1.53 1.85-2.86 1.94-2.95.17-.17.32-.22.61-.22.26-.01.46 0 .5.01l.34.01-2.44 3.77-.02.03.23.36c.14.22.91 1.37 1.72 2.58.8 1.19 1.47 2.21 1.47 2.25 0 .05-.05.06-.16.06h-2.45l-.98-1.49c-.55-.83-1.02-1.53-1.05-1.56l-.05-.02-.1.13-.08.6v1.34c0 .73.02 2.05.03 2.93z"/></svg>';
    if (l.includes('globe') || l.includes('port') || l.includes('web')) return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h6M9 16h6M9 8h6M7 12a5 5 0 0 1 5-5V3.5L20 8l-8 4.5V9a5 5 0 0 0-5 5 5 5 0 0 1-7 2"/></svg>';
  };

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('pf-theme', t); } catch (e) {}
  }

  function renderHero() {
    $('hero-tagline').textContent = cfg.profile.tagline || '';
    $('hero-name').textContent = cfg.profile.name || '';
    $('hero-bio').textContent = cfg.profile.bio || '';
    if (cfg.profile.avatar) $('hero-avatar').src = cfg.profile.avatar;
    const cta = document.getElementById('hero-cta');
    (cfg.profile.cta || []).forEach((c) => {
      const a = document.createElement('a');
      a.href = c.url || '#';
      a.className = 'btn ' + (c.primary ? 'btn-primary' : '');
      a.textContent = c.label || 'Link';
      a.target = (c.url || '').startsWith('http') ? '_blank' : '_self';
      cta.appendChild(a);
    });
    renderSocials('hero-socials', cfg.profile.socials || []);
  }

  function renderSocials(elId, list) {
    const el = document.getElementById(elId);
    el.innerHTML = '';
    list.forEach((s) => {
      const a = document.createElement('a');
      a.href = s.url || '#';
      a.className = 'social-badge';
      a.target = (s.url || '').startsWith('http') ? '_blank' : '_self';
      const label = s.label || (s.url || '').split('/').filter(Boolean).pop() || 'link';
      a.title = label;
      a.innerHTML = socialIcon(label) + '<span>' + esc(label) + '</span>';
      el.appendChild(a);
    });
  }

  function renderAbout() {
    const about = cfg.about || {};
    if (!about.text && !(about.highlights || []).length) return;
    $('about').classList.remove('hidden');
    $('about-body').innerHTML = esc(about.text || '');
    const hc = document.getElementById('about-highlights');
    (about.highlights || []).forEach((h) => {
      const d = document.createElement('div');
      d.className = 'highlight';
      d.innerHTML = '<b>' + esc(h.title || '') + '</b><span>' + esc(h.text || '') + '</span>';
      hc.appendChild(d);
    });
  }

  function renderProjects() {
    const list = cfg.projects || [];
    if (!list.length) return;
    $('projects').classList.remove('hidden');
    const grid = document.getElementById('project-grid');
    list.forEach((p) => {
      const card = document.createElement('article');
      card.className = 'project-card';
      let stars = '';
      if (p.stars) stars = '<span class="project-stars">★ ' + esc(String(p.stars)) + '</span>';
      const tags = (p.tags || []).map((t) => '<span class="tag">' + esc(t) + '</span>').join('');
      const links = [];
      if (p.url) links.push('<a href="' + esc(p.url) + '" target="_blank" rel="noopener">Code ↗</a>');
      if (p.demo) links.push('<a href="' + esc(p.demo) + '" target="_blank" rel="noopener">Demo ↗</a>');
      card.innerHTML =
        '<div class="project-head"><span class="project-name">' + esc(p.name || '') + '</span>' + stars + '</div>' +
        '<p class="project-desc">' + esc(p.description || '') + '</p>' +
        (tags ? '<div class="project-tags">' + tags + '</div>' : '') +
        (links.length ? '<div class="project-links">' + links.join('') + '</div>' : '');
      grid.appendChild(card);
    });
  }

  function renderSkills() {
    const groups = cfg.skills || [];
    if (!groups.length) return;
    $('skills').classList.remove('hidden');
    const el = document.getElementById('skill-groups');
    groups.forEach((g) => {
      const d = document.createElement('div');
      d.className = 'skill-group';
      d.innerHTML = '<h3>' + esc(g.name || 'Skills') + '</h3>' +
        '<div class="skill-chips">' + (g.items || []).map((s) => '<span class="skill">' + esc(s) + '</span>').join('') + '</div>';
      el.appendChild(d);
    });
  }

  function renderGithub() {
    const u = cfg.githubUsername;
    if (!u || cfg.githubStats === false) return;
    $('github').classList.remove('hidden');
    const el = document.getElementById('github-cards');
    const mk = (src) => {
      const d = document.createElement('div');
      d.className = 'github-card';
      d.innerHTML = '<img loading="lazy" alt="GitHub stats" src="' + esc(src) + '">';
      el.appendChild(d);
    };
    mk('https://github-readme-stats.vercel.app/api?username=' + encodeURIComponent(u) + '&show_icons=true&count_private=true&theme=transparent&hide_border=true');
    mk('https://github-readme-stats.vercel.app/api/top-langs/?username=' + encodeURIComponent(u) + '&layout=compact&theme=transparent&hide_border=true');
  }

  function renderExperience() {
    const items = cfg.experience || [];
    if (!items.length) return;
    $('experience').classList.remove('hidden');
    const tl = document.getElementById('timeline');
    items.forEach((x) => {
      const d = document.createElement('div');
      d.className = 'timeline-item';
      d.innerHTML = '<h3>' + esc(x.title || '') + '</h3>' +
        '<div class="period">' + esc(x.period || '') + '</div>' +
        (x.text ? '<p>' + esc(x.text) + '</p>' : '');
      tl.appendChild(d);
    });
  }

  function renderContact() {
    const c = cfg.contact || {};
    if (!c.text && !(c.socials || []).length) return;
    $('contact').classList.remove('hidden');
    $('contact-text').textContent = c.text || '';
    renderSocials('contact-links', c.socials || []);
  }

  function renderFooter() {
    $('footer-note').textContent = cfg.footer || '';
  }

  function observe() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.section').forEach((s) => {
      if (!s.classList.contains('hidden')) { s.classList.add('reveal'); io.observe(s); }
    });
  }

  async function loadConfig() {
    try {
      const r = await fetch('config.json', { cache: 'no-store' });
      if (!r.ok) throw new Error('http ' + r.status);
      cfg = await r.json();
    } catch (e) {
      console.warn('config.json unavailable, using defaults:', e.message);
      cfg = FALLBACK;
    }
    setTheme((cfg.theme || 'dark') === 'dark' ? 'dark' : 'light');
  }

  document.getElementById('theme-toggle').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(cur === 'dark' ? 'light' : 'dark');
  });

  loadConfig().then(() => {
    renderHero();
    renderAbout();
    renderProjects();
    renderSkills();
    renderGithub();
    renderExperience();
    renderContact();
    renderFooter();
    observe();
  });
})();