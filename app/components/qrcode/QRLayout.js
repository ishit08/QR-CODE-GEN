// components/QRLayout.js
import React, { useState } from 'react';
import '../../styles/qrlayout.css';
import GenerateButton from '../../components/ui/GenerateButton';
import ResetButton from '../../components/ui/ResetButton';

const QRLayout = ({ children, title, onGenerate, onReset, onPrint, onDownload, hasQRCodes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState('');

  const handleIconClick = (type) => {
    setActionType(type);
    setIsModalOpen(true);
  };

  const handleModalSave = (settings) => {
    if (actionType === 'print') {
      onPrint(settings);
    } else if (actionType === 'download') {
      onDownload(settings);
    }
    setIsModalOpen(false);
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <div className="container">
      <div className="left-section">
        <div className="header">
          <h2 className="title">{title}</h2>
          <button onClick={() => handleIconClick('help')} className="icon-button">
            <i className="fa fa-question-circle"></i>
          </button>
        </div>
        {childrenArray[0]}
        <div className="flex justify-between mt-6 space-x-6">
          <GenerateButton onClick={onGenerate} />
          <ResetButton onClick={onReset} />
        </div>
      </div>
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
        {childrenArray[1]}
      </div>
    </div>
  );
};

export default QRLayout;
