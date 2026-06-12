// 這是 TypeScript 型別定義。先只要知道 Todo 規定了一筆 todo 資料要有 id、done、name
// interface 用來描述一筆 todo 資料的「形狀」。
// 之後只要寫 Todo，TypeScript 就會檢查資料是否有 id、done、name。
export interface Todo {
  id: number
  done: boolean
  name: string
};
