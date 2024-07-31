import React from 'react';

const Footer = (props) => {
  return (
    <footer className={`bg-gray-600 text-white py-4`}>
      <div className='container d-flex justify-content-between text-right'>

        <div className='flex-1 mx-2'>
          <h2 className='text-xl font-bold'>צור קשר</h2>
          <p className='text-sm'>דוא"ל: contact@fishgallery.com</p>
          <p className='text-sm'>טלפון: 03-1234567</p>
        </div>

        <div className="">
          <div className="row justify-content-around">
            <i className="bi bi-facebook fs-1 col-4"></i>
            <i className="bi bi-whatsapp fs-1 col-4"></i>
            <i className="bi bi-instagram fs-1 col-4"></i>
          </div>
        </div>

        <div className='flex-1 mx-2'>
          <h2 className='text-xl font-bold'>קישורים מהירים</h2>
          <ul className='list-none p-0'>
            <li><a href="/" className='text-sm text-decoration-none text-white hover:text-yellow-300'>בית</a></li>
            <li><a href="/Gallery" className='text-sm text-decoration-none text-white hover:text-yellow-300'>גלריית דגים</a></li>
            <li><a href="/SearchGallery" className='text-sm text-decoration-none text-white hover:text-yellow-300'>חיפוש גלריה</a></li>
            <li><a href="/DangerGallery" className='text-sm text-decoration-none text-white hover:text-yellow-300'>סכנת הכחדה</a></li>
            <li><a href="/Filter" className='text-sm text-decoration-none text-white hover:text-yellow-300'>סינון</a></li>
          </ul>
        </div>
        <div className='flex-1 mx-2'>
          <p className='text-sm'>&copy; 2024 Fish Gallery. כל הזכויות שמורות.</p>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;
