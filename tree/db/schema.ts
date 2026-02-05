import { mysqlTable, serial, varchar, text, int,mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

// 1. Create the new categories table
export const categories = mysqlTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

// 2. Update the businesses table
export const businesses = mysqlTable('businesses', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 50 }),
  website: text('website'),
  // Add the categoryId column to link to the categories table
  categoryId: int('category_id').notNull(),
  status: mysqlEnum('status', ['New', 'Messaged']).default('New').notNull(),
});

// 3. Define the relationship between the tables
export const categoryRelations = relations(categories, ({ many }) => ({
  businesses: many(businesses),
}));

export const businessRelations = relations(businesses, ({ one }) => ({
  category: one(categories, {
    fields: [businesses.categoryId],
    references: [categories.id],
  }),
}));
