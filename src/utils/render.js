import { NIcon, NTag, NText } from "naive-ui";
import { h } from "vue";

function renderIcon(icon, props = undefined) {
	return () => h(NIcon, props, { default: () => h(icon) });
}

export { renderIcon };

function expandIcon() {
	return h(NIcon, null, { default: () => h(null) });
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
					tagsRef.value.splice(i, 1);
				}
			},
			{
				default: () => v
			}
		);
	};
}

export { renderTag };
