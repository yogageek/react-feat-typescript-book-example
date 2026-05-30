export const addNews = news => ({//傳入一筆新聞，回傳一個 action 物件。
    type: 'ADD_NEWS', 
    payload: { news } }
);
 
export const deleteNews = id => ({//傳入 id，回傳一個 action 物件。
  type: 'DELETE_NEWS', // 告訴 reducer 要做什麼
  payload: { id }, // 附帶的資料
});

// 結論：這是 action creator，負責產生標準格式的 action 物件。
