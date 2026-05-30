# 主要看 NewsList NewsForm 

**這次的重點：用 `useSelector`/`useDispatch` 取代 `connect`，加上 middleware 監控 action。**

---

## 三個元件的改變

上一章用 `connect`，這章改用 Hook，結果一樣但更簡潔。

**NewsList**
```js
const dispatch = useDispatch();           // 取得 dispatch
useSelector(state => state.news.news)    // 直接讀 store 資料
dispatch(deleteNews(theNews.id))         // 直接 dispatch
```
不用再寫 `mapStateToProps`、`mapDispatchToProps`、`connect`。

**NewsReader**
```js
const { id: targetNewsId } = useParams();         // 從 URL 拿 id
const news = useSelector(state => state.news.news) // 從 store 拿資料
```
不用靠父層傳 `match` 和 `news` props，自己直接取。

**NewsForm**
```js
const dispatch = useDispatch();
dispatch(addNews({ id: Math.random(), name, describe }))
```
不用 `connect(null, mapDispatchToProps)`，直接 dispatch。

---

## store.js 加了 Middleware

```js
const logger = store => next => (action) => {
```
三層箭頭函式是 Redux middleware 的固定格式：
- `store` → 拿到 store 的 `getState`
- `next` → 呼叫下一個 middleware 或 reducer
- `action` → 當前的 action

---

```js
console.log('此次執行：', action);
console.log('執行之前的 state：', store.getState());
next(action);  // 讓 action 繼續往下走到 reducer
console.log('執行之後的 state：', store.getState());
return '我是 logger1 的回傳值';
```
在 action 到達 reducer 前後各印一次 state，用來追蹤狀態變化。

---

```js
const logger2 = store => next => (action) => {
  const result = next(action);
  console.log("result:", result);  // 印出 logger 回傳的字串
};
```
`logger2` 呼叫 `next(action)` 就是把 action 傳給 `logger`，`logger` 回傳 `'我是 logger1 的回傳值'`，`result` 就是這個字串。

---

```js
applyMiddleware(logger2, logger)
```
執行順序：`logger2 → logger → reducer`

---

request 進來 → middleware 處理 → 繼續往下，Redux 的 action 流向一模一樣。