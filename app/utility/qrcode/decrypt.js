// utility/qrcode/decrypt.js

import CryptoJS from 'crypto-js';

export const decryptData = (ciphertext, secretKey) => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData || "Decryption failed";
    } catch (error) {
        console.error("Decryption error: ", error);
        return null;
    }
};
