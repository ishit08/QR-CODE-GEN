import DownloadQR from "../DownloadQR";

export default function QRCodeDisplay({ canvasRef }) {
    return (
      <>
        <div id="qrcode" className="p-4 bg-white"></div>
        {canvasRef && <DownloadQR canvasRef={canvasRef} />}
      </>
    );
  }
  