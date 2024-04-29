import { Header } from "@/constant/Header.js";
import { messageOptions } from "@/constant/options.js";
import router from "@/router/index.js";
import { LOGIN } from "@/router/route-value.js";
import { REFRESH_TOKEN } from "@/storage/key.js";
import { local } from "@/storage/local.js";

const logout = async (message) => {
	local.remove(Header.TOKEN);
	local.remove(REFRESH_TOKEN);
	message.success("成功退出登录", messageOptions);
	await router.push(LOGIN.path);
};

export default logout;
