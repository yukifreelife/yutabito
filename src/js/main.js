import { renderOnsenCards, toggleFavorite } from './renderCards.js';
import { renderRecommendedSlider } from './slider.js';

let onsenData = [];
let sort = '';

let favoritesOnly = false;

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
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', () => {
    sort = sortSelect.value;
    applyFilters();
    });



    // フィルター処理の共通関数
    const applyFilters = () => {
      const sort = sortSelect.value;
      const keyword = searchInput.value.trim().toLowerCase();
      const spring = springFilter.value;
      const region = regionFilter.value;
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

      const filtered = onsenData.filter(onsen =>
        (keyword === '' || onsen.name.toLowerCase().includes(keyword)) &&
        (spring === '' || onsen.springType === spring) &&
        (region === '' || onsen.region === region) &&
        (!favoritesOnly || favorites.includes(onsen.id)) 
      );

            // 並び替え処理
        if (sort === 'name-asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'name-desc') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sort === 'region-asc') {
        filtered.sort((a, b) => a.region.localeCompare(b.region));
        } else if (sort === 'region-desc') {
        filtered.sort((a, b) => b.region.localeCompare(a.region));
        }


      renderOnsenCards(filtered);
    };

    // イベントリスナー登録（統一管理）
    searchInput.addEventListener('input', applyFilters);
    springFilter.addEventListener('change', applyFilters);
    regionFilter.addEventListener('change', applyFilters);

    document.getElementById('favoritesToggle').addEventListener('click', () => {
      favoritesOnly = !favoritesOnly;
      const btn = document.getElementById('favoritesToggle');
      btn.textContent = favoritesOnly ? '🔁 全ての温泉を表示' : '❤️ お気に入りのみ表示';
      applyFilters();
    });
  })
  .catch(error => {
    console.error("温泉データの取得に失敗しました:", error);
  });
