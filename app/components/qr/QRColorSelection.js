import { useRef, useState } from "react";
import { FaPalette } from "react-icons/fa";

const QRColorSelection = ({ qrColor, setQRColor, bgColor, setBgColor, label }) => {
  const [iconHoverColor, setIconHoverColor] = useState(null); // State to handle icon hover color
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

        {/* FontAwesome palette icon with dynamic background */}
        <FaPalette
          onClick={handleIconClick}
          className="text-5xl cursor-pointer transition-colors duration-300 ease-in-out"
          style={{
            color: iconHoverColor || qrColor,  // Use the hover color if exists, otherwise use the selected color
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            padding: "5px",
          }}
          // Change icon color on hover
          onMouseEnter={() => setIconHoverColor("#4A90E2")}  // Set hover color (blue)
          onMouseLeave={() => setIconHoverColor(null)}  // Reset hover color to null (back to qrColor)
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
