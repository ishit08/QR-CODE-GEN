// src/components/qrcode/Main.js
import React, { useState } from 'react';
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
  const [nativeColors, setNativeColors] = useState({
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    thirdColor: '#000000', // Default color for position marker
    fourthColor: '#000000',    // Default color for pixel
  });
  const [bnQrStyle, setBnQrStyle] = useState("none");
  const [image, setImage] = useState(null);
  // Handlers
  const handleGenerateClick = (e) => {
    console.log(image);
    handleGenerate({
      e,
      text,
      setInputError,
      setErrorMessage,
      useNative,
      size,
      basicQrStyle,
      basicColors,
      nativeColors,
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
      setImage
    });
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
            onChange={(e) => setUseNative(e.target.checked)}
          >
            Need QR In Native Language?
          </Checkbox>
        </div>

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
            nativeColors={nativeColors}
            setNativeColors={setNativeColors}
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
