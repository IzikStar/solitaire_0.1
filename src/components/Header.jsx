import React from 'react';
import { Link } from 'react-router-dom';
import Button from './basic/Button';
import Menu from './game/Menu';
import Fancy3Buttons from './basic/Fancy3Buttons';

const Header = (props) => {
  return (
    <header className={`container-fluid ${props.bgClass} shadow-lg position-fixed`}>
      <div>
        <nav className=' py-1 d-flex justify-content-center flex-wrap mr-4'>
          <div className='w-[5%]'>
            <img src='images\logo.jpeg' alt='Logo' className='w-full' />
          </div>
          <Fancy3Buttons text1='restart' text2='pause' text3='hint' />
          <Button name='undo move' />
          <Button name='deal new' />
          <Menu />
          {/* 
          <Link className='mx-3 text-2xl text-decoration-none fw-bold text-white transition-colors duration-300 hover:text-yellow-300' to="/SearchGallery">גלריית חיפוש</Link>
          <Link to="/" className='mx-3 text-2xl text-decoration-none fw-bold text-white transition-colors duration-300 hover:text-yellow-300'>בית</Link> */}
        </nav>
      </div>
    </header>
  );
}

export default Header;