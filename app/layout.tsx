import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linkedev",
  description:
    "Linkedev makes it easy to find GitHub users by location, offering a smooth search experience to connect developers with potential collaborators across the globe.",
};

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        {children}
      </body>
    </html>
  );
}
