// src/components/qrcode/Main.js
import React, { useState, useEffect } from 'react';
import QRLayout from '../common/QRLayout';
import Basic from './basic';
import BasicNative from './BasicNative';
import { Checkbox } from '../../ui/checkbox';
import {
  handleGenerate,
  handleReset,
  handlePrint,
  handleDownload
} from '../../../utility/qrcode/handleQrFunctions';

const Main = () => {
  // State Variables
  const [text, setText] = useState("");
  const [placeholder, setPlaceholder] = useState("Enter text or URL");
  const [className, setClassName] = useState("p-2 mb-4 border rounded w-full");
  const [style, setStyle] = useState({ width: "300px" });
  const [size, setSize] = useState(300);
  const [useNative, setUseNative] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [hasQRCodes, setHasQRCodes] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [basicQrStyle, setBasicQrStyle] = useState({
    dotsType: "square",
    cornersSquareType: "square",
    cornersDotType: "square",
  });
  const [basicColors, setBasicColors] = useState({
    dark: "#000000",
    light: "#ffffff",
    position: '#000000', // Default color for position marker
    pixel: '#000000',    // Default color for pixel
  });

   const [bnColors, setBnColors] = useState({
    qr: '#000000',         // Default color for QR
    background: '#FFFFFF',  // Default color for background
    secondary: '#FF5733',   // Default color for secondary
    third: '#C70039',       // Default color for third
    fourth: '#8E44AD',      // Default color for fourth
  });

  const [bnQrStyle, setBnQrStyle] = useState("none");
  const [image, setImage] = useState(null);
  const [showNativeWarning, setShowNativeWarning] = useState(false); // For showing warning message

  // Handlers
  const handleGenerateClick = (e) => {
    handleGenerate({
      e,
      text,
      setInputError,
      setErrorMessage,
      useNative,
      size,
      basicQrStyle,
      basicColors,
      bnColors,
      bnQrStyle,
      setQrCode,
      setHasQRCodes,
      image
    });
  };

  const handleResetClick = () => {
    handleReset({
      setText,
      setPlaceholder,
      setClassName,
      setStyle,
      setSize,
      setQrCode,
      setInputError,
      setErrorMessage,
      setHasQRCodes,
      setBasicQrStyle,
      setBasicColors,
      setBnQrStyle,
      setImage,
      setBnColors
    });
  };
 useEffect(() => {
    // Setting default colors on mount only if `bnColors` hasn't been set before
    setBnColors((prevColors) => ({
      ...prevColors,
      qr: prevColors.qr || '#000000',
      background: prevColors.background || '#FFFFFF',
      secondary: prevColors.secondary || '#FF5733',
      third: prevColors.third || '#C70039',
      fourth: prevColors.fourth || '#8E44AD',
    }));
  }, []);
  // Load checkbox state from local storage on component mount
  useEffect(() => {
    const savedUseNative = JSON.parse(localStorage.getItem('useNative')) || false;
    setUseNative(savedUseNative);
  }, []);

  // Save checkbox state to local storage
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setUseNative(isChecked);
    localStorage.setItem('useNative', JSON.stringify(isChecked));

    // If checked, show warning to user
    if (isChecked) {
      setShowNativeWarning(true);
    } else {
      setShowNativeWarning(false);
    }
  };

  return (
    <div>
      <QRLayout
        title="Create QR Code"
        onPrint={() => handlePrint(qrCode)}
        onDownload={() => handleDownload(qrCode)}
        hasQRCodes={hasQRCodes}
        onReset={handleResetClick}
        onGenerate={handleGenerateClick}
        qrCode={qrCode}
      >
        <div className="flex justify-start mb-4">
          <Checkbox
            id="use-alternate-library"
            checked={useNative}
            onChange={handleCheckboxChange}
          >
            Need QR In Native Language?
          </Checkbox>
        </div>

        {/* Warning Message if user checked the box */}
        {showNativeWarning && (
          <div className="text-yellow-600 mb-4 text-center">
            To revert to the previous styling options, please uncheck the "Need QR In Native Language?" checkbox.
          </div>
        )}

        {/* Render appropriate QR code generation component */}
        {useNative ? (
          <BasicNative
            text={text}
            setText={setText}
            placeholder={placeholder}
            setPlaceholder={setPlaceholder}
            className={className}
            setClassName={setClassName}
            size={size}
            setSize={setSize}
            bnQrStyle={bnQrStyle}
            setBnQrStyle={setBnQrStyle}
            bnColors={bnColors}
            setBnColors={setBnColors}
          />
        ) : (
          <Basic
            text={text}
            setText={setText}
            placeholder={placeholder}
            setPlaceholder={setPlaceholder}
            className={className}
            setClassName={setClassName}
            style={style}
            setStyle={setStyle}
            size={size}
            setSize={setSize}
            qrStyle={basicQrStyle}
            setQrStyle={setBasicQrStyle}
            colors={basicColors}
            setColors={setBasicColors}
            setQrCode={setQrCode}
            setImage={setImage}
          />
        )}

        {inputError && <div className="text-red-500 mt-2">{errorMessage}</div>}
      </QRLayout>
    </div>
  );
};

export default Main;
