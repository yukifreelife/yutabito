// 温泉カードをHTMLに描画する
export function renderOnsenCards(data) {
  const container = document.getElementById("onsen-list");
  container.innerHTML = ""; // 初期化

  data.forEach(onsen => {
    const card = document.createElement("div");
    card.className = "onsen-card";

    card.innerHTML = `
     <a href="onsen.html?id=${onsen.id}" class="card-link">
      <img src="${onsen.imageUrl}" alt="${onsen.name}">
      <h3>${onsen.name}</h3>
      <p>${onsen.region}・${onsen.springType}</p>
      <p>${onsen.description}</p>
     </a>
    `;
    container.appendChild(card);
  });
}
