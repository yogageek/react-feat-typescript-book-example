# Jest + React Testing Library 學習筆記

---

## 1. 核心工具認識

| 套件 | 角色 | 為什麼需要 |
|------|------|-----------|
| `jest` | 測試執行器主體 | 核心引擎，跑所有測試 |
| `babel-jest` | 語法轉譯橋接 | Jest 看不懂 ES6 import/export 與 JSX，需轉成 CommonJS |
| `identity-obj-proxy` | 樣式檔模擬 | Jest 在 Node.js 中無法解析 `.css`/`.scss`，用空物件代替避免報錯 |
| `@testing-library/react` | UI 測試工具 | React 官方推薦，模擬瀏覽器渲染、使用者行為（前身為 Enzyme） |

---

## 2. 安裝依賴

```bash
npm i -D @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/testing-library__react

# 若使用 Babel（純 JS 專案）
npm i -D @babel/preset-env @babel/preset-react babel-jest
```

---

## 3. 初始化 Jest 設定（一次性）

```bash
npx jest --init
```

互動式問答建議選擇：

- **Use Babel**：TypeScript 專案選 No（用 ts-jest）；純 JS 選 Yes
- **Test environment**：`jsdom`（適合 React）
- **Coverage**：視需求
- **Test file pattern**：保留預設 `**/?(*.)+(spec|test).js?(x)`
- **Write config to**：`jest.config.js`

---

## 4. 設定檔配置

**`package.json`** — 測試腳本 + 樣式對應：

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "moduleNameMapper": {
      "\\.(css|scss)$": "identity-obj-proxy"
    }
  }
}
```

**`babel.config.json`** — 支援 JSX/ES6：

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

---

## 5. 執行測試

```bash
npm test                  # 一次性跑完所有 *.test.* 檔案
npm run test:watch        # 監聽變化，持續測試
npm run test:coverage     # 產生覆蓋率報告
```

---

## 6. 核心概念整理

**測試寫法**
- **AAA 模式**：Arrange → Act → Assert，測試結構標準流程
- **非同步測試**：`jest.fn()` + `mockResolvedValue` mock `fetch`，搭配 `await` 驗證結果
- **Hook 測試**：`renderHook` + `act` 觸發狀態更新後再斷言

**常用 API**

| API | 用途 |
|-----|------|
| `jest.fn()` | 建立 mock 函式 |
| `mockResolvedValue` | mock 非同步回傳值 |
| `render` | 渲染 React 元件 |
| `fireEvent` | 模擬使用者事件 |
| `act` | 包裹會觸發狀態更新的操作 |
| `renderHook` | 測試自訂 Hook |

---

## 7. 附錄：code-explainer Skill（Gemini 自動化工具）

路徑：`~/.gemini/config/skills/code-explainer/SKILL.md`

工作流程：
1. 詢問檔案用途
2. 在重點程式碼後插入簡潔說明註解
3. 針對不理解的部分提供解釋
4. 在檔案尾端加上「學習卡」摘要

已套用至：`Counter.js`、`Counter.test.js`、`useCounter.js`、`useCounter.test.js`、`Counter.test.jsx`