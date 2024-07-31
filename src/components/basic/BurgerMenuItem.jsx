import React from 'react'

const BurgerMenuItem = (props) => {
  return (
    <div 
    className='bg-gray-200'
    onClick={props.onClick}>
        {/* <i className='' /> */}
        {props.icon}
        {props.title}
    </div>
  )
}

export default BurgerMenuItem