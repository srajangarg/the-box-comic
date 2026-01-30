import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "the simulation",
  description: "a series about the simulation hypothesis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
