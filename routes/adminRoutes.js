import express from 'express';
import { getUsers, updateUser, deleteUser } from '../controllers/adminController.js';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/users', verifyToken, isAdmin, getUsers);
router.put('/users/:id', verifyToken, isAdmin, updateUser);
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);

export default router;