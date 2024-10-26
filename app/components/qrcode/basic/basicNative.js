// components/qrcode/BasicNative.js
import React, { useState } from 'react';
import QRLayout from '../common/QRLayout'; // Adjust path as per your project structure
import { Input } from '../../../components/ui/input';
import QrStyleSelector from "../common/QrStyleSelector";
import ColorPicker from "../common/ColorPicker";
import GenerateButton from "../GenerateButton";
import QRCodeDisplay from "../common/QRCodeDisplay";
import { generateQRCodeCanvas, applyQRStyle } from '../../../utility/qr/comman/qrUtils';

const BasicNative = () => {
  const [text, setText] = useState("");
  const [qrStyle, setQrStyle] = useState("none");
  const [canvasRef, setCanvasRef] = useState(null);
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#ffffff");
  const [thirdColor, setThirdColor] = useState("#ff0000");
  const [fourthColor, setFourthColor] = useState("#0000ff");

  const generateQRCode = async () => {
    const qrCodeElement = document.getElementById("qrcode");
    qrCodeElement.innerHTML = "";

    if (text) {
      const options = {
        errorCorrectionLevel: "H",
        margin: 1,
        scale: 8,
        color: {
          dark: primaryColor,
          light: secondaryColor,
        },
      };

      try {
        // Generate QR code canvas
        const canvas = await generateQRCodeCanvas(text, options);
        qrCodeElement.appendChild(canvas);
        setCanvasRef(canvas);

        // Apply style if needed
        if (qrStyle !== "none") {
          applyQRStyle(canvas, qrStyle, primaryColor, secondaryColor, thirdColor, fourthColor);
        }
      } catch (error) {
        console.error("QR Code generation error:", error);
      }
    } else {
      alert("Please enter some text or URL to generate the QR code.");
    }
  };

  return (
     <QRLayout
      title="Create QR Code"
      onPrint={() => console.log("Print")}
      onDownload={() => console.log("Download")}
      hasQRCodes={!!qrCode}
      onGenerate={handleGenerateClick}
      onReset={handleResetClick}
    >
      {/* Input Fields */}
      <div className="p-4 space-y-4">
        <Input
          type="text"
          placeholder="Enter text or Url"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <QrStyleSelector qrStyle={qrStyle} setQrStyle={setQrStyle} />
        <ColorPicker
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
          secondaryColor={secondaryColor}
          setSecondaryColor={setSecondaryColor}
          thirdColor={thirdColor}
          setThirdColor={setThirdColor}
          fourthColor={fourthColor}
          setFourthColor={setFourthColor}
        />
        <GenerateButton generateQRCode={generateQRCode} />
      </div>

      {/* QR Code Display Section */}
       <div>
        <QRCodeDisplay qrCode={qrCode} />
       </div>
    </QRLayout>
  );
};

export default BasicNative;
