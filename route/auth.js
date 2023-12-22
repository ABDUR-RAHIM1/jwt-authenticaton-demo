import express  from 'express';
import { getUsers, loginUsers, registerUsers } from '../controller/user.js';
import authGuard from '../midlewere/authGuard.js';

const router = express.Router()

router.get('/users', authGuard, getUsers)
router.post('/register',registerUsers)
router.post('/login',loginUsers)

export default router;