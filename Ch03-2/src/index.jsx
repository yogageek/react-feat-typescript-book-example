import React from 'react';
import ReactDOM from 'react-dom'; 
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About'; 
import Menu from './components/Menu'; 
import NotFound from './views/NotFound'; 
import News from './views/News';

//這章節主要多了Menu元件，裡面用程式碼控制路由跳轉，而不是用 <Link>。其他的元件都是之前章節的內容，沒有改動。
 
ReactDOM.render(
  <HashRouter>
    <Menu />
    <Switch>
      <Route path="/news" component={News} />
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />  
      <Route path="/" component={NotFound} />
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);
