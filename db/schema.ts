import { mysqlTable, serial, varchar, text, timestamp, bigint, mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const niches = mysqlTable('niches', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const contacts = mysqlTable('contacts', {
  id: serial('id').primaryKey(),
  nicheId: bigint('niche_id', { mode: 'number', unsigned: true }).references(() => niches.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 50 }).notNull(),
  socialLink: text('social_link').notNull(),
  status: mysqlEnum('status', ['pending', 'replied', 'ignored', 'successful']).default('pending'),
  notes: text('notes'),

  // --- UPDATED OUTREACH ASSETS (1 Text + 3 Images) ---
  // Msg 1: Opener (Text Only)
  msg1_text: text('msg1_text'),

  // Msg 2: Pitch (Image + Text)
  msg2_image: text('msg2_image'),
  msg2_text: text('msg2_text'),

  // Msg 3: Follow Up (Image + Text)
  msg3_image: text('msg3_image'),
  msg3_text: text('msg3_text'),

  // Msg 4: Closing (Image + Text) - NEW
  msg4_image: text('msg4_image'),
  msg4_text: text('msg4_text'),

  createdAt: timestamp('created_at').defaultNow(),
});

export const nichesRelations = relations(niches, ({ many }) => ({
  contacts: many(contacts),
}));

export const contactsRelations = relations(contacts, ({ one }) => ({
  niche: one(niches, {
    fields: [contacts.nicheId],
    references: [niches.id],
  }),
}));
