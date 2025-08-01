import { storage } from "./storage";
import { seoKeywords } from "../client/src/lib/seo-keywords";

export async function generateSitemap(): Promise<string> {
  const baseUrl = "https://evolvo-ai.replit.app";
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Asosiy sahifalar
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      url: `${baseUrl}/#services`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: `${baseUrl}/#pricing`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/#contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    }
  ];

  // Blog postlarini olish
  const blogPosts = await storage.getBlogPosts();
  const blogUrls = blogPosts
    .filter(post => post.published)
    .map(post => ({
      url: `${baseUrl}/blog/${post.id}`,
      lastmod: post.updatedAt ? new Date(post.updatedAt).toISOString().split('T')[0] : currentDate,
      changefreq: 'weekly',
      priority: '0.6'
    }));

  // Kalit so'zlar asosida qo'shimcha sahifalar (virtual URLs)
  const keywordPages = [
    {
      url: `${baseUrl}/services/chatbot-development`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/services/data-analytics`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/services/business-automation`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    }
  ];

  const allUrls = [...staticPages, ...blogUrls, ...keywordPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allUrls.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

export async function generateRobotsTxt(): Promise<string> {
  const baseUrl = "https://evolvo-ai.replit.app";
  
  return `User-agent: *
Allow: /
Allow: /blog/*
Allow: /services/*

# Kalit so'zlar uchun maxsus yo'nalishlar
Allow: /services/chatbot-development
Allow: /services/data-analytics
Allow: /services/business-automation

# Admin sahifalarni bloklash
Disallow: /admin*
Disallow: /api/*
Disallow: /*.json$

# Sitemap joylashuvi
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Maxsus bot sozlamalari
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 1

User-agent: Yandex
Allow: /

# SEO optimizatsiya uchun mahsus kommentarlar
# AI xizmatlari: sun'iy intellekt, chatbot, ma'lumotlar tahlili
# Biznes avtomatlashtirish va raqamli transformatsiya
# O'zbekiston bozorida yetakchi AI kompaniya - Evolvo AI`;
}