// src/components/qrcode/Main.js
import React, { useState, useEffect, useCallback } from 'react';
import QRLayout from '../common/QRLayout';
import Basic from './basic';
import BasicNative from './basicNative';
import { Checkbox } from '../../ui/checkbox';
import {
  handleGenerate,
  handleReset,
  handlePrint,
  handleDownload
} from '../../../utility/qrcode/handleQrFunctions';

const Main = () => {
  // State Variables for QR Code generation
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

  // State Variables for QR Code Styles and Colors
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
  const [orgText, setOrgText] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [bnImage, setBnImage] = useState(null);
  const [showNativeWarning, setShowNativeWarning] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontStyle, setFontStyle] = useState("normal");
  const [bgStyle, setBgStyle] = useState("solid");
  const [gradientColors, setGradientColors] = useState(["#ffffff", "#000000"]);

  const handleGenerateClick = useCallback((e) => {
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
      image,
      orgText,
      textColor,
      bgColor,
      fontSize,
      fontStyle,
      bgStyle,
      gradientColors,
      bnImage
    });
  }, [text, useNative, size, basicQrStyle, basicColors, bnColors, bnQrStyle, image, orgText, textColor, bgColor, fontSize, fontStyle, bgStyle, gradientColors, bnImage]);

  const handleResetClick = useCallback(() => {
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
      setBnColors,
      setOrgText,
      setTextColor,
      setBgColor,
      setBnImage
    });
  }, []);

  useEffect(() => {
    // Load checkbox state from local storage on component mount
    const savedUseNative = JSON.parse(localStorage.getItem('useNative')) || false;
    setUseNative(savedUseNative);
  }, []);

  useEffect(() => {
    // Save checkbox state to local storage whenever it changes
    localStorage.setItem('useNative', JSON.stringify(useNative));
    setShowNativeWarning(useNative);
  }, [useNative]);

  const handleCheckboxChange = (e) => {
    setUseNative(e.target.checked);
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

        {showNativeWarning && (
          <div className="text-yellow-600 mb-4 text-center">
            To revert to the previous styling options, please uncheck the "Need QR In Native Language?" checkbox.
          </div>
        )}

        {useNative ? (
          <BasicNative
            text={text}
            setText={setText}
            size={size}
            setSize={setSize}
            bnQrStyle={bnQrStyle}
            setBnQrStyle={setBnQrStyle}
            bnColors={bnColors}
            setBnColors={setBnColors}
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
            setBnImage={setBnImage}
          />
        ) : (
          <Basic
            text={text}
            setText={setText}
            size={size}
            setSize={setSize}
            qrStyle={basicQrStyle}
            setQrStyle={setBasicQrStyle}
            colors={basicColors}
            setColors={setBasicColors}
            setQrCode={setQrCode}
            image={image}
            setImage={setImage}
          />
        )}

        {inputError && <div className="text-red-500 mt-2">{errorMessage}</div>}
      </QRLayout>
    </div>
  );
};

export default Main;
