// components/GenerateButton.js
import React from 'react';

const GenerateButton = ({ onClick }) => (
  <div className="generate-button-wrapper">
    <button onClick={onClick} className="generate-button">
      <span className="generate-button-background">
        <svg className="generate-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </span>
      <span className="generate-button-text">Generate</span>      
    </button>
  </div>
);

export default GenerateButton;
