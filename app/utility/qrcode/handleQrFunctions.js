// utility/qr/handleQrFunctions.js
import QRUtils from '../../components/qrcode/QRUtils';

export const handleGenerate = ({
  data,
  size,
  dotsType,
  darkColor,
  lightColor,
  cornersSquareType,
  cornersDotType,
  setQrCode
}) => {
  const options = {
    data,
    width: parseInt(size),
    height: parseInt(size),
    dotsOptions: {
      color: darkColor,
      type: dotsType,
    },
    backgroundOptions: {
      color: lightColor,
    },
    cornersSquareOptions: {
      color: darkColor,
      type: cornersSquareType,
    },
    cornersDotOptions: {
      color: darkColor,
      type: cornersDotType,
    },
  };

  console.log("QR Code options:", options);
  const qrCodeInstance = QRUtils.createQRCode(options);
  setQrCode(qrCodeInstance);
};

export const handleReset = ({
  setText,
  setQrStyle,
  setColors,
  setSize,
  setQrCode
}) => {
  console.log("Resetting QR code state");
  setText("");
  setQrStyle({
    dotsType: "square",
    cornersSquareType: "square",
    cornersDotType: "square",
  });
  setColors({ dark: "#000000", light: "#ffffff" });
  setSize(300);
  setQrCode(null);
};
