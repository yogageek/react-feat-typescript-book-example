# 相比上一章主要多了useParam & useHistory

## 用程式碼控制路由跳轉，而不是用 `<Link>`。跟 `<Link>` 的差別

| | `<Link>` | `useHistory` |
|---|---|---|
| 用途 | 純導頁 | 導頁 + 可加邏輯 |
| 使用場景 | 一般連結 | 表單送出後跳頁、條件判斷後跳頁 |

## 上一章用 `props.match.params.id`，這章用 `useParams()`，結果一樣但寫法不同。

| | 上一章 | 這章 |
|---|---|---|
| 寫法 | `props.match.params.id` | `useParams()` |
| 方式 | props 傳進來 | Hook 直接取 |
| 需要父層傳 props | ✅ 要 | ❌ 不用 |

**為什麼這章比較好**

上一章要在父層手動把 `match` 傳進去：
```jsx
component={props => <NewsReader match={props.match} news={news} />}
```

這章直接在元件裡用 Hook 取，不用靠父層傳：
```jsx
const { id: targetNewsId } = useParams();
```

更簡潔，元件也不用依賴父層給它 `match`。