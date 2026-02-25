// src/routes/auth.routes.js

import { Router } from 'express';
import { getLogin, postLogin, logout } from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/logout', isAuthenticated, logout);

export default router;