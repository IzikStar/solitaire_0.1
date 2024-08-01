import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

const BurgerMenu = (props) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setOpen(prevState => !prevState);
    }

    const handleClickOutside = (event) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target) &&
            event.target.tagtitle !== 'HTML' &&
            event.target.tagtitle !== 'BODY'
        ) {
            setOpen(false);
        }
    }

    useEffect(() => {
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const generateButton = (title) => {
        return <Button text={title} icon='bars' onClick={toggleMenu} />
    }

    const generateDiv = (divs) => {
        if (open) {
            const buttonElement = document.getElementById('burger-button');
            const rect = buttonElement.getBoundingClientRect();
            const menuWidth = 200; // קבועה לרוחב הדיב
            const menuHeight = 300; // קבועה לגובה הדיב

            let right = rect.right - menuWidth;
            let top = rect.bottom;


            if (top + menuHeight > window.innerHeight) {
                top = rect.top - menuHeight;
            }

            const style = {
                position: 'fixed',
                top: `${top}px`,
                left: `${right}px`,
                width: `${menuWidth}px`,
                height: `${menuHeight}px`,
                backgroundColor: 'white',
                border: '1px solid black',
                zIndex: 1000,
                overflow: 'auto'
            };

            return ReactDOM.createPortal(
                <div ref={menuRef} style={style}>
                    {divs}
                </div>,
                document.body
            );
        } else {
            return null;
        }
    }

    return (
        <>
            <div id="burger-button">
                {generateButton(props.title)}
            </div>
            {generateDiv(props.divs)}
        </>
    );
}

export default BurgerMenu;
