// src/utils/seeder.js
// Script para crear el usuario administrador inicial
// Se ejecuta UNA SOLA VEZ con: node src/utils/seeder.js
// Después de ejecutarlo, este archivo no se vuelve a usar
console.log('🔍 Iniciando seeder...');

import mongoose from 'mongoose';
import 'dotenv/config';
import User from '../models/User.model.js';

const createAdmin = async () => {
    try {
        // Conectar a MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado a MongoDB');

        // Verificar si ya existe un admin para no duplicarlo
        const existingUser = await User.findOne({ email: 'tu@email.com' });
        if (existingUser) {
            console.log('⚠️  El usuario admin ya existe');
            process.exit(0);
        }

        // Crear el usuario admin
        // La contraseña se encripta automáticamente gracias al middleware en User.model.js
        const admin = new User({
            name: 'Francisca',
            email: 'frbahamondes@gmail.com',      // Cambia esto por tu email real
            password: 'Franquicio2026',    // Cambia esto por tu contraseña
            role: 'admin'
        });

        await admin.save();
        console.log('✅ Usuario admin creado exitosamente');
        console.log(`   Email: ${admin.email}`);
        console.log(`   La contraseña fue encriptada automáticamente`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        // Siempre cerrar la conexión al terminar
        await mongoose.disconnect();
        console.log('🔌 Desconectado de MongoDB');
        process.exit(0);
    }
};

createAdmin();