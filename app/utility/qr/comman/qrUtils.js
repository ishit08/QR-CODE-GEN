import QRCode from 'qrcode';

// Function to generate QR code canvas
export const generateQRCodeCanvas = (text, options) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    QRCode.toCanvas(canvas, text, options, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(canvas);
      }
    });
  });
};

// Function to modify the QR code style (color manipulation)
export const applyQRStyle = (canvas, qrStyle, primaryColor, secondaryColor, thirdColor, fourthColor) => {
  const context = canvas.getContext("2d");
  const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;

  const size = canvas.width;
  const PositionMarkerSize = size / 7;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const index = (y * canvas.width + x) * 4;
      const isDark = imgData.data[index] === 0;

      if (isDark) {
        switch (qrStyle) {
          case "horizontal":
            // Top half primary, bottom half secondary
            if (y < canvas.height / 2) {
              applyColor(data, index, primaryColor);
            } else {
              applyColor(data, index, secondaryColor);
            }
            break;
          case "vertical":
            // Left half primary, right half secondary
            if (x < canvas.width / 2) {
              applyColor(data, index, primaryColor);
            } else {
              applyColor(data, index, secondaryColor);
            }
            break;
          case "diagonal":
            // Upper-left triangle primary, lower-right secondary
            if (x + y < canvas.width) {
              applyColor(data, index, primaryColor);
            } else {
              applyColor(data, index, secondaryColor);
            }
            break;
          case "quad":
            if (x < canvas.width / 2 && y < canvas.height / 2) {
              applyColor(data, index, primaryColor);
            }
            else if (x >= canvas.width / 2 && y < canvas.height / 2) {
              applyColor(data, index, secondaryColor);
            }
            else if (x < canvas.width / 2 && y >= canvas.height / 2) {
              applyColor(data, index, thirdColor);
            }
            else {
              applyColor(data, index, fourthColor);
            }
            break;
          default:
            break;
        }
      }
    }
  }

  context.putImageData(imgData, 0, 0);
};

// Helper function to apply color to QR code pixels
const applyColor = (data, index, color) => {
  data[index] = parseInt(color.slice(1, 3), 16);   // R
  data[index + 1] = parseInt(color.slice(3, 5), 16); // G
  data[index + 2] = parseInt(color.slice(5, 7), 16); // B
};
