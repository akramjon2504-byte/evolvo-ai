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
      }
    ];

    testimonialsData.forEach(testimonial => this.createTestimonial(testimonial));

    // Initialize blog posts
    const blogPostsData: InsertBlogPost[] = [
      {
        title: "2025-yilda AI Texnologiyalarining Rivojlanish Tendensiyalari",
        content: "Kelgusi yilda sun'iy intellekt sohasida kutilayotgan eng muhim o'zgarishlar va innovatsiyalar haqida batafsil ma'lumot...",
        excerpt: "Kelgusi yilda sun'iy intellekt sohasida kutilayotgan eng muhim o'zgarishlar va innovatsiyalar haqida...",
        author: "Evolvo AI Team",
        category: "AI Trends",
        language: "uz",
        published: true
      },
      {
        title: "O'zbekistonda Biznes Raqamlashtiruv: Muvaffaqiyat Qoidalari",
        content: "Mahalliy biznes uchun raqamli transformatsiyani muvaffaqiyatli amalga oshirish bo'yicha maslahatlar...",
        excerpt: "Mahalliy biznes uchun raqamli transformatsiyani muvaffaqiyatli amalga oshirish bo'yicha maslahatlar...",
        author: "Evolvo AI Team",
        category: "Digital Transformation",
        language: "uz",
        published: true
      },
      {
        title: "Machine Learning: Biznesda Qo'llash Imkoniyatlari",
        content: "ML algoritmlari yordamida biznes jarayonlarini optimallashtirishning amaliy usullari...",
        excerpt: "ML algoritmlari yordamida biznes jarayonlarini optimallashtirishning amaliy usullari...",
        author: "Evolvo AI Team",
        category: "Machine Learning",
        language: "uz",
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
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }

  async getTestimonials(language?: string): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values())
      .filter(testimonial => !language || testimonial.language === language);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();
