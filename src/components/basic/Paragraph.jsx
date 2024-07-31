import React from 'react'

const Paragraph = (props) => {
  return (
    <div className={`flex flex-wrap text-center m-auto ${props.textClass}`} width={props.width}  >{props.text}</div>
  )
}

export default Paragraph