/* =========================
   ELEMENT REFERENCES
========================= */
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const toggleBtn = document.getElementById('toggle-sidebar');

/* =========================
   SIDEBAR TOGGLE (MOBILE)
========================= */
if (toggleBtn && sidebar && overlay) {
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
  });

  overlay.addEventListener('click', closeSidebar);
}

function closeSidebar() {
  sidebar?.classList.remove('active');
  overlay?.classList.remove('active');
}

/* =========================
   COPY TO CLIPBOARD
   (Event Delegation)
========================= */
document.addEventListener('click', e => {
  if (!e.target.classList.contains('copy-btn')) return;

  const codeBlock = e.target.closest('.code-block')?.querySelector('pre');
  if (!codeBlock) return;

  navigator.clipboard.writeText(codeBlock.innerText).then(() => {
    e.target.textContent = 'Copied!';
    e.target.classList.add('copied');

    setTimeout(() => {
      e.target.textContent = 'Copy';
      e.target.classList.remove('copied');
    }, 2000);
  });
});

/* =========================
   PROGRESS CHECKBOXES
========================= */
document.addEventListener('change', e => {
  if (!e.target.classList.contains('progress-checkbox')) return;

  const label = e.target.nextElementSibling;
  if (!label) return;

  label.style.textDecoration = e.target.checked ? 'line-through' : 'none';
  label.style.color = e.target.checked ? '#666' : 'inherit';
});

/* =========================
   SIDEBAR LINK SCROLL
========================= */
document.addEventListener('click', e => {
  const link = e.target.closest('.sidebar-menu a');
  if (!link) return;

  e.preventDefault();

  setActiveSidebarLink(link);

  const target = document.querySelector(link.getAttribute('href'));
  if (!target) return;

  window.scrollTo({
    top: target.offsetTop - 100,
    behavior: 'smooth'
  });

  if (window.innerWidth <= 992) closeSidebar();
});

function setActiveSidebarLink(activeLink) {
  document.querySelectorAll('.sidebar-menu a')
    .forEach(link => link.classList.remove('active'));

  activeLink.classList.add('active');
}

/* =========================
   ACTIVE LINK ON SCROLL
========================= */
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  let currentId = '';

  sections.forEach(section => {
    if (pageYOffset >= section.offsetTop - 150) {
      currentId = `#${section.id}`;
    }
  });

  document.querySelectorAll('.sidebar-menu a').forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === currentId
    );
  });
});
