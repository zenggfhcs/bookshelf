import {Header} from "@/api/Header.js";
import {messageOptions} from "@/constant/options.js";
import router from "@/router/Router.js";
import {LOGIN} from "@/router/RouterValue.js";
import {local} from "@/storage/local.js";

const logout = async (message) => {
	local.remove(Header.TOKEN);
	message.success("成功退出登录", messageOptions);
	await router.push(LOGIN.path);
}

export default logout;