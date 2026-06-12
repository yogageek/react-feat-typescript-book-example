// 子元件：TodoItem.tsx：顯示單一 todo
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Todo } from '../../types/todoList';
import styles from './index.scss';

// TodoItem 需要一筆 Todo，以及兩個操作 todo id 的函式。這樣父層傳 props 時，如果少傳或型別錯誤，TypeScript 會提醒。
type TodoProps = {
  todo: Todo;
  switchTodoDoneStatus: (id: number) => void,
  deleteTodo: (id: number) => void,
}

// props: TodoProps 表示這個元件只能接收符合 TodoProps 的 props。
const TodoItem = (props: TodoProps) => {
  // 呼叫 useHistory Hook 取得 history 物件（可用於程式化導航，例如點擊後跳轉到詳細頁，此範例未使用但保留）
  const history = useHistory();
  return (
    <div className={styles.todoItem}>
      <span
        // 動態樣式：若 todo.done 為 true 則加上刪除線 (line-through)，否則無刪除線 (none)
        style={{
          textDecoration: props.todo.done ? 'line-through' : 'none',
        }}
      >
        {/* 顯示待辦事項的 name 屬性值 */}
        {props.todo.name}
      </span>
      <div>
        <input
          type="checkbox"
          // checked 屬性綁定 todo.done 布林值，控制核取方塊是否勾選（已完成即勾選）
          checked={props.todo.done}
          // onChange 事件：當使用者點擊核取方塊時，呼叫 switchTodoDoneStatus 並傳入當前待辦事項的 id
          onChange={() => { props.switchTodoDoneStatus(props.todo.id); }}
        />
        <button
          type="button"
          // onClick 事件：當使用者點擊按鈕時，呼叫 deleteTodo 並傳入當前待辦事項的 id
          onClick={() => { props.deleteTodo(props.todo.id); }}
        >
          刪除
        </button>
      </div>
    </div>
  )
};

export default TodoItem;
