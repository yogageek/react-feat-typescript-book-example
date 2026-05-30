import { createStore, combineReducers, applyMiddleware } from 'redux';
import news from '../reducers/news';
import user from '../reducers/user';

const logger = store => next => (action) => {
  console.log('此次執行：', action);
  console.log('執行之前的 state：', store.getState());

  next(action);

  console.log('執行之後的 state：', store.getState());
  return '我是 logger1 的回傳值';
};

const logger2 = store => next => (action) => {
  const result = next(action);
  console.log("result:", result);
};

// 結論：建立 store，同時把 middleware 接進去。
const store = createStore(
  combineReducers({ news, user }),
  applyMiddleware(logger2, logger),//把 middleware 串進 store，每次 dispatch action 都會先過這兩個。
);

export default store;
