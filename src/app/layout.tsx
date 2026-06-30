import type { Metadata } from "next";
import { Space_Grotesk, Outfit, Bebas_Neue } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Soujanya | Interactive Engineering Blueprint Portfolio",
  description: "Interactive digital identity and engineering blueprint profile page of Soujanya, Software Engineer, AI Researcher, and Full Stack Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${outfit.variable} ${bebasNeue.variable}`}>
      <body className="antialiased selection:bg-accent selection:text-background relative min-h-screen">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
