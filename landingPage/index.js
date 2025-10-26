/* scripts.js
   Comportamiento:
   - menú móvil
   - scroll suave para enlaces ancla
   - active link según sección visible
   - botón "Empezar ahora" configurable (APP_URL)
*/

(() => {
  const APP_URL = 'https://github.com/Open-Source-7385/QuizBee-Report';
  // si quieres redirigir a la web app desplegada, reemplaza APP_URL con la URL final, p.e:
  // const APP_URL = 'https://quizbee-report.vercel.app/';

  // nav toggle (mobile)
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle && navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // smooth scroll for internal links
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // if link is '#', ignore
      const href = link.getAttribute('href');
      if (!href || href === '#') {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 68; // offset navbar
        window.scrollTo({ top: y, behavior: 'smooth' });
        // close mobile menu after click
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Empezar ahora buttons (hero and nav)
  const startButtons = [document.getElementById('startBtn'), document.getElementById('heroStart'), document.getElementById('downloadStart'), document.getElementById('downloadStart')].filter(Boolean);
  startButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = APP_URL;
    });
  });

  // highlight active nav link using IntersectionObserver
  const sections = document.querySelectorAll('section[id], header');
  const options = { root: null, rootMargin: '-30% 0px -30% 0px', threshold: 0 };
  const navItems = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.target.id) return;
      const id = entry.target.id;
      if (entry.isIntersecting) {
        navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }, options);

  sections.forEach(sec => observer.observe(sec));

  // accessibility: close nav on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
