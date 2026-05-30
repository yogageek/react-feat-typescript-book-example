import React from 'react';
import { Link } from 'react-router-dom';

//  把 news 陣列渲染成一個連結列表，點每個連結跳到對應的閱讀頁。

const NewsList = props => (
  <ul>
    {
      props.news.map(theNews => (//遍歷 news 陣列，每筆資料生成一個 <li>。key 給 id 讓 React 識別每個項目。
        <li key={theNews.id}>
          <Link //Link 是 React Router 的元件，渲染成 <a> 但不會真的重新整理頁面，只切換路由。
            to={`/news/newsReader/${theNews.id}`}//to 的路徑對應到 News.jsx 裡的 <Route path="/news/newsReader/:id">，:id 就會接到這裡傳的 theNews.id。
          >
            {theNews.name}
          </Link>
        </li>
      ))
    }
  </ul>
);
 
// news 陣列（News.jsx）
//   → 傳給 NewsList → 渲染連結
//   → 點連結 → URL 變成 /news/newsReader/1
//   → NewsReader 接到 id=1 → 從 news 陣列找到第一筆 → 顯示

export default NewsList;
