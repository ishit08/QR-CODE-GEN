import { useState } from "react";
import { generateQRCodeCanvas, applyQRStyle } from "../../../utility/qr/common/qrUtils";
import TextInput from "../common/TextInput";
import QrStyleSelector from "../common/QrStyleSelector";
import ColorPicker from "../common/ColorPicker";
import GenerateButton from "../common/GenerateButton";
import QRCodeDisplay from "../common/QRCodeDisplay";
import QrLayout from "../QrLayout";

export default function BasicQr() {
  const [text, setText] = useState("");
  const [placeholder, setPlaceholder] = useState("Enter text or URL");
  const [className, setClassName] = useState("p-2 mb-4 border rounded w-full");
  const [style, setStyle] = useState({ width: "300px" });
  const [canvasRef, setCanvasRef] = useState(null);
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#ffffff");
  const [qrStyle, setQrStyle] = useState("none");

  const generateQRCode = async () => {
    const qrCodeElement = document.getElementById("qrcode");
    qrCodeElement.innerHTML = "";

    if (text) {
      const options = {
        errorCorrectionLevel: "H",
        margin: 1,
        scale: 8,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      };

      try {
        // Generate QR code canvas
        const canvas = await generateQRCodeCanvas(text, options);
        qrCodeElement.appendChild(canvas);
        setCanvasRef(canvas);

        // Apply style if needed
        if (qrStyle !== "none") {
          applyQRStyle(canvas, qrStyle, primaryColor, secondaryColor);
        }
      } catch (error) {
        console.error("QR Code generation error:", error);
      }
    } else {
      alert("Please enter some text or URL to generate the QR code.");
    }
  };

  return (
    <QrLayout title="Genrate Qr">
      {/* Input Fields */}
      <>
      <TextInput text={text} setText={setText} placeholder={placeholder} setPlaceholder={setPlaceholder} className={className} setClassName={setClassName} style={style} setStyle={setStyle} />
      <QrStyleSelector qrStyle={qrStyle} setQrStyle={setQrStyle} />
      <ColorPicker primaryColor={primaryColor} setPrimaryColor={setPrimaryColor} secondaryColor={secondaryColor} setSecondaryColor={setSecondaryColor} qrStyle={qrStyle} />
      <GenerateButton generateQRCode={generateQRCode} />
      </>
      <>
        <QRCodeDisplay canvasRef={canvasRef} />
      </>
    </QrLayout>
  );
}
