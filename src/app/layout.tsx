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

const ppNeue = localFont({
  src: [
    {
      path: '../fonts/PPNeueMontreal-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/PPNeueMontreal-Book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/PPNeueMontreal-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/PPNeueMontreal-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/PPNeueMontreal-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/PPNeueMontreal-SemiBolditalic.woff2',
      weight: '600',
      style: 'italic',
    },
  ],
  variable: '--font-ppneue',
  display: 'swap',
});

const PPEditorialNew = localFont({
  src: [
    {
      path: '../fonts/PPEditorialNew-Ultralight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/PPEditorialNew-UltralightItalic.woff2',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../fonts/PPEditorialNew-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/PPEditorialNew-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/PPEditorialNew-Ultrabold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/PPEditorialNew-UltraboldItalic.woff2',
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
        className={`${geistSans.variable} ${geistMono.variable} ${ppNeue.variable} ${PPEditorialNew.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
