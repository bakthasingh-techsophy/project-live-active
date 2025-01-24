import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_SECRET_KEY;

export const encryptData = (data: string) => {
  if (!data || !secretKey) {
    console.error("Encryption failed: Missing data or secret key.");
    return "";
  }
  try {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  } catch (error) {
    console.error("Encryption failed:", error);
    return "";
  }
};

export const decryptData = (ciphertext: string) => {
  if (!ciphertext || !secretKey) {
    console.error("Decryption failed: Missing ciphertext or secret key.");
    return "";
  }
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes?.toString(CryptoJS.enc.Utf8) || "";
  } catch (error) {
    console.error("Decryption failed:", error);
    return "";
  }
};

export const setSessionStorageItem = (key: string, value: string) => {
  if (!key || !value) {
    console.error("Session storage set failed: Missing key or value.");
    return;
  }
  const encryptedValue = encryptData(value);
  if (encryptedValue) {
    sessionStorage.setItem(key, encryptedValue);
  }
};

export const getSessionStorageItem = (key: string) => {
  if (!key) {
    console.error("Session storage get failed: Missing key.");
    return null;
  }
  const encryptedValue = sessionStorage.getItem(key);
  if (encryptedValue) {
    return decryptData(encryptedValue);
  }
  return null;
};

export const setLocalStorageItem = (
  key: string,
  value: string
): Promise<void> => {
  return new Promise((resolve) => {
    if (!key || !value) {
      console.error("Local storage set failed: Missing key or value.");
      resolve();
      return;
    }
    const encryptedValue = encryptData(value);
    if (encryptedValue) {
      localStorage.setItem(key, encryptedValue);
    }
    resolve();
  });
};

export const getLocalStorageItem = (key: string) => {
  if (!key) {
    console.error("Local storage get failed: Missing key.");
    return null;
  }
  const encryptedValue = localStorage.getItem(key);
  if (encryptedValue) {
    return decryptData(encryptedValue);
  }
  return null;
};
export const clearLocalStorage = () => {
  localStorage.clear();
  return null;
};
export const clearSessionStorage = () => {
  sessionStorage.clear();
  return null;
};
export const clearStorage = () => {
  clearLocalStorage();
  clearSessionStorage();
  return null;
};
