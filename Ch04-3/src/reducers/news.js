// news reducer：管理新聞列表的狀態，初始有三筆資料
const initialState = {
  news: [
    { id: 1, name: '第一筆最新消息', describe: '這裡是第一筆哦！' },
    { id: 2, name: '第二筆最新消息', describe: '這裡是第二筆哦！' },
    { id: 3, name: '第三筆最新消息', describe: '這裡是第三筆哦！' },
  ],
};


// ADD_NEWS：用展開運算子建立新陣列，把新聞加到最後
// DELETE_NEWS：用 filter 過濾掉指定 id，回傳新陣列
const news = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEWS':
      return {
        ...state,              // 複製原本 state 的其他欄位
        news: [
          ...state.news,       // 複製原本的新聞陣列
          action.payload.news, // 加上新的一筆
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
