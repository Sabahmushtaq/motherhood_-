/** GitHub Pages project path (see next.config.ts basePath). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Public folder asset URL that works with basePath on GitHub Pages. */
export function assetUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
