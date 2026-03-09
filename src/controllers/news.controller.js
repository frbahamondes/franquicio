// src/controllers/news.controller.js
// Lógica CRUD para noticias
// Cada función corresponde a una operación: listar, crear, editar, eliminar

import News from '../models/News.model.js';

// Función auxiliar para generar slug desde el título
// Ej: "McDonald's abre 10 locales" → "mcdonalds-abre-10-locales"
const generateSlug = (title) => {
    const base = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
    
    return `${base}-${Date.now()}`;
};

// READ — Listar todas las noticias en el admin
export const getAdminNews = async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.render('admin/news-list', {
            news: news.map(n => n.toObject()),
            userName: req.session.userName
        });
    } catch (error) {
        console.error('Error al obtener noticias:', error);
        res.render('admin/news-list', { error: 'Error al cargar noticias' });
    }
};

// CREATE — Mostrar formulario de nueva noticia
export const getCreateNews = (req, res) => {
    res.render('admin/news-form', {
        userName: req.session.userName,
        categories: ['franquicias', 'gastronomia', 'retail', 'delivery', 'tendencias']
    });
};

// CREATE — Procesar formulario de nueva noticia
export const postCreateNews = async (req, res) => {
    try {
        const { title, excerpt, content, category, source, published } = req.body;

        const slug = generateSlug(title);

        const news = new News({
            title,
            slug,
            excerpt,
            content,
            category,
            source,
            published: published === 'on'
        });

        await news.save();
        res.redirect('/admin/noticias');

    } catch (error) {
        console.error('Error al crear noticia:', error);
        res.render('admin/news-form', {
            error: 'Error al crear la noticia. Verifica que todos los campos estén completos.',
            categories: ['franquicias', 'gastronomia', 'retail', 'delivery', 'tendencias']
        });
    }
};

// UPDATE — Mostrar formulario de edición
export const getEditNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.redirect('/admin/noticias');

        res.render('admin/news-form', {
            news: news.toObject(),
            userName: req.session.userName,
            categories: ['franquicias', 'gastronomia', 'retail', 'delivery', 'tendencias'],
            editing: true
        });
    } catch (error) {
        res.redirect('/admin/noticias');
    }
};

// UPDATE — Procesar formulario de edición
export const postEditNews = async (req, res) => {
    try {
        const { title, excerpt, content, category, source, published } = req.body;

        await News.findByIdAndUpdate(req.params.id, {
            title,
            slug: generateSlug(title),
            excerpt,
            content,
            category,
            source,
            published: published === 'on'
        });

        res.redirect('/admin/noticias');

    } catch (error) {
        console.error('Error al editar noticia:', error);
        res.redirect('/admin/noticias');
    }
};

// DELETE — Eliminar noticia
export const deleteNews = async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.redirect('/admin/noticias');
    } catch (error) {
        console.error('Error al eliminar noticia:', error);
        res.redirect('/admin/noticias');
    }
};