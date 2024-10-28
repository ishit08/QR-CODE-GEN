// src/components/qrcode/native/BasicNative.js
import React from 'react';
import Slider from '../../ui/Slider'; // Adjust path as necessary
import ColorPicker from '../native/ColorPicker'; // Adjust path as necessary
import QrStyleSelector from '../native/QrStyleSelector'; // Adjust path as necessary

const BasicNative = ({
  text,
  setText,
  placeholder, 
  className,  
  style,
  bnQrStyle,
  setBnQrStyle,
  primaryColor,
  setPrimaryColor,
  secondaryColor,
  setSecondaryColor,
  thirdColor,
  setThirdColor,
  fourthColor,
  setFourthColor,
  size,
  setSize,
}) => {
  return (
    <div className="p-4 space-y-4">
      {/* Text Input */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className={className}
        style={style}
      />

      {/* QR Style Selector */}
      <QrStyleSelector bnQrStyle={bnQrStyle} setBnQrStyle={setBnQrStyle}  />

      {/* Color Pickers */}
      <ColorPicker
        primaryColor={primaryColor}
        setPrimaryColor={setPrimaryColor}
        secondaryColor={secondaryColor}
        setSecondaryColor={setSecondaryColor}
        thirdColor={thirdColor}
        setThirdColor={setThirdColor}
        fourthColor={fourthColor}
        setFourthColor={setFourthColor}
        bnQrStyle={bnQrStyle}
      />

     {/* Slider for Size */}
      <Slider
        label="Size"
        size={size}          // Correct prop name
        setSize={setSize}    // Correct prop name
        min={100}
        max={300}
      />
    </div>
  );
};

export default BasicNative;
