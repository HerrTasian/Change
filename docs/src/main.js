import { siteContent } from './content/siteContent.js';

const app = document.querySelector('#app');
let language = localStorage.getItem('prototype-language') || 'de';
let benefitFilter = 'all';
let expandedBenefit = '';

const icons = {
  users: '👥', leadership: '🧭', digital: '✨', board: '🏛️', learning: '💡', certificate: '🛡️',
  innovation: '🧩', recognition: '✓', career: '🎯', bonus: '€', impact: '▦', roi: '↗',
};

const escapeHtml = (value) => String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
const icon = (name) => `<span class="icon-glyph" aria-hidden="true">${icons[name] || '✨'}</span>`;
const normalizePath = (path) => path === '/' ? '/' : `/${path.replace(/^#?\/?/, '').replace(/\/$/, '')}`;
const currentPath = () => normalizePath(window.location.hash.slice(1) || '/');

function t() { return siteContent[language]; }

function navigate(path) {
  window.location.hash = path === '/' ? '/' : path;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function link(path, label, className = '') {
  const active = currentPath() === path || (path === '/' && currentPath() === '/');
  return `<a href="#${path}" class="${className} ${active ? 'active' : ''}" data-link data-path="${path}">${escapeHtml(label)}</a>`;
}

function sectionHeader({ eyebrow, title, description }, align = 'left') {
  return `<div class="section-header align-${align}">${eyebrow ? `<span class="eyebrow">${escapeHtml(eyebrow)}</span>` : ''}<h2>${escapeHtml(title)}</h2>${description ? `<p>${escapeHtml(description)}</p>` : ''}</div>`;
}

function placeholder(compact = false) {
  return `<aside class="placeholder-notice ${compact ? 'compact' : ''}" aria-label="${escapeHtml(t().ui.placeholderLabel)}"><span aria-hidden="true">✨</span><span>${escapeHtml(t().ui.placeholderNotice)}</span></aside>`;
}

function infoList(title, items, accent = false) {
  return `<div class="info-list ${accent ? 'accent' : ''}"><strong>${escapeHtml(title)}</strong><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>`;
}

function pageHero(content, body) {
  return `<section class="subpage-hero page-section"><div><span class="eyebrow">${escapeHtml(content.eyebrow)}</span><h1>${escapeHtml(content.title)}</h1><p>${escapeHtml(content.description)}</p></div>${placeholder(true)}</section><section class="page-section content-section">${body}</section>`;
}

function layout(pageMarkup) {
  const text = t();
  return `
    <a class="skip-link" href="#main-content">${escapeHtml(text.ui.skip)}</a>
    <header class="site-header">
      <nav class="nav-container" aria-label="${escapeHtml(text.ui.primaryNavigation)}">
        <a class="brand" href="#/" data-link data-path="/" aria-label="${escapeHtml(text.ui.homeLabel)}">
          <span class="brand-mark">DT</span><span><strong>${escapeHtml(text.brand.name)}</strong><small>${escapeHtml(text.brand.claim)}</small></span>
        </a>
        <button class="mobile-menu-button" type="button" aria-label="${escapeHtml(text.ui.openMenu)}" aria-expanded="false" data-menu-button>☰</button>
        <div class="nav-actions" data-menu>
          <div class="nav-links">${text.navigation.map((item) => link(item.path, item.label)).join('')}</div>
          <div class="language-switcher" aria-label="${escapeHtml(text.ui.languageSwitcher)}">
            <span aria-hidden="true">🌐</span>
            <button type="button" class="${language === 'de' ? 'active' : ''}" aria-pressed="${language === 'de'}" data-lang="de">DE</button>
            <button type="button" class="${language === 'en' ? 'active' : ''}" aria-pressed="${language === 'en'}" data-lang="en">EN</button>
          </div>
        </div>
      </nav>
    </header>
    <main id="main-content">${pageMarkup}</main>
    <footer class="footer"><div><strong>${escapeHtml(text.brand.name)}</strong><p>${escapeHtml(text.footer.note)}</p></div><a class="footer-link" href="#/concept" data-link data-path="/concept">${escapeHtml(text.footer.cta)} →</a></footer>`;
}

function overviewPage() {
  const text = t();
  return `
    <section class="hero-section page-section">
      <div class="hero-copy"><span class="eyebrow">${escapeHtml(text.overview.eyebrow)}</span><h1>${escapeHtml(text.overview.title)}</h1><p>${escapeHtml(text.overview.description)}</p><div class="hero-actions"><a class="button primary" href="#/concept" data-link data-path="/concept">${escapeHtml(text.overview.primaryCta)} →</a><a class="button secondary" href="#/benefits" data-link data-path="/benefits">${escapeHtml(text.overview.secondaryCta)}</a></div></div>
      <div class="hero-panel" aria-label="${escapeHtml(text.overview.panelLabel)}"><div class="hero-panel-header"><span>${escapeHtml(text.overview.panelTitle)}</span><strong>${escapeHtml(text.overview.panelScore)}</strong></div><div class="strategy-map">${text.overview.strategyMap.map((step, index) => `<div class="strategy-step"><span>${String(index + 1).padStart(2, '0')}</span><div><strong>${escapeHtml(step.title)}</strong><small>${escapeHtml(step.detail)}</small></div></div>`).join('')}</div></div>
    </section>
    <section class="page-section">${placeholder()}${sectionHeader(text.overview.intro)}<div class="three-column-grid">${text.overview.highlights.map((item) => `<article class="feature-card">${icon(item.icon)}<h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></article>`).join('')}</div></section>
    <section class="page-section tinted-section">${sectionHeader(text.overview.navigationTeaser, 'center')}<div class="route-grid">${text.navigation.filter((item) => item.path !== '/').map((item) => `<a class="route-card" href="#${item.path}" data-link data-path="${item.path}"><span>${escapeHtml(item.label)}</span><span aria-hidden="true">→</span></a>`).join('')}</div></section>`;
}

function targetGroupsPage() {
  const text = t();
  return pageHero(text.targetGroups.hero, `<div class="target-grid">${text.targetGroups.groups.map((group) => `<article class="target-card"><div class="card-title-row"><span class="icon-badge">${icon(group.icon)}</span><h3>${escapeHtml(group.name)}</h3></div>${infoList(text.targetGroups.labels.motives, group.motives)}${infoList(text.targetGroups.labels.needs, group.needs)}${infoList(text.targetGroups.labels.resistance, group.resistance)}${infoList(text.targetGroups.labels.incentives, group.incentives, true)}</article>`).join('')}</div>`);
}

function benefitsPage() {
  const text = t();
  if (!expandedBenefit) expandedBenefit = text.benefits.items[0]?.title || '';
  const items = benefitFilter === 'all' ? text.benefits.items : text.benefits.items.filter((benefit) => benefit.targetKey === benefitFilter);
  return pageHero(text.benefits.hero, `<div class="filter-bar" aria-label="${escapeHtml(text.benefits.filterLabel)}">${text.benefits.filters.map((item) => `<button type="button" class="${benefitFilter === item.key ? 'active' : ''}" data-filter="${item.key}">${escapeHtml(item.label)}</button>`).join('')}</div><div class="benefit-grid">${items.map((benefit) => {
    const expanded = expandedBenefit === benefit.title;
    return `<article class="benefit-card"><button type="button" class="benefit-card-header" aria-expanded="${expanded}" data-benefit="${escapeHtml(benefit.title)}"><span class="icon-badge">${icon(benefit.icon)}</span><span><strong>${escapeHtml(benefit.title)}</strong><small>${escapeHtml(benefit.target)}</small></span><span class="${expanded ? 'rotate' : ''}" aria-hidden="true">⌄</span></button><p>${escapeHtml(benefit.description)}</p><div class="benefit-details ${expanded ? 'show' : ''}"><div class="info-pill"><span>${escapeHtml(text.benefits.labels.effect)}</span><strong>${escapeHtml(benefit.effect)}</strong></div><div class="info-pill"><span>${escapeHtml(text.benefits.labels.relevance)}</span><strong>${escapeHtml(benefit.relevance)}</strong></div></div></article>`;
  }).join('')}</div>`);
}

function resistancePage() {
  const text = t();
  return pageHero(text.resistance.hero, `<div class="resistance-list">${text.resistance.items.map((item) => `<article class="resistance-card"><div><span class="risk-label">${escapeHtml(item.riskLabel)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div><div class="solution-panel"><strong>${escapeHtml(text.resistance.solutionLabel)}</strong><p>${escapeHtml(item.solution)}</p></div></article>`).join('')}</div>`);
}

function economicImpactPage() {
  const text = t();
  return pageHero(text.economicImpact.hero, `<div class="kpi-grid">${text.economicImpact.kpis.map((kpi) => `<article class="kpi-card"><span>${escapeHtml(kpi.label)}</span><strong>${escapeHtml(kpi.value)}</strong><p>${escapeHtml(kpi.title)}</p></article>`).join('')}</div><div class="impact-layout"><div class="chart-placeholder" role="img" aria-label="${escapeHtml(text.economicImpact.chartLabel)}">${text.economicImpact.chartBars.map((bar) => `<div class="chart-row"><span>${escapeHtml(bar.label)}</span><div><i style="width:${bar.value}%"></i></div><strong>${bar.value}%</strong></div>`).join('')}</div><div class="impact-scale"><h3>${escapeHtml(text.economicImpact.scaleTitle)}</h3>${text.economicImpact.effects.map((effect) => `<div class="scale-item"><div><strong>${escapeHtml(effect.title)}</strong><small>${escapeHtml(effect.description)}</small></div><span>${effect.weight}/5</span></div>`).join('')}</div></div>`);
}

function conceptPage() {
  const text = t();
  return pageHero(text.concept.hero, `<div class="framework">${text.concept.framework.map((stage, index) => `<article class="framework-stage"><span class="stage-number">${index + 1}</span><h3>${escapeHtml(stage.title)}</h3><p>${escapeHtml(stage.description)}</p></article>`).join('')}</div><div class="model-panel">${sectionHeader(text.concept.model)}<div class="model-grid">${text.concept.modelPoints.map((point) => `<div><strong>${escapeHtml(point.title)}</strong><p>${escapeHtml(point.description)}</p></div>`).join('')}</div></div>`);
}

function conclusionPage() {
  const text = t();
  return pageHero(text.conclusion.hero, `<div class="conclusion-card">${placeholder(true)}<h3>${escapeHtml(text.conclusion.summaryTitle)}</h3><p>${escapeHtml(text.conclusion.summary)}</p><div class="three-column-grid compact-grid">${text.conclusion.conditions.map((condition) => `<article class="mini-card"><strong>${escapeHtml(condition.title)}</strong><p>${escapeHtml(condition.description)}</p></article>`).join('')}</div></div>`);
}

function pageForPath(path) {
  const pages = {
    '/': overviewPage,
    '/target-groups': targetGroupsPage,
    '/benefits': benefitsPage,
    '/resistance': resistancePage,
    '/economic-impact': economicImpactPage,
    '/concept': conceptPage,
    '/conclusion': conclusionPage,
  };
  return (pages[path] || overviewPage)();
}

function render() {
  document.documentElement.lang = language;
  app.innerHTML = layout(pageForPath(currentPath()));
}

app.addEventListener('click', (event) => {
  const linkElement = event.target.closest('[data-link]');
  if (linkElement) {
    event.preventDefault();
    navigate(linkElement.dataset.path || linkElement.getAttribute('href').replace(/^#/, '') || '/');
    return;
  }
  const langButton = event.target.closest('[data-lang]');
  if (langButton) {
    language = langButton.dataset.lang;
    localStorage.setItem('prototype-language', language);
    expandedBenefit = '';
    render();
    return;
  }
  const filterButton = event.target.closest('[data-filter]');
  if (filterButton) {
    benefitFilter = filterButton.dataset.filter;
    expandedBenefit = '';
    render();
    return;
  }
  const benefitButton = event.target.closest('[data-benefit]');
  if (benefitButton) {
    const title = benefitButton.dataset.benefit;
    expandedBenefit = expandedBenefit === title ? '' : title;
    render();
    return;
  }
  const menuButton = event.target.closest('[data-menu-button]');
  if (menuButton) {
    const menu = app.querySelector('[data-menu]');
    const open = !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? '×' : '☰';
  }
});

window.addEventListener('hashchange', render);
render();
