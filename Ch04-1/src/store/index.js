import { createStore, combineReducers } from 'redux';  //從 Redux 引入建立 store 和合併 reducer 的工具。
// 兩個獨立的 reducer，各自管自己的狀態：新聞資料、使用者資料。
import news from '../reducers/news'; 
import user from '../reducers/user';


const store = createStore( 
  combineReducers({ news, user })//combineReducers 把兩個 reducer 合併
);

export default store;

// 一個大應用不可能只有一個 reducer，拆開各自管各自的領域，combineReducers 負責把它們組合回一個 store。

// 結論：store 是整個應用的全域資料容器，所有狀態都存在這裡。

