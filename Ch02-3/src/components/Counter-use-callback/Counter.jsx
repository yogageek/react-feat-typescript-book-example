import React, { useState, useCallback } from 'react';

// 用 React.memo 包住按鈕，props 沒變就不重渲染。
const IncrementButton = React.memo((props) => {
  console.log('Button 被重新渲染');
  return (
    <button onClick={props.increment}>
      點我加一
    </button>
  );
});
 
const Counter = () => {
  const [count, setCount] = useState(0);
 
  const increment = useCallback(() => {// 問題：Counter 每次重渲染，increment 函式都會被重新建立 → 新的函式參考 → React.memo 認為 props 變了 → IncrementButton 還是重渲染。
    setCount((newCount) => newCount + 1);// setCount((newCount) => newCount + 1) 用函式寫法是為了避免閉包抓到舊的 count 值。
  }, []);// useCallback 的解法：把函式快取起來，dependency [] 空陣列代表永遠不重新建立。
 
  return (
    <div>
      <div>目前數字：{count}</div>
      <IncrementButton increment={increment} />
    </div>
  );
};





export default Counter;
