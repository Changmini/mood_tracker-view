import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';

// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.withCredentials = false;
const NetworkInterceptores = (action) => {
  // if (action.baseURL) { /* response */ }
  // else { /* response */ }
  return action;
}
const NetWorkError = (error) => {
  if (error.code === "ERR_NETWORK") {
    console.error("Error Network");
    return null;
  }
  return Promise.reject(error);
}
axios.interceptors.request.use(NetworkInterceptores, NetWorkError);
axios.interceptors.response.use(NetworkInterceptores, NetWorkError);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


/* 나중에 추가
  react-redux
  react-router
*/