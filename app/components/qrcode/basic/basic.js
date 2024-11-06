import React from 'react';
import { Input } from '../../../components/ui/input'; // Adjust path as necessary
import QRStyleSelector from '../../ui/QRStyleSelector'; // Adjust path as necessary
import ColorPicker from '../../ui/ColorPicker'; // Adjust path as necessary
import ImageUpload from '../../ui/ImageUpload'; // Adjust path as necessary
import Slider from '../../ui/Slider';
import PresetQRCode from '../../ui/PresetQRCode'; // Adjust path as necessary

const Basic = ({ text, qrStyle, colors, size, setQrStyle, setColors, setSize, setText, setImageFile }) => {
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
  
  
  return (
    <div>
      {/* Main content with two side-by-side divs */}
      <div className="flex space-x-4">
        {/* Left section (80% width) */}
        <div className="flex-1 space-y-4">
          <Input 
            type="text" 
            placeholder="Enter text or link" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            required
            className="input-field"
          />
          <ImageUpload setImageFile={setImageFile} />
          
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

        {/* Right section (20% width) */}
        <div className="w-1/5 px-10">
          {/* Add Preset QR Code below the image upload */}
          <PresetQRCode onPresetClick={handlePresetClick} />
        </div>
      </div>
    </div>  
  );
};

export default Basic;
