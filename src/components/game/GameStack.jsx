import React, { useState, useEffect } from 'react';
import Card from './Card';

const GameStack = ({cards, name}) => {

    const [numOfOpenCards, setNumOfOpenCards] = useState(cards.getNumOfOpenCards());

    useEffect(() => {
        setNumOfOpenCards(cards.getNumOfOpenCards());
    }, [cards]);


    const generateStack = (cards, name) => {
        const elements = [];
        for (let i = cards.length - 1; i >= 0; i--) {
            const card = cards[i];
            const offsetY = 18;
            elements.push(
                <div
                    key={card.code}
                    className='absolute'
                    style={{ 
                        zIndex: cards.length - 1 - i,
                        transform: `translateY(${(cards.length - 1 - i) * offsetY}px)`
                    }}
                >
                    <Card
                        key={card.code}
                        code={card.code}
                        index={i}
                        stack={name}
                        flipped={i < numOfOpenCards}
                        image={card.image}
                        value={card.value}
                        suit={card.suit}
                    />
                </div>
            );
        }
        return elements;
    }
    
    return (
        <div className='relative w-[96px] h-[128px] border-2 border-white rounded-2 my-3 mx-[26px] bg-light'>
            {generateStack(cards.getCards(), name)}
        </div>
    );
}

export default GameStack;
