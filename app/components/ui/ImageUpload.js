'use client;'

import { useState } from 'react';
import '../../styles/ImageUpload.css'; // Import the CSS file

const ImageUpload = ({ setImage }) => {
  const [uploadedImageName, setUploadedImageName] = useState(''); // State to store the uploaded image file name
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImageName(file.name); // Set the uploaded image file name
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-upload-container">
      <div className="image-upload-inner">
        <div className="image-upload-box">
          <div className="image-upload-content">
            <i className="fa fa-image fa-2x text-blue-700 px-2 py-2"></i>
            {!uploadedImageName && ( // Only show this when no image is uploaded
              <span className="image-upload-placeholder">Upload your image here</span>
            )}
            {uploadedImageName && ( // Display the uploaded image file name next to the icon
              <span className="uploaded-image-name">
                <p className="uploaded-image-text">Uploaded Image: {uploadedImageName}</p>
              </span>
            )}
            <input
              type="file"
              accept="image/*" // Restrict file types to images only
              onChange={handleImageChange}
              className="image-upload-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
