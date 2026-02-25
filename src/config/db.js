// src/config/db.js
// Configuración y conexión a MongoDB Atlas usando Mongoose
// Se exporta como función para llamarla desde app.js

import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado a MongoDB Atlas');
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error.message);
        process.exit(1); // Detiene el servidor si no hay DB
    }
};