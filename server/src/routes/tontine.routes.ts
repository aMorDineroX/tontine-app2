import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { TontineController } from '../controllers/tontine.controller';

const router = express.Router();
const tontineController = new TontineController();

/**
 * @swagger
 * /tontines:
 *   post:
 *     summary: Create a new tontine
 *     tags: [Tontines]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amount
 *               - frequency
 *               - membersCount
 *             properties:
 *               name:
 *                 type: string
 *               amount:
 *                 type: number
 *               frequency:
 *                 type: string
 *                 enum: [DAILY, WEEKLY, MONTHLY]
 *               membersCount:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tontine created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, tontineController.createTontine);

/**
 * @swagger
 * /tontines/{id}:
 *   get:
 *     summary: Get tontine by ID
 *     tags: [Tontines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tontine details
 *       404:
 *         description: Tontine not found
 */
router.get('/:id', authenticateToken, tontineController.getTontine);

export default router;
