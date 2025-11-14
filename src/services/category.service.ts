import { db } from '../config/database';
import { categories } from '../../db/schema';
import { eq } from 'drizzle-orm';

// Define the shape of a new category
type NewCategory = typeof categories.$inferInsert;

// Get all categories
const getAll = () => {
  return db.select().from(categories).orderBy(categories.name);
};

// Create a new category
const create = (category: NewCategory) => {
  return db.insert(categories).values(category);
};

// Update an existing category
const update = (id: number, category: Partial<NewCategory>) => {
  return db.update(categories).set(category).where(eq(categories.id, id));
};

// Delete a category
const remove = (id: number) => {
  // Note: For a real app, you'd add a check here to prevent deleting
  // a category that still has businesses associated with it.
  return db.delete(categories).where(eq(categories.id, id));
};

export const categoryService = { getAll, create, update, remove };
