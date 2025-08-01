import { useEffect } from "react";
import type { BlogPost } from "@shared/schema";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  blogPost?: BlogPost;
}

export function SEOHead({ 
  title = "Evolvo AI - O'zbekistonda Sun'iy Intellekt va Biznes Raqamlashtirish Xizmatlari",
  description = "Evolvo AI - O'zbekistonda yetakchi sun'iy intellekt va biznes raqamlashtirish kompaniyasi. Korporativ AI yechimlari, avtomatlashtirish va raqamli transformatsiya xizmatlari.",
  image = "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630",
  url = "https://evolvo-ai.replit.app/",
  type = "website",
  blogPost
}: SEOHeadProps) {
  
  useEffect(() => {
    // Agar blog post bo'lsa, uning ma'lumotlarini ishlatish
    if (blogPost) {
      const blogTitle = `${blogPost.title} | Evolvo AI Blog`;
      const blogDescription = blogPost.excerpt || description;
      const blogImage = blogPost.image || image;
      const blogUrl = `${url}blog/${blogPost.id}`;
      
      updateMeta("title", blogTitle);
      updateMeta("description", blogDescription);
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
      updateMeta("title", title);
      updateMeta("description", description);
      updateMeta("og:title", title);
      updateMeta("og:description", description);
      updateMeta("og:image", image);
      updateMeta("og:url", url);
      updateMeta("og:type", type);
      updateMeta("twitter:title", title);
      updateMeta("twitter:description", description);
      updateMeta("twitter:image", image);
      updateLink("canonical", url);
    }
    
    // Update page title
    document.title = blogPost ? `${blogPost.title} | Evolvo AI Blog` : title;
    
  }, [title, description, image, url, type, blogPost]);

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