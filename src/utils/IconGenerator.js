import {h} from "vue";
import {NIcon} from "naive-ui";

function renderIcon(icon) {
   return () => h(NIcon, null, {default: () => h(icon)})
}

function expandIcon() {
   return h(NIcon, null, {default: () => h(null)})
}

export {
   renderIcon,
   expandIcon
}