import { useRef } from "react";
import { FaPalette } from "react-icons/fa";
 
const QRColorSelection = ({ qrColor, setQRColor, bgColor, setBgColor, label }) => {
  const colorInputRef = useRef(null);
 
  // Function to trigger the color input click
  const handleIconClick = () => {
    colorInputRef.current.click();
  };
 
  return (
    <div className="flex flex-col items-center mt-4 mb-4 p-4 bg-white rounded-lg shadow-md relative">
      <div className="flex items-center space-x-4">
        {/* Label for the icon */}
        <label className="text-lg font-semibold text-gray-700">{label || "Choose QR color"}</label>
 
        {/* FontAwesome palette icon with dynamic color */}
        <FaPalette
          onClick={handleIconClick}
          className="text-5xl cursor-pointer transition-colors duration-300 ease-in-out"
          style={{
            color: qrColor,  // Set icon color to the selected color
          }}
          // Change icon color on hover
          onMouseEnter={(e) => e.target.style.color = "#4A90E2"}  // Blue on hover
          onMouseLeave={(e) => e.target.style.color = qrColor}  // Revert to selected color
        />
      </div>
 
      {/* Hidden color input */}
      <input
        type="color"
        ref={colorInputRef}
        value={qrColor}
        onChange={(e) => setQRColor(e.target.value)}  // Updates QR color
        className="absolute top-0 left-0 opacity-0 w-0 h-0"
        style={{ position: "absolute" }}
      />
    </div>
  );
};
 
export default QRColorSelection;
 