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

    // romajiプロパティから画像パスを生成
    const imagePath = `/assets/images/onsen_${onsen.romaji}.jpg`;

    card.innerHTML = `
      <img src="${imagePath}" alt="${onsen.name}" />
      <div class="card-content">
        <h3>${onsen.name}</h3>
        <p>${onsen.description || '癒しの温泉地です。'}</p>
        <button class="favorite-btn" data-id="${onsen.name}">♡</button>
      </div>
    `;

    container.appendChild(card);
  });

  setupFavoriteButtons();
}

// お気に入りボタンの設定
function setupFavoriteButtons() {
  const buttons = document.querySelectorAll('.favorite-btn');
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  buttons.forEach(btn => {
    const id = btn.dataset.id;
    if (favorites.includes(id)) {
      btn.classList.add('active');
      btn.textContent = '♥';
    }

    btn.addEventListener('click', () => {
      let updated = [...favorites];
      if (updated.includes(id)) {
        updated = updated.filter(item => item !== id);
        btn.classList.remove('active');
        btn.textContent = '♡';
      } else {
        updated.push(id);
        btn.classList.add('active');
        btn.textContent = '♥';
      }
      localStorage.setItem('favorites', JSON.stringify(updated));
    });
  });
}

export { renderOnsenCards };