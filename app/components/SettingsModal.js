// SettingsModal.js

import React, { useState } from 'react';

const SettingsModal = ({ isOpen, onClose, onSave }) => {
  const [qrPerRow, setQrPerRow] = useState(3);

  const handleSave = () => {
    const qrPerRowInt = parseInt(qrPerRow);
    if (isNaN(qrPerRowInt) || qrPerRowInt < 1 || qrPerRowInt > 5) {
      alert('Please enter a number between 1 and 5 for QR codes per row.');
      return;
    }

    onSave({
      qrPerRow: qrPerRowInt,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Modal backdrop */}
      <div className="fixed inset-0 bg-black opacity-50"></div>

      {/* Modal content */}
      <div className="bg-white p-6 rounded shadow-lg z-10 w-80">
        <h2 className="text-xl font-bold mb-4">Print/Download Settings</h2>
        <div className="mb-4">
          <label className="block text-gray-700">
            Number of QR Codes per Row:
            <input
              type="number"
              min="1"
              max="5"
              value={qrPerRow}
              onChange={(e) => setQrPerRow(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            />
          </label>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
