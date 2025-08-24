import { setupMobileNav } from './nav.js';
setupMobileNav();
import { injectFilterSidebar, wireFilterEnterToApply } from './filterSidebar.js';
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

injectFilterSidebar('#filter-root');   // ← まずUIを挿入
wireFilterEnterToApply();              // ← Enterで発火

// ❷ データ取得後に初期描画＆フィルタボタンのバインド
fetch(`${import.meta.env.BASE_URL}onsen.json`)
  .then(res => res.json())
  .then(data => {
    allOnsenData = data;
    renderRecommendedSlider(allOnsenData); // 初期表示

    // 既存の apply-filters を共通UIで拾って再描画
    document.getElementById('apply-filters')?.addEventListener('click', () => {
      const list = applyFilters(allOnsenData);
      renderRecommendedSlider(list);
      setupFavoriteButtons();
    });
  });

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
