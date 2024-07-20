import IBookInfo from "@/icons/i-book-info.vue";
import IClassifyInfo from "@/icons/i-classify-info.vue";
import ICollect from "@/icons/i-collect.vue";
import IDebit from "@/icons/i-debit.vue";
import IHome from "@/icons/i-home.vue";
import ILog from "@/icons/i-log.vue";
import IMyLib from "@/icons/i-my-lib.vue";
import IPermissionInfo from "@/icons/i-permission-info.vue";
import IQuery from "@/icons/i-query.vue";
import IReadGuide from "@/icons/i-reader-guide.vue";
import IRole from "@/icons/i-role-info.vue";
import IRoute from "@/icons/i-route.vue";
import ISelf from "@/icons/i-self.vue";
import IUserSetting from "@/icons/i-user-setting.vue";
import IUser from "@/icons/i-user.vue";

const ICON_MAP = {
	"i-home": IHome,
	"i-query": IQuery,
	"i-reader-guide": IReadGuide,
	"i-my-lib": IMyLib,
	// i
	"i-workbench": IHome,
	"i-debit": IDebit,
	"i-collection": ICollect,
	"i-book-info": IBookInfo,
	"i-classify-info": IClassifyInfo,
	"i-user": IUserSetting,
	"i-user-info": IUser,
	"i-role-info": IRole,
	"i-route-info": IRoute,
	"i-permission-info": IPermissionInfo,
	"i-log-info": ILog,
	"i-self-info": ISelf,
};

export function getIconByName(name) {
	return ICON_MAP[name];
}