// components/qrcode/Basic.js
import React, { useState } from 'react';
import QRLayout from '../QRLayout'; // Adjust path as per your project structure
import QRCodeDisplay from '../QRCodeDisplay';
import { Input } from '../../../components/ui/input';
import QRStyleSelector from '../QRStyleSelector';
import ColorPicker from '../ColorPicker';
import { handleGenerate, handleReset } from '../../../utility/qrcode/handleQrFunctions';

const Basic = () => {
  const [text, setText] = useState("");
  const [qrStyle, setQrStyle] = useState({
    dotsType: "rounded",
    cornersSquareType: "square",
    cornersDotType: "dot",
  });
  const [colors, setColors] = useState({
    dark: "#000000",
    light: "#ffffff",
  });
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [qrCode, setQrCode] = useState(null);

  const handleGenerateClick = () => {
    handleGenerate({
      data: text,
      width,
      height,
      dotsType: qrStyle.dotsType,
      darkColor: colors.dark,
      lightColor: colors.light,
      cornersSquareType: qrStyle.cornersSquareType,
      cornersDotType: qrStyle.cornersDotType,
      setQrCode,
    });
  };

  const handleResetClick = () => {
    handleReset({
      setText,
      setQrStyle,
      setColors,
      setWidth,
      setHeight,
      setQrCode,
    });
  };

  return (
    <QRLayout
      title="Create QR Code"
      onGenerate={handleGenerateClick}
      onReset={handleResetClick}
      onPrint={() => console.log("Print")}
      onDownload={() => console.log("Download")}
      hasQRCodes={!!qrCode}
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
        </div>
        <div className="flex justify-between mt-6">
          <GenerateButton onClick={() => handleGenerate({
            data: text,
            width,
            height,
            dotsType: qrStyle.dotsType,
            darkColor: colors.dark,
            lightColor: colors.light,
            cornersSquareType: qrStyle.cornersSquareType,
            cornersDotType: qrStyle.cornersDotType,
            setQrCode
          })} />
          <button onClick={() => handleReset({
            setText,
            setQrStyle,
            setColors,
            setWidth,
            setHeight,
            setQrCode
          })} className="reset-button">
            Reset
          </button>
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