import { renderOnsenCards } from './renderCards.js';
import { setupFavoriteButtons } from './favorite.js';
import { applyFilters, getCriteria } from './filter.js';

// ?q=（中央検索からのキーワード）を取得
const initialQ =
  new URLSearchParams(location.search).get('q')?.trim().toLowerCase() || '';

let all = [];            // 生データ
let filtered = [];       // 絞り込み後データ
let current = 0;
const ITEMS = 20;

fetch(`${import.meta.env.BASE_URL}onsen.json`)
  .then(r => r.json())
  .then(data => {
    all = data;

    // 初期絞り込み（?q= があれば keyword を上書き）
    if (initialQ) {
      // サイドバーにキーワード欄があるなら見た目にも反映
      const kw = document.getElementById('filter-keyword');
      if (kw) kw.value = initialQ;

      filtered = applyFilters(all, { ...getCriteria(), keyword: initialQ });
    } else {
      filtered = applyFilters(all); // UI条件（無ければ全件）
    }

    // 初回 20 件描画
    loadNext();
  })
  .catch(err => console.error('温泉データの取得に失敗しました:', err));

function loadNext() {
  const next = filtered.slice(current, current + ITEMS);
  renderOnsenCards(next, true);
  requestAnimationFrame(setupFavoriteButtons);

  current += ITEMS;

  const btn = document.getElementById('loadMoreBtn');
  if (btn) btn.style.display = current >= filtered.length ? 'none' : 'inline-block';
}

// 「さらに表示」
document.getElementById('loadMoreBtn')?.addEventListener('click', loadNext);

// サイドバーの「検索」ボタンで再絞り込み
document.getElementById('apply-filters')?.addEventListener('click', () => {
  current = 0;
  document.getElementById('onsen-list').innerHTML = '';

  filtered = applyFilters(all); // 現在のUI条件で再計算

  const btn = document.getElementById('loadMoreBtn');
  if (btn) btn.style.display = 'inline-block';

  loadNext();
});
