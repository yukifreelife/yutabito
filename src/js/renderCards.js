// 温泉カードをHTMLに描画する
export function renderOnsenCards(data) {
  const container = document.getElementById("onsen-list");
  container.innerHTML = ""; // 初期化

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  data.forEach(onsen => {
    const card = document.createElement("div");
    card.className = "onsen-card";

    const isFavorite = favorites.includes(onsen.id);

    card.innerHTML = `
     <a href="onsen.html?id=${onsen.id}" class="card-link">
      <img src="${onsen.imageUrl}" alt="${onsen.name}">
      <h3>${onsen.name}</h3>
      <p>${onsen.region}・${onsen.springType}</p>
      <p>${onsen.description}</p>
     </a>
      <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${onsen.id}" type="button" >
        ${isFavorite ? '❤️ お気に入り済み' : '🤍 お気に入り'}
      </button>
    `;
        // お気に入りボタンの処理
    const favBtn = card.querySelector('.favorite-btn');
    favBtn.addEventListener('click', () => {
      toggleFavorite(onsen.id);
      renderOnsenCards(data);
      updateFavoriteButtons(); 
    });
    container.appendChild(card);
  });
}

export function toggleFavorite(id) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.includes(id)) {
    // すでにお気に入り → 削除
    const updated = favorites.filter(fav => fav !== id);
    localStorage.setItem('favorites', JSON.stringify(updated));
  } else {
    // お気に入りに追加
    favorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

export function updateFavoriteButtons() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  document.querySelectorAll('.favorite-btn').forEach(btn => {
    const id = btn.getAttribute('data-id');
    if (favorites.includes(id)) {
      btn.classList.add('active');               // ← クラス追加
      btn.textContent = '❤️ お気に入り済み';
    } else {
      btn.classList.remove('active');            // ← クラス削除
      btn.textContent = '🤍 お気に入り';
    }
  });
}



