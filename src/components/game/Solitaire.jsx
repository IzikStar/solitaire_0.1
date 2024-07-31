import React, { useState, useEffect } from 'react';
import './Game.css';
import Card from './Card';
import { solitaire } from './Solitaire.js';

const Solitaire = () => {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const [num, setNum] = useState(solitaire.index);

  useEffect(() => {
    // משיכת חבילת קלפים חדשה
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
  }, [solitaire.index]);

  const drawCards = async (count) => {
    solitaire.index++;
    setNum(num + 1)
    if (!deckId) {
      console.error('No deck ID available. Please fetch a new deck.');
      return;
    }
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
      const data = await response.json();
      setCards(data.cards);
    } catch (error) {
      console.error('Error drawing cards:', error);
    }
  };

  return (
    <div className='bg-lime-200'>
      <h1>Solitaire</h1>
      <button onClick={() => drawCards(52)}>Draw Cards</button>
      <div className="cards">
        {cards.map((card) => (
            <Card key={card.code + num} image={card.image} value={card.value} suit={card.suit} fllipd={false} />
        ))}
      </div>
    </div>
  );
};

export default Solitaire;
