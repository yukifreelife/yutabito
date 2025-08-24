import { setupMobileNav } from './nav.js';
setupMobileNav();// /src/js/filterSidebar.js
// 1か所の定義から各ページにフィルターUIを差し込む

export function injectFilterSidebar(targetSelector = '#filter-root') {
  const host = typeof targetSelector === 'string'
    ? document.querySelector(targetSelector)
    : targetSelector;
  if (!host) return;

  host.innerHTML = `
    <aside class="filter-sidebar">
      <h2>♨️ 今日の温泉を探す</h2>

      <label>キーワード検索：
        <input type="text" id="filter-keyword" placeholder="例：草津" />
      </label>

      <label>地域（地方）：
        <select id="filter-region">
          <option value="">すべて</option>
          <option value="北海道">北海道</option>
          <option value="東北">東北</option>
          <option value="関東">関東</option>
          <option value="中部">中部</option>
          <option value="近畿">近畿</option>
          <option value="中国">中国</option>
          <option value="四国">四国</option>
          <option value="九州・沖縄">九州・沖縄</option>
        </select>
      </label>

      <label>都道府県：
        <select id="filter-prefecture">
          <option value="">すべて</option>
          <option value="北海道">北海道</option>
          <option value="青森県">青森県</option><option value="岩手県">岩手県</option>
          <option value="宮城県">宮城県</option><option value="秋田県">秋田県</option>
          <option value="山形県">山形県</option><option value="福島県">福島県</option>
          <option value="茨城県">茨城県</option><option value="栃木県">栃木県</option>
          <option value="群馬県">群馬県</option><option value="埼玉県">埼玉県</option>
          <option value="千葉県">千葉県</option><option value="東京都">東京都</option>
          <option value="神奈川県">神奈川県</option>
          <option value="新潟県">新潟県</option><option value="富山県">富山県</option>
          <option value="石川県">石川県</option><option value="福井県">福井県</option>
          <option value="山梨県">山梨県</option><option value="長野県">長野県</option>
          <option value="岐阜県">岐阜県</option><option value="静岡県">静岡県</option>
          <option value="愛知県">愛知県</option>
          <option value="三重県">三重県</option><option value="滋賀県">滋賀県</option>
          <option value="京都府">京都府</option><option value="大阪府">大阪府</option>
          <option value="兵庫県">兵庫県</option><option value="奈良県">奈良県</option>
          <option value="和歌山県">和歌山県</option>
          <option value="鳥取県">鳥取県</option><option value="島根県">島根県</option>
          <option value="岡山県">岡山県</option><option value="広島県">広島県</option>
          <option value="山口県">山口県</option>
          <option value="徳島県">徳島県</option><option value="香川県">香川県</option>
          <option value="愛媛県">愛媛県</option><option value="高知県">高知県</option>
          <option value="福岡県">福岡県</option><option value="佐賀県">佐賀県</option>
          <option value="長崎県">長崎県</option><option value="熊本県">熊本県</option>
          <option value="大分県">大分県</option><option value="宮崎県">宮崎県</option>
          <option value="鹿児島県">鹿児島県</option><option value="沖縄県">沖縄県</option>
        </select>
      </label>

      <label>泉質：
        <select id="filter-spring">
          <option value="">すべて</option>
          <option value="単純温泉">単純温泉</option>
          <option value="塩化物泉">塩化物泉</option>
          <option value="硫酸塩泉">硫酸塩泉</option>
          <option value="炭酸水素塩泉">炭酸水素塩泉</option>
          <option value="二酸化炭素泉">二酸化炭素泉</option>
          <option value="硫黄泉">硫黄泉</option>
          <option value="酸性泉">酸性泉</option>
          <option value="含鉄泉">含鉄泉</option>
        </select>
      </label>

      <label>景観：
        <select id="filter-scenic">
          <option value="">すべて</option>
          <option value="海">海</option>
          <option value="渓谷">渓谷</option>
          <option value="山">山</option>
          <option value="雪見">雪見</option>
          <option value="星空">星空</option>
        </select>
      </label>

      <button id="apply-filters">検索</button>
    </aside>
  `;
}

// 便利：Enterキーで検索発火もまとめて配線
export function wireFilterEnterToApply() {
  const applyBtn = document.getElementById('apply-filters');
  const kw = document.getElementById('filter-keyword');
  kw?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') applyBtn?.click();
  });
}
