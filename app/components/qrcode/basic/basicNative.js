// src/components/qrcode/native/BasicNative.js
import React from 'react';
import Slider from '../../ui/Slider'; // Adjust path as necessary
import ColorPicker from '../native/ColorPicker'; // Adjust path as necessary
import QrStyleSelector from '../native/QrStyleSelector'; // Adjust path as necessary
import { Input } from '../../../components/ui/input';
import ImageUpload from '../../ui/ImageUpload'; // Adjust path as necessary
import QRLabel from '../../ui/QRLabel'; // Adjust path as necessary

const BasicNative = ({
  text,
  setText,
  bnQrStyle,
  setBnQrStyle,
  bnColors,
  setBnColors,
  size,
  setSize,
  orgText,
  setOrgText,
  textColor,
  setTextColor,
  bgColor,
  setBgColor,
  fontSize,
  setFontSize,
  fontStyle,
  setFontStyle,
  bgStyle,
  setBgStyle,
  gradientColors,
  setGradientColors,
  setBnImage
}) => {
  return (
    <div className="p-4 space-y-4">
      {/* Text Input */}
      <Input 
        type="text" 
        placeholder="Enter text" 
        value={text || ''} 
        onChange={(e) => setText(e.target.value)} 
        required
        className="input-field"
      />
      
      {/* Image Upload */}
      <ImageUpload setImage={setBnImage} />
      
      {/* QR Style and Color Picker in Single Line */}
      <div className="flex space-x-4 items-center">
        {/* QR Style Selector */}
        <QrStyleSelector 
          bnQrStyle={bnQrStyle} 
          setBnQrStyle={setBnQrStyle}  
        />
        
        {/* Color Picker */}
        <ColorPicker 
          bnColors={bnColors} 
          setBnColors={setBnColors}
          bnQrStyle={bnQrStyle}
        />
      </div>

      {/* QR Label Configuration */}
      <QRLabel
        orgText={orgText}
        setOrgText={setOrgText}
        textColor={textColor}
        setTextColor={setTextColor}
        bgColor={bgColor}
        setBgColor={setBgColor}
        fontSize={fontSize}
        setFontSize={setFontSize}
        fontStyle={fontStyle}
        setFontStyle={setFontStyle}
        bgStyle={bgStyle}
        setBgStyle={setBgStyle}
        gradientColors={gradientColors}
        setGradientColors={setGradientColors}
      />

      {/* Slider for Size */}
       <Slider 
            label="Size" 
            size={size} 
            setSize={setSize} 
            min={100} 
            max={300} 
          />
    </div>
  );
};

export default BasicNative;
