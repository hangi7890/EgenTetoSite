import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const personalityTypes = pgTable("personality_types", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'egen-male', 'egen-female', 'teto-male', 'teto-female'
  name: text("name").notNull(),
  description: text("description").notNull(),
  characteristics: text("characteristics").array().notNull(),
});

export const compatibilityAnalysis = pgTable("compatibility_analysis", {
  id: serial("id").primaryKey(),
  type1: text("type1").notNull(),
  type2: text("type2").notNull(),
  friendshipTraits: text("friendship_traits").array().notNull(),
  romanceTraits: text("romance_traits").array().notNull(),
});

export const insertPersonalityTypeSchema = createInsertSchema(personalityTypes).omit({
  id: true,
});

export const insertCompatibilityAnalysisSchema = createInsertSchema(compatibilityAnalysis).omit({
  id: true,
});

export type PersonalityType = typeof personalityTypes.$inferSelect;
export type InsertPersonalityType = z.infer<typeof insertPersonalityTypeSchema>;
export type CompatibilityAnalysis = typeof compatibilityAnalysis.$inferSelect;
export type InsertCompatibilityAnalysis = z.infer<typeof insertCompatibilityAnalysisSchema>;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
