import React from 'react';
import { Link } from 'react-router-dom';
import Button from './basic/Button';
import Menu from './game/Menu';
import Fancy3Buttons from './basic/Fancy3Buttons';

const Header = (props) => {
    return (
        <header className={`header ${props.bgClass}`}>
            <nav className='navbar'>
                <img src='images/logo.jpeg' alt='Logo' />
                <Fancy3Buttons text1='restart' text2='pause' text3='hint' />
                {/* <Button name='undo move' />
                <Button name='deal new' /> */}
                <Menu />
            </nav>
        </header>
    );
};

export default Header;
