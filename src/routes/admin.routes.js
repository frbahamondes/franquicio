// src/routes/admin.routes.js
// Todas estas rutas están protegidas por isAuthenticated

import { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', isAuthenticated, (req, res) => {
    res.render('admin/dashboard', {
        userName: req.session.userName
    });
});

export default router;