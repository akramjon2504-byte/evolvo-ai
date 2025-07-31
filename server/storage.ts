import { type User, type InsertUser, type Contact, type InsertContact, type BlogPost, type InsertBlogPost, type Service, type InsertService, type Testimonial, type InsertTestimonial } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getContact(id: string): Promise<Contact | undefined>;
  markContactAsRead(id: string): Promise<Contact | undefined>;
  
  getBlogPosts(language?: string): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  getServices(language?: string): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  
  getTestimonials(language?: string): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private blogPosts: Map<string, BlogPost>;
  private services: Map<string, Service>;
  private testimonials: Map<string, Testimonial>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.blogPosts = new Map();
    this.services = new Map();
    this.testimonials = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Initialize services
    const servicesData: InsertService[] = [
      {
        title: "AI Avtomatlashtiruv",
        description: "Biznes jarayonlarini sun'iy intellekt yordamida avtomatlashtiring va vaqtingizni tejang.",
        icon: "fas fa-robot",
        color: "evolvo-blue",
        features: ["Jarayonlar avtomatlashtiruvi", "Vaqt tejash", "Xatoliklarni kamaytirish"],
        language: "uz"
      },
      {
        title: "Raqamli Transformatsiya",
        description: "An'anaviy biznesingizni zamonaviy raqamli platforma bilan jihozlang.",
        icon: "fas fa-digital-tachograph",
        color: "evolvo-light-blue",
        features: ["Raqamli yechimlar", "Zamonaviy platformalar", "Biznes optimizatsiyasi"],
        language: "uz"
      },
      {
        title: "Machine Learning",
        description: "Ma'lumotlardan qimmatli insight olish va bashorat qilish uchun ML yechimlari.",
        icon: "fas fa-brain",
        color: "evolvo-success",
        features: ["Bashorat modellari", "Ma'lumotlar tahlili", "Insight olish"],
        language: "uz"
      },
      {
        title: "AI Chatbot",
        description: "Mijozlar bilan 24/7 aloqa qilish uchun aqlli chatbot yechimlari.",
        icon: "fas fa-comments",
        color: "evolvo-warning",
        features: ["24/7 qo'llab-quvvatlash", "Avtomatik javoblar", "Mijozlar xizmati"],
        language: "uz"
      },
      {
        title: "Business Analytics",
        description: "Biznes ko'rsatkichlarini tahlil qilish va to'g'ri qarorlar qabul qilish.",
        icon: "fas fa-chart-bar",
        color: "purple-600",
        features: ["Ma'lumotlar tahlili", "Hisobotlar", "Qarorlar qo'llab-quvvatlash"],
        language: "uz"
      },
      {
        title: "Kiberxavfsizlik",
        description: "AI yordamida kiberxavfsizlikni kuchaytirish va himoya qilish.",
        icon: "fas fa-shield-alt",
        color: "red-600",
        features: ["Xavfsizlik tahlili", "Tahdidlarni aniqlash", "Himoya tizimi"],
        language: "uz"
      },
      // Russian services
      {
        title: "AI-автоматизация",
        description: "Автоматизируйте бизнес-процессы с помощью искусственного интеллекта и экономьте время.",
        icon: "fas fa-robot",
        color: "evolvo-blue",
        features: ["Автоматизация процессов", "Экономия времени", "Снижение ошибок"],
        language: "ru"
      },
      {
        title: "Цифровая трансформация",
        description: "Оснастите свой традиционный бизнес современной цифровой платформой.",
        icon: "fas fa-digital-tachograph",
        color: "evolvo-light-blue",
        features: ["Цифровые решения", "Современные платформы", "Оптимизация бизнеса"],
        language: "ru"
      },
      {
        title: "Машинное обучение",
        description: "ML-решения для получения ценных инсайтов из данных и прогнозирования.",
        icon: "fas fa-brain",
        color: "evolvo-success",
        features: ["Прогнозные модели", "Анализ данных", "Получение инсайтов"],
        language: "ru"
      },
      // English services
      {
        title: "AI Automation",
        description: "Automate business processes with artificial intelligence and save time.",
        icon: "fas fa-robot",
        color: "evolvo-blue",
        features: ["Process automation", "Time saving", "Error reduction"],
        language: "en"
      },
      {
        title: "Digital Transformation",
        description: "Equip your traditional business with a modern digital platform.",
        icon: "fas fa-digital-tachograph",
        color: "evolvo-light-blue",
        features: ["Digital solutions", "Modern platforms", "Business optimization"],
        language: "en"
      },
      {
        title: "Machine Learning",
        description: "ML solutions for gaining valuable insights from data and forecasting.",
        icon: "fas fa-brain",
        color: "evolvo-success",
        features: ["Predictive models", "Data analysis", "Insight extraction"],
        language: "en"
      }
    ];

    servicesData.forEach(service => this.createService(service));

    // Initialize testimonials
    const testimonialsData: InsertTestimonial[] = [
      {
        name: "Akmal Karimov",
        position: "CEO",
        company: "TechMart",
        content: "Evolvo AI yordamida bizning savdo jarayonlarimiz butunlay o'zgardi. Endi mijozlarni tushunish va xizmat ko'rsatish ancha oson.",
        rating: "5",
        language: "uz"
      },
      {
        name: "Dilnoza Rahimova",
        position: "Direktor",
        company: "Digital Plus",
        content: "AI chatbot joriy etganimizdan keyin mijozlar mamnunligi 90% ga ko'tarildi. Ajoyib yechim!",
        rating: "5",
        language: "uz"
      },
      {
        name: "Sardor Toshmatov",
        position: "Menejer",
        company: "LogiTrans",
        content: "Logistika optimizatsiyasi bizga millionlab so'm tejash imkonini berdi. Professional jamoa!",
        rating: "5",
        language: "uz"
      },
      // Russian testimonials
      {
        name: "Акмал Каримов",
        position: "CEO",
        company: "TechMart",
        content: "Благодаря Evolvo AI наши торговые процессы полностью изменились. Теперь понимать и обслуживать клиентов намного легче.",
        rating: "5",
        language: "ru"
      },
      {
        name: "Дильноза Рахимова",
        position: "Директор",
        company: "Digital Plus",
        content: "После внедрения AI-чатбота удовлетворенность клиентов выросла до 90%. Отличное решение!",
        rating: "5",
        language: "ru"
      },
      // English testimonials
      {
        name: "Akmal Karimov",
        position: "CEO",
        company: "TechMart",
        content: "With the help of Evolvo AI, our sales processes have completely changed. Understanding and serving customers is now much easier.",
        rating: "5",
        language: "en"
      },
      {
        name: "Dilnoza Rahimova",
        position: "Director",
        company: "Digital Plus",
        content: "After implementing the AI chatbot, customer satisfaction increased to 90%. Excellent solution!",
        rating: "5",
        language: "en"
      }
    ];

    testimonialsData.forEach(testimonial => this.createTestimonial(testimonial));

    // Initialize blog posts
    const blogPostsData: InsertBlogPost[] = [
      {
        title: "2025-yilda AI Texnologiyalarining Rivojlanish Tendensiyalari",
        content: "Kelgusi yilda sun'iy intellekt sohasida kutilayotgan eng muhim o'zgarishlar va innovatsiyalar haqida batafsil ma'lumot. AI texnologiyalari hozirgi kunda biznes jarayonlarini tubdan o'zgartirib, yangi imkoniyatlar yaratmoqda.",
        excerpt: "Kelgusi yilda sun'iy intellekt sohasida kutilayotgan eng muhim o'zgarishlar va innovatsiyalar haqida",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        author: "Evolvo AI Team",
        category: "AI Trends",
        language: "uz",
        published: true
      },
      {
        title: "O'zbekistonda Biznes Raqamlashtiruv: Muvaffaqiyat Qoidalari",
        content: "Mahalliy biznes uchun raqamli transformatsiyani muvaffaqiyatli amalga oshirish bo'yicha maslahatlar. Zamonaviy texnologiyalar yordamida biznesingizni yangi bosqichga olib chiqing.",
        excerpt: "Mahalliy biznes uchun raqamli transformatsiyani muvaffaqiyatli amalga oshirish bo'yicha maslahatlar",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        author: "Evolvo AI Team",
        category: "Digital Transformation",
        language: "uz",
        published: true
      },
      {
        title: "Machine Learning: Biznesda Qo'llash Imkoniyatlari",
        content: "ML algoritmlari yordamida biznes jarayonlarini optimallashtirishning amaliy usullari. Ma'lumotlardan qimmatli insight olish va bashorat qilish imkoniyatlari.",
        excerpt: "ML algoritmlari yordamida biznes jarayonlarini optimallashtirishning amaliy usullari",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        author: "Evolvo AI Team",
        category: "Machine Learning",
        language: "uz",
        published: true
      },
      // Russian posts
      {
        title: "Тенденции развития AI-технологий в 2025 году",
        content: "Подробная информация о самых важных изменениях и инновациях, ожидаемых в сфере искусственного интеллекта в следующем году. AI-технологии сегодня кардинально меняют бизнес-процессы и создают новые возможности.",
        excerpt: "Подробная информация о самых важных изменениях и инновациях в сфере искусственного интеллекта",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        author: "Evolvo AI Team",
        category: "AI Trends",
        language: "ru",
        published: true
      },
      {
        title: "Цифровизация бизнеса в Узбекистане: Правила успеха",
        content: "Советы по успешному осуществлению цифровой трансформации для местного бизнеса. Выведите свой бизнес на новый уровень с помощью современных технологий.",
        excerpt: "Советы по успешному осуществлению цифровой трансформации для местного бизнеса",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        author: "Evolvo AI Team",
        category: "Digital Transformation",
        language: "ru",
        published: true
      },
      // English posts
      {
        title: "AI Technology Development Trends in 2025",
        content: "Detailed information about the most important changes and innovations expected in the field of artificial intelligence next year. AI technologies are fundamentally changing business processes and creating new opportunities today.",
        excerpt: "Detailed information about the most important changes and innovations expected in artificial intelligence",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        author: "Evolvo AI Team",
        category: "AI Trends",
        language: "en",
        published: true
      },
      {
        title: "Business Digitalization in Uzbekistan: Success Rules",
        content: "Advice on successfully implementing digital transformation for local businesses. Take your business to the next level with modern technologies.",
        excerpt: "Advice on successfully implementing digital transformation for local businesses",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        author: "Evolvo AI Team",
        category: "Digital Transformation",
        language: "en",
        published: true
      }
    ];

    blogPostsData.forEach(post => this.createBlogPost(post));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact,
      phone: insertContact.phone || null,
      company: insertContact.company || null,
      language: insertContact.language || null,
      id, 
      createdAt: new Date(),
      isRead: false 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getContact(id: string): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async markContactAsRead(id: string): Promise<Contact | undefined> {
    const contact = this.contacts.get(id);
    if (contact) {
      contact.isRead = true;
      this.contacts.set(id, contact);
    }
    return contact;
  }

  async getBlogPosts(language?: string): Promise<BlogPost[]> {
    const posts = Array.from(this.blogPosts.values())
      .filter(post => post.published && (!language || post.language === language))
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
    return posts;
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = { 
      ...insertPost,
      image: insertPost.image || null,
      excerpt: insertPost.excerpt || null,
      category: insertPost.category || null,
      language: insertPost.language || null,
      published: insertPost.published || null,
      id, 
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async getServices(language?: string): Promise<Service[]> {
    return Array.from(this.services.values())
      .filter(service => !language || service.language === language);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { 
      ...insertService,
      color: insertService.color || null,
      language: insertService.language || null,
      features: insertService.features || null,
      id 
    };
    this.services.set(id, service);
    return service;
  }

  async getTestimonials(language?: string): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values())
      .filter(testimonial => !language || testimonial.language === language);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { 
      ...insertTestimonial,
      language: insertTestimonial.language || null,
      rating: insertTestimonial.rating || null,
      avatar: insertTestimonial.avatar || null,
      id 
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();
