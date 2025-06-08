import { renderRecommendedSlider } from './slider.js';
import { setupFavoriteButtons } from './favorite.js';

fetch('/onsen.json')
  .then(res => res.json())
  .then(data => {
    renderRecommendedSlider(data); // おすすめ温泉のみ表示
    setupFavoriteButtons(); 
  })
  .catch(err => {
    console.error("温泉データの取得に失敗しました:", err);
  });

  document.getElementById('showFavoritesBtn').addEventListener('click', () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const favoriteData = data.filter(onsen => favorites.includes(onsen.name));
  renderRecommendedSlider(favoriteData);
});

