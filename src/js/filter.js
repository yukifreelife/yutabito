// filter.js
// DOM 取得ヘルパー
const $ = id => document.getElementById(id);
const v  = id => ($(`${id}`)?.value ?? '');      // 無ければ空文字
// const chk = id => !!$(`${id}`)?.checked;      // （チェックボックス用）

/* 🔍 1) 現在の条件をオブジェクトで返す */
export function getCriteria(){
  return {
    spring : v('filter-spring'),                       // 泉質
    region : v('filter-region'),                       // 地域
    prefecture: v('filter-prefecture'),                // 都道府県
    keyword: v('filter-keyword').trim().toLowerCase(), // キーワード
    temp   : v('filter-temp'),                         // 湯温帯（UIが無くても ''）
    scenic : v('filter-scenic')                        // 景観

  };
}

/* 🔍 2) リストを条件で絞った結果を返す */
export function applyFilters(list, criteria = getCriteria()){
  const c = criteria;
  return list.filter(o=>{
    if (c.spring  && o.springType !== c.spring)    return false;
    if (c.region  && o.region     !== c.region)    return false;
    if (c.keyword){
      const hay = `${o.name}${o.description}`.toLowerCase();
      if (!hay.includes(c.keyword)) return false;
    }
    if (c.scenic){
      if (!Array.isArray(o.scenicTags)) return false;
      if (!o.scenicTags.includes(c.scenic)) return false;
    }

    return true;
  });
}
