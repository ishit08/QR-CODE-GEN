const ColorPicker = ({ colors, onChange }) => {
    const handleColorChange = (key, value) => {
      onChange({
        ...colors,
        [key]: value,
      });
    };
  
    return (
      <div className="mb-4">
        <label className="block text-gray-700">Select Colors:</label>
        <div className="flex space-x-4">
          <div>
            <label>Dark Color:</label>
            <input
              type="color"
              value={colors.dark}
              onChange={(e) => handleColorChange("dark", e.target.value)}
            />
          </div>
          <div>
            <label>Light Color:</label>
            <input
              type="color"
              value={colors.light}
              onChange={(e) => handleColorChange("light", e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default ColorPicker;
  