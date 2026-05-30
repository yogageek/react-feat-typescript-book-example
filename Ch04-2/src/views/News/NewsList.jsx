import React from 'react';
import { Link } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { deleteNews } from '../../actions/news';
 

// 上一章要透過 mapDispatchToProps 把 dispatch 包成 props 傳進來，這章直接用 Hook 取，不用再寫那些樣板程式碼。

const NewsList = () => { 
  const dispatch = useDispatch();//拿到 Redux store 的 dispatch 函式，之後就能用它發送 action。
  return (
    <ul>
      {// useSelector直接在 JSX 裡把「取資料」和「渲染列表」串在一行。
        useSelector(state => state.news.news).map(theNews => (
          <li key={theNews.id}>
            <Link
              to={`/news/newsReader/${theNews.id}`}
            >
              {theNews.name}
            </Link> 
            <button onClick={() => { dispatch(deleteNews(theNews.id)); }}>
              刪除
            </button>
          </li>
        ))
      }
    </ul>
  );
}
  
export default NewsList;

