import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import { GlobalStyles } from './components/GlobalStyles';


ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

