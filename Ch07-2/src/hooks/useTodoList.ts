import { useState } from 'react'; // 引入 React 的 useState，用來在 hook 裡保存區域狀態。
import { Todo } from '../types/todoList'; // 引入 Todo 型別，讓 todos 陣列和函式參數有型別檢查。

const useTodoList = () => { // 自訂 hook：把 todo 清單相關狀態和操作集中管理。
  const [todos, setTodos] = useState<Todo[]>([]); // todos 是 Todo 陣列，初始值是空陣列。
  const [filterDoneTodo, setFilterDoneTodo] = useState<boolean>(false); // filterDoneTodo 是 boolean，控制是否隱藏已完成項目。

  const addTodo = (todo: Todo) => { // addTodo 接收一筆 Todo，並把它加入清單。
    setTodos([
      ...todos, // 保留原本 todos。
      todo, // 把新的 todo 放到陣列最後。
    ]);
  };

  const deleteTodo = (id: number) => { // deleteTodo 接收數字 id，刪除對應 todo。
    const newTodos = todos.filter((todo: Todo) => (
      todo.id !== id
    )); // filter 會回傳 id 不相同的新陣列。
 
    setTodos(newTodos); // 用刪除後的新陣列更新 state。
  };

  const switchTodoDoneStatus = (id: number) => { // 根據 id 切換指定 todo 的完成狀態。
    const targetTodoIndex = todos.findIndex(
      (todo: Todo) => todo.id === id
    ); // 找出目標 todo 在陣列裡的位置。
 
    const newTodos = [...todos]; // 複製一份陣列，避免直接修改原 state。
 
    newTodos[targetTodoIndex] = {
      ...newTodos[targetTodoIndex], // 保留原本 todo 的其他欄位。
      done: !newTodos[targetTodoIndex].done, // 反轉 done 狀態。
    };
 
    setTodos(newTodos); // 用更新後的新陣列更新 state。
  };

  const switchFilterDoneTodo = () => { // 切換是否篩掉已完成 todo。
    setFilterDoneTodo(!filterDoneTodo); // 把 boolean 狀態反轉。
  };


  let workTodos: Todo[] = todos; // workTodos 是最後要回傳給畫面顯示的 Todo 陣列。
  if (filterDoneTodo) {
    workTodos = todos.filter((todo: Todo) => !todo.done); // 如果啟用篩選，只保留未完成 todo。
  }

  return {
    todos: workTodos, // 回傳畫面要顯示的 todo 清單。
    addTodo, // 回傳新增 todo 的方法。
    switchTodoDoneStatus, // 回傳切換完成狀態的方法。
    deleteTodo, // 回傳刪除 todo 的方法。
    filterDoneTodo, // 回傳目前篩選狀態。
    switchFilterDoneTodo, // 回傳切換篩選狀態的方法。
  } as const; // as const 讓 TypeScript 更精準推斷這個回傳物件。
};

export default useTodoList; // 匯出 hook，讓元件可以重用這組 todo 邏輯。
