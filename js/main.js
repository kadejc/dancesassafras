// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Gallery tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const gallerySections = document.querySelectorAll('.gallery-section');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    gallerySections.forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById(btn.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// Lightbox for gallery
const galleryItems = document.querySelectorAll('.gallery-item[data-src]');
if (galleryItems.length) {
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.innerHTML = `
    <div class="lb-overlay"></div>
    <div class="lb-content">
      <button class="lb-close">&times;</button>
      <img src="" alt="Gallery image">
    </div>`;
  lightbox.style.cssText = `
    display:none;position:fixed;inset:0;z-index:2000;
    align-items:center;justify-content:center;`;
  document.body.appendChild(lightbox);

  const lbOverlay = lightbox.querySelector('.lb-overlay');
  const lbImg = lightbox.querySelector('img');
  const lbClose = lightbox.querySelector('.lb-close');

  lbOverlay.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0.9);';
  lightbox.querySelector('.lb-content').style.cssText =
    'position:relative;z-index:1;max-width:90vw;max-height:90vh;';
  lbImg.style.cssText = 'max-width:90vw;max-height:85vh;border-radius:4px;';
  lbClose.style.cssText = `
    position:absolute;top:-2rem;right:0;background:none;border:none;
    color:#fff;font-size:2rem;cursor:pointer;line-height:1;`;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      lbImg.src = item.dataset.src;
      lightbox.style.display = 'flex';
    });
  });
  [lbClose, lbOverlay].forEach(el =>
    el.addEventListener('click', () => { lightbox.style.display = 'none'; })
  );
}
