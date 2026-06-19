import { createStore } from 'redux'; // 從 Redux 匯入 createStore，用來建立全域 store。
import todos from '../reducers/todo'; // 匯入 todo reducer，讓 store 知道 state 要怎麼被更新。

export type rootState = ReturnType<typeof todos>; // 用 reducer 的回傳值自動推導整個 Redux state 的型別。

export default createStore(todos); // 建立並匯出 Redux store，給 Provider 使用。
