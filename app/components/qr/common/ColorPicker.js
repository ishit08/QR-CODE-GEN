export default function ColorPicker({ primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor, thirdColor, setThirdColor, fourthColor, setFourthColor, qrStyle }) {
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
        
        {qrStyle === "quad" && (
          <>
            <label className="block text-sm font-medium text-black">Third Color:</label>
            <input
              type="color"
              value={thirdColor}
              onChange={(e) => setThirdColor(e.target.value)}
              className="mt-2 w-10 h-10 cursor-pointer"
            />
            <label className="block text-sm font-medium text-black">Fourth Color:</label>
            <input
              type="color"
              value={fourthColor}
              onChange={(e) => setFourthColor(e.target.value)}
              className="mt-2 w-10 h-10 cursor-pointer"
            />
          </>
        )}
      </div>
    )
  );
}
