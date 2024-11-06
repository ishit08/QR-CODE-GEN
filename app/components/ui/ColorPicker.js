import { useRef, useState } from 'react';
import { FaPalette } from 'react-icons/fa';
import '../../styles/ColorPicker.css'

const ColorPicker = ({ colors, onChange }) => {
  const [iconHoverColorDark, setIconHoverColorDark] = useState(null);
  const [iconHoverColorLight, setIconHoverColorLight] = useState(null);
  const [iconHoverColorPosition, setIconHoverColorPosition] = useState(null);
  const [iconHoverColorPixel, setIconHoverColorPixel] = useState(null);

  // Refs for color inputs
  const darkColorInputRef = useRef(null);
  const lightColorInputRef = useRef(null);
  const positionColorInputRef = useRef(null);
  const pixelColorInputRef = useRef(null);

  // Function to trigger QR code color input click
  const handleDarkColorIconClick = () => {
    darkColorInputRef.current.click();
  };

  // Function to trigger QR background color input click
  const handleLightColorIconClick = () => {
    lightColorInputRef.current.click();
  };

  // Function to trigger position color input click
  const handlePositionColorIconClick = () => {
    positionColorInputRef.current.click();
  };

  // Function to trigger pixel color input click
  const handlePixelColorIconClick = () => {
    pixelColorInputRef.current.click();
  };

  // Handle color changes for QR code and position/pixel
  const handleColorChange = (key, value) => {
    onChange({
      ...colors,     
      [key]: value,
    });
  };

  return (
    <div className="color-picker-container">
      <label className="block text-gray-700">Select Colors for QR and Position/Pixel:</label>
      
      {/* Combined Gradient Container */}
      <div className="color-picker-grid">
        {/* QR Color Picker */}
        <div className="color-picker-item">
          <label className="text-lg font-semibold text-gray-700">QR Dot Color:</label>
          <FaPalette
            onClick={handleDarkColorIconClick}
            className="color-icon"
            style={{
              color: iconHoverColorDark || colors.dark,
            }}
            onMouseEnter={() => setIconHoverColorDark('#4A90E2')}
            onMouseLeave={() => setIconHoverColorDark(null)}
          />
          <input
            type="color"
            ref={darkColorInputRef}
            value={colors.dark}
            onChange={(e) => handleColorChange('dark', e.target.value)}
            className="color-input"
          />
        </div>

        {/* QR Background Color Picker */}
        <div className="color-picker-item">
          <label className="text-lg font-semibold text-gray-100">QR Background Color:</label>
          <FaPalette
            onClick={handleLightColorIconClick}
            className="color-icon"
            style={{
              color: iconHoverColorLight || colors.light,
            }}
            onMouseEnter={() => setIconHoverColorLight('#4A90E2')}
            onMouseLeave={() => setIconHoverColorLight(null)}
          />
          <input
            type="color"
            ref={lightColorInputRef}
            value={colors.light}
            onChange={(e) => handleColorChange('light', e.target.value)}
            className="color-input"
          />
        </div>

        {/* Position Marker Color Picker */}
        <div className="color-picker-item">
          <label className="text-lg font-semibold text-gray-700">Corner Color:</label>
          <FaPalette
            onClick={handlePositionColorIconClick}
            className="color-icon"
            style={{
              color: iconHoverColorPosition || colors.position,
            }}
            onMouseEnter={() => setIconHoverColorPosition('#4A90E2')}
            onMouseLeave={() => setIconHoverColorPosition(null)}
          />
          <input
            type="color"
            ref={positionColorInputRef}
            value={colors.position || '#000000'}
            onChange={(e) => handleColorChange('position', e.target.value)}
            className="color-input"
          />
        </div>

        {/* Pixel Color Picker */}
        <div className="color-picker-item">
          <label className="text-lg font-semibold text-gray-100">Corner Inside Color:</label>
          <FaPalette
            onClick={handlePixelColorIconClick}
            className="color-icon"
            style={{
              color: iconHoverColorPixel || colors.pixel,
            }}
            onMouseEnter={() => setIconHoverColorPixel('#4A90E2')}
            onMouseLeave={() => setIconHoverColorPixel(null)}
          />
          <input
            type="color"
            ref={pixelColorInputRef}
            value={colors.pixel || '#ffffff'}
            onChange={(e) => handleColorChange('pixel', e.target.value)}
            className="color-input"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
