import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Home from './pages/Home';
import './App.css';

// הגדרת הקונטקסט
export const GameContext = createContext();

function App() {
  const [deck, setDeck] = useState([]);
  const [key, setKey] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null)
  const [numOfClicks, setNumOfClicks] = useState(0);

  // כל הפונקציות והמצב של המשחק
  const gameState = {
    deck,
    setDeck,
    key,
    setKey,
    selectedCard,
    setSelectedCard,
    numOfClicks,
    setNumOfClicks,
  };

  return (
    <GameContext.Provider value={gameState}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </DndProvider>
    </GameContext.Provider>
  );
}

export default App;
