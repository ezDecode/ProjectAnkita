import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// PLAN EXECUTED: The local font loader for 'ppNeue' has been removed.

const PPEditorialNew = localFont({
  src: [
    {
      path: '../fonts/PPEditorialNew-Ultralight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/PPEditorialNew-UltralightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../fonts/PPEditorialNew-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/PPEditorialNew-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/PPEditorialNew-Ultrabold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/PPEditorialNew-UltraboldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
  ],
  variable: '--font-editorial',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Ankita | Portfolio",
  description: "A Pro Coder!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // PLAN EXECUTED: Removed the 'ppNeue.variable' from the body class list.
        className={`${geistSans.variable} ${geistMono.variable} ${PPEditorialNew.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}