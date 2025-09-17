import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/assets/globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Playground",
  description: "Different Next.js / React / Tailwind / UI experiments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(geistSans.variable, geistMono.variable, "bg-background text-foreground antialiased")}>
        <div className="flex min-h-screen flex-col items-center justify-center">{children}</div>
      </body>
    </html>
  );
}
