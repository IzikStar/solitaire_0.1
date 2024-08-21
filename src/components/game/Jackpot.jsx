import React, { useState, useEffect, useContext } from 'react';
import './Game.css';
import Card from './Card';
import { GameContext } from '../../App';

const Jackpot = ({cards}) => {
    const toLog = true; // משתנה לבדיקת הדפסות
    
    const { currentGame, setCurrentGame } = useContext(GameContext) 
    const [closeCards,setClosedCards] = useState(cards.getCloseCards());
    const [openCards, setOpenCards] = useState(cards.getOpenCards());

    useEffect(()=> {
        setClosedCards(cards.getCloseCards());
        setOpenCards(cards.getOpenCards());
    },[cards])

    const revealNextCard = () => {
        console.log("reaviling next card");
        setCurrentGame(currentGame.addNewMoveFromJackpot())
    };

    const closeCardsGenerator = () => {
        if (closeCards.length === 0) {
            return (
                <div className="h-[128px] w-[96px] border-1 rounded-2 border-light bg-light opacity-[80%] mx-2 cursor-pointer" onClick={revealNextCard}>
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
                                flipped={true} // הוספת אירוע להסרת קלף פתוח
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Jackpot;
