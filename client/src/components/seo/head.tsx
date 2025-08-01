import { useEffect } from "react";
import type { BlogPost } from "@shared/schema";
import { useLanguage } from "@/hooks/use-language";
import { seoKeywords, seoTitles, seoDescriptions, structuredData } from "@/lib/seo-keywords";
import { generateSocialMeta } from "@/lib/social-seo";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  blogPost?: BlogPost;
  page?: 'home' | 'services' | 'blog' | 'pricing' | 'contact';
}

export function SEOHead({ 
  title,
  description,
  image = "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630",
  url = "https://evolvo-ai.replit.app/",
  type = "website",
  blogPost,
  page = 'home'
}: SEOHeadProps) {
  const { language } = useLanguage();
  
  // Tilga mos title va description olish
  const seoTitle = title || seoTitles[language]?.[page] || seoTitles.uz[page];
  const seoDescription = description || seoDescriptions[language]?.[page] || seoDescriptions.uz[page];
  
  // Kalit so'zlarni birlashtirish
  const keywords = [
    ...seoKeywords[language]?.primary || seoKeywords.uz.primary,
    ...seoKeywords[language]?.secondary || seoKeywords.uz.secondary,
    ...seoKeywords[language]?.longTail || seoKeywords.uz.longTail
  ].join(', ');
  
  useEffect(() => {
    // Social media meta teglar
    const socialMeta = generateSocialMeta(page, language);

    // Agar blog post bo'lsa, uning ma'lumotlarini ishlatish
    if (blogPost) {
      const blogTitle = `${blogPost.title} | Evolvo AI Blog`;
      const blogDescription = blogPost.excerpt || seoDescription;
      const blogImage = blogPost.image || image;
      const blogUrl = `${url}blog/${blogPost.id}`;
      
      updateMeta("title", blogTitle);
      updateMeta("description", blogDescription);
      updateMeta("keywords", keywords);
      updateMeta("og:title", blogTitle);
      updateMeta("og:description", blogDescription);
      updateMeta("og:image", blogImage);
      updateMeta("og:url", blogUrl);
      updateMeta("og:type", "article");
      updateMeta("twitter:title", blogTitle);
      updateMeta("twitter:description", blogDescription);
      updateMeta("twitter:image", blogImage);
      
      // Article-specific meta tags
      if (blogPost.author) {
        updateMeta("article:author", blogPost.author);
      }
      if (blogPost.createdAt) {
        updateMeta("article:published_time", new Date(blogPost.createdAt).toISOString());
      }
      if (blogPost.category) {
        updateMeta("article:section", blogPost.category);
      }
      
      // Canonical URL
      updateLink("canonical", blogUrl);
      
      // JSON-LD for article
      updateJsonLD({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": blogPost.title,
        "description": blogPost.excerpt || blogPost.content.substring(0, 160),
        "image": blogPost.image,
        "author": {
          "@type": "Person",
          "name": blogPost.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Evolvo AI",
          "logo": {
            "@type": "ImageObject",
            "url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
          }
        },
        "datePublished": blogPost.createdAt,
        "dateModified": blogPost.updatedAt || blogPost.createdAt,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": blogUrl
        }
      });
    } else {
      // Default meta tags
      updateMeta("title", seoTitle);
      updateMeta("description", seoDescription);
      updateMeta("keywords", keywords);
      
      // Social media meta tags
      Object.entries(socialMeta).forEach(([key, value]) => {
        updateMeta(key, value);
      });
      
      // Standard Open Graph and Twitter meta
      updateMeta("og:title", seoTitle);
      updateMeta("og:description", seoDescription);
      updateMeta("og:image", image);
      updateMeta("og:url", url);
      updateMeta("og:type", type);
      updateMeta("twitter:title", seoTitle);
      updateMeta("twitter:description", seoDescription);
      updateMeta("twitter:image", image);
      updateLink("canonical", url);
      
      // JSON-LD struktura ma'lumotlar
      updateJsonLD(structuredData.organization);
    }
    
    // Update page title
    document.title = blogPost ? `${blogPost.title} | Evolvo AI Blog` : seoTitle;
    
  }, [seoTitle, seoDescription, keywords, image, url, type, blogPost]);

  return null; // Bu komponent faqat meta teglarni yangilaydi
}

function updateMeta(name: string, content: string) {
  // Remove existing meta tag
  const existing = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
  if (existing) {
    existing.remove();
  }
  
  // Create new meta tag
  const meta = document.createElement("meta");
  if (name.startsWith("og:") || name.startsWith("article:")) {
    meta.setAttribute("property", name);
  } else {
    meta.setAttribute("name", name);
  }
  meta.setAttribute("content", content);
  document.head.appendChild(meta);
}

function updateLink(rel: string, href: string) {
  // Remove existing link
  const existing = document.querySelector(`link[rel="${rel}"]`);
  if (existing) {
    existing.remove();
  }
  
  // Create new link
  const link = document.createElement("link");
  link.setAttribute("rel", rel);
  link.setAttribute("href", href);
  document.head.appendChild(link);
}

function updateJsonLD(data: any) {
  // Remove existing JSON-LD
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }
  
  // Create new JSON-LD
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data, null, 2);
  document.head.appendChild(script);
}