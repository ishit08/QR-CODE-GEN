
//downloadqr.js
import jsPDF from "jspdf"; // Import jsPDF library

export default function DownloadQR({ canvasRef }) {
  const downloadQRCode = (format) => {
    if (!canvasRef) {
      alert("QR code not available for download.");
      return;
    }

    const link = document.createElement("a");
    if (format === "png") {
      link.href = canvasRef.toDataURL("image/png");
      link.download = "qrcode.png";
    } else if (format === "jpeg") {
      link.href = canvasRef.toDataURL("image/jpeg");
      link.download = "qrcode.jpeg";
    } else if (format === "pdf") {
      const pdf = new jsPDF();
      const imgData = canvasRef.toDataURL("image/jpeg");
      pdf.addImage(imgData, "JPEG", 10, 10, 80, 80); // Adjust positioning and size as needed
      pdf.save("qrcode.pdf");
    }

    link.click();
  };

  return (
    <div className="flex space-x-2 mt-4">
      <button onClick={() => downloadQRCode("png")} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Download PNG</button>
      <button onClick={() => downloadQRCode("jpeg")} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Download JPEG</button>
      <button onClick={() => downloadQRCode("pdf")} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Download PDF</button>
    </div>
  );
}
