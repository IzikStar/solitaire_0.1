import React from 'react';
import styled, { keyframes } from 'styled-components';

// אנימציות

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(100%); }
  to { opacity: 1; transform: translateY(0); }
`;

// רכיבי עיצוב

const FooterContainer = styled.footer`
  background-color: #000;
  color: #0af;
  padding: 20px;
  text-align: center;
  position: relative;
  bottom: 0;
  width: 100%;
  animation: ${fadeIn} 1s ease-out;
  box-shadow: 0 -2px 10px rgba(0, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterLink = styled.a`
  color: #0af;
  text-decoration: none;
  margin: 5px 10px;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #00ffff;
  }
`;

const FooterLogo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #00ffff;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const FooterText = styled.p`
  margin: 10px 0;
  color: #aaa;
  font-size: 14px;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const SocialIcons = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;

  & > a {
    margin: 0 10px;
    font-size: 20px;
    transition: transform 0.3s ease-in-out;
    color: #0af;

    &:hover {
      transform: scale(1.2);
      color: #00ffff;
    }
  }
`;

// רכיב הפוטר

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>Solitaire_5.0</FooterLogo>
        <div>
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#services">Services</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
        </div>
        <SocialIcons>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">🌐</a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">🐦</a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">📸</a>
        </SocialIcons>
      </FooterContent>
      <FooterText>2024 AssafAndItschak@gmail.kings</FooterText>
      <FooterText>&copy; All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
