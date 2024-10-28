// src/components/qrcode/Main.js
import React, { useState } from 'react';
import QRLayout from '../common/QRLayout'; // Adjust path as necessary
import Basic from './Basic'; // Adjust path as necessary
import BasicNative from './BasicNative'; // Adjust path as necessary
import { Checkbox } from '../../ui/checkbox'; // Adjust path as necessary
import { GenerateQRStyle, GenerateQRNative } from '../../../utility/qrcode/qrUtils'; // Adjust path as necessary

const Main = () => {
  // Common State Variables
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
// Separate State for Basic QR Style
  const [basicQrStyle, setBasicQrStyle] = useState({
    dotsType: "square",
    cornersSquareType: "square",
    cornersDotType: "square",
  });

  const [basicColors, setBasicColors] = useState({
    dark: "#000000",
    light: "#ffffff",
  });

  // Separate State for BasicNative QR Style
  const [bnQrStyle, setBnQrStyle] =  useState("none");

  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [thirdColor, setThirdColor] = useState('#cccccc');
  const [fourthColor, setFourthColor] = useState('#888888');

  // Handler to generate QR code
  const handleGenerate = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate input text
    if (!text) {
      setInputError(true);
      setErrorMessage("Please enter a value to generate QR code.");
      return;
    }

    // Clear previous errors if valid
    setInputError(false);
    setErrorMessage("");

    try {
      let qrCodeInstance;
      if (useNative) {
      // Use native QR code generation logic
       const options = {
          width:size,
          errorCorrectionLevel: "H",
          margin: 1,
          scale: 8,
          color: {
            dark: primaryColor, // Use primary color
            light: secondaryColor,
          },
          qrStyle: bnQrStyle, // Use BasicNative QR Style
          thirdColor: thirdColor,
          fourthColor: fourthColor,
        };
        console.log("Native QR Options:", options);
        qrCodeInstance = await GenerateQRNative(text, options); // Generate using native method
       // console.log("Native QR:", qrCodeInstance);
      } else {
        // Use styled QR code generation logic
        const options = {
          width: size,
          height: size,
          data: text,
          dotsOptions: {
            color: basicColors.dark,
            type: basicQrStyle.dotsType || "square",
          },
          backgroundOptions: {
            color: basicColors.light,
          },
          cornersSquareOptions: {
            color: basicColors.dark,
            type: basicQrStyle.cornersSquareType || "square",
          },
          cornersDotOptions: {
            color: basicColors.dark,
            type: basicQrStyle.cornersDotType || "square",
          },
        };
        qrCodeInstance = GenerateQRStyle(options); // Generate using styled method
      }
      setQrCode(qrCodeInstance);     
      setHasQRCodes(!!qrCodeInstance);
    } catch (error) {
      console.error("QR Code generation error:", error);
      setInputError(true);
      setErrorMessage("Failed to generate QR code. Please try again.");
    }
  };

  // Handler to reset all fields
  const handleReset = () => {
    setText("");
    setPlaceholder("Enter text or URL");
    setClassName("p-2 mb-4 border rounded w-full");
    setStyle({ width: "300px" });
    setSize(300);
    setQrCode(null);
    setInputError(false);
    setErrorMessage("");
    setHasQRCodes(false);

    // Reset Basic QR Style
    setBasicQrStyle({
      dotsType: "square",
      cornersSquareType: "square",
      cornersDotType: "square",
    });
    setBasicColors({
      dark: "#000000",
      light: "#ffffff",
    });

    // Reset BasicNative QR Style
    setBnQrStyle({
      bnQrStyle: "none"
    });
    
   
  };

  // Handlers for printing and downloading QR code
  const handlePrint = () => {
    // Implement your print functionality here
    if (qrCode) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print QR Code</title></head><body>');
        if (typeof qrCode === 'string') {
          // If QR code is a data URL
          printWindow.document.write(`<img src="${qrCode}" alt="QR Code" />`);
        } else {
          // If QR code is a DOM element (e.g., Canvas)
          const qrClone = qrCode.cloneNode(true);
          printWindow.document.body.appendChild(qrClone);
        }
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  const handleDownload = () => {
    if (qrCode) {
      if (typeof qrCode === 'string') {
        // If QR code is a data URL
        const link = document.createElement('a');
        link.href = qrCode;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (qrCode instanceof HTMLCanvasElement) {
        // If QR code is a Canvas element
        const link = document.createElement('a');
        link.href = qrCode.toDataURL("image/png");
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };


  
  return (
    <div>
      <QRLayout
        title="Create QR Code"
        onPrint={handlePrint}
        onDownload={handleDownload}
        hasQRCodes={hasQRCodes}
        onReset={handleReset}
        onGenerate={handleGenerate}
        qrCode={qrCode}
      >
        <div className="flex justify-start mb-4">
          <Checkbox
            id="use-alternate-library"
            checked={useNative}
            onChange={(e) => setUseNative(e.target.checked)}
          >
            Use Native QR Code Generator
          </Checkbox>
        </div>

        {/* Render the appropriate QR code generation component */}
        {useNative ? (
          <BasicNative
            // Common Props
            text={text}
            setText={setText}
            placeholder={placeholder}
            setPlaceholder={setPlaceholder}
            className={className}
            setClassName={setClassName}
          
            size={size}
            setSize={setSize}
            // QR Style Props for BasicNative
            bnQrStyle={bnQrStyle}
            setBnQrStyle={setBnQrStyle}
            // Color Props for BasicNative
              primaryColor={primaryColor}
      setPrimaryColor={setPrimaryColor}
      secondaryColor={secondaryColor}
      setSecondaryColor={setSecondaryColor}
      thirdColor={thirdColor}
      setThirdColor={setThirdColor}
      fourthColor={fourthColor}
      setFourthColor={setFourthColor}
          />
        ) : (
          <Basic
            // Common Props
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
            // QR Style Props for Basic
            qrStyle={basicQrStyle}
            setQrStyle={setBasicQrStyle}
            // Color Props for Basic
            colors={basicColors}
            setColors={setBasicColors}
            // QR Code Setter
            setQrCode={setQrCode}
          />
        )}

        {/* Display error message if any */}
        {inputError && (
          <div className="text-red-500 mt-2">
            {errorMessage}
          </div>
        )}
      </QRLayout>
    </div>
  );
};

export default Main;