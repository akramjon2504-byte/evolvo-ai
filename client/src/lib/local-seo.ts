// O'zbekiston uchun local SEO optimizatsiya

export const localSEOData = {
  uz: {
    locations: [
      "Toshkent",
      "Samarqand", 
      "Buxoro",
      "Andijon",
      "Namangan",
      "Qo'qon",
      "Nukus",
      "Qarshi",
      "Guliston",
      "Jizzax"
    ],
    businessTypes: [
      "AI xizmatlari",
      "sun'iy intellekt",
      "chatbot yaratish",
      "ma'lumotlar tahlili",
      "biznes avtomatlashtirish",
      "raqamli transformatsiya",
      "IT konsalting",
      "texnologik yechimlar"
    ],
    keywordCombinations: [
      "Toshkentda sun'iy intellekt xizmatlari",
      "O'zbekistonda AI chatbot yaratish", 
      "Samarqandda biznes avtomatlashtirish",
      "Buxoroda ma'lumotlar tahlili",
      "Andijondan raqamli transformatsiya",
      "Namanganda IT konsalting",
      "O'zbekiston bo'ylab AI yechimlar",
      "Markaziy Osiyoda sun'iy intellekt"
    ]
  },
  ru: {
    locations: [
      "Ташкент",
      "Самарканд",
      "Бухара", 
      "Андижан",
      "Наманган",
      "Коканд",
      "Нукус",
      "Карши",
      "Гулистан",
      "Джизак"
    ],
    businessTypes: [
      "AI услуги",
      "искусственный интеллект",
      "создание чатботов",
      "анализ данных",
      "автоматизация бизнеса",
      "цифровая трансформация",
      "IT консалтинг",
      "технологические решения"
    ],
    keywordCombinations: [
      "услуги искусственного интеллекта в Ташкенте",
      "создание AI чатботов в Узбекистане",
      "автоматизация бизнеса в Самарканде",
      "анализ данных в Бухаре",
      "цифровая трансформация из Андижана",
      "IT консалтинг в Намангане",
      "AI решения по всему Узбекистану",
      "искусственный интеллект в Центральной Азии"
    ]
  },
  en: {
    locations: [
      "Tashkent",
      "Samarkand",
      "Bukhara",
      "Andijan", 
      "Namangan",
      "Kokand",
      "Nukus",
      "Karshi",
      "Gulistan",
      "Jizzakh"
    ],
    businessTypes: [
      "AI services",
      "artificial intelligence",
      "chatbot development",
      "data analytics", 
      "business automation",
      "digital transformation",
      "IT consulting",
      "technology solutions"
    ],
    keywordCombinations: [
      "artificial intelligence services in Tashkent",
      "AI chatbot development in Uzbekistan",
      "business automation in Samarkand",
      "data analytics in Bukhara",
      "digital transformation from Andijan",
      "IT consulting in Namangan",
      "AI solutions across Uzbekistan",
      "artificial intelligence in Central Asia"
    ]
  }
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Evolvo AI",
  "description": "O'zbekistonda etakchi sun'iy intellekt va biznes raqamlashtirish kompaniyasi",
  "url": "https://evolvo-ai.replit.app",
  "telephone": "+998-71-123-45-67",
  "email": "info@evolvo-ai.uz",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "IT Park",
    "addressLocality": "Chilonzor tumani",
    "addressRegion": "Toshkent viloyati", 
    "addressCountry": "UZ",
    "postalCode": "100000"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "41.3111",
    "longitude": "69.2797"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday", 
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://t.me/evolvoai",
    "https://linkedin.com/company/evolvoai"
  ],
  "serviceArea": {
    "@type": "Country",
    "name": "Uzbekistan"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AI Services Catalog",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Chatbot Development",
          "description": "Professional chatbot yaratish xizmatlari barcha O'zbekiston shaharlari uchun"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Uzbekistan"  
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Alisher Karimov"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Evolvo AI jamoasi bizning kompaniyaga professional chatbot yaratib berdi. Mijozlar bilan aloqa sezilarli yaxshilandi. Tavsiya etaman!"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person", 
        "name": "Nigora Abdullayeva"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Ma'lumotlar tahlili xizmati juda foydali bo'ldi. Biznesimizning ko'rsatkichlarini yaxshi tushunamiz endi. Rahmat!"
    }
  ]
};

// Google My Business va local qidiruv uchun optimizatsiya
export const localSEOOptimization = {
  generateLocationBasedContent: (location: string, language: 'uz' | 'ru' | 'en') => {
    const data = localSEOData[language];
    const businessType = data.businessTypes[0]; // AI xizmatlari
    
    return {
      title: language === 'uz' 
        ? `${location}da ${businessType} - Evolvo AI`
        : language === 'ru'
        ? `${businessType} в ${location} - Evolvo AI`
        : `${businessType} in ${location} - Evolvo AI`,
      description: language === 'uz'
        ? `${location} shahrida professional ${businessType}. Chatbot yaratish, ma'lumotlar tahlili va avtomatlashtirish. Bepul konsultatsiya.`
        : language === 'ru'
        ? `Профессиональные ${businessType} в городе ${location}. Создание чатботов, анализ данных и автоматизация. Бесплатная консультация.`
        : `Professional ${businessType} in ${location}. Chatbot development, data analytics and automation. Free consultation.`,
      keywords: data.keywordCombinations.filter(k => k.includes(location.toLowerCase()))
    };
  },

  // NAP (Name, Address, Phone) tutarliligi
  getConsistentNAP: () => ({
    name: "Evolvo AI",
    address: "IT Park, Chilonzor tumani, Toshkent, O'zbekiston",
    phone: "+998-71-123-45-67"
  })
};