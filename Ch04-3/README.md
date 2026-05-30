# Ch04-3 教學重點 用 redux-thunk 處理非同步事件

這章的重點是：在上一章 `useSelector` / `useDispatch` 取代 `connect` 的基礎上，加入 `redux-thunk` 處理非同步 action，另外示範如何建立自訂 Hook `useCounter`。

## 主要看哪些檔案

- `src/views/News/NewsList.jsx`
- `src/views/News/NewsForm.jsx`
- `src/views/Home/Home.jsx`
- `src/actions/user.js`
- `src/store/index.js`
- `src/hooks/useCounter.js`

## NewsList / NewsForm：延續 Redux Hook 寫法

上一章已經把 `connect` 改成 React Redux Hook，這章的 `NewsList` 和 `NewsForm` 仍然沿用這個寫法。

### NewsList

```js
const dispatch = useDispatch();
useSelector(state => state.news.news)
```

`useSelector` 直接從 Redux store 讀新聞列表。

```js
dispatch(deleteNews(theNews.id))
```

`useDispatch` 取得 `dispatch`，按下刪除按鈕時直接送出 `deleteNews` action。

所以不需要再寫：

- `mapStateToProps`
- `mapDispatchToProps`
- `connect`

### NewsForm

```js
const dispatch = useDispatch();
```

表單輸入仍然用 React 的 `useState` 控制：

```js
const [name, setName] = useState('');
const [describe, setDescribe] = useState('');
```

新增新聞時直接 dispatch：

```js
dispatch(addNews({ id: Math.random(), name, describe }))
```

這邊的重點是：元件自己管理輸入狀態，送出時再把資料交給 Redux。

# 這章新增重點：redux-thunk

`src/store/index.js` 加入：

```js
import thunk from 'redux-thunk';
```

並且在建立 store 時使用：

```js
applyMiddleware(thunk, logger)
```

上一章的 middleware 主要是用 `logger` 觀察 action 和 state 的變化。

這章加入 `redux-thunk` 之後，Redux 可以處理「回傳 function 的 action creator」。

## 一般 action vs thunk action

一般 action creator 會回傳普通物件：

```js
export const addNews = news => (
  { type: 'ADD_NEWS', payload: { news } }
);
```

但 thunk action creator 會回傳 function：

```js
export const fetchUser = () => async (dispatch) => {
  const response = await fetch('http://httpbin.org/get');
  const user = await response.json();
  dispatch(setUser(user));
};
```

這種 action 如果沒有 `redux-thunk`，Redux 會看不懂，因為 Redux 原本只接受 plain object action。

有了 `redux-thunk` 之後，Redux 遇到 function action 時，會把 `dispatch` 傳進去，讓我們可以在 action 裡面做非同步流程。

## Home：發出非同步 action

`src/views/Home/Home.jsx`：

```js
const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchUser());
}, []);
```

意思是 Home 元件載入後，只執行一次 `fetchUser()`。

整個流程是：

```txt
Home render
-> useEffect 執行
-> dispatch(fetchUser())
-> redux-thunk 發現 action 是 function
-> 執行 async function
-> fetch API
-> 拿到資料
-> dispatch(setUser(user))
-> reducer 更新 state.user.user
-> useSelector 讀出新資料
```

所以這章 Redux 的核心是：

**用 thunk 把 API 請求放進 action 裡面處理。**

## Middleware 執行順序

`store/index.js`：

```js
applyMiddleware(thunk, logger)
```

執行順序是：

```txt
dispatch
-> thunk
-> logger
-> reducer
```

`thunk` 放在前面，是因為它要先判斷 action 是不是 function。

如果是：

```js
dispatch(fetchUser())
```

就由 `thunk` 執行這個 function。

如果是普通物件：

```js
dispatch(addNews(...))
```

就繼續往下交給 `logger` 和 reducer。

## 自訂 Hook：useCounter

這章另外新增：

```js
src/hooks/useCounter.js
```

內容概念是：

```js
const useCounter = (initialCount, callbackFunction) => {
  const [count, setCount] = useState(initialCount);

  useEffect(callbackFunction, [count]);

  const add = (addend) => {
    setCount(count + addend);
  };

  return { count, add };
};
```

這是在示範如何把重複的 state 邏輯抽成自己的 Hook。

`Counter` 可以使用：

```js
const { count, add } = useCounter(1, callback);
```

`SuperAmazingCounter` 也可以使用：

```js
const { count, add } = useCounter(100, callback);
```

兩個元件共用同一套計數邏輯，只要傳入不同的初始值和 callback。

## 本章總結

上一章重點：

```txt
用 useSelector / useDispatch 取代 connect
```

這章重點：

```txt
在 Redux Hook 架構下加入 redux-thunk，讓 Redux 可以處理非同步 API action。
另外用 useCounter 示範自訂 Hook，把重複邏輯抽出來共用。
```

## 為什麼需要 redux-thunk
一般 action creator 只能回傳物件，不能 await：
```js
// ❌ 普通 action creator 不能非同步
const fetchUser = () => ({
  type: 'SET_USER',
  payload: await fetch(...)  // 不行
});
```
redux-thunk 讓 action creator 可以回傳函式，函式裡才能做非同步操作，等資料回來再 dispatch。

可以用一句話記：

**這章是 Redux Hook + redux-thunk + 自訂 Hook。**


# 這章內容在 2026 的定位是：

useSelector / useDispatch：還在用，現代 React Redux 推薦寫法

connect：還能用，但偏舊，新專案較少主動用

createStore + applyMiddleware：偏舊，現在用 Redux Toolkit configureStore

手寫 reducer switch：偏舊，現在用 createSlice

手動裝 redux-thunk：偏舊，configureStore 預設已包含

手寫 async thunk：還能用，但現代 Redux 常用 createAsyncThunk 或 RTK Query

如果你是學觀念，這章很重要，因為它讓你理解：

dispatch -> middleware -> reducer (reducer 就是決定「action 發生後，state 要變成什麼」的函式。
)

但如果你要寫 2026 的實務專案，會建議直接學：

Redux Toolkit + createSlice + configureStore + createAsyncThunk / RTK Query