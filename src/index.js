import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';

import 'antd/dist/antd.css';
import './index.css';

const publicUrl = process.env.PUBLIC_URL;

// 这里要包裹一个Router组件才能使用Switcha或withRouter高阶组件
ReactDOM.render(
  <Router basename={publicUrl}>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
