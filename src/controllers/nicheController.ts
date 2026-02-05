import { Request, Response } from 'express';
import { nicheService } from '../services/nicheService';

export const getNiches = async (req: Request, res: Response) => {
  try {
    const data = await nicheService.getAllNiches();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch niches' });
  }
};

export const createNiche = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    
    const data = await nicheService.createNiche(name);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create niche' });
  }
};
