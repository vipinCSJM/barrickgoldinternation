import  CryptoJS from 'crypto-js';
export const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, process.env.REACT_APP_SECRET_KEY).toString();
};

export const decryptData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.REACT_APP_SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};