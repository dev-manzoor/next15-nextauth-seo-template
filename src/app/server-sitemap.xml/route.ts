import { getServerSideSitemap } from "next-sitemap";

export async function GET(request: Request) {
  // Method to source urls from cms
  // const urls = await fetch('https://example.com/api')

  const fields = [
    {
      loc: "https://your-domain.com", // Absolute url
      lastmod: new Date().toISOString(),
      changefreq: "daily" as const,
      priority: 1.0
    },
    {
      loc: "https://your-domain.com/demo", // Absolute url
      lastmod: new Date().toISOString(),
      changefreq: "weekly" as const,
      priority: 0.8
    }
    // Add more URLs here as needed
  ];

  return getServerSideSitemap(fields);
}
