import React from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux'; 
import { deleteNews } from '../../actions/news';
 
// 結論：把 Redux 的資料和操作注入元件，讓 NewsList 能直接讀取新聞列表和觸發刪除。

const NewsList = props => (
  <ul>
    {
      props.news.map(theNews => (
        <li key={theNews.id}>
          <Link
            to={`/news/newsReader/${theNews.id}`}
          >
            {theNews.name}
          </Link> 
          <button onClick={() => { props.deleteNews(theNews.id); }}>
            刪除
          </button>
        </li>
      ))
    }
  </ul>
);

// 從 Redux store 取出 news 資料，注入成 props.news。
// state.news.news → 第一個 news 是 combineReducers 的 key，第二個 news 是 reducer 裡的欄位。
const mapStateToProps = state => ({ 
  news: state.news.news,
});

// 把 deleteNews action 包成函式注入成 props.deleteNews，
// 元件呼叫它就等於 dispatch action 到 store。
const mapDispatchToProps = dispatch => ({
  deleteNews: (id) => {
    dispatch(deleteNews(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);

// connect 是一個 HOC（Higher-Order Component），吃兩個參數回傳一個新元件。
// 把 NewsList 丟進去，出來的是有 Redux 資料的新元件

// NewsList 本身是純元件，只知道 props 有什麼就顯示什麼，不需要知道資料從哪來。
// connect 負責把 Redux 的資料和 dispatch 塞進 props，兩層職責分開。