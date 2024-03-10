import {JSEncrypt} from "jsencrypt";
// import {RSA_PUBLIC_KEY} from "@/config/config.js";

const encryptor = new JSEncrypt();

const RSA_PUBLIC_KEY = `
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzEObctHWS0AsEYcjMtQz7icsjg3x1TAL
i3OjOboYRs6358FZoQfE4D2lTZUR6F2/zqxDgFNKp/1QRGz9J7fzNXUlKZ6H0NXVhngx9cF3VjPg
7NgidSnxeshHMm/NnkuQLZl2PoZDpdeQEeDOHfY4INUSq5xBjlKMt1ARLrIuOsFTf/yTCC7UAhd4
RMSTCB7blECd4Mt9VDmEHODWHpvxIdBrzu2E3VioY2OX0hCQafmkyg1oez0h+IdFxS/Bd2R27UjG
JW/ts1PqsLXRBMpDRhBqvALY5vddnnNXWGKM6vCS5Q8S1j08yZMg0YKMzSz5GnKIa9dFlQ9dSqTD
kO1fGwIDAQAB`;

const RSA_PRIVATE_KEY = ``;

encryptor.setPublicKey(RSA_PUBLIC_KEY);

const encodeByRSA = (data) => {
	return encryptor.encrypt(data);
}

const decodeByRSA = (encryptData) => {
	return encryptor.decrypt(encryptData);
}

export {
	encodeByRSA,
	decodeByRSA
}
