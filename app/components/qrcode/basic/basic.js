import React from 'react';
import { Input } from '../../../components/ui/input'; // Adjust path as necessary
import QRStyleSelector from '../../ui/QRStyleSelector'; // Adjust path as necessary
import ColorPicker from '../../ui/ColorPicker'; // Adjust path as necessary
import Slider from '../../ui/Slider';

const Basic = ({ text, qrStyle, colors, size, setQrStyle, setColors, setSize, setText, inputError, errorMessage }) => {
  return (
    
    <div className="p-4 space-y-4">
      <Input
        type="text"
        placeholder="Enter text or URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        className="input-field"
      />
    
      
      <QRStyleSelector value={qrStyle} onChange={setQrStyle} />
      <ColorPicker colors={colors} onChange={setColors} />
      
      {/* Using the Slider component */}
      <Slider 
        label="Size" 
        size={size} 
        setSize={setSize} 
        min={100} 
        max={300} 
      />
    </div>  
  );
};

export default Basic;
