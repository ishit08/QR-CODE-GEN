import { jsPDF } from "jspdf";
import { compressQRCode } from "./compressQRCode";

export const printQRCodePDF = async (qrCodes, settings) => {
  const { qrPerRow } = settings;

  try {
    if (qrCodes && qrCodes.length > 0) {
      const pdf = new jsPDF("p", "pt", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10; // Adjust margin for equal spacing on all sides
      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      const qrSize = (availableWidth - (qrPerRow - 1) * margin) / qrPerRow;
      const labelHeight = qrSize * 0.2; // Label height is 20% of QR size

      const qrPlusLabelHeight = qrSize + labelHeight + margin;
      const qrPerColumn = Math.floor((availableHeight + margin) / qrPlusLabelHeight);
      const qrPerPage = qrPerRow * qrPerColumn;

      let x = margin;
      let y = margin;
      let count = 0;

      for (let i = 0; i < qrCodes.length; i++) {
        if (count === qrPerPage) {
          pdf.addPage();
          x = margin;
          y = margin;
          count = 0;
        }

        try {
          const imgData = await compressQRCode(qrCodes[i].qrCode);
          pdf.addImage(imgData, "JPEG", x, y, qrSize, qrSize);

          // Add cell borders
          pdf.setDrawColor(0); // Black border
          pdf.setLineWidth(0.5);
          pdf.rect(x, y, qrSize, qrSize + labelHeight);

          // Adjust font size based on QR size
          const maxFontSize = 12;
          const minFontSize = 6;
          let fontSize = qrSize * 0.1; // Font size is 10% of QR size
          fontSize = Math.max(minFontSize, Math.min(maxFontSize, fontSize));

          pdf.setFontSize(fontSize);

          // Truncate label text if too long
          const labelText = qrCodes[i].label || `QR Code ${i + 1}`;
          const maxLabelWidth = qrSize - 4; // 2pt padding on each side
          const truncatedLabel = pdf.splitTextToSize(labelText, maxLabelWidth);

          // Add the label text below the QR code
          pdf.text(
            truncatedLabel,
            x + qrSize / 2,
            y + qrSize + labelHeight / 2 + fontSize / 2 - 2,
            { align: "center" }
          );

          count++;
          x += qrSize + margin;

          if (count % qrPerRow === 0) {
            x = margin;
            y += qrSize + labelHeight + margin;
          }
        } catch (error) {
          console.error("Failed to add QR code and label to PDF:", error);
        }
      }

      console.log("Opening print dialog...");
      const pdfBlob = pdf.output("blob");
      const pdfURL = URL.createObjectURL(pdfBlob);
      const printWindow = window.open(pdfURL);

      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
        };
      } else {
        alert("Pop-up blocked. Please allow pop-ups for this website to print.");
        console.error("Unable to open print window.");
      }
    } else {
      alert("No QR codes available for printing.");
      console.error("No QR codes to print.");
    }
  } catch (error) {
    console.error("Error in printQRCodePDF:", error);
  }
};
