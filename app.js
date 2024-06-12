import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import debtRoutes from './routes/debtRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
// import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/debts', debtRoutes);
app.use('/api/admin', adminRoutes);

// app.use(errorHandler);

export default app;