import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

// הגדרת הקונטקסט
export const GameContext = createContext();

function App() {
  const [deck, setDeck] = useState(null);
  const [key, setKey] = useState(0);

  // כל הפונקציות והמצב של המשחק
  const gameState = {
    deck,
    setDeck,
    key,
    setKey
  };

  return (
    <GameContext.Provider value={gameState}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </GameContext.Provider>
  );
}

export default App;
