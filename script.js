const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const menuButton = document.querySelector('.mobile-menu');
const mobileNav = document.querySelector('.mobile-nav');
if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

const filters = document.querySelectorAll('.filter');
const pubs = document.querySelectorAll('.publication');
filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    pubs.forEach(pub => {
      pub.hidden = filter !== 'all' && pub.dataset.type !== filter;
    });
  });
});

const navItems = [...document.querySelectorAll('.side-nav .nav-item')];
const sections = [...document.querySelectorAll('[data-section]')];
if ('IntersectionObserver' in window && navItems.length && sections.length) {
  const byId = new Map(navItems.map(item => [item.getAttribute('href').slice(1), item]));
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navItems.forEach(item => item.classList.remove('active'));
    const active = byId.get(visible.target.id);
    if (active) active.classList.add('active');
  }, {rootMargin:'-18% 0px -66% 0px', threshold:[0,.15,.35,.6]});
  sections.forEach(section => observer.observe(section));
}
