import React from 'react';
import ReactDOM from 'react-dom/client'; // עדכון ל-import הנכון
import App from './App';

// יצירת root של React והחיבור לאלמנט root בדף
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render היישום לתוך האלמנט root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
