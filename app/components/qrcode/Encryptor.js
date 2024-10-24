import React, { useEffect } from 'react';
import CryptoJS from 'crypto-js';

const Encryptor = ({ text, onEncrypt }) => {
  useEffect(() => {
    if (text) {
      const secretKey = 'MySecretKey123'; // Secret key for encryption
      const encryptedText = CryptoJS.AES.encrypt(text, secretKey).toString(); // Encrypt the text
      onEncrypt(encryptedText);  // Send the encrypted text to the parent component for QR generation
    }
  }, [text, onEncrypt]);

  return null;  // Don't render anything on the UI
};

export default Encryptor;
