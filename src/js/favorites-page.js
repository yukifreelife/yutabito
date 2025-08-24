import { initHamburger } from './nav.js';
initHamburger();
import { injectFilterSidebar, wireFilterEnterToApply } from './filterSidebar.js';
import { setupFavoriteButtons } from './favorite.js';
import { generateImageWithFallback } from './utils.js';

injectFilterSidebar('#filter-root');
wireFilterEnterToApply();

async function loadOnsenData() {
  const response = await fetch(`${import.meta.env.BASE_URL}onsen.json`);
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
    const imgWrapper = document.createElement("div");
imgWrapper.className = "card-img-wrapper";

const img = generateImageWithFallback(onsen.romaji, onsen.name);
// 🔗 画像にリンクを付与
const link = document.createElement('a');
link.href = `onsen.html?id=${onsen.id}`;
link.className = 'onsen-link';
link.appendChild(img);
const favBtn = document.createElement("button");
favBtn.className = "favorite-btn";
favBtn.setAttribute("data-id", String(onsen.id));
favBtn.textContent = "♥️";

// 画像リンクと♥を重ねる（♥はimgWrapper内に残す）
imgWrapper.appendChild(link);
imgWrapper.appendChild(favBtn);

// カード本文
const content = document.createElement("div");
content.className = "card-content";

const title = document.createElement("h3");
// 🔗 タイトルにもリンク
const titleLink = document.createElement('a');
titleLink.href = link.href;
titleLink.className = 'onsen-link';
titleLink.textContent = onsen.name;
title.appendChild(titleLink);

const desc = document.createElement("p");
desc.textContent = onsen.description || "癒しの温泉でゆっくり過ごそう。";

content.appendChild(title);
content.appendChild(desc);

// カード全体に追加
card.appendChild(imgWrapper);
card.appendChild(content);
container.appendChild(card);
  });

  setupFavoriteButtons(true);
}

loadOnsenData();
