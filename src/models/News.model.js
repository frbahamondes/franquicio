// src/models/News.model.js
// Define la estructura de una noticia en MongoDB
// Mongoose traduce este schema a documentos en la colección "news"

import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'El título es obligatorio'],
            trim: true,
            maxlength: [200, 'El título no puede superar 200 caracteres']
        },
        slug: {
            // URL amigable generada desde el título
            // Ej: "McDonald's abre 10 locales" → "mcdonalds-abre-10-locales"
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        excerpt: {
            // Resumen corto para las tarjetas de noticias
            type: String,
            required: [true, 'El resumen es obligatorio'],
            maxlength: [300, 'El resumen no puede superar 300 caracteres']
        },
        content: {
            // Contenido completo de la noticia
            type: String,
            required: [true, 'El contenido es obligatorio']
        },
        image: {
            // URL de la imagen subida a Cloudinary
            url: { type: String, default: '' },
            publicId: { type: String, default: '' } // Para poder eliminarla de Cloudinary
        },
        category: {
            type: String,
            required: [true, 'La categoría es obligatoria'],
            enum: ['franquicias', 'gastronomia', 'retail', 'delivery', 'tendencias']
        },
        source: {
            // Fuente original de la noticia (opcional)
            type: String,
            trim: true,
            default: ''
        },
        published: {
            // true = visible en el sitio, false = borrador
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
        // Mongoose agrega automáticamente createdAt y updatedAt
    }
);

const News = mongoose.model('News', newsSchema);

export default News;