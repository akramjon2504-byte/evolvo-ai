import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
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

  const httpServer = createServer(app);
  return httpServer;
}
