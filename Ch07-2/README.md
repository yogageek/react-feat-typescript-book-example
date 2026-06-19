學習typescript最快方式就是實際改寫這篇專案

## 除了 `todolist.tsx` 之外，其他元件的事件都只是執行傳進來的 `props` 而已。所以只要把自定義 hooks 替換成 `redux` 的話，就只需要修改 `src/views/todolist.tsxtsx` 而已。 

如果只是自己單純開發功能，用hook做就好。但如果是大系統，用redux可省下後續許多擴張的麻煩

# Ch07-2 多了什麼

`Ch07-2` 比 `Ch07-1` 主要多了兩個大方向：

```txt
1. Redux 狀態管理
2. Todo 詳細頁 + 路由
```

新增的資料夾/檔案：

```txt
src/actions/todo.ts
src/reducers/todo.ts
src/store/index.ts
src/views/Todo/
```

**1. 新增 Redux action**

檔案：

```txt
src/actions/todo.ts
```

這裡定義「可以對 todo 做哪些操作」。

例如：

```ts
addTodo
deleteTodo
switchTodoDoneStatus
switchFilterDoneTodo
getTodoById
```

以前 `Ch07-1` 是直接在 `useTodoList.ts` 裡面改 state。  
現在 `Ch07-2` 變成先發出 action：

```ts
dispatch(addTodo(todo))
dispatch(deleteTodo(id))
```

也就是：

```txt
元件不直接改資料
元件只發出動作
reducer 負責根據動作更新資料
```

**2. 新增 reducer**

檔案：

```txt
src/reducers/todo.ts
```

這裡是真正管理 todo 狀態的地方。

它的 state 長這樣：

```ts
interface TodoState {
  todos: Todo[]
  displayTodos: Todo[]
  filterDoneTodo: boolean
  todo: Todo
}
```

比 `Ch07-1` 多了：

```txt
displayTodos：目前畫面要顯示的 todo
todo：目前詳細頁要顯示的單一 todo
```

`reducer` 會根據 action type 做不同更新：

```txt
ADD_TODO
DELETE_TODO
SWITCH_TODO_DONE_STATUS
SWITCH_FILTER_DONE_TODO
GET_TODO_BY_ID
```

這是這章最重要的新概念。

**3. 新增 store**

檔案：

```txt
src/store/index.ts
```

內容重點：

```ts
import { createStore } from 'redux';
import todos from '../reducers/todo';

export type rootState = ReturnType<typeof todos>;

export default createStore(todos);
```

意思是：

```txt
用 reducer 建立 Redux store
rootState 是整個 Redux state 的型別
```

之後元件裡用：

```ts
useSelector((state: rootState) => state.displayTodos)
```

TypeScript 才知道 `state` 裡面有哪些資料。

**4. index.tsx 變複雜了**

`Ch07-1` 的入口大概只是 render `TodoList`。

`Ch07-2` 變成：

```tsx
<Provider store={store}>
  <HashRouter>
    <Switch>
      <Route exact path="/" component={TodoList} />
      <Route path="/todo/:id" component={Todo} />
    </Switch>
  </HashRouter>
</Provider>
```

多了三件事：

```txt
Provider：讓整個 app 都能使用 Redux store
HashRouter：啟用前端路由
Route / Switch：根據網址切換頁面
```

路由變成：

```txt
/           TodoList 清單頁
/todo/:id   Todo 詳細頁
```

**5. TodoList.tsx 不再用 useTodoList**

雖然 `Ch07-2` 還保留：

```txt
src/hooks/useTodoList.ts
```

但目前 `TodoList.tsx` 已經沒有用它了。

它改成：

```ts
const dispatch = useDispatch();
```

讀資料用：

```ts
useSelector((state: rootState) => state.displayTodos)
```

改資料用：

```ts
dispatch(addTodo(todo))
dispatch(deleteTodo(id))
dispatch(switchTodoDoneStatus(id))
```

所以這章真正的主線已經從：

```txt
useState + custom hook
```

變成：

```txt
Redux store + action + reducer
```

**6. TodoItem.tsx 多了進詳細頁**

`TodoItem.tsx` 多了一個按鈕：

```tsx
onClick={() => { history.push(`/todo/${props.todo.id}`); }}
```

意思是點擊後跳到：

```txt
/todo/某個id
```

這會進到新的 Todo 詳細頁。

**7. 新增 Todo 詳細頁**

資料夾：

```txt
src/views/Todo/
```

主要檔案：

```txt
Todo.tsx
```

它做的事：

```txt
從網址讀 id
dispatch getTodoById(id)
從 Redux state 讀出單一 todo
顯示 todo 詳細內容
```

關鍵：

```ts
const { id }: { id: string } = useParams();
```

這是 TypeScript 寫法，表示網址參數 `id` 是字串。

然後：

```ts
dispatch(getTodoById(Number(id)));
```

因為 URL 讀出來一定是字串，所以要轉成 number。

**Ch07-2 的學習重點順序**

建議你這章這樣看：

```txt
1. index.tsx
2. store/index.ts
3. actions/todo.ts
4. reducers/todo.ts
5. views/TodoList/TodoList.tsx
6. views/TodoList/TodoItem.tsx
7. views/Todo/Todo.tsx
```

重點不是 TypeScript 本身變很多，而是架構變了：

```txt
Ch07-1：元件 / hook 自己管理狀態
Ch07-2：Redux 統一管理狀態
```

一句話總結：

**Ch07-2 是把原本 TodoList 裡的狀態邏輯，搬到 Redux 的 action、reducer、store 裡，並新增 Todo 詳細頁路由。**


