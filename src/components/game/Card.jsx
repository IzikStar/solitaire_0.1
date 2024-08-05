import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';

const Card = ({ image, value, suit, flipped }) => {
  const backImage = "https://www.deckofcardsapi.com/static/img/back.png";
  const cardRef = useRef(null);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    // לקרוא את המיקום ההתחלתי ברגע שהרכיב נטען
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setInitialPosition({ x: rect.left, y: rect.top });
    }
  }, []);

  const onStart = () => {
    if (flipped) {
      setDragging(true);
    }
  };

  const onStop = () => {
    setDragging(false);
    if (cardRef.current) {
      // החזרת הרכיב למיקום ההתחלתי
      cardRef.current.style.transform = `translate(${initialPosition.x}px, ${initialPosition.y}px)`;
    }
  };

  return (
    <Draggable
      onStart={onStart}
      onStop={onStop}
      disabled={!flipped} // השבתת הגרירה אם הקלף לא פתוח
    >
      <div
        ref={cardRef}
        className={`card ${dragging ? 'dragging' : ''}`}
        style={{
          position: 'absolute',
          cursor: flipped ? 'move' : 'default',
          transform: dragging ? 'none' : `translate(${initialPosition.x}px, ${initialPosition.y}px)`, // החלפת תרגום
          transition: 'transform 0.2s ease' // אנימציה חלקה למעבר למיקום ההתחלתי
        }}
      >
        <img
          src={flipped ? image : backImage}
          alt={flipped ? `${value} of ${suit}` : "Card Back"}
          className="w-full h-full rounded-md"
        />
      </div>
    </Draggable>
  );
};

export default Card;
