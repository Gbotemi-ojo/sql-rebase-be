import { Request, Response } from 'express';
import { contactService } from '../services/contactService';

export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, phone, nicheId, socialLink, notes } = req.body;
    const result = await contactService.createContact({ name, phone, nicheId: Number(nicheId), socialLink, notes });
    res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    if (error.message === 'DUPLICATE_PHONE') return res.status(409).json({ success: false, error: 'This phone number is already saved in your leads.' });
    res.status(500).json({ success: false, error: 'Failed to create contact' });
  }
};

export const updateOutreach = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { msg1_text, msg2_text, msg3_text, msg4_text } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const result = await contactService.updateOutreachAssets(Number(id), {
      msg1_text, msg2_text, msg3_text, msg4_text,
      path2: files['img2']?.[0]?.path, path3: files['img3']?.[0]?.path, path4: files['img4']?.[0]?.path,
    });
    res.status(200).json({ success: true, data: result });
  } catch (error) { res.status(500).json({ success: false, error: 'Failed to update outreach assets' }); }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await contactService.updateStatus(Number(id), status);
    res.status(200).json({ success: true, data: result });
  } catch (error) { res.status(500).json({ success: false, error: 'Failed to update status' }); }
};

// NEW: Niche Update Handler
export const updateNiche = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nicheId } = req.body;
    
    const result = await contactService.updateNiche(Number(id), Number(nicheId));
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error updating niche:', error);
    res.status(500).json({ success: false, error: 'Failed to update niche' });
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    const { nicheId } = req.query;
    const data = nicheId ? await contactService.getContactsByNiche(Number(nicheId)) : await contactService.getAllContacts();
    res.status(200).json({ success: true, data });
  } catch (error) { res.status(500).json({ success: false, error: 'Failed to fetch contacts' }); }
};
