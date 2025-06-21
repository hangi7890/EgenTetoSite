import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get personality types
  app.get("/api/personality-types", async (req, res) => {
    try {
      const types = await storage.getPersonalityTypes();
      res.json(types);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch personality types" });
    }
  });

  // Get compatibility analysis
  app.get("/api/compatibility", async (req, res) => {
    try {
      const compatibility = await storage.getCompatibilityAnalysis();
      res.json(compatibility);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch compatibility data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
