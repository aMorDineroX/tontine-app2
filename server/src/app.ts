import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

export default app;

