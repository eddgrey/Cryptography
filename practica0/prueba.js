import CryptoJS from "crypto-js";

const key = "key 1234";
const ciphertext = CryptoJS.AES.encrypt("Hola mundo", key).toString();
const bytes = CryptoJS.AES.decrypt(ciphertext, key);
const originalText = bytes.toString(CryptoJS.enc.Utf8);
console.log({ ciphertext, bytes, originalText });
