export function resetInfo(info) {
	for (const key in info) {
		info[key] = null;
	}
}