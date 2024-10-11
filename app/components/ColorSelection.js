// ColorSelection.js
const ColorSelection = ({ bgColor, setBgColor, textColor, setTextColor }) => {
  return (
    <div className="mt-4 flex gap-6 items-center justify-start">
      {/* Background Color Selector
      <div className="flex flex-col items-center">
        <label htmlFor="bgColor" className="mb-2 text-gray-700">Background Color</label>
        <input
          type="color"
          id="bgColor"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="w-8 h-8 rounded-full border-2 border-gray-300"
        />
      </div> */}

      {/* QR Color Selector */}
      <div className="flex flex-col items-center">
        <label htmlFor="textColor" className="mb-2 text-gray-700">Qr Color</label>
        <input
          type="color"
          id="textColor"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="w-8 h-8 rounded-full border-2 border-gray-300"
        />
      </div>
    </div>
  );
};

export default ColorSelection;
