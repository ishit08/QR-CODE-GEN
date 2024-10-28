export default function QrStyleSelector({ bnQrStyle, setBnQrStyle }) {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-black">Select QR Code Style:</label>
        <select
          value={bnQrStyle}
          onChange={(e) => setBnQrStyle(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="none">None (Normal QR Code)</option>
          <option value="vertical">Vertical Color</option>
          <option value="horizontal">Horizontal Color</option>
          <option value="diagonal">Diagonal Color</option>
          <option value="quad">Quad</option>
          
        </select>
      </div>
    );
  }
  