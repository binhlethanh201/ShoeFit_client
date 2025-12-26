import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Đảm bảo bạn đã tạo store
import App from './App';

// --- IMPORT GLOBAL ASSETS ---
import "./assets/css/bootstrap.min.css";
import "./assets/css/tiny-slider.css";
import "./assets/css/style.css";

// JS Libraries 
import "./assets/js/bootstrap.bundle.min.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);