import express from 'express';
import { addDebt, getDebts, updateDebt, deleteDebt } from '../controllers/debtController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, addDebt);
router.get('/', verifyToken, getDebts);
router.put('/:id', verifyToken, updateDebt);
router.delete('/:id', verifyToken, deleteDebt);

export default router;