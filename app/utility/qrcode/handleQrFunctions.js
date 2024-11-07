// utility/qrcode/handleQrFunctions.js
import { GenerateQRStyle, GenerateQRNative } from './qrUtils';

export const handleGenerate = async ({
  e, text, setInputError, setErrorMessage, useNative, size, 
  basicQrStyle, basicColors, nativeColors, bnQrStyle, setQrCode, setHasQRCodes,image
}) => {


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
      image: image,
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10,
        imageSize: 0.4,
        hideBackgroundDots: true,
        backgroundOpacity: 0.8,
      },
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

export const handleReset = (resetFields) => {
  const defaultSettings = {
    text: "",
    placeholder: "Enter text or URL",
    className: "p-2 mb-4 border rounded w-full",
    style: { width: "300px" },
    size: 300,
    qrCode: null,
    inputError: false,
    errorMessage: "",
    hasQRCodes: false,
    basicQrStyle: { dotsType: "square", cornersSquareType: "square" },
    basicColors: { dark: "#000000", light: "#ffffff" },
    bnQrStyle: "none",
    image: null,
  };

  Object.entries(defaultSettings).forEach(([key, value]) => resetFields[key](value));
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


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImageName(file.name); // Set the uploaded image file name
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
