import { db } from '../config/database';
import { contacts } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const contactService = {
  // 1. Create Contact
  async createContact(data: { name: string; phone: string; nicheId: number; socialLink: string; notes?: string }) {
    const [result] = await db.insert(contacts).values({
      name: data.name,
      phoneNumber: data.phone,
      nicheId: data.nicheId,
      socialLink: data.socialLink,
      notes: data.notes,
      status: 'pending' 
    });
    const newContact = await db.select().from(contacts).where(eq(contacts.id, result.insertId));
    return newContact[0];
  },

  // 2. Update Assets
  async updateOutreachAssets(contactId: number, data: {
    msg1_text?: string; 
    msg2_text?: string; path2?: string;
    msg3_text?: string; path3?: string;
    msg4_text?: string; path4?: string;
  }) {
    const updateData: any = {
      msg1_text: data.msg1_text,
      msg2_text: data.msg2_text,
      msg3_text: data.msg3_text,
      msg4_text: data.msg4_text,
    };

    if (data.path2) {
      const res = await cloudinary.uploader.upload(data.path2, { folder: 'outreach' });
      updateData.msg2_image = res.secure_url;
    }
    if (data.path3) {
      const res = await cloudinary.uploader.upload(data.path3, { folder: 'outreach' });
      updateData.msg3_image = res.secure_url;
    }
    if (data.path4) {
      const res = await cloudinary.uploader.upload(data.path4, { folder: 'outreach' });
      updateData.msg4_image = res.secure_url;
    }

    await db.update(contacts).set(updateData).where(eq(contacts.id, contactId));
    
    const updated = await db.select().from(contacts).where(eq(contacts.id, contactId));
    return updated[0];
  },

  // 3. Update Status
  async updateStatus(contactId: number, status: 'pending' | 'replied' | 'ignored' | 'successful') {
    await db.update(contacts).set({ status }).where(eq(contacts.id, contactId));
    const updated = await db.select().from(contacts).where(eq(contacts.id, contactId));
    return updated[0];
  },

  async getAllContacts() { return await db.select().from(contacts); },
  async getContactsByNiche(nicheId: number) { return await db.select().from(contacts).where(eq(contacts.nicheId, nicheId)); }
};
