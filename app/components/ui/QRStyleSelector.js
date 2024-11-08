import { useState } from "react"; // Import useState to manage the checkbox state

const QRStyleSelector = ({ value, onChange, onEncryptChange }) => {
  const [isEncrypted, setIsEncrypted] = useState(false); // State to track checkbox

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsEncrypted(checked); // Update the state based on checkbox
    onEncryptChange(checked); // Pass the checkbox value to parent component to handle encryption logic
  };

  return (
    <div>
      <label className="block text-gray-700 mb-2">Select QR Styles:</label>
      <div className="flex gap-4">
        {/* QR Code Dots Style Dropdown */}
        <div className="flex-1">
          <label className="block text-gray-700 mb-1">QR Dot Style:</label>
          <select 
            defaultValue='square' 
            onChange={(e) => onChange({ ...value, dotsType: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="square">&#9724; Square</option>
            <option value="dots">&#10303; Dots</option>
            <option value="rounded">&#11044; Rounded</option>
            <option value="extra-rounded"> &#x25A2; Extra Rounded</option>
            <option value="classy">&#9648; Classy</option>
            <option value="classy-rounded">&#9673; Classy Rounded</option>           
          </select>
        </div>

        {/* Corner Square Style Dropdown */}
        <div className="flex-1">
          <label className="block text-gray-700 mb-1">Corner Style:</label>
          <select 
            defaultValue='none' 
            onChange={(e) => onChange({ ...value, cornersSquareType: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            
            <option value="square">&#9635; Square</option>
            <option value="dot">&#9673; Rounded</option>
            <option value="extra-rounded">&#x25A2; Extra Rounded</option>
          </select>
        </div>

        {/* Corner Dot Style Dropdown */}
        <div className="flex-1">
          <label className="block text-gray-700 mb-1">Corner Inside Style:</label>
          <select 
            defaultValue='none' 
            onChange={(e) => onChange({ ...value, cornersDotType: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
           
            <option value="square">&#9724; Square</option>
             <option value="dot">&#11044; Rounded</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default QRStyleSelector;
