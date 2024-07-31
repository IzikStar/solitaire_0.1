import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Header title="Home" bgClass="bg-black" textClass="text-yellow-600" />
      <div className="flex flex-col items-center justify-center min-h-screen bg-lime-100">
      </div>
      <Footer />
    </>
  );
}

export default Home;
