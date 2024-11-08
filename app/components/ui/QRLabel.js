"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { FaPalette } from 'react-icons/fa';
import "../../styles/input.css";
import "../../styles/ColorPicker.css";
import { Input } from '../../components/ui/input'; // Adjust the import path as necessary

export default function QRLabel({
  orgText,
  setOrgText,
  textColor,
  setTextColor,
  bgColor,
  setBgColor,
  fontSize,
  setFontSize,
  fontStyle,
  setFontStyle,
  bgStyle,
  setBgStyle,
  gradientColors,
  setGradientColors,
}) {
  const [lineCount, setLineCount] = useState(1);

  // Refs for color inputs
  const textColorInputRef = useRef(null);
  const bgColorInputRef = useRef(null);
  const gradientColor1InputRef = useRef(null);
  const gradientColor2InputRef = useRef(null);

  // State for hover effects
  const [iconHoverTextColor, setIconHoverTextColor] = useState(null);
  const [iconHoverBgColor, setIconHoverBgColor] = useState(null);
  const [iconHoverGradientColor1, setIconHoverGradientColor1] = useState(null);
  const [iconHoverGradientColor2, setIconHoverGradientColor2] = useState(null);

  // Functions to handle color icon clicks
  const handleTextColorIconClick = () => {
    textColorInputRef.current.click();
  };

  const handleBgColorIconClick = () => {
    bgColorInputRef.current.click();
  };

  const handleGradientColor1IconClick = () => {
    gradientColor1InputRef.current.click();
  };

  const handleGradientColor2IconClick = () => {
    gradientColor2InputRef.current.click();
  };

  // Functions to handle color changes
  const handleTextColorChange = (e) => {
    setTextColor(e.target.value);
  };

  const handleBgColorChange = (e) => {
    setBgColor(e.target.value);
  };

  const handleGradientColorChange = (index, value) => {
    const newColors = [...gradientColors];
    newColors[index] = value;
    setGradientColors(newColors);
  };

  // Function to render label background style
  const renderLabelStyle = () => {
    switch (bgStyle) {
      case "vertical":
        return `linear-gradient(to bottom, ${gradientColors.join(", ")})`;
      case "horizontal":
        return `linear-gradient(to right, ${gradientColors.join(", ")})`;
      case "diagonal-lr":
        return `linear-gradient(to bottom right, ${gradientColors.join(", ")})`;
      case "diagonal-rl":
        return `linear-gradient(to top right, ${gradientColors.join(", ")})`;
      case "gradient":
        return `linear-gradient(${gradientColors.join(", ")})`;
      default:
        return bgColor;
    }
  };

  return (
    <div>
      {/* Text Input using Input component */}
      <Input
        type="text"
        value={orgText}
        onChange={(e) => setOrgText(e.target.value)}
        placeholder="Enter QR Label"
        label="orgText"
        rows={lineCount}
        style={{
          fontSize: `${fontSize}px`,
          fontStyle: fontStyle,
          color: textColor,
          background: renderLabelStyle(),
        }}
        className="p-2 mb-4 w-full"
      />

      {/* Color Pickers */}
      <div className="color-picker-container">
        <label className="block text-gray-700">Select Colors:</label>
        <div className="color-picker-grid">
          {/* Text Color Picker */}
          <div className="color-picker-item">
            <label className="text-lg font-semibold text-gray-700">Text Color:</label>
            <FaPalette
              onClick={handleTextColorIconClick}
              className="color-icon"
              style={{ color: iconHoverTextColor || textColor }}
              onMouseEnter={() => setIconHoverTextColor('#4A90E2')}
              onMouseLeave={() => setIconHoverTextColor(null)}
            />
            <input
              type="color"
              ref={textColorInputRef}
              value={textColor}
              onChange={handleTextColorChange}
              className="color-input"
            />
          </div>

          {/* Background Color Picker */}
          {bgStyle === 'solid' && (
            <div className="color-picker-item">
              <label className="text-lg font-semibold text-gray-700">Background Color:</label>
              <FaPalette
                onClick={handleBgColorIconClick}
                className="color-icon"
                style={{ color: iconHoverBgColor || bgColor }}
                onMouseEnter={() => setIconHoverBgColor('#4A90E2')}
                onMouseLeave={() => setIconHoverBgColor(null)}
              />
              <input
                type="color"
                ref={bgColorInputRef}
                value={bgColor}
                onChange={handleBgColorChange}
                className="color-input"
              />
            </div>
          )}

          {/* Gradient Color Pickers */}
          {["vertical", "horizontal", "diagonal-lr", "diagonal-rl", "gradient"].includes(bgStyle) && (
            <>
              <div className="color-picker-item">
                <label className="text-lg font-semibold text-gray-700">Color 1:</label>
                <FaPalette
                  onClick={handleGradientColor1IconClick}
                  className="color-icon"
                  style={{ color: iconHoverGradientColor1 || gradientColors[0] }}
                  onMouseEnter={() => setIconHoverGradientColor1('#4A90E2')}
                  onMouseLeave={() => setIconHoverGradientColor1(null)}
                />
                <input
                  type="color"
                  ref={gradientColor1InputRef}
                  value={gradientColors[0]}
                  onChange={(e) => handleGradientColorChange(0, e.target.value)}
                  className="color-input"
                />
              </div>
              <div className="color-picker-item">
                <label className="text-lg font-semibold text-gray-700">Color 2:</label>
                <FaPalette
                  onClick={handleGradientColor2IconClick}
                  className="color-icon"
                  style={{ color: iconHoverGradientColor2 || gradientColors[1] }}
                  onMouseEnter={() => setIconHoverGradientColor2('#4A90E2')}
                  onMouseLeave={() => setIconHoverGradientColor2(null)}
                />
                <input
                  type="color"
                  ref={gradientColor2InputRef}
                  value={gradientColors[1]}
                  onChange={(e) => handleGradientColorChange(1, e.target.value)}
                  className="color-input"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Style Controls */}
      <div className="flex gap-4 mb-4">
        <div>
          <label>Font Size</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="ml-2 w-16"
            min={8}
            max={40}
          />
        </div>
        <div>
          <label>Font Style</label>
          <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)} className="ml-2">
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
            <option value="bold">Bold</option>
          </select>
        </div>
        <div>
          <label>Rows</label>
          <input
            type="number"
            value={lineCount}
            onChange={(e) => setLineCount(e.target.value)}
            className="ml-2 w-12"
            min={1}
            max={3}
          />
        </div>
      </div>

      {/* Background Style Controls */}
      <div className="flex flex-col gap-4 mb-4">
        <label>Background Style</label>
        <select value={bgStyle} onChange={(e) => setBgStyle(e.target.value)} className="mb-2">
          <option value="solid">Solid</option>
          <option value="vertical">Vertical Split</option>
          <option value="horizontal">Horizontal Split</option>
          <option value="diagonal-lr">Diagonal (Left to Right)</option>
          <option value="diagonal-rl">Diagonal (Right to Left)</option>
        </select>
      </div>
    </div>
  );
}
