import React from 'react'; // React 元件和 JSX 需要引入 React。
import styles from './index.scss'; // 匯入 CSS Modules 樣式物件。

type FilterProps = { // 定義 Filter 元件會收到的 props 格式。
  filterDoneTodo: boolean; // filterDoneTodo 是 boolean，用來控制 checkbox 是否勾選。
  switchFilterDoneTodo:() => void; // switchFilterDoneTodo 是不接參數的函式，用來切換篩選狀態。
}

const Filter = (props: FilterProps) => { // Filter 是控制是否篩選完成項目的元件。
  return (
    <div className={styles.filter}>
      <input
        type="checkbox"
        checked={props.filterDoneTodo}
        onChange={props.switchFilterDoneTodo}
      />
      隱藏已完成事項
    </div>
  )
};

export default Filter; // 匯出 Filter，讓 TodoList 可以使用。
