"use client";

import { useState } from 'react';
import BasicQr from '../../components/basicqr.js'; // Import the QRGenerator component
import ImageQR from '../../components/imageqr';

const QRPage = () => {
  const [activeTab, setActiveTab] = useState('basic');
const renderTabContent = () => {
  switch (activeTab) {
    case 'basic':
      return <BasicQr />; // Render the Basic QR code generator
    case 'withImage':     // Use the ImageQR component here
      return <ImageQR />;
    case 'dynamic':
      return <div>Dynamic QR Code Generator (Feature under development)</div>;
    case 'bulk':
      return <div>Bulk QR Code Generator</div>;
    case 'invitation':
      return <div>Invitation QR Code Generator</div>;
    default:
      return null;
  }
};

  return (
    <div className="min-h-screen py-20 bg-gray-100">
      <h1 className="text-3xl text-center font-bold mb-6">QR Code Generator</h1>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-8 px-4">
        <button
          className={`py-2 px-4 ${activeTab === 'basic' ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
          onClick={() => setActiveTab('basic')}
        >
          Basic
              </button>
               <button
          className={`py-2 px-4 ${activeTab === 'withImage' ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
          onClick={() => setActiveTab('withImage')}
        >
          With Image
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'dynamic' ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
          onClick={() => setActiveTab('dynamic')}
        >
          Dynamic
        </button>
       
        <button
          className={`py-2 px-4 ${activeTab === 'bulk' ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
          onClick={() => setActiveTab('bulk')}
        >
          Bulk
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'invitation' ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
          onClick={() => setActiveTab('invitation')}
        >
          Invitation
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 bg-white rounded shadow max-h-[80vh] overflow-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default QRPage;
