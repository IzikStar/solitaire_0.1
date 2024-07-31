import React from 'react';

const Button = (props) => {
  // פונקציה לבדוק איזה אייקון להוסיף
  const checkIcon = (icon) => {
    return `fas fa-${icon}`;
  };

  // פונקציה ליצירת תוכן הכפתור
  const generateContent = (text, icon) => {
    if (icon && !text) {
      return (
        <i className={`text-white ${checkIcon(icon)}`}></i>
      );
    } else if (!icon && text) {
      return (
        <span className='text-white'>{text}</span>
      );
    } else if (icon && text) {
      return (
        <span className='flex items-center space-x-3'>
          <span>{text}</span>
          <i className={`text-white ${checkIcon(icon)}`}></i>
        </span>
      );
    } else {
      return null;
    }
  };

  const buttonStyle = `relative inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white transition-transform transform-gpu duration-300 ease-in-out shadow-lg hover:shadow-2xl ${
    props.icon && !props.text ? 'w-16 h-16' : 'min-w-[180px]'
  }`;

  return (
    <button
      onClick={props.onClick}
      className={`${buttonStyle} bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 active:scale-95`}
      style={{ minWidth: props.icon ? '4rem' : 'auto' }}
    >
      <span className='absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 opacity-30 rounded-full transform scale-0 hover:scale-100 transition-transform duration-500 ease-in-out'></span>
      <span className='relative z-10'>
        {generateContent(props.text, props.icon)}
      </span>
    </button>
  );
};

export default Button;
