// src/middlewares/auth.middleware.js
// Funciones que se ejecutan ENTRE la petición y la respuesta
// isAuthenticated protege rutas del CMS — si no hay sesión, redirige al login

export const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next(); // Está logueado, continúa
    }
    res.redirect('/login'); // No está logueado, manda al login
};