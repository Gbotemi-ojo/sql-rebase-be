// src/routes/index.ts
import { Router } from 'express';
import businessRoutes from './business.routes';
import categoryRoutes from './category.routes';

const router = Router();

// Health Check Endpoint
router.get("/health", (req, res) => {
  res.json({ message: "Business API is healthy and running!" });
});

// Mount the business routes under the '/businesses' path
router.use('/businesses', businessRoutes);
router.use('/categories', categoryRoutes);

// You can add other route modules here in the future
// For example: router.use('/users', userRoutes);

export default router;