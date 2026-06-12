// 子元件：Filter.tsx 負責呈現「隱藏已完成事項」的核取方塊，並接收父層傳入的狀態與切換函式
import React from 'react';
import styles from './index.scss';

// 定義一個 TypeScript 型別別名 FilterProps，用來描述這個元件接受哪些 props
// 這裡的型別物件有兩個屬性：
type FilterProps = {
  filterDoneTodo: boolean; // filterDoneTodo 是一個布林值，代表「是否開啟隱藏已完成事項」的狀態
  switchFilterDoneTodo: () => void; // switchFilterDoneTodo 是一個函式，它沒有參數（()），也沒有返回值（void）
}

// 宣告函式元件 Filter，使用箭頭函式語法，並將 props 的型別標註為 FilterProps，讓 TypeScript 檢查父層傳進來的資料是否正確。
const Filter = (props: FilterProps) => {
  return (
    // 使用 CSS Modules 的 styles.filter 類別，對應到 index.scss 中的 .filter 樣式
    <div className={styles.filter}>
      <input
        type="checkbox"
        // checked 屬性綁定 props.filterDoneTodo 布林值，控制核取方塊是否勾選
        checked={props.filterDoneTodo}
        // onChange 事件綁定 props.switchFilterDoneTodo 函式，當使用者點擊時會觸發切換狀態的動作
        onChange={props.switchFilterDoneTodo}
      />
      隱藏已完成事項
    </div>
  )
};
// 匯出 Filter 元件，讓其他檔案（例如 TodoList 頁面）可以匯入使用
export default Filter;
