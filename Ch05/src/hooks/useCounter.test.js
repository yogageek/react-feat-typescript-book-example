import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from './useCounter';

test('The default count will be the received parameter.', () => {
  // AAA 模式 - Arrange
  // renderHook: 因為 Hook 無法直接在 Node.js 中執行，需利用它模擬一個虛擬元件環境來載入 Hook
  const { result } = renderHook(() => useCounter(8, () => { }));
  const expected = 8;

  // AAA 模式 - Assert
  // result.current: 取得目前 Hook 回傳的最新狀態與方法
  expect(result.current.count).toBe(expected);
});

test('The default count will be the received parameter.', () => {
  // AAA 模式 - Arrange
  const { result } = renderHook(() => useCounter(8, () => { }));
  const expected = 24;

  // AAA 模式 - Act
  // act: 當操作會改變 React 內部 State 時，必須包在 act 中，確保 React 完成渲染更新後才進行下一步
  act(() => { result.current.add(16); });

  // AAA 模式 - Assert
  expect(result.current.count).toBe(expected);
});

test('The callback function will executed after the add executed.', () => {
  // AAA 模式 - Arrange
  // jest.fn(): 建立一個間諜 Mock 函式，用來監控它是否被呼叫、呼叫幾次與接收的參數
  const mockCallback = jest.fn();
  const { result } = renderHook(() => useCounter(8, mockCallback));

  // AAA 模式 - Act
  act(() => { result.current.add(16); });

  // AAA 模式 - Assert
  // mockCallback.mock.calls.length: 驗證該回呼函式總共被呼叫了幾次
  expect(mockCallback.mock.calls.length).toBe(2);
});

/*
1. 測試參數與元件狀態對照：
   - 傳入 `useCounter(8)` ➡️ `count` 初始狀態為 8。
   - 呼叫 `add(16)` ➡️ `addend` 加數為 16 ➡️ 預期結果 `count` 為 24。

2. 為什麼測試執行 L7、L32 參數不同？
   - 初始值測試 (L7) 不需要監聽，傳入空函式 `() => {}` 即可。
   - 行為測試 (L32) 需監聽 callback，傳入 `jest.fn()` 建立監聽間諜。

3. 為什麼 useEffect 觸發次數是 2？
   - 第 1 次：Hook 首次載入 (Mount) 時。
   - 第 2 次：呼叫 `add(16)`，`count` 狀態變更觸發。

4. 呼叫次數的 Jest 寫法：
   - 傳統寫法：`expect(mockCallback.mock.calls.length).toBe(2);`
   - 現代推薦：`expect(mockCallback).toHaveBeenCalledTimes(2);`

💡 核心心法：
寫測試前，必須先掌握原始碼的「狀態變更邏輯」與「useEffect 依賴項觸發時機」，才能正確設定 Act（操作）並預測 Assert（斷言）的結果。
*/


