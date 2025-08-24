import { setupMobileNav } from './nav.js';
setupMobileNav();
// src/js/loadOnsenDetail.js
import { setupFavoriteButtons } from './favorite.js';

/**
 * 温泉詳細のエントリポイント
 * 優先順：
 *   1) descriptions/{romaji}.md があれば最優先（Markdown）
 *   2) descriptions/overrides.json に romaji キーがあればそれを段落化して使用
 *   3) onsen.json の description を段落化
 *   4) 何も無ければ JSON の属性から文章を自動合成（テンプレ）
 */
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

  // --- 1) 長文説明（Markdown）を安全に読み込み ---
  let mdHtml = '';
  try {
    const mdUrl = `${import.meta.env.BASE_URL}descriptions/${onsen.romaji}.md`;
    const r = await fetch(mdUrl, { cache: 'no-store' });
    if (r.ok) {
      const ct = r.headers.get('content-type') || '';
      const txt = await r.text();
      // Vite の SPA フォールバック（index.html）が返るのを弾く
      const looksHtml = /text\/html/i.test(ct) || /^<!doctype/i.test(txt);
      if (!looksHtml) mdHtml = mdToHtml(txt); // 簡易 Markdown → HTML
    }
  } catch { /* 失敗時は無視してフォールバックへ */ }

  // --- 2) overrides.json を 1 回だけ取得し、romaji キーを探す ---
  const overrides = await getOverrides();
  const overrideText = overrides?.[onsen.romaji];

  // --- 3) 最終決定（フォールバック順） ---
  const descriptionHtml =
    mdHtml
      ? mdHtml
      : overrideText
        ? toParagraphs(overrideText)
        : onsen.description
          ? toParagraphs(onsen.description)
          : toParagraphs(synthesizeDescription(onsen));

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

    <div class="description-box">${descriptionHtml}</div>

    <p><strong>地域：</strong>${esc(onsen.region || '')}${onsen.prefecture ? `（${esc(onsen.prefecture)}）` : ''}</p>
    <p><strong>泉質：</strong>${esc(onsen.springType || '')}</p>

    <button class="favorite-btn" data-id="${onsen.id}">♡</button>

    <div class="btn-group">
      <a class="btn" href="${ryokanLink}" target="_blank" rel="noopener">旅館を探す</a>
      <a class="btn secondary" href="${kankouLink}" target="_blank" rel="noopener">観光協会サイト</a>
    </div>

    <h3>地図で場所を確認</h3>
    ${mapEmbed}
  `;

  // ふた押し対策済みの favorite.js をそのまま再適用
  setupFavoriteButtons();
}

/* ---------------- ヘルパ ---------------- */

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
      if (b.startsWith('### ')) return `<h4>${esc(b.slice(4))}</h4>`;
      if (b.startsWith('## '))  return `<h3>${esc(b.slice(3))}</h3>`;
      if (b.startsWith('# '))   return `<h2>${esc(b.slice(2))}</h2>`;
      return `<p>${esc(b).replace(/\n/g, '<br>')}</p>`;
    })
    .join('');
}

// overrides.json を 1 回だけ取得（なければ {}）
let _overridesCache = null;
async function getOverrides() {
  if (_overridesCache) return _overridesCache;
  try {
    const url = `${import.meta.env.BASE_URL}descriptions/overrides.json`;
    const res = await fetch(url, { cache: 'no-store' });
    _overridesCache = res.ok ? await res.json() : {};
  } catch {
    _overridesCache = {};
  }
  return _overridesCache;
}

// プレーンテキストを段落 <p> に変換（\n\n 区切り）
function toParagraphs(text = '') {
  return String(text)
    .trim()
    .split(/\n{2,}/)
    .map(p => `<p>${esc(p)}</p>`)
    .join('\n');
}

// JSON の属性から説明文を合成（テンプレ）
function synthesizeDescription(o) {
  const parts = [];

  // 場所
  const loc = o.prefecture
    ? `${o.prefecture}${o.region ? `（${o.region}）` : ''}`
    : (o.region || '');
  parts.push(`${o.name}は${loc || '日本各地'}にある温泉地です。`);

  // 泉質
  if (o.springType) {
    parts.push(`泉質は「${o.springType}」。${skinFeelHint(o.springType)}。`);
  }

  // 湧出量
  if (o.flowRate) {
    const lpm = Number(o.flowRate).toLocaleString('ja-JP');
    parts.push(`湧出量はおよそ${lpm} L/分で、源泉の力強さを感じられます。`);
  }

  // 景観タグ（あれば）
  if (Array.isArray(o.scenicTags) && o.scenicTags.length) {
    parts.push(`${o.scenicTags.join('・')}の景観も魅力です。`);
  }

  // 汎用の締め
  parts.push('のんびり湯浴みから観光まで、幅広く楽しめます。');

  return parts.join('\n\n');
}

function skinFeelHint(type = '') {
  if (type.includes('硫黄'))   return '独特の香りとさっぱりとした浴感';
  if (type.includes('炭酸水素')) return 'ぬるりとした肌触りで、つるすべの感触';
  if (type.includes('塩化物')) return '保温性が高く湯冷めしにくい';
  if (type.includes('酸性'))   return 'キリッと引き締まる入り心地';
  return 'やさしい入り心地';
}
