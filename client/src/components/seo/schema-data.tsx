import { useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";
import { structuredData } from "@/lib/seo-keywords";
import { localBusinessSchema } from "@/lib/local-seo";

interface SchemaDataProps {
  type?: 'organization' | 'service' | 'article';
  data?: any;
}

export function SchemaData({ type = 'organization', data }: SchemaDataProps) {
  const { language } = useLanguage();

  useEffect(() => {
    // Eski script taglarini olib tashlash
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => {
      if (script.textContent?.includes('schema.org')) {
        script.remove();
      }
    });

    let schemaObject = {};

    switch (type) {
      case 'organization':
        schemaObject = {
          ...structuredData.organization,
          "description": language === 'uz' 
            ? "O'zbekistonda etakchi sun'iy intellekt va biznes raqamlashtirish kompaniyasi. AI chatbot, ma'lumotlar tahlili va avtomatlashtirish xizmatlari."
            : language === 'ru'
            ? "Ведущая компания искусственного интеллекта и цифровизации бизнеса в Узбекистане. Услуги AI чатботов, анализа данных и автоматизации."
            : "Leading artificial intelligence and business digitalization company in Uzbekistan. AI chatbot, data analytics and automation services."
        };
        break;
      
      case 'service':
        schemaObject = {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Evolvo AI Services",
          "description": "Professional AI xizmatlari: chatbot yaratish, ma'lumotlar tahlili, biznes avtomatlashtirish",
          "provider": structuredData.organization,
          "serviceType": "Artificial Intelligence Services",
          "areaServed": {
            "@type": "Country",
            "name": "Uzbekistan"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "AI Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "AI Chatbot Development",
                  "description": "Professional chatbot yaratish va integratsiya xizmatlari"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Service",
                  "name": "Data Analytics",
                  "description": "Ma'lumotlar tahlili va business intelligence yechimlar"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service", 
                  "name": "Business Automation",
                  "description": "Biznes jarayonlarini avtomatlashtirish va optimallashtirish"
                }
              }
            ]
          }
        };
        break;
      
      case 'article':
        if (data) {
          schemaObject = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": data.title,
            "description": data.excerpt || data.content?.substring(0, 160),
            "image": data.image || "https://images.unsplash.com/photo-1677442136019-21780ecad995",
            "author": {
              "@type": "Organization",
              "name": "Evolvo AI"
            },
            "publisher": structuredData.organization,
            "datePublished": data.createdAt,
            "dateModified": data.updatedAt || data.createdAt,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://evolvo-ai.replit.app/blog/${data.id}`
            },
            "keywords": [
              "sun'iy intellekt",
              "AI",
              "artificial intelligence", 
              "chatbot",
              "ma'lumotlar tahlili",
              "biznes avtomatlashtirish",
              "O'zbekiston",
              "Evolvo AI"
            ].join(', ')
          };
        }
        break;
    }

    // Schema JSON-LD ni head ga qo'shish
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaObject, null, 2);
    document.head.appendChild(script);

    // FAQ schema (faqat home sahifa uchun)
    if (type === 'organization') {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Evolvo AI qanday xizmatlar taqdim etadi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evolvo AI sun'iy intellekt sohasida chatbot yaratish, ma'lumotlar tahlili, biznes jarayonlarini avtomatlashtirish, AI konsalting va raqamli transformatsiya xizmatlarini taqdim etadi."
            }
          },
          {
            "@type": "Question", 
            "name": "AI chatbot yaratish qancha vaqt oladi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oddiy chatbot 1-2 hafta, murakkab AI yechimlar 4-8 hafta davomida yaratiladi. Aniq muddat loyiha murakkabligiga bog'liq."
            }
          },
          {
            "@type": "Question",
            "name": "Evolvo AI xizmatlari narxi qancha?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Bizda uch xil tarif mavjud: Boshlang'ich (2,000,000 so'm/oy), Professional (5,000,000 so'm/oy) va Korporativ (kelishilgan narx). Har qanday tarif 14 kunlik bepul sinov bilan taqdim etiladi."
            }
          }
        ]
      };

      const faqScript = document.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.textContent = JSON.stringify(faqSchema, null, 2);
      document.head.appendChild(faqScript);

      // Local Business Schema qo'shish
      const localBusinessScript = document.createElement('script');
      localBusinessScript.type = 'application/ld+json';
      localBusinessScript.textContent = JSON.stringify(localBusinessSchema, null, 2);
      document.head.appendChild(localBusinessScript);
    }

    // Breadcrumb schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Bosh sahifa",
          "item": "https://evolvo-ai.replit.app/"
        }
      ]
    };

    if (type === 'article' && data) {
      breadcrumbSchema.itemListElement.push(
        {
          "@type": "ListItem", 
          "position": 2,
          "name": "Blog",
          "item": "https://evolvo-ai.replit.app/#blog"
        },
        {
          "@type": "ListItem",
          "position": 3, 
          "name": data.title,
          "item": `https://evolvo-ai.replit.app/blog/${data.id}`
        }
      );
    }

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema, null, 2);
    document.head.appendChild(breadcrumbScript);

    return () => {
      // Cleanup
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('schema.org')) {
          script.remove();
        }
      });
    };
  }, [type, data, language]);

  return null;
}