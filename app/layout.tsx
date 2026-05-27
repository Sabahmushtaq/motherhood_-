import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Best Birthing Package in Chennai | Motherhood Hospitals",
  description: "Experience the premium '9 Divine' maternity and birthing packages in Chennai at Motherhood Hospitals. Choose the best suites, deluxe rooms, and expert care for you and your newborn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
