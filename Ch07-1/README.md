# 重點注意

- `.tsx` 可以想成「React 元件用的 TypeScript 檔案」。
- `.ts` 是一般 TypeScript 檔案，不寫 JSX。
- `type` / `interface` 只是用來描述資料長相，不是實際畫面。
- `TodoList.tsx` 負責畫面組裝。
- `useTodoList.ts` 負責狀態和邏輯。
- `Form`、`Filter`、`TodoItem` 都是被主元件控制的小元件。
- props 的型別，例如 `FormProps`、`TodoProps`，只是告訴你「這個元件需要收到哪些資料或函式」。
- 先不要鑽太深 `tsconfig.json`，目前只要知道它是 TypeScript 編譯設定。
- 先不要太在意 `webpack.config.js` 細節，只要知道入口是 `src/index.tsx`，Webpack 會把 TSX、SCSS 編成瀏覽器能跑的檔案。

**建議學習流程**

先照這條線看：

`index.tsx`  
→ `TodoList.tsx`  
→ `useTodoList.ts`  
→ `types/todoList.ts`  
→ `Form.tsx` / `Filter.tsx` / `TodoItem.tsx`

看完後你應該能回答三件事：

1. 畫面從哪裡開始渲染？
2. todo 資料存在哪裡？
3. 新增、刪除、切換完成狀態是誰負責的？

這樣就夠你先掌握這個專案的基礎運作了。

---

