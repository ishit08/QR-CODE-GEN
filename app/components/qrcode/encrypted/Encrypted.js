import React, { useState } from 'react';
import QRLayout from '../common/QRLayout';
import QRCodeDisplay from '../common/QRCodeDisplay';
import QRStyleSelector from '../../ui/QRStyleSelector';
import ColorPicker from '../../ui/ColorPicker';
import GenerateButton from '../GenerateButton';
import { handleGenerate, handleReset } from "../../../utility/qrcode/handleQrFunctions";
import Encryptor from '../Encryptor';

const Encrypted = () => {
  const [text, setText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [isEncrypt, setIsEncrypt] = useState(false);
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

  const handleCheckboxChange = (e) => {
    setIsEncrypt(e.target.checked);
  };

  return (
    <QRLayout
      title="Inputs"
      onPrint={() => console.log("Print")}
      onDownload={() => console.log("Download")}
      hasQRCodes={!qrCode}
    >
      <div>
        <div>
          <label className="block text-gray-700 mb-2">Enter Text:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none"
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isEncrypt}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label className="text-gray-700">Encrypt QR Code Content</label>
        </div>

        {isEncrypt && <Encryptor text={text} onEncrypt={setEncryptedText} />}

        <div className="mb-4">
          <QRStyleSelector value={qrStyle} onChange={setQrStyle} />
          <ColorPicker colors={colors} onChange={setColors} />
        </div>
        <div className="flex justify-between mt-6">
          <GenerateButton
            onClick={() => handleGenerate({
              data: isEncrypt ? encryptedText : text,  // Use encrypted text if checked
              width,
              height,
              dotsType: qrStyle.dotsType,
              darkColor: colors.dark,
              lightColor: colors.light,
              cornersSquareType: qrStyle.cornersSquareType,
              cornersDotType: qrStyle.cornersDotType,
              setQrCode
            })}
          />
          <button
            onClick={() => handleReset({
              setText,
              setQrStyle,
              setColors,
              setWidth,
              setHeight,
              setQrCode
            })}
            className="reset-button"
          >
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

export default Encrypted;
