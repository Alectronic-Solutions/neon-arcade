const isGithubPages = process.env.GITHUB_PAGES === "true"

export const basePath = isGithubPages ? "/neon-arcade" : ""

/** Absolute production origin + basePath, no trailing slash. */
export const SITE_URL = `https://alectronic-solutions.github.io${basePath}`
