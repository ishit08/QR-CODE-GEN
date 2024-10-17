import { useState } from "react";
import QRCodeDisplay from "./QRCodeDisplay";
import TextInput from "./TextInput";
import QRStyleSelector from "./QRStyleSelector";
import ColorPicker from "./ColorPicker";
import GenerateButton from "./GenerateButton";
import QRUtils from "../../../utility/qrcode/QRUtils";

const QRLayout = () => {
  const [text, setText] = useState("");
  const [qrStyle, setQrStyle] = useState({
    dotsType: "rounded",
    cornersSquareType: "square",
    cornersDotType: "dot"
  });
  const [colors, setColors] = useState({
    dark: "#000000",
    light: "#ffffff",
  });
  const [qrCode, setQrCode] = useState(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);

  const handleGenerate = () => {
    const options = {
      data: text,
      width: parseInt(width),
      height: parseInt(height),
      dotsOptions: {
        color: colors.dark,
        type: qrStyle.dotsType,
      },
      backgroundOptions: {
        color: colors.light,
      },
      cornersSquareOptions: {
        color: colors.dark,
        type: qrStyle.cornersSquareType,
      },
      cornersDotOptions: {
        color: colors.dark,
        type: qrStyle.cornersDotType,
      },
    };

    const qrCodeInstance = QRUtils.createQRCode(options);
    setQrCode(qrCodeInstance);
  };

  const handleReset = () => {
    setText("");
    setQrStyle({
      dotsType: "rounded",
      cornersSquareType: "square",
      cornersDotType: "dot",
    });
    setColors({ dark: "#000000", light: "#ffffff" });
    setWidth(300);
    setHeight(300);
    setQrCode(null);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-blue-100 to-purple-200 rounded-lg shadow-lg p-6">
      <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">QR Code Generator</h2>
        <TextInput value={text} onChange={setText} />

        <div className="mb-4">
          <QRStyleSelector value={qrStyle} onChange={setQrStyle} />
          <ColorPicker colors={colors} onChange={setColors} />
        </div>

        {/* Parallel Width and Height Sliders */}
        <div className="flex justify-between mb-6">
          <div className="flex-1 pr-2">
            <label className="block text-gray-700 font-medium">Width: {width}px</label>
            <input
              type="range"
              min="100"
              max="600"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none focus:outline-none"
              style={{ backgroundSize: `${(width - 100) * (100 / 500)}% 100%` }} // Dynamic background for the slider
            />
          </div>
          <div className="flex-1 pl-2">
            <label className="block text-gray-700 font-medium">Height: {height}px</label>
            <input
              type="range"
              min="100"
              max="600"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none focus:outline-none"
              style={{ backgroundSize: `${(height - 100) * (100 / 500)}% 100%` }} // Dynamic background for the slider
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <GenerateButton onClick={handleGenerate} />
          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-300"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Right section for QR code display */}
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Generated QR Code</h2>
          <div className="transition-transform transform hover:scale-105">
            <QRCodeDisplay qrCode={qrCode} />
          </div>
        </div>
      </div>
      </div>
  );
};

export default QRLayout;
