# 這章在教什麼

Redux 的完整資料流：

```
action creator → dispatch → reducer → store → 元件
```

具體實作了：
1. **建立 store**：`createStore` + `combineReducers` 組合多個 reducer
2. **action creator**：統一管理 action 的格式
3. **reducer**：接收 action，回傳新 state
4. **connect**：用 `mapStateToProps` 讀資料、`mapDispatchToProps` 觸發操作，注入元件 props
5. **Provider**：最外層包住整個 app，讓所有元件都能存取 store(把 store 注入進整個 app，所有元件都能用)
---

**核心概念**

從 props drilling（資料一層層往下傳）→ 全域 store（任何元件直接取用），解決跨層級共享資料的問題。

---

這章加了 **Redux**，重點是 `Provider` 和 `store`。

---

**新增的兩行**

```jsx
import { Provider } from 'react-redux';
import store from './store';
```

---

**`Provider` 包在最外層的意思**

```jsx
<Provider store={store}>
  <HashRouter>
    ...
  </HashRouter>
</Provider>
```

把 `store` 注入整個應用，讓裡面任何元件都能直接取用 Redux 的資料，不用一層一層傳 props。

---

**解決的問題**

上一章 `news` 資料要從 `News` 手動傳給 `NewsList` 再傳給 `NewsReader`，這叫 props drilling。

Redux 的概念是：資料放在全域 `store`，任何元件直接去拿，不用透過父層傳。

---

**這章核心主軸**：從 props drilling → 全域狀態管理（Redux）。


# 結論：Redux 是一個全域狀態管理工具，核心概念是「單一資料來源 + 單向資料流」。**

---

**三個核心角色**

| 角色 | 是什麼 | 類比 |
|---|---|---|
| `store` | 全域狀態的容器 | 資料庫 |
| `action` | 描述「要做什麼」的物件 | API request |
| `reducer` | 接收 action，回傳新 state | API handler |

---

**單向資料流**

```
使用者操作
  → dispatch(action)
  → reducer 處理，回傳新 state
  → store 更新
  → 元件重新渲染
```

---

**為什麼單向**

狀態只能透過 `dispatch action` 來改，不能直接改 store，所以資料怎麼變的永遠可以追蹤。

---

**跟 useState 的差別**

| | useState | Redux |
|---|---|---|
| 範圍 | 單一元件 | 整個應用 |
| 共享資料 | 要靠 props 傳 | 任何元件直接取 |
| 適合場景 | 局部 UI 狀態 | 跨元件共享的資料 |

---

**關鍵思考點**：Redux 解決的不是「怎麼存資料」，而是「多個元件共享資料時，怎麼讓變更可預測、可追蹤」。

---

# 現在的狀態管理主流排序

| 工具 | 狀態 |
|---|---|
| **Zustand** | 目前最流行，輕量、簡單 |
| **Redux Toolkit** | Redux 的現代版，大型專案還在用 |
| **Jotai / Recoil** | 原子化狀態，適合細粒度控制 |
| **React Query / SWR** | 專門處理伺服器資料（API 狀態） |
| Redux（原版） | 過時，新專案不用了 |

---

**為什麼 Redux 被取代**

原版 Redux 要寫大量樣板程式碼（action、reducer、dispatch），Zustand 同樣功能只需要幾行：

```js
const useStore = create((set) => ({
  count: 0,
  add: () => set((state) => ({ count: state.count + 1 })),
}));
```

---

**實際現在怎麼選**

- 伺服器資料（API）→ **React Query**
- 客戶端全域狀態 → **Zustand**
- 這兩個組合基本上覆蓋 90% 的需求，Redux 已經很少在新專案出現。






# 結論：store 是整個應用的全域資料容器，所有狀態都存在這裡。

---

**三件事**

1. **存狀態** — 持有整個應用的 state
2. **接收 action** — 透過 `dispatch` 觸發狀態變更
3. **通知元件** — state 更新後，有訂閱的元件自動重新渲染

---

**後端類比**

| Redux | 後端 |
|---|---|
| store | 資料庫 |
| reducer | 處理邏輯的 service |
| action | API request |
| dispatch | 發送 request |

---

**store、action、reducer 的關係**

```
dispatch(action)
  → store 把 action 丟給 reducer
  → reducer 回傳新 state
  → store 更新
  → 元件重新渲染
```

store 本身不處理邏輯，它只是個中間人，邏輯都在 reducer 裡。