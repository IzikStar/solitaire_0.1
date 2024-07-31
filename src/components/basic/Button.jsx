import React from 'react'

const Button = (props) => {
  return (
   
   <button onClick={props.onClick} className='w-30 p-2 mx-auto border-[3px] border-blue-900 bg-blue-500 font-bold rounded-xl my-3'>
        {props.icon}
        <span className='ml-2'>{props.name}</span>
    </button>
    
  )
}

export default Button