import express from 'express';
import { MemberController } from '../controllers/member.controller';
import { PaymentController } from '../controllers/payment.controller';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const memberController = new MemberController();
const paymentController = new PaymentController();

// Routes pour les membres
router.post(
  '/members',
  authenticateToken,
  memberController.addMember
);

router.patch(
  '/members/:memberId/status',
  authenticateToken,
  memberController.updateMemberStatus
);

// Routes pour les paiements
router.post(
  '/payments',
  authenticateToken,
  paymentController.createPayment
);

router.patch(
  '/payments/:paymentId/validate',
  authenticateToken,
  paymentController.validatePayment
);

export default router;
