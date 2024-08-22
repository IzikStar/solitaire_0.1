import React from 'react'
import Card from './Card'

const FinalStack = (props) => {

  const generateImage = (cards) => {
    if(cards.length > 0){
      return (cards.map((card, index) => {
        <Card image={card.image} value={card.value} suit={card.suit} code={card.code} flipped={true} key={card.code} />     
      }))
    }
    return <img src="\images\suits.webp" alt="resomething" />
  }

  return (
    <div className="mx-[20px] h-[128px] w-[96px] border-1 rounded-2 border-light bg-light cursor-pointer ">
      {generateImage(props.cards)}
    </div>
  )
}

export default FinalStack