import React, { useState, useMemo } from 'react';

// useMemo → 避免每次渲染都重跑昂貴的計算

const Counter = () => {
  //  兩個獨立 state：使用者名稱、計數器。
  const [userName, setUseName] = useState('');
  const [count, setCount] = useState(0);
  
  // 問題：按加一 → count 變 → 重渲染 → decoratedName 的計算也跟著重跑（即使 userName 根本沒變）。
  // useMemo 的解法：把計算結果快取，只有 userName 變才重新計算。
  const decoratedName = useMemo(() => {
    console.log('decorate name');
    return `超級${userName}！`;
  }, [userName]);
 
  return (
    <div>
      <div>使用者：{decoratedName}</div>
      <input
        value={userName}
        onChange={(e) => {setUseName(e.target.value)}}//受控元件，輸入框的值由 userName state 控制。
      />
      <div>目前數字：{count}</div>
      <button onClick={() => { setCount(count + 1); }}>
        點我加一
      </button>
    </div>
  );
};

export default Counter;
