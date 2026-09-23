/**
 * Hybrid repo sync: fetches live repository metadata from the GitHub REST API.
 *
 * Uses ISR (`revalidate: 3600`) so the data refreshes about once an hour
 * without burning the unauthenticated rate limit (60 req/hour).
 * Every failure path returns `null` and the UI falls back to static data.
 */

export type RepoData = {
  fullName: string;
  url: string;
  description: string | null;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  language: string | null;
  license: string | null;
  topics: string[];
  lastPush: string | null;
  defaultBranch: string | null;
  homepage: string | null;
  sizeKb: number;
};

type GitHubRepoResponse = {
  full_name?: string;
  html_url?: string;
  description?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  subscribers_count?: number;
  watchers_count?: number;
  open_issues_count?: number;
  language?: string | null;
  license?: { spdx_id?: string; name?: string } | null;
  topics?: string[];
  pushed_at?: string | null;
  default_branch?: string;
  homepage?: string | null;
  size?: number;
};

const GITHUB_REPO_PATTERN =
  /^https?:\/\/(?:www\.)?github\.com\/([^/\s]+)\/([^/\s#?]+)/;

const INVALID_OWNERS = new Set(["topics", "settings", "orgs", "search", "login"]);

/** Extract `{ owner, repo }` from a GitHub repo URL. Returns null when not a repo URL. */
export const parseGitHubRepo = (
  sourceCode?: string | null
): { owner: string; repo: string } | null => {
  if (!sourceCode) return null;

  const match = GITHUB_REPO_PATTERN.exec(sourceCode.trim());
  if (!match) return null;

  const [, owner, rawRepo] = match;
  const repo = rawRepo.replace(/\.git$/, "");

  if (INVALID_OWNERS.has(owner.toLowerCase()) || !owner || !repo) return null;

  return { owner, repo };
};

/** Fetch live repo metadata. Returns null if there is no repo link or the sync fails. */
export async function getRepoData(
  sourceCode?: string | null
): Promise<RepoData | null> {
  const parsed = parseGitHubRepo(sourceCode);
  if (!parsed) return null;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 3600 },
      }
    );

    // Rate limited (403), private or missing repo (404) → fall back to static data
    if (!res.ok) return null;

    const data = (await res.json()) as GitHubRepoResponse;
    if (!data.html_url) return null;

    return {
      fullName: data.full_name ?? `${parsed.owner}/${parsed.repo}`,
      url: data.html_url,
      description: data.description ?? null,
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      watchers: data.subscribers_count ?? data.watchers_count ?? 0,
      openIssues: data.open_issues_count ?? 0,
      language: data.language ?? null,
      license: data.license?.spdx_id || data.license?.name || null,
      topics: Array.isArray(data.topics) ? data.topics : [],
      lastPush: data.pushed_at ?? null,
      defaultBranch: data.default_branch ?? null,
      homepage: data.homepage?.trim() || null,
      sizeKb: data.size ?? 0,
    };
  } catch {
    return null;
  }
}
