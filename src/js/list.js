import { renderOnsenCards } from './renderCards.js';
import { setupFavoriteButtons } from './favorite.js';


let onsenData = [];
let currentIndex = 0;
const ITEMS_PER_PAGE = 20;

fetch(`${import.meta.env.BASE_URL}onsen.json`)
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

  requestAnimationFrame(setupFavoriteButtons);

  currentIndex += ITEMS_PER_PAGE;
  if (currentIndex >= onsenData.length) {
    document.getElementById("loadMoreBtn").style.display = "none";
  }
}

document.getElementById('loadMoreBtn')
        .addEventListener('click', loadNextBatch);