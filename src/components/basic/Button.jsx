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
        <span className='flex items-center justify-center'>
          <i className={`mr-2 ${checkIcon(icon)}`}></i>
          {text}
        </span>
      );
    } else {
      return null;
    }
  };

  const buttonStyle = `relative inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-full text-white transition-transform transform-gpu duration-300 ease-in-out ${
    props.icon && !props.text ? 'w-12 h-12' : 'min-w-[150px]'
  }`;

  return (
    <button
      onClick={props.onClick}
      className={`${buttonStyle} bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      style={{ minWidth: props.icon ? '3rem' : 'auto' }}
    >
      <span className='absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 opacity-30 rounded-full transform scale-0 hover:scale-100 transition-transform duration-300 ease-in-out'></span>
      <span className='relative z-10'>
        {generateContent(props.text, props.icon)}
      </span>
    </button>
  );
};

export default Button;
