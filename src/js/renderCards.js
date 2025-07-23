import { setupFavoriteButtons } from './favorite.js';


// 温泉カードを生成してページに追加する関数
function renderOnsenCards(onsenList, append = false) {
  const container = document.getElementById('onsen-list');

  if (!append) {
    container.innerHTML = '';
  }

  onsenList.forEach(onsen => {
    console.log("画像パス確認:", `/assets/images/onsen_${onsen.romaji}.jpg`);

    const card = document.createElement('div');
    card.className = 'onsen-card';

    const link = document.createElement('a');
    link.href = `onsen.html?id=${onsen.id}`;
    link.className = 'onsen-link';    

// ✅ 画像生成（onerrorもDOMで明示）
    const imagePath = `${import.meta.env.BASE_URL}assets/images/onsen_${onsen.romaji}.jpg`;
    const fallbackImage = `${import.meta.env.BASE_URL}assets/images/placeholder.jpg`;

    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = onsen.name;
    img.onerror = function () {
      this.onerror = null;
      this.src = fallbackImage;
    };

    // ✅ カード内容（テキストとボタン）
    const content = document.createElement('div');
    content.className = 'card-content';

    const title = document.createElement('h3');
    title.textContent = onsen.name;

    const desc = document.createElement('p');
    desc.textContent = onsen.description || '癒しの温泉地です。';

    content.appendChild(title);
    content.appendChild(desc);
    link.appendChild(img);
    link.appendChild(content);


    const favBtn = document.createElement('button');
    favBtn.className = 'favorite-btn';
    favBtn.setAttribute('data-id', String(onsen.id));
    favBtn.textContent = '♡';

    // ✅ 要素の組み立て
    card.appendChild(link);
    card.appendChild(favBtn);
    container.appendChild(card);
  });

  setupFavoriteButtons();
}

// お気に入りボタンの設定
export { renderOnsenCards };