import { Router } from 'express';
import { getNiches, createNiche } from '../controllers/nicheController';

const router = Router();

router.get('/', getNiches);
router.post('/', createNiche);

export default router;
