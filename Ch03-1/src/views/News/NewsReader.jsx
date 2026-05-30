import React from 'react';
 
// 結論：拿 URL 的 id，從 news 陣列找到對應那筆，顯示出來。


const NewsReader = props => { 
  //從 URL /news/newsReader/1 拿到 "1"。
  const targetNewsId = props.match.params.id;
  //遍歷 news 陣列，找 id 符合的那筆。兩邊都 String() 是因為 URL 參數是字串，資料裡的 id 是數字，不轉的話會是 false。
  const targetNews = props.news.find(theNews => (
    String(theNews.id) === String(targetNewsId)
  ));

  return (
    <div>
      <h1>您正在閱讀 {targetNews.name}</h1>
      <p>{targetNews.describe}</p>
    </div>
  );
};
 
export default NewsReader;

// 資料統一在父層 News 管理，子元件 NewsList 和 NewsReader 只負責顯示，
// 這是標準的資料往下傳（props drilling）模式。