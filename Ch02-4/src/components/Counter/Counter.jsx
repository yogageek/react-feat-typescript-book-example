import React from 'react';
import useCounter from '../../hooks/useCounter';

const Counter = () => {
  const { count, add } = useCounter(// useCounter 是我們自己寫的 Hook, 寫一次後就可以在很多地方重複使用。
    1, () => { console.log('一般的計數器執行'); }
  );
 
  return (
    <div>
      <div>目前的數字：{count}</div>
      <button onClick={() => { add(1); }}>
        點我加一
      </button>
    </div>
  );
};

export default Counter;
