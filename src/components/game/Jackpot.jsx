import React, { useState, useEffect } from 'react';
import './Game.css';
import Card from './Card';

const Jackpot = (props) => {
    const toLog = true; // משתנה לבדיקת הדפסות

    const [closedCards, setClosedCards] = useState([]);
    const [openCards, setOpenCards] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // כאשר כמות הקלפים לא משתנה
        if (props.cards.length >= closedCards.length + openCards.length) {
            const updatedClosedCards = props.cards.slice();
            setClosedCards(updatedClosedCards);
            setOpenCards([]);
            setIndex(0);

            if (toLog) {
                console.log("Cards updated with the same length. Updated closedCards:", updatedClosedCards);
            }
        } else if (props.cards.length < closedCards.length + openCards.length) {
            // כאשר כמות הקלפים קטנה - רק הקלפים הפתוחים מתעדכנים
            const updatedOpenCards = openCards.slice(1, openCards.length);
            setOpenCards(updatedOpenCards);

            if (toLog) {
                console.log("Cards updated with reduced length. Updated openCards:", updatedOpenCards);
            }
        }
    }, [props.cards]);

    const revealNextCard = () => {
        if (index < closedCards.length) {
            const cardToOpen = closedCards[index];
            const updatedOpenCards = [cardToOpen, ...openCards];

            if (toLog) {
                console.log("Revealing next card:", cardToOpen);
                console.log("Updated openCards:", updatedOpenCards);
            }

            setOpenCards(updatedOpenCards);
            setIndex(index + 1);
        }
    };

    const redealCards = () => {
        if (openCards.length > 0) {
            const reversedOpenCards = [...openCards.reverse()];

            if (toLog) {
                console.log("Redealing cards. New closedCards:", reversedOpenCards);
            }

            setClosedCards(reversedOpenCards);
            setOpenCards([]);
            setIndex(0);
        }
    };

    const removeTopCard = () => {
        if (openCards.length > 0) {
            const updatedOpenCards = openCards.slice(1);

            if (toLog) {
                console.log("Removing top card. Updated openCards:", updatedOpenCards);
            }

            setOpenCards(updatedOpenCards);
            setIndex(updatedOpenCards.length);
        }
    };

    const closeCardsGenerator = () => {
        if (index === closedCards.length) {
            return (
                <div className="h-[128px] w-[96px] border-1 rounded-2 border-light bg-light opacity-[80%] mx-2 cursor-pointer" onClick={redealCards}>
                    <img src="\images\redeal.webp" alt="redeal" />
                </div>
            );
        } else {
            return (
                <div className="w-24 h-32 cursor-pointer relative mx-2" onClick={revealNextCard}>
                    <Card flipped={false} />
                </div>
            );
        }
    };

    useEffect(() => {
        if (toLog) {
            console.log("Current openCards:", openCards);
            console.log("Current closedCards:", closedCards);
            console.log("Index:", index);
        }
    }, [openCards, closedCards, index]);

    return (
        <div>
            <div className="flex mt-4 justify-content-center">
                {closeCardsGenerator()}
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
                                onClick={removeTopCard} // הוספת אירוע להסרת קלף פתוח
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Jackpot;
