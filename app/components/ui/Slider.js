import React from 'react';

const Slider = ({ label, size, setSize, min = 100, max = 300 }) => {
  return (
    <div className="flex flex-col mt-4">
      <label className="slider-label">{label}: {size}px</label>
      <input
        type="range"
        min={min}
        max={max}
        value={size}
        onChange={(e) => setSize(parseInt(e.target.value))}
        className="w-full h-2 bg-blue-200 rounded-lg appearance-none focus:outline-none"
      />
    </div>
  );
};

export default Slider;
