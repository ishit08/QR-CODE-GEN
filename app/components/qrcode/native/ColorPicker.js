import React, { useRef, useState } from 'react';
import { FaPalette } from 'react-icons/fa';

export default function ColorPicker({ 
  bnColors, 
  setBnColors, 
  bnQrStyle 
}) {

  const [iconHoverColors, setIconHoverColors] = useState({
    qr: null,
    background: null,
    secondary: null,
    third: null,
    fourth: null,
  });

  // Use refs to trigger color input clicks programmatically
  const colorInputs = {
    qr: useRef(null),
    background: useRef(null),
    secondary: useRef(null),
    third: useRef(null),
    fourth: useRef(null),
  };

  const handleIconClick = (key) => {
    colorInputs[key].current.click();
  };

  const handleColorChange = (key, value) => {
    setBnColors((prevColors) => ({
      ...prevColors,
      [key]: value,
    }));
  };

  return (
    <div>
      <div
        className="color-gradient-div"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          background: 'linear-gradient(to right, #D3D3D3, #A9A9A9)',
          borderRadius: '8px',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        {/* QR and Background Colors - Always Visible */}
        {['qr', 'background'].map((colorKey) => (
          <div key={colorKey} className="color-item" style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
            <label>{colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}</label>
            <FaPalette
              onClick={() => handleIconClick(colorKey)}
              className="color-icon"
              style={{
                color: iconHoverColors[colorKey] || bnColors[colorKey],
                marginLeft: '5px',
              }}
              onMouseEnter={() => setIconHoverColors({ ...iconHoverColors, [colorKey]: '#4A90E2' })}
              onMouseLeave={() => setIconHoverColors({ ...iconHoverColors, [colorKey]: null })}
            />
            <input
              type="color"
              ref={colorInputs[colorKey]}
              value={bnColors[colorKey]}
              onChange={(e) => handleColorChange(colorKey, e.target.value)}
              className="color-input"
              style={{ display: 'none' }}
            />
          </div>
        ))}

        {/* Conditional Secondary Color */}
        {(bnQrStyle === 'vertical' || bnQrStyle === 'horizontal' || bnQrStyle === 'diagonal') && (
          <div className="color-item" style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
            <label>Secondary</label>
            <FaPalette
              onClick={() => handleIconClick('secondary')}
              className="color-icon"
              style={{
                color: iconHoverColors.secondary || bnColors.secondary,
                marginLeft: '5px',
              }}
              onMouseEnter={() => setIconHoverColors({ ...iconHoverColors, secondary: '#4A90E2' })}
              onMouseLeave={() => setIconHoverColors({ ...iconHoverColors, secondary: null })}
            />
            <input
              type="color"
              ref={colorInputs.secondary}
              value={bnColors.secondary}
              onChange={(e) => handleColorChange('secondary', e.target.value)}
              className="color-input"
              style={{ display: 'none' }}
            />
          </div>
        )}

        {/* Additional Colors (Third and Fourth) if bnQrStyle is 'quad' */}
        {bnQrStyle === 'quad' && ['third', 'fourth'].map((colorKey) => (
          <div key={colorKey} className="color-item" style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
            <label>{colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}</label>
            <FaPalette
              onClick={() => handleIconClick(colorKey)}
              className="color-icon"
              style={{
                color: iconHoverColors[colorKey] || bnColors[colorKey],
                marginLeft: '5px',
              }}
              onMouseEnter={() => setIconHoverColors({ ...iconHoverColors, [colorKey]: '#4A90E2' })}
              onMouseLeave={() => setIconHoverColors({ ...iconHoverColors, [colorKey]: null })}
            />
            <input
              type="color"
              ref={colorInputs[colorKey]}
              value={bnColors[colorKey]}
              onChange={(e) => handleColorChange(colorKey, e.target.value)}
              className="color-input"
              style={{ display: 'none' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
