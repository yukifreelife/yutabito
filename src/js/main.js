import { renderOnsenCards } from './renderCards.js';
import { renderRecommendedSlider } from './slider.js';

fetch('/onsen.json')
  .then(res => res.json())
  .then(data => {
    renderRecommendedSlider(data);
    renderOnsenCards(data);
  })
  .catch(error => {
    console.error("温泉データの取得に失敗しました:", error);
  });
