import{s as l}from"./favorite-DccFiVyW.js";function m(e,r=!1){const a=document.getElementById("onsen-list");r||(a.innerHTML=""),e.forEach(t=>{console.log("画像パス確認:",`/assets/images/onsen_${t.romaji}.jpg`);const o=document.createElement("div");o.className="onsen-card";const d=`/assets/images/onsen_${t.romaji}.jpg`;o.innerHTML=`
      <img src="${d}" alt="${t.name}" />
      <div class="card-content">
        <h3>${t.name}</h3>
        <p>${t.description||"癒しの温泉地です。"}</p>
        <button class="favorite-btn" data-id="${String(t.id)}">♡</button>
      </div>
    `,a.appendChild(o)}),l()}let s=[],n=0;const c=20;fetch("./onsen.json").then(e=>e.json()).then(e=>{s=e,i()}).catch(e=>{console.error("温泉データの取得に失敗しました:",e)});function i(){const e=s.slice(n,n+c);m(e,!0),setupFavoriteButtons(),n+=c,n>=s.length&&(document.getElementById("loadMoreBtn").style.display="none")}document.getElementById("loadMoreBtn").addEventListener("click",i);
