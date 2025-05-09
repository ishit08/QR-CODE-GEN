import React, { useState } from 'react';
import SettingsModal from './SettingsModal';

export default function QrLayout({ children, title, onPrint, onDownload, hasQRCodes }) {
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

  // Convert children to an array to safely access children[0] and children[1]
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1: Input Section */}
        <div
          className="flex flex-col items-center p-6 bg-white shadow-xl rounded-lg border border-gray-300"
          style={{ boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)' }}
        >
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            {/* Help button in the input section */}
            <button
              onClick={() => handleIconClick('help')}
              className="text-blue-600 hover:text-gray-800 cursor-pointer fa-2x"
            >
              <i className="fa fa-question-circle"></i>
            </button>
          </div>
          {childrenArray[0]} {/* This should be the file upload/input section */}
        </div>

        {/* Column 2: QR Code Section */}
        <div
          className="flex flex-col items-center p-6 bg-white shadow-xl rounded-lg border border-gray-300"
          style={{ boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)' }}
        >
          {/* Updated heading with icons */}
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-bold mb-4">Generated QR Code</h2>
            <div>
              {/* Disable print button if no QR codes */}
              <button
                onClick={() => handleIconClick('print')}
                className={`mr-4 ${!hasQRCodes ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!hasQRCodes} // Disable when no QR codes are present
              >
                <i className="fa fa-print text-blue-600 hover:text-gray-800 cursor-pointer fa-2x"></i>
              </button>
              {/* Disable download button if no QR codes */}
              <button
                onClick={() => handleIconClick('download')}
                className={`${!hasQRCodes ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!hasQRCodes} // Disable when no QR codes are present
              >
                <i className="fa fa-download text-blue-600 hover:text-gray-800 cursor-pointer fa-2x"></i>
              </button>
            </div>
          </div>
          {childrenArray[1]} {/* This should be the QR code display section */}
        </div>
      </div>

      {/* Include the SettingsModal */}
      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
      />
    </div>
  );
}
