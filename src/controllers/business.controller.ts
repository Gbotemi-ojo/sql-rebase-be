import type { Request, Response } from 'express';
import { businessService } from '../services/business.service';

async function createBusinessBatch(req: Request, res: Response) {
  // 1. Destructure categoryId and businesses from the request body
  const { categoryId, businesses: incomingBusinesses } = req.body;

  // 2. Add validation for the new categoryId field
  if (!categoryId) {
    return res.status(400).json({ error: 'A categoryId is required.' });
  }

  if (!Array.isArray(incomingBusinesses) || incomingBusinesses.length === 0) {
    return res.status(400).json({ error: 'Request body must include a non-empty array of businesses.' });
  }

  try {
    // 3. Pass both the businesses and the categoryId to the service
    const result = await businessService.processBusinessBatch(incomingBusinesses, categoryId);

    // Send a successful response (this part is unchanged)
    res.status(201).json({
      message: `Processed ${incomingBusinesses.length} businesses.`,
      added: result.addedCount,
      skipped: result.skippedCount,
      skippedDetails: result.skippedDetails,
    });
  } catch (error) {
    console.error('Error in business controller:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}
const getAllBusinesses = async (req: Request, res: Response) => {
  try {
    const businesses = await businessService.getAll();
    res.status(200).json(businesses);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ error: 'Failed to fetch businesses' });
  }
};

const updateBusinessStatus = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (status !== 'New' && status !== 'Messaged') {
      return res.status(400).json({ error: "Invalid status provided. Must be 'New' or 'Messaged'." });
    }

    await businessService.updateStatus(id, status);
    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating business status:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
};

export const businessController = {
  createBusinessBatch,getAllBusinesses,updateBusinessStatus
};