安裝指令：pnpm add -D @types/react@16（版本需對齊 react 本體）。
@types/react 永遠是獨立套件，需要手動裝。
現在很多新套件（如 zustand、zod）已內建 .d.ts，就不需要另裝 @types/*。React 18 之後官方也開始考慮這問題，但 16/17 時代一律要手動補。

---

.ts：TypeScript 檔案，不含 JSX
.tsx：TypeScript + JSX，也就是 React component 常用
.d.ts：型別宣告檔，通常給 TypeScript 知道某些東西的型別，例如 SCSS module
.scss：樣式檔

index.tsx
→ TodoList.tsx 看畫面怎麼組
→ useTodoList.ts 看資料怎麼動
→ types/todoList.ts 看型別怎麼定義
→ Form / Filter / TodoItem 看 props 怎麼傳

會寫 React 畫面、元件、JSX：用 .tsx
只是一般邏輯、工具函式、型別：用 .ts

index.tsx                 React 入口，有 JSX，所以 tsx
TodoList.tsx              React 元件，所以 tsx
Form.tsx                  React 元件，所以 tsx
Filter.tsx                React 元件，所以 tsx
TodoItem.tsx              React 元件，所以 tsx
useTodoList.ts            hook 邏輯，沒有 JSX，所以 ts
types/todoList.ts         型別定義，所以 ts

常見工具
TypeScript 本身
可以先讓 .js/.jsx 跟 .ts/.tsx 共存。
{
  "allowJs": true,
  "checkJs": false
}
意思是：先允許 JS 留在專案裡，不急著全部轉。
ts-migrate
Airbnb 做的工具，可以大量把 JS 專案轉成 TS。
它可以幫你：
.js 轉 .ts
.jsx 轉 .tsx
自動補一些暫時型別
加上 any 讓專案先過編譯
但它產生的結果通常還要人工整理。

1. TypeScript 專案要允許 JS
如果你想讓 .ts/.tsx import .js/.jsx，通常 tsconfig.json 要開：
{
  "compilerOptions": {
    "allowJs": true
  }
}
意思是：TypeScript 編譯時也接受 JS 檔案。

TypeScript 只是在開發階段幫你檢查。
如果後端真的回錯資料，TypeScript 不會自動救你。
所以重要資料可以搭配 zod 這類 runtime validation。

---
# index.scss & index.scss.d.ts 用途

這兩個檔案是一起用的：

```txt
index.scss       實際樣式
index.scss.d.ts  給 TypeScript 看懂 index.scss 的型別說明
```

你的 React 元件裡有這行：

```tsx
import styles from './index.scss';
```

然後使用：

```tsx
<div className={styles.layout}>
```

這種寫法叫 **CSS Modules**。

---

**index.scss 是什麼**

[index.scss](//wsl.localhost/Ubuntu/home/yogageek/react-feat-typescript-book-example/Ch07-1/src/views/TodoList/index.scss) 是真正的樣式檔。

例如：

```scss
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

React 裡這樣用：

```tsx
<div className={styles.layout}>
```

意思是：

```txt
我要套用 index.scss 裡面的 .layout 樣式
```

SCSS 比 CSS 多一些功能，例如變數：

```scss
$margin : 24px;
```

後面可以用：

```scss
margin: $margin;
```

也可以巢狀寫法：

```scss
.todoListWrapper {
  .header {
    .title {
      font-size: 32px;
    }
  }
}
```

這比一般 CSS 更方便整理。

---

**index.scss.d.ts 是什麼**

[index.scss.d.ts](//wsl.localhost/Ubuntu/home/yogageek/react-feat-typescript-book-example/Ch07-1/src/views/TodoList/index.scss.d.ts) 不是樣式，它是 TypeScript 宣告檔。

內容像這樣：

```ts
export const layout: string;
export const todoListWrapper: string;
export const header: string;
export const title: string;
```

意思是告訴 TypeScript：

```txt
當有人 import './index.scss' 的時候，
裡面會有 layout、todoListWrapper、header、title 這些 class 名稱，
而且它們都是 string。
```

所以你寫：

```tsx
styles.layout
```

TypeScript 才知道這是合法的。

如果沒有 `.d.ts`，TypeScript 可能會看不懂：

```tsx
import styles from './index.scss';
```

因為 TypeScript 本身不懂 SCSS 檔案。

---

**為什麼需要它**

React 執行時，Webpack 會處理 SCSS：

```txt
index.scss
  ↓
sass-loader 轉成 CSS
  ↓
css-loader 處理 CSS Modules
  ↓
產生真正的 class name
```

但 TypeScript 編譯時只是在檢查程式，它不是真的去解析 SCSS。

所以需要 `.d.ts` 跟 TypeScript 說：

```txt
這個 SCSS 檔案可以被 import
裡面有哪些 class 可以用
```

---

**從無到有怎麼做**

假設一開始你有元件：

```tsx
const TodoList = () => {
  return <div>Todo List</div>;
};
```

第一步，建立樣式檔：

```txt
index.scss
```

寫：

```scss
.layout {
  display: flex;
}
```

第二步，在元件 import：

```tsx
import styles from './index.scss';
```

第三步，使用 class：

```tsx
<div className={styles.layout}>
  Todo List
</div>
```

第四步，讓 TypeScript 認得它。

你可以手動建立：

```txt
index.scss.d.ts
```

寫：

```ts
export const layout: string;
```

如果 SCSS 有：

```scss
.todoListWrapper {}
.submitBtn {}
```

那 `.d.ts` 就要有：

```ts
export const todoListWrapper: string;
export const submitBtn: string;
```

---

**通常會手動寫嗎**

小專案可以手動寫。  
但實務上通常會用工具自動產生。

你的 `package.json` 裡有這個套件：

```json
"typed-scss-modules": "^3.0.0"
```

它就是用來根據 `.scss` 自動產生 `.scss.d.ts` 的。

你的 script 裡也有：

```json
"tsm": "tsm src --watch"
```

所以可以在專案根目錄跑：

```bash
npm run tsm
```

它會監看 `src` 底下的 SCSS 檔案，然後產生對應的 `.d.ts`。

流程大概是：

```txt
你寫 index.scss
  ↓
typed-scss-modules 掃描 class name
  ↓
自動產生 index.scss.d.ts
  ↓
TypeScript 就能檢查 styles.layout 是否存在
```

---

**操作邏輯**

如果你在 `index.scss` 新增：

```scss
.emptyText {
  color: gray;
}
```

理論上 `.d.ts` 也要出現：

```ts
export const emptyText: string;
```

這樣你才能安全使用：

```tsx
<div className={styles.emptyText}>
```

如果 `.d.ts` 沒更新，TypeScript 可能會說：

```txt
Property 'emptyText' does not exist
```

所以實務上會開著：

```bash
npm run tsm
```

讓它自動幫你同步。

---

**你現在先記這樣就好**

```txt
.scss       給瀏覽器 / Webpack 用，負責樣式
.scss.d.ts  給 TypeScript 用，負責型別提示
```

`.scss.d.ts` 不影響畫面長相。  
它只是讓 TypeScript 知道：

```txt
styles.layout
styles.form
styles.todoItem
```

這些東西是存在的。

---

# 總結

**今天學到的重點整理**

你這個專案本質上還是 React 專案，只是加入了 TypeScript。  
所以不要先把它想成全新的東西，可以先想成：

```txt
React + 型別檢查
```

TypeScript 主要是在幫你確認：

```txt
資料長什麼樣子
props 要傳什麼
state 裡面放什麼
函式參數和回傳值是什麼
```

---

**專案怎麼開始看**

這個專案的閱讀順序建議是：

```txt
index.tsx
  ↓
views/TodoList/index.ts
  ↓
views/TodoList/TodoList.tsx
  ↓
hooks/useTodoList.ts
  ↓
types/todoList.ts
  ↓
Form.tsx / Filter.tsx / TodoItem.tsx
```

`index.tsx` 是入口檔。

```tsx
ReactDOM.render(
  <TodoList />,
  document.getElementById('root')
);
```

意思是把 `TodoList` 這個 React 元件掛到 HTML 的 `#root`。

`TodoList.tsx` 是主畫面，負責組合畫面：

```txt
Filter
TodoItem
Form
```

`useTodoList.ts` 是核心邏輯，負責：

```txt
todos 狀態
新增 todo
刪除 todo
切換完成狀態
切換篩選狀態
```

`types/todoList.ts` 是型別定義：

```ts
export interface Todo {
  id: number;
  done: boolean;
  name: string;
}
```

這代表一筆 todo 資料必須有：

```txt
id：數字
done：布林值
name：字串
```

---

**副檔名怎麼分**

簡單規則：

```txt
.ts    TypeScript，一般邏輯，不寫 JSX
.tsx   TypeScript + JSX，React 元件常用
.js    JavaScript，一般邏輯
.jsx   JavaScript + JSX，React 元件
```

只要檔案裡會寫：

```tsx
return <div>Hello</div>
```

或：

```tsx
<Component />
```

就用 `.tsx` 或 `.jsx`。

如果只是邏輯、型別、工具函式，沒有 JSX，就用 `.ts` 或 `.js`。

---

**JS / JSX / TS / TSX 可以混用嗎**

可以。

很多專案在轉 TypeScript 的過程會同時存在：

```txt
App.jsx
Home.tsx
useUser.ts
formatDate.js
types.ts
```

這是正常的。

但如果 `.ts/.tsx` 要讀 `.js/.jsx`，通常 `tsconfig.json` 會設定：

```json
{
  "compilerOptions": {
    "allowJs": true
  }
}
```

代表 TypeScript 專案允許 JS 檔案共存。

---

**JSX 轉 TSX 的邏輯**

很多專案一開始可能是：

```txt
TodoList.jsx
Form.jsx
useTodoList.js
```

後來導入 TypeScript，變成：

```txt
TodoList.tsx
Form.tsx
useTodoList.ts
```

轉換不是重寫 React，而是補上型別。

例如原本 JS：

```js
const deleteTodo = (id) => {
  // ...
};
```

轉成 TS：

```ts
const deleteTodo = (id: number) => {
  // ...
};
```

原本 props 沒有說明：

```jsx
const Form = (props) => {
  props.addTodo(...)
}
```

轉成 TSX 後：

```tsx
type FormProps = {
  addTodo: (todo: Todo) => void;
};

const Form = (props: FormProps) => {
  props.addTodo(...)
}
```

---

**如果內容都沒變，一定要轉 TS 嗎**

不一定。

`.js/.jsx` 可以繼續存在。  
轉成 `.ts/.tsx` 的目的，是讓 TypeScript 開始檢查它。

所以可以慢慢轉：

```txt
新的檔案先用 TS / TSX
重要邏輯優先轉
舊的 JS 檔案可以先留著
```

不用一次全部改完。

---

**通常哪些檔案優先轉**

優先轉：

```txt
React 元件
自訂 hooks
資料處理邏輯
API 回傳資料處理
Redux reducer / action
共用工具函式
型別定義
```

可以晚點轉：

```txt
webpack.config.js
babel.config.js
eslint 設定
prettier 設定
小型 script
很穩定、不常改的舊檔案
```

判斷原則：

```txt
有 props / state / API data 的地方，優先轉
被很多地方 import 的邏輯，優先轉
只是工具設定，先不用急
```

---

**以這個專案來說，最容易看不懂的地方**

第一個是：

```ts
import { Todo } from '../../types/todoList';
```

這是在引入 todo 的資料格式。

第二個是：

```ts
const [todos, setTodos] = useState<Todo[]>([]);
```

意思是：

```txt
todos 是陣列
陣列裡面每一筆都是 Todo
```

第三個是 props 型別：

```ts
type TodoProps = {
  todo: Todo;
  switchTodoDoneStatus: (id: number) => void;
  deleteTodo: (id: number) => void;
}
```

這是在說 `TodoItem` 這個元件需要收到：

```txt
一筆 todo
一個切換完成狀態的函式
一個刪除 todo 的函式
```

第四個是：

```ts
as const
```

這是讓 TypeScript 更精準理解回傳物件。初學階段可以先知道有這件事，不用深究。

---

**如果自己從 JS 專案轉 TS，建議順序**

以這個 Todo 專案來說：

```txt
1. 先建立 types/todoList.ts
2. 把 useTodoList.js 轉成 useTodoList.ts
3. 把 TodoList.jsx 轉成 TodoList.tsx
4. 把 Form.jsx 轉成 Form.tsx
5. 把 TodoItem.jsx 轉成 TodoItem.tsx
6. 把 Filter.jsx 轉成 Filter.tsx
```

也就是先從資料格式和邏輯開始，再轉畫面。

原因是 TypeScript 最重要的是先搞清楚：

```txt
資料長什麼樣子
函式吃什麼
函式回傳什麼
props 傳什麼
```

---

**之後可以全部用 TypeScript 嗎**

可以，而且很常見。

很多新 React 專案一開始就直接選：

```txt
React + TypeScript
```

之後檔案通常會長這樣：

```txt
main.tsx
App.tsx
Button.tsx
useTodoList.ts
api.ts
types.ts
```

你有後端背景，直接學 TypeScript 版 React 可能反而比較順，因為你會比較習慣：

```txt
資料結構
型別
函式輸入輸出
模組邊界
```

但要注意幾個問題：

```txt
一開始可能覺得型別寫很多
props 都要定義
API 回傳資料實際上還是可能錯
第三方套件型別可能不完整
不要到處用 any
React event 型別一開始會不熟
```

---

**SCSS 和 SCSS.D.TS 是什麼**

這個專案裡有：

```txt
index.scss
index.scss.d.ts
```

`index.scss` 是真正的樣式檔。

例如：

```scss
.layout {
  display: flex;
}
```

React 裡面這樣用：

```tsx
import styles from './index.scss';

<div className={styles.layout}>
```

這種寫法叫 CSS Modules。

`index.scss.d.ts` 是 TypeScript 宣告檔。  
它不是樣式，只是告訴 TypeScript：

```txt
index.scss 裡面有哪些 class name
```

例如：

```ts
export const layout: string;
export const todoListWrapper: string;
export const submitBtn: string;
```

這樣 TypeScript 才知道：

```tsx
styles.layout
styles.submitBtn
```

是存在的。

---

**SCSS.D.TS 怎麼產生**

小專案可以手動寫。

但實務上通常用工具自動產生。  
你的專案有：

```json
"typed-scss-modules": "^3.0.0"
```

還有 script：

```json
"tsm": "tsm src --watch"
```

所以可以跑：

```bash
npm run tsm
```

它會監看 SCSS 檔案，根據 class name 自動產生 `.scss.d.ts`。

流程是：

```txt
寫 index.scss
  ↓
typed-scss-modules 掃描 class name
  ↓
產生 index.scss.d.ts
  ↓
TypeScript 看懂 styles.xxx
```

---

**今天可以先記住的核心觀念**

React 還是 React。

TypeScript 只是讓你更清楚知道：

```txt
這個元件需要什麼 props
這個 state 裡面放什麼
這個函式需要什麼參數
這個資料物件應該長什麼樣子
```

SCSS 是畫面樣式。  
SCSS.D.TS 是讓 TypeScript 看懂樣式 class 的型別說明。

之後你寫 React，可以直接習慣：

```txt
元件用 .tsx
邏輯用 .ts
型別用 .ts
樣式用 .scss
SCSS module 搭配 .scss.d.ts
```

這樣會比先寫 JS 再慢慢補 TS 更適合你目前的學習方式。



