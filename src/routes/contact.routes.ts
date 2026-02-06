import { Router } from 'express';
import multer from 'multer';
import { createContact, getContacts, updateOutreach } from '../controllers/contacts';

const router = Router();
const upload = multer({ dest: '/tmp' }); // Keep /tmp for Vercel

router.post('/', createContact);
router.get('/', getContacts);

// UPDATED: Accept images for Msg 2, 3, and 4
const uploadFields = upload.fields([
  { name: 'img2', maxCount: 1 },
  { name: 'img3', maxCount: 1 },
  { name: 'img4', maxCount: 1 }
]);

router.put('/:id/outreach', uploadFields, updateOutreach);

export default router;
