// components/qrcode/Basic.js
import React, { useState } from 'react';
import QRLayout from '../common/QRLayout'; // Adjust path as per your project structure
import QRCodeDisplay from '../common/QRCodeDisplay';
import { Input } from '../../../components/ui/input';
import QRStyleSelector from '../QRStyleSelector';
import ColorPicker from '../ColorPicker';
import { handleGenerate, handleReset } from '../../../utility/qrcode/handleQrFunctions';


const Basic = () => {
  const [text, setText] = useState("");
  const [qrStyle, setQrStyle] = useState({
    dotsType: "", // Default to empty to ensure user selection is needed
    cornersSquareType: "",
    cornersDotType: "",
  });
  const [colors, setColors] = useState({
    dark: "#000000",
    light: "#ffffff",
  });
  const [size, setSize] = useState(300);
  const [qrCode, setQrCode] = useState(null);

  const handleGenerateClick = () => {
    console.log("Generating QR code with:", {
      data: text,
      size,
      dotsType: qrStyle.dotsType,
      darkColor: colors.dark,
      lightColor: colors.light,
      cornersSquareType: qrStyle.cornersSquareType,
      cornersDotType: qrStyle.cornersDotType,
    });

    handleGenerate({
      data: text,
      size,
      dotsType: qrStyle.dotsType,
      darkColor: colors.dark,
      lightColor: colors.light,
      cornersSquareType: qrStyle.cornersSquareType,
      cornersDotType: qrStyle.cornersDotType,
      setQrCode,
    });
  };

  const handleResetClick = () => {
    console.log("Resetting QR code state");
    handleReset({
      setText,
      setQrStyle,
      setColors,
      setSize,
      setQrCode,
    });
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
      <div className="p-4 space-y-4">
        <Input
          type="text"
          placeholder="Enter text or Url"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <QRStyleSelector value={qrStyle} onChange={setQrStyle} />
        <ColorPicker colors={colors} onChange={setColors} />
        <div className="flex flex-col mt-4">
          <label className="slider-label">Size: {size}px</label>
          <input
            type="range"
            min="100"
            max="300"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none focus:outline-none"
          />
        </div>
      </div>
      {/* QR Code display section */}
      <div>
        <QRCodeDisplay qrCode={qrCode} />
      </div>
    </QRLayout>
  );
};

export default Basic;
