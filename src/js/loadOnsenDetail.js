import { setupFavoriteButtons } from './favorite.js';

export async function loadOnsenDetail() {
  const container = document.getElementById('onsen-detail');
  if (!container) return;

  // ?id= を取得
  const id = new URLSearchParams(location.search).get('id');

  // onsen.json をロード
  let list = [];
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}onsen.json`);
    list = await res.json();
  } catch {
    container.innerHTML = '<p>データの取得に失敗しました。</p>';
    return;
  }

  const onsen = list.find(o => String(o.id) === String(id));
  if (!onsen) {
    container.innerHTML = '<p>温泉情報が見つかりませんでした。</p>';
    return;
  }

  // 画像 URL（フォールバック付）
  const imgUrl = `${import.meta.env.BASE_URL}assets/images/onsen_${onsen.romaji}.jpg`;
  const fallbackImg = `${import.meta.env.BASE_URL}assets/images/placeholder.jpg`;

  // --- 長文説明（Markdown）を安全に読み込み ---
  let longHtml = '';
  try {
    const mdUrl = `${import.meta.env.BASE_URL}descriptions/${onsen.romaji}.md`;
    const r = await fetch(mdUrl, { cache: 'no-store' });

    if (r.ok) {
      const ct = r.headers.get('content-type') || '';
      const txt = await r.text();

      // Vite の SPA フォールバック（index.html）を誤挿入しない対策
      const looksHtml = /text\/html/i.test(ct) || /^<!doctype/i.test(txt);

      if (!looksHtml) {
        longHtml = mdToHtml(txt); // 簡易 Markdown → HTML
      }
    }
  } catch { /* 失敗時は無視して既定説明にフォールバック */ }

  const descHtml =
    longHtml || `<p>${esc(onsen.description || '癒しの温泉地です。')}</p>`;

  // 観光協会・旅館リンク
  const kankouLink =
    `https://www.google.com/search?q=${encodeURIComponent(onsen.name + ' 観光協会')}`;
  const ryokanLink =
    `https://www.google.com/search?q=${encodeURIComponent(onsen.name + ' 旅館')}`;

  // Google マップ埋め込み
  const mapQuery = onsen.mapQuery || onsen.name;
  const mapEmbed = `
    <iframe
      src="https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed"
      width="100%" height="300"
      style="border:0; border-radius: 8px;"
      allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
    </iframe>`;

  // 描画
  container.innerHTML = `
    <h2>${esc(onsen.name)}</h2>
    <img src="${imgUrl}" alt="${esc(onsen.name)}"
         onerror="this.src='${fallbackImg}'" />

    <div class="description-box">${descHtml}</div>

    <p><strong>地域：</strong>${esc(onsen.region || '')}</p>
    <p><strong>泉質：</strong>${esc(onsen.springType || '')}</p>

    <button class="favorite-btn" data-id="${onsen.id}">♡</button>

    <div class="btn-group">
      <a class="btn" href="${ryokanLink}" target="_blank" rel="noopener">旅館を探す</a>
      <a class="btn secondary" href="${kankouLink}" target="_blank" rel="noopener">観光協会サイト</a>
    </div>

    <h3>地図で場所を確認</h3>
    ${mapEmbed}
  `;

  setupFavoriteButtons();
}

// --- ヘルパ ---
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, m => (
    { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[m]
  ));
}

// 超簡易 Markdown → HTML（必要なら後で強化）
function mdToHtml(md) {
  return md
    .split(/\r?\n\r?\n/)
    .map(block => {
      const b = block.trim();
      if (!b) return '';
      if (b.startsWith('## ')) return `<h4>${esc(b.slice(3))}</h4>`;
      if (b.startsWith('# '))  return `<h3>${esc(b.slice(2))}</h3>`;
      return `<p>${esc(b).replace(/\n/g, '<br>')}</p>`;
    })
    .join('');
}
