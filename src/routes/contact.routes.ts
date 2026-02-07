import { Router } from 'express';
import multer from 'multer';
import { createContact, getContacts, updateOutreach, updateStatus } from '../controllers/contacts';

const router = Router();
const upload = multer({ dest: '/tmp' });

// 1. Create Lead (Text Only)
router.post('/', createContact);

// 2. Get Leads
router.get('/', getContacts);

// 3. Upload Outreach Assets (Images + Captions)
const uploadFields = upload.fields([
  { name: 'img2', maxCount: 1 },
  { name: 'img3', maxCount: 1 },
  { name: 'img4', maxCount: 1 }
]);

router.put('/:id/outreach', uploadFields, updateOutreach);

// 4. Update Status Only
router.patch('/:id/status', updateStatus);

export default router;