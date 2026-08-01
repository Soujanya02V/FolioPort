import type { Metadata, Viewport } from "next";
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
  title: "Soujanya Maharudra | Portfolio",
  description: "Computer Science Engineering student specializing in Full Stack Development, DevOps, Research, and Software Engineering.",
  metadataBase: new URL("https://soujanyamaharudra.dev"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Soujanya Maharudra | Portfolio",
    description: "Computer Science Engineering student specializing in Full Stack Development, DevOps, Research, and Software Engineering.",
    url: "https://soujanyamaharudra.dev",
    siteName: "Soujanya Maharudra Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Soujanya Maharudra Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soujanya Maharudra | Portfolio",
    description: "Computer Science Engineering student specializing in Full Stack Development, DevOps, Research, and Software Engineering.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FF6A00",
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
