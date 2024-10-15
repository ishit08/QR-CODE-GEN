export default function ColorPicker({ primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor, qrStyle }) {
    return (
      qrStyle !== "none" && (
        <div>
          <label className="block text-sm font-medium text-black">Primary Color:</label>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="mt-2 w-10 h-10 cursor-pointer"
          />
          <label className="block text-sm font-medium text-black">Secondary Color:</label>
          <input
            type="color"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
            className="mt-2 w-10 h-10 cursor-pointer"
          />
        </div>
      )
    );
  }
  