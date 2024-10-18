"use client";
import { useState, useEffect } from 'react';
import Basic from "../../components/qrcode/basic/basic";  // Import the Basic component
import WithImage from "../../components/qrcode/withimage/WithImage";

const QRPage = () => {
  const [activeTab, setActiveTab] = useState("basic");
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

  return (
    <div>
     

      {/* Tab Navigation */}
      <div className="flex justify-center gap-1 mt-10 ">
        <button
          className={`px-4 py-2 ${activeTab === "basic" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => handleTabChange("basic")}
        >
          Basic
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "withimage" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => handleTabChange("withimage")}
        >
          With Image
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "dynamic" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => handleTabChange("dynamic")}
        >
          Dynamic
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "bulk" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => handleTabChange("bulk")}
        >
          Bulk
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 bg-white rounded shadow min-h-[50] overflow-auto mx-4 bg-cyan-50 mb-10">
        {activeTab === "basic" && <Basic />}
        {/* For other tabs, import respective components when available */}
        {activeTab === "withimage" && <WithImage />}
        {activeTab === "dynamic" && <div>Dynamic Component</div>}
        {activeTab === "bulk" && <div>Bulk Component</div>}
      </div>
    </div>
  );
};

export default QRPage;
