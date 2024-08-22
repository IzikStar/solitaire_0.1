import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; // אייקונים מהספרייה react-icons

// אנימציה לפתיחת תפריט
const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// כפתור הבורגר
const BurgerButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  padding: 10px;
  margin-right: 10px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 5px;

  &:focus {
    outline: none;
  }

  span {
    color: cyan;
    font-size: 16px;
    margin-left: 10px;
  }

  div {
    width: 30px;
    height: 3px;
    background: cyan;
    border-radius: 3px;
    transition: all 0.3s ease;
    position: relative;
  }

  div:nth-child(1) {
    transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    top: ${({ isOpen }) => (isOpen ? '8px' : '0')};
  }

  div:nth-child(2) {
    opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
  }

  div:nth-child(3) {
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    bottom: ${({ isOpen }) => (isOpen ? '8px' : '0')};
  }
`;

// דיב שקוף
const Overlay = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  z-index: 900;
  cursor: default; // קורסור רגיל לדיב השקוף
`;

// תפריט
const Menu = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  width: 250px;
  background: black;
  color: cyan;
  padding: 20px;
  border-radius: 12px;
  z-index: 1000;
  animation: ${slideIn} 0.5s ease forwards;
  box-shadow: 0 4px 15px rgba(0, 255, 255, 0.5); // צל מגניב

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 15px 0;
    cursor: pointer; // קורסור פוינטר על האלמנטים בתוך התפריט
    display: flex;
    align-items: center;
    transition: color 0.3s ease;

    &:hover {
      color: white;
    }

    svg {
      margin-right: 10px; // ריווח בין האייקון לטקסט
    }
  }
`;

const StyledBurgerMenu = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <BurgerButton isOpen={isOpen} onClick={handleToggle}>
        <div />
        <div />
        <div />
        <span>Menu</span> {/* הוספת המילה תפריט */}
      </BurgerButton>

      <Overlay isOpen={isOpen} onClick={handleClose} />

      {isOpen && (
        <Menu>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} onClick={item.onClick}>
                {item.icon}
                {item.label}
              </li>
            ))}
          </ul>
        </Menu>
      )}
    </>
  );
};

export default StyledBurgerMenu;
