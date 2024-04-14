import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yahoo! Time Capsule",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.png", // /public path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
    </html>
  );
}
