import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Re-export auth models
export * from "./models/auth";

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  icon: text("icon").notNull(),
  imageUrl: text("image_url"),
});

export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  price: doublePrecision("price").notNull(),
  originalPrice: doublePrecision("original_price"),
  imageUrl: text("image_url"),
  categoryId: varchar("category_id").notNull(),
  rating: doublePrecision("rating").default(sql`4.5`),
  reviewCount: integer("review_count").default(sql`0`),
  inStock: boolean("in_stock").default(sql`true`),
  featured: boolean("featured").default(sql`false`),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export const cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").notNull(),
  quantity: integer("quantity").notNull().default(sql`1`),
  sessionId: varchar("session_id").notNull(),
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({ id: true });
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;

export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  healthTipsOptIn: boolean("health_tips_opt_in").default(sql`false`),
});

export const insertNewsletterSchema = createInsertSchema(newsletterSubscriptions).omit({ id: true });
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location"),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(sql`5`),
  avatarUrl: text("avatar_url"),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
