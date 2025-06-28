import React from 'react';
import ReactDOM from 'react-dom/client';
// import AppProvider from './context';
import App from './App';
import MyProvider from './components/provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <MyProvider>
        <App />
      </MyProvider>
  </React.StrictMode>
);
