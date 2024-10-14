// app\(pages)\qr\page.js

"use client";

import { useState, useEffect } from 'react';
import BasicQr from '../../components/BasicQR.js'; // Import the QRGenerator component
import ImageQR from '../../components/ImageQR.js';
import DynamicQR from '../../components/DynamicQR.js';
import BulkQR from '../../components/BulkQR.js';

const QRPage = () => {
  const [activeTab, setActiveTab] = useState('basic');

  // Load active tab from localStorage on component mount
  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  // Update localStorage whenever activeTab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicQr />; // Render the Basic QR code generator
      case 'withImage':
        return <ImageQR />; // Use the ImageQR component here
      case 'dynamic':
        return <DynamicQR />;
      case 'bulk':
        return <BulkQR />;
      case 'invitation':
        return <div>Invitation - coming soon</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-bold m-10">QR Code Generator</h1>

      {/* Tabs - Make the layout mobile responsive */}
      <div className="flex flex-wrap justify-center space-y-2 md:space-y-0 md:space-x-4 mb-8 px-4">
        <button
          className={`py-2 px-4 w-full md:w-auto ${activeTab === 'basic' ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
          onClick={() => handleTabChange('basic')}
        >
          Basic
        </button>
        <button
          className={`py-2 px-4 w-full md:w-auto ${activeTab === 'withImage' ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
          onClick={() => handleTabChange('withImage')}
        >
          With Image
        </button>
        <button
          className={`py-2 px-4 w-full md:w-auto ${activeTab === 'dynamic' ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
          onClick={() => handleTabChange('dynamic')}
        >
          Dynamic
        </button>
        <button
          className={`py-2 px-4 w-full md:w-auto ${activeTab === 'bulk' ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
          onClick={() => handleTabChange('bulk')}
        >
          Bulk
        </button>
        <button
          className={`py-2 px-4 w-full md:w-auto ${activeTab === 'invitation' ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
          onClick={() => handleTabChange('invitation')}
        >
          Invitation
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 bg-white rounded shadow min-h-[50] overflow-auto mx-4 bg-cyan-50 mb-10">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default QRPage;
