import React, { useState } from 'react'; // 引入 React 和 useState，讓表單可以保存輸入文字。
import { Todo } from '../../types/todoList'; // 引入 Todo 型別，讓新增資料格式被檢查。
import styles from './index.scss'; // 匯入 CSS Modules 樣式物件。

type FormProps = { // 定義 Form 元件會收到的 props 格式。
  addTodo: (todo: Todo) => void // addTodo 是函式，接收 Todo，沒有回傳值。
}

const Form = (props: FormProps) => { // Form 是新增 todo 的表單元件。
  const [name, setName] = useState<string>(''); // name 是字串 state，用來保存 input 目前輸入值。
  const submitForm = () => { // submitForm 負責建立新 todo 並交給父層處理。
    const newTodo = { id: Math.random(), name, done: false, }; // 建立一筆新的 todo，id 隨機產生，done 預設 false。
    props.addTodo(newTodo); // 呼叫父層傳入的 addTodo，把新 todo 送出去。
    setName(''); // 新增後清空 input。
  }
  return (
    <div className={styles.form}>
      <span>Add to the todo list</span>
      <div>
        <input
          type="input"
          className={styles.todoInput}
          value={name}
          onChange={(e) => { setName(e.target.value); }}
        />
        <button type="button" className={styles.submitBtn} onClick={submitForm}>
          ADD
        </button>
      </div>
    </div>
  )
};

export default Form; // 匯出 Form，讓 TodoList 可以使用。
