// components/ResetButton.js

import React from 'react';

const ResetButton = ({ onClick }) => (
  <div className="reset-button-wrapper">
    <button onClick={onClick} className="reset-button">
      <span className="reset-button-background">
        <i className="fa-solid fa-rotate-left reset-button-icon"></i>
      </span>
      <span className="reset-button-text">Reset</span>     
    </button>
  </div>
);
export default ResetButton;
