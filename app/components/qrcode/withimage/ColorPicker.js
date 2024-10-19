const ColorPicker = ({ colors, onChange }) => {
  const handleColorChange = (key, value) => {
    onChange({
      ...colors,
      [key]: value,
    });
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700">Select Colors for Position and Pixel:</label>
      <div className="flex space-x-4">
        <div>
          <label>Position Marker Color:</label>
          <input
            type="color"
            value={colors.position}
            onChange={(e) => handleColorChange("position", e.target.value)}
          />
        </div>
        <div>
          <label>Pixel Color:</label>
          <input
            type="color"
            value={colors.pixel}
            onChange={(e) => handleColorChange("pixel", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
