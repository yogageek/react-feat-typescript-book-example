const initialState = {
  news: [
    { id: 1, name: '第一筆最新消息', describe: '這裡是第一筆哦！' },
    { id: 2, name: '第二筆最新消息', describe: '這裡是第二筆哦！' },
    { id: 3, name: '第三筆最新消息', describe: '這裡是第三筆哦！' },
  ],
};
 
const news = (state = initialState, action) => {
  switch (action.type) { 
    case 'ADD_NEWS':
      return {
        ...state,
        news: [
          ...state.news,
          action.payload.news,
        ],
      }; 
    case 'DELETE_NEWS':
      return {
        ...state,
        news: state.news.filter(
          theNews => theNews.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
 
export default news;

// **結論：reducer 是一個純函式，接收當前 state 和 action，回傳新的 state。**
// **最簡單的理解**
// (現在的狀態, 要做什麼) => 新的狀態

// 三個規則
// 不能改原本的 state，要回傳新物件
// 同樣的輸入一定要有同樣的輸出（純函式）
// 不能有副作用，不能在裡面打 API、寫 localStorage
