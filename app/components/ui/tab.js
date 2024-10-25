"use client";

import { useState, useEffect } from 'react';

const Tab = ({ tabs, defaultTab, onTabChange, className }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Load active tab from localStorage on component mount
  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab') || defaultTab;
    setActiveTab(savedTab);
    onTabChange(savedTab);
  }, [defaultTab, onTabChange]);

  // Handle tab change and store in localStorage
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
    onTabChange(tab);
  };

  return (
    <div className={`flex justify-center pb-5 w-full  gap-1 ${className || ''}`}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`px-4 py-2 rounded transition-colors duration-300 ${
            activeTab === tab.value
              ? "bg-blue-600 text-white" // Active tab theme
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tab;
