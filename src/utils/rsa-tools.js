import { RSA_PUBLIC_KEY } from "@/config/config.js";
import { JSEncrypt } from "jsencrypt";

const encryptor = new JSEncrypt();

const RSA_PRIVATE_KEY = ``;

encryptor.setPublicKey(RSA_PUBLIC_KEY);

const encodeByRSA = (data) => {
	return encryptor.encrypt(data);
};

const decodeByRSA = (encryptData) => {
	return encryptor.decrypt(encryptData);
};

export { encodeByRSA, decodeByRSA };
