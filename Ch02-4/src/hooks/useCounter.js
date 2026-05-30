import { useState, useEffect } from 'react';

// 這裡我們自己寫了一個 Hook，叫做 useCounter，裡面包含了計數器的邏輯
const useCounter = (initialCount, callbackFunction) => {
  const [count, setCount] = useState(initialCount);//用傳進來的 initialCount 當初始值建立 state。
  
  useEffect(callbackFunction, [count]);//監聽 count，每次 count 變就執行 callbackFunction。

  //加法函式，傳入要加多少，更新 count。
  const add = (addend) => {
    setCount(count + addend);
  };
  
  return { count, add };//把狀態值和操作函式回傳出去，讓外面的元件使用。
};
 
export default useCounter;
