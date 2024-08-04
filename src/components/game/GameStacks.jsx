import React from 'react'
import GameStack from './GameStack';

const GameStacks = (props) => {

    const generateStacks = (cards) => {
        const stacks = [];
        let start = 0; // מיקום התחלתי של קלפים בכל ערימה

        for (let i = 1; i <= 7; i++) {
            // חישוב סוף הערימה
            const end = start + i;
            // חיתוך הקלפים עבור הערימה הנוכחית
            const stackCards = cards.slice(start, end);
            // הוספת ערימה עם קלפים
            stacks.push(<GameStack name={i} key={i} cards={stackCards} />);
            // עדכון מיקום התחלתי עבור הערימה הבאה
            start = end;
        }

        return stacks;
    }



    return (
        <div className=' w-[full] flex flex-row justify-content-end'>
            {generateStacks(props.cards)}
        </div>
    )
}

export default GameStacks