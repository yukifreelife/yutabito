export function setupFavoriteButtons(removeCardOnUnfavorite = false) {
  const buttons = document.querySelectorAll(".favorite-btn");
  buttons.forEach(btn => {
      // ➤➤ これが ★追加 部分
    if (btn.dataset.bound === 'true') return;   // すでにバインド済みならスキップ
    btn.dataset.bound = 'true';                 // フラグを立てる
    // ★追加 ここまで
    const onsenId = String(btn.dataset.id);


    // --- 初期表示を整える ---
    let favorites = new Set(JSON.parse(localStorage.getItem("favorites") || "[]").map(String));

    // 初期状態設定
    if (favorites.has(onsenId)) {
      btn.classList.add("active");
      btn.textContent = "♥️";
    } else {
      btn.classList.remove("active");
      btn.textContent = "♡";
    }

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      

      // イベントごとに再取得（ここも重要）
      favorites = new Set(JSON.parse(localStorage.getItem("favorites") || "[]").map(String));

      if (favorites.has(onsenId)) {
        favorites.delete(onsenId);
        btn.classList.remove("active");
        btn.textContent = "♡";

        if (removeCardOnUnfavorite) {
          const card = btn.closest(".card");
          if (card) card.remove();
        }

      } else {
        favorites.add(onsenId);
        btn.classList.add("active");
        btn.textContent = "♥️";
      }

      localStorage.setItem("favorites", JSON.stringify([...favorites]));
    });
  });
}