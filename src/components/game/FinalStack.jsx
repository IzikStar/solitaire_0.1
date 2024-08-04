import React from 'react'

const FinalStack = () => {
  return (
    <div className="mx-[20px] h-[128px] w-[96px] border-1 rounded-2 border-light bg-light opacity-[80%] cursor-pointer "  onClick={() => drawCards(props.cards)}>
        <img src="\images\suits.webp" alt="resomething" />
    </div>
  )
}

export default FinalStack