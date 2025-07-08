import{s as i}from"./favorite-DccFiVyW.js";function c(n){const t=new URLSearchParams(window.location.search),r=Number(t.get("id")),o=document.getElementById("onsen-detail"),e=n.find(s=>s.id===r);if(!e){o.innerHTML="<p>温泉情報が見つかりませんでした。</p>";return}`${encodeURIComponent(e.name)}`;const a=`https://www.google.com/search?q=${encodeURIComponent(e.name)}+観光協会`;o.innerHTML=`
    <h2>${e.name}</h2>
    <img src="${e.imageUrl}" alt="${e.name}" />
    <div class="description-box">
      <p>${e.description}</p>
    </div>
    <p><strong>地域：</strong>${e.region}</p>
    <p><strong>泉質：</strong>${e.springType}</p>

    <button class="favorite-btn" data-id="${e.id}">♡</button>


    <div class="btn-group">
      <a class="btn" href="https://www.google.com/search?q=${e.name}+旅館" target="_blank">旅館を探す</a>
      <a class="btn secondary" href="${a}" target="_blank">観光協会サイト</a>
    </div>

    <h3>地図で場所を確認</h3>
    ${mapEmbed}
  `,i()}fetch("./onsen.json").then(n=>n.json()).then(n=>{c(n)}).catch(n=>{console.error("温泉データの取得に失敗しました：",n)});
