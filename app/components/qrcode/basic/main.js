// components/qrcode/Main.js
import React, { useState } from 'react';
import QRLayout from '../common/QRLayout'; // Adjust path as necessary

import Basic from './basic'; // Adjust path as necessary
import BasicNative from './basicNative'; // Adjust path as necessary
import { Checkbox } from '../../ui/checkbox'; // Adjust path as necessary

const Main = () => {
  const [text, setText] = useState("");
  const [qrStyle, setQrStyle] = useState({
    dotsType: "", 
    cornersSquareType: "",
    cornersDotType: "",
  });
  const [colors, setColors] = useState({
    dark: "#000000",
    light: "#ffffff",
  });
  const [size, setSize] = useState(300);
  const [useNative, setUseNative] = useState(false);
  const [qrCode, setQrCode] = useState(null);

  const handleCheckboxChange = (e) => {
    setUseNative(e.target.checked);
  };

  const handleReset = () => {
    setText("");
    setQrStyle({
      dotsType: "",
      cornersSquareType: "",
      cornersDotType: "",
    });
    setColors({
      dark: "#000000",
      light: "#ffffff",
    });
    setSize(300);
    setQrCode(null);
  };

  const handleGenerate = () => {
    // Logic to generate QR code based on current state (text, qrStyle, colors, size)
    // Call your child component's generate function or similar here
  };

  return (
    <div>
      <QRLayout
        title="Create QR Code"
        onPrint={() => console.log("Print")} // Replace with actual print function
        onDownload={() => console.log("Download")} // Replace with actual download function
        hasQRCodes={!!qrCode}
        onReset={handleReset}
        onGenerate={handleGenerate} // Pass generate function to QRLayout
      >
       <div className="flex justify-start mb-4">
        <Checkbox
          id="use-alternate-library"
          checked={useNative}
          onChange={handleCheckboxChange}
        >
          Use Native QR Code Generator
        </Checkbox>
      </div>
      
        {/* Render the appropriate QR code generation component */}
        {useNative ? (
          <BasicNative 
            text={text} 
            qrStyle={qrStyle} 
            colors={colors} 
            size={size} 
            setQrCode={setQrCode} 
          />
        ) : (
          <Basic 
            text={text} 
            qrStyle={qrStyle} 
            colors={colors} 
            size={size} 
            qrCode={qrCode} 
            setQrCode={setQrCode} 
            setQrStyle={setQrStyle} 
            setColors={setColors} 
            setSize={setSize} 
            setText={setText} 
          />
        )}
           {/* QR Code Display integrated into QRLayout */}
    
      </QRLayout>   
    </div>
  );
};

export default Main;
