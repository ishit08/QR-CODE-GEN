// components/QrLayout.js

import React from 'react';

export default function QrLayout({ children, title, onPrint, onDownload }) {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1: Input Section */}
        <div
          className="flex flex-col items-center p-6 bg-white shadow-xl rounded-lg border border-gray-300"
          style={{ boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)' }}
        >
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          {children[0]} {/* This should be the file upload section */}
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
              <button onClick={onPrint} className="mr-4">
                <i className="fa fa-print text-blue-600 hover:text-gray-800 cursor-pointer fa-2x"></i>
              </button>
              <button onClick={onDownload}>
                <i className="fa fa-download text-blue-600 hover:text-gray-800 cursor-pointer fa-2x"></i>
              </button>
            </div>
          </div>
          {children[1]} {/* This should be the QR code display section */}
        </div>
      </div>
    </div>
  );
}
