import IExpand from "@/icons/i-expand.vue";
import { NIcon, NTag, NText } from "naive-ui";
import { h } from "vue";

function renderIcon(icon, props = undefined) {
	return () => h(NIcon, props, { default: () => h(icon) });
}

export { renderIcon };

function expandIcon() {
	return h(NIcon, null, {default: () => h(IExpand)});
}

export { expandIcon };

function renderCell() {
	return h(NText, { depth: 3 }, { default: () => "无数据" });
}

export { renderCell };

function renderTag(tagsRef) {
	return (v, i) => {
		return h(
			NTag,
			{
				type: "info",
				bordered: false,
				closable: true,
				onClose: () => {
					tagsRef.splice(i, 1);
				}
			},
			{
				default: () => v
			}
		);
	};
}

export { renderTag };

function renderH(type, props, children) {
	return h(
		type,
		props,
		children
	);
}

export { renderH };

function renderNTag(type, value) {
	return h(
		NTag,
		{
			type: type,
			bordered: false
		},
		{
			default: () => value
		}
	);
}

export { renderNTag };