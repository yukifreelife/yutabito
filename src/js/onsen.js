import { loadOnsenDetail } from './loadOnsenDetail.js';
document.addEventListener('DOMContentLoaded', loadOnsenDetail);

fetch(`${import.meta.env.BASE_URL}onsen.json`)
  .then(res => res.json())
  .then(data => {
    loadOnsenDetail(data);
  })
  .catch(err => {
    console.error("温泉データの取得に失敗しました：", err);
  });
