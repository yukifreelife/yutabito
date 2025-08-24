import { setupMobileNav } from './nav.js';
setupMobileNav();
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

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'image-wrapper';

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

    link.appendChild(img);

    const favBtn = document.createElement('button');
    favBtn.className = 'favorite-btn';
    favBtn.setAttribute('data-id', String(onsen.id));
    favBtn.textContent = '♡';

    imageWrapper.appendChild(link);
    imageWrapper.appendChild(favBtn);

    // ✅ カード内容（温泉名と説明）
    const content = document.createElement('div');
    content.className = 'card-content';

    const title = document.createElement('h3');
    title.textContent = onsen.name;

    const desc = document.createElement('p');
    desc.textContent = onsen.description || '癒しの温泉地です。';

    content.appendChild(title);
    content.appendChild(desc);

    // ✅ 要素の組み立て
    card.appendChild(imageWrapper); // 🔁 画像＋ボタンラッパー
    card.appendChild(content);      // 🔁 テキスト
    container.appendChild(card);
  });

requestAnimationFrame(() => {
  setTimeout(() => {
    setupFavoriteButtons();
  }, 50);
});
}

// お気に入りボタンの設定
export { renderOnsenCards };