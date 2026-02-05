import { Request, Response } from 'express';
import { contactService } from '../services/contactService';

export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, phone, nicheId, socialLink, notes } = req.body;
    const result = await contactService.createContact({
      name,
      phone,
      nicheId: Number(nicheId),
      socialLink,
      notes
    });
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ success: false, error: 'Failed to create contact' });
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    const { nicheId } = req.query;
    const data = nicheId 
      ? await contactService.getContactsByNiche(Number(nicheId)) 
      : await contactService.getAllContacts();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch contacts' });
  }
};

// THIS FUNCTION MUST EXIST FOR THE ROUTE TO WORK
export const updateOutreach = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { msg1_text, msg2_text, msg3_text } = req.body;
    
    // Cast req.files to expected type
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const result = await contactService.updateOutreachAssets(Number(id), {
      msg1_text,
      msg2_text,
      msg3_text,
      path1: files['img1']?.[0]?.path,
      path2: files['img2']?.[0]?.path,
      path3: files['img3']?.[0]?.path,
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error updating outreach:', error);
    res.status(500).json({ success: false, error: 'Failed to update outreach assets' });
  }
};
