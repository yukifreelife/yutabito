export function setupFavoriteButtons() {
  const buttons = document.querySelectorAll(".favorite-btn");
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  buttons.forEach(btn => {
    const id = btn.dataset.id;

    // 初期状態を設定
    if (favorites.includes(id)) {
      btn.classList.add("active");
      btn.textContent = "♥";
    } else {
      btn.classList.remove("active");
      btn.textContent = "♡";
    }

    // クリックイベント登録
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      let updated = [...favorites];

      if (updated.includes(id)) {
        updated = updated.filter(item => item !== id);
        btn.classList.remove("active");
        btn.textContent = "♡";
      } else {
        updated.push(id);
        btn.classList.add("active");
        btn.textContent = "♥";
      }

      localStorage.setItem("favorites", JSON.stringify(updated));
    });
  });
}
