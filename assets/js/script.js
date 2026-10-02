const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', function () {
    const open = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  navigation.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function () {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('[aria-disabled="true"]').forEach(function (link) {
  link.addEventListener('click', function (event) { event.preventDefault(); });
});

const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(function (element) {
  revealObserver.observe(element);
});

const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]:not(.apply-link)'));
const trackedSections = Array.from(document.querySelectorAll('#home, #organizers, #schedule'));
const sectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
    });
  });
}, { rootMargin: '-35% 0px -55%', threshold: 0 });

trackedSections.forEach(function (section) { sectionObserver.observe(section); });
