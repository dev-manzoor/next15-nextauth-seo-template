interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Common structured data schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Your Company Name",
  url: process.env.SITE_URL || "https://your-domain.com",
  logo: `${process.env.SITE_URL || "https://your-domain.com"}/logo.png`,
  sameAs: [
    "https://twitter.com/yourusername",
    "https://linkedin.com/company/yourcompany",
    "https://github.com/yourusername"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-555-123-4567",
    contactType: "customer service",
    email: "support@your-domain.com"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Next.js Auth Template",
  url: process.env.SITE_URL || "https://your-domain.com",
  description:
    "Production-ready Next.js 15 template with NextAuth.js authentication, shadcn/ui components, and optimized SEO.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${
        process.env.SITE_URL || "https://your-domain.com"
      }/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

export const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Next.js Auth Template",
  url: process.env.SITE_URL || "https://your-domain.com",
  description:
    "Production-ready Next.js 15 template with NextAuth.js authentication, shadcn/ui components, and optimized SEO.",
  applicationCategory: "WebApplication",
  operatingSystem: "Web Browser",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  screenshot: `${
    process.env.SITE_URL || "https://your-domain.com"
  }/screenshot.png`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  author: {
    "@type": "Person",
    name: "Your Name"
  }
};

export const breadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export const articleSchema = (article: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.headline,
  description: article.description,
  author: {
    "@type": "Person",
    name: article.author
  },
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  image:
    article.image ||
    `${process.env.SITE_URL || "https://your-domain.com"}/og-image.png`,
  url: article.url,
  publisher: {
    "@type": "Organization",
    name: "Your Company Name",
    logo: {
      "@type": "ImageObject",
      url: `${process.env.SITE_URL || "https://your-domain.com"}/logo.png`
    }
  }
});
