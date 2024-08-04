import React, { useRef, useState } from 'react';

const Card = ({ image, value, suit, flipped }) => {
  const backImage = "https://www.deckofcardsapi.com/static/img/back.png"; // Replace with your own back image URL.
  const cardRef = useRef(null); // שימוש ב-ref כדי לשמור על גישה לאלמנט
  const [initialPosition, setInitialPosition] = useState({ top: 0, left: 0 });
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e) => {
    setDragging(true);
    const rect = cardRef.current.getBoundingClientRect();
    setInitialPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    });
    e.dataTransfer.setData('text/plain', ''); // דרוש כדי להפעיל את drag and drop
  };

  const handleDragEnd = (e) => {
    setDragging(false);
    cardRef.current.style.position = 'absolute';
    cardRef.current.style.top = `${initialPosition.top}px`;
    cardRef.current.style.left = `${initialPosition.left}px`;
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // דרוש כדי לאפשר גרירה
  };

  return (
    <div
      ref={cardRef}
      className="w-24 h-32 cursor-pointer"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver} // מאפשר לגרור
    >
      <img
        src={flipped ? image : backImage}
        alt={flipped ? `${value} of ${suit}` : "Card Back"}
        className="w-full h-full rounded-md"
      />
    </div>
  );
};

export default Card;
