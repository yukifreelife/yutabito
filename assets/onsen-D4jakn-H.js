import{s as c}from"./favorite-D5ASEm3T.js";import{g as d}from"./utils-i6mLqElC.js";function l(n){const t=new URLSearchParams(window.location.search),r=Number(t.get("id")),o=document.getElementById("onsen-detail"),e=n.find(i=>i.id===r);if(!e){o.innerHTML="<p>温泉情報が見つかりませんでした。</p>";return}const a=`
    <iframe
      src="https://www.google.com/maps?q=${encodeURIComponent(e.name)}&output=embed"
      width="100%" height="300" style="border:0; border-radius: 8px;" allowfullscreen=""
      loading="lazy" referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  `,s=`https://www.google.com/search?q=${encodeURIComponent(e.name)}+観光協会`;o.innerHTML=`
    <h2>${e.name}</h2>
    ${d(e.romaji,e.name).outerHTML}
    <div class="description-box">
      <p>${e.description}</p>
    </div>
    <p><strong>地域：</strong>${e.region}</p>
    <p><strong>泉質：</strong>${e.springType}</p>

    <button class="favorite-btn" data-id="${e.id}">♡</button>


    <div class="btn-group">
      <a class="btn" href="https://www.google.com/search?q=${e.name}+旅館" target="_blank">旅館を探す</a>
      <a class="btn secondary" href="${s}" target="_blank">観光協会サイト</a>
    </div>

    <h3>地図で場所を確認</h3>
    ${a}
  `,c()}fetch("/yutabito/onsen.json").then(n=>n.json()).then(n=>{l(n)}).catch(n=>{console.error("温泉データの取得に失敗しました：",n)});
