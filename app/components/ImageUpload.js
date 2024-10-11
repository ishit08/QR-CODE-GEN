// ImageUpload.js
'use client;'

import { useState } from 'react';

const ImageUpload = ({ setImageFile }) => {
  const [uploadedImageName, setUploadedImageName] = useState(''); // State to store the uploaded image file name

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImageName(file.name); // Set the uploaded image file name
      setImageFile(file);
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl mt-4">
      <div className="md:flex">
        <div className="w-full p-3">
          <div className="relative border-dotted h-32 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex flex-col justify-center items-center">
            <div className="absolute top-1/4">
              <div className="flex flex-col items-center">
                <i className="fa fa-image fa-3x text-blue-700 mb-2"></i>
                {!uploadedImageName && ( // Only show this when no image is uploaded
                  <span className="block text-gray-400 font-normal">Attach your image here</span>
                )}
              </div>
            </div>
            {uploadedImageName && ( // Display the uploaded image file name below the icon
              <div className="absolute bottom-3 text-center">
                <p className="text-gray-700 text-sm">Uploaded Image: {uploadedImageName}</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*" // Restrict file types to images only
              onChange={handleImageChange}
              className="h-full w-full opacity-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
