import {NIcon, NText} from "naive-ui";
import {h} from "vue";

function renderIcon(icon, props = undefined) {
	return () => h(NIcon, props, {default: () => h(icon)})
}

export {renderIcon};

function expandIcon() {
	return h(NIcon, null, {default: () => h(null)})
}

export {expandIcon};

const renderCell = () => {
	return h(NText, {depth: 3}, {default: () => '无数据'});
}

export {
	renderCell
}