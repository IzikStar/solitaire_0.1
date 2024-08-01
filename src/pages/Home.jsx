import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Solitaire from '../components/game/Solitaire.jsx';

const Home = () => {
  const backgroundStyle = {
    backgroundImage: `url(/images/backGroundO.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '250vh', // Ensures the background covers the full viewport height
    backgroundColor: '#f0f0f0' // Temporary background color for testing
  };

  return (
    <>
      <Header title="Home" bgClass="bg-black" textClass="text-yellow-600" />
      <div style={backgroundStyle} className="main-content flex flex-col">
        <div className='flex flex-wrap flex-row mt-[114px]'>
          <Solitaire />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
