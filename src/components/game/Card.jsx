import { useState, useEffect, useContext, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './Solitaire';
import { GameContext } from '../../App.jsx';
import { playSound } from '../music.js';
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
  const p5InstanceRef = useRef(null);

  // הפונקציה שמפעילה את הסאונד
  const handlePlaySound = () => {
    playSound('/public/sounds/selectPieceSound1.wav', 
      (song) => {
        console.log('Sound loaded and playing', song);
      }, 
      (error) => {
        console.error('Failed to load sound:', error);
      }
    );
  };

  const [isAnimating, setIsAnimating] = useState(isWinning);

  useEffect(() => {
    if (isAnimating) {
      const maxX = window.innerWidth - cardRef.current.offsetWidth - 750;
      const maxY = window.innerHeight - cardRef.current.offsetHeight - 750; // מונע חפיפה עם ההדר

      gsap.to(cardRef.current, {
        x: Math.random() * maxX - maxX / 2,
        y: Math.random() * maxY - maxY / 2,
        scale: 1.2,
        duration: 5, // משך זמן קצר יותר
        ease: "power2.out",
        repeat: 1,
        yoyo: true,
        onComplete: () => setIsAnimating(false),
      });
    }
  }, [isAnimating]);

  useEffect(() => {
    setIsAnimating(isWinning);
  }, [isWinning]);

  const handleCardClick = () => {
    if (flipped) {
      console.log('Clicked');
      setSelectedCard(code);
      setNumOfClicks(numOfClicks + 1);
      handlePlaySound(); // הפעלת הסאונד
    }
  };

  const handleShake = () => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current, 
        { x: -5 }, 
        { 
          x: 5, 
          duration: 0.1, 
          ease: "power1.inOut", 
          yoyo: true, 
          repeat: 5, 
          onComplete: () => {
            gsap.set(cardRef.current, {
              x: 0,
              y: 0,
            });
          }
        }
      );
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
        position: 'relative',
      }}
      onClick={handleCardClick}
    >
      <img
        src={flipped ? image : backImage}
        alt={flipped ? `${value} of ${suit}` : "Card Back"}
        className="w-full h-full rounded-md"
      />
      {flipped && (
        <button 
          onClick={handleShake} 
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
          onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
        >
        </button>
      )}
    </div>
  );
};

export default Card;
