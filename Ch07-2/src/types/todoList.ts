export interface Todo { // 定義 Todo 物件的固定資料格式，讓其他檔案可以共用這個型別。
  id: number // id 必須是 number，通常用來辨識每一筆 todo。
  done: boolean // done 必須是 boolean，用來表示 todo 是否完成。
  name: string // name 必須是 string，用來存放 todo 顯示文字。
};
