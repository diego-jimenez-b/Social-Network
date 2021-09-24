import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './store/AuthContextProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename='/Social-Network'>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
