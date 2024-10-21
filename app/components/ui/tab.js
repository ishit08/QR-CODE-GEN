"use client";

import { useState, useEffect } from 'react';

const Tab = ({ tabs, defaultTab, onTabChange, className }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Load active tab from localStorage on component mount if necessary
  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
      setActiveTab(savedTab);
      onTabChange(savedTab);
    } else {
      setActiveTab(defaultTab);
      onTabChange(defaultTab);
    }
  }, [defaultTab, onTabChange]);

  // Handle tab change and store in localStorage
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
    onTabChange(tab);
  };

  return (
    <div className={`flex justify-center gap-1 ${className || ''}`}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`px-4 py-2 ${activeTab === tab.value ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => handleTabChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tab;
