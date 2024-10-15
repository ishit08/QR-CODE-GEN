export default function GenerateButton({ generateQRCode }) {
    return (
      <button onClick={generateQRCode} className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
        Generate QR Code
      </button>
    );
  }
  