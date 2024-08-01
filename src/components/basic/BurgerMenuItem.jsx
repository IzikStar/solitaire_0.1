import React from 'react'

const BurgerMenuItem = (props) => {
  return (
    <div
      className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 active:scale-95`-200 h-[25%] '
      onClick={props.onClick}>
      {/* <i className='' /> */}
      <div className=''>
      <button className='mt-[10%] ml-2 text-xl text-white hover:underline transition-transform transform hover:scale-110 '>
        {props.icon}
        </button>
        <button className='ml-3 text-xl text-white hover:underline transition-transform transform hover:scale-110 '>
        {props.title}
      </button>
      </div>


    </div>
  )
}

export default BurgerMenuItem