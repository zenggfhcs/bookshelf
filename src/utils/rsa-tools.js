import { RSA_PUBLIC_KEY } from "@/config/config.js";
import { JSEncrypt } from "jsencrypt";

const encryptor = new JSEncrypt();

const RSA_PRIVATE_KEY = ``;

encryptor.setPublicKey(RSA_PUBLIC_KEY);

function encodeByRSA(data) {
	return encryptor.encrypt(data);
}

function decodeByRSA(encryptData) {
	return encryptor.decrypt(encryptData);
}

export { encodeByRSA, decodeByRSA };
