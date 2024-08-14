import React, { useState, useEffect, useContext } from 'react';
import Card from './Card';
import { GameContext } from '../../App.jsx';

const GameStack = (props) => {
    const { restartsGameNum } = useContext(GameContext);

    const [numOfCards, setNumOfCards] = useState(props.cards.length);
    const [numOfOpenCards, setNumOfOpenCards] = useState(1);
    const [numOfClosedCards, setNumOfClosedCards] = useState(0);
    const [changeCount, setChangeCount] = useState(0);

    useEffect(() => {
        if (changeCount === 3) {
            // Update numOfClosedCards on the third change
            setNumOfClosedCards(props.cards.length - 1);
        } else if (changeCount > 3) {
            // After the third change, only reduce numOfClosedCards if numOfCards is less
            if (props.cards.length <= numOfCards - numOfOpenCards) {
                setNumOfClosedCards(prevClosedCards => Math.max(prevClosedCards - 1, 0));
            }
        }
        setNumOfCards(props.cards.length);
    }, [props.cards]);

    useEffect(() => {
        // Update numOfOpenCards based on numOfClosedCards
        setNumOfOpenCards(numOfCards - numOfClosedCards);
    }, [numOfCards, numOfClosedCards]);

    useEffect(() => {
        // Increment changeCount every time props.cards changes
        setChangeCount(prevCount => prevCount + 1);
    }, [props.cards]);
    
    useEffect(() => {
        // Increment changeCount every time props.cards changes
        setChangeCount(1);
    }, [restartsGameNum]);

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
            {generateStack(props.cards, props.name)}
        </div>
    );
}

export default GameStack;
