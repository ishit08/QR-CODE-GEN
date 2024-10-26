import React, { useState } from "react";
import "../../../styles/qrlayout.css";
import GenerateButton from "../../ui/GenerateButton";
import ResetButton from "../../ui/ResetButton";
import { Checkbox } from "../../ui/checkbox";

const QRLayout = ({ children, title, onGenerate, onReset, onPrint, onDownload, hasQRCodes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [useAltLibrary, setUseAltLibrary] = useState(false);

  const handleIconClick = (type) => {
    setActionType(type);
    setIsModalOpen(true);
  };

  const handleModalSave = (settings) => {
    if (actionType === "print") {
      onPrint(settings);
    } else if (actionType === "download") {
      onDownload(settings);
    }
    setIsModalOpen(false);
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <div className="container flex">
      <div className="left-section p-5">
      <div className="header flex items-center justify-center relative mb-4">
  <h2 className="title text-lg font-bold">{title}</h2>
  <button onClick={() => handleIconClick("help")} className="icon-button absolute right-0">
    <i className="fa fa-question-circle"></i>
  </button>
</div>


        {/* Checkbox Component */}
     <div className="flex justify-start mb-4">
  <Checkbox
    id="use-alternate-library"
    checked={useAltLibrary}
    onChange={(e) => setUseAltLibrary(e.target.checked)}
  >
    Would you like to use a language other than English?
  </Checkbox>
</div>

        {/* First child component */}
        {childrenArray[0]}

        <div className="flex justify-between mt-6 space-x-6">
          <GenerateButton onClick={onGenerate} />
          <ResetButton onClick={onReset} />
        </div>
      </div>

      <div className="right-section p-5">
        <div className="header flex justify-between">
          <h2 className="title text-lg font-bold">QR Code</h2>
          <div className="icon-group flex space-x-3">
            <button
              onClick={() => handleIconClick("print")}
              className={`icon-button ${!hasQRCodes ? "disabled-button" : ""}`}
              disabled={!hasQRCodes}
            >
              <i className="fa fa-print"></i>
            </button>
            <button
              onClick={() => handleIconClick("download")}
              className={`icon-button ${!hasQRCodes ? "disabled-button" : ""}`}
              disabled={!hasQRCodes}
            >
              <i className="fa fa-download"></i>
            </button>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="flex justify-center items-center h-full">
          {childrenArray[1]}
        </div>
      </div>
    </div>
  );
};

export default QRLayout;
