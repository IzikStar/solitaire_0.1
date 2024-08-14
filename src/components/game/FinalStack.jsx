import React from 'react'
import Card from './Card'

const FinalStack = (props) => {

  const generateImage = (cards) => {
    if(cards.length > 0) return <Card image={cards[cards.length-1].image} value={cards[cards.length-1].value} suit={cards[cards.length-1].suit} code={cards[cards.length-1].code} flipped={true} key={cards[cards.length-1].code} /> 
    return <img src="\images\suits.webp" alt="resomething" />
  }

  return (
    <div className="mx-[20px] h-[128px] w-[96px] border-1 rounded-2 border-light bg-light cursor-pointer ">
      {generateImage(props.cards)}
    </div>
  )
}

export default FinalStack