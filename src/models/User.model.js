// src/models/User.model.js
// Usuario administrador del CMS
// bcrypt se encarga de encriptar la contraseña antes de guardarla

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        role: {
            type: String,
            enum: ['admin'],
            default: 'admin'
        }
    },
    {
        timestamps: true
    }
);

// Middleware de Mongoose: se ejecuta ANTES de guardar
// Encripta la contraseña automáticamente si fue modificada
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});

// Método para comparar contraseña ingresada con la encriptada
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;