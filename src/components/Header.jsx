import { React, useContext } from 'react';
import Button from './basic/Button';
import Menu from './basic/Menu';
import Fancy3Buttons from './basic/Fancy3Buttons';
import { GameContext } from '../App.jsx';
import LoginForm from './LogInForm.jsx';

const Header = (props) => {

    const { setSelectedCard, setNumOfClicks, setNumOfNewGame, numOfNewGame, currentGame, setCurrentGame, setNumOfRestarts } = useContext(GameContext);

    const newGame = () => {
        setNumOfClicks(0);
        setNumOfNewGame(numOfNewGame + 1);
        setSelectedCard(null);
        console.log('newGame');
    };

    const restartGame = () => {
        setNumOfRestarts(prev => prev + 1);
    }


    return (
        <header className={`header ${props.bgClass}`}>
            <nav className='navbar'>
                <img src='images/logo.jpeg' alt='Logo' />
                <Fancy3Buttons onClick={newGame} text='new game' color='#1e9bff' />
                <div className='flex w-[400px] justify-content-between' >
                    <Button icon='undo' onClick={restartGame} />
                    <div className='flex w-[200px] justify-content-evenly'>
                        <Button icon='arrow-left' onClick={() => setCurrentGame(currentGame.undo())} />
                        <Button icon='arrow-right' onClick={() => setCurrentGame(currentGame.redo())} />
                    </div>
                    <Button icon='lightbulb' />
                </div>
                <div className='w-[100px]' >
                    <LoginForm />
                </div>
                <Menu />
            </nav>
        </header>
    );
};

export default Header;
