import { Router } from 'express';
import multer from 'multer';
import { createContact, getContacts, updateOutreach } from '../controllers/contacts';

const router = Router();

// Configure Multer (Temp storage for images)
const upload = multer({ dest: 'uploads/' });

// 1. Create Lead (Text Only)
router.post('/', createContact);

// 2. Get Leads
router.get('/', getContacts);

// 3. Upload Outreach Assets (Images + Captions)
// This was likely missing or causing the 404
const uploadFields = upload.fields([
  { name: 'img1', maxCount: 1 },
  { name: 'img2', maxCount: 1 },
  { name: 'img3', maxCount: 1 }
]);

// The :id matches the contact ID (e.g., /contacts/2/outreach)
router.put('/:id/outreach', uploadFields, updateOutreach);

export default router;
