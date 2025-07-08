import{s as o}from"./favorite-DccFiVyW.js";function c(n){return`/assets/images/onsen_${n}.jpg`}async function d(){const i=await(await fetch("./onsen.json")).json(),s=new Set(JSON.parse(localStorage.getItem("favorites")||"[]").map(String)),r=i.filter(t=>s.has(String(t.id))),e=document.getElementById("favorites-list");if(e.innerHTML="",r.length===0){e.innerHTML="<p>お気に入り登録された温泉はありません。</p>";return}r.forEach(t=>{const a=document.createElement("div");a.className="card",a.innerHTML=`
      <div class="card-img-wrapper">
        <img src="${c(t.romaji)}" alt="${t.name}" />
        <button class="favorite-btn" data-id="${String(t.id)}">♥</button>
      </div>
      <div class="card-content">
        <h3>${t.name}</h3>
        <p>${t.description||"癒しの温泉でゆっくり過ごそう。"}</p>
      </div>
    `,e.appendChild(a)}),o(!0)}d();
