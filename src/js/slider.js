import { generateImageWithFallback } from './utils.js';
import { setupFavoriteButtons } from './favorite.js';

// おすすめ温泉スライダーを描画
export function renderRecommendedSlider(data) {
  const slider = document.getElementById("recommended-slider");
  slider.innerHTML = "";

  // ランダムに3〜5件抽出
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);

  selected.forEach(onsen => {
    const card = document.createElement("div");
    card.className = "slider-card";

  const link = document.createElement('a');
  link.href = `onsen.html?id=${onsen.id}`;

  const img = generateImageWithFallback(onsen.romaji, onsen.name);
  const h4 = document.createElement('h4');
  h4.textContent = onsen.name;

  link.appendChild(img);
  link.appendChild(h4);

  const favBtn = document.createElement('button');
  favBtn.className = 'favorite-btn';
  favBtn.setAttribute('data-id', onsen.id);
  favBtn.textContent = '♡';

  card.appendChild(link);
  card.appendChild(favBtn);

    slider.appendChild(card);
  });
  setupFavoriteButtons();
  
}

