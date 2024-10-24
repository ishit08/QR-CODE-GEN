"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import Basic from "../../components/qrcode/basic/basic";
import WithImage from "../../components/qrcode/withimage/WithImage";
import EncryptedQR from '../../components/qrcode/encrypted/EncryptedQR';
import TabComponent from '../../components/ui/tab'; // Rename the reusable Tab component

const QRPage = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const { data: session, status } = useSession(); // Use useSession to get session status
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push("/login") 
    }
  }, [status, router]);

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


  if (status === 'authenticated') {
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
          {activeTab === "encrypted" && <EncryptedQR />}
        </div>
      </div>
    );
  }

  // Return null or a loader while waiting for redirection
  return null;
};


export default QRPage;
