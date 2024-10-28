import React, { useState } from 'react';
import "../../../styles/qrlayout.css";
import GenerateButton from "../../ui/GenerateButton"; // Adjust path as necessary
import ResetButton from "../../ui/ResetButton"; // Adjust path as necessary
import QRCodeDisplay from './QRCodeDisplay'; // Adjust path as necessary

const QRLayout = ({ children, title, onGenerate, onReset, onPrint, onHelp, onDownload, hasQRCodes,qrCode }) => {

  return (
    <div className="container flex">
      <div className="left-section p-5 flex flex-col">
        <div className="header flex items-center justify-center relative mb-4">
          <h2 className="title text-lg font-bold">{title}</h2>
          <button onClick={onHelp} className="icon-button absolute right-0">
            <i className="fa fa-question-circle"></i>
          </button>
        </div>

        {/* Form for handling inputs and buttons */}
        <form onSubmit={onGenerate}> 
          {/* Controls (children passed from Main.js) */}
          {children}

          {/* Generate and Reset buttons */}
          <div className="flex justify-between mt-6 space-x-6">
            <GenerateButton type="submit" />  {/* Generate button will submit the form */}
            <ResetButton type="button" onClick={onReset} />
          </div>
        </form>
      </div>

      <div className="right-section p-5 flex flex-col">
        {/* Header with QR Code title and action buttons */}
        <div className="header flex items-center justify-center relative mb-4">
          <h2 className="title text-lg font-bold">QR Code</h2>
          <div className="icon-button absolute right-0 space-x-2">
            <button
              onClick={onPrint}
              className={`icon-button ${!hasQRCodes ? "disabled-button" : ""}`}
              disabled={!hasQRCodes}
            >
              <i className="fa fa-print"></i>
            </button>
            <button
              onClick={onDownload}
              className={`icon-button ${!hasQRCodes ? "disabled-button" : ""}`}
              disabled={!hasQRCodes}
            >
              <i className="fa fa-download"></i>
            </button>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="flex-1 flex items-center justify-center mb-4 qr-display-wrapper">
          <QRCodeDisplay qrCode={qrCode} />
        </div>
      </div>
    </div>
  );
};

export default QRLayout;
