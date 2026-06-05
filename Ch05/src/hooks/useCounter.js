import { useState, useEffect } from 'react';

// 自定義 Hook (Custom Hook)：用來處理計數器的狀態邏輯
const useCounter = (initialCount, callbackFunction) => {
  // 1. 使用 useState 初始化計數器狀態，預設值由外部傳入 (initialCount)
  const [count, setCount] = useState(initialCount);

  // 2. 使用 useEffect 監聽 count 的變化
  // 元件初次渲染（載入）以及當 count 的數值改變時，都會執行傳入的 callbackFunction
  useEffect(callbackFunction, [count]);

  // 3. 定義累加的方法，將目前的 count 加上傳入的增量 (addend)
  const add = (addend) => {
    setCount(count + addend);
  };

  // 4. 將狀態 (count) 與操作方法 (add) 回傳給使用的 React 元件
  return { count, add };
};

export default useCounter;

/*
這個檔案是一個「計數器邏輯包 (useCounter)」。它的主要任務是提供：
1. 一個數字狀態 (count)
2. 一個可以把數字變大的方法 (add)

- [useState] = 「一個儲存數字的抽屜」
- [useEffect] = 「一個自動通知鈴」，當抽屜裡的數字改變時，它會自動打電話通知外面。
- [add] = 「一個加法按鈕」，按下去並給它一個數字，抽屜裡的數字就會加上去。

【外部元件怎麼使用它】：
const { count, add } = useCounter(10, () => console.log("數字變了！"));
- 初始數字會是 10。
- 呼叫 add(5) 後，count 會變成 15，且主控台會印出 "數字變了！"。
*/
