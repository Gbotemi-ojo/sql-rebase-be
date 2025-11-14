// src/services/business.service.ts

import { sql, and, eq, gte, lte, desc, isNull, not, between, count, inArray } from 'drizzle-orm';
import { db } from '../config/database';
import { businesses } from '../../db/schema'; // Corrected import path

// Define a type for the businesses coming from the request
type IncomingBusiness = Omit<typeof businesses.$inferInsert, 'id' | 'categoryId'>;

// 1. Update the function to accept categoryId as an argument
async function processBusinessBatch(incomingBusinesses: IncomingBusiness[], categoryId: number) {
  const incomingNames = incomingBusinesses.map((b) => b.name).filter(Boolean) as string[];

  if (incomingNames.length === 0) {
    return { addedCount: 0, skippedCount: incomingBusinesses.length, skippedDetails: incomingBusinesses };
  }

  // Find existing records (this logic is unchanged)
  const existingRecords = await db
    .select({ name: businesses.name })
    .from(businesses)
    .where(inArray(businesses.name, incomingNames));

  const existingNames = new Set(existingRecords.map((r) => r.name));

  // 2. Map the categoryId to each new business before insertion
  const newBusinesses = incomingBusinesses
    .filter((b) => b.name && !existingNames.has(b.name))
    .map((b) => ({
      ...b,
      categoryId: categoryId, // Add the selected categoryId
    }));

  const skippedBusinesses = incomingBusinesses.filter((b) => !b.name || existingNames.has(b.name));

  let addedCount = 0;
  if (newBusinesses.length > 0) {
    const result = await db.insert(businesses).values(newBusinesses);
    // Attempt to read affectedRows if present on the driver result; otherwise fall back to the number of inserted records we attempted
    addedCount = (result as unknown as { affectedRows?: number }).affectedRows ?? newBusinesses.length;
  }

  return {
    addedCount,
    skippedCount: skippedBusinesses.length,
    skippedDetails: skippedBusinesses,
  };
}
const getAll = async () => {
  // Use db.query to easily join related tables
  const businessesWithCategories = await db.query.businesses.findMany({
    with: {
      category: true, // This will automatically join the category based on the relation
    },
    orderBy: (businesses, { desc }) => [desc(businesses.id)],
  });
  return businessesWithCategories;
};

const updateStatus = async (id: number, status: 'New' | 'Messaged') => {
  return db.update(businesses).set({ status }).where(eq(businesses.id, id));
};

export const businessService = {
  processBusinessBatch,getAll,updateStatus
};
