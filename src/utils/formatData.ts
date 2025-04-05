import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);
dayjs.extend(isYesterday);

// Format time for blog
export const formatTime = (timeString: string): string => {
  const time = dayjs(timeString);
  const now = dayjs();
  const diffMinutes = now.diff(time, "minutes");

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  if (now.diff(time, "hours") < 24) return `${now.diff(time, "hours")} hr ago`;
  if (time.isYesterday()) return `Yesterday at ${time.format("h:mm A")}`;
  return time.format("MMMM D, YYYY h:mm A");
};

// Combine first, middle, last name
export const formatName = (
  first?: string,
  middle?: string,
  last?: string
): string => {
  return [first, middle, last].filter((name) => name && name.trim()).join(" ");
};
