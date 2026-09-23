/** Compact number formatting for repo stats: 999, 1.2k, 10k, 1.5M */
export function formatCount(value?: number | null): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";

  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(value);
}

/** Human readable relative time, e.g. "3 days ago", "5 months ago" */
export function timeAgo(iso?: string | null): string {
  if (!iso) return "—";

  const timestamp = new Date(iso).getTime();
  if (Number.isNaN(timestamp)) return "—";

  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  const years = Math.floor(days / 365);
  return `${years}y ago`;
}

/** Repo size from GitHub (in KB) to a readable label */
export function formatRepoSize(sizeKb?: number | null): string {
  if (sizeKb === null || sizeKb === undefined || Number.isNaN(sizeKb)) return "—";
  if (sizeKb < 1024) return `${sizeKb} KB`;
  return `${(sizeKb / 1024).toFixed(1).replace(/\.0$/, "")} MB`;
}
