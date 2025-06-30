import { setupFavoriteButtons } from './favorite.js';
function generateImageUrl(romaji) {
  return `/assets/images/onsen_${romaji}.jpg`;
}

// おすすめ温泉スライダーを描画
export function renderRecommendedSlider(data) {
  const slider = document.getElementById("recommended-slider");
  slider.innerHTML = "";

  // ランダムに3〜5件抽出
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);

  selected.forEach(onsen => {
    const card = document.createElement("a");
    card.className = "slider-card";
    card.href = `onsen.html?id=${onsen.id}`;

    card.innerHTML = `
      <img src="${generateImageUrl(onsen.romaji)}" alt="${onsen.name}">
      <h4>${onsen.name}</h4>
      <button class="favorite-btn" data-id="${onsen.id}">♡</button>

    `;

    slider.appendChild(card);
  });
  setupFavoriteButtons();
  
}

