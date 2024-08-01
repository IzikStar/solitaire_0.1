import React from 'react';

const Card = ({ image, value, suit, flipped }) => {
  const backImage = "https://www.deckofcardsapi.com/static/img/back.png"; // Replace with your own back image URL.

  return (
    <div className="w-24 h-32 cursor-pointer">
      <img
        src={flipped ? image : backImage}
        alt={flipped ? `${value} of ${suit}` : "Card Back"}
        className="w-full h-full rounded-md"
      />
    </div>
  );
};

export default Card;
