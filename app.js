// app.js
// Punto de configuración principal de Express
// Aquí se configuran middlewares, motor de vistas y rutas

import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './src/config/db.js';
import 'dotenv/config';

// __dirname no existe en ES Modules, esto lo recrea
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar Express
const app = express();

// Conectar a MongoDB
connectDB();

// Configurar Handlebars como motor de vistas
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'src/views/layouts'),
    partialsDir: path.join(__dirname, 'src/views/partials'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

// Middlewares para leer JSON y formularios HTML
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Configurar sesiones (se guardan en MongoDB, no en memoria)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 14 * 24 * 60 * 60 // Sesión dura 14 días
    }),
    cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000
    }
}));

export default app;