// components/qrcode/Basic.js
import React, { useState } from 'react';
import QRLayout from '../QRLayout'; // Adjust path as per your project structure
import QRCodeDisplay from '../QRCodeDisplay';
import TextInput from '../TextInput';
import QRStyleSelector from '../QRStyleSelector';
import ColorPicker from '../ColorPicker';
import GenerateButton from '../GenerateButton';
import { handleGenerate, handleReset } from "../../../utility/qrcode/handleQrFunctions";

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

  return (
    <QRLayout
      title="Inputs"
      onPrint={() => console.log("Print")}
      onDownload={() => console.log("Download")}
      hasQRCodes={!qrCode}
    >
      {/* Pass child components to QRLayout */}
      <div>
        <TextInput value={text} onChange={setText} />
        <div className="mb-4">
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