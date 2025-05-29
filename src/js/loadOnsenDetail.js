// URLパラメータから ?id=〇〇 を取得
const params = new URLSearchParams(window.location.search);
const onsenId = params.get("id");

// 該当温泉データを検索
const onsen = onsenData.find(o => o.id === onsenId);

// 表示処理
const container = document.getElementById("onsen-detail");

if (onsen) {
  container.innerHTML = `
    <h2>${onsen.name}</h2>
    <img src="${onsen.imageUrl}" alt="${onsen.name}" />
    <div class="description-box">
      <p>${onsen.description}</p>
    </div>
    <p><strong>地域：</strong>${onsen.region}</p>
    <p><strong>泉質：</strong>${onsen.springType}</p>
    <p>
      <a href="https://www.google.com/search?q=${onsen.name}+旅館" target="_blank">旅館を探す</a>
    </p>
  `;
} else {
  container.innerHTML = `<p>温泉情報が見つかりませんでした。</p>`;
}

// Google Mapの埋め込み（温泉名で検索）
const googleMapEmbed = `
  <iframe
    src="https://www.google.com/maps?q=${encodeURIComponent(onsen.name)}&output=embed"
    width="100%" height="300" style="border:0; border-radius: 8px;" allowfullscreen=""
    loading="lazy" referrerpolicy="no-referrer-when-downgrade">
  </iframe>
`;

// 表示処理に追加
container.innerHTML = `
  <h2>${onsen.name}</h2>
  <img src="${onsen.imageUrl}" alt="${onsen.name}" />
  <div class="description-box">
    <p>${onsen.description}</p>
  </div>
  <p><strong>地域：</strong>${onsen.region}</p>
  <p><strong>泉質：</strong>${onsen.springType}</p>
  <p>
    <a class="btn" href="https://www.google.com/search?q=${onsen.name}+旅館" target="_blank">旅館を探す</a>
  </p>
  <h3>地図で場所を確認</h3>
  ${googleMapEmbed}
`;

// 観光協会公式サイトの仮リンク（Google検索に差し替え可能）
const kankouLink = `https://www.google.com/search?q=${encodeURIComponent(onsen.name)}+観光協会`;

container.innerHTML = `
  <h2>${onsen.name}</h2>
  <img src="${onsen.imageUrl}" alt="${onsen.name}" />
  <div class="description-box">
    <p>${onsen.description}</p>
  </div>
  <p><strong>地域：</strong>${onsen.region}</p>
  <p><strong>泉質：</strong>${onsen.springType}</p>

  <div class="btn-group">
    <a class="btn" href="https://www.google.com/search?q=${onsen.name}+旅館" target="_blank">旅館を探す</a>
    <a class="btn secondary" href="${kankouLink}" target="_blank">観光協会サイト</a>
  </div>

  <h3>地図で場所を確認</h3>
  ${googleMapEmbed}
`;

