import { Router } from 'express';
import multer from 'multer';
import { createContact, getContacts, updateOutreach } from '../controllers/contacts';

const router = Router();

// FIX: Vercel only allows writing to '/tmp' directory
const upload = multer({ dest: '/tmp' });

// 1. Create Lead (Text Only)
router.post('/', createContact);

// 2. Get Leads
router.get('/', getContacts);

// 3. Upload Outreach Assets (Images + Captions)
const uploadFields = upload.fields([
  { name: 'img1', maxCount: 1 },
  { name: 'img2', maxCount: 1 },
  { name: 'img3', maxCount: 1 }
]);

router.put('/:id/outreach', uploadFields, updateOutreach);

export default router;