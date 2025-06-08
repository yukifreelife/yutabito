import { renderRecommendedSlider } from './slider.js';

fetch('/onsen.json')
  .then(res => res.json())
  .then(data => {
    renderRecommendedSlider(data); // おすすめ温泉のみ表示
  })
  .catch(err => {
    console.error("温泉データの取得に失敗しました:", err);
  });
