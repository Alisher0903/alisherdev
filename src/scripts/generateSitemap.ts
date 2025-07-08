import { writeFileSync } from "fs";
import { globby } from "globby";
import prettier from "prettier";
import { siteMetadata } from "../data/siteMetaData";
import path from "path";
import { fileURLToPath } from "url";

async function generateSitemap() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const prettierConfig = await prettier.resolveConfig(
    path.resolve(__dirname, "../../prettier.config.cjs"),
  );

  if (!prettierConfig) {
    console.error("Could not resolve prettier config. Using default options.");
  }

  const pages = await globby([
    "src/pages/**/*.tsx",
    "!src/pages/_*.tsx",
    "!src/pages/api",
    "!src/pages/404.tsx",
  ]);

  const pageConfig: {
    [key: string]: { priority: string; changefreq: string };
  } = {
    "/": { priority: "1.0", changefreq: "weekly" },
    "/about": { priority: "0.8", changefreq: "monthly" },
    "/projects": { priority: "0.9", changefreq: "monthly" },
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace(/\.tsx$/, "")
                  .replace("src/pages", "")
                  .replace("/index", "");

                const route = path === "" ? "/" : path;

                if (route.includes("[") || route.includes("]")) {
                  return "";
                }

                const config = pageConfig[route] || {
                  priority: "0.7",
                  changefreq: "monthly",
                };

                return `
                        <url>
                            <loc>${siteMetadata.siteUrl}${route}</loc>
                            <lastmod>${currentDate}</lastmod>
                            <changefreq>${config.changefreq}</changefreq>
                            <priority>${config.priority}</priority>
                        </url>
                    `;
              })
              .join("")}
        </urlset>
  `;

  const formattedSitemap = await prettier.format(sitemap, {
    ...(prettierConfig || {}),
    parser: "html",
  });

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

  writeFileSync("public/sitemap.xml", formattedSitemap);
  writeFileSync("public/robots.txt", robotsTxt);

  console.log("Successfully generated:\n-> sitemap.xml\n-> robots.txt");
}

generateSitemap();
