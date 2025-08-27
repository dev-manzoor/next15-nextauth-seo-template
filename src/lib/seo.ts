import { Metadata } from "next";

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: "website" | "article";
  };
  twitter?: {
    title?: string;
    description?: string;
    image?: string;
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
    noimageindex?: boolean;
  };
}

export function generateSEOMetadata(config: SEOConfig): Metadata {
  const baseUrl = process.env.SITE_URL || "https://your-domain.com";

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: config.canonical ? `${baseUrl}${config.canonical}` : undefined
    },
    openGraph: {
      title: config.openGraph?.title || config.title,
      description: config.openGraph?.description || config.description,
      url: config.canonical ? `${baseUrl}${config.canonical}` : baseUrl,
      type: config.openGraph?.type || "website",
      images: config.openGraph?.image
        ? [
            {
              url: config.openGraph.image,
              width: 1200,
              height: 630,
              alt: config.openGraph.title || config.title
            }
          ]
        : undefined,
      siteName: "Next.js Auth Template"
    },
    twitter: {
      card: "summary_large_image",
      title: config.twitter?.title || config.openGraph?.title || config.title,
      description:
        config.twitter?.description ||
        config.openGraph?.description ||
        config.description,
      images:
        config.twitter?.image || config.openGraph?.image
          ? [config.twitter?.image || config.openGraph?.image!]
          : undefined,
      creator: "@yourusername"
    },
    robots: {
      index: config.robots?.index ?? true,
      follow: config.robots?.follow ?? true,
      noarchive: config.robots?.noarchive,
      nosnippet: config.robots?.nosnippet,
      noimageindex: config.robots?.noimageindex,
      googleBot: {
        index: config.robots?.index ?? true,
        follow: config.robots?.follow ?? true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    }
  };
}

// Common SEO patterns
export const defaultSEO = {
  openGraph: {
    type: "website" as const,
    locale: "en_US",
    siteName: "Next.js Auth Template"
  },
  twitter: {
    card: "summary_large_image" as const,
    creator: "@yourusername"
  }
};

// Generate page-specific metadata
export function generatePageMetadata(
  title: string,
  description: string,
  path: string,
  options?: {
    keywords?: string[];
    image?: string;
    type?: "website" | "article";
    noindex?: boolean;
  }
): Metadata {
  const baseUrl = process.env.SITE_URL || "https://your-domain.com";
  const fullUrl = `${baseUrl}${path}`;

  return {
    title,
    description,
    keywords: options?.keywords,
    alternates: {
      canonical: fullUrl
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      type: options?.type || "website",
      images: options?.image
        ? [
            {
              url: options.image,
              width: 1200,
              height: 630,
              alt: title
            }
          ]
        : [
            {
              url: `${baseUrl}/og-image.png`,
              width: 1200,
              height: 630,
              alt: title
            }
          ],
      siteName: "Next.js Auth Template"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: options?.image ? [options.image] : [`${baseUrl}/og-image.png`],
      creator: "@yourusername"
    },
    robots: {
      index: !options?.noindex,
      follow: !options?.noindex,
      googleBot: {
        index: !options?.noindex,
        follow: !options?.noindex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    }
  };
}

// Helper for generating FAQ schema
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

// Helper for generating How-to schema
export function generateHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text
    }))
  };
}
