import React, { useState, useEffect, useContext } from 'react';
import './Game.css';
import Card from './Card';
import { solitaire, jackpotNumOfCards } from './Solitaire.js';
import Jackpot from './Jackpot.jsx';
import { GameContext } from '../../App.jsx';
import FinakStacks from './FinakStacks.jsx';
import GameStacks from './GameStacks.jsx';

const Solitaire = () => {
  const [deckId, setDeckId] = useState(null);
  const [deck, setDeck] = useState([]);
  const [jackpotCards, setJackpotCards] = useState([]);
  const [jackpotLength, setJackpotLength] = useState(jackpotNumOfCards);

  // const {  } = useContext(GameContext);


  const fetchDeck = async () => {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
      const data = await response.json();
      setDeckId(data.deck_id);
      solitaire.deckId = data.deck_id;
      console.log("deckId:", data.deck_id); // Updated to log the correct value
    } catch (error) {
      console.error('Error fetching deck:', error);
    }
  };

  const drawDeck = async (id) => {
    try {
      const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${id}/draw/?count=52`);
      const data = await response.json();
      setDeck(data.cards);
      setJackpotCards(data.cards.slice(0, jackpotNumOfCards));
      console.log("deck:", data.cards);
      console.log("jackpotCards:", data.cards.slice(0, jackpotNumOfCards));
    } catch (error) {
      console.error('Error drawing cards:', error);
    }
  };

  useEffect(() => {
    fetchDeck();
  }, []);

  useEffect(() => {
    if (deckId) {
      drawDeck(deckId);
    }
  }, [deckId]);

  const handleClick = (card) => {
    console.log('Clicked card:', card);
    setJackpotLength(jackpotCards.length);
    // Implement logic to handle card click
    // Example: Add card to jackpot or remove from hand
  };

  return (
    <>
      <main className='w-[1200px] h-[1300px] mt-3'>
        <section className='w-[full] flex-row flex rounded-2'>
          <div className='w-[50%] h-[full] rounded-2 '>
            <Jackpot deckId={deckId} cards={jackpotCards} length={jackpotNumOfCards} />
          </div>
          <div className='w-[50%] h-[full] rounded-2 '>
            <FinakStacks />
          </div>
        </section>
        <section>
          <GameStacks cards={deck.slice(jackpotNumOfCards, deck.length)} />
        </section>
      </main>
    </>

  );
};

export default Solitaire;
