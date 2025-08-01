// Social Media SEO optimizatsiya

export const socialSEOTemplates = {
  uz: {
    home: {
      title: "🚀 Evolvo AI - O'zbekistondagi #1 Sun'iy Intellekt Kompaniyasi",
      description: "🤖 Chatbot yaratish ⚡ Ma'lumotlar tahlili 🔧 Biznes avtomatlashtirish. Professional AI xizmatlari bilan biznesingizni rivojlantiring! 💼✨",
      hashtags: "#SuniyIntellekt #AIXizmatlari #Chatbot #OzbekistonAI #EvolvoAI #MalumotlarTahlili #BiznesAvtomatlashtirish #RaqamliTransformatsiya"
    },
    services: {
      title: "💡 Professional AI Xizmatlari - Evolvo AI",
      description: "🔥 Chatbot yaratish, ma'lumotlar tahlili, biznes avtomatlashtirish. O'zbekistonda yetakchi AI yechimlar! Bepul konsultatsiya oling 📞",
      hashtags: "#AIXizmatlari #ChatbotYaratish #MalumotlarTahlili #BiznesAvtomatlashtirish #ProfessionalAI"
    },
    pricing: {
      title: "💰 AI Xizmatlari Narxlari - Evolvo AI",
      description: "📊 Boshlang'ich: 2M so'm/oy 🚀 Professional: 5M so'm/oy 🏢 Korporativ: individual. 14 kunlik BEPUL sinov! 🎁",
      hashtags: "#AITariflar #BepulSinov #EvolvoAINarxlar #SuniyIntellektXizmatlari"
    }
  },
  ru: {
    home: {
      title: "🚀 Evolvo AI - Компания #1 в области ИИ в Узбекистане",
      description: "🤖 Создание чатботов ⚡ Анализ данных 🔧 Автоматизация бизнеса. Развивайте бизнес с профессиональными AI услугами! 💼✨",
      hashtags: "#ИскусственныйИнтеллект #AIУслуги #Чатбот #УзбекистанAI #EvolvoAI #АнализДанных #АвтоматизацияБизнеса #ЦифроваяТрансформация"
    },
    services: {
      title: "💡 Профессиональные AI Услуги - Evolvo AI",
      description: "🔥 Создание чатботов, анализ данных, автоматизация бизнеса. Ведущие AI решения в Узбекистане! Получите бесплатную консультацию 📞",
      hashtags: "#AIУслуги #СозданиеЧатботов #АнализДанных #АвтоматизацияБизнеса #ПрофессиональныйAI"
    },
    pricing: {
      title: "💰 Цены на AI Услуги - Evolvo AI",
      description: "📊 Начальный: 2М сум/мес 🚀 Профессиональный: 5М сум/мес 🏢 Корпоративный: индивидуально. 14 дней БЕСПЛАТНО! 🎁",
      hashtags: "#AIТарифы #БесплатнаяПробнаяВерсия #EvolvoAIЦены #УслугиИИ"
    }
  },
  en: {
    home: {
      title: "🚀 Evolvo AI - #1 Artificial Intelligence Company in Uzbekistan",
      description: "🤖 Chatbot Development ⚡ Data Analytics 🔧 Business Automation. Grow your business with professional AI services! 💼✨",
      hashtags: "#ArtificialIntelligence #AIServices #Chatbot #UzbekistanAI #EvolvoAI #DataAnalytics #BusinessAutomation #DigitalTransformation"
    },
    services: {
      title: "💡 Professional AI Services - Evolvo AI",
      description: "🔥 Chatbot development, data analytics, business automation. Leading AI solutions in Uzbekistan! Get free consultation 📞",
      hashtags: "#AIServices #ChatbotDevelopment #DataAnalytics #BusinessAutomation #ProfessionalAI"
    },
    pricing: {
      title: "💰 AI Services Pricing - Evolvo AI",
      description: "📊 Basic: 2M UZS/month 🚀 Professional: 5M UZS/month 🏢 Enterprise: custom. 14 days FREE trial! 🎁",
      hashtags: "#AIPricing #FreeTrial #EvolvoAIPrices #AIServices"
    }
  }
};

export const generateSocialMeta = (page: string, language: 'uz' | 'ru' | 'en') => {
  const template = socialSEOTemplates[language]?.[page as keyof typeof socialSEOTemplates['uz']] || socialSEOTemplates.uz.home;
  
  return {
    // Open Graph
    "og:site_name": "Evolvo AI",
    "og:type": "website",
    "og:locale": language === 'uz' ? 'uz_UZ' : language === 'ru' ? 'ru_RU' : 'en_US',
    "og:title": template.title,
    "og:description": template.description,
    
    // Twitter Card
    "twitter:card": "summary_large_image",
    "twitter:site": "@EvolvoAI",
    "twitter:creator": "@EvolvoAI",
    "twitter:title": template.title,
    "twitter:description": template.description,
    
    // Additional social meta
    "article:publisher": "https://evolvo-ai.replit.app",
    "article:section": "Technology",
    "article:tag": template.hashtags.replace(/^#/, '').split(' #').join(', '),
    
    // App-specific meta
    "al:web:url": "https://evolvo-ai.replit.app",
    "al:ios:app_name": "Evolvo AI",
    "al:android:app_name": "Evolvo AI",
    
    // Pinterest
    "pin:description": template.description,
    
    // LinkedIn
    "linkedin:owner": "company/evolvoai"
  };
};

// Viral content keywords
export const viralKeywords = {
  uz: [
    "O'zbekistonda birinchi",
    "eng kuchli AI",
    "revolyutsion texnologiya", 
    "biznesni o'zgartiruvchi",
    "innovatsion yechim",
    "professional AI",
    "yuqori sifatli xizmat",
    "ishonchli partner"
  ],
  ru: [
    "первый в Узбекистане",
    "самый мощный ИИ",
    "революционная технология",
    "меняющий бизнес",
    "инновационное решение",
    "профессиональный AI",
    "высококачественный сервис",
    "надежный партнер"
  ],
  en: [
    "first in Uzbekistan",
    "most powerful AI",
    "revolutionary technology",
    "business-changing",
    "innovative solution",
    "professional AI",
    "high-quality service",
    "reliable partner"
  ]
};