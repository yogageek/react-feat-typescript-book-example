const initialState = {
  name: '神 Q 超人',
};

// reducer 是一個純函式，接收當前 state 和 action，回傳新的 state。
// 第一次執行時 state 是 undefined，所以用預設值 initialState 補上。
const user = (state = initialState, action) => {
  switch (action.type) {
    //目前只有 default，代表不管收到什麼 action，都原封不動回傳現有 state。
    default:
      return state;
  }
};
 
export default user;


// 關鍵：reducer 必須是純函式
// 不能直接改 state，要回傳一個新物件，React 才能偵測到變化觸發重渲染。