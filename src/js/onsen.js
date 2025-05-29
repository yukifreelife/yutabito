import { loadOnsenDetail } from './loadOnsenDetail.js';

fetch('/onsen.json')
  .then(res => res.json())
  .then(data => {
    loadOnsenDetail(data);
  })
  .catch(err => {
    console.error("温泉データの取得に失敗しました：", err);
  });
