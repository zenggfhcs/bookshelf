import IRoute from "@/icons/i-route.vue";

const ICON_MAP = {
	"i-route": IRoute
};

export function getIconByName(name) {
	return ICON_MAP[name];
}