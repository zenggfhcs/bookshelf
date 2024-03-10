import {Header} from "@/api/Header.js";
import router from "@/router/Router.js";

const checkLoginState = () => {
	const token = localStorage.getItem(Header.TOKEN)
	if (token === null || token === undefined || token === "") {
		router.push("/login");
	}
	console.log(token);
}

export {
	checkLoginState
}