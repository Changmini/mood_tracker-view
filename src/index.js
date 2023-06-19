import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';

/* baseURL = "http://ilsang:8080" */
// axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
const NetworkInterceptores = (action) => {
    // if (action.baseURL) { /* response */ }
    // else { /* response */ }
    return action;
}
const NetWorkError = (error) => {
    console.error(error);
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