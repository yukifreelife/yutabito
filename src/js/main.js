import { renderRecommendedSlider } from './slider.js';
import { setupFavoriteButtons } from './favorite.js';

let allOnsenData = [];

fetch('./onsen.json')
  .then(res => res.json())
  .then(data => {
    allOnsenData = data;
    renderRecommendedSlider(data); // 初期表示：ランダム
  })
  .catch(err => {
    console.error("温泉データの取得に失敗しました:", err);
  });

// お気に入りだけ表示ボタン（存在する場合のみ）
const showFavoritesBtn = document.getElementById('showFavoritesBtn');
if (showFavoritesBtn) {
  showFavoritesBtn.addEventListener('click', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritesSet = new Set(favorites.map(String));
    const favoriteData = allOnsenData.filter(onsen => favoritesSet.has(String(onsen.id)));

    renderRecommendedSlider(favoriteData);
    setupFavoriteButtons(); // 再度ボタンを有効化
  });
}

