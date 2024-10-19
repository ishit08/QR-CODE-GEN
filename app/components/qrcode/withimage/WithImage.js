import React, { useState } from "react";
import TextInput from "../basic/TextInput";
import GenerateButton from "../basic/GenerateButton";
import QRCodeDisplay from "../basic/QRCodeDisplay";
import QRUtils from "../../../utility/qrcode/QRUtils";
import ColorPicker from "./ColorPicker";
import PresetQRCode from "./PresetQRCode"; // Importing the PresetQRCode component

const WithImage = () => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [colors, setColors] = useState({ position: "#316FF6", pixel: "#000000" });
  const [cornerStyle, setCornerStyle] = useState("extra-rounded");
  const [cornerDotStyle, setCornerDotStyle] = useState("dot");
  const [dotStyle, setDotStyle] = useState("rounded");

  // Function to handle preset QR code click
  const handlePresetClick = (presetOptions) => {
    setColors({ position: presetOptions.position, pixel: presetOptions.pixel });
    setCornerStyle(presetOptions.cornerStyle);
    setCornerDotStyle(presetOptions.cornerDotStyle);
    setDotStyle(presetOptions.dotStyle);
    setImage(presetOptions.image);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    const combinedData = `${text}\n${url}\n${location}`.trim();

    const options = {
      data: combinedData,
      width: 300,
      height: 300,
      image: image,
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10,
        imageSize: 0.4,
        hideBackgroundDots: true,
        backgroundOpacity: 0.8,
      },
      dotsOptions: {
        color: colors.pixel,
        type: dotStyle,
      },
      cornersSquareOptions: {
        color: colors.position,
        type: cornerStyle,
      },
      cornersDotOptions: {
        color: colors.position,
        type: cornerDotStyle,
      },
    };

    const qrCodeInstance = QRUtils.createQRCode(options);
    setQrCode(qrCodeInstance);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-green-100 to-blue-200 rounded-lg shadow-lg p-6">
      <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">QR Code Generator with Image</h2>

        <TextInput value={text} onChange={setText} />
        <TextInput value={url} onChange={setUrl} />

        <div className="mb-4">
          <label className="block text-gray-700">Google Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Add Preset QR Code below the image upload */}
        <PresetQRCode onPresetClick={handlePresetClick} />

        <ColorPicker colors={colors} onChange={setColors} />

        <div className="flex justify-between mt-4 space-x-4">
          <div className="mb-4">
            <label className="block text-gray-700">Corner Style:</label>
            <select
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={cornerStyle}
              onChange={(e) => setCornerStyle(e.target.value)}
            >
              <option value="extra-rounded">Extra Rounded</option>
              <option value="square">Square</option>
              <option value="dot">Dot</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Corner Dot Style:</label>
            <select
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={cornerDotStyle}
              onChange={(e) => setCornerDotStyle(e.target.value)}
            >
              <option value="dot">Dot</option>
              <option value="square">Square</option>
              <option value="extra-rounded">Extra Rounded</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Dot Style:</label>
            <select
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dotStyle}
              onChange={(e) => setDotStyle(e.target.value)}
            >
              <option value="rounded">Rounded</option>
              <option value="dots">Dots</option>
              <option value="square">Square</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <GenerateButton onClick={handleGenerate} />
        </div>
      </div>

      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Generated QR Code</h2>
          <QRCodeDisplay qrCode={qrCode} />
        </div>
      </div>
    </div>
  );
};

export default WithImage;
