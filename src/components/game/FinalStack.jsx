import React from 'react'

const FinalStack = (props) => {

  const generateImage = (cards) => {
    if(cards.length > 0) return <img url={cards[cards.length - 1].img} /> 
    return <img src="\images\suits.webp" alt="resomething" />
  }

  return (
    <div className="mx-[20px] h-[128px] w-[96px] border-1 rounded-2 border-light bg-light opacity-[80%] cursor-pointer ">
      {generateImage(props.cards)}
    </div>
  )
}

export default FinalStack