const QRStyleSelector = ({ value, onChange }) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700">QR Code Style:</label>
        <select
          value={value.dotsType}
          onChange={(e) => onChange({ ...value, dotsType: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="square">Square</option>
          <option value="dots">Dots</option>
          <option value="rounded">Rounded</option>
        </select>
  
        {/* Flex container for corner styles */}
        <div className="flex justify-between mt-4">
          {/* Corner Square Style Dropdown */}
          <div className="flex-1 pr-2">
            <label className="block text-gray-700">Corner Square Style:</label>
            <select
              value={value.cornersSquareType}
              onChange={(e) => onChange({ ...value, cornersSquareType: e.target.value })}
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="square">Square</option>
              <option value="extra-rounded">Extra Rounded</option>
            </select>
          </div>
  
          {/* Corner Dot Style Dropdown */}
          <div className="flex-1 pl-2">
            <label className="block text-gray-700">Corner Dot Style:</label>
            <select
              value={value.cornersDotType}
              onChange={(e) => onChange({ ...value, cornersDotType: e.target.value })}
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="square">Square</option>
              <option value="dot">Dot</option>
            </select>
          </div>
        </div>
      </div>
    );
  };
  
  export default QRStyleSelector;
  