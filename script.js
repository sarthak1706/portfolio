// ===== TYPING EFFECT =====
const words = ['Software Developer', 'Web Developer', 'Database Enthusiast'];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = words[wordIndex];
  typedEl.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length + 1) {
    isDeleting = true;
    delay = 1500;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 400;
  }
  setTimeout(type, delay);
}
type();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 50);
  scrollTopBtn.classList.toggle('visible', y > 400);
  highlightNav();
  revealElements();
});

// ===== SCROLL TO TOP =====
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE NAV HIGHLIGHT =====
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  let current = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}

// ===== SCROLL REVEAL =====
function revealElements() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add('visible');
  });
}
revealElements(); // run on load

// ===== CERTIFICATE FILTER =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.cert-card').forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

// ===== CERTIFICATE MODAL =====
const certModal = document.getElementById('certModal');
const certModalClose = document.getElementById('certModalClose');
const certModalOverlay = document.getElementById('certModalOverlay');

const iconMap = {
  Programming: '<i class="fas fa-code" style="color:var(--accent)"></i>',
  Database: '<i class="fas fa-database" style="color:#34d399"></i>',
  'Data Analytics': '<i class="fas fa-chart-bar" style="color:#fbbf24"></i>'
};

document.querySelectorAll('.view-cert-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const { title, org, duration, grade, category, desc, file } = btn.dataset;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalOrg').textContent = org;
    document.getElementById('modalDuration').innerHTML = `<i class="fas fa-calendar-alt"></i> ${duration}`;
    document.getElementById('modalGrade').innerHTML = `<i class="fas fa-star"></i> ${grade}`;
    document.getElementById('modalCategory').textContent = category;
    document.getElementById('modalDesc').textContent = desc;
    document.getElementById('modalIcon').innerHTML = iconMap[category] || iconMap.Programming;
    document.getElementById('modalIframe').src = file;
    document.getElementById('modalOpenBtn').href = file;
    certModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  certModal.classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('modalIframe').src = '';
}
certModalClose.addEventListener('click', closeModal);
certModalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  success.classList.add('show');
  e.target.reset();
  setTimeout(() => success.classList.remove('show'), 4000);
});
