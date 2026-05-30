import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../actions/user';
 
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  
  console.log(useSelector(state => state));// 在 console 中印出整個 Redux store 的資料，看看裡面有哪些資料。
  // useSelector(state) // 錯誤。useSelector 接收的參數必須是一個函式，它會把 store 的 state 傳進這個函式，用回傳值決定元件拿到什麼。    
  
  return (
    <>
      <h1>這裡是首頁</h1>
      <div>
        {JSON.stringify(useSelector(state => state.user.user))}
      </div>
    </>
  )
  
  // 從 Redux store 取出 user.user 的資料，轉成字串顯示在畫面上。
};


export default Home;
