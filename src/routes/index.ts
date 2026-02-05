import { Router } from 'express';
import contactRoutes from './contact.routes';
import nicheRoutes from './niche.routes'; // Import this

const router = Router();

router.get("/health", (req, res) => {
  res.json({ message: "Outreach API is healthy!" });
});

router.use('/contacts', contactRoutes);
router.use('/niches', nicheRoutes); // Mount this

export default router;
