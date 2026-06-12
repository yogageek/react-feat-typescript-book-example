// 這是主畫面元件，負責組合 Filter（篩選器）、TodoItem（單一待辦項目）、Form（新增表單）三個子元件
// 並從自訂 Hook useTodoList() 中取得待辦事項資料與操作函式，再透過 props 傳遞給子元件

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Filter from './Filter'; // 從相對路徑引入篩選器元件 Filter，負責顯示「隱藏已完成事項」的核取方塊
import TodoItem from './TodoItem'; // 從相對路徑引入單一待辦項目元件 TodoItem，負責呈現每一筆待辦事項的名稱、狀態切換與刪除按鈕
import Form from './Form'; // 從相對路徑引入新增表單元件 Form，負責提供輸入框與送出按鈕以建立新的待辦事項
import useTodoList from '../../hooks/useTodoList'; // 從上層 hooks 資料夾引入自訂 Hook useTodoList，該 Hook 封裝了 todos 狀態與相關操作函式（addTodo, deleteTodo, switchTodoDoneStatus, 篩選狀態等）
import styles from './index.scss'; // 引入 CSS Modules 樣式物件，讓 JSX 可以使用 index.scss 中定義的樣式類別（如 layout, todoListWrapper, header, title, subTitle, todoList 等）


// .tsx 表示這個檔案同時使用 TypeScript 和 JSX。
// 此元件目前沒有接收任何 props（父層沒有傳入資料），因此不需要定義 TodoListProps 型別
const TodoList = () => {
  // 執行自訂 Hook useTodoList，取得封裝好的狀態與操作方法
  // TypeScript 會自動從 Hook 的回傳值推斷 todoList 的型別結構（包含 todos 陣列、filterDoneTodo 布林值以及各個函式）
  const todoList = useTodoList();  
  // 元件的回傳值為 JSX 結構，描述整個待辦清單應用程式的畫面佈局
  return (
    // 最外層 div 套用 styles.layout 類別，負責整體版面配置（通常為 flex 或 grid 置中）
    <div className={styles.layout}>
      {/* 內層容器，套用 styles.todoListWrapper 類別，用於包裹標題、篩選器、待辦項目清單與表單 */}
      <div className={styles.todoListWrapper}>
        {/* 標題區域，套用 styles.header 類別，放置主標題與副標題 */}
        <div className={styles.header}>
          {/* 主標題 span，套用 styles.title 類別，顯示固定的文字 "Todo List" */}
          <span className={styles.title}>
            Todo List
          </span>
          {/* 副標題 span，套用 styles.subTitle 類別，顯示一段固定的歡迎文字 */}
          <span className={styles.subTitle}>
            Hi here is a sample todo list.
          </span>
        </div>

        {/* 渲染篩選器元件 Filter，並透過 props 傳遞兩個值給子元件 */}
        <Filter
          // 傳遞 filterDoneTodo 狀態（布林值），代表是否開啟「只顯示未完成事項」的篩選
          filterDoneTodo={todoList.filterDoneTodo}
          // 傳遞 switchFilterDoneTodo 函式，子元件在核取方塊狀態改變時會呼叫此函式來切換篩選開關
          switchFilterDoneTodo={todoList.switchFilterDoneTodo}
        />

        {/* 待辦事項清單容器，套用 styles.todoList 類別，用來顯示所有待辦項目的區塊 */}
        <div className={styles.todoList}>
          {
            // 使用 JavaScript 的 map 方法遍歷 todoList.todos 陣列（此陣列已經是經過篩選後的結果）
            // 每個 map 回呼函式中的 todo 參數會被 TypeScript 自動推斷為 Todo 型別（因為 useTodoList 的回傳型別已定義）
            todoList.todos.map(todo => (
              // 渲染 TodoItem 元件，並給予唯一的 key 屬性（使用 todo.id），幫助 React 識別列表項目的變動
              <TodoItem
                key={todo.id}
                // 將當前的 todo 物件作為 props 傳遞給 TodoItem，讓子元件顯示該待辦事項的名稱與完成狀態
                todo={todo}
                // 傳遞 switchTodoDoneStatus 函式，讓 TodoItem 內部可以切換此筆待辦事項的完成狀態
                switchTodoDoneStatus={todoList.switchTodoDoneStatus}
                // 傳遞 deleteTodo 函式，讓 TodoItem 內部可以刪除此筆待辦事項
                deleteTodo={todoList.deleteTodo}
              />
            ))
          }
        </div>

        {/* 渲染新增表單元件 Form，並將 addTodo 函式作為 props 傳遞，讓 Form 能夠將新建立的待辦事項交給父層處理 */}
        <Form addTodo={todoList.addTodo} />
      </div>
    </div>
  );
};

// 匯出 TodoList 元件，作為此應用程式的主要畫面，通常會在根元件（如 App.tsx）中被渲染
export default TodoList;