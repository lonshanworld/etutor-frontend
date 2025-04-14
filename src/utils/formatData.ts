import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);
dayjs.extend(isYesterday);

// Format time for blog
export function formatTimeStamp(timeString: string): string {
  const time = dayjs(timeString);
  const now = dayjs();
  const diffMinutes = now.diff(time, "minutes");

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  if (now.diff(time, "hours") < 24) return `${now.diff(time, "hours")} hr ago`;
  if (time.isYesterday()) return `Yesterday at ${time.format("h:mm A")}`;
  return time.format("MMMM D, YYYY h:mm A");
}

// Combine first, middle, last name
export function formatName(
  first?: string,
  middle?: string | null,
  last?: string | null
): string {
  return [first, middle, last].filter((name) => name && name.trim()).join(" ");
}

// Capitalize first word
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// format date
export function formatDate(date: string): string {
  const dateTime = new Date(date);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const day = String(dateTime.getDate()).padStart(2, "0");
  const month = String(dateTime.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const year = dateTime.getFullYear(); // Full year (e.g., 2025)
  const weekday = weekdays[dateTime.getDay()]; // Get the day of the week

  return `${year}/${month}/${day} (${weekday})`;
}

// format time
export function formatTime(time: string = "00:00:00"): string {
  const dateTime = new Date(`1970-01-01 ${time}`);

  let hours = dateTime.getHours();
  let minutes = String(dateTime.getMinutes()).padStart(2, "0");

  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 24-hour time to 12-hour format

  return `${String(hours).padStart(2, "0")}:${minutes} ${period}`;
}

// Function to ensure the link has a protocol
export const formatLink = (link: string | undefined): string => {
  if (!link) return ""; // If there's no link, return an empty string

  // If the link doesn't start with http or https, prepend http://
  return link.startsWith("http") ? link : `http://${link}`;
};
