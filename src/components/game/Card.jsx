import React, { useState } from 'react';

const Card = ({ image, value, suit, fllipd }) => {
    const backImage = "https://www.deckofcardsapi.com/static/img/back.png"; // Replace with your own back image URL.

  // useState hook to manage the card flipping state.
  const [isFlipped, setIsFlipped] = useState(fllipd);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="w-24 h-32 cursor-pointer"
      onClick={handleFlip}
    >
      <img
        src={isFlipped ? image : backImage}
        alt={isFlipped ? `${value} of ${suit}` : "Card Back"}
        className="w-full h-full rounded-md"
      />
    </div>
  );
};

export default Card;
