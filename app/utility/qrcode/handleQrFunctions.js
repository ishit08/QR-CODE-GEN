// utility/qr/handleQrFunctions.js
import QRUtils from '../../components/qrcode/QRUtils';

export const handleGenerate = ({
  data,
  width,
  height,
  dotsType,
  darkColor,
  lightColor,
  cornersSquareType,
  cornersDotType,
  setQrCode
}) => {
  const options = {
    data,
    width: parseInt(width),
    height: parseInt(height),
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

  const qrCodeInstance = QRUtils.createQRCode(options);
  setQrCode(qrCodeInstance);
};

export const handleReset = ({
  setText,
  setQrStyle,
  setColors,
  setWidth,
  setHeight,
  setQrCode
}) => {
  setText("");
  setQrStyle({
    dotsType: "rounded",
    cornersSquareType: "square",
    cornersDotType: "dot",
  });
  setColors({ dark: "#000000", light: "#ffffff" });
  setWidth(300);
  setHeight(300);
  setQrCode(null);
};