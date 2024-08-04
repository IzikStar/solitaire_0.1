import { React, useContext } from 'react';
import Card from './Card';
import { GameContext } from '../../App.jsx';

const GameStack = (props) => {

    const { key, setKey } = useContext(GameContext);

    const generateStack = (cards, name) => {
        const elements = [];
        for (let i = cards.length - 1; i >= 0; i--) {
            const card = cards[i];
            const offsetY = 18; // התאמה של ערך זה כדי לשלוט בכמות ההסטה בין הקלפים

            elements.push(
                <div
                    key={card.key}
                    className='absolute'
                    style={{ 
                        zIndex: cards.length - 1 - i, // כדי להבטיח שהקלף העליון יהיה עם zIndex גבוה
                        transform: `translateY(${(cards.length - 1 - i) * offsetY}px)`
                    }}
                >
                    <Card
                        key={key}
                        index={i}
                        stack={name}
                        flipped={i === 0} // הקלף העליון יהיה הפוך
                        image={card.image}
                        value={card.value}
                        suit={card.suit}
                    />
                </div>
            );
            setKey(key + 1);
        }
        return elements;
    }
    

    return (
        <div className='relative w-[96px] h-[128px] border-2 border-white rounded-2 my-3 mx-[26px] bg-light'>
            {generateStack(props.cards, props.name)}
        </div>
    );
}

export default GameStack;
