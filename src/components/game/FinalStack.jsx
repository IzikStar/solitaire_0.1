import React from 'react'
import Card from './Card'
import './Game.css';

const FinalStack = (props) => {

  const generateImage = (cards) => {
    if (cards.length > 0) {
      return (cards.map((card, idx) => (
        <div key={card.code + idx} className="card" style={{ zIndex: idx }}>
          <Card
            key={card.code}
            code={card.code}
            image={card.image}
            value={card.value}
            suit={card.suit}
            flipped={true} // הוספת אירוע להסרת קלף פתוח
          />
        </div>
      )))
    }
    return <img src="\images\suits.webp" alt="resomething" />
  }

  return (
    <div className="card-stack">
      {generateImage(props.cards)}
    </div>
  )
}

export default FinalStack