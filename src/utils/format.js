import { format } from "date-fns";

function formatTime(timeString) {
	if (timeString) {
		return format(new Date(timeString), "yyyy-MM-dd HH:mm:ss");
	}
	return null;
}

function formatBackTime(timeString) {
	if (timeString) {
		return formatTime(timeString).replace(" ", "T");
	}
	return null;
}

function formatDate(dateString) {
	return format(new Date(dateString), "yyyy-MM-dd");
}

function formatMouth(dateString) {
	return format(new Date(dateString), "yyyy-MM");
}

function formatTo(dateString, formatString) {
	return format(new Date(dateString), formatString);
}

export { formatTime, formatBackTime, formatDate, formatMouth, formatTo };
