// 這是 React 入口檔，負責把 TodoList 掛到 HTML 的 #root
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import TodoList from './views/TodoList';
 
ReactDOM.render(
  <TodoList />,
  document.getElementById('root')
);
