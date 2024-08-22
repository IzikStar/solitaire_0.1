import { React, useContext } from 'react';
import Button from './basic/Button';
import Menu from './basic/Menu';
import Fancy3Buttons from './basic/Fancy3Buttons';
import { GameContext } from '../App.jsx';
import LoginForm from './LogInForm.jsx';
import StyledBurgerMenu from './basic/StyledBurgerMenu.jsx';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaRocket  } from 'react-icons/fa'; // ייבוא אייקונים



const Header = (props) => {

    const { setSelectedCard, setNumOfClicks, setNumOfNewGame, numOfNewGame, currentGame, setCurrentGame, setNumOfRestarts, setBackGroundImage, setIsWinning } = useContext(GameContext);

    const menuItems = [
        { icon: <FaRocket  />, label: 'New game', onClick: () => fancyButtonFunction() },
        { icon: <FaUser />, label: 'Profile', onClick: () => console.log('Profile clicked') },
        { icon: <FaCog />, label: 'Setting', onClick: () => console.log('Settings clicked') },
        { icon: <FaSignOutAlt />, label: 'Sign out', onClick: () => console.log('Sign out clicked') }
    ];

    const newGame = () => {
        setIsWinning(false)
        setNumOfClicks(0);
        setNumOfNewGame(numOfNewGame + 1);
        setSelectedCard(null);
        console.log('newGame');
    };

    const newBackground = () => {
        setBackGroundImage(prev => (prev + 1) % 10);
    }

    const fancyButtonFunction = () => {
        newGame();
        newBackground();
    }
    const restartGame = () => {
        setIsWinning(false)
        setNumOfRestarts(prev => prev + 1);
    }

    return (
        <header className={`header ${props.bgClass}`}>
            <nav className='navbar'>
                <img src='images/logo.jpeg' alt='Logo' />
                <Fancy3Buttons onClick={fancyButtonFunction}  text='new game' color='#1e9bff' />
                <div className='flex w-[400px] justify-content-between' >
                    <Button icon='undo' onClick={restartGame} />
                    <div className='flex w-[200px] justify-content-evenly'>
                        <Button icon='arrow-left' onClick={() => {setCurrentGame(currentGame.undo()); setIsWinning(false)}} />
                        <Button icon='arrow-right' onClick={() => {setCurrentGame(currentGame.redo()); setIsWinning(false)}} />
                    </div>
                    <Button icon='lightbulb' />
                </div>
                <div className='w-[100px]' >
                    <LoginForm />
                </div>
                <StyledBurgerMenu menuItems={menuItems} className="custom-burger-menu" />
                {/* <Menu /> */}
            </nav>
        </header>
    );
};

export default Header;
