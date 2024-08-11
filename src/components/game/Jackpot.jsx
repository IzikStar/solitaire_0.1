import React, { useState, useEffect } from 'react';
import './Game.css';
import Card from './Card';

const Jackpot = (props) => {
    const [closedCards, setClosedCards] = useState([]);
    const [openCards, setOpenCards] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        drawCards(props.cards);
    }, [props.cards]);

    const drawCards = (cards) => {
        if (openCards.length === cards.length) {
            setClosedCards(openCards.reverse());
            setOpenCards([]);
            setIndex(0);
        } else if (closedCards.length === 0) {
            setClosedCards(cards);
        }
    };

    const revealNextCard = () => {
        if (index < closedCards.length) {
            setOpenCards([closedCards[index], ...openCards]);
            setIndex(index + 1);
        }
    };

    const closeCardsGenerator = (length) => {
        if (index === length) {
            return (
                <div className=" h-[128px] w-[96px] border-1 rounded-2 border-light bg-light opacity-[80%] mx-2 cursor-pointer " onClick={() => drawCards(props.cards)}>
                    <img src="\images\redeal.webp" alt="resomething" />
                </div>
            )
        } else {
            return (
                <div className="w-24 h-32 cursor-pointer relative mx-2" onClick={revealNextCard}>
                    {closedCards.length > 0 && index < closedCards.length ? (
                        <Card flipped={false} />
                    ) : null}
                </div>
            );
        }
    }

    return (
        <div>
            <div className="flex mt-4 justify-content-center">
                {closeCardsGenerator(props.length)}
                <div className="card-stack">
                    {openCards.map((card, idx) => (
                        <div key={card.code + idx} className="card" style={{ zIndex: openCards.length - idx }}>
                            <Card
                                key={card.code}
                                code={card.code}
                                image={card.image}
                                value={card.value}
                                suit={card.suit}
                                flipped={true}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Jackpot;