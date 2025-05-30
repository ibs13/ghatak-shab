import SessionProvider from "@/components/session-provider";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "../components/Header"; // Adjust the path as needed
import ClientErrorBoundary from "./ClientErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ঘটকসাব",
  description: "A Platform where you can find your perfect match",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <SessionProvider>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
            <Header />
          </div>
          <hr className="border-[#824670]" />
          <ClientErrorBoundary>{children}</ClientErrorBoundary>
        </SessionProvider>
      </body>
    </html>
  );
}
