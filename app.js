/* ==============================================
   NEXBIDS WEBSITE — Single Page Application
   app.js: Router + i18n + All Page Renderers
   ============================================== */

'use strict';

/* ─────────────────────────────────────────────
   STATE
───────────────────────────────────────────── */
let currentLang = 'en';   // 'en' | 'zh'
let currentPage = 'home';

/* ─────────────────────────────────────────────
   LANGUAGE TOGGLE
───────────────────────────────────────────── */
function toggleLang() {
  currentLang = currentLang === 'en' ? 'zh' : 'en';
  applyLang();
  renderPage(currentPage);
}

function applyLang() {
  const isZh = currentLang === 'zh';
  document.body.classList.toggle('zh', isZh);
  const label = isZh ? '中文 | EN' : 'EN | 中文';
  document.querySelectorAll('#langLabel, #footerLangLabel').forEach(el => el.textContent = label);

  // swap all data-en / data-zh text nodes
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = isZh ? el.dataset.zh : el.dataset.en;
  });
}

/* ─────────────────────────────────────────────
   ROUTER
───────────────────────────────────────────── */
function navigate(page) {
  currentPage = page;
  renderPage(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // close mobile menu
  document.getElementById('navMenu')?.classList.remove('open');
  // update active state
  updateNavActive(page);
}

function renderPage(page) {
  const container = document.getElementById('pageContainer');
  const renderers = {
    'home':                 renderHome,
    'solutions':            renderSolutionsOverview,
    'solutions-advertiser': renderSolutionsAdvertiser,
    'solutions-publisher':  renderSolutionsPublisher,
    'solutions-agency':     renderSolutionsAgency,
    'products':             renderProductsOverview,
    'products-dsp':         renderProductsDSP,
    'products-adx':         renderProductsADX,
    'products-ssp':         renderProductsSSP,
    'technology':           renderTechnology,
    'resources':            renderResources,
    'case-studies':         renderCaseStudiesHub,
    'cases-advertiser':     renderCasesAdvertiser,
    'cases-publisher':      renderCasesPublisher,
    'company':              renderAbout,
    'about':                renderAbout,
    'careers':              renderCareers,
    'contact':              renderContact,
    'login-dsp':            () => renderLogin('dsp'),
    'login-ssp':            () => renderLogin('ssp'),
    'login-adx':            () => renderLogin('adx'),
    '404':                  render404,
  };
  const fn = renderers[page] || renderHome;
  container.innerHTML = `<div class="page-transition">${fn()}</div>`;
  applyLang();
  initScrollSpy();
  initCounterAnimation();
}

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const t = (en, zh) => `<span data-en="${en}" data-zh="${zh}">${currentLang === 'zh' ? zh : en}</span>`;

function sectionTag(en, zh, color = '') {
  return `<div class="section-tag ${color}">${t(en, zh)}</div>`;
}

function metricsBand(items) {
  const cols = items.map(([num, en, zh]) =>
    `<div class="metric-item"><div class="metric-num">${num}</div><div class="metric-label">${t(en, zh)}</div></div>`
  ).join('');
  return `<div class="metrics-band"><div class="metrics-grid">${cols}</div></div>`;
}

function ctaBand(enH, zhH, enP, zhP, cta1en, cta1zh, cta2en, cta2zh, page2 = 'contact') {
  return `
  <section class="section section-dark">
    <div class="container">
      <div class="cta-band">
        <h2>${t(enH, zhH)}</h2>
        <p>${t(enP, zhP)}</p>
        <div class="btn-group" style="justify-content:center">
          <button class="btn btn-primary" onclick="navigate('contact')">${t(cta1en, cta1zh)}</button>
          <button class="btn btn-secondary" onclick="navigate('${page2}')">${t(cta2en, cta2zh)}</button>
        </div>
      </div>
    </div>
  </section>`;
}

function pillarCard(iconOrGi, bg, enTitle, zhTitle, enDesc, zhDesc) {
  return `
  <div class="pillar-card">
    <div class="pillar-icon" style="background:${bg}">${iconOrGi}</div>
    <h3>${t(enTitle, zhTitle)}</h3>
    <p>${t(enDesc, zhDesc)}</p>
  </div>`;
}

/* ─────────────────────────────────────────────
   GLASS ICON HELPER
   gi(svgPath, colorClass, size)
   colorClass: 'blue'|'purple'|'green'|'amber'|'red'|'teal'|'neutral'
   size: 'sm'|'md'|'lg'|'xl'
───────────────────────────────────────────── */
function gi(svgContent, colorClass = 'blue', size = 'md') {
  return `<span class="gi gi-${size} gi-${colorClass}">${svgContent}</span>`;
}

/* Pre-defined SVG icon paths (24×24 viewBox, stroke-based) */
const ICONS = {
  target:    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  brain:     `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 0 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 0 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>`,
  palette:   `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.477-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  chart:     `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
  globe:     `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  shield:    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  zap:       `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  lock:      `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  layers:    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  trending:  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  users:     `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  star:      `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  server:    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
  link:      `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  monitor:   `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  smartphone:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  gamepad:   `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>`,
  tv:        `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
  handshake: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>`,
  tag:       `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  dollar:    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  cpu:       `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  eye:       `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  cookie:    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/></svg>`,
  clipboard: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
  settings:  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  rocket:    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  mail:      `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  newspaper: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>`,
  book:      `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  award:     `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  briefcase: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  wrench:    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  barChart:  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
  gem:       `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 18 3 22 9 12 22 2 9"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="12" y1="3" x2="6" y2="9"/><line x1="12" y1="3" x2="18" y2="9"/><line x1="12" y1="22" x2="6" y2="9"/><line x1="12" y1="22" x2="18" y2="9"/></svg>`,
};

/* Shorthand: gIcon(name, colorClass, size) */
function gIcon(name, colorClass, size = 'md') {
  const svg = ICONS[name] || ICONS.star;
  // Apply color to svg stroke
  const colored = svg.replace('stroke="currentColor"', `stroke="${iconColor(colorClass)}"`);
  return gi(colored, colorClass, size);
}

function iconColor(cls) {
  const map = { blue:'#60A5FA', purple:'#C084FC', green:'#34D399', amber:'#FCD34D', red:'#F87171', teal:'#22D3EE', neutral:'#9CA3AF' };
  return map[cls] || '#60A5FA';
}

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
function renderHome() {
  return `
  <!-- HERO -->
  <section class="hero">
    <div class="hero-content hero-layout">
      <div class="hero-text">
        ${sectionTag('Global Ad Tech Leader', '全球广告技术领导者')}
        <h1>${t('Power Your Growth with', '用智能程序化广告')}<br><span class="gradient-text">${t('Intelligent Programmatic', '驱动您的全球增长')}</span></h1>
        <p>${t('NexBids delivers a full-stack programmatic advertising ecosystem — DSP, ADX, and SSP — built for advertisers, publishers, developers, and agencies seeking measurable growth at global scale.',
               'NexBids 提供全栈程序化广告生态系统——DSP、ADX 和 SSP——专为寻求全球规模可衡量增长的广告主、发布商、开发者和代理商而构建。')}</p>
        <div class="btn-group">
          <button class="btn btn-primary" onclick="navigate('contact')">${t('Get Started Free', '免费开始')}</button>
          <button class="btn btn-secondary" onclick="navigate('products')">${t('Explore Platforms', '探索平台')}</button>
        </div>
        <div style="margin-top:32px;display:flex;gap:20px;flex-wrap:wrap">
          <span class="stat-badge">✓ ${t('150+ Countries', '150+国家')}</span>
          <span class="stat-badge green">✓ ${t('50B+ Daily Auctions', '每日500亿+竞价')}</span>
          <span class="stat-badge purple">✓ ${t('50K+ Active Advertisers', '50,000+活跃广告主')}</span>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <!-- Decorative programmatic ad dashboard illustration -->
        <div class="hero-viz-card">
          <div class="hvz-header">
            <span class="hvz-dot" style="background:#FF5F57"></span>
            <span class="hvz-dot" style="background:#FEBC2E"></span>
            <span class="hvz-dot" style="background:#28C840"></span>
            <span style="color:var(--text-muted);font-size:11px;margin-left:8px">NexBids DSP — Live Dashboard</span>
          </div>
          <div class="hvz-body">
            <div class="hvz-row">
              <span class="hvz-label">${t('Bid Requests','竞价请求')}</span>
              <span class="hvz-val gradient-text">50B+<span class="hvz-delta">↑12%</span></span>
            </div>
            <div class="hvz-row">
              <span class="hvz-label">${t('Win Rate','竞价胜率')}</span>
              <span class="hvz-val" style="color:#34D399">34.7%<span class="hvz-delta">↑2.1%</span></span>
            </div>
            <div class="hvz-row">
              <span class="hvz-label">${t('Avg ROAS','平均ROAS')}</span>
              <span class="hvz-val" style="color:#C084FC">8.4x<span class="hvz-delta">↑0.6x</span></span>
            </div>
            <!-- mini bar chart -->
            <div class="hvz-chart">
              ${[40,65,52,80,70,95,88].map((h,i) => `<div class="hvz-bar" style="height:${h}%;animation-delay:${i*0.08}s"></div>`).join('')}
            </div>
            <div class="hvz-channels">
              ${[['Display','#60A5FA',72],['Video','#C084FC',58],['Native','#34D399',45],['CTV','#FCD34D',38]].map(([l,c,v])=>`
              <div class="hvz-ch-row">
                <span class="hvz-ch-dot" style="background:${c}"></span>
                <span class="hvz-ch-label">${l}</span>
                <div class="hvz-ch-bar-wrap"><div class="hvz-ch-bar" style="width:${v}%;background:${c}22;border-left:3px solid ${c}"></div></div>
                <span class="hvz-ch-pct" style="color:${c}">${v}%</span>
              </div>`).join('')}
            </div>
          </div>
        </div>
        <!-- floating badges -->
        <div class="hvz-badge" style="top:-18px;right:28px;animation-delay:0.3s">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${t('Brand Safety Verified','品牌安全已验证')}</span>
        </div>
        <div class="hvz-badge" style="bottom:28px;left:-14px;animation-delay:0.6s">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          <span>${t('&lt;80ms Bid Response','&lt;80ms竞价响应')}</span>
        </div>
        <div class="hvz-badge" style="top:48%;right:-24px;animation-delay:0.9s">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C084FC" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>${t('Real-time Bidding','实时竞价')}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- METRICS -->
  ${metricsBand([
    ['$12B+', 'Annual Ad Spend Managed', '年广告支出管理'],
    ['50B+', 'Daily Bid Requests', '每日竞价请求'],
    ['150+', 'Countries & Territories', '国家和地区'],
    ['99.98%', 'Platform Uptime SLA', '平台在线率SLA'],
  ])}

  <!-- PLATFORMS -->
  <section class="section section-dark">
    <div class="container">
      <div class="text-center mb-12">
        ${sectionTag('Our Platforms', '我们的平台')}
        <h2 class="section-headline">${t('The Full Programmatic Stack', '完整的程序化广告技术栈')}</h2>
        <p class="section-sub center">${t('Three powerful, interconnected platforms designed to serve every participant in the programmatic advertising ecosystem.',
           '三个强大、相互连接的平台，为程序化广告生态系统中的每个参与者提供服务。')}</p>
      </div>
      <div class="card-grid card-grid-3">
        <!-- DSP -->
        <div class="platform-card dsp">
          <div class="platform-tag">DSP</div>
          <div class="platform-body">
            <h3>${t('NexBids DSP', 'NexBids DSP')}</h3>
            <p>${t('Demand-Side Platform. AI-powered buying platform with global reach, premium inventory access, and advanced audience targeting across every digital channel.',
                 '需求方平台。AI驱动的购买平台，覆盖全球，可访问优质广告资源，在每个数字渠道提供高级受众定向。')}</p>
            <div class="platform-stats">
              <span class="stat-badge">50K+ ${t('Advertisers', '广告主')}</span>
              <span class="stat-badge">${t('30+ Ad Formats', '30+广告格式')}</span>
            </div>
            <ul class="feature-list">
              <li>${t('AI Bidding & ROAS Optimizer', 'AI竞价与ROAS优化器')}</li>
              <li>${t('300+ Audience Segments', '300+受众细分')}</li>
              <li>${t('Real-Time Analytics Dashboard', '实时分析仪表盘')}</li>
              <li>${t('Third-Party MMP Integration', '第三方MMP集成')}</li>
            </ul>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary" style="width:100%" onclick="navigate('products-dsp')">${t('Explore DSP →', '探索 DSP →')}</button>
          </div>
        </div>
        <!-- ADX -->
        <div class="platform-card adx">
          <div class="platform-tag">ADX</div>
          <div class="platform-body">
            <h3>${t('NexBids ADX', 'NexBids ADX')}</h3>
            <p>${t('Ad Exchange. The neutral, high-performance marketplace connecting premium supply with quality demand — built for speed, scale, and trust.',
                 '广告交易中枢。连接优质供应与高质量需求的中立高性能市场——专为速度、规模和信任而构建。')}</p>
            <div class="platform-stats">
              <span class="stat-badge purple">50B+ ${t('Daily Auctions', '日竞价')}</span>
              <span class="stat-badge purple">&lt;100ms ${t('Bid Response', '竞价响应')}</span>
            </div>
            <ul class="feature-list">
              <li>${t('OpenRTB 2.6 Compliant', 'OpenRTB 2.6 合规')}</li>
              <li>${t('Header Bidding & PMP Support', '头部竞价与PMP支持')}</li>
              <li>${t('AI-Powered Fraud Detection', 'AI驱动的欺诈检测')}</li>
              <li>${t('Real-Time Quality Scoring', '实时质量评分')}</li>
            </ul>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary" style="width:100%;background:linear-gradient(135deg,#7C3AED,#8B5CF6)" onclick="navigate('products-adx')">${t('Explore ADX →', '探索 ADX →')}</button>
          </div>
        </div>
        <!-- SSP -->
        <div class="platform-card ssp">
          <div class="platform-tag">SSP</div>
          <div class="platform-body">
            <h3>${t('NexBids SSP', 'NexBids SSP')}</h3>
            <p>${t('Supply-Side Platform. Maximize your ad revenue with intelligent yield optimization, header bidding, and direct access to thousands of premium advertisers worldwide.',
                 '供应方平台。通过智能收益优化、头部竞价以及直接访问全球数千家优质广告主，最大化您的广告收益。')}</p>
            <div class="platform-stats">
              <span class="stat-badge green">30K+ ${t('Publishers', '发布商')}</span>
              <span class="stat-badge green">+52% ${t('Avg eCPM Lift', '平均eCPM提升')}</span>
            </div>
            <ul class="feature-list">
              <li>${t('Prebid.js Header Bidding', 'Prebid.js 头部竞价')}</li>
              <li>${t('iOS & Android SDK', 'iOS 和 Android SDK')}</li>
              <li>${t('Floor Price AI Optimizer', '底价AI优化器')}</li>
              <li>${t('PMP & Programmatic Direct', 'PMP与程序化直购')}</li>
            </ul>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary" style="width:100%;background:linear-gradient(135deg,#059669,#10B981)" onclick="navigate('products-ssp')">${t('Explore SSP →', '探索 SSP →')}</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SOLUTIONS -->
  <section class="section section-subtle">
    <div class="container">
      <div class="text-center mb-12">
        ${sectionTag('Who We Serve', '我们服务谁')}
        <h2 class="section-headline">${t('Built for Every Participant in the Ecosystem', '为生态系统中的每个参与者而构建')}</h2>
      </div>
      <div class="card-grid card-grid-3">
        <div class="card" style="cursor:pointer" onclick="navigate('solutions-advertiser')">
          <div style="margin-bottom:16px">${gIcon('trending','blue','lg')}</div>
          <h3 style="font-size:20px;font-weight:700;margin-bottom:10px">${t('Advertisers', '广告主')}</h3>
          <p style="color:var(--text-secondary);font-size:14px;margin-bottom:16px">${t('E-commerce, gaming studios, app developers, and brand marketers looking to acquire users and drive revenue globally.',
             '电商、游戏工作室、应用开发者和品牌营销人员，希望在全球范围内获取用户并增加收益。')}</p>
          <span class="btn-ghost">${t('Learn More →', '了解更多 →')}</span>
        </div>
        <div class="card" style="cursor:pointer" onclick="navigate('solutions-publisher')">
          <div style="margin-bottom:16px">${gIcon('dollar','green','lg')}</div>
          <h3 style="font-size:20px;font-weight:700;margin-bottom:10px">${t('Publishers & Developers', '发布商与开发者')}</h3>
          <p style="color:var(--text-secondary);font-size:14px;margin-bottom:16px">${t('Website owners, mobile app developers, game studios, and digital media companies seeking to maximize ad revenue.',
             '网站所有者、移动应用开发者、游戏工作室和数字媒体公司，希望最大化广告收益。')}</p>
          <span class="btn-ghost">${t('Learn More →', '了解更多 →')}</span>
        </div>
        <div class="card" style="cursor:pointer" onclick="navigate('solutions-agency')">
          <div style="margin-bottom:16px">${gIcon('handshake','purple','lg')}</div>
          <h3 style="font-size:20px;font-weight:700;margin-bottom:10px">${t('Agencies', '代理商')}</h3>
          <p style="color:var(--text-secondary);font-size:14px;margin-bottom:16px">${t('Full-service and performance agencies managing programmatic campaigns for multiple advertiser clients worldwide.',
             '为全球多个广告主客户管理程序化营销活动的全服务和绩效代理商。')}</p>
          <span class="btn-ghost">${t('Learn More →', '了解更多 →')}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- TECHNOLOGY HIGHLIGHTS -->
  <section class="section section-dark">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center" class="home-tech-grid">
        <div>
          ${sectionTag('Technology', '技术优势')}
          <h2 class="section-headline">${t('Built on a Foundation of', '建立在')}<br><span class="gradient-text">${t('Intelligence & Scale', '智能与规模的基础上')}</span></h2>
          <p class="section-sub" style="margin-bottom:32px">${t('Our proprietary AI/ML infrastructure processes 50 billion bid requests daily, making real-time optimization decisions in under 100 milliseconds.',
             '我们的专有AI/ML基础设施每天处理500亿次竞价请求，在100毫秒内做出实时优化决策。')}</p>
          <div style="display:flex;flex-direction:column;gap:16px">
            ${[
              [gIcon('zap','blue','sm'), 'Sub-100ms Bid Processing', '100毫秒内竞价处理', 'Real-time decisioning at global scale with 99.98% uptime guarantee.', '全球规模实时决策，99.98%在线率保证。'],
              [gIcon('brain','purple','sm'), 'AI/ML Optimization Engine', 'AI/ML优化引擎', 'Deep learning models continuously optimize bids, budgets, and audience targeting.', '深度学习模型持续优化竞价、预算和受众定向。'],
              [gIcon('lock','green','sm'), 'Privacy-First Architecture', '隐私优先架构', 'Cookieless targeting solutions ready for a privacy-compliant future.', '无Cookie定向解决方案，为隐私合规未来做好准备。'],
            ].map(([icon, en, zh, enD, zhD]) => `
            <div style="display:flex;gap:16px;align-items:flex-start">
              ${icon}
              <div><div style="font-weight:600;margin-bottom:4px">${t(en, zh)}</div><div style="font-size:14px;color:var(--text-secondary)">${t(enD, zhD)}</div></div>
            </div>`).join('')}
          </div>
          <button class="btn btn-secondary" style="margin-top:32px" onclick="navigate('technology')">${t('View Full Technology Stack →', '查看完整技术栈 →')}</button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          ${[
            ['50B+', 'Daily Bid Requests', '每日竞价请求', 'var(--accent-dsp)'],
            ['<100ms', 'Bid Response Time', '竞价响应时间', 'var(--accent-adx)'],
            ['99.98%', 'Platform Uptime', '平台在线率', 'var(--accent-ssp)'],
            ['150+', 'Data Centers', '数据中心', '#F59E0B'],
          ].map(([n, en, zh, c]) => `
          <div class="card" style="text-align:center;padding:24px">
            <div style="font-size:32px;font-weight:900;color:${c};letter-spacing:-1px;margin-bottom:8px">${n}</div>
            <div style="font-size:13px;color:var(--text-secondary)">${t(en, zh)}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- CASE STUDIES PREVIEW -->
  <section class="section section-subtle">
    <div class="container">
      <div class="text-center mb-12">
        ${sectionTag('Case Studies', '客户案例')}
        <h2 class="section-headline">${t('Real Results from Real Partners', '来自真实合作伙伴的真实成果')}</h2>
      </div>
      <div class="card-grid card-grid-3">
        ${[
          ['E-Commerce', '电商', 'Global Fashion Brand — ROAS Transformation', '全球时尚品牌——ROAS转型', 'ROAS improved from 1.4x to 4.2x in 90 days with AI bidding and dynamic creative.', 'AI竞价和动态创意在90天内将ROAS从1.4x提升至4.2x。', ['ROAS +200%', 'CPA -54%', 'Revenue +400%']],
          ['Mobile Gaming', '移动游戏', 'Top Mobile RPG — Scale & Quality', '顶级移动RPG——规模与质量', 'Acquired 2.3M new players while improving D30 retention by 38% using playable ads.', '使用可试玩广告获取了230万新玩家，同时将D30留存率提升了38%。', ['2.3M Players', 'D30 Ret +38%', 'CPI -41%']],
          ['Publisher', '发布商', 'Regional News Network — eCPM Growth', '区域新闻网络——eCPM增长', 'Header bidding implementation drove 67% eCPM increase and $2.4M incremental annual revenue.', '头部竞价实施推动eCPM提升67%，带来240万美元的额外年收入。', ['eCPM +67%', '+$2.4M/yr', 'Fill +23%']],
        ].map(([industry, industryZh, title, titleZh, desc, descZh, badges]) => `
        <div class="case-card" onclick="navigate('case-studies')">
          <div class="case-card-top">
            <div class="case-industry">${t(industry, industryZh)}</div>
            <h3>${t(title, titleZh)}</h3>
            <p>${t(desc, descZh)}</p>
          </div>
          <div class="case-metrics">${badges.map(b => `<span class="case-metric-badge">${b}</span>`).join('')}</div>
        </div>`).join('')}
      </div>
      <div style="text-align:center;margin-top:36px">
        <button class="btn btn-secondary" onclick="navigate('case-studies')">${t('View All Case Studies →', '查看所有案例 →')}</button>
      </div>
    </div>
  </section>

  <!-- PARTNERS -->
  ${renderPartnersSection()}

  <!-- CTA -->
  ${ctaBand(
    'Ready to Transform Your Advertising?', '准备好改变您的广告投放了吗？',
    'Join 50,000+ advertisers and 30,000+ publishers already using NexBids to drive growth.',
    '加入已在使用NexBids驱动增长的50,000+广告主和30,000+发布商。',
    'Start for Free', '免费开始',
    'Talk to Sales', '联系销售', 'contact'
  )}`;
}

/* ─────────────────────────────────────────────
   PARTNERS SECTION (used in home page)
───────────────────────────────────────────── */
function renderPartnersSection() {
  // Category rows: each row is an independent scrollable carousel
  const partnerRows = [
    {
      label: 'Advertisers & Brands',
      labelZh: '广告主与品牌',
      partners: [
        { name: 'Shopify', abbr: 'SHO', color: '#95BF47', bg: 'rgba(149,191,71,0.1)' },
        { name: 'Samsung Ads', abbr: 'SA', color: '#1428A0', bg: 'rgba(20,40,160,0.13)' },
        { name: 'Lazada', abbr: 'LZD', color: '#F57732', bg: 'rgba(245,119,50,0.1)' },
        { name: 'Grab', abbr: 'GRB', color: '#00B14F', bg: 'rgba(0,177,79,0.1)' },
        { name: 'Booking.com', abbr: 'BKG', color: '#003580', bg: 'rgba(0,53,128,0.13)' },
        { name: 'Rakuten', abbr: 'RAK', color: '#BF0000', bg: 'rgba(191,0,0,0.1)' },
        { name: 'Zalora', abbr: 'ZLR', color: '#FF0074', bg: 'rgba(255,0,116,0.1)' },
        { name: 'Sea Group', abbr: 'SEA', color: '#EE4D2D', bg: 'rgba(238,77,45,0.1)' },
        { name: 'Tokopedia', abbr: 'TKP', color: '#42B549', bg: 'rgba(66,181,73,0.1)' },
        { name: 'Traveloka', abbr: 'TVL', color: '#0069B9', bg: 'rgba(0,105,185,0.12)' },
      ]
    },
    {
      label: 'Media & Publishers',
      labelZh: '媒体与发布商',
      partners: [
        { name: 'Dailymotion', abbr: 'DLM', color: '#9CA3AF', bg: 'rgba(156,163,175,0.1)' },
        { name: 'Opera', abbr: 'OPR', color: '#FF1B2D', bg: 'rgba(255,27,45,0.1)' },
        { name: 'InMobi', abbr: 'INM', color: '#F5A623', bg: 'rgba(245,166,35,0.1)' },
        { name: 'AliExpress', abbr: 'AEX', color: '#FF4747', bg: 'rgba(255,71,71,0.1)' },
        { name: 'MoPub', abbr: 'MPB', color: '#1DA1F2', bg: 'rgba(29,161,242,0.1)' },
        { name: 'Digital Turbine', abbr: 'DTB', color: '#00B0FF', bg: 'rgba(0,176,255,0.1)' },
        { name: 'Verizon Media', abbr: 'VMD', color: '#CD040B', bg: 'rgba(205,4,11,0.1)' },
        { name: 'Outbrain', abbr: 'OTB', color: '#FF5F0F', bg: 'rgba(255,95,15,0.1)' },
        { name: 'Taboola', abbr: 'TAB', color: '#4A90E2', bg: 'rgba(74,144,226,0.1)' },
      ]
    },
    {
      label: 'Measurement & Analytics',
      labelZh: '监测与数据分析',
      partners: [
        { name: 'AppsFlyer', abbr: 'AF', color: '#0073E6', bg: 'rgba(0,115,230,0.1)' },
        { name: 'Adjust', abbr: 'ADJ', color: '#00C853', bg: 'rgba(0,200,83,0.1)' },
        { name: 'Branch', abbr: 'BRN', color: '#4C47DB', bg: 'rgba(76,71,219,0.1)' },
        { name: 'IAS', abbr: 'IAS', color: '#0090D4', bg: 'rgba(0,144,212,0.1)' },
        { name: 'DoubleVerify', abbr: 'DV', color: '#8B9FD4', bg: 'rgba(139,159,212,0.1)' },
        { name: 'Kochava', abbr: 'KOC', color: '#5D3FD3', bg: 'rgba(93,63,211,0.1)' },
        { name: 'MOAT', abbr: 'MOT', color: '#00509E', bg: 'rgba(0,80,158,0.1)' },
        { name: 'Singular', abbr: 'SGL', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)' },
      ]
    },
  ];

  const makeCard = (p) => `
    <div class="pcard">
      <div class="pcard-inner" style="background:${p.bg};border-color:${p.color}30">
        <div class="pcard-abbr" style="color:${p.color}">${p.abbr}</div>
        <div class="pcard-name">${p.name}</div>
      </div>
    </div>`;

  const makeRow = (row, idx) => `
    <div class="partner-carousel-row">
      <div class="partner-carousel-label">
        <span class="prow-tag">${t(row.label, row.labelZh)}</span>
      </div>
      <div class="partner-carousel-wrap">
        <button class="pcarousel-btn pcarousel-prev" onclick="scrollPartnerRow(${idx}, -1)" aria-label="Scroll left">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="partner-carousel-track" id="ptrack-${idx}">
          ${row.partners.map(makeCard).join('')}
        </div>
        <button class="pcarousel-btn pcarousel-next" onclick="scrollPartnerRow(${idx}, 1)" aria-label="Scroll right">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>`;

  return `
  <section class="section section-subtle partners-section" id="partners">
    <div class="container">
      <div class="text-center mb-12">
        ${sectionTag('Trusted Ecosystem', '受信赖的生态系统')}
        <h2 class="section-headline">${t('Our Global Partners', '我们的全球合作伙伴')}</h2>
        <p class="section-sub center">${t('Powering campaigns and monetization for 80,000+ brands, publishers, and technology partners across 150+ countries.',
          '为150+个国家的80,000+品牌、发布商和技术合作伙伴提供营销活动和变现服务。')}</p>
      </div>

      <!-- Partner carousel rows -->
      <div class="partner-carousels">
        ${partnerRows.map((row, i) => makeRow(row, i)).join('')}
      </div>

      <!-- Stats row -->
      <div class="partner-stats-row">
        ${[
          ['80K+', 'Global Partners', '全球合作伙伴'],
          ['150+', 'Countries', '覆盖国家'],
          ['Top 20', 'DSPs Connected', '对接头部DSP'],
          ['Premium', 'Quality Verified', '优质流量认证'],
        ].map(([num, en, zh]) => `
        <div class="partner-stat-item">
          <div class="partner-stat-num">${num}</div>
          <div class="partner-stat-label">${t(en, zh)}</div>
        </div>`).join('')}
      </div>

      <div class="text-center" style="margin-top:36px">
        <button class="btn btn-secondary" onclick="navigate('contact')">${t('Become a Partner →', '成为合作伙伴 →')}</button>
      </div>
    </div>
  </section>`;
}

window.scrollPartnerRow = function(idx, dir) {
  const track = document.getElementById('ptrack-' + idx);
  if (!track) return;
  const cardW = track.querySelector('.pcard')?.offsetWidth || 180;
  const scrollAmt = (cardW + 12) * 3;
  track.scrollBy({ left: dir * scrollAmt, behavior: 'smooth' });
};

/* ─────────────────────────────────────────────
   SOLUTIONS — OVERVIEW
───────────────────────────────────────────── */
function renderSolutionsOverview() {
  return `
  <div class="page-hero" style="background:var(--gradient-hero)">
    ${sectionTag('Solutions', '解决方案')}
    <h1>${t('Solutions for Every Role in the Ecosystem', '为生态系统中每个角色提供解决方案')}</h1>
    <p>${t('Whether you\'re an advertiser seeking global reach, a publisher maximizing revenue, or an agency scaling programmatic operations — NexBids has the solution.',
       '无论您是寻求全球覆盖的广告主、最大化收益的发布商，还是扩展程序化运营的代理商——NexBids 都有适合您的解决方案。')}</p>
  </div>
  <section class="section section-dark">
    <div class="container">
      <div class="card-grid card-grid-3">
        ${[
          ['solutions-advertiser','📈','Advertiser Launch Solutions','广告主投放解决方案','Scale programmatic campaigns globally with AI-driven DSP technology. Drive measurable ROAS, reduce CPA, and unlock new markets.','通过AI驱动的DSP技术在全球扩展程序化营销活动。提高可衡量的ROAS、降低CPA并开拓新市场。'],
          ['solutions-publisher','💰','Publisher & Developer Monetization','发布商/开发者变现解决方案','Maximize ad revenue from web, app, and game traffic with header bidding, SDK integration, and intelligent yield management.','通过头部竞价、SDK集成和智能收益管理，最大化网页、应用和游戏流量的广告收益。'],
          ['solutions-agency','🤝','Agency Cooperation Solutions','代理合作解决方案','Manage programmatic campaigns for all your clients from one unified platform. White-label options, volume pricing, and dedicated support.','从一个统一平台为所有客户管理程序化营销活动。提供白标选项、批量定价和专属支持。'],
        ].map(([pg, icon, en, zh, enD, zhD]) => `
        <div class="card" style="cursor:pointer" onclick="navigate('${pg}')">
          <div style="font-size:40px;margin-bottom:16px">${icon}</div>
          <h3 style="font-size:22px;font-weight:700;margin-bottom:12px">${t(en, zh)}</h3>
          <p style="color:var(--text-secondary);font-size:15px;margin-bottom:20px;line-height:1.7">${t(enD, zhD)}</p>
          <span class="btn-ghost">${t('View Solution →', '查看解决方案 →')}</span>
        </div>`).join('')}
      </div>
    </div>
  </section>
  ${ctaBand('Not Sure Where to Start?','不确定从哪里开始？',
    'Our team will help identify the right NexBids solution for your business goals.',
    '我们的团队将帮助您确定适合您业务目标的NexBids解决方案。',
    'Talk to a Specialist','与专家交谈','View Products','查看产品','products')}`;
}

/* ─────────────────────────────────────────────
   SOLUTIONS — ADVERTISER
───────────────────────────────────────────── */
function renderSolutionsAdvertiser() {
  return `
  <div class="page-hero" style="background:linear-gradient(135deg,rgba(37,99,235,0.12),var(--bg-dark))">
    <div class="breadcrumb"><a onclick="navigate('solutions')">Solutions</a> › <span>${t('Advertiser Launch Solutions','广告主投放解决方案')}</span></div>
    ${sectionTag('For Advertisers', '面向广告主')}
    <h1>${t('Launch, Scale & Optimise Campaigns Globally', '在全球范围内启动、扩展和优化营销活动')}</h1>
    <p>${t('NexBids DSP gives advertisers AI-powered tools to reach the right audiences across 150+ countries, drive measurable ROAS, and dominate every digital channel.',
       'NexBids DSP为广告主提供AI驱动的工具，在150+个国家触达正确的受众，推动可衡量的ROAS，主导每个数字渠道。')}</p>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="navigate('contact')">${t('Start Advertising','开始投放广告')}</button>
      <button class="btn btn-secondary" onclick="navigate('products-dsp')">${t('Explore NexBids DSP','探索 NexBids DSP')}</button>
    </div>
  </div>

  <!-- Who it's for -->
  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Who It\'s For','适用对象')}
      <h2 class="section-headline">${t('Built for Performance-Driven Advertisers','专为绩效驱动的广告主而构建')}</h2>
      <div class="card-grid card-grid-4" style="margin-top:32px">
        ${[
          [gIcon('barChart','blue','sm'),'E-Commerce Brands','电商品牌','Drive product sales with dynamic ads, retargeting, and cross-market campaigns.','通过动态广告、再营销和跨市场营销活动推动产品销售。'],
          [gIcon('gamepad','purple','sm'),'Mobile Gaming Studios','移动游戏工作室','Acquire high-LTV players with playable ads, rewarded video, and LTV-optimized bidding.','通过可试玩广告、激励视频和LTV优化竞价获取高价值玩家。'],
          [gIcon('smartphone','teal','sm'),'App Developers','应用开发者','Scale installs and in-app events with precise targeting and MMP integration.','通过精准定向和MMP集成扩展安装量和应用内事件。'],
          [gIcon('star','amber','sm'),'Brand Advertisers','品牌广告主','Build awareness and drive consideration with premium display and video campaigns.','通过优质展示和视频营销活动建立品牌知名度并推动消费考虑。'],
        ].map(([icon,en,zh,enD,zhD])=>`
        <div class="card">
          <div style="margin-bottom:14px">${icon}</div>
          <h3 style="font-size:16px;font-weight:700;margin-bottom:8px">${t(en,zh)}</h3>
          <p style="font-size:13px;color:var(--text-secondary)">${t(enD,zhD)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Core Features -->
  <section class="section section-dark">
    <div class="container">
      ${sectionTag('Core Capabilities','核心能力')}
      <h2 class="section-headline">${t('Everything You Need to Win in Programmatic','在程序化广告中取胜所需的一切')}</h2>
      <div class="pillar-grid" style="margin-top:40px">
        ${[
          [gIcon('target','blue'), 'rgba(37,99,235,0.15)', 'Precision Audience Targeting','精准受众定向','300+ audience segments, first-party data activation, lookalike modeling, and contextual targeting across 150+ countries.','300+受众细分、第一方数据激活、相似人群建模和覆盖150+国家的场景定向。'],
          [gIcon('brain','purple'), 'rgba(124,58,237,0.15)', 'AI Bidding & ROAS Optimizer','AI竞价与ROAS优化器','Set your ROAS target and let NexBids\' machine learning engine dynamically optimize every bid in real time.','设置您的ROAS目标，让NexBids的机器学习引擎实时动态优化每次竞价。'],
          [gIcon('palette','green'), 'rgba(5,150,105,0.15)', 'Dynamic Creative Optimization','动态创意优化','Automatically assemble and serve the most effective ad creative for each user based on context, behavior, and history.','根据场景、行为和历史记录，自动为每位用户组装和投放最有效的广告创意。'],
          [gIcon('chart','amber'), 'rgba(245,158,11,0.15)', 'Advanced Analytics & Reporting','高级分析与报告','Real-time performance dashboards with custom KPI tracking, attribution reports, and audience insights.','实时绩效仪表盘，支持自定义KPI跟踪、归因报告和受众洞察。'],
          [gIcon('globe','red'), 'rgba(239,68,68,0.15)', 'Multi-Market Campaign Management','多市场营销活动管理','Launch, manage, and optimize campaigns across multiple countries simultaneously with localized creative and targeting.','同时在多个国家启动、管理和优化营销活动，支持本地化创意和定向。'],
          [gIcon('shield','teal'), 'rgba(16,185,129,0.15)', 'Brand Safety & Fraud Protection','品牌安全与欺诈防护','Pre-bid filtering, third-party verification (IAS, DoubleVerify), and AI-powered IVT detection.','竞价前过滤、第三方验证（IAS、DoubleVerify）和AI驱动的无效流量检测。'],
        ].map(([icon,bg,en,zh,enD,zhD])=>pillarCard(icon,bg,en,zh,enD,zhD)).join('')}
      </div>
    </div>
  </section>

  <!-- Results -->
  ${metricsBand([
    ['+47%','Avg ROAS Improvement Year 1','第一年平均ROAS提升'],
    ['-38%','Average CPA Reduction','平均CPA降低'],
    ['150+','Countries & Territories','国家和地区'],
    ['30+','Ad Formats Supported','支持的广告格式'],
  ])}

  ${ctaBand('Ready to Scale Your Campaigns?','准备好扩展您的营销活动了吗？',
    'Start with a free account or talk to our team about managed service options.',
    '免费开始或与我们的团队讨论托管服务选项。',
    'Create Free Account','创建免费账户','Talk to Sales','联系销售','contact')}`;
}

/* ─────────────────────────────────────────────
   SOLUTIONS — PUBLISHER
───────────────────────────────────────────── */
function renderSolutionsPublisher() {
  return `
  <div class="page-hero" style="background:linear-gradient(135deg,rgba(5,150,105,0.12),var(--bg-dark))">
    <div class="breadcrumb"><a onclick="navigate('solutions')">Solutions</a> › <span>${t('Publisher & Developer Monetization','发布商/开发者变现解决方案')}</span></div>
    ${sectionTag('For Publishers & Developers','面向发布商与开发者','green')}
    <h1>${t('Maximize Your Ad Revenue with Intelligent Monetization', '用智能变现最大化您的广告收益')}</h1>
    <p>${t('NexBids SSP connects your inventory to 50,000+ premium advertisers worldwide, delivering higher eCPMs through header bidding, AI floor optimization, and direct deal access.',
       'NexBids SSP将您的广告资源连接至全球50,000+优质广告主，通过头部竞价、AI底价优化和直接交易访问，提供更高的eCPM。')}</p>
    <div class="btn-group">
      <button class="btn btn-primary" style="background:linear-gradient(135deg,#059669,#10B981)" onclick="navigate('contact')">${t('Start Monetizing','开始变现')}</button>
      <button class="btn btn-secondary" onclick="navigate('products-ssp')">${t('Explore NexBids SSP','探索 NexBids SSP')}</button>
    </div>
  </div>

  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Publisher Types','发布商类型','green')}
      <h2 class="section-headline">${t('Solutions for Every Publisher Format','针对每种发布商格式的解决方案')}</h2>
      <div class="card-grid card-grid-4" style="margin-top:32px">
        ${[
          [gIcon('globe','blue','sm'),'Web Publishers','网站发布商','News, content sites, and blogs monetizing desktop and mobile web traffic with display, native, and video ads.','通过展示、原生和视频广告将桌面和移动网络流量变现的新闻、内容网站和博客。'],
          [gIcon('smartphone','purple','sm'),'Mobile App Developers','移动应用开发者','Utility, lifestyle, and productivity app developers integrating banner, interstitial, and native ads via SDK.','通过SDK集成横幅、插页式和原生广告的工具、生活方式和生产力应用开发者。'],
          [gIcon('gamepad','green','sm'),'Game Developers','游戏开发者','Mobile and PC game studios implementing rewarded video, playable ads, and interstitials for revenue without disruption.','实施激励视频、可试玩广告和插页式广告的移动和PC游戏工作室。'],
          [gIcon('tv','amber','sm'),'OTT / CTV Publishers','OTT/CTV发布商','Streaming video platforms and connected TV apps monetizing premium video content with programmatic video and CTV ads.','通过程序化视频和CTV广告将优质视频内容变现的流媒体平台和联网TV应用。'],
        ].map(([icon,en,zh,enD,zhD])=>`
        <div class="card">
          <div style="margin-bottom:14px">${icon}</div>
          <h3 style="font-size:16px;font-weight:700;margin-bottom:8px">${t(en,zh)}</h3>
          <p style="font-size:13px;color:var(--text-secondary)">${t(enD,zhD)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section-dark">
    <div class="container">
      ${sectionTag('Core Features','核心功能','green')}
      <h2 class="section-headline">${t('Yield Optimization Built for Maximum Revenue','专为最大化收益而构建的收益优化')}</h2>
      <div class="pillar-grid" style="margin-top:40px">
        ${[
          [gIcon('zap','green'),'rgba(5,150,105,0.15)','Header Bidding (Prebid.js)','头部竞价（Prebid.js）','Implement NexBids as a demand partner in your Prebid.js stack for real-time competitive bidding from 50,000+ advertisers.','将NexBids作为需求合作伙伴添加至您的Prebid.js技术栈，来自50,000+广告主的实时竞争性竞价。'],
          [gIcon('brain','blue'),'rgba(37,99,235,0.15)','AI Floor Price Optimizer','AI底价优化器','Machine learning engine that dynamically adjusts floor prices per ad request to maximize revenue without sacrificing fill.','机器学习引擎，动态调整每个广告请求的底价，在不牺牲填充率的情况下最大化收益。'],
          [gIcon('link','purple'),'rgba(124,58,237,0.15)','SDK for iOS, Android & Unity','iOS/Android/Unity SDK','Lightweight SDKs supporting banner, interstitial, rewarded video, and native formats with simple integration.','轻量级SDK，支持横幅、插页式、激励视频和原生格式，集成简单。'],
          [gIcon('handshake','amber'),'rgba(245,158,11,0.15)','PMP & Programmatic Direct','PMP与程序化直购','Create private marketplace deals and programmatic guaranteed deals directly with premium advertisers at negotiated CPMs.','以协商好的CPM与优质广告主直接创建私有市场交易和程序化保证交易。'],
          [gIcon('chart','red'),'rgba(239,68,68,0.15)','Real-Time Analytics','实时分析','Granular revenue reporting by format, placement, geography, and device with custom dashboard building.','按格式、广告位、地区和设备细分的收益报告，支持自定义仪表盘构建。'],
          [gIcon('shield','teal'),'rgba(16,185,129,0.15)','Ad Quality Management','广告质量管理','Block unwanted ad categories, ensure brand safety, and maintain user experience with comprehensive ad quality controls.','通过全面的广告质量控制，屏蔽不需要的广告类别、确保品牌安全并维护用户体验。'],
        ].map(([icon,bg,en,zh,enD,zhD])=>pillarCard(icon,bg,en,zh,enD,zhD)).join('')}
      </div>
    </div>
  </section>

  ${metricsBand([
    ['+52%','Avg eCPM Lift for New Publishers','新发布商平均eCPM提升'],
    ['30K+','Active Publishers','活跃发布商'],
    ['50K+','Connected Advertisers','连接广告主'],
    ['99.5%+','Average Fill Rate','平均填充率'],
  ])}

  ${ctaBand('Ready to Grow Your Revenue?','准备好增加您的收益了吗？',
    'Join 30,000+ publishers already maximizing revenue with NexBids SSP.',
    '加入已在使用NexBids SSP最大化收益的30,000+发布商。',
    'Get Started Free','免费开始','Explore SSP','探索SSP','products-ssp')}`;
}

/* ─────────────────────────────────────────────
   SOLUTIONS — AGENCY
───────────────────────────────────────────── */
function renderSolutionsAgency() {
  return `
  <div class="page-hero" style="background:linear-gradient(135deg,rgba(124,58,237,0.12),var(--bg-dark))">
    <div class="breadcrumb"><a onclick="navigate('solutions')">Solutions</a> › <span>${t('Agency Cooperation Solutions','代理合作解决方案')}</span></div>
    ${sectionTag('For Agencies','面向代理商','purple')}
    <h1>${t('One Platform. All Your Clients. Maximum Performance.','一个平台。所有客户。最佳绩效。')}</h1>
    <p>${t('NexBids Agency Solutions give performance and full-service agencies the tools, pricing, and support to win more clients and deliver exceptional programmatic results.',
       'NexBids代理商解决方案为绩效和全服务代理商提供工具、定价和支持，帮助赢得更多客户并提供卓越的程序化成果。')}</p>
    <div class="btn-group">
      <button class="btn btn-primary" style="background:linear-gradient(135deg,#7C3AED,#8B5CF6)" onclick="navigate('contact')">${t('Apply for Agency Partnership','申请代理商合作')}</button>
      <button class="btn btn-secondary" onclick="navigate('products-dsp')">${t('Explore NexBids DSP','探索 NexBids DSP')}</button>
    </div>
  </div>

  <section class="section section-subtle">
    <div class="container">
      <div class="pillar-grid">
        ${[
          [gIcon('users','purple'),'rgba(124,58,237,0.15)','Multi-Client Management','多客户管理','Manage unlimited client accounts from a single agency seat. Separate reporting, budgets, and permissions per client.','从单一代理商席位管理无限客户账户。每个客户单独的报告、预算和权限。'],
          [gIcon('dollar','blue'),'rgba(37,99,235,0.15)','Volume Pricing & Rebates','批量定价与返利','Tiered pricing discounts based on managed spend. Quarterly rebate programs for top-tier agency partners.','基于管理支出的分级定价折扣。顶级代理商合作伙伴的季度返利计划。'],
          [gIcon('tag','green'),'rgba(5,150,105,0.15)','White-Label Option','白标选项','Offer programmatic advertising under your own brand with NexBids white-label platform options.','通过NexBids白标平台选项，在您自己的品牌下提供程序化广告服务。'],
          [gIcon('star','amber'),'rgba(245,158,11,0.15)','Dedicated Agency Support','专属代理商支持','Assigned agency account manager, priority technical support, and quarterly business reviews with NexBids leadership.','专属代理商客户经理、优先技术支持以及与NexBids领导层的季度业务回顾。'],
          [gIcon('barChart','red'),'rgba(239,68,68,0.15)','Custom Reporting & Dashboards','定制报告与仪表盘','Build client-facing dashboards with custom branding, KPIs, and data exports. API access for BI integration.','构建具有自定义品牌、KPI和数据导出的面向客户的仪表盘。提供BI集成的API访问。'],
          [gIcon('award','teal'),'rgba(16,185,129,0.15)','Agency Training & Certification','代理商培训与认证','NexBids Academy certification programs and live training sessions to upskill your programmatic team.','NexBids学院认证项目和现场培训课程，提升您的程序化团队技能。'],
        ].map(([icon,bg,en,zh,enD,zhD])=>pillarCard(icon,bg,en,zh,enD,zhD)).join('')}
      </div>
    </div>
  </section>

  ${ctaBand('Become a NexBids Agency Partner','成为NexBids代理商合作伙伴',
    'Apply today to access volume pricing, white-label options, and dedicated agency support.',
    '立即申请，获取批量定价、白标选项和专属代理商支持。',
    'Apply Now','立即申请','View Case Studies','查看案例','case-studies')}`;
}

/* ─────────────────────────────────────────────
   PRODUCTS — OVERVIEW
───────────────────────────────────────────── */
function renderProductsOverview() {
  return `
  <div class="page-hero" style="background:var(--gradient-hero)">
    ${sectionTag('Products','产品')}
    <h1>${t('Three Platforms. One Ecosystem.','三个平台。一个生态系统。')}</h1>
    <p>${t('NexBids\'s full-stack programmatic infrastructure — DSP, ADX, and SSP — works seamlessly together to power every side of the digital advertising marketplace.',
       'NexBids的全栈程序化广告基础设施——DSP、ADX和SSP——无缝协作，驱动数字广告市场的每一方。')}</p>
  </div>
  <section class="section section-dark">
    <div class="container">
      <div style="display:flex;flex-direction:column;gap:48px">
        ${[
          ['dsp','products-dsp','DSP','Demand-Side Platform','需求方平台','#2563EB','For Advertisers & Agencies','面向广告主和代理商','The AI-powered demand-side platform that helps advertisers reach their audiences with precision and scale across every digital channel worldwide.','AI驱动的需求方平台，帮助广告主在全球每个数字渠道以精准和规模触达其受众。',
           [['50K+','Active Advertisers','活跃广告主'],['30+','Ad Formats','广告格式'],['150+','Countries','国家'],['<100ms','Bid Response','竞价响应']]],
          ['adx','products-adx','ADX','Ad Exchange','广告交易中枢','#7C3AED','For All Ecosystem Participants','面向所有生态系统参与者','The neutral, high-performance marketplace where premium supply meets quality demand — with real-time auctions, header bidding, and direct deal infrastructure at global scale.','中立的高性能市场，优质供应与高质量需求相遇——全球规模的实时拍卖、头部竞价和直接交易基础设施。',
           [['50B+','Daily Auctions','日竞价'],['<100ms','Latency','延迟'],['98%+','Bid Win Transparency','竞价透明度'],['10K+','Integrated Partners','集成合作伙伴']]],
          ['ssp','products-ssp','SSP','Supply-Side Platform','供应方平台','#059669','For Publishers & Developers','面向发布商与开发者','The yield-optimizing supply platform that connects publishers and developers to the world\'s best demand sources, maximizing revenue through intelligent automation and header bidding.',
           '收益优化供应平台，将发布商和开发者与全球最佳需求来源连接，通过智能自动化和头部竞价最大化收益。',
           [['30K+','Publishers','发布商'],['+52%','Avg eCPM Lift','平均eCPM提升'],['99.5%+','Fill Rate','填充率'],['SDK','iOS/Android/Unity','SDK支持']]],
        ].map(([type,pg,tag,en,zh,color,forEn,forZh,descEn,descZh,stats])=>`
        <div class="platform-card ${type}" style="display:grid;grid-template-columns:1fr auto;gap:32px;align-items:start">
          <div>
            <div class="platform-tag">${tag} — ${t(en,zh)}</div>
            <h2 style="font-size:28px;font-weight:800;margin-bottom:8px">NexBids ${tag}</h2>
            <div style="font-size:13px;color:var(--text-muted);margin-bottom:16px">${t(forEn,forZh)}</div>
            <p style="color:var(--text-secondary);font-size:15px;line-height:1.7;margin-bottom:24px;max-width:600px">${t(descEn,descZh)}</p>
            <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:24px">
              ${stats.map(([n,en,zh])=>`<div style="text-align:center;padding:12px 16px;background:rgba(255,255,255,0.04);border-radius:10px"><div style="font-size:22px;font-weight:800;color:${color}">${n}</div><div style="font-size:12px;color:var(--text-secondary);margin-top:2px">${t(en,zh)}</div></div>`).join('')}
            </div>
            <button class="btn btn-primary" style="background:linear-gradient(135deg,${color},${color}bb)" onclick="navigate('${pg}')">${t(`Explore ${tag} →`,`探索 ${tag} →`)}</button>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
}

/* ─────────────────────────────────────────────
   PRODUCT — DSP
───────────────────────────────────────────── */
function renderProductsDSP() {
  return `
  <div class="page-hero" style="background:linear-gradient(135deg,rgba(37,99,235,0.15),var(--bg-dark))">
    <div class="breadcrumb"><a onclick="navigate('products')">Products</a> › <span>NexBids DSP</span></div>
    ${sectionTag('DSP — Demand-Side Platform','DSP — 需求方平台')}
    <h1>NexBids DSP</h1>
    <p>${t('The AI-powered demand-side platform built for performance. Reach the right audiences across 150+ countries, optimize to your KPIs in real time, and scale campaigns with confidence.',
       'AI驱动的绩效需求方平台。在150+个国家触达正确的受众，实时优化您的KPI，并自信地扩展营销活动。')}</p>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="navigate('login-dsp')">${t('Login to DSP','登录DSP')}</button>
      <button class="btn btn-secondary" onclick="navigate('contact')">${t('Request Demo','申请演示')}</button>
    </div>
  </div>

  ${metricsBand([
    ['50K+','Active Advertisers','活跃广告主'],
    ['30+','Ad Formats','广告格式'],
    ['300+','Audience Segments','受众细分'],
    ['150+','Countries Covered','覆盖国家'],
  ])}

  <!-- Core Features -->
  <section class="section section-dark">
    <div class="container">
      ${sectionTag('Platform Features','平台功能')}
      <h2 class="section-headline">${t('Every Tool You Need to Win in Programmatic','在程序化广告中取胜所需的每一个工具')}</h2>
      <div class="pillar-grid" style="margin-top:40px">
        ${[
          [gIcon('target','blue'),'rgba(37,99,235,0.12)','Precision Audience Targeting','精准受众定向','Demographics, interests, behavioral, contextual, first-party, lookalike, retargeting — 300+ segments across 150+ countries.','人口统计、兴趣、行为、场景、第一方数据、相似受众、再营销——150+国家的300+细分。'],
          [gIcon('brain','purple'),'rgba(124,58,237,0.12)','AI Bidding Engine','AI竞价引擎','ROAS Optimizer, CPA Bidder, Max Reach — machine learning models that continuously improve campaign performance.','ROAS优化器、CPA竞价器、最大覆盖——持续提升营销活动绩效的机器学习模型。'],
          [gIcon('palette','green'),'rgba(5,150,105,0.12)','Dynamic Creative Optimization','动态创意优化 (DCO)','Automatically assemble and test thousands of creative combinations; serve the winning ad to each user.','自动组装并测试数千种创意组合；向每位用户投放获胜广告。'],
          [gIcon('chart','amber'),'rgba(245,158,11,0.12)','Real-Time Analytics','实时分析','Customizable dashboards, attribution reporting (click, view, multi-touch), and audience insights updated every 15 minutes.','可定制仪表盘、归因报告（点击、浏览、多触点）和每15分钟更新的受众洞察。'],
          [gIcon('layers','red'),'rgba(239,68,68,0.12)','Multi-Format Ad Support','多格式广告支持','Display, video (in-stream, out-stream, CTV), native, audio, DOOH, playable, rewarded video — all in one platform.','展示、视频（前贴片、外置流、CTV）、原生、音频、DOOH、可试玩、激励视频——全在一个平台。'],
          [gIcon('link','teal'),'rgba(16,185,129,0.12)','MMP & Third-Party Integration','MMP与第三方集成','Native integrations with AppsFlyer, Adjust, Kochava, Singular, Branch, Google Analytics, and all major MMPs.','与AppsFlyer、Adjust、Kochava、Singular、Branch、Google Analytics和所有主要MMP的原生集成。'],
        ].map(([icon,bg,en,zh,enD,zhD])=>pillarCard(icon,bg,en,zh,enD,zhD)).join('')}
      </div>
    </div>
  </section>

  <!-- Ad Formats -->
  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Ad Formats','广告格式')}
      <h2 class="section-headline">${t('30+ Ad Formats Across Every Channel','跨每个渠道的30+广告格式')}</h2>
      <div class="card-grid card-grid-4" style="margin-top:32px">
        ${[
          [gIcon('monitor','blue'),'Display Ads','展示广告','Banner, rich media, expandable formats across web and app inventory.','网页和应用资源中的横幅、富媒体、可扩展格式。'],
          [gIcon('tv','purple'),'Video Ads','视频广告','In-stream (pre/mid/post roll), out-stream, rewarded video, and CTV/OTT.','前/中/后贴片、外置流、激励视频和CTV/OTT。'],
          [gIcon('newspaper','teal'),'Native Ads','原生广告','In-feed, content recommendation, and sponsored content formats that blend with the user experience.','与用户体验融合的信息流、内容推荐和赞助内容格式。'],
          [gIcon('gamepad','amber'),'Playable Ads','可试玩广告','Interactive mini-game ad units for gaming advertisers to showcase gameplay before install.','游戏广告主在安装前展示玩法的互动迷你游戏广告单元。'],
        ].map(([icon,en,zh,enD,zhD])=>`
        <div class="card" style="text-align:center">
          <div style="display:flex;justify-content:center;margin-bottom:12px">${icon}</div>
          <h3 style="font-size:16px;font-weight:700;margin-bottom:8px">${t(en,zh)}</h3>
          <p style="font-size:13px;color:var(--text-secondary)">${t(enD,zhD)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  ${ctaBand('Start Your First DSP Campaign','开始您的第一个DSP营销活动',
    'Set up your account in minutes and launch your first programmatic campaign today.',
    '几分钟内设置您的账户，今天就启动您的第一个程序化营销活动。',
    'Create Free Account','创建免费账户','Request Demo','申请演示','contact')}`;
}

/* ─────────────────────────────────────────────
   PRODUCT — ADX
───────────────────────────────────────────── */
function renderProductsADX() {
  return `
  <div class="page-hero" style="background:linear-gradient(135deg,rgba(124,58,237,0.15),var(--bg-dark))">
    <div class="breadcrumb"><a onclick="navigate('products')">Products</a> › <span>NexBids ADX</span></div>
    ${sectionTag('ADX — Ad Exchange','ADX — 广告交易中枢','purple')}
    <h1>NexBids ADX</h1>
    <p>${t('The high-performance, neutral ad exchange connecting premium supply with quality demand — processing 50 billion auctions daily with sub-100ms latency.',
       '高性能中立广告交易所，将优质供应与高质量需求相连——每天处理500亿次拍卖，延迟低于100毫秒。')}</p>
    <div class="btn-group">
      <button class="btn btn-primary" style="background:linear-gradient(135deg,#7C3AED,#8B5CF6)" onclick="navigate('login-adx')">${t('Login to ADX','登录ADX')}</button>
      <button class="btn btn-secondary" onclick="navigate('contact')">${t('Integration Inquiry','集成咨询')}</button>
    </div>
  </div>

  ${metricsBand([
    ['50B+','Daily Bid Requests','每日竞价请求'],
    ['<100ms','Bid Response SLA','竞价响应SLA'],
    ['10K+','Integrated Partners','集成合作伙伴'],
    ['98%+','Bid Transparency','竞价透明度'],
  ])}

  <section class="section section-dark">
    <div class="container">
      ${sectionTag('For Buyers','面向买方','purple')}
      <h2 class="section-headline">${t('Buy Premium Inventory at Scale','大规模购买优质广告资源')}</h2>
      <div class="pillar-grid" style="margin-top:40px">
        ${[
          [gIcon('server','purple'),'rgba(124,58,237,0.12)','OpenRTB 2.6 Integration','OpenRTB 2.6 集成','Full OpenRTB 2.6 compliant integration with comprehensive bid request/response documentation and sandbox environment.','完整的OpenRTB 2.6合规集成，提供全面的竞价请求/响应文档和沙盒环境。'],
          [gIcon('tag','blue'),'rgba(37,99,235,0.12)','Private Marketplace (PMP)','私有市场（PMP）','Access curated premium inventory packages through Private Marketplace deals at negotiated CPMs.','通过私有市场交易以协商好的CPM访问精选的优质广告资源包。'],
          [gIcon('handshake','green'),'rgba(5,150,105,0.12)','Programmatic Guaranteed','程序化保证','Secure guaranteed inventory volumes with fixed CPMs through Programmatic Guaranteed deal structures.','通过程序化保证交易结构以固定CPM确保保证库存量。'],
          [gIcon('barChart','amber'),'rgba(245,158,11,0.12)','Buyer Analytics Portal','买方分析门户','Real-time win rate analytics, inventory insights, and performance reporting across all ADX supply.','所有ADX供应的实时胜率分析、库存洞察和绩效报告。'],
        ].map(([icon,bg,en,zh,enD,zhD])=>pillarCard(icon,bg,en,zh,enD,zhD)).join('')}
      </div>
      <div style="margin-top:48px">
        ${sectionTag('For Sellers','面向卖方','green')}
        <h2 class="section-headline">${t('Monetize Every Impression at Maximum Value','以最大价值变现每一个广告展示')}</h2>
        <div class="pillar-grid" style="margin-top:32px">
          ${[
            [gIcon('gem','green'),'rgba(5,150,105,0.12)','Premium Demand Access','优质需求访问','Connect your inventory to 50,000+ global advertisers competing for every impression in real-time auctions.','将您的广告资源连接至50,000+全球广告主，在实时拍卖中竞争每一个展示。'],
            [gIcon('shield','red'),'rgba(239,68,68,0.12)','Supply Quality Protection','供应质量保护','IVT filtering, brand safety enforcement, and content quality scoring protect your inventory value and buyer relationships.','IVT过滤、品牌安全执行和内容质量评分保护您的库存价值和买方关系。'],
            [gIcon('settings','purple'),'rgba(124,58,237,0.12)','Floor Price Control','底价控制','Set global and publisher-specific floor prices with dynamic floor optimization to maximize revenue.','设置全局和发布商特定的底价，通过动态底价优化最大化收益。'],
          ].map(([icon,bg,en,zh,enD,zhD])=>pillarCard(icon,bg,en,zh,enD,zhD)).join('')}
        </div>
      </div>
    </div>
  </section>

  ${ctaBand('Integrate with NexBids ADX','与NexBids ADX集成',
    'Buyer or seller — our integration team will have you live in days.',
    '无论是买方还是卖方——我们的集成团队将在数天内让您上线。',
    'Start Integration','开始集成','View API Docs','查看API文档','resources')}`;
}

/* ─────────────────────────────────────────────
   PRODUCT — SSP
───────────────────────────────────────────── */
function renderProductsSSP() {
  return `
  <div class="page-hero" style="background:linear-gradient(135deg,rgba(5,150,105,0.15),var(--bg-dark))">
    <div class="breadcrumb"><a onclick="navigate('products')">Products</a> › <span>NexBids SSP</span></div>
    ${sectionTag('SSP — Supply-Side Platform','SSP — 供应方平台','green')}
    <h1>NexBids SSP</h1>
    <p>${t('The intelligent supply-side platform that maximizes publisher revenue through header bidding, AI yield optimization, direct deal access, and seamless SDK integration.',
       '智能供应方平台，通过头部竞价、AI收益优化、直接交易访问和无缝SDK集成，最大化发布商收益。')}</p>
    <div class="btn-group">
      <button class="btn btn-primary" style="background:linear-gradient(135deg,#059669,#10B981)" onclick="navigate('login-ssp')">${t('Login to SSP','登录SSP')}</button>
      <button class="btn btn-secondary" onclick="navigate('contact')">${t('Apply as Publisher','申请成为发布商')}</button>
    </div>
  </div>

  ${metricsBand([
    ['30K+','Active Publishers','活跃发布商'],
    ['+52%','Avg eCPM Improvement','平均eCPM提升'],
    ['99.5%+','Fill Rate Average','平均填充率'],
    ['$2.8B+','Publisher Revenue Managed','发布商收益管理'],
  ])}

  <section class="section section-dark">
    <div class="container">
      ${sectionTag('Monetization Features','变现功能','green')}
      <h2 class="section-headline">${t('The Complete Publisher Monetization Stack','完整的发布商变现技术栈')}</h2>
      <div class="pillar-grid" style="margin-top:40px">
        ${[
          [gIcon('zap','green'),'rgba(5,150,105,0.12)','Header Bidding (Prebid.js)','头部竞价（Prebid.js）','Industry-standard Prebid.js integration with server-side bidding option. Simple adapter configuration, tested with major wrapper setups.','行业标准Prebid.js集成，提供服务器端竞价选项。简单的适配器配置，经主要包装设置测试。'],
          [gIcon('smartphone','blue'),'rgba(37,99,235,0.12)','iOS & Android SDK','iOS与Android SDK','Lightweight, GDPR/CCPA compliant SDKs supporting banner, interstitial, rewarded video, native, and MRAID rich media.','轻量级、符合GDPR/CCPA的SDK，支持横幅、插页式、激励视频、原生和MRAID富媒体。'],
          [gIcon('gamepad','purple'),'rgba(124,58,237,0.12)','Unity & Game Engine Support','Unity与游戏引擎支持','NexBids Unity Plugin and Cocos2d-x support for game developers. Rewarded video, interstitial, and banner formats.','面向游戏开发者的NexBids Unity插件和Cocos2d-x支持。激励视频、插页式和横幅格式。'],
          [gIcon('brain','amber'),'rgba(245,158,11,0.12)','AI Floor Price Optimizer','AI底价优化器','Real-time floor price optimization per impression using ML models trained on billions of auction signals.','使用经数十亿拍卖信号训练的ML模型，对每个展示进行实时底价优化。'],
          [gIcon('handshake','red'),'rgba(239,68,68,0.12)','PMP & Direct Deals','PMP与直接交易','Create and manage private marketplace and programmatic guaranteed deals directly with premium advertisers.','直接与优质广告主创建和管理私有市场和程序化保证交易。'],
          [gIcon('tv','teal'),'rgba(16,185,129,0.12)','Video & CTV Monetization','视频与CTV变现','VAST/VPAID/SIMID compliant video monetization for web, in-app, and connected TV inventory.','符合VAST/VPAID/SIMID的视频变现，适用于网页、应用内和联网TV广告资源。'],
        ].map(([icon,bg,en,zh,enD,zhD])=>pillarCard(icon,bg,en,zh,enD,zhD)).join('')}
      </div>
    </div>
  </section>

  <!-- Integration Steps -->
  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Quick Integration','快速集成','green')}
      <h2 class="section-headline">${t('Live in Hours, Not Weeks','数小时上线，而非数周')}</h2>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px">
        ${[
          ['1','Create Account','创建账户','Sign up and complete publisher verification in under 10 minutes.','10分钟内注册并完成发布商验证。'],
          ['2','Add Your Inventory','添加您的广告资源','Define your ad units, formats, and floor price preferences in the publisher dashboard.','在发布商仪表盘中定义您的广告单元、格式和底价偏好。'],
          ['3','Integrate','集成','Copy our Prebid.js adapter config, install the SDK, or add our ad tag — your choice.','复制我们的Prebid.js适配器配置、安装SDK或添加我们的广告标签——您的选择。'],
          ['4','Start Earning','开始赚钱','Go live and watch revenue grow as NexBids connects your inventory to global demand.','上线后观察NexBids将您的广告资源连接至全球需求时收益的增长。'],
        ].map(([n,en,zh,enD,zhD])=>`
        <div class="card" style="text-align:center">
          <div class="step-circle">${n}</div>
          <h3 style="font-size:16px;font-weight:700;margin-bottom:8px">${t(en,zh)}</h3>
          <p style="font-size:13px;color:var(--text-secondary)">${t(enD,zhD)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  ${ctaBand('Ready to Maximize Your Revenue?','准备好最大化您的收益了吗？',
    'Join 30,000+ publishers using NexBids SSP. Get started in minutes.',
    '加入30,000+使用NexBids SSP的发布商。几分钟内开始。',
    'Apply as Publisher','申请成为发布商','View Integration Docs','查看集成文档','resources')}`;
}


/* ─────────────────────────────────────────────
   TECHNOLOGY PAGE
───────────────────────────────────────────── */
function renderTechnology() {
  return `
  <div class="page-hero" style="background:var(--gradient-hero)">
    ${sectionTag('Technology','技术优势')}
    <h1>${t('The Technology That Powers the Future of Programmatic Advertising','驱动程序化广告未来的技术基础')}</h1>
    <p>${t('NexBids is engineered from the ground up for speed, intelligence, and global scale. Our technology stack processes trillions of data signals daily, enabling smarter decisions, faster auctions, and better outcomes for every participant.',
       'NexBids从底层为速度、智能和全球规模而设计。我们的技术栈每天处理数万亿数据信号，为每个参与者实现更智能的决策、更快的竞价和更好的结果。')}</p>
  </div>

  ${metricsBand([
    ['50B+','Daily Bid Requests','每日竞价请求'],
    ['<100ms','Bid Response SLA','竞价响应SLA'],
    ['99.98%','Platform Uptime','平台在线率'],
    ['6','Global Data Center Regions','全球数据中心区域'],
  ])}

  <section class="section section-dark">
    <div class="container">
      ${sectionTag('Our Principles','我们的原则')}
      <h2 class="section-headline">${t('Technology Philosophy','技术理念')}</h2>
      <div class="card-grid card-grid-3" style="margin-top:40px">
        ${[
          [gIcon('brain','purple','md'),'Intelligent','智能的','Not just automated — genuinely smart. Our ML systems learn and improve continuously from every auction signal.','不仅仅是自动化，而是真正智能。我们的ML系统从每个竞价信号持续学习和改进。'],
          [gIcon('zap','blue','md'),'Fast','快速的','Millisecond-level decisions at global scale. Sub-100ms bid processing at 50B+ daily requests.','全球规模下毫秒级决策，不做任何妥协。在500亿+日请求下竞价处理低于100毫秒。'],
          [gIcon('eye','teal','md'),'Transparent','透明的','Every transaction, every fee, every data flow is visible and auditable. We have nothing to hide.','每笔交易、每项费用、每个数据流都可见且可审计。我们无需隐瞒任何事情。'],
          [gIcon('lock','green','md'),'Privacy-First','隐私优先的','Built for a world where user privacy is the default. Cookieless solutions, consent management, privacy-safe targeting.','为用户隐私是默认设置的世界而构建。无Cookie解决方案、同意管理、隐私安全定向。'],
          [gIcon('server','amber','md'),'Reliable','可靠的','Enterprise-grade infrastructure with 99.98% uptime SLA backed by 24/7 global engineering on-call.','99.98%在线率SLA，由24/7全球工程师值班支持的企业级基础设施。'],
          [gIcon('globe','red','md'),'Global','全球化的','6 data center regions. 150+ countries served. Local processing reduces latency for every participant worldwide.','6个数据中心区域，服务150+国家。本地处理为全球每个参与者降低延迟。'],
        ].map(([icon,en,zh,enD,zhD])=>`
        <div class="card" style="text-align:center">
          <div style="display:flex;justify-content:center;margin-bottom:12px">${icon}</div>
          <h3 style="font-size:17px;font-weight:700;margin-bottom:8px">${t(en,zh)}</h3>
          <p style="font-size:13px;color:var(--text-secondary)">${t(enD,zhD)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('AI & Machine Learning','AI与机器学习')}
      <h2 class="section-headline">${t('Six Proprietary ML Models at the Core','六大专有机器学习模型驱动核心')}</h2>
      <p class="section-sub" style="margin-bottom:40px">${t('Our AI platform processes trillions of historical auction signals to power real-time optimization across every dimension of programmatic advertising.','我们的AI平台处理数万亿历史竞价信号，驱动程序化广告各维度的实时优化。')}</p>
      <div class="card-grid card-grid-3">
        ${[
          ['Bid Price Prediction','竞价价格预测','Deep neural network, continuous online learning + batch retraining every 6 hours. <5% MAPE accuracy.','深度神经网络，持续在线学习+每6小时批量再训练，<5% MAPE精度。','#2563EB'],
          ['Conversion Probability','转化概率模型','Gradient-boosted tree ensemble on tens of billions of impression-to-conversion sequences. Multi-event support.','在数百亿次展示到转化序列上训练的梯度提升树集成，支持多事件转化。','#7C3AED'],
          ['CTR Prediction','CTR预测模型','Factorization machine + deep learning layers. <5ms inference latency at real-time bid evaluation.','因子分解机+深度学习层。竞价评估时推断延迟<5ms。','#059669'],
          ['Audience Similarity (Lookalike)','受众相似度（相似受众）','Graph neural network for user behavioral similarity. Configurable 1%–30% seed expansion.','用于用户行为相似度的图神经网络，可配置1%-30%种子扩展。','#F59E0B'],
          ['Yield Optimization (SSP)','收益优化（SSP端）','Multi-armed bandit + contextual signals for dynamic floor pricing, updated in real time.','多臂老虎机+上下文信号实现动态底价，实时更新。','#EF4444'],
          ['Fraud Detection','欺诈检测','Ensemble anomaly detection at impression, session, and publisher level. >99.8% precision, <0.1% FPR.','在展示、会话和发布商层面的集成异常检测，>99.8%精度，<0.1%误报率。','#06B6D4'],
        ].map(([en,zh,enD,zhD,color])=>`
        <div class="card">
          <div style="width:8px;height:8px;border-radius:50%;background:${color};margin-bottom:14px"></div>
          <h3 style="font-size:16px;font-weight:700;margin-bottom:8px">${t(en,zh)}</h3>
          <p style="font-size:13px;color:var(--text-secondary);line-height:1.6">${t(enD,zhD)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section-dark">
    <div class="container">
      ${sectionTag('RTB Infrastructure','实时竞价基础设施')}
      <h2 class="section-headline">${t('Global Real-Time Bidding at Scale','全球规模的实时竞价')}</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start;margin-top:40px" class="home-tech-grid">
        <div>
          ${[
            ['🌐','Global PoP Network','全球PoP网络','6 regional data center clusters (NA, EU, APAC-East, APAC-SE, MENA, LATAM) with 50+ Points of Presence worldwide.','6个区域数据中心集群，全球50+接入点。'],
            ['⚡','Sub-100ms Processing','100毫秒内处理','End-to-end bid request processing in under 100ms. NexCache (proprietary in-memory store) powers microsecond lookups.','端到端竞价请求处理低于100毫秒。NexCache（专有内存存储）支持微秒级查找。'],
            ['📡','OpenRTB 2.6 Native','OpenRTB 2.6 原生支持','Full OpenRTB 2.6 compliance plus NexBids Extensions. Header bidding via Prebid.js server-side adapter.','完整OpenRTB 2.6合规加上NexBids扩展。通过Prebid.js服务器端适配器支持头部竞价。'],
          ].map(([icon,en,zh,enD,zhD])=>`
          <div style="display:flex;gap:16px;margin-bottom:24px">
            <div style="font-size:24px;width:40px;flex-shrink:0">${icon}</div>
            <div><h4 style="font-weight:600;margin-bottom:6px">${t(en,zh)}</h4><p style="font-size:14px;color:var(--text-secondary)">${t(enD,zhD)}</p></div>
          </div>`).join('')}
        </div>
        <div>
          <table class="spec-table">
            <tr><td>${t('Processing Capacity','处理容量')}</td><td>${t('50B+ bid requests/day','每天500亿+竞价请求')}</td></tr>
            <tr><td>${t('End-to-End Latency','端到端延迟')}</td><td>&lt;100ms P99</td></tr>
            <tr><td>${t('Architecture','基础设施架构')}</td><td>${t('Microservices on Kubernetes','Kubernetes微服务')}</td></tr>
            <tr><td>${t('Data Streaming','数据流处理')}</td><td>Apache Kafka + Flink</td></tr>
            <tr><td>${t('Database Layer','数据库层')}</td><td>Cassandra + ClickHouse</td></tr>
            <tr><td>${t('Cache Layer','缓存层')}</td><td>NexCache (proprietary)</td></tr>
            <tr><td>${t('Languages','竞价处理语言')}</td><td>Go + C++ hot path</td></tr>
            <tr><td>${t('Uptime SLA','在线率SLA')}</td><td>99.98%</td></tr>
            <tr><td>${t('Failover RTO','故障恢复时间')}</td><td>&lt;30 seconds</td></tr>
          </table>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Privacy & Security','隐私与安全')}
      <h2 class="section-headline">${t('Built for the Privacy-First Era','为隐私优先时代而构建')}</h2>
      <div class="pillar-grid" style="margin-top:40px">
        ${[
          [gIcon('cookie','blue'),'rgba(37,99,235,0.12)','Cookieless Targeting','无Cookie定向','Contextual targeting, first-party data activation, and privacy-safe audience solutions without third-party cookies.','场景定向、第一方数据激活和无需第三方Cookie的隐私安全受众解决方案。'],
          [gIcon('clipboard','green'),'rgba(5,150,105,0.12)','Consent Management','同意管理','IAB TCF 2.2 compliant with automatic signal propagation across all NexBids transactions.','IAB TCF 2.2合规，在所有NexBids交易中自动传播信号。'],
          [gIcon('eye','purple'),'rgba(124,58,237,0.12)','Data Minimization','数据最小化','We collect only what is necessary. User-level data anonymized and purged per configurable retention policies.','我们只收集必要数据。用户级数据根据可配置保留策略进行匿名化和清除。'],
          [gIcon('globe','amber'),'rgba(245,158,11,0.12)','Global Compliance','全球合规','GDPR, CCPA/CPRA, PDPA, LGPD and emerging privacy regulations built into the platform natively.','GDPR、CCPA/CPRA、PDPA、LGPD和全球新兴隐私法规原生内置于平台。'],
          [gIcon('shield','red'),'rgba(239,68,68,0.12)','IVT & Fraud Prevention','IVT与欺诈防护','Pre-bid and post-bid IVT filtering. AI fraud detection >99.8% precision. IAS, DoubleVerify, MOAT integrations.','竞价前后IVT过滤。AI欺诈检测精度>99.8%。集成IAS、DoubleVerify、MOAT。'],
          [gIcon('lock','teal'),'rgba(16,185,129,0.12)','Enterprise Security','企业级安全','SOC 2 Type II certified. ISO 27001 compliant. TLS 1.3 in transit, AES-256 at rest.','SOC 2 Type II认证，ISO 27001合规。传输中TLS 1.3，静止AES-256加密。'],
        ].map(([icon,bg,en,zh,enD,zhD])=>pillarCard(icon,bg,en,zh,enD,zhD)).join('')}
      </div>
    </div>
  </section>

  ${ctaBand('Want to Go Deeper?','想深入了解？',
    'Our engineering team is happy to discuss the technical details of our infrastructure and integration options.',
    '我们的工程团队很乐意讨论基础设施的技术细节和集成选项。',
    'Talk to Engineering','与工程团队交流','View API Docs','查看API文档','resources')}`;
}

/* ─────────────────────────────────────────────
   RESOURCES PAGE
───────────────────────────────────────────── */
function renderResources() {
  const cats = [
    {icon:'📄', en:'Platform Documentation', zh:'平台文档', items:[
      ['NexBids DSP Quick Start Guide','DSP快速入门指南','Get your first campaign live in 30 minutes. Account setup, campaign creation, targeting, and launch.','30分钟内上线首个营销活动。账户设置、创建营销活动、定向和启动。','PDF + Online'],
      ['DSP Campaign Management Manual','DSP营销活动管理手册','Comprehensive reference for all DSP settings, bidding strategies, and reporting features.','DSP所有设置、竞价策略和报告功能的综合参考。','Online Doc'],
      ['DSP API Reference','DSP API参考','Full API documentation with interactive sandbox, authentication, rate limits, and code examples.','含交互沙盒、认证、速率限制和代码示例的完整API文档。','API Docs'],
      ['SSP Publisher Onboarding Guide','SSP发布商入职指南','Complete guide from account creation to first ad serving — web, app, and SDK.','从账户创建到首次广告投放的完整指南——网页、应用和SDK。','PDF + Online'],
      ['Header Bidding Integration (Prebid.js)','Prebid.js头部竞价集成','NexBids SSP as a Prebid.js demand partner. Configuration, parameters, and testing.','NexBids SSP作为Prebid.js需求合作伙伴。配置、参数和测试。','Online Doc'],
      ['iOS / Android SDK Integration Guides','iOS/Android SDK集成指南','Full SDK documentation for mobile developers — installation, formats, and testing.','面向移动开发者的完整SDK文档——安装、格式和测试。','Online Doc'],
      ['ADX Buyer Integration Guide (OpenRTB)','ADX买方集成指南（OpenRTB）','Connecting DSPs and bidders to NexBids ADX. OpenRTB endpoint specs and authentication.','将DSP和竞价者连接至NexBids ADX。OpenRTB端点规范和认证。','API Ref'],
    ]},
    {icon:'📚', en:'Best Practice Guides', zh:'最佳实践指南', items:[
      ['E-Commerce Programmatic Playbook','电商程序化手册','Prospecting, retargeting, dynamic product ads, ROAS optimization, and scaling strategies.','前瞻性、再营销、动态产品广告、ROAS优化和扩展策略。','42 pages'],
      ['Mobile App User Acquisition Playbook','移动应用用户获取手册','Acquire high-quality users for iOS and Android apps. Creative strategy, targeting, and measurement.','为iOS和Android应用获取高质量用户。创意策略、定向和衡量。','38 pages'],
      ['Gaming Advertiser Playbook','游戏广告主手册','Playable ads, SKAN campaigns, behavioral targeting for gamers, and LTV optimization.','可试玩广告、SKAN营销活动、游戏玩家行为定向和LTV优化。','30 pages'],
      ['Publisher Header Bidding Guide','发布商头部竞价指南','Prebid.js setup, demand partner selection, floor price strategy, and performance monitoring.','Prebid.js配置、需求合作伙伴选择、底价策略和性能监控。','36 pages'],
      ['App Ad Revenue Maximization Playbook','应用广告收益最大化手册','Ad format selection, placement best practices, rewarded video UX, and mediation strategy.','广告格式选择、广告位最佳实践、激励视频UX和聚合策略。','32 pages'],
      ['Agency Programmatic Operations Manual','代理商程序化运营手册','Campaign setup checklist, QA process, reporting templates, and client communication cadence.','营销活动设置清单、质量保证流程、报告模板和客户沟通节奏。','50 pages'],
    ]},
    {icon:'📊', en:'Industry Research & Reports', zh:'行业研究与报告', items:[
      ['Global Programmatic Landscape Report 2026','2026全球程序化广告格局报告','Annual comprehensive analysis of the global programmatic advertising market.','全球程序化广告市场年度综合分析。','68 pages'],
      ['The State of Mobile Advertising 2026','2026移动广告状况报告','Mobile advertising trends, user acquisition benchmarks, and privacy developments.','移动广告趋势、用户获取基准和隐私进展。','52 pages'],
      ['Publisher Revenue Optimization Benchmark 2026','2026发布商收益优化基准报告','eCPM benchmarks by vertical, geography, format, and device from anonymized SSP data.','基于匿名SSP数据的按垂直行业、地理、格式和设备的eCPM基准。','44 pages'],
      ['Cookieless Advertising Transition Report','无Cookie广告过渡报告','Advertiser readiness research and benchmark data on privacy-safe solution adoption.','广告主准备度研究和隐私安全解决方案采用基准数据。','40 pages'],
      ['Global Ad Fraud & Brand Safety Report 2026','2026全球广告欺诈与品牌安全报告','Ad fraud trends, IVT rates by channel, and brand safety incidents across programmatic.','广告欺诈趋势、按渠道的IVT率和程序化生态中的品牌安全事件。','36 pages'],
    ]},
    {icon:'🎓', en:'NexBids Academy', zh:'NexBids学院', items:[
      ['Programmatic Foundations Certificate','程序化基础证书','Beginner, 3 hrs. Introduction to programmatic, key players, ad formats, metrics.','初级，3小时。程序化广告入门、关键参与者、广告格式、指标。','Beginner · 3hr'],
      ['NexBids DSP Certified Professional','DSP认证专业人员','Intermediate, 8 hrs. 6 modules covering all DSP capabilities and best practices.','中级，8小时。涵盖所有DSP能力和最佳实践的6个模块。','Inter. · 8hr'],
      ['NexBids SSP Publisher Certification','SSP发布商认证','Intermediate, 6 hrs. From SSP setup to advanced yield optimization strategies.','中级，6小时。从SSP配置到高级收益优化策略。','Inter. · 6hr'],
      ['Advanced Programmatic Strategy Certificate','高级程序化策略证书','Advanced, 10 hrs. Bidding theory, ML optimization, and cookieless strategies.','高级，10小时。竞价理论、ML优化和无Cookie策略。','Adv. · 10hr'],
    ]},
  ];

  return `
  <div class="page-hero" style="background:var(--gradient-hero)">
    ${sectionTag('Resources','资源文档')}
    <h1>${t('The NexBids Resource Center','NexBids 资源中心')}</h1>
    <p>${t('Everything you need to succeed in programmatic advertising — platform documentation, integration guides, industry research, and best practice playbooks.',
       '您在程序化广告中取得成功所需的一切——平台文档、集成指南、行业研究和最佳实践手册。')}</p>
  </div>

  <section class="section section-dark">
    <div class="container">
      ${cats.map(cat=>`
      <div style="margin-bottom:64px">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:28px">
          <div style="font-size:28px">${cat.icon}</div>
          <h2 style="font-size:24px;font-weight:800">${t(cat.en,cat.zh)}</h2>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${cat.items.map(([en,zh,enD,zhD,fmt])=>`
          <div class="resource-card">
            <div class="resource-icon">📄</div>
            <div style="flex:1">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap">
                <h4>${t(en,zh)}</h4>
                <span style="font-size:12px;padding:3px 10px;background:var(--bg-light);border-radius:5px;color:var(--text-secondary);white-space:nowrap">${fmt}</span>
              </div>
              <p>${t(enD,zhD)}</p>
            </div>
            <button class="btn btn-secondary" style="padding:8px 16px;font-size:13px;flex-shrink:0" onclick="navigate('contact')">${t('Access','访问')}</button>
          </div>`).join('')}
        </div>
      </div>`).join('')}

      <div style="margin-bottom:64px">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:28px">
          <div style="font-size:28px">🎙️</div>
          <h2 style="font-size:24px;font-weight:800">${t('Webinars & Events','网络研讨会与活动')}</h2>
        </div>
        <div class="card-grid card-grid-3">
          ${[
            ['Mar 25, 2026','2026年3月25日','Maximizing ROAS in a Privacy-First World','隐私优先时代的ROAS最大化','Emily Zhang, VP Advertiser Solutions','60 min'],
            ['Apr 2, 2026','2026年4月2日','Header Bidding Masterclass for Publishers','发布商头部竞价大师班','James Park, Director Publisher Partnerships','75 min'],
            ['Apr 15, 2026','2026年4月15日','CTV Advertising: The Programmatic Opportunity','CTV广告：程序化机遇','Marcus Thompson, Head of CTV','60 min'],
          ].map(([date,datezh,en,zh,speaker,dur])=>`
          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
              <span style="font-size:13px;color:var(--primary-light);font-weight:600">${t(date,datezh)}</span>
              <span class="stat-badge" style="font-size:11px">${t('Upcoming','即将举行')}</span>
            </div>
            <h3 style="font-size:16px;font-weight:700;margin-bottom:8px;line-height:1.4">${t(en,zh)}</h3>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px">${speaker} · ${dur}</p>
            <button class="btn btn-primary" style="width:100%;padding:10px" onclick="navigate('contact')">${t('Register Now','立即注册')}</button>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  ${ctaBand("Can't Find What You're Looking For?","找不到您需要的内容？",
    'Our team is ready to provide personalized guidance, technical support, or custom research.',
    '我们的团队随时提供个性化指导、技术支持或定制研究。',
    'Contact Support','联系支持','Talk to a Specialist','与专家交谈','contact')}`;
}

/* ─────────────────────────────────────────────
   CASE STUDIES HUB
───────────────────────────────────────────── */
function renderCaseStudiesHub() {
  return `
  <div class="page-hero" style="background:var(--gradient-hero)">
    ${sectionTag('Case Studies','客户案例')}
    <h1>${t('Real Results. Real Partners. Real Growth.','真实成果。真实伙伴。真实增长。')}</h1>
    <p>${t('Discover how global brands, app developers, publishers, and agencies use NexBids to drive measurable, sustainable growth.',
       '探索各行业的全球品牌、应用开发者、发布商和代理商如何使用NexBids推动可衡量、可持续的增长。')}</p>
  </div>

  ${metricsBand([
    ['$2.8B+','Advertiser Revenue Driven','广告主收益带动'],
    ['+47%','Avg ROAS Improvement Year 1','第一年平均ROAS提升'],
    ['+52%','Avg eCPM Lift for Publishers','发布商平均eCPM提升'],
    ['300+','Case Studies Globally','全球客户案例'],
  ])}

  <section class="section section-dark">
    <div class="container">
      ${sectionTag('Advertiser Cases','广告主案例')}
      <h2 class="section-headline">${t('How Advertisers Grow Faster with NexBids','广告主如何通过NexBids实现更快增长')}</h2>
      <div class="card-grid card-grid-3" style="margin-top:40px">
        ${[
          ['E-Commerce','电商','Global Fashion Brand — ROAS Transformation','全球时尚品牌——ROAS转型','Rebuilt audience strategy with DCO and AI bidding across 12 countries.','在12个国家以DCO和AI竞价重建受众策略。',['ROAS +200%','CPA -54%','Revenue +400%']],
          ['Mobile Gaming','移动游戏','Top Mobile RPG — Scale & Quality','顶级移动RPG——规模与质量','Acquired 2.3M high-quality players with playable ads and LTV bidding.','通过可试玩广告和LTV竞价获取了230万高质量玩家。',['2.3M Players','D30 Ret +38%','CPI -41%']],
          ['Utility App','工具应用','Productivity App — Global Expansion','生产力应用——全球扩张','Scaled from 3 markets to 28 while maintaining target CPA.','在保持目标CPA的同时从3个市场扩展到28个市场。',['28 Countries','CPA at Target','D7 Ret +22%']],
          ['Media & Entertainment','媒体与娱乐','Streaming Platform — Subscription Growth','流媒体平台——订阅增长','Trial-to-paid conversion driven by sequential video storytelling.','通过连续视频叙事推动免费试用到付费转化。',['Conv +67%','CAC -31%','LTV +44%']],
          ['Brand Awareness','品牌知名度','FMCG Brand — Digital Brand Building','快消品品牌——数字品牌建设','Upper-funnel programmatic video increased brand recall by 34%.','上漏斗程序化视频使品牌回忆率提升34%。',['Brand Recall +34%','VCR 78%','Reach 120M']],
          ['E-Commerce','电商','Home Goods — SEA Market Expansion','家居品牌——东南亚市场扩张','Entered 4 SEA markets simultaneously with zero prior brand awareness.','在零品牌知名度的情况下同时进入4个东南亚市场。',['4 Markets','CVR +186%','ROAS 3.8x']],
        ].map(([industry,industryZh,title,titleZh,desc,descZh,badges])=>`
        <div class="case-card" onclick="navigate('cases-advertiser')">
          <div class="case-card-top">
            <div class="case-industry">${t(industry,industryZh)}</div>
            <h3>${t(title,titleZh)}</h3>
            <p>${t(desc,descZh)}</p>
          </div>
          <div class="case-metrics">${badges.map(b=>`<span class="case-metric-badge">${b}</span>`).join('')}</div>
        </div>`).join('')}
      </div>
      <div style="text-align:center;margin-top:32px">
        <button class="btn btn-secondary" onclick="navigate('cases-advertiser')">${t('View All Advertiser Cases →','查看所有广告主案例 →')}</button>
      </div>
    </div>
  </section>

  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Publisher & Developer Cases','发布商与开发者案例','green')}
      <h2 class="section-headline">${t('How Publishers Maximize Revenue with NexBids','发布商如何通过NexBids最大化收益')}</h2>
      <div class="card-grid card-grid-3" style="margin-top:40px">
        ${[
          ['News Publisher','新闻发布商','Finance News Network — eCPM Growth','财经新闻网络——eCPM增长','Header bidding + AI floor pricing drove 67% eCPM lift and $2.4M incremental annual revenue.','头部竞价+AI底价推动eCPM提升67%，带来240万美元额外年收入。',['eCPM +67%','+$2.4M/yr','Fill +23%']],
          ['Mobile App','移动应用','Lifestyle App — Monetization Overhaul','生活方式应用——变现改造','SDK migration and rewarded video adoption tripled monthly ad revenue.','SDK迁移和激励视频采用使月广告收入翻三倍。',['Revenue x3','eCPM +89%','Retention +12%']],
          ['Mobile Gaming','移动游戏','Casual Game Studio — Revenue Maximization','休闲游戏工作室——收益最大化','Rewarded video optimization and mediation strategy delivered 145% revenue lift.','激励视频优化和聚合策略带来145%的收益提升。',['Revenue +145%','DAU +18%','eCPM +92%']],
        ].map(([industry,industryZh,title,titleZh,desc,descZh,badges])=>`
        <div class="case-card" onclick="navigate('cases-publisher')">
          <div class="case-card-top">
            <div class="case-industry" style="color:#34D399">${t(industry,industryZh)}</div>
            <h3>${t(title,titleZh)}</h3>
            <p>${t(desc,descZh)}</p>
          </div>
          <div class="case-metrics">${badges.map(b=>`<span class="case-metric-badge" style="background:rgba(5,150,105,0.08);color:#34D399;border-color:rgba(5,150,105,0.15)">${b}</span>`).join('')}</div>
        </div>`).join('')}
      </div>
      <div style="text-align:center;margin-top:32px">
        <button class="btn btn-secondary" onclick="navigate('cases-publisher')">${t('View All Publisher Cases →','查看所有发布商案例 →')}</button>
      </div>
    </div>
  </section>

  ${ctaBand('Want Results Like These?','想要获得这样的成果吗？',
    'Join thousands of advertisers and publishers already achieving breakthrough growth with NexBids.',
    '加入已经通过NexBids实现突破性增长的数千名广告主和发布商。',
    'Get Started','开始使用','Talk to Sales','联系销售','contact')}`;
}

/* ─────────────────────────────────────────────
   CASES — ADVERTISER DETAIL
───────────────────────────────────────────── */
function renderCasesAdvertiser() {
  return `
  <div class="page-hero" style="background:linear-gradient(135deg,rgba(37,99,235,0.1),var(--bg-dark))">
    <div class="breadcrumb"><a onclick="navigate('case-studies')">${t('Case Studies','客户案例')}</a> › <span>${t('Advertiser Growth Cases','广告主增长案例')}</span></div>
    ${sectionTag('Advertiser Cases','广告主案例')}
    <h1>${t('How Advertisers Grow Faster with NexBids','广告主如何通过NexBids实现更快增长')}</h1>
    <p>${t('From global e-commerce brands scaling into new markets, to mobile gaming studios acquiring millions of engaged players — NexBids powers performance at every stage of growth.',
       '从进入新市场的全球电商品牌，到获取数百万高参与度玩家的移动游戏工作室——NexBids在增长的每个阶段驱动绩效。')}</p>
  </div>

  <section class="section section-dark">
    <div class="container">
      <div style="margin-bottom:72px">
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:24px;flex-wrap:wrap">
          <span class="section-tag" style="margin:0">${t('E-Commerce — Fashion','电商——时尚')}</span>
          <span style="font-size:13px;color:var(--text-muted)">CS-ADV-EC-001 · US, UK, Germany, Australia</span>
        </div>
        <h2 style="font-size:28px;font-weight:800;margin-bottom:16px">${t('Global Fashion Brand — ROAS Transformation','全球时尚品牌——ROAS转型')}</h2>
        <p class="section-sub" style="margin-bottom:32px">${t('A fast-growing global fashion e-commerce brand operating in 12 countries transformed programmatic from a write-off into their fastest-growing revenue driver.',
           '一个在12个国家运营的快速成长全球时尚电商品牌，将程序化广告从被放弃的渠道转变为增长最快的收益驱动器。')}</p>
        <div class="card-grid card-grid-4" style="margin-bottom:32px">
          ${[['ROAS','1.4x → 4.2x','+200%'],['CPA (New Customers)','$68 → $31','-54%'],['Monthly Revenue','$420K → $2.1M','+400%'],['Markets','3 → 12','+300%']].map(([l,v,c])=>`
          <div class="card" style="text-align:center"><div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">${l}</div><div style="font-size:18px;font-weight:700">${v}</div><div class="stat-badge green" style="margin-top:8px;display:inline-flex">${c}</div></div>`).join('')}
        </div>
        <div class="quote-block">
          <blockquote>${t('"NexBids transformed programmatic from a channel we had written off into our fastest-growing revenue driver. The combination of their dynamic creative technology and AI bidding delivered ROAS we never thought achievable."',
            '"NexBids将程序化广告从我们已放弃的渠道转变为增长最快的收益驱动器。他们的动态创意技术和AI竞价的组合带来了我们认为无法实现的ROAS。"')}</blockquote>
          <cite>${t('— Chief Marketing Officer, Global Fashion E-Commerce Brand','— 首席营销官，全球时尚电商品牌')}</cite>
        </div>
      </div>

      <div style="margin-bottom:72px">
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:24px;flex-wrap:wrap">
          <span class="section-tag" style="margin:0">${t('Mobile Gaming','移动游戏')}</span>
          <span style="font-size:13px;color:var(--text-muted)">CS-ADV-GM-001 · Southeast Asia, Japan, Korea</span>
        </div>
        <h2 style="font-size:28px;font-weight:800;margin-bottom:16px">${t('Top Mobile RPG — Scale & Quality Player Acquisition','顶级移动RPG——规模化高质量玩家获取')}</h2>
        <p class="section-sub" style="margin-bottom:32px">${t('A top-grossing mobile RPG studio needed to scale beyond their existing channels without sacrificing the player quality that drove their monetization.',
           '一家顶级收入移动RPG工作室需要超越现有渠道进行扩展，同时不牺牲推动变现的玩家质量。')}</p>
        <div class="card-grid card-grid-4" style="margin-bottom:32px">
          ${[['New Players','2.3M Acquired','High Quality'],['D30 Retention','Benchmark → +38%','+38%'],['CPI','Optimized','-41%'],['ROAS D180','LTV Positive','+156%']].map(([l,v,c])=>`
          <div class="card" style="text-align:center"><div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">${l}</div><div style="font-size:18px;font-weight:700">${v}</div><div class="stat-badge green" style="margin-top:8px;display:inline-flex">${c}</div></div>`).join('')}
        </div>
        <div class="quote-block">
          <blockquote>${t('"We\'d tried every major DSP and none could match the quality of players NexBids delivered. Their LTV Optimizer changed everything — we\'re now profitable on a D180 basis across all markets."',
            '"我们尝试过每一家主要DSP，没有一家能匹配NexBids带来的玩家质量。他们的LTV优化器改变了一切——我们现在在所有市场的D180基础上都是盈利的。"')}</blockquote>
          <cite>${t('— User Acquisition Lead, Top-5 Grossing Mobile RPG Studio','— 用户获取负责人，顶级移动RPG工作室')}</cite>
        </div>
      </div>

      <div>
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:24px;flex-wrap:wrap">
          <span class="section-tag" style="margin:0">${t('Utility App','工具应用')}</span>
          <span style="font-size:13px;color:var(--text-muted)">CS-ADV-UT-001 · Global (28 markets)</span>
        </div>
        <h2 style="font-size:28px;font-weight:800;margin-bottom:16px">${t('Productivity App — From 3 Markets to Global','生产力应用——从3个市场到全球')}</h2>
        <p class="section-sub" style="margin-bottom:32px">${t('A productivity app needed a programmatic partner to support rapid global expansion from 3 to 28 markets while maintaining CPA targets.',
           '一款生产力应用需要程序化合作伙伴支持从3个市场扩展到28个市场的快速全球扩张，同时保持CPA目标。')}</p>
        <div class="card-grid card-grid-4" style="margin-bottom:32px">
          ${[['Markets','3 → 28','x9.3'],['Install Volume','Scaled Up','+340%'],['CPA','Maintained','On Target'],['D7 Retention','Improved','+22%']].map(([l,v,c])=>`
          <div class="card" style="text-align:center"><div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">${l}</div><div style="font-size:18px;font-weight:700">${v}</div><div class="stat-badge" style="margin-top:8px;display:inline-flex">${c}</div></div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  ${ctaBand('Ready to Write Your Own Success Story?','准备好创造您自己的成功故事了吗？',
    'Talk to our team about how NexBids can drive results for your campaigns.',
    '与我们的团队讨论NexBids如何为您的营销活动带来成果。',
    'Contact Advertiser Sales','联系广告主销售','Explore DSP','探索DSP','products-dsp')}`;
}

/* ─────────────────────────────────────────────
   CASES — PUBLISHER DETAIL
───────────────────────────────────────────── */
function renderCasesPublisher() {
  return `
  <div class="page-hero" style="background:linear-gradient(135deg,rgba(5,150,105,0.1),var(--bg-dark))">
    <div class="breadcrumb"><a onclick="navigate('case-studies')">${t('Case Studies','客户案例')}</a> › <span>${t('Publisher & Developer Growth Cases','发布商/开发者增长案例')}</span></div>
    ${sectionTag('Publisher Cases','发布商案例','green')}
    <h1>${t('How Publishers Maximize Revenue with NexBids','发布商如何通过NexBids最大化收益')}</h1>
    <p>${t('From independent news sites to mobile game studios — see how publishers across web, app, and gaming unlock their true revenue potential with NexBids SSP.',
       '从独立新闻网站到移动游戏工作室——了解网页、应用和游戏领域的发布商如何使用NexBids SSP释放真正的收益潜力。')}</p>
  </div>

  <section class="section section-dark">
    <div class="container">
      <div style="margin-bottom:72px">
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:24px;flex-wrap:wrap">
          <span class="section-tag" style="margin:0;background:rgba(5,150,105,0.1);color:#34D399;border-color:rgba(5,150,105,0.2)">${t('News Publisher','新闻发布商')}</span>
          <span style="font-size:13px;color:var(--text-muted)">CS-PUB-WEB-001</span>
        </div>
        <h2 style="font-size:28px;font-weight:800;margin-bottom:16px">${t('Regional Finance News Network — eCPM Growth & Revenue Transformation','区域财经新闻网络——eCPM增长与收益转型')}</h2>
        <p class="section-sub" style="margin-bottom:32px">${t('A leading regional finance news platform migrated from a single SSP waterfall setup to NexBids header bidding, transforming their ad revenue performance in 90 days.',
           '一家领先的区域财经新闻平台从单一SSP瀑布流迁移至NexBids头部竞价，在90天内彻底改变了广告收益表现。')}</p>
        <div class="card-grid card-grid-4" style="margin-bottom:32px">
          ${[['eCPM Lift','+67%','vs. prior SSP'],['Incremental Revenue','+$2.4M','per year'],['Fill Rate','+23%','improvement'],['Page RPM','+71%','growth']].map(([l,v,s])=>`
          <div class="card" style="text-align:center"><div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">${l}</div><div style="font-size:28px;font-weight:900;color:#34D399">${v}</div><div style="font-size:12px;color:var(--text-muted);margin-top:4px">${s}</div></div>`).join('')}
        </div>
        <div class="quote-block" style="border-left-color:#059669">
          <blockquote>${t('"The NexBids header bidding implementation was transformative. Within 90 days, our CPMs had increased by 67% and our monthly revenue had grown by $200K. The yield optimization team was outstanding."',
            '"NexBids头部竞价实施是变革性的。在90天内，我们的CPM提升了67%，月收入增长了20万美元。收益优化团队非常出色。"')}</blockquote>
          <cite>${t('— Head of Digital Revenue, Regional Finance News Platform','— 数字收益负责人，区域财经新闻平台')}</cite>
        </div>
      </div>

      <div style="margin-bottom:72px">
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:24px;flex-wrap:wrap">
          <span class="section-tag" style="margin:0;background:rgba(5,150,105,0.1);color:#34D399;border-color:rgba(5,150,105,0.2)">${t('Mobile App','移动应用')}</span>
          <span style="font-size:13px;color:var(--text-muted)">CS-PUB-APP-001 · 8M+ MAU</span>
        </div>
        <h2 style="font-size:28px;font-weight:800;margin-bottom:16px">${t('Lifestyle App — Monetization Overhaul via SDK Migration','生活方式应用——通过SDK迁移实现变现改造')}</h2>
        <p class="section-sub" style="margin-bottom:32px">${t('A popular lifestyle and wellness app with 8M+ MAU had been monetizing with banner ads only. NexBids SSP integration unlocked rewarded video and interstitial formats, tripling monthly revenue.',
           '一款拥有800万+月活用户的热门生活方式应用仅靠横幅广告变现。NexBids SSP集成解锁了激励视频和插页式格式，使月收入增长三倍。')}</p>
        <div class="card-grid card-grid-4" style="margin-bottom:32px">
          ${[['Monthly Revenue','Tripled','x3 growth'],['eCPM','+89%','improvement'],['User Retention','+12%','D28 lift'],['D28 ARPU','+156%','growth']].map(([l,v,s])=>`
          <div class="card" style="text-align:center"><div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">${l}</div><div style="font-size:28px;font-weight:900;color:#34D399">${v}</div><div style="font-size:12px;color:var(--text-muted);margin-top:4px">${s}</div></div>`).join('')}
        </div>
        <div class="quote-block" style="border-left-color:#059669">
          <blockquote>${t('"We were skeptical that adding rewarded video could increase revenue without hurting retention — NexBids proved us wrong on both counts. Revenue tripled and our retention actually improved."',
            '"我们对激励视频在不损害留存的情况下增加收益持怀疑态度——NexBids在两方面都证明我们错了。收入增长了三倍，留存率实际上也提高了。"')}</blockquote>
          <cite>${t('— Growth & Monetization Lead, Lifestyle Wellness App','— 增长与变现负责人，生活方式健康应用')}</cite>
        </div>
      </div>

      <div>
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:24px;flex-wrap:wrap">
          <span class="section-tag" style="margin:0;background:rgba(5,150,105,0.1);color:#34D399;border-color:rgba(5,150,105,0.2)">${t('Mobile Gaming','移动游戏')}</span>
          <span style="font-size:13px;color:var(--text-muted)">CS-PUB-GAME-001</span>
        </div>
        <h2 style="font-size:28px;font-weight:800;margin-bottom:16px">${t('Casual Game Studio — Revenue Maximization via Rewarded Video','休闲游戏工作室——通过激励视频实现收益最大化')}</h2>
        <p class="section-sub" style="margin-bottom:32px">${t('A casual mobile game studio with 15M+ downloads integrated NexBids SSP across their portfolio, leveraging rewarded video optimization and mediation strategy for a 145% revenue lift.',
           '一家拥有1500万+下载量的休闲移动游戏工作室在其产品组合中集成了NexBids SSP，通过激励视频优化和聚合策略实现了145%的收益提升。')}</p>
        <div class="card-grid card-grid-4" style="margin-bottom:32px">
          ${[['Ad Revenue','+145%','lift'],['DAU','+18%','growth'],['eCPM','+92%','improvement'],['ARPDAU','+127%','increase']].map(([l,v,s])=>`
          <div class="card" style="text-align:center"><div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">${l}</div><div style="font-size:28px;font-weight:900;color:#34D399">${v}</div><div style="font-size:12px;color:var(--text-muted);margin-top:4px">${s}</div></div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  ${ctaBand('Ready to Grow Your Revenue?','准备好增加您的收益了吗？',
    'Join 30,000+ publishers maximizing revenue with NexBids SSP.',
    '加入30,000+使用NexBids SSP最大化收益的发布商。',
    'Apply as Publisher','申请成为发布商','Explore SSP','探索SSP','products-ssp')}`;
}


/* ─────────────────────────────────────────────
   ABOUT US PAGE
───────────────────────────────────────────── */
function renderAbout() {
  return `
  <div class="page-hero" style="background:var(--gradient-hero)">
    ${sectionTag('About NexBids','关于NexBids')}
    <h1>${t('We Built NexBids to Make Programmatic Work for Everyone','我们创建NexBids，让程序化广告为每个人服务')}</h1>
    <p>${t('From a small team with a big idea to a global ad tech company serving thousands of advertisers, publishers, and agencies in 150+ countries — this is the NexBids story.',
       '从一个拥有远大构想的小团队，到在150+国家服务数千名广告主、发布商和代理商的全球广告技术公司——这就是NexBids的故事。')}</p>
  </div>

  ${metricsBand([
    ['2018','Founded','创立年份'],
    ['500+','Employees Globally','全球员工'],
    ['6','Global Offices','全球办公室'],
    ['150+','Countries Served','服务国家'],
  ])}

  <!-- Our Story -->
  <section class="section section-dark">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start" class="home-tech-grid">
        <div>
          ${sectionTag('Our Story','我们的故事')}
          <h2 class="section-headline">${t('Building the Future of Programmatic Since 2018','自2018年以来构建程序化广告的未来')}</h2>
          <p style="color:var(--text-secondary);font-size:15px;line-height:1.8;margin-bottom:20px">${t('NexBids was founded in 2018 by a team of advertising technology veterans who had spent their careers at some of the world\'s largest ad tech companies. They saw firsthand how programmatic advertising remained unnecessarily complex, opaque, and inaccessible for the vast majority of advertisers and publishers.',
             'NexBids由一支广告技术老兵团队于2018年创立。他们亲眼看到，程序化广告尽管前途光明，但对于绝大多数本可从中受益的广告主和发布商而言，仍然不必要地复杂、不透明且难以接触。')}</p>
          <p style="color:var(--text-secondary);font-size:15px;line-height:1.8;margin-bottom:20px">${t('The founding vision: build a full-stack programmatic platform that combined the technological sophistication of enterprise incumbents with the accessibility, transparency, and partnership ethos that the market desperately needed.',
             '创立愿景：构建一个全栈程序化平台，将企业现有玩家的技术成熟度与市场迫切需要的可访问性、透明度和合作伙伴精神结合起来。')}</p>
          <p style="color:var(--text-secondary);font-size:15px;line-height:1.8">${t('Today, NexBids operates across 6 global offices, serves 2,000+ advertisers and 30,000+ publishers in 150+ countries, and processes 50B+ ad auctions daily.',
             '今天，NexBids在6个全球办公室运营，在150+国家服务2,000+广告主和30,000+发布商，每天处理500亿+广告拍卖。')}</p>
        </div>
        <div>
          ${sectionTag('Company Timeline','公司里程碑')}
          <div class="timeline">
            ${[
              ['2018','Founded — Core RTB infrastructure & ML foundation built.','创立——构建核心RTB基础设施和ML基础。'],
              ['2019','First Partnerships — Beta advertisers & publishers onboarded. London office opens.','首批合作伙伴——Beta广告主和发布商入驻。伦敦办公室开业。'],
              ['2020','DSP Launch — NexBids DSP goes to general availability. 50+ advertisers in H1.','DSP发布——NexBids DSP正式上线。上半年吸引50+广告主。'],
              ['2021','Full-Stack Platform — SSP & ADX launch. Singapore office opens.','全栈平台——SSP和ADX上线。新加坡办公室开业。'],
              ['2022','Scale Milestone — 10,000+ publishers. 100B+ daily bid requests. Tokyo & Beijing offices.','规模里程碑——1万+发布商，1000亿+日竞价请求，东京和北京开设办公室。'],
              ['2023','AI-First Initiative — Next-gen ML engine launched. Privacy Sandbox integration complete.','AI优先计划——下一代ML引擎发布，隐私沙盒集成完成。'],
              ['2024','50K Publisher Milestone — $500M+ advertiser spend managed annually.','5万发布商里程碑——每年管理5亿+美元广告支出。'],
              ['2025','CTV & Audio Expansion — Full CTV, programmatic audio, and DOOH capabilities.','CTV与音频扩展——完整CTV、程序化音频和DOOH能力。'],
              ['2026','Global Leadership — 50B+ daily impressions. Top 10 Global Ad Tech Platform.','全球领导地位——每日500亿+展示，跻身全球十大广告技术平台。'],
            ].map(([yr,en,zh])=>`
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-year">${yr}</div>
              <p>${t(en,zh)}</p>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Mission & Values -->
  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Mission & Values','使命与价值观')}
      <h2 class="section-headline">${t('What We Stand For','我们的立场')}</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:40px" class="home-tech-grid">
        <div>
          <h3 style="font-size:20px;font-weight:700;margin-bottom:12px;color:var(--primary-light)">${t('Our Mission','我们的使命')}</h3>
          <p style="color:var(--text-secondary);font-size:15px;line-height:1.8;margin-bottom:28px">${t('To democratize access to the world\'s best programmatic advertising technology — empowering every advertiser, publisher, and agency, regardless of size, to compete, grow, and succeed in the global digital economy.',
             '让全球最好的程序化广告技术人人可及——使每一位广告主、发布商和代理商，无论规模大小，都能在全球数字经济中竞争、成长和成功。')}</p>
          <h3 style="font-size:20px;font-weight:700;margin-bottom:12px;color:var(--primary-light)">${t('Our Vision','我们的愿景')}</h3>
          <p style="color:var(--text-secondary);font-size:15px;line-height:1.8">${t('A digital advertising ecosystem that is intelligent, transparent, efficient, and privacy-respecting — where every participant can trust that the technology is working for their benefit.',
             '一个智能、透明、高效且尊重隐私的数字广告生态系统——每个参与者都能信任技术在为自己的利益服务。')}</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${[
            ['🤝','Partner Success First','合作伙伴成功第一','We measure our own success by the success of our partners. Every decision starts with: does this make our partners more successful?','我们通过合作伙伴的成功来衡量我们自己的成功。每个决策都从这个问题开始：这能让我们的合作伙伴更成功吗？'],
            ['🔍','Radical Transparency','极致透明','Complete transparency in pricing, data practices, auction mechanics, and reporting. Trust is the foundation of long-term partnership.','定价、数据实践、拍卖机制和报告方面的完全透明。信任是长期合作关系的基础。'],
            ['💡','Relentless Innovation','不懈创新','We invest heavily in R&D, move with urgency, and challenge the status quo continuously in the fastest-evolving tech sector.','我们在R&D上大量投资，以紧迫性行动，在最快速发展的技术领域持续挑战现状。'],
            ['🌍','Global Perspective','全球视角','We serve clients in 150+ countries. We embrace the diversity of markets, cultures, and approaches that makes our global team stronger.','我们服务150+国家的客户。我们拥抱市场、文化和方法的多样性，使我们的全球团队更强大。'],
          ].map(([icon,en,zh,enD,zhD])=>`
          <div style="display:flex;gap:14px;padding:16px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px">
            <div style="font-size:22px;flex-shrink:0">${icon}</div>
            <div><h4 style="font-weight:700;font-size:15px;margin-bottom:4px">${t(en,zh)}</h4><p style="font-size:13px;color:var(--text-secondary)">${t(enD,zhD)}</p></div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- Leadership Team -->
  <section class="section section-dark">
    <div class="container">
      ${sectionTag('Leadership Team','领导团队')}
      <h2 class="section-headline">${t('The People Leading NexBids','领导NexBids的人才')}</h2>
      <div class="card-grid card-grid-3" style="margin-top:40px">
        ${[
          ['MW','Michael Wang','Michael Wang','Co-Founder & CEO','联合创始人兼CEO','18 years in programmatic advertising. Former VP Product at a leading global DSP. Stanford CS + Wharton MBA.','18年程序化广告经验，前领先全球DSP产品副总裁。斯坦福CS+沃顿MBA。'],
          ['SO','Sarah Okonkwo','Sarah Okonkwo','Co-Founder & CTO','联合创始人兼CTO','6 patents in RTB systems & audience modeling. PhD Computer Science (ML) from MIT. NexBids Privacy Engineering lead.','6项RTB系统和受众建模专利，MIT计算机科学（ML）博士，NexBids隐私工程负责人。'],
          ['DR','David Ramirez','David Ramirez','Chief Revenue Officer','首席营收官','Oversees global commercial operations. Former VP Americas Sales at major ad networks across NA and LATAM.','监督全球商业运营，前北美和拉美主要广告网络美洲销售VP。'],
          ['EZ','Emily Zhang','Emily Zhang','VP, Publisher Partnerships APAC','VP，亚太发布商合作伙伴','Leads publisher partnerships across APAC & China. 10 years mobile monetization at major Chinese internet company.','领导亚太和中国的发布商合作伙伴关系。在中国主要互联网公司有10年移动变现经验。'],
          ['JH','James Holloway','James Holloway','VP, Advertiser Solutions Europe','VP，欧洲广告主解决方案','Leads European advertiser team from London. Frequent speaker at DMEXCO and Programmatic IO Europe.','从伦敦领导欧洲广告主团队。DMEXCO和Programmatic IO Europe的常邀演讲嘉宾。'],
          ['PN','Priya Nair','Priya Nair','Chief Privacy Officer','首席隐私官','CIPP/E certified. Leads global privacy program. IAB Tech Lab Privacy Compliance Working Group member.','CIPP/E认证。领导全球隐私计划。IAB Tech Lab隐私合规工作组成员。'],
        ].map(([initials,en,zh,titleEn,titleZh,bioEn,bioZh])=>`
        <div class="team-card">
          <div class="team-avatar">${initials}</div>
          <h4>${t(en,zh)}</h4>
          <div class="team-title">${t(titleEn,titleZh)}</div>
          <p>${t(bioEn,bioZh)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Global Offices -->
  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Global Presence','全球影响力')}
      <h2 class="section-headline">${t('A Truly Global Company','一家真正意义上的全球公司')}</h2>
      <div class="card-grid card-grid-3" style="margin-top:40px">
        ${[
          ['🇺🇸','San Francisco, CA','旧金山','North America','北美市场','Engineering, Product, Corporate','工程、产品、企业运营'],
          ['🇺🇸','New York, NY','纽约','North America','北美市场','Sales & Marketing Americas','美洲销售与营销'],
          ['🇬🇧','London, UK','伦敦','EMEA','欧中东非市场','EMEA Sales, Partnerships, Marketing','欧中东非销售、合作和营销'],
          ['🇸🇬','Singapore','新加坡','APAC','亚太市场','APAC Sales, Partnerships, Engineering','亚太销售、合作和工程'],
          ['🇯🇵','Tokyo, Japan','东京','Japan','日本市场','Japan Sales, Publisher Partnerships','日本销售、发布商合作伙伴'],
          ['🇨🇳','Beijing, China','北京','China','中国市场','China Sales, Publisher Partnerships, Engineering','中国销售、发布商合作、工程'],
        ].map(([flag,en,zh,mktEn,mktZh,teamEn,teamZh])=>`
        <div class="office-card">
          <div style="font-size:24px;margin-bottom:10px">${flag}</div>
          <h4>${t(en,zh)}</h4>
          <div class="office-role">${t(mktEn,mktZh)}</div>
          <p>${t(teamEn,teamZh)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Awards -->
  <section class="section section-dark">
    <div class="container">
      ${sectionTag('Recognition','行业认可')}
      <h2 class="section-headline" style="margin-bottom:32px">${t('Industry Awards & Recognition','行业奖项与认可')}</h2>
      <div class="award-list">
        ${[
          ['🏆','2025','Best DSP Platform — Programmatic IO Awards'],
          ['🏆','2025','Top Ad Tech Company to Watch — Digiday Tech Awards'],
          ['🏆','2024','Publisher\'s Choice SSP — AdExchanger Awards'],
          ['🏆','2024','Best Innovation in Programmatic — Campaign Tech Awards APAC'],
          ['🛡️','2023','TAG Certified Against Fraud — Trustworthy Accountability Group'],
          ['🌟','2023','Best Emerging Ad Tech Platform — DMEXCO Innovation Award'],
          ['🔒','2022','Privacy First Certification — IAB Tech Lab'],
        ].map(([icon,year,name])=>`
        <div class="award-badge">
          <div class="award-icon">${icon}</div>
          <div><div class="award-year">${year}</div><div class="award-name">${name}</div></div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  ${ctaBand('Ready to Work with NexBids?','准备好与NexBids合作了吗？',
    'Whether you\'re looking to start a campaign, monetize your traffic, or partner with us — we\'d love to hear from you.',
    '无论您是想开始营销活动、变现流量还是与我们合作——我们都很乐意听取您的消息。',
    'Contact Our Team','联系我们的团队','View Open Positions','查看开放职位','careers')}`;
}

/* ─────────────────────────────────────────────
   CAREERS PAGE
───────────────────────────────────────────── */
function renderCareers() {
  const jobs = [
    {dept:'Engineering & Data Science',deptZh:'工程与数据科学',roles:[
      ['Sr. Software Engineer, RTB Infrastructure','高级工程师，RTB基础设施','San Francisco / Remote (US)','旧金山/远程（美国）','Full-time'],
      ['Staff ML Engineer, Bid Price Prediction','Staff ML工程师，竞价价格预测','San Francisco / Remote (US/EU)','旧金山/远程（美国/欧洲）','Full-time'],
      ['Data Engineer, Real-Time Streaming','数据工程师，实时流处理','Singapore / Remote (APAC)','新加坡/远程（亚太）','Full-time'],
      ['Sr. ML Engineer, Fraud Detection','高级ML工程师，欺诈检测','London / Remote (EU)','伦敦/远程（欧洲）','Full-time'],
    ]},
    {dept:'Commercial & Growth',deptZh:'商业与增长',roles:[
      ['Account Executive, Advertiser Sales (EMEA)','客户主管，广告主销售（欧中东非）','London','伦敦','Full-time'],
      ['Publisher Development Manager (SEA)','发布商开发经理（东南亚）','Singapore','新加坡','Full-time'],
      ['Agency Partnerships Manager (North America)','代理商合作伙伴经理（北美）','New York, NY','纽约','Full-time'],
      ['Customer Success Manager, Advertisers','客户成功经理，广告主','San Francisco / Remote (US)','旧金山/远程（美国）','Full-time'],
    ]},
    {dept:'Operations & Support',deptZh:'运营与支持',roles:[
      ['Technical Implementation Specialist, Publisher','技术实施专员，发布商','Singapore / Beijing','新加坡/北京','Full-time'],
      ['Campaign Operations Analyst','营销活动运营分析师','San Francisco / London','旧金山/伦敦','Full-time'],
    ]},
  ];

  return `
  <div class="page-hero" style="background:var(--gradient-hero)">
    ${sectionTag('Careers','招贤纳士')}
    <h1>${t('Build the Future of Global Advertising Technology with Us','与我们一起构建全球广告技术的未来')}</h1>
    <p>${t('At NexBids, we\'re on a mission to make programmatic advertising smarter, faster, and more accessible for everyone. We need brilliant, curious, driven people to help us get there.',
       '在NexBids，我们的使命是让程序化广告对每个人来说更智能、更快速、更易获取。我们需要才华横溢、充满好奇心、充满动力的人来帮助我们实现这一目标。')}</p>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="document.getElementById('open-roles').scrollIntoView({behavior:'smooth'})">${t('View Open Positions','查看开放职位')}</button>
      <button class="btn btn-secondary" onclick="navigate('about')">${t('Learn About Our Culture','了解我们的文化')}</button>
    </div>
  </div>

  <!-- Why Join -->
  <section class="section section-dark">
    <div class="container">
      ${sectionTag('Why NexBids?','为什么选择NexBids？')}
      <h2 class="section-headline">${t('6 Reasons to Join NexBids','加入NexBids的6大理由')}</h2>
      <div class="pillar-grid" style="margin-top:40px">
        ${[
          [gIcon('cpu','blue'),'rgba(37,99,235,0.12)','Hard Problems at Global Scale','在全球规模上解决困难问题','500B daily auctions. Millisecond latency. Trillion-event ML. Among the most technically demanding engineering challenges in the industry.','每天500亿次拍卖，毫秒级延迟，万亿事件ML。业内技术要求最高的工程挑战之一。'],
          [gIcon('rocket','green'),'rgba(5,150,105,0.12)','High Impact from Day One','从第一天起就有高影响力','Growth-stage company. Your work directly influences product direction, customer outcomes, and company growth.','成长期公司。您的工作直接影响产品方向、客户成果和公司增长。'],
          [gIcon('globe','purple'),'rgba(124,58,237,0.12)','Truly International Team','真正的国际化团队','500+ team members from 30+ nationalities across San Francisco, London, Singapore, Tokyo, and Beijing.','来自30+国籍的500+团队成员，分布在旧金山、伦敦、新加坡、东京和北京。'],
          [gIcon('book','amber'),'rgba(245,158,11,0.12)','Learn from the Best','向最优秀的人学习','Leadership from Google, The Trade Desk, DoubleClick, Criteo, and AppNexus. $2,000 annual learning budget per person.','领导层来自Google、The Trade Desk、DoubleClick、Criteo和AppNexus。每人每年2000美元学习预算。'],
          [gIcon('dollar','red'),'rgba(239,68,68,0.12)','Competitive Compensation & Equity','有竞争力的薪酬与股权','Market-rate salary, meaningful equity (options or RSUs), performance bonus, comprehensive health benefits.','市场竞争力薪资、有意义的股权（期权或RSU）、绩效奖金、全面健康福利。'],
          [gIcon('star','teal'),'rgba(16,185,129,0.12)','Work That Matters','有意义的工作','Our technology enables thousands of businesses to grow and independent publishers to sustain their work globally.','我们的技术使数千家企业得以成长，使全球独立发布商能够维持其工作。'],
        ].map(([icon,bg,en,zh,enD,zhD])=>pillarCard(icon,bg,en,zh,enD,zhD)).join('')}
      </div>
    </div>
  </section>

  <!-- Open Roles -->
  <section class="section section-subtle" id="open-roles">
    <div class="container">
      ${sectionTag('Open Positions','开放职位')}
      <h2 class="section-headline">${t('Current Openings','当前职位空缺')}</h2>
      <div style="margin-top:40px;display:flex;flex-direction:column;gap:40px">
        ${jobs.map(dept=>`
        <div>
          <h3 style="font-size:18px;font-weight:700;color:var(--primary-light);margin-bottom:16px">${t(dept.dept,dept.deptZh)}</h3>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${dept.roles.map(([en,zh,locEn,locZh,type])=>`
            <div class="job-card">
              <div class="job-card-header">
                <h4>${t(en,zh)}</h4>
                <a href="mailto:contact@nexbids.com?subject=Application: ${encodeURIComponent(en)}" class="job-apply">${t('Apply','申请')}</a>
              </div>
              <div class="job-meta">
                <span class="job-tag">📍 ${t(locEn,locZh)}</span>
                <span class="job-tag">⏰ ${type}</span>
              </div>
            </div>`).join('')}
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Hiring Process -->
  <section class="section section-dark">
    <div class="container">
      ${sectionTag('Hiring Process','招聘流程')}
      <h2 class="section-headline">${t('Our Hiring Process','我们的招聘流程')}</h2>
      <p class="section-sub" style="margin-bottom:40px">${t('We respect your time. Our process is efficient, transparent, and typically completes in 2–3 weeks.','我们尊重您的时间。我们的流程高效、透明，通常在2-3周内完成。')}</p>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:16px" class="hiring-steps">
        ${[
          ['1','Application Review','申请审查','1–3 business days','1-3个工作日'],
          ['2','Intro Call','初步电话面试','30 minutes','30分钟'],
          ['3','Technical / Skills Interview','技术/技能面试','60–90 minutes','60-90分钟'],
          ['4','Team Interview','团队面试','90 minutes','90分钟'],
          ['5','Offer','录用通知','1–2 business days','1-2个工作日'],
        ].map(([n,en,zh,timeEn,timeZh])=>`
        <div class="card" style="text-align:center;padding:20px">
          <div style="width:36px;height:36px;background:var(--gradient-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:white;margin:0 auto 12px;font-size:15px">${n}</div>
          <h4 style="font-size:14px;font-weight:700;margin-bottom:6px">${t(en,zh)}</h4>
          <p style="font-size:12px;color:var(--text-muted)">${t(timeEn,timeZh)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  ${ctaBand("Don't See a Role That Fits?","没有找到合适的职位？",
    "We're always looking for exceptional people. Send us your resume and tell us how you'd contribute to NexBids.",
    '我们始终在寻找优秀人才。发送您的简历，告诉我们您将如何为NexBids做出贡献。',
    'Send a Speculative Application','发送主动申请','View Company','了解公司','about')}`;
}

/* ─────────────────────────────────────────────
   CONTACT PAGE
───────────────────────────────────────────── */
function renderContact() {
  return `
  <div class="page-hero" style="background:var(--gradient-hero)">
    ${sectionTag("Let's Talk","与我们交流")}
    <h1>${t("Let's Talk","与我们交流")}</h1>
    <p>${t("Whether you're ready to start a campaign, monetize your traffic, partner with us, or just want to learn more — we'd love to hear from you.",
       '无论您是准备启动营销活动、变现流量、与我们合作，还是只是想了解更多——我们都很乐意听取您的消息。')}</p>
  </div>

  <!-- Contact Cards -->
  <section class="section section-dark">
    <div class="container">
      <div class="card-grid card-grid-3" style="margin-bottom:64px">
        ${[
          [
            `<span class="gi gi-blue gi-lg"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="1.8"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></span>`,
            'I want to advertise with NexBids','我想在NexBids投放广告','Speak with our advertiser sales team about launching campaigns, pricing, or getting a platform demo.','与我们的广告主销售团队交流，了解启动营销活动、定价或获取平台演示。','Contact Advertiser Sales','联系广告主销售','1 business day','1个工作日'],
          [
            `<span class="gi gi-green gi-lg"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></span>`,
            'I want to monetize my traffic','我想变现我的流量','Connect with our publisher partnerships team to discuss SSP integration and monetization strategy.','联系我们的发布商合作伙伴团队，讨论SSP集成和变现策略。','Contact Publisher Team','联系发布商团队','1 business day','1个工作日'],
          [
            `<span class="gi gi-purple gi-lg"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C084FC" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>`,
            'I\'m an agency looking to partner','我是一家代理商，希望合作','Talk to our agency partnerships team about commercial arrangements and platform access.','与我们的代理商合作伙伴团队交流商业安排和平台访问。','Contact Agency Partnerships','联系代理商合作伙伴','1 business day','1个工作日'],
          [
            `<span class="gi gi-amber gi-lg"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FCD34D" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-width="2.5" stroke-linecap="round"/></svg></span>`,
            'I need technical support','我需要技术支持','For platform issues, integration questions, or bug reports. Priority support for existing clients.','针对平台问题、集成疑问或缺陷报告。现有客户享受优先支持。','Open Support Ticket','提交支持工单','P1 < 1hr, Std < 4hrs','P1 <1小时，标准 <4小时'],
          [
            `<span class="gi gi-teal gi-lg"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.8"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6z"/></svg></span>`,
            'Media & Press Inquiries','媒体与新闻咨询','For journalists, analysts, and media professionals seeking comment, data, or speaking opportunities.','面向寻求评论、数据或演讲机会的记者、分析师和媒体专业人士。','Contact Press Team','联系公关团队','24 hours','24小时'],
          [
            `<span class="gi gi-neutral gi-lg"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="9" y2="10" stroke-width="2.5" stroke-linecap="round"/><line x1="12" y1="10" x2="12" y2="10" stroke-width="2.5" stroke-linecap="round"/><line x1="15" y1="10" x2="15" y2="10" stroke-width="2.5" stroke-linecap="round"/></svg></span>`,
            'Something else?','其他问题？','For any other questions, partnership ideas, or feedback. We read everything.','任何其他问题、合作想法或反馈。我们会阅读所有内容。','Send a Message','发送消息','2 business days','2个工作日'],
        ].map(([icon,en,zh,enD,zhD,ctaEn,ctaZh,respEn,respZh])=>`
        <div class="contact-card">
          <div class="contact-icon" style="font-size:inherit;margin-bottom:16px">${icon}</div>
          <h3>${t(en,zh)}</h3>
          <p>${t(enD,zhD)}</p>
          <button class="btn btn-primary" style="width:100%;margin-bottom:10px">${t(ctaEn,ctaZh)}</button>
          <div class="contact-response">${t('Typical response:','典型响应时间：')} ${t(respEn,respZh)}</div>
        </div>`).join('')}
      </div>

      <!-- Contact Form — full width, centered -->
      <div style="max-width:680px;margin:0 auto">
        <div style="text-align:center;margin-bottom:36px">
          <h2 class="section-headline" style="margin-bottom:12px">${t('Send Us a Message','发送消息')}</h2>
          <p style="color:var(--text-secondary)">${t("Fill out the form and we'll get back to you within 1 business day.",'填写表格，我们将在1个工作日内回复您。')}</p>
        </div>
        <div class="contact-form">
          <div class="form-row">
            <div class="form-group">
              <label>${t('First Name','名字')} *</label>
              <input type="text" placeholder="${currentLang==='zh'?'张':'John'}">
            </div>
            <div class="form-group">
              <label>${t('Last Name','姓氏')} *</label>
              <input type="text" placeholder="${currentLang==='zh'?'伟':'Smith'}">
            </div>
          </div>
          <div class="form-group">
            <label>${t('Business Email','工作邮箱')} *</label>
            <input type="email" placeholder="you@company.com">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>${t('Company Name','公司名称')} *</label>
              <input type="text" placeholder="${currentLang==='zh'?'您的公司':'Your Company'}">
            </div>
            <div class="form-group">
              <label>${t('Country','国家')} *</label>
              <div class="country-select-wrap">
                <input type="text" class="country-search-input country-single" id="countrySearch" placeholder="${currentLang==='zh'?'搜索或选择国家...':'Search or select country...'}" autocomplete="off" oninput="filterCountries(this.value)" onfocus="openCountryDropdown()" onblur="setTimeout(()=>closeCountryDropdown(),200)">
                <div class="country-dropdown-list" id="countryDropdown"></div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>${t('I am a','我是')} *</label>
            <select>
              <option value="">${currentLang==='zh'?'请选择...':'Select...'}</option>
              <option value="advertiser">${currentLang==='zh'?'广告主':'Advertiser'}</option>
              <option value="publisher">${currentLang==='zh'?'发布商或开发者':'Publisher or Developer'}</option>
              <option value="agency">${currentLang==='zh'?'代理商':'Agency'}</option>
              <option value="press">${currentLang==='zh'?'媒体/分析师':'Press / Analyst'}</option>
              <option value="other">${currentLang==='zh'?'其他':'Other'}</option>
            </select>
          </div>
          <div class="form-group">
            <label>${t('How can we help?','我们能为您做什么？')} *</label>
            <textarea placeholder="${currentLang==='zh'?'告诉我们您的需求...':'Tell us about your needs...'}"></textarea>
          </div>
          <div class="form-check" style="margin-bottom:20px">
            <input type="checkbox" id="privacyCheck">
            <label for="privacyCheck" style="font-size:13px;color:var(--text-secondary)">${t('I agree to NexBids\'','我同意NexBids的')} <a href="#" onclick="openPrivacyModal(event)" style="color:var(--primary-light);text-decoration:underline">${t('Privacy Policy','隐私政策')}</a> ${t('and consent to being contacted.','并同意被联系。')}</label>
          </div>
          <button class="btn btn-primary" style="width:100%;justify-content:center">${t('Send Message','发送消息')}</button>
        </div>
      </div>
    </div>
  </section>`;
}

/* ─────────────────────────────────────────────
   COUNTRY DATA & DROPDOWN
───────────────────────────────────────────── */
const ALL_COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Argentina','Armenia','Australia',
  'Austria','Azerbaijan','Bahrain','Bangladesh','Belarus','Belgium','Bolivia','Bosnia & Herzegovina',
  'Brazil','Bulgaria','Cambodia','Canada','Chile','China / 中国','Colombia','Croatia',
  'Czech Republic','Denmark','Ecuador','Egypt','Estonia','Ethiopia','Finland','France',
  'Georgia','Germany','Ghana','Greece','Guatemala','Hong Kong (SAR)','Hungary','India',
  'Indonesia','Iran','Iraq','Ireland','Israel','Italy','Japan','Jordan','Kazakhstan',
  'Kenya','Kuwait','Latvia','Lebanon','Libya','Lithuania','Luxembourg','Malaysia',
  'Mexico','Morocco','Myanmar','Nepal','Netherlands','New Zealand','Nigeria','North Korea',
  'Norway','Oman','Pakistan','Peru','Philippines','Poland','Portugal','Qatar',
  'Romania','Russia','Saudi Arabia','Senegal','Serbia','Singapore','Slovakia','Slovenia',
  'South Africa','South Korea','Spain','Sri Lanka','Sweden','Switzerland','Taiwan',
  'Thailand','Tunisia','Turkey','Ukraine','United Arab Emirates','United Kingdom',
  'United States','Uzbekistan','Venezuela','Vietnam','Yemen','Zimbabwe','Other',
];

function filterCountries(q) {
  const dropdown = document.getElementById('countryDropdown');
  if (!dropdown) return;
  const filtered = q ? ALL_COUNTRIES.filter(c => c.toLowerCase().includes(q.toLowerCase())) : ALL_COUNTRIES;
  dropdown.innerHTML = filtered.map(c =>
    `<div class="country-option" onmousedown="selectCountry('${c.replace(/'/g,"\\\'")}')">${c}</div>`
  ).join('');
  dropdown.classList.add('open');
}

function openCountryDropdown() {
  filterCountries(document.getElementById('countrySearch')?.value || '');
}

function closeCountryDropdown() {
  document.getElementById('countryDropdown')?.classList.remove('open');
}

function selectCountry(name) {
  const search = document.getElementById('countrySearch');
  const dropdown = document.getElementById('countryDropdown');
  if (search) { search.value = name; search.setAttribute('data-selected', name); }
  if (dropdown) dropdown.classList.remove('open');
}

/* ─────────────────────────────────────────────
   PRIVACY POLICY MODAL
───────────────────────────────────────────── */
function openPrivacyModal(e) {
  if (e) e.preventDefault();
  const isZh = currentLang === 'zh';
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.id = 'privacyModal';
  modal.onclick = (ev) => { if (ev.target === modal) closePrivacyModal(); };
  modal.innerHTML = `
  <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="privacyTitle">
    <div class="modal-header">
      <h2 id="privacyTitle">${isZh ? 'NexBids 隐私政策' : 'NexBids Privacy Policy'}</h2>
      <button class="modal-close" onclick="closePrivacyModal()" aria-label="Close">✕</button>
    </div>
    <div class="modal-body">
      ${isZh ? `
      <p><strong>最后更新日期：</strong>2026年3月</p>
      <h3>1. 概述</h3>
      <p>NexBids Inc.（"NexBids"、"我们"）致力于保护您的个人信息。本隐私政策说明我们在您使用nexbids.com及相关服务时如何收集、使用、披露和保护您的个人数据。</p>
      <h3>2. 我们收集的信息</h3>
      <p>我们可能收集以下类别的信息：</p>
      <ul>
        <li><strong>身份信息：</strong>姓名、职务、公司名称</li>
        <li><strong>联系信息：</strong>电子邮件地址、电话号码</li>
        <li><strong>使用数据：</strong>IP地址、浏览器类型、访问页面、访问时间戳</li>
        <li><strong>广告数据：</strong>通过我们平台处理的出价请求、展示及点击数据</li>
        <li><strong>通信记录：</strong>您与我们的往来邮件、支持工单内容</li>
      </ul>
      <h3>3. 信息使用方式</h3>
      <p>我们将您的信息用于以下目的：</p>
      <ul>
        <li>提供、运营和改进我们的服务</li>
        <li>处理商业询盘及合同履行</li>
        <li>发送服务通知、安全警报及支持消息</li>
        <li>遵守适用法律法规要求</li>
        <li>防范欺诈及保障平台安全</li>
      </ul>
      <h3>4. 信息共享</h3>
      <p>我们不会出售您的个人数据。我们仅在以下情况下共享信息：（a）经您明确同意；（b）与协助我们运营服务的受信任服务商共享（受保密协议约束）；（c）法律要求时。</p>
      <h3>5. 数据跨境传输</h3>
      <p>作为全球运营公司，您的数据可能被传输至您所在国家/地区以外的服务器。我们依据适用法规（包括GDPR标准合同条款）采取适当保障措施。</p>
      <h3>6. Cookie与追踪技术</h3>
      <p>我们的网站使用必要Cookie（用于网站功能）、分析Cookie（用于了解使用情况）及广告Cookie（用于程序化广告服务）。您可通过浏览器设置管理Cookie偏好。</p>
      <h3>7. 数据保留</h3>
      <p>我们仅在实现本政策所述目的所必要的时间内保留您的个人数据，或根据法律规定保留更长时间。</p>
      <h3>8. 您的权利</h3>
      <p>根据适用法律（包括GDPR、CCPA及中国个人信息保护法），您可能享有以下权利：访问权、更正权、删除权、限制处理权、数据可携权及拒绝权。如需行使上述权利，请通过contact@nexbids.com联系我们。</p>
      <h3>9. 安全措施</h3>
      <p>我们采用行业标准的技术和组织安全措施，包括数据加密（传输中和静态）、访问控制、定期安全审计及ISO 27001合规实践。</p>
      <h3>10. 儿童隐私</h3>
      <p>我们的服务面向商业用户，不面向16岁以下儿童。我们不会故意收集儿童个人信息。</p>
      <h3>11. 政策变更</h3>
      <p>我们可能不时更新本隐私政策。重大变更将通过电子邮件或网站显著位置通知您。继续使用我们的服务即视为接受更新后的政策。</p>
      <h3>12. 联系我们</h3>
      <p>如对本隐私政策有任何疑问，请联系：<br>数据保护官，NexBids Inc.<br>contact@nexbids.com</p>
      ` : `
      <p><strong>Last Updated:</strong> March 2026</p>
      <h3>1. Overview</h3>
      <p>NexBids Inc. ("NexBids," "we," "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you use nexbids.com and related services.</p>
      <h3>2. Information We Collect</h3>
      <p>We may collect the following categories of information:</p>
      <ul>
        <li><strong>Identity Data:</strong> Name, job title, company name</li>
        <li><strong>Contact Data:</strong> Email address, phone number</li>
        <li><strong>Usage Data:</strong> IP address, browser type, pages visited, timestamps</li>
        <li><strong>Advertising Data:</strong> Bid requests, impressions, and click data processed through our platforms</li>
        <li><strong>Communications:</strong> Email correspondence and support ticket content</li>
      </ul>
      <h3>3. How We Use Your Information</h3>
      <p>We use your information to:</p>
      <ul>
        <li>Provide, operate, and improve our services</li>
        <li>Process business inquiries and fulfill contracts</li>
        <li>Send service notifications, security alerts, and support messages</li>
        <li>Comply with applicable laws and regulations</li>
        <li>Prevent fraud and maintain platform security</li>
      </ul>
      <h3>4. Information Sharing</h3>
      <p>We do not sell your personal data. We share information only: (a) with your explicit consent; (b) with trusted service providers who assist us in operating our services (subject to confidentiality agreements); or (c) when required by law.</p>
      <h3>5. International Data Transfers</h3>
      <p>As a global company, your data may be transferred to servers outside your country. We implement appropriate safeguards under applicable regulations, including GDPR Standard Contractual Clauses.</p>
      <h3>6. Cookies & Tracking Technologies</h3>
      <p>Our website uses necessary cookies (for site functionality), analytics cookies (to understand usage), and advertising cookies (for programmatic advertising services). You may manage cookie preferences through your browser settings.</p>
      <h3>7. Data Retention</h3>
      <p>We retain your personal data only as long as necessary for the purposes outlined in this policy, or as required by applicable law.</p>
      <h3>8. Your Rights</h3>
      <p>Under applicable law (including GDPR, CCPA, and China PIPL), you may have rights to access, correct, delete, restrict processing of, port, and object to processing of your data. To exercise these rights, contact us at contact@nexbids.com.</p>
      <h3>9. Security</h3>
      <p>We employ industry-standard technical and organizational security measures including data encryption (in transit and at rest), access controls, regular security audits, and ISO 27001-aligned practices.</p>
      <h3>10. Children's Privacy</h3>
      <p>Our services are intended for business users and are not directed at children under 16. We do not knowingly collect personal information from children.</p>
      <h3>11. Policy Updates</h3>
      <p>We may update this Privacy Policy from time to time. Material changes will be communicated via email or a prominent notice on our website. Continued use of our services constitutes acceptance of the updated policy.</p>
      <h3>12. Contact Us</h3>
      <p>For questions about this Privacy Policy, please contact:<br>Data Protection Officer, NexBids Inc.<br>contact@nexbids.com</p>
      `}
    </div>
    <div class="modal-footer-bar">
      <button class="btn btn-primary" onclick="closePrivacyModal()" style="padding:10px 28px">${isZh ? '关闭' : 'Close'}</button>
    </div>
  </div>`;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

function closePrivacyModal() {
  const modal = document.getElementById('privacyModal');
  if (modal) { modal.remove(); document.body.style.overflow = ''; }
}

/* ─────────────────────────────────────────────
   LOGIN PAGE
───────────────────────────────────────────── */
function renderLogin(platform) {
  const cfg = {
    dsp: {
      class:'dsp', badge:'DSP', badgeColor:'#60A5FA',
      titleEn:'NexBids DSP', titleZh:'NexBids DSP',
      subtitleEn:'Demand-Side Platform', subtitleZh:'需求方平台',
      taglineEn:'Reach the world. Drive results.', taglineZh:'触达全球。驱动成果。',
      stats:[['50K+','Active Advertisers','活跃广告主'],['150+','Countries','国家'],['$12B+','Annual Spend','年支出']],
      quoteEn:'"NexBids DSP helped us achieve 4.2x ROAS across our global campaigns."',
      quoteZh:'"NexBids DSP帮助我们在全球营销活动中实现了4.2x ROAS。"',
      quoteByEn:'— Head of Performance Marketing, Global E-Commerce Brand',
      quoteByZh:'— 绩效营销负责人，全球电商品牌',
      headingEn:'Sign in to NexBids DSP', headingZh:'登录 NexBids DSP',
      newLinkEn:'New to NexBids DSP? Contact Sales', newLinkZh:'NexBids DSP新用户？联系销售',
    },
    ssp: {
      class:'ssp', badge:'SSP', badgeColor:'#34D399',
      titleEn:'NexBids SSP', titleZh:'NexBids SSP',
      subtitleEn:'Supply-Side Platform', subtitleZh:'供应方平台',
      taglineEn:'More demand. More revenue. More control.', taglineZh:'更多需求。更多收益。更多控制。',
      stats:[['+52%','Avg eCPM Lift','平均eCPM提升'],['30K+','Publishers','发布商'],['99.5%+','Fill Rate','填充率']],
      quoteEn:'"Migrating to NexBids SSP increased our monthly ad revenue by 328% in 90 days."',
      quoteZh:'"迁移至NexBids SSP在90天内使我们的月广告收入增长了328%。"',
      quoteByEn:'— CEO, Independent Finance News Platform',
      quoteByZh:'— CEO，独立财经新闻平台',
      headingEn:'Sign in to NexBids SSP', headingZh:'登录 NexBids SSP',
      newLinkEn:'New publisher? Start Monetizing', newLinkZh:'新发布商？开始变现',
    },
    adx: {
      class:'adx', badge:'ADX', badgeColor:'#A78BFA',
      titleEn:'NexBids ADX', titleZh:'NexBids ADX',
      subtitleEn:'Ad Exchange', subtitleZh:'广告交易中枢',
      taglineEn:"The world's most transparent programmatic marketplace.", taglineZh:'全球最透明的程序化广告市场。',
      stats:[['50B+','Daily Auctions','日竞价'],['<100ms','Latency','延迟'],['10K+','Partners','合作伙伴']],
      quoteEn:'50B+ Daily Impressions | <100ms Latency | 99.9% Uptime',
      quoteZh:'每日展示500亿+ | 延迟<100ms | 可用性99.9%',
      quoteByEn:'', quoteByZh:'',
      headingEn:'Sign in to NexBids ADX', headingZh:'登录 NexBids ADX',
      newLinkEn:'New ADX partner? Contact ADX Team', newLinkZh:'新ADX合作伙伴？联系ADX团队',
    },
  };
  const c = cfg[platform];
  return `
  <div class="login-page">
    <div class="login-left ${c.class}">
      <a onclick="navigate('home')" style="font-size:13px;color:var(--text-muted);margin-bottom:40px;display:inline-block">← ${t('Back to nexbids.com','返回 nexbids.com')}</a>
      <div class="login-platform-badge" style="background:rgba(255,255,255,0.08);color:${c.badgeColor}">
        ${c.badge} — ${t(c.subtitleEn, c.subtitleZh)}
      </div>
      <h2>${t(c.taglineEn, c.taglineZh)}</h2>
      <p>${t('Welcome back to '+c.titleEn+'. The programmatic platform trusted by thousands of global partners.','欢迎回到'+c.titleZh+'。受全球数千名合作伙伴信赖的程序化广告平台。')}</p>
      <div class="login-stat-row">
        ${c.stats.map(([n,en,zh])=>`<div class="login-stat"><strong>${n}</strong>${t(en,zh)}</div>`).join('')}
      </div>
      <div style="margin-top:36px;padding:20px;background:rgba(255,255,255,0.04);border-radius:12px;border:1px solid rgba(255,255,255,0.08)">
        <p style="font-style:italic;color:var(--text-secondary);font-size:15px;line-height:1.7;margin-bottom:${c.quoteByEn?'12px':'0'}">${t(c.quoteEn,c.quoteZh)}</p>
        ${c.quoteByEn?`<p style="font-size:13px;color:var(--text-muted)">${t(c.quoteByEn,c.quoteByZh)}</p>`:''}
      </div>
    </div>
    <div class="login-right">
      <div class="login-form-wrap">
        <div style="margin-bottom:24px">
          <svg class="nexbids-logo" width="138" height="29" viewBox="0 0 164 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="29" font-family="Inter,Arial Black,system-ui,sans-serif" font-size="34" font-weight="900" fill="#1650F5" letter-spacing="-2">Nex</text>
            <text x="64" y="29" font-family="Inter,Arial Black,system-ui,sans-serif" font-size="34" font-weight="900" fill="#1650F5" letter-spacing="-2">B</text>
            <polygon points="71,4 64,20 76,12" fill="#8B2EFF"/>
            <text x="84" y="29" font-family="Inter,Arial Black,system-ui,sans-serif" font-size="34" font-weight="900" fill="#1650F5" letter-spacing="-2">ids</text>
            <rect x="154" y="1" width="9" height="9" rx="2" fill="#8B2EFF"/>
          </svg>
        </div>
        <h3>${t(c.headingEn,c.headingZh)}</h3>
        <p>${t('Enter your credentials to access the platform.','输入您的凭据以访问平台。')}</p>
        <div class="form-group">
          <label>${t('Email Address','邮箱地址')}</label>
          <input type="email" placeholder="you@company.com">
        </div>
        <div class="form-group">
          <label>${t('Password','密码')}</label>
          <div class="pw-wrap">
            <input type="password" id="pwInput_${platform}" placeholder="••••••••">
            <button type="button" class="pw-toggle" id="pwToggle_${platform}" onclick="togglePassword('${platform}')" aria-label="Toggle password visibility">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" id="pwIcon_${platform}"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div style="margin-bottom:20px">
          <label style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-secondary);cursor:pointer">
            <input type="checkbox"> ${t('Remember me','记住我')}
          </label>
        </div>
        <button class="btn btn-primary" style="width:100%;justify-content:center;font-size:15px">${t('Sign In','登录')}</button>
        <div class="login-links" style="margin-top:20px">
          <a onclick="navigate('contact')" style="color:var(--text-muted);font-size:13px">${t(c.newLinkEn,c.newLinkZh)}</a>
          <a onclick="navigate('contact')" style="color:var(--primary-light);font-size:13px;cursor:pointer">${t('Help','帮助')}</a>
        </div>
      </div>
    </div>
  </div>`;
}

/* ─────────────────────────────────────────────
   SCROLL & INIT
───────────────────────────────────────────── */
function initScrollSpy() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.removeEventListener('scroll', window._nexScrollHandler);
  window._nexScrollHandler = onScroll;
  window.addEventListener('scroll', onScroll);
}

/* ─────────────────────────────────────────────
   COUNTER ANIMATION (Intersection Observer)
───────────────────────────────────────────── */
function initCounterAnimation() {
  const items = document.querySelectorAll('.metric-item');
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        // number rolling effect
        const numEl = entry.target.querySelector('.metric-num');
        if (numEl && !numEl.dataset.animated) {
          numEl.dataset.animated = '1';
          animateNumber(numEl);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  items.forEach(el => observer.observe(el));
}

function animateNumber(el) {
  const original = el.textContent.trim();
  // Extract numeric part and suffix/prefix
  const match = original.match(/^([^0-9]*)([0-9,.]+)([^0-9]*)$/);
  if (!match) return; // non-numeric (e.g. 99.98%)
  const prefix = match[1];
  const numStr = match[2].replace(/,/g, '');
  const suffix = match[3];
  const target = parseFloat(numStr);
  if (isNaN(target)) return;
  const isDecimal = numStr.includes('.');
  const decimals = isDecimal ? (numStr.split('.')[1] || '').length : 0;
  const duration = 1200;
  const steps = 40;
  const interval = duration / steps;
  let step = 0;
  const timer = setInterval(() => {
    step++;
    const progress = step / steps;
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = target * eased;
    const formatted = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString();
    el.textContent = prefix + formatted + suffix;
    if (step >= steps) {
      clearInterval(timer);
      el.textContent = original; // restore exact original
    }
  }, interval);
}

/* ─────────────────────────────────────────────
   NAV ACTIVE STATE
───────────────────────────────────────────── */
function updateNavActive(page) {
  // Map page to top-level nav section
  const map = {
    'home': 'home',
    'solutions': 'solutions', 'solutions-advertiser': 'solutions', 'solutions-publisher': 'solutions', 'solutions-agency': 'solutions',
    'products': 'products', 'products-dsp': 'products', 'products-adx': 'products', 'products-ssp': 'products',
    'technology': 'technology',
    'resources': 'resources',
    'case-studies': 'case-studies', 'cases-advertiser': 'case-studies', 'cases-publisher': 'case-studies',
    'company': 'company', 'about': 'company', 'careers': 'company',
    'contact': 'contact',
  };
  const active = map[page] || page;
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.classList.remove('active');
    const onclick = btn.getAttribute('onclick') || '';
    // match by onclick target
    if (onclick.includes(`'${active}'`) || onclick.includes(`"${active}"`)) {
      btn.classList.add('active');
    }
  });
}

/* ─────────────────────────────────────────────
   404 PAGE
───────────────────────────────────────────── */
function render404() {
  return `
  <div class="page-404">
    <div class="err-code">404</div>
    <h2>${t('Page Not Found','页面未找到')}</h2>
    <p>${t('Sorry, the page you are looking for doesn\'t exist or is temporarily unavailable. This may be due to a network issue.',
         '抱歉，您访问的页面不存在或暂时无法访问，这可能是由于网络问题导致的。')}</p>
    <div class="btn-group" style="justify-content:center">
      <button class="btn btn-primary" onclick="navigate('home')">${t('Go Home','返回首页')}</button>
      <button class="btn btn-secondary" onclick="navigate('contact')">${t('Contact Support','联系支持')}</button>
    </div>
  </div>`;
}

function toggleMobileMenu() {
  const menu = document.getElementById('navMenu');
  menu?.classList.toggle('open');
}

function togglePassword(platform) {
  const input = document.getElementById('pwInput_' + platform);
  const icon = document.getElementById('pwIcon_' + platform);
  if (!input) return;
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  // Switch icon between eye and eye-off
  icon.innerHTML = isPassword
    ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`
    : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
}

/* ─────────────────────────────────────────────
   BOOT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderPage('home');
  applyLang();
  updateNavActive('home');
});
