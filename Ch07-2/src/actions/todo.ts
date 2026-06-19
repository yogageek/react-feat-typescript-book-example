import { Todo } from '../types/todoList'; // 引入 Todo 型別，讓 action payload 可以被 TypeScript 檢查。
 
interface AddTodo { // 定義新增 todo 的 action 格式。
  type: 'ADD_TODO' // type 用字串常數表示這個 action 是新增 todo。
  payload: Todo // payload 放新增的 Todo 資料。
};
 
interface DeleteAdd { // 定義刪除 todo 的 action 格式。
  type: 'DELETE_TODO' // type 表示這個 action 是刪除 todo。
  payload: number, // payload 放要刪除的 todo id。
};
 
interface SwitchTodoDoneStatus { // 定義切換 todo 完成狀態的 action 格式。
  type: 'SWITCH_TODO_DONE_STATUS', // type 表示這個 action 是切換完成狀態。
  payload: number, // payload 放要切換的 todo id。
};
 
interface SwitchFilterDoneTodo { // 定義切換篩選狀態的 action 格式。
  type: 'SWITCH_FILTER_DONE_TODO', // 這個 action 不需要 payload，因為只是把篩選狀態反轉。
};

interface GetTodoById { // 定義用 id 取得單一 todo 的 action 格式。
  type: 'GET_TODO_BY_ID', // type 表示這個 action 是查詢單一 todo。
  payload: number, // payload 放網址或元件傳入的 todo id。
};
 
export const addTodo = (todo: Todo): AddTodo => ({ // action creator：接收 Todo，回傳 ADD_TODO action。
  type: 'ADD_TODO', // reducer 會用這個 type 判斷要執行新增邏輯。
  payload: todo, // 把要新增的 todo 放進 payload。
});
 
export const deleteTodo = (id: number): DeleteAdd => ({ // action creator：接收 id，回傳 DELETE_TODO action。
  type: 'DELETE_TODO', // reducer 會用這個 type 判斷要執行刪除邏輯。
  payload: id, // 把要刪除的 id 放進 payload。
});
 
export const switchTodoDoneStatus = (id: number): SwitchTodoDoneStatus => ({ // action creator：接收 id，回傳切換完成狀態的 action。
  type: 'SWITCH_TODO_DONE_STATUS', // reducer 會用這個 type 找到目標 todo 並反轉 done。
  payload: id, // 把要切換狀態的 todo id 放進 payload。
});
 
export const switchFilterDoneTodo = (): SwitchFilterDoneTodo => ({ // action creator：不接參數，只回傳切換篩選狀態的 action。
  type: 'SWITCH_FILTER_DONE_TODO', // reducer 會用這個 type 反轉 filterDoneTodo。
});
 
export const getTodoById = (id :number): GetTodoById => ({ // action creator：接收 id，回傳查詢單一 todo 的 action。
  type: 'GET_TODO_BY_ID', // reducer 會用這個 type 從 todos 裡找出單一 todo。
  payload: id, // 把要查詢的 todo id 放進 payload。
});

export type TodoActionTypes = AddTodo | DeleteAdd | SwitchTodoDoneStatus | SwitchFilterDoneTodo | GetTodoById; // union type：限制 reducer 只會收到這幾種 todo action。
