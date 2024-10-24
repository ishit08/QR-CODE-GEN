import React, { useState } from 'react';
import '../../styles/qrlayout.css'; // Import the CSS file

const QRLayout = ({ children, title, onPrint, onDownload, hasQRCodes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(''); // 'print', 'download', or 'help'

  const handleIconClick = (type) => {
    setActionType(type);
    setIsModalOpen(true);
  };

  const handleModalSave = (settings) => {
    if (actionType === 'print') {
      onPrint(settings);
    } else if (actionType === 'download') {
      onDownload(settings);
    } else if (actionType === 'help') {
      // Handle help modal save if necessary
    }
    setIsModalOpen(false);
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <div className="container">
      {/* Input Section */}
      <div className="left-section">
        <div className="header">
          <h2 className="title">{title}</h2>
          <button onClick={() => handleIconClick('help')} className="icon-button">
            <i className="fa fa-question-circle"></i>
          </button>
        </div>
        {childrenArray[0]} {/* Input, Styles, Colors */}
      </div>

      {/* QR Code Section */}
      <div className="right-section">
        <div className="header">
          <h2 className="title">QR Code</h2>
          <div className="icon-group">
            <button
              onClick={() => handleIconClick('print')}
              className={`icon-button ${!hasQRCodes ? 'disabled-button' : ''}`}
              disabled={!hasQRCodes}
            >
              <i className="fa fa-print"></i>
            </button>
            <button
              onClick={() => handleIconClick('download')}
              className={`icon-button ${!hasQRCodes ? 'disabled-button' : ''}`}
              disabled={!hasQRCodes}
            >
              <i className="fa fa-download"></i>
            </button>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="flex justify-center items-center mt-6"> {/* Tailwind to center QR code */}
          {childrenArray[1]} {/* QR Code Display */}
        </div>
      </div>

      {/* Uncomment the Modal if needed */}
      {/* <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
      /> */}
    </div>
  );
};

export default QRLayout;
