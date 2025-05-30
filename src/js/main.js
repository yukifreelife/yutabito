import { renderOnsenCards, toggleFavorite } from './renderCards.js';
import { renderRecommendedSlider } from './slider.js';

let onsenData = [];

fetch('/onsen.json')
  .then(res => res.json())
  .then(data => {
    onsenData = data;

    // 初期表示
    renderRecommendedSlider(data);
    renderOnsenCards(data);

    // 入力欄とフィルターの取得
    const searchInput = document.getElementById('searchInput');
    const springFilter = document.getElementById('springFilter');
    const regionFilter = document.getElementById('regionFilter');

    // フィルター処理の共通関数
    const applyFilters = () => {
      const keyword = searchInput.value.trim().toLowerCase();
      const spring = springFilter.value;
      const region = regionFilter.value;

      const filtered = onsenData.filter(onsen =>
        (keyword === '' || onsen.name.toLowerCase().includes(keyword)) &&
        (spring === '' || onsen.springType === spring) &&
        (region === '' || onsen.region === region)
      );

      renderOnsenCards(filtered);
    };

    // イベントリスナー登録（統一管理）
    searchInput.addEventListener('input', applyFilters);
    springFilter.addEventListener('change', applyFilters);
    regionFilter.addEventListener('change', applyFilters);
  })
  .catch(error => {
    console.error("温泉データの取得に失敗しました:", error);
  });
