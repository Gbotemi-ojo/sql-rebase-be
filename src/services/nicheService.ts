import { db } from '../config/database';
import { niches } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const nicheService = {
  // Get all niches
  async getAllNiches() {
    return await db.select().from(niches);
  },

  // Create a new niche
  async createNiche(name: string) {
    const [result] = await db.insert(niches).values({ name });
    // Return the new niche
    const newNiche = await db.select().from(niches).where(eq(niches.id, result.insertId));
    return newNiche[0];
  }
};
