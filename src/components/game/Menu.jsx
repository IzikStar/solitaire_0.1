import React from 'react'
import BurgerMenuItem from '../basic/BurgerMenuItem'
import BurgerMenu from '../basic/BurgerMenu'
const Menu = () => {
    const generateDivs = () => {
        const divs = []
        divs.push(<BurgerMenuItem
            key={1}
            icon={<i className="fa-solid fa-plus"></i>}
            title='new game'
            onClick={() => {}} />)
        divs.push(<BurgerMenuItem
            key={2}
            icon={<i className="fa-solid fa-gear"></i>}
            title='options'
            onClick={() => {}} />)
        divs.push(<BurgerMenuItem
            key={3}
            icon={<i className="fa-solid fa-plus"></i>}
            title='new game'
            onClick={() => {}} />)
        divs.push(<BurgerMenuItem
            key={4}
            icon={<i className="fa-solid fa-plus"></i>}
            title='new game'
            onClick={() => {}} />)
            
        return divs;
    }

    return (
        <BurgerMenu divs={(generateDivs())} name='menu' />
    )
}

export default Menu