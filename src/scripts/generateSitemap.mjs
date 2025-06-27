import { writeFileSync } from "fs";
import { globby } from "globby";
import prettier from "prettier";
import { siteMetadata } from "../data/siteMetaData.mjs";

async function generateSitemap() {
  const prettierConfig = await prettier.resolveConfig(
    "../../prettier.config.js",
  );

  const pages = await globby([
    "src/pages/**/*.tsx",
    "!src/pages/_*.tsx",
    "!src/pages/api",
    "!src/pages/404.tsx",
  ]);

  // Define page priorities and change frequencies
  const pageConfig = {
    '/': { priority: '1.0', changefreq: 'weekly' },
    '/about': { priority: '0.8', changefreq: 'monthly' },
    '/projects': { priority: '0.9', changefreq: 'monthly' },
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace(".tsx", "")
                  .replace("src/pages/", "/")
                  .replace("/index", "");

                // exclude dynamic routes
                if (path.includes("[") || path.includes("]")) {
                  return "";
                }

                const normalizedPath = path === "" ? "/" : path;
                const config = pageConfig[normalizedPath] || { 
                  priority: '0.6', 
                  changefreq: 'monthly' 
                };

                return `<url>
                            <loc>${siteMetadata.siteUrl}${path}</loc>
                            <lastmod>${currentDate}</lastmod>
                            <changefreq>${config.changefreq}</changefreq>
                            <priority>${config.priority}</priority>
                        </url>
                    `;
              })
              .join("")}
        </urlset>
  `;

  const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  writeFileSync("public/sitemap.xml", formatted);
  writeFileSync("public/robots.txt", robotsTxt);

  console.log(
    "Successfully generated\n-> Sitemap at public/sitemap.xml\n-> Robots.txt at public/robots.txt",
  );
}

const robotsTxt = `User-agent: *
Allow: /

# Block crawling of API routes
Disallow: /api/

# Block crawling of private files
Disallow: /_next/
Disallow: /static/

# Allow specific bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Sitemap location
Sitemap: ${siteMetadata.siteUrl}/sitemap.xml

# Crawl delay (in seconds)
Crawl-delay: 1`;

generateSitemap();
