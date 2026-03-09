// src/controllers/public.controller.js
// Vistas públicas del sitio — lo que ven los visitantes

import News from '../models/News.model.js';

// HOME — últimas 6 noticias publicadas
export const getHome = async (req, res) => {
    try {
        const news = await News.find({ published: true })
            .sort({ createdAt: -1 })
            .limit(6);

        res.render('index', {
            news: news.map(n => n.toObject())
        });
    } catch (error) {
        console.error('Error en home:', error);
        res.render('index', { news: [] });
    }
};

// LISTADO — todas las noticias, con filtro opcional por categoría
export const getNewsList = async (req, res) => {
    try {
        const { categoria } = req.query;
        const filter = { published: true };
        if (categoria) filter.category = categoria;

        const news = await News.find(filter).sort({ createdAt: -1 });

        res.render('news/list', {
            news: news.map(n => n.toObject()),
            categoria,
            categories: ['franquicias', 'gastronomia', 'retail', 'delivery', 'tendencias']
        });
    } catch (error) {
        console.error('Error en listado:', error);
        res.render('news/list', { news: [] });
    }
};

// DETALLE — una noticia completa
export const getNewsDetail = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.redirect('/noticias');
        res.render('news/detail', {
            news: news.toObject()
        });
    } catch (error) {
        console.error('Error en detalle:', error);
        res.redirect('/noticias');
    }
};