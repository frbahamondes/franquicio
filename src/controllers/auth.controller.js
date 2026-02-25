// src/controllers/auth.controller.js
import User from '../models/User.model.js';

export const getLogin = (req, res) => {
    if (req.session.userId) return res.redirect('/admin');
    res.render('admin/login');
};

export const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.render('admin/login', {
                error: 'Email o contraseña incorrectos'
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render('admin/login', {
                error: 'Email o contraseña incorrectos'
            });
        }

        req.session.userId = user._id;
        req.session.userName = user.name;
        res.redirect('/admin');

    } catch (error) {
        console.error('Error en login:', error);
        res.render('admin/login', {
            error: 'Ocurrió un error, intenta nuevamente'
        });
    }
};

export const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};