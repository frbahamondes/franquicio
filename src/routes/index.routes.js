// src/routes/index.routes.js
import { Router } from 'express';
import { getHome, getNewsList, getNewsDetail } from '../controllers/public.controller.js';

const router = Router();

router.get('/', getHome);
router.get('/noticias', getNewsList);
router.get('/noticias/:id', getNewsDetail);

export default router;