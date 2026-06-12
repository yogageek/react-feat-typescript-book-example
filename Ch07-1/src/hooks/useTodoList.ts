// 這是核心邏輯。重點看 useState 怎麼管理 todo 清單、篩選狀態，
// 以及新增、刪除、切換完成狀態的方法
import { useState } from 'react';
import { Todo } from '../types/todoList';

const useTodoList = () => {
  // 定義一個名為 todos 的 state 變數，以及用來更新它的 setTodos 函式。
  // useState<Todo[]> 是 TypeScript 泛型語法，明確指定這個 state 的型別為「Todo 陣列」。
  // 雖然空陣列 [] 當下看不出元素型別，但加上 <Todo[]> 後，TypeScript 就知道未來陣列裡只能放 Todo 物件。
  const [todos, setTodos] = useState<Todo[]>([]);

  // 定義 filterDoneTodo state，型別為 boolean（布林值）。
  // useState<boolean> 表示這個 state 只能是 true 或 false。
  const [filterDoneTodo, setFilterDoneTodo] = useState<boolean>(false);

  // (todo: Todo) 表示 addTodo 只能接收符合 Todo 格式的物件。  
  const addTodo = (todo: Todo) => {
    // setTodos 接收新的陣列，這裡使用展開運算子 ...todos 複製原有的所有待辦事項。    
    setTodos([
      ...todos,
      todo,
    ]);
  };

  // (id: number) 表示呼叫 deleteTodo 時必須傳入數字 id。
  const deleteTodo = (id: number) => {
    // 利用 filter 方法，回傳一個新的陣列，其中只保留 todo.id 不等於傳入 id 的元素。
    // 這裡也為 filter 的回呼參數 todo 加上型別 Todo，讓 TypeScript 檢查 todo.id 是否正確。    
    const newTodos = todos.filter((todo: Todo) => (
      todo.id !== id
    ));

    setTodos(newTodos);
  };

  // 函式參數補型別後，可以避免不小心傳入字串、物件等錯誤資料。
  const switchTodoDoneStatus = (id: number) => {
    const targetTodoIndex = todos.findIndex(
      (todo: Todo) => todo.id === id
    );
    // 複製整個 todos 陣列，產生一個新的陣列副本。
    const newTodos = [...todos];
    // 更新新陣列中對應索引的那一筆待辦事項。
    // 使用物件展開 {...舊物件}，然後覆寫 done 屬性為相反的值（!done）。
    // 其餘屬性（id, text, ...）保持不變。
    newTodos[targetTodoIndex] = {
      ...newTodos[targetTodoIndex],
      done: !newTodos[targetTodoIndex].done,
    };
    // 將更新後的陣列存入 state，觸發重新渲染。
    setTodos(newTodos);
  };


  // switchFilterDoneTodo 切換篩選開關的 state。
  // 沒有參數，只是將目前的 filterDoneTodo 布林值反轉。
  const switchFilterDoneTodo = () => {
    setFilterDoneTodo(!filterDoneTodo);
  };



  // 宣告一個名為 workTodos 的變數，其型別為 Todo 陣列，並將它初始化為目前 todos 狀態中的全部資料
  let workTodos: Todo[] = todos;
  if (filterDoneTodo) {
    workTodos = todos.filter((todo: Todo) => !todo.done);
  }

  // 將需要暴露給元件使用的資料與函式包裝成一個物件並回傳。
  // 加上 as const 是 TypeScript 的 const assertion（常數斷言）。
  // 作用：讓 TypeScript 將這個物件的屬性視為唯讀的字面量型別，而不是寬泛的 string 或 boolean。
  // 例如原本 filterDoneTodo 可能被推斷為 boolean，加上 as const 後會維持 true/false 的字面量。  
  // 初學時先知道這是「加強型別推斷」即可，不需要急著深究。
  return {
    todos: workTodos,           // 經過篩選後的待辦事項陣列
    addTodo,                    // 新增待辦事項的函式
    switchTodoDoneStatus,      // 切換完成狀態的函式
    deleteTodo,                // 刪除待辦事項的函式
    filterDoneTodo,           // 目前篩選開關的狀態（true=只顯示未完成）
    switchFilterDoneTodo,     // 切換篩選開關的函式
  } as const;
  // as const 讓 TypeScript 更精準理解這個回傳物件的內容。
};
// 將這個自訂 Hook 匯出，讓其他元件可以使用。
export default useTodoList;
