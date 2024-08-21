import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// אנימציות

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(50); }
`;

// רכיבי עיצוב

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  animation: ${fadeIn} 0.3s ease-out;
  z-index: 1000;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #111;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  width: 300px;
  animation: ${slideIn} 0.5s ease-out;
  z-index: 1001;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid #0af;
  background: #000;
  color: #0af;
  border-radius: 5px;
  outline: none;
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: #00ffff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #0af;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #00ffff;
  }
`;

const LoginButton = styled(Button)`
  margin: 20px;
`;

const LoginForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleModal = () => setIsOpen(!isOpen);

  const handleLogin = (e) => {
    e.preventDefault();
    // כאן תוסיף את הלוגיקה של התחברות שלך
    console.log(`Logging in with username: ${username}, password: ${password}`);
    setIsOpen(false);
  };

  return (
    <>
      <LoginButton onClick={toggleModal}>התחבר</LoginButton>
      <Overlay isOpen={isOpen} onClick={toggleModal} />
      {isOpen && (
        <Modal>
          <form onSubmit={handleLogin}>
            <h2 style={{ color: '#0af', textAlign: 'center' }}>התחברות</h2>
            <Input
              type="text"
              placeholder="שם משתמש או אימייל"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="סיסמא"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">התחבר</Button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default LoginForm;
