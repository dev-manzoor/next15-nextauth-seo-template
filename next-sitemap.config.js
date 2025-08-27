/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://your-domain.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: true,

  // Exclude auth and protected routes from sitemap
  exclude: [
    "/api/*",
    "/login",
    "/register",
    "/dashboard*", // Exclude dashboard pages as they require authentication
    "/server-sitemap.xml" // Exclude the server-side sitemap
  ],

  // Define robots.txt policies
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login", "/register"]
      }
    ],
    additionalSitemaps: [
      "https://your-domain.com/server-sitemap.xml" // Add server-side sitemap
    ]
  },

  // Custom transform function for additional customization
  transform: async (config, path) => {
    // Set higher priority for important pages
    if (path === "/") {
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: 1.0,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined
      };
    }

    // Set different priority for demo page
    if (path === "/demo") {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined
      };
    }

    // Use default transformation for all other cases
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined
    };
  }
};
