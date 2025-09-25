// src/js/nav.js
export function setupMobileNav() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const btn  = header.querySelector('.nav-toggle');
  const menu = header.querySelector('.main-nav');
  if (!btn || !menu) return;

  const open = () => {
    menu.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // 背景スクロール抑止（任意）
  };

  const close = () => {
    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // 解除
  };

  btn.addEventListener('click', () => {
    if (menu.classList.contains('is-open')) close();
    else open();
  });

  // メニュー中のリンクを押したら閉じる
  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a) close();
  });

  // 外側クリックで閉じる
  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('is-open')) return;
    const clickedInside = e.target.closest('.main-nav') || e.target.closest('.nav-toggle');
    if (!clickedInside) close();
  });

  // ESCで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // 画面を広げたら強制リセット
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 820) close();
  });
}

// 互換目的：過去の import 名でも動くように
export { setupMobileNav as initHamburger };
export { setupMobileNav as setupMobileNavMenu };
