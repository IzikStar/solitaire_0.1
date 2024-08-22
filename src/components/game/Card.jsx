import { useState, useEffect, useContext, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './Solitaire';
import { GameContext } from '../../App.jsx';
import gsap from 'gsap';

const Card = ({ image, value, suit, flipped, code }) => {
  const { setSelectedCard, numOfClicks, setNumOfClicks, isWinning } = useContext(GameContext);
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { value, suit },
    canDrag: () => flipped,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [flipped]);

  const cardRef = useRef(null);

  const [isAnimating, setIsAnimating] = useState(isWinning);

  useEffect(() => {
    if (isAnimating) {
      gsap.to(cardRef.current, {
        x: Math.random() * 1000 - 590,
        y: Math.random() * 1000 - 590,
        scale: 1.2,
        duration: 10,
        ease: "power2.out",
        repeat: 1,
        yoyo: true,
        onComplete: () => setIsAnimating(false),
      });
    }
  }, [isAnimating]);

  useEffect(() => {
      setIsAnimating(isWinning);
  }, [isWinning])

  const handleCardClick = () => {
    if (flipped) {
      console.log('Clicked');
      setSelectedCard(code);
      setNumOfClicks(numOfClicks + 1);
      setIsAnimating(true);
    }
  };

  const backImage = "https://www.deckofcardsapi.com/static/img/back.png";

  return (
    <div
      ref={(node) => {
        dragRef(node);
        cardRef.current = node;
      }}
      className={`card ${isDragging ? 'dragging' : ''}`}
      style={{
        cursor: flipped ? 'pointer' : 'default',
        zIndex: isDragging ? 999 : 'auto',
      }}
      onClick={handleCardClick}
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
