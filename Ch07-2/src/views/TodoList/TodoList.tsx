import React from 'react'; // React 元件和 JSX 需要引入 React。
import { useSelector, useDispatch } from 'react-redux'; // useSelector 讀 Redux state，useDispatch 發送 Redux action。
import Filter from './Filter'; // 匯入篩選元件。
import TodoItem from './TodoItem'; // 匯入單一 todo 項目元件。
import Form from './Form' // 匯入新增 todo 的表單元件。
import { addTodo, deleteTodo, switchTodoDoneStatus, switchFilterDoneTodo } from '../../actions/todo'; // 匯入 action creators，讓元件可以發出 Redux action。
import { rootState } from '../../store'; // 匯入 Redux state 型別，讓 useSelector 的 state 有型別提示。
import styles from './index.scss'; // 匯入 CSS Modules 樣式物件。

const TodoList = () => { // TodoList 是清單頁主元件，負責組合篩選、列表和新增表單。
  const dispatch = useDispatch(); // 取得 dispatch 函式，用來把 action 送到 reducer。
  return (
    <div className={styles.layout}>
      <div className={styles.todoListWrapper}>
        <div className={styles.header}>
          <span className={styles.title}>
            Todo List
          </span>
          <span className={styles.subTitle}>
            Hi here is a sample todo list.
          </span>
        </div>
        <Filter
          filterDoneTodo={useSelector((state: rootState) => state.filterDoneTodo)}
          switchFilterDoneTodo={() => dispatch(switchFilterDoneTodo())}
        />
        <div className={styles.todoList}>
          {
            useSelector((state: rootState) => state.displayTodos).map(todo => ( // 從 Redux 讀取 displayTodos，並把每筆 todo 轉成 TodoItem。
              <TodoItem
                key={todo.id}
                todo={todo}
                switchTodoDoneStatus={(id) => dispatch(switchTodoDoneStatus(id))}
                deleteTodo={(id) => dispatch(deleteTodo(id))}
              />
            ))
          }
        </div>
        <Form addTodo={(todo) => dispatch(addTodo(todo))} />
      </div>
    </div>
  )
};

export default TodoList; // 匯出 TodoList，讓路由入口可以使用它。
