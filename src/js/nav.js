// src/js/nav.js
export function setupMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav    = document.getElementById('site-menu');
  if (!toggle || !nav) return;

  const root = document.documentElement;

  const open = () => {
    nav.classList.add('is-open');
    root.classList.add('nav-open');              // スクロール固定用
    toggle.setAttribute('aria-expanded', 'true');
  };

  const close = () => {
    nav.classList.remove('is-open');
    root.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    nav.classList.contains('is-open') ? close() : open();
  });

  // ナビ内のリンクを押したら閉じる
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) close();
  });

  // 画面を広げたら閉じ状態に戻す（レイアウト崩れ防止）
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) close();
  });
}
