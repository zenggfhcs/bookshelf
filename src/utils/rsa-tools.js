import { RSA_PUBLIC_KEY } from "@/config/config.js";
import { JSEncrypt } from "jsencrypt";

const encryptor = new JSEncrypt();

encryptor.setPublicKey(RSA_PUBLIC_KEY);

function encodeByRSA(data) {
	return encryptor.encrypt(data);
}

export { encodeByRSA };
