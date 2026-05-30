import React, { useState } from 'react'; 
import { connect } from 'react-redux'; 
import { addNews } from '../../actions/news';
 

// 結論：新增新聞的表單，填完送出後 dispatch action 到 Redux store。


const NewsForm = (props) => {
  const [name, setName] = useState('');
  const [describe, setDescribe] = useState('');
 
  // 使用者打字 → 更新 local state → 輸入框顯示最新值。
  return (
    <div>
      名稱：
      <input
        value={name}
        onChange={(e) => { setName(e.target.value); }}
      />
      敘述：
      <input
        value={describe}
        onChange={(e) => { setDescribe(e.target.value); }}
      />
      <button  
        onClick={() => {
          props.addNews({ id: Math.random(), name, describe })//按新增 → 把表單資料包成一筆新聞物件 → dispatch 到 store。
        }}
      >
        新增最新消息
      </button>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({// 把 addNews action 包成函式注入成 props.addNews，
  addNews: (news) => { 
    dispatch(addNews(news));
  },
});
 
export default connect(null, mapDispatchToProps)(NewsForm);
// 第一個參數 null 代表不需要從 store 讀任何資料，只需要 dispatch，所以 mapStateToProps 傳 null。

// 資料流：
// 使用者輸入 → local state（暫存）
// 按新增 → dispatch addNews → reducer 加進 store
// → NewsList 重新渲染，顯示新的一筆