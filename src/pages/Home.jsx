import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Solitaire from '../components/game/Solitaire.jsx';
import { GameContext } from '../App.jsx';


const Home = () => {
  const { BackGroundImage } = useContext(GameContext)
  const backgroundStyle = {
    backgroundImage: `url(/images/backGrounds/${ BackGroundImage }.jpg)`,
    //backgroundSize: 'cover',
    //backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // minHeight: '2vh', // Ensures the background covers the full viewport height
    backgroundColor: '#f0f0f0' // Temporary background color for testing
  };

  return (
    <>
      <Header title="Home" bgClass="bg-black" textClass="text-yellow-600" />
      <div className='h-[113px]' >
      </div>
      <div style={backgroundStyle} className=" flex flex-col">
        <div className='flex flex-wrap flex-row mt-[50px]'>
          <Solitaire />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
