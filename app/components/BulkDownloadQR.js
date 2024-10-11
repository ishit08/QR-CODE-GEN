import { useEffect } from "react";
import { jsPDF } from "jspdf";

const BulkDownloadQR = ({ qrCodes, canvasRef }) => {
  console.log("Received QR Codes in BulkDownloadQR:", qrCodes);

  const compressQRCode = (qrCode) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = new Image();

    return new Promise((resolve) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg", 0.7)); // Compress to 70% quality
      };
      img.src = qrCode;

      console.log("Compressing QR Code:", qrCode);
    });
  };

  const downloadAndPrintPDF = async () => {
    if (qrCodes && qrCodes.length > 0) {
      const pdf = new jsPDF("p", "pt", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const qrPerRow = 3;
      const qrPerColumn = 7;
      const qrPerPage = qrPerRow * qrPerColumn;
      const qrSize = 100;
      const marginX = (pageWidth - qrPerRow * qrSize) / (qrPerRow + 1);
      const marginY = 20;

      let x = marginX;
      let y = marginY;
      let count = 0;

      for (let i = 0; i < qrCodes.length; i++) {
        if (count === qrPerPage) {
          pdf.addPage();
          x = marginX;
          y = marginY;
          count = 0;
        }

        try {
          console.log("Adding QR Code to PDF:", qrCodes[i]);

          const imgData = await compressQRCode(qrCodes[i]);
          pdf.addImage(imgData, "JPEG", x, y, qrSize, qrSize);
          count++;
          x += qrSize + marginX;

          if (count % qrPerRow === 0) {
            x = marginX;
            y += qrSize + marginY;
          }
        } catch (error) {
          console.error("Failed to add QR code to PDF:", error);
        }
      }

      console.log("Saving PDF...");
      pdf.save("qr_codes.pdf");

      const pdfBlob = pdf.output("blob");
      const pdfURL = URL.createObjectURL(pdfBlob);
      const printWindow = window.open(pdfURL);
      printWindow.onload = () => {
        printWindow.print();
      };
    } else {
      alert("No QR codes available for download.");
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      console.log("Canvas Reference:", canvasRef.current);
    }
  }, [canvasRef]);

  return (
    <div className="mt-4">
      <button
        onClick={downloadAndPrintPDF}
        className="py-1 px-2 bg-red-500 text-white rounded"
      >
        Download and Print PDF
      </button>
    </div>
  );
};

export default BulkDownloadQR;
