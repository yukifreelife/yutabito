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
    const regionFilter = document.getElementById('regionFilter');
    const sortSelect = document.getElementById('sortFilter');
    sortSelect.addEventListener('change', () => {
    sort = sortSelect.value;
    applyFilters();
    });



    // フィルター処理の共通関数
const applyFilters = () => {
  const keyword = document.getElementById('searchInput').value.trim().toLowerCase();
  const region = document.getElementById('regionFilter').value;
  const prefecture = document.getElementById('prefectureFilter').value;
  const spring = document.getElementById('springTypeFilter').value;
  const flowMin = parseFloat(document.getElementById('flowRateMin').value) || 0;
  const flowMax = parseFloat(document.getElementById('flowRateMax').value) || Infinity;
  const gensenOnly = document.getElementById('gensenFilter').checked;
  const sort = document.getElementById('sortFilter').value;

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const filtered = onsenData.filter(onsen =>
    (keyword === '' || onsen.name.toLowerCase().includes(keyword)) &&
    (region === '' || onsen.region === region) &&
    (prefecture === '' || onsen.prefecture === prefecture) &&
    (spring === '' || onsen.springType === spring) &&
    (onsen.flowRate >= flowMin && onsen.flowRate <= flowMax) &&
    (!gensenOnly || onsen.gensen === true) &&
    (!favoritesOnly || favorites.includes(onsen.id))
  );
 // 並び替え
  if (sort === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'name-desc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  renderOnsenCards(filtered);

  const noResultSection = document.getElementById("no-result");
  if (filtered.length === 0) {
    noResultSection.style.display = "block";
  } else {
    noResultSection.style.display = "none";
  }
};

    // イベントリスナー登録（統一管理）
    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('regionFilter').addEventListener('change', applyFilters);
    document.getElementById('prefectureFilter').addEventListener('change', applyFilters);
    document.getElementById('springTypeFilter').addEventListener('change', applyFilters);
    document.getElementById('flowRateMin').addEventListener('input', applyFilters);
    document.getElementById('flowRateMax').addEventListener('input', applyFilters);
    document.getElementById('gensenFilter').addEventListener('change', applyFilters);

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
