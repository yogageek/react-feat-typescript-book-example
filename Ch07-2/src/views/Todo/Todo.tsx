import React, { useEffect } from 'react'; // 引入 React 和 useEffect，讓元件可以在渲染後執行查詢動作。
import { useSelector, useDispatch } from 'react-redux'; // useSelector 讀 Redux state，useDispatch 發送 Redux action。
import { useParams, useHistory } from 'react-router-dom'; // useParams 讀網址參數，useHistory 用程式碼切換頁面。
import { Todo as ITodo } from '../../types/todoList'; // 把 Todo 型別改名成 ITodo，避免和元件名稱 Todo 撞名。
import { rootState } from '../../store'; // 引入 Redux state 型別，讓 useSelector 有型別提示。
import { getTodoById } from '../../actions/todo'; // 匯入 action creator，用 id 查詢單一 todo。
import styles from './index.scss'; // 匯入 CSS Modules 樣式物件。

const Todo = () => { // Todo 是詳細頁元件，負責顯示單一 todo。
  const history = useHistory(); // 取得 history 物件，讓按鈕可以返回清單頁。
  const { id }: { id: string } = useParams(); // 從網址讀出 id，且 useParams 取得的參數預設是字串。
  const dispatch = useDispatch(); // 取得 dispatch 函式，用來發送 Redux action。
  useEffect(() => { // 元件渲染後執行查詢單一 todo 的動作。
    dispatch(getTodoById(Number(id))); // 把網址字串 id 轉成 number，再送出 getTodoById action。
  });

  const todo: ITodo = useSelector(
    (state: rootState) => state.todo
  ); // 從 Redux state 讀出目前詳細頁要顯示的 todo。

  return (
    <div className={styles.layout}>
      <div className={styles.todo}>
        <span>ID：{todo.id}</span>
        <h1>{ todo.name }</h1>
        <p>完成狀況：
          <span style={{ color: todo.done ? '#21bf73' : '#eb8f8f' }}>
            {todo.done ? '已完成' : '未完成'}
          </span>
        </p>
        <button type="button" onClick={() => { history.push('/') }}>
          回待辦事項列表
        </button>
      </div>
    </div>
  )
};

export default Todo; // 匯出 Todo 詳細頁元件，讓路由可以使用。
