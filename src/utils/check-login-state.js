import { Header } from "@/constant/Header.js";
import router from "@/router/index.js";

function checkLoginState() {
	const token = localStorage.getItem(Header.TOKEN);
	if (token === null || token === undefined || token === "") {
		router.push("/login").then(() => {});
	}
	// console.log(token);
	// todo 最后的最后，检查一遍
}

export { checkLoginState };
