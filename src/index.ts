import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

import { testDatabaseConnection } from './config/database';
import apiRoutes from './routes';

dotenv.config();

const app = express();

// Set default prefix
const API_PREFIX = process.env.API_PREFIX || '/';

app.use(helmet());

// Update CORS to allow requests from your frontend
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(morgan('dev'));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 500,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(API_PREFIX, apiLimiter);

// Mount all routes
app.use(API_PREFIX, apiRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

// CRITICAL FIX FOR VERCEL: 
// Only run app.listen locally. In production, Vercel exports the app.
if (process.env.NODE_ENV !== 'production') {
  testDatabaseConnection()
    .then(() => {
      console.log("Database connection test completed successfully.");
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch(error => {
      console.error("Database connection test FAILED:", error);
    });
}

export default app;
