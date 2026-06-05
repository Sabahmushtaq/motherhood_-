import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";
import { assetUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Best Birthing Package in Chennai | Motherhood Hospitals",
  description: "Experience the premium '9 Divine' maternity and birthing packages in Chennai at Motherhood Hospitals. Choose the best suites, deluxe rooms, and expert care for you and your newborn.",
  icons: {
    icon: [
      { url: assetUrl("/icon.png"), type: "image/png", sizes: "32x32" },
      { url: assetUrl("/motherhood-favicon-192.png"), type: "image/png", sizes: "192x192" },
    ],
    shortcut: assetUrl("/icon.png"),
    apple: assetUrl("/motherhood-favicon-192.png"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const htmlStyle = {
    ["--complete-care-foot-bg" as string]: `url("${assetUrl("/complete-care-foot-accent.png")}")`,
  } satisfies CSSProperties;

  return (
    <html lang="en" className="h-full antialiased" style={htmlStyle}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
