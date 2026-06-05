import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import Counter from './Counter';

// 1. 擴充斷言庫：讓 Jest 支援 `toBeInTheDocument` 方法，用來檢查 DOM 節點是否存在於畫面上
expect.extend({ toBeInTheDocument });

test('The default text display in view will be 目前數字：0', () => {
  // AAA 模式 - Arrange (準備：在記憶體中渲染 Counter 元件，並取得 getByText 查詢工具)
  const { getByText } = render(<Counter />);

  // AAA 模式 - Act & Assert (驗證：確認畫面上是否包含「目前數字：0」的文字)
  expect(getByText('目前數字：0')).toBeInTheDocument();
});

test('The text of count display in view will from 0 change to 1 after I clicked 點我加一 button', () => {
  // AAA 模式 - Arrange (準備：渲染元件，並取得查詢與驗證工具)
  const { getByText, queryByText } = render(<Counter />);

  // AAA 模式 - Act (操作：模擬使用者點擊畫面上文字為「點我加一」的按鈕)
  fireEvent.click(getByText('點我加一'));

  // AAA 模式 - Assert (驗證：確認原本的「目前數字：0」已消失，且新的「目前數字：1」出現在畫面上)
  expect(queryByText('null')).not.toBeInTheDocument(); // 原文有這句，但其實主要是下方驗證
  expect(queryByText('目前數字：0')).not.toBeInTheDocument();
  expect(getByText('目前數字：1')).toBeInTheDocument();
});

/*
============================================================
🎯 學習快卡：React 元件渲染與事件測試 (Counter.test.jsx)
============================================================

1. 核心 API 用途：
   - `render(<Component />)`: 在測試環境中模擬渲染 DOM 元件。
   - `fireEvent.click(element)`: 模擬真實使用者點擊該 DOM 節點的行為。

2. 關鍵查詢 API 選擇：
   - 【一定要在】用 `getByText` ➡️ 找不到會直接噴錯失敗。
   - 【檢查不在】用 `queryByText` ➡️ 找不到會回傳 null，搭配 `.not.toBeInTheDocument()` 使用。

3. 斷言擴充：
   - 使用 `expect.extend({ toBeInTheDocument })` 才能讓 Jest 看得懂 `.toBeInTheDocument()` 這類 DOM 專屬的驗證語法。
============================================================
*/


