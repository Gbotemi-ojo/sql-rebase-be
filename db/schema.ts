import { mysqlTable, serial, varchar, text, timestamp, bigint, mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

// --- Niches Table ---
export const niches = mysqlTable('niches', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// --- Contacts Table ---
export const contacts = mysqlTable('contacts', {
  id: serial('id').primaryKey(),
  
  // FIXED: Changed from int() to bigint() with unsigned: true to match the serial() ID
  nicheId: bigint('niche_id', { mode: 'number', unsigned: true })
    .references(() => niches.id)
    .notNull(),
    
  name: varchar('name', { length: 255 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 50 }).notNull(),
  socialLink: text('social_link').notNull(),
  
  status: mysqlEnum('status', ['pending', 'replied', 'ignored', 'successful']).default('pending'),
  notes: text('notes'),

  // Outreach Assets
  msg1_image: text('msg1_image'),
  msg1_text: text('msg1_text'),
  msg2_image: text('msg2_image'),
  msg2_text: text('msg2_text'),
  msg3_image: text('msg3_image'),
  msg3_text: text('msg3_text'),

  createdAt: timestamp('created_at').defaultNow(),
});

// --- Relations ---
export const nichesRelations = relations(niches, ({ many }) => ({
  contacts: many(contacts),
}));

export const contactsRelations = relations(contacts, ({ one }) => ({
  niche: one(niches, {
    fields: [contacts.nicheId],
    references: [niches.id],
  }),
}));
