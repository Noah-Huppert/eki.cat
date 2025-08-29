import type { Metadata } from "next";
import { AppType } from "next/dist/shared/lib/utils";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "eki.cat",
  description: "Trains",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <header className="flex flex-row px-4">
          <nav className="flex flex-row grow h-14">
            <Link
              href="/"
              className="grow self-center"
            >
              eki.cat
            </Link>

            <Link
              href="/nodes"
              className="self-center"
            >
              Nodes
            </Link>
          </nav>
        </header>

        <div className="p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
