import{s as i}from"./favorite-DccFiVyW.js";function l(e){return`/assets/images/onsen_${e}.jpg`}function c(e){const n=document.getElementById("recommended-slider");n.innerHTML="",[...e].sort(()=>.5-Math.random()).slice(0,5).forEach(t=>{const s=document.createElement("div");s.className="slider-card",s.innerHTML=`
      <a href = "onsen.html?id=${t.id}">
        <img src="${l(t.romaji)}" alt="${t.name}">
        <h4>${t.name}</h4>
      </a> 
      <button class="favorite-btn" data-id="${t.id}">♡</button>
    `,n.appendChild(s)}),i()}let d=[];fetch("./onsen.json").then(e=>e.json()).then(e=>{d=e,c(e)}).catch(e=>{console.error("温泉データの取得に失敗しました:",e)});const o=document.getElementById("showFavoritesBtn");o&&o.addEventListener("click",()=>{const e=JSON.parse(localStorage.getItem("favorites")||"[]"),n=new Set(e.map(String)),a=d.filter(r=>n.has(String(r.id)));c(a),i()});
