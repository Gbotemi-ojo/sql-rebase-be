import { Router } from 'express';
import { businessController } from '../controllers/business.controller';

const router = Router();
router.get('/', businessController.getAllBusinesses);
// Maps POST requests to /businesses/batch to the createBusinessBatch controller
router.post('/batch', businessController.createBusinessBatch);
router.patch('/:id/status', businessController.updateBusinessStatus);

export default router;
