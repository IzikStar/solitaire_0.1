// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import DragDropContext from './DragDropContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <DragDropContext>
      <App />
    </DragDropContext>
  </React.StrictMode>,
  document.getElementById('root')
);
