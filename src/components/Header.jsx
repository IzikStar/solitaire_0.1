import { React, useContext } from 'react';
import Button from './basic/Button';
import Menu from './basic/Menu';
import Fancy3Buttons from './basic/Fancy3Buttons';
import { GameContext } from '../App.jsx';

const Header = (props) => {

    const { setSelectedCard, setNumOfClicks, setNumOfNewGame, numOfNewGame } = useContext(GameContext);

    const refreshPage = () => {
        window.location.reload();
    };
    
    const restartGame = () => {
        setNumOfClicks(0);
        setNumOfNewGame(numOfNewGame + 1);
        setSelectedCard(null);
        console.log('restartGame');
    };

    return (
        <header className={`header ${props.bgClass}`}>
            <nav className='navbar'>
                <img src='images/logo.jpeg' alt='Logo' />
                <Fancy3Buttons onClick={restartGame} text='new game' color='#1e9bff' />
                <div className='flex w-[400px] justify-content-between' >
                    <Button icon='undo' onClick={restartGame} />
                    <div className='flex w-[200px] justify-content-evenly'>
                        <Button icon='arrow-left' />
                        <Button icon='arrow-right' />
                    </div>
                    <Button icon='lightbulb' />
                </div>
                <Menu />
            </nav>
        </header>
    );
};

export default Header;
