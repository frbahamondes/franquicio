// src/routes/admin.routes.js
import { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import {
    getAdminNews,
    getCreateNews,
    postCreateNews,
    getEditNews,
    postEditNews,
    deleteNews
} from '../controllers/news.controller.js';

const router = Router();

// Dashboard
router.get('/', isAuthenticated, (req, res) => {
    res.render('admin/dashboard', {
        userName: req.session.userName
    });
});

// CRUD noticias
router.get('/noticias', isAuthenticated, getAdminNews);
router.get('/noticias/nueva', isAuthenticated, getCreateNews);
router.post('/noticias/nueva', isAuthenticated, postCreateNews);
router.get('/noticias/editar/:id', isAuthenticated, getEditNews);
router.post('/noticias/editar/:id', isAuthenticated, postEditNews);
router.get('/noticias/eliminar/:id', isAuthenticated, deleteNews);

export default router;