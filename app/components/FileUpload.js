// FileUpload.js
'use client;'

import Papa from 'papaparse';
import { useState } from 'react';

const FileUpload = ({ setCsvData, setFileName }) => {
  const [uploadedFileName, setUploadedFileName] = useState(''); // State to store the uploaded file name

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName(file.name); // Set the uploaded file name
      setFileName(file.name);
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setCsvData(results.data.slice(0, -1));
        },
      });
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
      <div className="md:flex">
        <div className="w-full p-3">
          <div className="relative border-dotted h-32 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex flex-col justify-center items-center">
            <div className="absolute top-1/4">
              <div className="flex flex-col items-center">
                <i className="fa fa-folder-open fa-3x text-blue-700 mb-2"></i>
                {!uploadedFileName && ( // Only show this when no file is uploaded
                  <span className="block text-gray-400 font-normal">Attach your files here</span>
                )}
              </div>
            </div>
            {uploadedFileName && ( // Display the uploaded file name below the icon
              <div className="absolute bottom-3 text-center">
                <p className="text-gray-700 text-sm">Uploaded File: {uploadedFileName}</p>
              </div>
            )}
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="h-full w-full opacity-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
