export function getLastActivityAgo(activityLog: {
  session_login: string | null;
  session_logout: string | null;
  updated_at: string | null;
  created_at: string | null;
  last_activity_at: string | null;
} | null | undefined): string {
  if (!activityLog) return "-";

  const times = [
    activityLog.session_login,
    activityLog.session_logout,
    activityLog.updated_at,
    activityLog.created_at,
    activityLog.last_activity_at,
  ]
    .filter((time): time is string => time !== null)
    .map((time) => new Date(time).getTime());

  if (times.length === 0) return "-";

  const latestTime = Math.max(...times);
  const now = Date.now();
  const diff = now - latestTime;

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);

  if (minutes < 1) return "Active now";
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
}
