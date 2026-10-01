// Resolves a file in /public against the path the site is served from, so the
// same build works at a domain root and under a sub-path (GitHub Pages serves
// this project at /<repo-name>/).
export const asset = (path) => import.meta.env.BASE_URL + path.replace(/^\//, '')
