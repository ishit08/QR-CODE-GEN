// components/ColorPicker.js
import { useRef, useState } from 'react';
import { FaPalette } from 'react-icons/fa';

const ColorPicker = ({ colors = { dark: '#000000', light: '#ffffff' }, onChange }) => {
  const [iconHoverColorDark, setIconHoverColorDark] = useState(null);
  const [iconHoverColorLight, setIconHoverColorLight] = useState(null);
  const darkColorInputRef = useRef(null);
  const lightColorInputRef = useRef(null);

  // Function to trigger the QR color input click
  const handleDarkColorIconClick = () => {
    darkColorInputRef.current.click();
  };

  // Function to trigger the background color input click
  const handleLightColorIconClick = () => {
    lightColorInputRef.current.click();
  };

  const handleColorChange = (key, value) => {
    onChange({
      ...colors,
      [key]: value,
    });
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700">
        Select Colors: (Please choose colors carefully to ensure the QR code remains easily scannable.)
      </label>
      <div
  className="flex mt-5 p-5 space-x-8 items-center rounded-lg shadow-md"
  style={{
    background: 'linear-gradient(to right, #e0e0e0, #b0b0b0, #808080, #505050, #303030)'
  }}
>
        {/* QR Color Picker */}
        <div className="flex items-center space-x-4 mt-0">
          <label className="text-lg font-semibold text-gray-700">QR Color:</label>
          <FaPalette
            onClick={handleDarkColorIconClick}
            className="text-4xl cursor-pointer transition-colors duration-300 ease-in-out"
            style={{
              color: iconHoverColorDark || colors.dark,
              padding: '5px',
            }}
            onMouseEnter={() => setIconHoverColorDark('#4A90E2')}
            onMouseLeave={() => setIconHoverColorDark(null)}
          />
          <input
            type="color"
            ref={darkColorInputRef}
            value={colors.dark}
            onChange={(e) => handleColorChange('dark', e.target.value)}
            className="absolute top-0 left-0 opacity-0 w-0 h-0"
            style={{ position: 'absolute' }}
          />
        </div>

        {/* QR Background Color Picker */}
        <div className="flex items-center space-x-4">
          <label className="text-lg font-semibold text-gray-100">QR Background Color:</label>
          <FaPalette
            onClick={handleLightColorIconClick}
            className="text-4xl cursor-pointer transition-colors duration-300 ease-in-out"
            style={{
              color: iconHoverColorLight || colors.light,
              padding: '5px',
            }}
            onMouseEnter={() => setIconHoverColorLight('#4A90E2')}
            onMouseLeave={() => setIconHoverColorLight(null)}
          />
          <input
            type="color"
            ref={lightColorInputRef}
            value={colors.light}
            onChange={(e) => handleColorChange('light', e.target.value)}
            className="absolute top-0 left-0 opacity-0 w-0 h-0"
            style={{ position: 'absolute' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
