import React, { useState, useEffect } from 'react';
import './Game.css';
import Card from './Card';
import { solitaire } from './Solitaire.js';

const Solitaire = () => {
  const [deckId, setDeckId] = useState(null);
  const [closedCards, setClosedCards] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
        const data = await response.json();
        setDeckId(data.deck_id);
        solitaire.deckId = data.deck_id;
      } catch (error) {
        console.error('Error fetching deck:', error);
      }
    };

    fetchDeck();
  }, []);

  const drawCards = async (count) => {
    if (!deckId) {
      console.error('No deck ID available. Please fetch a new deck.');
      return;
    }

    try {
      // Check if there are open cards and reset if needed
      if (openCards.length == closedCards.length) {
        setClosedCards(openCards);
        setClosedCards(closedCards.reverse());
        setOpenCards([]);
        setIndex(0);
      }
      if (openCards.length > 0) {
        setOpenCards([]);
        setClosedCards([]);
        setIndex(0);
      }

      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
      const data = await response.json();
      setClosedCards(data.cards);
    } catch (error) {
      console.error('Error drawing cards:', error);
    }
  };

  const revealNextCard = () => {
    if (index < closedCards.length) {
      setOpenCards([closedCards[index], ...openCards]);
      setIndex(index + 1);
    }
  };

  return (
    <div className='bg-lime-200'>
      <h1>Solitaire</h1>
      <button onClick={() => drawCards(28)}>Draw Cards</button>
      <div className="flex mt-4">
        <div className="w-24 h-32 cursor-pointer relative" onClick={revealNextCard}>
          {closedCards.length > 0 && index < closedCards.length ? (
            <Card flipped={false} />
          ) : null}
        </div>
        <div className="flex ml-4">
          {openCards.map((card, idx) => (
            <Card key={card.code + idx} image={card.image} value={card.value} suit={card.suit} flipped={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solitaire;
