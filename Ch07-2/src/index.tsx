import React from 'react'; // React 元件和 JSX 需要引入 React。
import ReactDOM from 'react-dom'; // ReactDOM 負責把 React 元件渲染到真實 DOM。
import { Provider } from 'react-redux'; // Provider 讓底下所有元件都能使用 Redux store。
import { HashRouter, Switch, Route } from 'react-router-dom'; // HashRouter 負責路由，Switch/Route 負責根據網址顯示不同頁面。
import store from './store'; // 匯入 Redux store，準備提供給整個 App 使用。
import TodoList from './views/TodoList'; // 匯入 todo 清單頁元件。
import Todo from './views/Todo'; // 匯入 todo 詳細頁元件。
 
ReactDOM.render(
  <Provider store={store}> {/* 把 Redux store 注入整個 React 元件樹。 */}
    <HashRouter> {/* 啟用 hash-based routing，網址會長得像 #/todo/1。 */}
      <Switch> {/* 只渲染第一個符合目前網址的 Route。 */}
        <Route exact path="/" component={TodoList} /> {/* 網址剛好是 / 時顯示 TodoList。 */}
        <Route path="/todo/:id" component={Todo} /> {/* 網址符合 /todo/:id 時顯示 Todo 詳細頁，id 是動態參數。 */}
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root') // 指定 React 要掛載到 HTML 裡 id="root" 的 DOM 節點。
);
