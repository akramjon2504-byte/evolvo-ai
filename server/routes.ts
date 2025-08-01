import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { generateSitemap, generateRobotsTxt } from "./sitemap";

export async function registerRoutes(app: Express): Promise<Server> {
  // SEO: Sitemap endpoint (before other routes)
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const sitemap = await generateSitemap();
      res.header('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      console.error("❌ Sitemap generation error:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  // SEO: Robots.txt endpoint
  app.get("/robots.txt", async (req, res) => {
    try {
      const robotsTxt = await generateRobotsTxt();
      res.header('Content-Type', 'text/plain');
      res.send(robotsTxt);
    } catch (error) {
      console.error("❌ Robots.txt generation error:", error);
      res.status(500).send("Error generating robots.txt");
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);

      // Email marketing: Xush kelibsiz email yuborish
      try {
        const { emailMarketing } = await import("./email-marketing");
        await emailMarketing.sendWelcomeEmail(contact);
      } catch (error) {
        console.error("Xush kelibsiz email yuborishda xatolik:", error);
      }

      res.json({ success: true, data: contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, error: "Invalid form data", details: error.errors });
      } else {
        res.status(500).json({ success: false, error: "Internal server error" });
      }
    }
  });

  // Get contacts (admin)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json({ success: true, data: contacts });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  // Delete contact (admin)
  app.delete("/api/contacts/:id", async (req, res) => {
    try {
      await storage.deleteContact(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  // Get blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const language = req.query.lang as string;
      const posts = await storage.getBlogPosts(language);
      res.json({ success: true, data: posts });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  // Get single blog post
  app.get("/api/blog/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (!post) {
        res.status(404).json({ success: false, error: "Post not found" });
        return;
      }
      res.json({ success: true, data: post });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  // Create blog post (admin)
  app.post("/api/blog", async (req, res) => {
    try {
      // Validate required fields
      const { title, content, author, category, language } = req.body;
      
      if (!title || !content || !author || !category || !language) {
        res.status(400).json({ 
          success: false, 
          error: "Barcha majburiy maydonlar to'ldirilishi kerak" 
        });
        return;
      }

      const post = await storage.createBlogPost(req.body);
      res.json({ success: true, data: post });
    } catch (error) {
      console.error('Blog post yaratishda xatolik:', error);
      res.status(500).json({ success: false, error: "Maqola yaratishda xatolik yuz berdi" });
    }
  });

  // Update blog post (admin)
  app.patch("/api/blog/:id", async (req, res) => {
    try {
      const post = await storage.updateBlogPost(req.params.id, req.body);
      res.json({ success: true, data: post });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  // Get services
  app.get("/api/services", async (req, res) => {
    try {
      const language = req.query.lang as string;
      const services = await storage.getServices(language);
      res.json({ success: true, data: services });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  // Get testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const language = req.query.lang as string;
      const testimonials = await storage.getTestimonials(language);
      res.json({ success: true, data: testimonials });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  // RSS manual yuklash endpoint (admin)
  app.post("/api/rss/sync", async (req, res) => {
    try {
      const { rssAutoPoster } = await import("./rss-auto-poster");
      await rssAutoPoster.processRSSManually();
      res.json({ success: true, message: "RSS yuklash muvaffaqiyatli tugallandi" });
    } catch (error) {
      res.status(500).json({ success: false, error: "RSS yuklashda xatolik" });
    }
  });

  // Admin endpoints
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      const blogPosts = await storage.getAllBlogPosts();
      
      const stats = {
        totalContacts: contacts.length,
        totalViews: blogPosts.reduce((sum, post) => sum + (post.views || 0), 0),
        newMessages: contacts.filter(c => {
          const today = new Date();
          const contactDate = new Date(c.createdAt);
          return contactDate.toDateString() === today.toDateString();
        }).length,
        publishedPosts: blogPosts.filter(p => p.published).length,
        conversionRate: "4.8",
        activeUsers: Math.floor(Math.random() * 100) + 50
      };
      
      res.json({ success: true, data: stats });
    } catch (error) {
      console.error("Stats error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch stats" });
    }
  });

  app.get("/api/admin/users", async (req, res) => {
    try {
      const users = [
        {
          id: "1",
          username: "admin",
          email: "admin@evolvo-ai.uz",
          role: "admin",
          status: "active",
          lastLogin: new Date().toISOString(),
          createdAt: new Date().toISOString()
        }
      ];
      
      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch users" });
    }
  });

  app.get("/api/admin/analytics", async (req, res) => {
    try {
      const analytics = {
        pageViews: [
          { date: "2025-01-01", views: 1200, uniqueVisitors: 800 },
          { date: "2025-01-02", views: 1350, uniqueVisitors: 900 },
          { date: "2025-01-03", views: 1100, uniqueVisitors: 750 },
          { date: "2025-01-04", views: 1400, uniqueVisitors: 950 },
          { date: "2025-01-05", views: 1600, uniqueVisitors: 1100 },
          { date: "2025-01-06", views: 1800, uniqueVisitors: 1200 },
          { date: "2025-01-07", views: 2000, uniqueVisitors: 1300 }
        ],
        topPages: [
          { page: "/", views: 5420, bounceRate: 35 },
          { page: "/services", views: 3210, bounceRate: 42 },
          { page: "/blog", views: 2180, bounceRate: 28 },
          { page: "/contact", views: 1540, bounceRate: 65 },
          { page: "/pricing", views: 980, bounceRate: 38 }
        ],
        trafficSources: [
          { source: "Google", visitors: 4500, percentage: 45 },
          { source: "Direct", visitors: 2800, percentage: 28 },
          { source: "Social Media", visitors: 1500, percentage: 15 },
          { source: "Referral", visitors: 800, percentage: 8 },
          { source: "Email", visitors: 400, percentage: 4 }
        ],
        userBehavior: {
          avgSessionDuration: "2:34",
          bounceRate: 38,
          pagesPerSession: 3.2,
          newVsReturning: { new: 65, returning: 35 }
        },
        deviceStats: [
          { device: "Desktop", count: 6200, percentage: 62 },
          { device: "Mobile", count: 3100, percentage: 31 },
          { device: "Tablet", count: 700, percentage: 7 }
        ],
        geographics: [
          { country: "O'zbekiston", city: "Toshkent", visitors: 4500 },
          { country: "Rossiya", city: "Moskva", visitors: 1200 },
          { country: "Qozog'iston", city: "Almati", visitors: 800 }
        ]
      };
      
      res.json({ success: true, data: analytics });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch analytics" });
    }
  });

  app.get("/api/admin/content", async (req, res) => {
    try {
      const blogPosts = await storage.getAllBlogPosts();
      const content = blogPosts.map(post => ({
        id: post.id,
        title: post.title,
        type: "post",
        status: post.published ? "published" : "draft",
        author: post.author || "Admin",
        lastModified: post.updatedAt || post.createdAt,
        views: post.views || 0,
        featured: false,
        seoScore: Math.floor(Math.random() * 40) + 60
      }));
      
      res.json({ success: true, data: content });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch content" });
    }
  });

  app.get("/api/admin/settings", async (req, res) => {
    try {
      const settings = {
        general: {
          siteName: "Evolvo AI",
          siteDescription: "O'zbekistondagi etakchi AI kompaniyasi",
          adminEmail: "admin@evolvo-ai.uz",
          timezone: "Asia/Tashkent",
          language: "uz",
          maintenanceMode: false
        },
        seo: {
          googleAnalyticsId: "",
          googleTagManagerId: "",
          yandexMetrikaId: "",
          sitemapEnabled: true,
          robotsContent: "User-agent: *\nAllow: /"
        }
      };
      
      res.json({ success: true, data: settings });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch settings" });
    }
  });

  // Email marketing endpoints
  app.get("/api/admin/email-stats", async (req, res) => {
    try {
      const { emailMarketing } = await import("./email-marketing");
      const stats = await emailMarketing.getEmailStats();
      res.json({ success: true, data: stats });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch email stats" });
    }
  });

  app.post("/api/admin/send-marketing-emails", async (req, res) => {
    try {
      const { emailMarketing } = await import("./email-marketing");
      await emailMarketing.sendMarketingEmails();
      res.json({ success: true, message: "Marketing emails sent successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to send marketing emails" });
    }
  });

  // Telegram marketing endpoints
  app.get("/api/admin/telegram-stats", async (req, res) => {
    try {
      const { telegramMarketing } = await import("./telegram-marketing");
      const stats = telegramMarketing.getStats();
      const leads = telegramMarketing.getLeadStats();
      res.json({ 
        success: true, 
        data: { 
          ...stats, 
          leads: leads 
        } 
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch Telegram stats" });
    }
  });

  app.post("/api/admin/send-telegram-test", async (req, res) => {
    try {
      const { chatId, message } = req.body;
      const { telegramMarketing } = await import("./telegram-marketing");
      const result = await telegramMarketing.sendTestMessage(chatId, message);
      res.json({ success: result.success, message: result.message || result.error });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to send test message" });
    }
  });

  app.post("/api/admin/send-telegram-marketing", async (req, res) => {
    try {
      const { day } = req.body;
      const { telegramMarketing } = await import("./telegram-marketing");
      await telegramMarketing.sendMarketingMessage(day || 1);
      res.json({ success: true, message: "Telegram marketing messages sent successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to send Telegram marketing messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
