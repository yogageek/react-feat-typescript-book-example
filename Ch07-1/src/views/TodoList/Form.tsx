// 子元件：Form.tsx：新增 todo
import React, { useState } from 'react';
import { Todo } from '../../types/todoList';
import styles from './index.scss';

// 使用 TypeScript 的 type 關鍵字定義 Form 元件接收的 props 型別
type FormProps = {
  addTodo: (todo: Todo) => void // addTodo 是一個函式：接收 Todo，不回傳資料，所以回傳型別是 void。
}

// props: FormProps 表示 props 必須符合上面定義的格式。
const Form = (props: FormProps) => {
  // 使用 useState 建立一個名為 name 的狀態變數，型別為 string（<string> 是泛型語法，明確指定只能儲存字串）
  const [name, setName] = useState<string>('');
  const submitForm = () => {
    // 建立一個符合 Todo 結構的新物件；name 取自狀態中的 name；done 預設為 false
    const newTodo = { id: Math.random(), name, done: false, };
    // 呼叫父層傳入的 addTodo 函式，將新建立的待辦事項傳遞給父元件（由父元件負責更新整體狀態）
    props.addTodo(newTodo);
    // 清空輸入框的文字狀態，將 name 設為空字串，讓使用者可以繼續輸入新的待辦事項
    setName('');
  }
  return (
    <div className={styles.form}>
      <span>Add to the todo list</span>
      <div>
        <input
          type="input"
          className={styles.todoInput}
          // value 屬性綁定 name 狀態，使輸入框的內容與狀態保持同步（受控元件）
          value={name}
          // onChange 事件：當使用者輸入文字時觸發，e.target.value 取得當前輸入框的值，並透過 setName 更新狀態
          onChange={(e) => { setName(e.target.value); }}
        />
        <button type="button" className={styles.submitBtn} onClick={submitForm}>
          ADD
        </button>
      </div>
    </div>
  )
};

export default Form;
