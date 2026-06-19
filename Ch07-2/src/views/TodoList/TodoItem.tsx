import React from 'react'; // React 元件和 JSX 需要引入 React。
import { useHistory } from 'react-router-dom'; // useHistory 讓元件可以用程式碼切換頁面。
import { Todo } from '../../types/todoList'; // 引入 Todo 型別，讓 props.todo 的資料格式固定。
import styles from './index.scss'; // 匯入 CSS Modules 樣式物件。

type TodoProps = { // 定義 TodoItem 元件會收到的 props 格式。
  todo: Todo; // todo 是這個項目要顯示的單一 Todo 資料。
  switchTodoDoneStatus: (id: number) => void, // switchTodoDoneStatus 接收 id，用來切換完成狀態。
  deleteTodo: (id: number) => void, // deleteTodo 接收 id，用來刪除這筆 todo。
}

const TodoItem = (props: TodoProps) => { // TodoItem 負責顯示單一 todo 與它的操作按鈕。
  const history = useHistory(); // 取得 history 物件，讓按鈕可以跳轉到詳細頁。
  return (
    <div className={styles.todoItem}>
      <span
        style={{
          textDecoration: props.todo.done ? 'line-through' : 'none',
        }}
      >
        {props.todo.name}
      </span>
      <div>
        <input
          type="checkbox"
          checked={props.todo.done}
          onChange={() => { props.switchTodoDoneStatus(props.todo.id); }}
        />
        <button
          type="button"
          onClick={() => { props.deleteTodo(props.todo.id); }}
        >
          刪除
        </button>
        <button
          type="button"
          onClick={() => { history.push(`/todo/${props.todo.id}`); }}
        >
          詳細
        </button>
      </div>
    </div>
  )
};

export default TodoItem; // 匯出 TodoItem，讓 TodoList 可以渲染多筆 todo。
