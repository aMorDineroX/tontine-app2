import { Router } from 'express';
import authRoutes from '../src/routes/auth.routes';

const router = Router();

router.use('/auth', authRoutes);
// Ajouter d'autres routes ici

export default router;
