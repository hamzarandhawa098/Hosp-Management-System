import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, className, onClick,text, type = 'button' }) => {
  return (
    <button
      type={type}
      className={` font-semibold font-poppins  rounded-[8px] ${className}`}
      onClick={onClick}
    >
      {children}
      {text}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
