本章節示範 React 元件的組合與掛載流程：

- 建立基礎元件：`HelloWorld`、`SayHello`
- `views/Home` 引用上述元件，作為頁面組合層
- 根層 `index.js` 引入 `Home`，執行單一節點渲染（single root render）