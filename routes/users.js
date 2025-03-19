import express from 'express';
import UserController  from '../controllers/users.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/current', authenticateToken, UserController.current);

export default router;