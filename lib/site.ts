/**
 * Must match `basePath` in next.config.ts (GitHub Pages project site path).
 * Uses NODE_ENV so the value is inlined in client bundles on CI builds.
 */
export const basePath =
  process.env.NODE_ENV === "production" ? "/motherhood_-" : "";

/** Public folder asset URL that works with basePath on GitHub Pages. */
export function assetUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
