import { format } from "date-fns";

function formatTime(timeString) {
	return format(new Date(timeString), "yyyy-MM-dd hh:mm:ss");
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

export { formatTime, formatDate, formatMouth, formatTo };
