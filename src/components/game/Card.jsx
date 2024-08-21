import {React,useContext} from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './Solitaire';
import { GameContext } from '../../App.jsx';


const Card = ({ image, value, suit, flipped, code}) => {


  const { setSelectedCard,numOfClicks,setNumOfClicks } = useContext(GameContext);


  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { value, suit },
    canDrag: () => flipped,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }), [flipped]);

  const backImage = "https://www.deckofcardsapi.com/static/img/back.png";

  return (
    <div
      ref={dragRef}
      className={`card ${isDragging ? 'dragging' : ''}`}
      style={{
        cursor: flipped ? 'pointer' : 'default',
        zIndex: isDragging ? 999 : 'auto'
      }}
    >
      <img
        src={flipped ? image : backImage}
        alt={flipped ? `${value} of ${suit}` : "Card Back"}
        className="w-full h-full rounded-md"
        onClick={() => {
          if (flipped) {
            console.log('Clicked')
            setSelectedCard(code);
            setNumOfClicks(numOfClicks + 1);
          }
        }}
      />
    </div>
  );
};

export default Card;
