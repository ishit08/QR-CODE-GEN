// utility/qrcode/handleQrFunctions.js
import { GenerateQRStyle, GenerateQRNative } from './qrUtils';

export const handleGenerate = async ({
  e, text, setInputError, setErrorMessage, useNative, size, 
  basicQrStyle, basicColors, bnColors, bnQrStyle, setQrCode, setHasQRCodes,image
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
      height:size,
      errorCorrectionLevel: "H",
      margin: 1,
      scale: 8,
      color: { dark: bnColors.qr, light: bnColors.background },
      qrStyle: bnQrStyle,
      secondaryColor:bnColors.secondary,
      thirdColor: bnColors.third,
      fourthColor: bnColors.fourth,
    };  
    qrCodeInstance = await GenerateQRNative(text, options);
  } else {
    const options = {
       
      width: size,
      height: size,
      data: text,
      image: image,
      qrOptions: { errorCorrectionLevel: "H" },
      imageOptions: {
        hideBackgroundDots: true,     
        imageSize: 0.4,
        margin:1,
        crossOrigin: "anonymous",
        saveAsBlob: false
      },
      dotsOptions: {
        color: basicColors.dark,        
        type: basicQrStyle.dotsType,
      },
      backgroundOptions: {
        color: basicColors.light,
      },
      cornersSquareOptions: {
        color: basicColors.position, // Use position for corners
        type: basicQrStyle.cornersSquareType,
      },
      cornersDotOptions: {
        color: basicColors.pixel, // Use position for cornersDot
        type: basicQrStyle.cornersDotType,
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
    basicQrStyle: { dotsType: "square", cornersSquareType: "square" ,cornersDotType:"square"},
    basicColors: { dark: "#000000", light: "#ffffff",position:"#000000",  pixel: '#000000'},
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
