import React from 'react';
import ReactDOM from 'react-dom/client';
// import AppProvider from './context';
import App from './App';
import MyProvider from './components/provider';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
     <MyProvider>
        <App />
      </MyProvider>
      </ThemeProvider>
  </React.StrictMode>
);
