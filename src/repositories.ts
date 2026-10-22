// Learner Code: start here.

/**
 * The fetch function this module calls to reach GitHub. The CLI passes in
 * Node's own `fetch`; tests pass in a fake one, so they never touch the network.
 */
export type Fetch = (url: string, init?: RequestInit) => Promise<Response>;

/** A public repository, as this CLI shows it. */
export interface Repository {
  name: string;
  description: string | null;
  stars: number;
}

/** Step 1: the first page of `owner`'s public repositories, as GitHub sent it. */
export async function fetchFirstPage(owner: string, fetch: Fetch): Promise<unknown> {
  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(owner)}/repos?per_page=100`,
    { headers: { Accept: "application/vnd.github+json" } },
  );

  if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}`);
  }

  return response.json();
}

/** Step 2: one repository from GitHub's JSON, checked and turned into a `Repository`. */
export function parseRepository(json: unknown): Repository {
  if (typeof json !== "object" || json === null || Array.isArray(json)) {
    throw new Error("Expected repository to be an object");
  }

  if (!("name" in json) || typeof json.name !== "string") {
    throw new Error("Invalid repository: `name` must be a string");
  }

  if (
    !("description" in json) ||
    (typeof json.description !== "string" && json.description !== null)
  ) {
    throw new Error(
      "Invalid repository: `description` must be a string or null",
    );
  }

  if (!("stargazers_count" in json) || typeof json.stargazers_count !== "number") {
    throw new Error("Invalid repository: `stargazers_count` must be a number");
  }

  return {
    name: json.name,
    description: json.description,
    stars: json.stargazers_count,
  };
}

/** Step 3: the URL of the next page, from a response's `Link` header. */
export function nextPageUrl(link: string | null): string | undefined {
  if (link === null) {
    return undefined;
  }

  const nextlink = link.split(",").find((part) => part.includes('rel="next"'));
  if (!nextlink) {
    return undefined;
  }
  const urlMatch = nextlink.match(/<(.+?)>; rel="next"/);
  if (!urlMatch) {
    return undefined;
  }
  return urlMatch[1];
}

/** Step 4: every one of `owner`'s public repositories, page by page. */
export async function* listRepositories(owner: string, fetch: Fetch): AsyncGenerator<Repository> {
  throw new Error("Not implemented yet");
}
