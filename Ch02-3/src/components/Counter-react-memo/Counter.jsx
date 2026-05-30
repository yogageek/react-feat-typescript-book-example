import React, { useState, useEffect } from 'react';

// React.memo → 當 props 沒變，跳過元件重渲染

// 用 React.memo 包住 Title，意思是：props 沒變就跳過重渲染。
const Title = React.memo(() => {
  console.log('Render title component'); //return false 就會重渲染 = 印出 'Render title component'。
  return (
    <div>
      <h1>計數器</h1>
    </div>
  );
}, (prevProps, nextProps) => { // prevProps 和 nextProps 是 React.memo 的第二個參數
  console.log(prevProps, nextProps); //這裡永遠回傳 false，所以 memo 其實沒有作用（示範用）
  return false; // 回傳 false 就還是會重新繪製
});
// 這是 React.memo 的第二個參數，自訂比較函式。
// 回傳 true = 跳過渲染，回傳 false = 強制重渲染。
 
const Counter = () => {
  const [count, setCount] = useState(0);
 
  return (
    <div>
      <Title />
      <div>目前數字：{count}</div>
      <button onClick={() => { setCount(count + 1); }}>
        點我加一
      </button>
    </div>
  );
};


export default Counter;
