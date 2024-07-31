import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Solitaire from '../components/game/Solitaire';

const Home = () => {
  const backgroundStyle = {
    backgroundImage: `url(/images/backGroundO.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '250vh', // Ensures the background covers the full viewport height
    // maxWidth: '150vh', // Ensures the background covers the full viewport height
    backgroundColor: '#f0f0f0' // צבע רקע זמני לצורך בדיקה
  };

  return (
    <>
      <Header title="Home" bgClass="bg-black" textClass="text-yellow-600" />
      <div style={backgroundStyle} className="flex flex-col">
        <div className='flex flex-wrap flex-row mt-[200px]'>
          <Solitaire/>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
