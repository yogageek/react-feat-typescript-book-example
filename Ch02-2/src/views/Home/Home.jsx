import React, { useState } from 'react';
import Counter from '../../components/Counter';

// 建立一個 state，初始值 true。displayCounter 讀值，setDisplayCounter 改值。
// 按下按鈕 → 把 displayCounter 設為 true → 觸發重渲染。
// 按下按鈕 → 把 displayCounter 設為 false → 觸發重渲染。

const Home = () => {
  const [displayCounter, setDisplayCounter] = useState(true);  
  return (
    <div>
      <button onClick={() => { setDisplayCounter(true); }}>
        打開計數器
      </button>
      <button onClick={() => { setDisplayCounter(false); }}>
        關閉計數器
      </button>
      {displayCounter ? <Counter /> : null}      
    </div>
  );
};

// {displayCounter ? <Counter /> : null} 是一個條件渲染的語法，
// 當 displayCounter 為 true 時，渲染 Counter 元件；
// 當 displayCounter 為 false 時，不渲染任何東西（null）。
// {} 的作用
// JSX 裡的 {} = 「這裡插入一段 JS」。
// 三元運算子會回傳一個值（<Counter /> 或 null），React 拿到這個值去決定渲染什麼

export default Home;
