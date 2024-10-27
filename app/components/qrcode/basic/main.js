import React, { useState } from 'react';
import QRLayout from '../common/QRLayout'; // Adjust path as necessary
import Basic from './Basic'; // Adjust path as necessary
import BasicNative from './BasicNative'; // Adjust path as necessary
import { Checkbox } from '../../ui/checkbox'; // Adjust path as necessary
import { GenerateQRStyle } from '../../../utility/qrcode/qrUtils'; // Adjust path as necessary

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
  const [hasQRCodes, setHasQRCodes] = useState(false);  // State for checking if QR code is generated
  const [inputError, setInputError] = useState(false); // Initialize inputError state
  const [errorMessage, setErrorMessage] = useState("");  // Initialize error message

  const handleGenerate = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Validate input text, return if not valid
    if (!text) {
      setInputError(true);  // Set input error state
      setErrorMessage("Please enter a value to generate QR code.");  // Set error message
      return;
    }
    
    // Clear previous errors if valid
    setInputError(false);  // Clear input error
    setErrorMessage("");    // Clear error message  
    
    // Proceed with generating the QR code
    const options = {
      width: size,
      height: size,
      data: text,
      dotsOptions: {
        color: colors.dark,
        type: qrStyle.dotsType || "square",
      },
      backgroundOptions: {
        color: colors.light,
      },
      cornersSquareOptions: {
        color: colors.dark,
        type: qrStyle.cornersSquareType || "square",
      },
      cornersDotOptions: {
        color: colors.dark,
        type: qrStyle.cornersDotType || "square",
      },
    };

    const qrCodeInstance = GenerateQRStyle(options); // Generate QR code
    setQrCode(qrCodeInstance);  // Store generated QR code in state
    
    if (qrCodeInstance) {
      setHasQRCodes(true); // Enable buttons when QR code is generated
    } else {
      setHasQRCodes(false); // Disable buttons if QR code generation failed
    }
  };

  const handleReset = () => {
    // Clear the input field
    setText("");
    
    // Reset the dropdowns and color picker to default values
    setQrStyle({
      dotsType: "square",  // Reset to default value (square)
      cornersSquareType: "square",  // Reset to default value (square)
      cornersDotType: "square",  // Reset to default value (square)
    });

    // Reset the colors to default values
    setColors({
      dark: "#000000",  // Default dark color
      light: "#ffffff",  // Default light color
    });

    // Reset the size of the QR code to its default value
    setSize(300);

    // Clear any generated QR code
    setQrCode(null);

    // Reset validation state and error messages
    setInputError(false);  // Remove input validation error
    setErrorMessage("");   // Clear error message

    // Reset the state that controls enabling/disabling the print and download buttons
    setHasQRCodes(false);
  };

  return (
    <div>
      <QRLayout
        title="Create QR Code"
        onPrint={() => console.log("Print")} // Replace with actual print function
        onDownload={() => console.log("Download")} // Replace with actual download function
        hasQRCodes={!!qrCode}
        onReset={handleReset}
        onGenerate={handleGenerate} // Form will trigger this on submission
        qrCode={qrCode}
        setQrCode={setQrCode} 
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
      </QRLayout>   
    </div>
  );
};

export default Main;
