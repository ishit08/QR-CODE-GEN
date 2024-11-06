// utility/qrcode/handleQrFunctions.js
import { GenerateQRStyle, GenerateQRNative } from './qrUtils';

export const handleGenerate = async ({
  e, text, setInputError, setErrorMessage, useNative, size, 
  basicQrStyle, basicColors, nativeColors, bnQrStyle, setQrCode, setHasQRCodes
}) => {
 console.log(useNative);
  console.log(text);
  
  console.log(basicQrStyle);
    console.log(basicColors);

  e.preventDefault();

  if (!text) {
    setInputError(true);
    setErrorMessage("Please enter a value to generate QR code.");
    return;
  }

  setInputError(false);
  setErrorMessage("");

  try {
  let qrCodeInstance;
  if (useNative) {
    const options = {
      width: size,
      errorCorrectionLevel: "H",
      margin: 1,
      scale: 8,
      color: { dark: primaryColor, light: secondaryColor },
      qrStyle: bnQrStyle,
      thirdColor: thirdColor,
      fourthColor: fourthColor,
    };
    qrCodeInstance = await GenerateQRNative(text, options);
  } else {
    const options = {
      width: size,
      height: size,
      data: text,
      dotsOptions: {
        color: basicColors.dark,
        type: basicQrStyle.dotsType || "square",
      },
      backgroundOptions: {
        color: basicColors.light,
      },
      cornersSquareOptions: {
        color: basicColors.position, // Use position for corners
        type: basicQrStyle.cornersSquareType || "square",
      },
      cornersDotOptions: {
        color: basicColors.pixel, // Use position for cornersDot
        type: basicQrStyle.cornersDotType || "square",
      },
    };
    qrCodeInstance = GenerateQRStyle(options);
  }

  setQrCode(qrCodeInstance);
  setHasQRCodes(!!qrCodeInstance);
} catch (error) {
  console.error("QR Code generation error:", error);
  setInputError(true);
  setErrorMessage("Failed to generate QR code. Please try again.");
}
};

export const handleReset = ({
  setText, setPlaceholder, setClassName, setStyle, setSize, setQrCode,
  setInputError, setErrorMessage, setHasQRCodes, setBasicQrStyle,
  setBasicColors, setBnQrStyle
}) => {
  setText("");
  setPlaceholder("Enter text or URL");
  setClassName("p-2 mb-4 border rounded w-full");
  setStyle({ width: "300px" });
  setSize(300);
  setQrCode(null);
  setInputError(false);
  setErrorMessage("");
  setHasQRCodes(false);
  setBasicQrStyle({ dotsType: "square", cornersSquareType: "square" });
  setBasicColors({ dark: "#000000", light: "#ffffff" });
  setBnQrStyle("none");
};

export const handlePrint = (qrCode) => {
  if (qrCode) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print QR Code</title></head><body>');
    printWindow.document.write(typeof qrCode === 'string' ? `<img src="${qrCode}" alt="QR Code" />` : qrCode.outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  }
};

export const handleDownload = (qrCode) => {
  if (qrCode) {
    const link = document.createElement('a');
    link.href = typeof qrCode === 'string' ? qrCode : qrCode.toDataURL("image/png");
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
