import React from 'react';
import BurgerMenuItem from '../basic/BurgerMenuItem';
import BurgerMenu from '../basic/BurgerMenu';

const Menu = () => {
    const generateDivs = () => {
        const items = [
            { icon: <i className="fa-solid fa-gear"></i>, title: 'New Game', onClick: () => {} },
            { icon: <i className="fa-solid fa-gear"></i>, title: 'Options', onClick: () => {} },
            { icon: <i className="fa-solid fa-plus"></i>, title: 'Add Item', onClick: () => {} },
            { icon: <i className="fa-solid fa-plus"></i>, title: 'Another Item', onClick: () => {} }
        ];

        return items.map((item, index) => (
            <BurgerMenuItem
                key={index}
                icon={item.icon}
                title={item.title}
                onClick={item.onClick}
            />
        ));
    }

    return (
        <BurgerMenu divs={generateDivs()} title='menu' />
    );
}

export default Menu;
