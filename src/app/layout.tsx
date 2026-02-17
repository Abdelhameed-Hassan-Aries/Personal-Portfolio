import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  title: "Abdelhameed Hassan — Senior Frontend Engineer",
  description:
    "Senior Frontend Engineer with 5+ years of experience building scalable, high-performance web applications. Shopify expert, React specialist, and e-commerce architect.",
  keywords: [
    "frontend engineer",
    "shopify",
    "react",
    "next.js",
    "typescript",
    "e-commerce",
    "portfolio",
    "abdelhameed hassan",
  ],
  authors: [{ name: "Abdelhameed Hassan" }],
  openGraph: {
    title: "Abdelhameed Hassan — Senior Frontend Engineer",
    description:
      "Senior Frontend Engineer specialising in Shopify, React, and high-performance web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
