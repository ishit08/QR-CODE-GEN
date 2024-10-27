// components/qrcode/Basic.js
import React from 'react';
import { Input } from '../../../components/ui/input'; // Adjust path as necessary
import QRStyleSelector from '../../ui/QRStyleSelector'; // Adjust path as necessary
import ColorPicker from '../../ui/ColorPicker'; // Adjust path as necessary
import Slider from '../../ui/Slider';
const Basic = ({ text, qrStyle, colors, size, qrCode, setQrCode, setQrStyle, setColors, setSize, setText }) => {
  return (
          <div className="p-4 space-y-4">
        <Input
          type="text"
          placeholder="Enter text or URL"
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
  );
};

export default Basic;
