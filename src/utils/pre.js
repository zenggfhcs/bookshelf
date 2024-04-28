import { formatBackTime } from "@/utils/format.js";

export function preTime(target, timestampArray) {
	if (timestampArray) {
		const [start, end] = timestampArray;
		target.start = formatBackTime(start);
		target.end = formatBackTime(end);
	}
}