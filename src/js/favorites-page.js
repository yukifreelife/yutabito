// js/favorites-page.js
import { setupFavoriteButtons } from './favorite.js';

function generateImageUrl(romaji) {
  return `${import.meta.env.BASE_URL}assets/images/onsen_${romaji}.jpg`;
}

async function loadOnsenData() {
  const response = await fetch('./onsen.json');
  const allData = await response.json();

  const favorites = new Set(JSON.parse(localStorage.getItem("favorites") || "[]").map(String));
  const filtered = allData.filter(onsen => favorites.has(String(onsen.id)));

  const container = document.getElementById("favorites-list");
  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = "<p>お気に入り登録された温泉はありません。</p>";
    return;
  }

  filtered.forEach(onsen => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${generateImageUrl(onsen.romaji)}" alt="${onsen.name}" />
        <button class="favorite-btn" data-id="${String(onsen.id)}">♥️</button>
      </div>
      <div class="card-content">
        <h3>${onsen.name}</h3>
        <p>${onsen.description || "癒しの温泉でゆっくり過ごそう。"}</p>
      </div>
    `;
    container.appendChild(card);
  });

  setupFavoriteButtons(true);
}

loadOnsenData();
