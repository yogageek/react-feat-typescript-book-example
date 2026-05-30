import React from 'react';
import { useHistory } from 'react-router-dom';

//  結論：用程式碼控制路由跳轉，而不是用 <Link>。

const Menu = () => {
  const history = useHistory();//拿到 React Router 的 history 物件，可以用程式碼操控路由。
  const changeRouter = (router) => {
    history.push(router);//push 就是「跳到這個路徑」，同時把當前路徑推進 history stack，所以瀏覽器上一頁還能回去。
  };
 
  //三種不同 HTML 元素都掛同一個邏輯，點了就跳路由。
  return (
    <ul>
      <li onClick={() => changeRouter('/home')}>首頁</li>
      <button onClick={() => changeRouter('/about')}>關於我們</button> 
      <a onClick={() => changeRouter('/news')}>最新消息</a>
    </ul>
  )
};
 
export default Menu;
