// basicqr.js

"use client";

import { useState } from "react";
import DownloadQR from "./DownloadQR";
import QrLayout from "./QrLayout";
import QRCode from 'qrcode';  // Ensure this line is present
export default function BasicQr() {
  const [text, setText] = useState("");
  const [canvasRef, setCanvasRef] = useState(null);

  const generateQRCode = () => {
    const qrCodeElement = document.getElementById("qrcode");
    qrCodeElement.innerHTML = "";

    if (text) {
      const canvas = document.createElement("canvas");
      qrCodeElement.appendChild(canvas);
      setCanvasRef(canvas);

      QRCode.toCanvas(canvas, text, (error) => {
        if (error) {
          console.error(error);
        }
      });
    } else {
      alert("Please enter some text or URL to generate the QR code.");
    }
  };

  return (
    <QrLayout title="Enter Text or URL">
      {/* Input Fields */}
      <>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL"
          className="p-2 mb-4 border rounded w-full"
          style={{ width: "300px" }}
        />
        <button onClick={generateQRCode} className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
          Generate QR Code
        </button>
      </>

      {/* QR Code Display */}
      <>
        <div id="qrcode" className="border p-4 bg-white"></div>
        {canvasRef && <DownloadQR canvasRef={canvasRef} />}
      </>
    </QrLayout>
  );
}
