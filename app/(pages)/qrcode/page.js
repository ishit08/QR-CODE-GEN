"use client";

import { useState, useEffect } from 'react';
import Basic from "../../components/qrcode/basic/basic";
import WithImage from "../../components/qrcode/withimage/WithImage";
import TabComponent from '../../components/ui/tab'; // Rename the reusable Tab component

const QRPage = () => {
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    const savedTab = localStorage.getItem('QrTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('QrTab', activeTab);
  }, [activeTab]);

  const tabs = [
    { value: 'basic', label: 'Basic' },
    { value: 'withimage', label: 'Include Image' },
    { value: 'dynamic', label: 'Dynamic' },
    { value: 'bulk', label: 'Bulk' },
    { value: 'encrypted', label: 'Encrypted' },
     { value: 'visiting', label: 'Visiting Cards' },
    { value: 'invitation', label: 'Invitation Cards' }
  ];

  return (
    <div>
      {/* Tab Navigation */}
      <TabComponent
        tabs={tabs}
        activeTab={activeTab}  // Pass the activeTab to the Tab component
        onTabChange={setActiveTab}
        className="mt-10"
      />

      {/* Tab Content */}
      <div className="p-4 bg-white rounded shadow min-h-[50] overflow-auto mx-4 bg-cyan-50 mb-10">
        {activeTab === "basic" && <Basic />}
        {activeTab === "withimage" && <WithImage />}
        {activeTab === "dynamic" && <div>Dynamic Component</div>}
        {activeTab === "bulk" && <div>Bulk Component</div>}
        {activeTab === "encrypted" && <div>Encrypted QR</div>}
      </div>
    </div>
  );
};

export default QRPage;
