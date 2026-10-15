(() => {
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.site-nav');
  const navLinks = [...document.querySelectorAll('.site-nav a')];

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });

    navLinks.forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  const filters = [...document.querySelectorAll('.filter')];
  const pubs = [...document.querySelectorAll('.publication')];
  filters.forEach(button => {
    button.addEventListener('click', () => {
      const type = button.dataset.filter;
      filters.forEach(b => b.classList.toggle('active', b === button));
      pubs.forEach(pub => pub.classList.toggle('hidden', type !== 'all' && pub.dataset.type !== type));
    });
  });

  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const activateNav = () => {
    let current = '';
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 130) current = section.id;
    }
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', activateNav, { passive: true });
  activateNav();

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
