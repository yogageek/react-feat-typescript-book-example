import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import NewsReader from './NewsReader.jsx';
import NewsList from './NewsList.jsx';
 
// 新聞資料存在 state 裡（沒有 setNews，代表這裡不會修改，只是讀）。實際專案這裡會改成打 API 拿資料。
const News = () => {
  const [news] = useState([
    { id: 1, name: '第一筆最新消息', describe: '這裡是第一筆哦！' },
    { id: 2, name: '第二筆最新消息', describe: '這裡是第二筆哦！' },
    { id: 3, name: '第三筆最新消息', describe: '這裡是第三筆哦！' },
  ]);

// URL 完全符合 /news → 顯示新聞列表。
// exact 是因為 /news/newsReader/1 也包含 /news，不加 exact 兩個 Route 都會匹配。

  return( 
    <Switch>
      <Route
        exact
        path="/news"
        component={() => (
          <>
            <h1>這裡是最新消息</h1> 
            <NewsList news={news} />
          </>
        )}
      />
      <Route
        // URL 符合 /news/newsReader/任意id → 顯示閱讀頁。
        // props.match 手動傳進去是因為 news 資料在 News 這層，NewsReader 需要兩個東西：URL 的 id（match）和新聞資料（news）。
        path="/news/newsReader/:id" 
        component={props => <NewsReader match={props.match} news={news} />}
      />
    </Switch>
  );
};
 
export default News;

