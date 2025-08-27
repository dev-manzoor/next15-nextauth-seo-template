import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
  webApplicationSchema
} from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: {
    default: "Next.js 15 Auth Template - Modern Authentication & SEO",
    template: "%s | Next.js Auth Template"
  },
  description:
    "Production-ready Next.js 15 template with NextAuth.js authentication, shadcn/ui components, and optimized SEO. Built for modern web development with TypeScript, Tailwind CSS, and best practices.",
  keywords: [
    "Next.js 15",
    "NextAuth.js",
    "Authentication",
    "shadcn/ui",
    "TypeScript",
    "React",
    "Tailwind CSS",
    "SEO Optimized",
    "Modern Web Development"
  ],
  authors: [{ name: "Manzoor Ahmad", url: "https://techgorge.com" }],
  creator: "Manzoor Ahmad",
  publisher: "Tech Gorge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL(process.env.SITE_URL || "https://your-domain.com"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Next.js 15 Auth Template - Modern Authentication & SEO",
    description:
      "Production-ready Next.js 15 template with NextAuth.js authentication, shadcn/ui components, and optimized SEO.",
    siteName: "Next.js Auth Template",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Next.js 15 Auth Template"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js 15 Auth Template - Modern Authentication & SEO",
    description:
      "Production-ready Next.js 15 template with NextAuth.js authentication, shadcn/ui components, and optimized SEO.",
    images: ["/og-image.png"],
    creator: "@yourusername"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={webApplicationSchema} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
