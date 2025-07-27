import { renderOnsenCards } from './renderCards.js';
import { setupFavoriteButtons } from './favorite.js';


let onsenData = [];
let currentIndex = 0;
const ITEMS_PER_PAGE = 20;

fetch('./onsen.json')
  .then(res => res.json())
  .then(data => {
    onsenData = data;
    loadNextBatch();
  })
  .catch(err => {
    console.error("温泉データの取得に失敗しました:", err);
  });

function loadNextBatch() {
  const nextItems = onsenData.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);
  renderOnsenCards(nextItems, true);
  setTimeout(() => {
    setupFavoriteButtons();
  }, 0);
  currentIndex += ITEMS_PER_PAGE;

  if (currentIndex >= onsenData.length) {
    document.getElementById("loadMoreBtn").style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loadBtn = document.getElementById("loadMoreBtn");
  if (loadBtn) {
    loadBtn.addEventListener("click", loadNextBatch);
  }
});