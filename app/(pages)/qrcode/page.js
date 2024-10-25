"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import Basic from "../../components/qrcode/basic/basic";
import WithImage from "../../components/qrcode/withimage/WithImage";
import Encrypted from '../../components/qrcode/encrypted/Encrypted';
import TabComponent from '../../components/ui/tab'; // Rename the reusable Tab component

const QRPage = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const { data: session, status } = useSession(); // Use useSession to get session status
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const savedTab = localStorage.getItem('QrTab');
    if (savedTab && tabs.some(tab => tab.value === savedTab)) {
      setActiveTab(savedTab);
    } else {
      setActiveTab(tabs[0].value);
      localStorage.setItem('QrTab', tabs[0].value);
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
        
          {activeTab === "basic" && <Basic/>}
          {activeTab === "withimage" && <WithImage />}
          {activeTab === "dynamic" && <div>Dynamic Component</div>}
          {activeTab === "bulk" && <div>Bulk Component</div>}
          {activeTab === "encrypted" && <Encrypted/>}
      
      </div>
    );
  }

  // Return null or a loader while waiting for redirection
  return null;
};

export default QRPage;
