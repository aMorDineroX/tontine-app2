import express from 'express';
import { createTontine, joinTontine, getTontines, makePayment } from '../controllers/tontine.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authMiddleware); // Protège toutes les routes

router.post('/', createTontine);
router.post('/:tontineId/join', joinTontine);
router.get('/', getTontines);
router.post('/:tontineId/payments', makePayment);

export default router;
