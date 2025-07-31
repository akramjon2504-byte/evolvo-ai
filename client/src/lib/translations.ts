export const translations = {
  uz: {
    // Navigation
    nav: {
      home: "Bosh sahifa",
      services: "Xizmatlar", 
      solutions: "Yechimlar",
      about: "Biz haqimizda",
      blog: "Blog",
      contact: "Aloqa",
      consultation: "Bepul maslahat"
    },
    // Hero Section
    hero: {
      title: "O'zbekistonda",
      titleHighlight: "Biznes Raqamlashtiruvi",
      titleEnd: "va Sun'iy Intellekt",
      subtitle: "Zamonaviy AI texnologiyalari yordamida biznesingizni raqamlashtiring. Evolvo AI bilan samaradorlikni oshiring va raqobatda ustunlik qozon.",
      getConsultation: "Bepul maslahat olish",
      viewSolutions: "Yechimlarni ko'rish",
      stats: {
        clients: "Mijozlar",
        satisfaction: "Mamnunlik", 
        support: "Qo'llab-quvvatlash"
      }
    },
    // Services
    services: {
      title: "Bizning Xizmatlarimiz",
      subtitle: "O'zbekiston bozorida biznes raqamlashtiruvi uchun keng ko'lamli AI yechimlar va professional xizmatlar",
      readMore: "Batafsil"
    },
    // Contact
    contact: {
      title: "Biz Bilan Bog'laning",
      subtitle: "Loyihangizni muhokama qilish uchun bepul maslahat oling",
      info: "Aloqa Ma'lumotlari",
      phone: "Telefon",
      email: "Email",
      address: "Manzil",
      social: "Ijtimoiy Tarmoqlar",
      form: {
        name: "Ism Familiya",
        namePlaceholder: "Ismingizni kiriting",
        email: "Email",
        emailPlaceholder: "email@example.com",
        phone: "Telefon",
        phonePlaceholder: "+998 (90) 123-45-67",
        company: "Kompaniya",
        companyPlaceholder: "Kompaniya nomi",
        message: "Xabar",
        messagePlaceholder: "Loyihangiz haqida batafsil yozing...",
        submit: "Xabar Yuborish",
        success: "Xabaringiz muvaffaqiyatli yuborildi!",
        error: "Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring."
      }
    }
  },
  ru: {
    nav: {
      home: "Главная",
      services: "Услуги",
      solutions: "Решения", 
      about: "О нас",
      blog: "Блог",
      contact: "Контакты",
      consultation: "Бесплатная консультация"
    },
    hero: {
      title: "Цифровизация бизнеса",
      titleHighlight: "в Узбекистане",
      titleEnd: "и искусственный интеллект",
      subtitle: "Цифровизируйте свой бизнес с помощью современных AI-технологий. Повышайте эффективность и получайте конкурентные преимущества с Evolvo AI.",
      getConsultation: "Получить бесплатную консультацию",
      viewSolutions: "Посмотреть решения",
      stats: {
        clients: "Клиентов",
        satisfaction: "Удовлетворенность",
        support: "Поддержка"
      }
    },
    services: {
      title: "Наши Услуги",
      subtitle: "Комплексные AI-решения и профессиональные услуги для цифровизации бизнеса на рынке Узбекистана",
      readMore: "Подробнее"
    },
    contact: {
      title: "Свяжитесь с Нами",
      subtitle: "Получите бесплатную консультацию для обсуждения вашего проекта",
      info: "Контактная Информация",
      phone: "Телефон", 
      email: "Email",
      address: "Адрес",
      social: "Социальные Сети",
      form: {
        name: "Имя Фамилия",
        namePlaceholder: "Введите ваше имя",
        email: "Email",
        emailPlaceholder: "email@example.com",
        phone: "Телефон",
        phonePlaceholder: "+998 (90) 123-45-67",
        company: "Компания",
        companyPlaceholder: "Название компании",
        message: "Сообщение", 
        messagePlaceholder: "Подробно опишите ваш проект...",
        submit: "Отправить Сообщение",
        success: "Ваше сообщение успешно отправлено!",
        error: "Произошла ошибка. Пожалуйста, попробуйте еще раз."
      }
    }
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      solutions: "Solutions",
      about: "About Us", 
      blog: "Blog",
      contact: "Contact",
      consultation: "Free Consultation"
    },
    hero: {
      title: "Business Digitalization",
      titleHighlight: "in Uzbekistan",
      titleEnd: "and Artificial Intelligence", 
      subtitle: "Digitalize your business with modern AI technologies. Increase efficiency and gain competitive advantages with Evolvo AI.",
      getConsultation: "Get Free Consultation",
      viewSolutions: "View Solutions",
      stats: {
        clients: "Clients",
        satisfaction: "Satisfaction",
        support: "Support"
      }
    },
    services: {
      title: "Our Services",
      subtitle: "Comprehensive AI solutions and professional services for business digitalization in the Uzbekistan market",
      readMore: "Read More"
    },
    contact: {
      title: "Contact Us",
      subtitle: "Get a free consultation to discuss your project",
      info: "Contact Information",
      phone: "Phone",
      email: "Email", 
      address: "Address",
      social: "Social Networks",
      form: {
        name: "Full Name",
        namePlaceholder: "Enter your name",
        email: "Email",
        emailPlaceholder: "email@example.com", 
        phone: "Phone",
        phonePlaceholder: "+998 (90) 123-45-67",
        company: "Company",
        companyPlaceholder: "Company name",
        message: "Message",
        messagePlaceholder: "Describe your project in detail...",
        submit: "Send Message",
        success: "Your message has been sent successfully!",
        error: "An error occurred. Please try again."
      }
    }
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.uz;
