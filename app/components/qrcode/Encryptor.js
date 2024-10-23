import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';

const Encryptor = ({ text, onEncrypt }) => {
  const [encryptedText, setEncryptedText] = useState('');

  useEffect(() => {
    if (text) {
      const salt = bcrypt.genSaltSync(5);
      const hashed = bcrypt.hashSync(text, salt);
      setEncryptedText(hashed);
      onEncrypt(hashed);  // Send the encrypted text to the parent component for QR generation
    }
  }, [text, onEncrypt]);

  return null;  // Don't render anything on the UI
};

export default Encryptor;
