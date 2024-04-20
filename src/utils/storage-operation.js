import { Header } from "@/constant/Header.js";
import { REFRESH_TOKEN } from "@/storage/key.js";
import { local } from "@/storage/local.js";

function resetToken(tokenInfo) {
	if (tokenInfo?.token) {
		local.put(Header.TOKEN, tokenInfo?.token);
	}
	if (tokenInfo?.refreshToken) {
		local.put(REFRESH_TOKEN, tokenInfo?.refreshToken);
	}
}

export { resetToken };
