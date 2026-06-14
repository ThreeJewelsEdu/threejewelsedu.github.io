// ============================================
// RATNATRAYA INSTITUTE — Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ── Navbar scroll effect ──
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  // ── Hamburger menu ──
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ── AOS (Animate on Scroll) ──
  const aosElements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-aos-delay') || 0;
        setTimeout(() => entry.target.classList.add('aos-animate'), parseInt(delay));
      }
    });
  }, { threshold: 0.1 });
  aosElements.forEach(el => observer.observe(el));

  // ── Counter animation ──
  function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { el.textContent = target.toLocaleString() + '+'; clearInterval(timer); }
      else el.textContent = Math.floor(start).toLocaleString() + '+';
    }, 16);
  }
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = true;
        animateCounter(entry.target, parseInt(entry.target.dataset.count));
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // ── Active nav link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });

  // ── Particles.js init ──
  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#D4AF37' },
        shape: { type: 'circle' },
        opacity: { value: 0.4, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
        size: { value: 2.5, random: true, anim: { enable: true, speed: 2, size_min: 0.5, sync: false } },
        line_linked: { enable: true, distance: 150, color: '#D4AF37', opacity: 0.12, width: 1 },
        move: { enable: true, speed: 1.2, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.4 } }, push: { particles_nb: 3 } }
      },
      retina_detect: true
    });
  }

});
