import { setupMobileNav } from './nav.js';
setupMobileNav();
// utils.js
export function generateImageWithFallback(romaji, altText = '') {
  const base = `${import.meta.env.BASE_URL}assets/images/onsen_${romaji}.jpg`;
  const fallback = `${import.meta.env.BASE_URL}assets/images/placeholder.jpg`;

  const img = document.createElement('img');
  img.src = base;
  img.alt = altText;
  img.onerror = function () {
    this.onerror = null;
    this.src = fallback;
  };

  return img;
}