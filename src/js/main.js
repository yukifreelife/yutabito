import { renderRecommendedSlider } from './slider.js';
import { setupFavoriteButtons } from './favorite.js';
import { applyFilters } from './filter.js';

// ❶ ページ読み込み直後 & リサイズ時に実行
function updateHeaderHeightVar() {
  const h = document.querySelector('.site-header').offsetHeight;
  document.documentElement.style.setProperty('--header-h', `${h}px`);
}
window.addEventListener('load', updateHeaderHeightVar);
window.addEventListener('resize', updateHeaderHeightVar);

let allOnsenData = [];

// ❷ データ取得後に初期描画＆フィルタボタンのバインド
fetch(`${import.meta.env.BASE_URL}onsen.json`)
  .then(res => res.json())
  .then(data => {
    allOnsenData = data;
    renderRecommendedSlider(allOnsenData); // 初期表示

    // サイドバーの「検索」ボタン
    const applyBtn = document.getElementById('apply-filters');
    applyBtn?.addEventListener('click', () => {
      const list = applyFilters(allOnsenData);
      renderRecommendedSlider(list);
      setupFavoriteButtons();
    });

    // サイドバーのキーワード Enter
    const kw = document.getElementById('filter-keyword');
    kw?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') applyBtn?.click();
    });
  })
  .catch(err => console.error('温泉データの取得に失敗しました:', err));

// ❸ お気に入りだけ表示ボタン（※ fetch の外：独立）
const showFavoritesBtn = document.getElementById('showFavoritesBtn');
if (showFavoritesBtn) {
  showFavoritesBtn.addEventListener('click', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favSet = new Set(favorites.map(String));
    const favoriteData = allOnsenData.filter(o => favSet.has(String(o.id)));
    renderRecommendedSlider(favoriteData);
    setupFavoriteButtons();
  });
}

// ❹ 中央の「温泉名で検索」 → list.html?q=… に遷移（※ 完全に独立して置く）
const nameInput = document.getElementById('searchInput');
const nameBtn   = document.getElementById('searchByNameBtn');

function goToListWithQuery() {
  const q = nameInput?.value.trim();
  if (!q) { nameInput?.focus(); return; }
  const url = new URL('list.html', location.href); // base を考慮
  url.searchParams.set('q', q);
  location.href = url.toString();
}

nameBtn?.addEventListener('click', goToListWithQuery);
nameInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') goToListWithQuery();
});
