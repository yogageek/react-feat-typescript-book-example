import 'regenerator-runtime/runtime';
import 'core-js/stable';
import Counter from './Counter';
import { addTwoNumbers } from './math';

// 1. Mocking 機制：將 ./math 模組中的函式替換為 Jest 模擬函式（替身），避免真正的數學運算干擾測試
jest.mock('./math'); // 製作替身

test('The default value of count of the counter will be 0', () => {
  // AAA 模式 - Arrange (準備資料與實例)
  const counter = new Counter();
  const expected = 0;

  // AAA 模式 - Assert (驗證結果是否符合預期)
  expect(counter.count).toBe(expected);
});

test('The count will be from 0 become 1 if I first executed increment method.', () => {
  // AAA 模式 - Arrange (準備：設定模擬函式的回傳值，並實例化)
  addTwoNumbers.mockReturnValue(1); // 設置回傳值
  const counter = new Counter();
  const expected = 1;

  // AAA 模式 - Act (操作：執行要測試的方法)
  counter.increment();

  // AAA 模式 - Assert (驗證)
  expect(counter.count).toBe(expected);
});

test('The count will become value of response after executed setCountFromDatabase.', async () => {
  // AAA 模式 - Arrange (準備：模擬全域 fetch 瀏覽器 API 及其回傳的 Promise/JSON 資料)
  global.fetch = jest.fn().mockResolvedValue(
    { json: () => ({ count: 5 }) }   // json: () => ({ count: 5 }) 模擬網路 API 回傳的 JSON 資料，其中包含一個 count 屬性。
  );
  const counter = new Counter();
  const expected = 5;

  // AAA 模式 - Act (操作：因為是異步請求，所以使用 await 等待執行完畢)
  await counter.setCountFromDatabase();

  // AAA 模式 - Assert (驗證)
  expect(counter.count).toBe(expected);

  // 清理環境：移除全域的 mock fetch，避免污染其他測試
  delete global.fetch;
});

