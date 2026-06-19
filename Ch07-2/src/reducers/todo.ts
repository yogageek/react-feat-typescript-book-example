import { Todo } from '../types/todoList'; // 引入 Todo 型別，讓 state 裡的 todo 資料格式固定。
import { TodoActionTypes } from '../actions/todo'; // 引入所有 todo action 的 union type，讓 reducer 只能處理已定義的 action。

interface TodoState { // 定義 Redux 這一份 todo state 的完整資料形狀。
  todos: Todo[] // 保存全部 todo 的原始清單。
  displayTodos: Todo[] // 保存目前畫面要顯示的 todo 清單，可能會受到篩選影響。
  filterDoneTodo: boolean // 保存是否隱藏已完成 todo 的篩選狀態。
  todo: Todo // 保存目前詳細頁正在顯示的單一 todo。
};

const initState: TodoState = { // 定義 Redux state 的初始值，且必須符合 TodoState 型別。
  todos: [], // 一開始沒有任何 todo。
  displayTodos: [], // 一開始畫面也沒有任何可顯示的 todo。
  filterDoneTodo: false, // 一開始不啟用完成項目篩選。
  todo: { // 詳細頁找不到資料時使用的預設 todo。
    id: 0, // 預設 todo id。
    name: '無此資料',
    done: false, // 預設 todo 狀態為未完成。
  }
};

const filterDisplayTodos = (filterDoneTodo: boolean, todos: Todo[]) => { // 根據篩選狀態決定畫面要顯示哪些 todo。
  if (filterDoneTodo) {
    return todos.filter(todo => !todo.done) // 如果啟用篩選，就只回傳尚未完成的 todo。
  }
  return [...todos]; // 如果沒有啟用篩選，就回傳整份 todo 清單的複製版本。
}
 
const todos = (state = initState, action: TodoActionTypes): TodoState => { // reducer：根據 action 回傳新的 TodoState。
  switch (action.type) { // 用 action.type 判斷這次要執行哪一種 state 更新。
    case 'ADD_TODO':
      return {
        ...state, // 複製舊 state，避免直接修改原本的物件。
        todos: [...state.todos, action.payload], // 把新的 todo 加到 todos 清單最後面。
        displayTodos: filterDisplayTodos(
          state.filterDoneTodo, [...state.todos, action.payload]
        ) // 依照目前篩選狀態重新計算畫面要顯示的 todo。
      }
    case 'DELETE_TODO': {
      const newTodos = state.todos.filter((todo: Todo) => (
        todo.id !== action.payload
      )); // 建立刪除目標 id 後的新 todo 清單。
      return {
        ...state, // 保留其他 state 欄位。
        todos: [...newTodos], // 用刪除後的新清單取代原本 todos。
        displayTodos: filterDisplayTodos(
          state.filterDoneTodo, [...newTodos]
        ) // 刪除後重新計算畫面顯示清單。
      }
    }
    case 'SWITCH_TODO_DONE_STATUS': {
      const targetTodoIndex = state.todos.findIndex(
        (todo: Todo) => todo.id === action.payload
      ); // 找出要切換完成狀態的 todo 在陣列中的位置。
 
      const newTodos = [...state.todos]; // 複製 todos，避免直接修改 Redux state。
 
      newTodos[targetTodoIndex] = {
        ...newTodos[targetTodoIndex], // 保留目標 todo 原本的其他欄位。
        done: !newTodos[targetTodoIndex].done, // 把 done 從 true 變 false，或從 false 變 true。
      };
   
      return {
        ...state, // 保留其他 state 欄位。
        todos: [...newTodos], // 用更新後的 todo 清單取代原本 todos。
        displayTodos: filterDisplayTodos(
          state.filterDoneTodo, [...newTodos]
        ), // 狀態切換後重新計算畫面顯示清單。
      }
    }
    case 'SWITCH_FILTER_DONE_TODO': {
      return {
        ...state, // 保留其他 state 欄位。
        filterDoneTodo: !state.filterDoneTodo, // 將篩選狀態反轉。
        displayTodos: filterDisplayTodos(
          !state.filterDoneTodo, [...state.todos]
        ), // 用反轉後的篩選狀態重新計算顯示清單。
      }
    }
    case 'GET_TODO_BY_ID': {
      const todo: Todo = state.todos.find((todo: Todo) => (
        todo.id === action.payload
      )) || initState.todo; // 用 id 找出單一 todo，找不到就使用預設 todo。
      return {
        ...state, // 保留其他 state 欄位。
        todo, // 把找到的 todo 放進詳細頁使用的 state.todo。
      }
    }
    default:
      return state; // 如果 action 不符合任何 case，就回傳原本 state。
  };
};


export default todos; // 匯出 reducer，讓 store 可以使用它建立 Redux state。
