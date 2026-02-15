import { Router } from 'express';
import multer from 'multer';
import { createContact, getContacts, updateOutreach, updateStatus, updateNiche } from '../controllers/contacts';

const router = Router();
const upload = multer({ dest: '/tmp' });

router.post('/', createContact);
router.get('/', getContacts);

const uploadFields = upload.fields([
  { name: 'img2', maxCount: 1 },
  { name: 'img3', maxCount: 1 },
  { name: 'img4', maxCount: 1 }
]);

router.put('/:id/outreach', uploadFields, updateOutreach);
router.patch('/:id/status', updateStatus);

// NEW: Route for updating the niche
router.patch('/:id/niche', updateNiche);

export default router;
