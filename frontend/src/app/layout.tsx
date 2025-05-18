
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import BootstrapClient from "@/components/bootstrapClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: '--montserrat', // Optional, used for Tailwind CSS
});

export const metadata: Metadata = {
  title: "Banker",
  description: "Project for Banks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} montserrat antialiased`}
      >
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
