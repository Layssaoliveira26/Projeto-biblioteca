import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LivrosProvider } from "@/context/LivrosContext";
import { ThemeProvider } from "./dashboard/themeProvider";
import LogoChange from "./logoChange";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ressonância Literária",
  description: "",
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" 
    suppressHydrationWarning
    className={`${geistSans.variable} ${geistMono.variable}`}>
  <head>
    <link id="favicon" rel="icon" href="/logo.png" />
  </head>
  <body className="antialiased">
    <ThemeProvider>
      <LivrosProvider>
        <LogoChange/>
        {children}
      </LivrosProvider>
    </ThemeProvider>
  </body>

</html>
)}
