import { useState } from "react"; // Import useState to manage the checkbox state

const QRStyleSelector = ({ value, onChange, onEncryptChange }) => {
  const [isEncrypted, setIsEncrypted] = useState(false); // State to track checkbox

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsEncrypted(checked); // Update the state based on checkbox
    onEncryptChange(checked); // Pass the checkbox value to parent component to handle encryption logic
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">QR Code Style:</label>
      <div className="flex gap-4">
        {/* QR Code Dots Style Dropdown */}
        <div className="flex-1">
          <label className="block text-gray-700 mb-1">Dots Style:</label>
          <select 
            defaultValue='square' 
            onChange={(e) => onChange({ ...value, dotsType: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="square">&#9724; Square</option>
            <option value="dots">&#11044; Dots</option>
            <option value="rounded">&#x25A2; Extra Rounded</option>
          </select>
        </div>

        {/* Corner Square Style Dropdown */}
        <div className="flex-1">
          <label className="block text-gray-700 mb-1">Corner Square Style:</label>
          <select 
            defaultValue='square' 
            onChange={(e) => onChange({ ...value, cornersSquareType: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="square">&#9724; Square</option>
            <option value="extra-rounded">&#x25A2; Extra Rounded</option>
          </select>
        </div>

        {/* Corner Dot Style Dropdown */}
        <div className="flex-1">
          <label className="block text-gray-700 mb-1">Corner Dot Style:</label>
          <select 
            defaultValue='square' 
            onChange={(e) => onChange({ ...value, cornersDotType: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="square">&#9724; Square</option>
            <option value="dot">&#11044; Dot</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default QRStyleSelector;
