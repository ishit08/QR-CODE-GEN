import { jsPDF } from "jspdf";
import { compressQRCode } from "../compressQRCode";
import { kokila } from '../../../utility/font/kokila';  // Base64 font file

export const printQRCodePDF = async (qrCodes, settings) => {
  const { qrPerRow, qrPerPage } = settings;  // qrPerPage is now passed as a setting

  try {
    if (qrCodes && qrCodes.length > 0) {
      const pdf = new jsPDF("p", "pt", "a4");

      // Add the Unicode font
      pdf.addFileToVFS("Kokila.ttf", kokila);
      pdf.addFont("Kokila.ttf", "Kokila", "normal");
      pdf.setFont("Kokila");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;
      const availableWidth = pageWidth - margin * 2;

      const qrSize = (availableWidth - (qrPerRow - 1) * margin) / qrPerRow;
      const baseLabelHeight = qrSize * 0.2;  // Initial label height for a single line
      const qrPlusLabelHeight = qrSize + baseLabelHeight + margin;
      const qrPerColumn = Math.floor((pageHeight + margin) / qrPlusLabelHeight);
      const qrPerPageLimit = qrPerRow * qrPerColumn;

      // Total height occupied by QR codes and labels
      const totalContentHeight = qrPerColumn * qrPlusLabelHeight;

      // Calculate top and bottom margin to center content vertically
      const verticalPadding = (pageHeight - totalContentHeight) / 2;

      let x = margin;
      let y = verticalPadding;  // Start with the calculated padding
      let count = 0;

      for (let i = 0; i < qrCodes.length; i++) {
        if (count === qrPerPageLimit) {
          pdf.addPage();
          x = margin;
          y = verticalPadding;  // Reset y to the padding for each new page
          count = 0;
        }

        try {
          const imgData = await compressQRCode(qrCodes[i].qrCode);
          pdf.addImage(imgData, "JPEG", x, y, qrSize, qrSize);

          // Add cell borders
          pdf.setDrawColor(0);
          pdf.setLineWidth(0.5);

          const labelText = qrCodes[i].label || `QR Code ${i + 1}`;
          let labelLines = labelText.includes('|') ? labelText.split('|') : pdf.splitTextToSize(labelText, qrSize - 4);
          const labelHeight = labelLines.length * (qrSize * 0.1 + 1);  // Dynamic label height

          // Adjust label Y-position and create the border
          pdf.rect(x, y, qrSize, qrSize + labelHeight + 1.5);
          pdf.setFontSize(qrSize * 0.1);  // Adjust font size based on QR size

          let labelY = y + qrSize + 10;  // Increased gap between QR code and label
          labelLines.forEach((line, index) => {
            pdf.text(line, x + qrSize / 2, labelY + index * (qrSize * 0.1 + 2), { align: "center" });
          });

          count++;
          x += qrSize + margin;

          if (count % qrPerRow === 0) {
            x = margin;
            y += qrSize + labelHeight + margin;  // Adjust Y-position based on label height
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
