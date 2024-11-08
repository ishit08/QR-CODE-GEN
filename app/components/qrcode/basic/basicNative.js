// src/components/qrcode/native/BasicNative.js
import React from 'react';
import Slider from '../../ui/Slider'; // Adjust path as necessary
import ColorPicker from '../native/ColorPicker'; // Adjust path as necessary
import QrStyleSelector from '../native/QrStyleSelector'; // Adjust path as necessary
import { Input } from '../../../components/ui/input';

const BasicNative = ({
  text,
  setText,
  bnQrStyle,
  setBnQrStyle,
  bnColors,          // Updated to accept bnColors as an object
  setBnColors,       // Function to update bnColors
  size,
  setSize,
}) => {
  return (
    <div className="p-4 space-y-4">
      {/* Text Input */}
      <Input 
        type="text" 
        placeholder="Enter text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        required
        className="input-field"
      />
      
      {/* QR Style and Color Picker in Single Line */}
      <div className="flex space-x-4 items-center">
        {/* QR Style Selector */}
        <QrStyleSelector 
          bnQrStyle={bnQrStyle} 
          setBnQrStyle={setBnQrStyle}  
        />
        
        {/* Color Pickers */}
        <ColorPicker 
          bnColors={bnColors} 
          setBnColors={setBnColors}
          bnQrStyle={bnQrStyle}
        />
      </div>

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
