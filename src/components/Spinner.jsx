import React from 'react';

const spinnerStyle = {
  display: 'inline-block',
  width: '80px',
  height: '80px',
};

const spinnerDivStyle = {
  boxSizing: 'border-box',
  display: 'block',
  position: 'absolute',
  width: '64px',
  height: '64px',
  margin: '8px',
  border: '8px solid #d32f2f',
  borderRadius: '50%',
  borderColor: '#d32f2f transparent transparent transparent',
  animation: 'lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
};

const spinnerContainerStyle = {
  display: 'inline-block',
  position: 'relative',
  width: '80px',
  height: '80px',
};

const Spinner = () => {
  return (
    <>
      <style>
        {`
          @keyframes lds-ring {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div style={spinnerContainerStyle}>
        <div style={{ ...spinnerDivStyle, animationDelay: '-0.45s' }}></div>
        <div style={{ ...spinnerDivStyle, animationDelay: '-0.3s' }}></div>
        <div style={{ ...spinnerDivStyle, animationDelay: '-0.15s' }}></div>
        <div style={spinnerDivStyle}></div>
      </div>
    </>
  );
};

export default Spinner;
